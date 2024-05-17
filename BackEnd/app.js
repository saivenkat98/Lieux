const fs = require('fs');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use('/uploads/images',express.static(path.join('uploads','images')));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*',);
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, OPTIONS, POST, PUT, PATCH, DELETE');
  next();
})

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {

  if(req.file){
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    })
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error occured!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.olpgu2k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    //app.listen(process.env.PORT || 3000);
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
