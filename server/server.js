const express = require("express");
const cors = require("cors");
const SpotfiyApi = require("spotify-web-api-node");

const app = express();
/* const { getAudioDurationInSeconds } = require("get-audio-duration"); */
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mess: "its working" });
});

/* app.post("/audioDuraction", (req, res) => {
  getAudioDurationInSeconds(req.body.url).then((duration) => {
    var minutes = Math.floor(duration / 60);
    var seconds = duration - minutes * 60;

    res.json(${minutes}:${seconds.toFixed(0)});
  });
}); */
app.post("/login", (req, res) => {
  if (req.body.code) {
    const spotfiyApi = new SpotfiyApi({
      clientId: "d21f60853815421fafe2c201cdcb0304",
      clientSecret: "7e9890b75e7646e78e58a3e969413a0c",
      redirectUri: "http://localhost:3000/",
    });
    spotfiyApi
      .authorizationCodeGrant(req.body.code)
      .then((r) => {
        res.json({
          accessToken: r.body.access_token,
          refreshToken: r.body.refresh_token,
          expiresIn: r.body.expires_in,
        });
      })
      .catch((err) => {
        /* res.sendStatus(400); */
        res.status(400).send({ mess: err });
      });
  } else {
    res.json({ mess: "the code is missing" });
  }
});
app.listen(5000, () => {
  console.log("server is working");
});
