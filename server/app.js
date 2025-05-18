import express from "express";
import { getClosedPRs } from "../github_api/main.js";
import { parseGitHubUrl } from "./utils.js";
const app = express();

app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/github", async (req, res) => {
  const { accessToken, repoUrl } = req.body;
  if (!accessToken || !repoUrl) {
    return res.status(400).json({ error: "Missing accessToken or repoUrl" });
  }
  // For demonstration, just echo back the received data
  const { owner, repo } = parseGitHubUrl(repoUrl);
  const data = await getClosedPRs(owner, repo, accessToken);
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
