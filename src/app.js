const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const path = require("path");
const express = require("express"); //express is a function (not an object)
const hbs = require("hbs");

//console.log(__dirname); //path to the directory of the current script
//console.log(__filename); //path to the file itself
//console.log(path.join(__dirname, "../public")); //function that returns the final path

const app = express(); //creating a new express application

const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public"); //path to the public folder cannot be relative, needs to be an absolute path to the root of your machine
const viewsPath = path.join(__dirname, "../templates/views");
const partialssPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
//allows to set a value for a given Express setting. we have a key, the setting name and we have a value. This sets handlebars hbs (npm i hbs) up
app.set("view engine", "hbs");
app.set("views", viewsPath); //to make sure that the correct views folder is used no matter where you run the project from
hbs.registerPartials(partialssPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });
// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Anrew",
//       age: 27,
//     },
//     {
//       name: "Sarah",
//       age: 50,
//     },
//   ]);
// });
// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Christel",
  }); //to render one of our views - second argument is an object which contains the values you want that view to be able to access
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    author: "Christel",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "How to use the Weather App",
    title: "Help",
    author: "Christel",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address",
    });
  } else {
    geocode(
      req.query.address,
      function (error, { latitude, longitude, location } = {}) {
        if (error) {
          return res.send({
            error: error,
          }); //will stop the function execution after printing the error message
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error: error,
            });
          }
          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    author: "Christel",
    text404: "Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    author: "Christel",
    text404: "Page not found",
  });
});

//starts up the server
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
