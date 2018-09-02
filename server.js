const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/repos/:githUser/:githubRepo/commits", (req, response) => {
  const { githUser, githubRepo } = req.params;
  const url = `https://api.github.com/repos/${githUser}/${githubRepo}/commits`;

  console.log(`fetching ${url}`);

  axios
    .get(url)
    .then(function(res) {
      // handle success
      const data = res.data.map(c => {
        return { sha: c.sha };
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
