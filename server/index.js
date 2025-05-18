import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env from project base directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
async function callGithubRoute(accessToken, repoUrl) {
  try {
    const response = await fetch("http://localhost:3000/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken, repoUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling /github route:", error);
  }
}
async function callMakeCommitRoute({ prList, accessToken, repoUrl }) {
  try {
    const response = await fetch("http://localhost:3000/makeCommit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prList, accessToken, repoUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling /makeCommit route:", error);
  }
}

async function main() {
  const accessToken = process.env.GITHUB_API_TOKEN;
  const repoURL = "https://github.com/kjameer0/changelog-generator";
  const res = await callGithubRoute(accessToken, repoURL);
  const prList = res.data;
  //call mock commit
  const makeCommitResponse = await callMakeCommitRoute({
    accessToken,
    prList: prList.slice(),
    repoUrl: repoURL,
  });
  console.log(prList.length, makeCommitResponse);
}
main();
