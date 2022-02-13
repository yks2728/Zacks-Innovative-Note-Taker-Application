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

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes/", (req, res) => {
  req.body.id = uuidv4();
  notes.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(notes), (error) => {
    if (error) {
      console.log("There is an error", error);
    } else {
      console.log("File Sucessfully Written");
    }
  });
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    console.log("note", note.id);
    if (note.id === req.params.id) {
      console.log(i);
    }
  }
  res.json(notes);
});

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

// remove the item from the array
// rewrite the file so it deletes the note
