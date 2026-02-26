const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();
console.log("ENV CHECK:", process.env.MONGO_URI);
console.log("PORT CHECK:", process.env.PORT);
dns.setServers(["8.8.8.8", "1.1.1.1"])
const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://bucolic-kleicha-004df1.netlify.app",
    "https://bucolic-kleicha-004df1.netlify.app/"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());
app.use(express.json());
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Schema
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  event: { type: String, required: true }
});

// Model
const Registration = mongoose.model("Registration", registrationSchema);

// API Route
app.post("/register", async (req, res) => {
  try {

    const newUser = new Registration(req.body);
    await newUser.save();

    res.json({
      message: "🎉 Registration Successful!"
    });

  } catch (err) {

    res.status(500).json({
      message: "❌ Error Saving Data"
    });
a
  }
});

// Server Start
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});