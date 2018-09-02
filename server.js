const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (request, response) => {
  axios
    .get("https://api.github.com/repos/adamocarolli/paper-signals/commits")
    .then(function(res) {
      // handle success
      console.log(res.data);
      response.send(res.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
