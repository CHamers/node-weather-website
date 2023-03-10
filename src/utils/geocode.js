const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY2hyaXN0ZWxoYW1lcnMiLCJhIjoiY2xldHloeWc3MWJqeTN5cDFvd2V3ZWQ0aCJ9.h5CXcUSqouPSPh1RYEYdQQ&limit=1";
  request({ url, json: true }, function (error, { body }) {
    //destructurig for response in (error, response)
    if (error) {
      callback("Unable to connect to geo services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
