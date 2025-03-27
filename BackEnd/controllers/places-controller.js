const uuid = require("uuid");
const { validationResult } = require("express-validator");
const fs = require("fs");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/places");
const User = require("../models/users");
const { default: mongoose } = require("mongoose");
const uploadToGCS = require("../middleware/uploadToGCS"); // import the GCS upload function

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError("fetching places failed, try again.", 500);
    return next(error);
  }

  // if (!userWithPlaces || userWithPlaces.places.length === 0) {
  if (!userWithPlaces) {
    return next(
      new HttpError("Could not find places for the provided userid.", 404)
    );
  } //we return to stop the execution after this status.

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });

};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs.", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const imageUrl =
    req.file && req.file.cloudStoragePublicUrl
      ? req.file.cloudStoragePublicUrl
      : null;

  if (!imageUrl) {
    return next(
      new HttpError("Image upload failed or no image provided.", 500)
    );
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: imageUrl,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating place failed, try again.", 500);
    return next(error);
  }

  if (!user) {
    return next(new HttpError("Could not find user for the provided id.", 404));
  }

  try {
    const sesh = await mongoose.startSession();
    sesh.startTransaction();
    await createdPlace.save({ session: sesh });
    user.places.push(createdPlace); // this only adds place's id not entire place info
    await user.save({ session: sesh });
    await sesh.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating place failed.", 500);
    return next(error);
  }

  res.status(200).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs.", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not update the place.",
      500
    );
    return next(error);
  }

  if (place.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      "You are not authorized to edit this place.",
      401
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not update the place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not find the place.",
      500
    );
    return next(error);
  }

  if (!place) {
    return next(new HttpError("place is not found.", 404));
  }

  if (place.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not authorized to delete this place.",
      401
    );
    return next(error);
  }

  // const imagePath = place.image;
  // try {
  //   const sesh = await mongoose.startSession();
  //   sesh.startTransaction();
  //   await place.remove({ session: sesh });
  //   place.creator.places.pull(place._id);
  //   await place.creator.save({ session: sesh });
  //   await sesh.commitTransaction();
  // } catch (err) {
  //   const error = new HttpError(
  //     "something went wrong, could not delete the place.",
  //     500
  //   );
  //   return next(error);
  // }

  // fs.unlink(imagePath, (err) => {
  //   console.log(err);
  // });
  // res.status(200).json({ message: "place deleted." });
  const sesh = await mongoose.startSession();
  
try {
  sesh.startTransaction();
  
  // Use deleteOne instead of remove
  await Place.deleteOne({ _id: place._id }, { session: sesh });
  
  // Properly remove place reference from user's places array
  await User.updateOne(
    { _id: place.creator._id },
    { $pull: { places: place._id } },
    { session: sesh }
  );
  
  await sesh.commitTransaction();
  
  res.status(200).json({ message: "Place deleted." });
} catch (err) {
  console.error('Deletion error:', err);
  
  // Ensure transaction is aborted if an error occurs
  if (sesh.inTransaction()) {
    await sesh.abortTransaction();
  }
  
  return next(new HttpError(
    "Something went wrong, could not delete the place.",
    500
  ));
} finally {
  await sesh.endSession();
}
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
