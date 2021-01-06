const express = require("express"); // EXPRESS TO HAVE ACCESS TO SERVER AND ROUTES AND MIDDLEWARES
const bodyParser = require("body-parser"); // BODY-PARSER TO PARSE INCOMING REQUEST BODIES IN  A MIDDLEWARE
const cors = require("cors"); // CORS FOR CROSS ORIGIN ALLOWANCE

// SETUP EMPTY JS OBJECT TO ACT AS ENDPOINT FOR ALL ROUTES
weatherData = {};

// DEFINE APP AS AN EXPRESS APPLICATION
const app = express();

// MIDDLEWARE
// CONFIGURING EXPRESS TO USE BODY-PARSER AS MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// CONFIGURING EXPRESS TO USE CORS AS MIDDLEWARE
app.use(cors());

// TO USE THE STATIC FILES IN THE WEBSITE FOLDER
app.use(express.static("website"));
const port = 8000; // DEFINING THE PORT

// START THE SERVER
app.listen(port, () => {
  console.log(`app running on port ${port}...`); // TO MAKE SURE THAT THE SERVE IS RUNNING
});

// ROUTES
// GET ROUTE TO SEND DATA TO THE CLIENT , POST ROUTE TO ADD DATA TO THE SERVER
app.get("/getWeatherData", sendData).post("/addWeatherData", addData);

// ROUTE HANDLERS
function addData(req, res) {
  weatherData.temperature = req.body.temperature;
  weatherData.date = req.body.date;
  weatherData.user_response = req.body.user_response;
  res.end();
  console.log(weatherData);
}

function sendData(req, res) {
  res.send(weatherData);
}
