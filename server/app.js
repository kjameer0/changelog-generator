import express from "express";
const app = express();

app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/github", (req, res) => {
  const { accessToken, repoUrl } = req.body;
  if (!accessToken || !repoUrl) {
    return res.status(400).json({ error: "Missing accessToken or repoUrl" });
  }
  // For demonstration, just echo back the received data
  res.json({ accessToken, repoUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
