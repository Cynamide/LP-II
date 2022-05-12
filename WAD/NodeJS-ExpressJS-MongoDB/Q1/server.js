const express = require("express");
const mongo = require("mongodb").MongoClient;
const app = express();
const url = "mongodb://localhost:27017";
const cors = require("cors");

app.use(express.json());
app.use(cors());

let db, student_marks;

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  db = client.db("student");
  student_marks = db.collection("student_marks");
});

app.post("/add-student", (req, res) => {
  student_marks.insertMany(req.body, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    console.log(result);
    res.status(200).json({ ok: true });
  });
});
app.get("/students", (req, res) => {
  student_marks.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ student_marks: items, count: items.length });
  });
});
app.get("/more-than-20", (req, res) => {
  student_marks.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    data = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].dsbda > 20) {
        data.push(items[i]);
      }
    }
    res.status(200).json({ student_marks: data });
  });
});
app.patch("/update", (req, res) => {
  student_marks.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    if (req.body.roll_no.length === undefined) {
      res.status(400).json({ err: "Give roll number as array" });
      return;
    }
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < req.body.roll_no.length; j++) {
        if (items[i].roll_no === parseInt(req.body.roll_no[j])) {
          student_marks.updateOne(
            { roll_no: items[i].roll_no },
            {
              $set: {
                dsbda: items[i].dsbda + 10 > 99 ? 100 : items[i].dsbda + 10,
                wad: items[i].wad + 10 > 99 ? 100 : items[i].wad + 10,
                cns: items[i].cns + 10 > 99 ? 100 : items[i].cns + 10,
                cc: items[i].cc + 10 > 99 ? 100 : items[i].cc + 10,
                ai: items[i].ai + 10 > 99 ? 100 : items[i].ai + 10,
              },
            }
          );
        }
      }
    }
    res.status(200).json({ ok: true });
  });
});

app.get("/more-than-25", (req, res) => {
  student_marks.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    data = [];
    for (var i = 0; i < items.length; i++) {
      if (
        items[i].dsbda > 25 &&
        items[i].wad > 25 &&
        items[i].cns > 25 &&
        items[i].cc > 25 &&
        items[i].ai > 25
      ) {
        data.push(items[i]);
      }
    }
    res.status(200).json({ student_marks: data });
  });
});

app.delete("/delete", (req, res) => {
  student_marks.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    if (req.query.roll_no.length === undefined) {
      res.status(400).json({ err: "Give roll number as array" });
      return;
    }
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < req.query.roll_no.length; j++) {
        if (items[i].roll_no === parseInt(req.query.roll_no[j])) {
          student_marks.deleteOne({ roll_no: items[i].roll_no });
        }
      }
    }
    res.status(200).json({ student_marks: items, count: items.length });
  });
});

app.listen(3000, () => console.log("Server ready"));
