const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const express = require("express");

const notes = require("./db/db.json");
console.log("notes", notes);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// GET request for notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// POST request for notes
app.post("/api/notes/", (req, res) => {
  req.body.id = uuidv4();
  notes.push(req.body);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes), (error) => {
    if (error) {
      console.log("There is an error", error);
    } else {
      console.log("File Sucessfully Written");
    }
  });
  res.json(notes);
});


// Connecting Front End with Back End
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});