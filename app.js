import express from "express";

const PORT = process.env.PORT || 8000;
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

export { app };
