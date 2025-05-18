// Octokit.js
// https://github.com/octokit/core.js#readme
import { Octokit, App } from "octokit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env from project base directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
});

export async function getClosedPRs(owner, repo, accessToken) {
  const octokit = new Octokit({
    auth: accessToken,
  });
  const res = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
    state: "closed",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return res;
}

//make new PR
// Example usage:
// getClosedPRs("kjameer0", "changelog-generator");
