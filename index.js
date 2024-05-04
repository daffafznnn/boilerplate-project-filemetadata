var express = require("express");
var cors = require("cors");
var multer = require("multer");
var path = require("path");
require("dotenv").config();

var app = express();

// Middleware
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Multer configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Simpan file di dalam direktori "uploads/"
  },
  filename: function (req, file, cb) {
    // Ubah nama file yang disimpan sesuai dengan nama asli file yang diunggah
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

// Routes
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

// Server setup
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
