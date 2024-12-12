const express = require("express");
const cors = require("cors")

const app = express();
const corsOptions = {
  origin: "*", // Mengizinkan semua asal
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Metode HTTP yang diizinkan
};

app.use(cors(corsOptions))

app.get("/", (req, res) => res.send("Express Running"));

app.get("/api/proxy", async (req, res) => {
  res.send("hallo")
  const { url } = req.query; // Ambil URL dari query parameter

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    // Fetch ke API eksternal
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch the URL" });
    }

    // Gunakan arrayBuffer untuk menangani data binary
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Konversi ke Buffer

    res.status(200).send(buffer); // Kirim kembali ke frontend
  } catch (error) {
    console.error("Error fetching URL:", error);
    res.status(500).json({ error: "Failed to fetch data from the server" });
  }
});

module.exports = app


// import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
// import fetch from "node-fetch";

// const app = express();

// const corsOptions = {
//   origin: "*", // Mengizinkan semua domain
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));

// app.get("/", (req: Request, res: Response) => res.send("Express Running"));

// app.get("/api/proxy", async (req: Request, res: Response) => {
//   const { url } = req.query;

//   if (!url || typeof url !== "string") {
//     return res.status(400).json({ error: "URL parameter is required" });
//   }

//   try {
//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer YOUR_TOKEN_HERE`, // Tambahkan jika URL tujuan memerlukan autentikasi
//       },
//     });

//     if (!response.ok) {
//       return res.status(response.status).json({ error: "Failed to fetch the URL" });
//     }

//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");

//     const data = await response.buffer();
//     res.status(200).send(data);
//   } catch (error) {
//     console.error("Error fetching URL:", error);
//     res.status(500).json({ error: "Failed to fetch data from the server" });
//   }
// });

// export default app;
