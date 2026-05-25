import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "hangover123";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return {
      timings: { opening: "Open 24 Hours", closing: "Everyday" },
      prices: [],
      offers: [],
      gallery: [],
      announcement: { enabled: false, title: "", message: "" },
      bookings: []
    };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function isAdmin(req) {
  return req.headers["x-admin-password"] === ADMIN_PASSWORD;
}

app.get("/api/data", (req, res) => {
  const data = readData();
  const publicData = {
    timings: data.timings,
    prices: data.prices,
    offers: data.offers,
    gallery: data.gallery,
    announcement: data.announcement
  };

  res.json(publicData);
});

app.post("/api/bookings", (req, res) => {
  const { name, phone, game, date, time, people, message } = req.body;

  if (!name || !phone || !game || !date || !time) {
    return res.status(400).json({
      success: false,
      message: "Name, phone, game, date and time are required."
    });
  }

  const data = readData();

  const booking = {
    id: Date.now(),
    name,
    phone,
    game,
    date,
    time,
    people: people || "1",
    message: message || "",
    status: "New",
    createdAt: new Date().toISOString()
  };

  data.bookings.unshift(booking);
  writeData(data);

  res.json({
    success: true,
    message: "Booking request received.",
    booking
  });
});

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  }

  res.status(401).json({
    success: false,
    message: "Wrong admin password."
  });
});

app.get("/api/admin/data", (req, res) => {
  if (!isAdmin(req)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  res.json(readData());
});

app.put("/api/admin/data", (req, res) => {
  if (!isAdmin(req)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const current = readData();

  const updated = {
    ...current,
    timings: req.body.timings || current.timings,
    prices: req.body.prices || current.prices,
    offers: req.body.offers || current.offers,
    gallery: req.body.gallery || current.gallery,
    announcement: req.body.announcement || current.announcement,
    bookings: current.bookings || []
  };

  writeData(updated);

  res.json({
    success: true,
    message: "Website data updated.",
    data: updated
  });
});

app.put("/api/admin/bookings/:id", (req, res) => {
  if (!isAdmin(req)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const data = readData();
  const id = Number(req.params.id);
  const booking = data.bookings.find((item) => item.id === id);

  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  booking.status = req.body.status || booking.status;
  writeData(data);

  res.json({ success: true, booking });
});

app.listen(PORT, () => {
  console.log(`Hangover backend running on http://localhost:${PORT}`);
});