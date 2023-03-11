const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  // "http://api.weatherstack.com/current?access_key=668916c73a1dfdefd5cb0e649cb67ed3&query=37.8267,-122.4233&units=m";

  request({ url, json: true }, (error, { body }) => {
    //destructurig for response in (error, response)
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        //
        // {
        //   temp: response.body.current.temperature,
        //   feelsLikeTemp: response.body.current.feelslike,
        //   descr: response.body.current.weather_descriptions[0],
        // }
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees Celsius."
      );
    }
  });
};

// const url1 =
//   "http://api.weatherstack.com/current?access_key=668916c73a1dfdefd5cb0e649cb67ed3&query=37.8267,-122.4233&units=f";

// request({ url: url1, json: true }, (error, response) => {
//   //   console.log(response);
//   //   const data = JSON.parse(response.body);
//   //   console.log(data);
//   //   console.log(data.current);
//   //   console.log(response.body.current);
//   if (error) {
//     console.log("Unable to connect to weather service");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     const temp = response.body.current.temperature;
//     const feelsLikeTemp = response.body.current.feelslike;
//     const descr = response.body.current.weather_descriptions[0];
//     // console.log(temp, feelsLikeTemp);
//     console.log(
//       `It is currently ${descr} and ${temp} degrees out, but it feels more like ${feelsLikeTemp}.`
//     );
//   }
// });
module.exports = forecast;
