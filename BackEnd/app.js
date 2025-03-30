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

const allowedOrigins = [
  'http://localhost:3000',  // Local frontend
  process.env.FRONTEND_URL  // Can be set in environment variables
];

app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin 
    if(!origin) return callback(null, true);
    
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(bodyParser.json());
// app.use('/uploads/images',express.static(path.join('uploads','images')));

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file && req.file.path) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  let statusCode = 500;
  if (typeof error.code === 'number' && error.code >= 100 && error.code < 600) {
    statusCode = error.code;
  }
  
  res.status(statusCode);
  res.json({ 
    message: error.message || "Unknown error occurred!",
    code: error.code // You can include the original error code in the response body
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.olpgu2k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    //app.listen(process.env.PORT || 3000);
    app.listen(process.env.PORT || 3001);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
