const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "../")));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ Add car
app.post("/add-car", upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file.filename;

  await pool.query(
    "INSERT INTO cars (name, price, description, image) VALUES ($1,$2,$3,$4)",
    [name, price, description, image]
  );

  res.json({ message: "Car added successfully" });
});

// ✅ Get all cars
app.get("/cars", async (req, res) => {
  const result = await pool.query("SELECT * FROM cars");
  res.json(result.rows);
});

// ✅ Delete car by ID
app.delete("/delete-car/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM cars WHERE id=$1", [id]);
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete car" });
  }
});


app.listen(3000, () => {
  console.log("Backend running successfully 🚀");
});
