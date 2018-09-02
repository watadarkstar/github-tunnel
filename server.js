require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/repos/:githUser/:githubRepo/commits", (req, response) => {
  const { githUser, githubRepo } = req.params;
  const { github_client_id, github_client_secret } = process.env;
  const url = `https://api.github.com/repos/${githUser}/${githubRepo}/commits?client_id=${github_client_id}&client_secret=${github_client_secret}`;

  console.log("github_client_id", github_client_id);
  console.log("github_client_secret", github_client_secret);
  console.log(`fetching ${url}`);

  axios
    .get(url)
    .then(function(res) {
      // handle success
      const data = res.data.map(({ sha, commit: { message } }) => {
        return { sha, message };
      });
      response.json(data);
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
