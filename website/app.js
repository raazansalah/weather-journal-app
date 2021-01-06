/* Global Variables */
// get date by function with js
let d = new Date();
let newDate = d.getDate() +'/' + d.getMonth()+1 +  '/' + d.getFullYear();
const date=document.getElementById("date");
const temp =document.getElementById("temp");
const feel=document.getElementById("content");
// API & base URL from WEATHERAPI website
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let key = "&appid=d238b55b3a27d21c482eec9d42462fc0&units=imperial";
// acseeing feel ,temp, date from DOM


//click event to the button by clivk event listenr
document.getElementById("generate").addEventListener("click", generateAction);
//callback fun of the event which generate date and get the temp from api
function generateAction(e) {
  //get user inputs from DOM
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getTemp(baseURL, zipCode, key).then(function (Udata) {
    // POST request
    postData("http://localhost:8000/addWeatherData", {
      temperature: Udata.main.temp,
      date: newDate,
      user_response: feelings,
    })
      //call update ui function
        updateUI();
  });
}

// fuction to get abi data
const getTemp= async (baseURL, code, apikey) => {
  const res = await fetch(baseURL + code  + apikey);
  try {
    const Udata = await res.json();
    return Udata;
  } catch (error) {
    //log the error
    console.log( error);
  }
};

// functio to POST the data
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    //body data tybe should match the content-type header
    body: JSON.stringify(data),//JSON string from JS object
  });
  try {
    
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

// function to Update uI
const updateUI = async () => {
  const req = await fetch("http://localhost:8000/getWeatherData");
  try {
    const allData = await req.json();
  
   date.innerHTML = allData.date;
    temp.innerHTML = allData.temperature;
    feel.innerHTML = allData.user_response;
  } catch (error) {
    console.log( error);
  }
};
