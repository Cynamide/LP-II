const express = require("express");
const mongo = require("mongodb").MongoClient;
const app = express();
const url = "mongodb://localhost:27017";
const cors = require("cors");

app.use(express.json());
app.use(cors());

let db, songdetails;

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  db = client.db("music");
  songdetails = db.collection("songdetails");
});

app.post("/add-song", (req, res) => {
  songdetails.insertMany(req.body, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(result);
    res.status(200).json({ ok: true });
  });
});
app.get("/songs", (req, res) => {
  songdetails.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ songdetails: items, count: items.length });
  });
});
app.get("/filter-by-director", (req, res) => {
  songdetails.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    data = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].music_director == req.query.director) {
        data.push(items[i]);
      }
    }
    res.status(200).json({ songdetails: data });
  });
});
app.get("/filter-by-director-singer", (req, res) => {
  songdetails.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    data = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].music_director == req.query.director) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].singer == req.query.singer) {
            data.push(items[i]);
          }
        }
      }
    }
    res.status(200).json({ songdetails: data });
  });
});
app.delete("/delete", (req, res) => {
  songdetails.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    if (req.body.songname.length === undefined) {
      res.status(400).json({ err: "Give roll number as array" });
      return;
    }
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < req.body.songname.length; j++) {
        if (items[i].songname === req.body.songname[j]) {
          songdetails.deleteOne({ songname: items[i].songname });
        }
      }
    }
    res.status(200).json({ songdetails: items, count: items.length });
  });
});
app.get("/filter-by-singer-film", (req, res) => {
  songdetails.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    data = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].singer == req.query.singer) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].film == req.query.film) {
            data.push(items[i]);
          }
        }
      }
    }
    res.status(200).json({ songdetails: data });
  });
});
app.patch("/update", (req, res) => {
  songdetails.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    for (var i = 0; i < items.length; i++) {
      if (items[i].songname === req.body.songname) {
        songdetails.updateOne(
          { songname: items[i].songname },
          { $set: { actor: req.body.actor, actress: req.body.actress } }
        );
      }
    }
    res.status(200).json({ ok: true });
  });
});

app.listen(3000, () => console.log("Server ready"));
