const fs = require("fs");
const stream = require("./stream");
const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

app.use(express.json(), express.urlencoded({ extended: false }));
const indexHtml = require("./index-html");

app.get("/", async (req, res) => {
  res.contentType("html").send(indexHtml);
});

app.post("/", async (req, res) => {
  const body = req.body;
  const url = body?.url;
  const selectedOption = body.audioVideo;

  if (!body) return res.status(400).send("Please enter a correct url");
  if (!url || !selectedOption)
    return res.status(400).send("Please enter a correct url");

  const mapOptionToQuality = {
    video: "highestvideo",
    audio: "highestaudio",
  };

  const mapOptionToFilter = {
    video: "videoonly",
    audio: "audioonly",
  };

  const selectedQuality = mapOptionToQuality[selectedOption];
  const selectedFilter = mapOptionToFilter[selectedOption];

  try {
    const videoInfo = await ytdl.getBasicInfo(url);
    const title = videoInfo.videoDetails.title;
    const extension = selectedOption === "video" ? "mp4" : "mp3";
    console.log("title", title);
    console.log(url);
    res.header(
      "Content-Disposition",
      `attachment;  filename=${title}.${extension}`
    );
    return ytdl(url, {
      quality: selectedQuality,
      filter: selectedFilter,
      format: extension,
    }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(400).send("Please enter a correct url");
  }
});

app.listen(5005, () => {
  console.log("http://localhost:5005");
});
