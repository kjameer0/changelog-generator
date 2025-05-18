import { Octokit, App } from "octokit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// Load .env from project base directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

async function createBranch({
  owner,
  repo,
  newBranchName,
  baseBranch = "main",
}) {
  try {
    // 1. Get the reference (SHA) of the base branch
    const { data: baseRef } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    });

    const baseSha = baseRef.object.sha;

    // 2. Create the new branch reference
    const response = await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranchName}`,
      sha: baseSha,
    });

    console.log(`✅ Branch '${newBranchName}' created from '${baseBranch}'`);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to create branch:", error.message);
    throw error;
  }
}

export async function updateFile(path, branchName, owner, repo, newContent) {
  let oldContent = "";
  let fileInfo = null;
  try {
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: path,
      ref: branchName,
    });
    fileInfo = fileData;
    oldContent = Buffer.from(fileData.content, "base64").toString("utf-8");
  } catch (error) {
    console.log(error);
    oldContent = "";
  }

  const updatedContent = newContent + "\n" + oldContent;
  const commitMessage = "docs: update generated changelog";
  //take new content and add it to the top of the file
  // Update the file in the new branch
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: path,
    message: commitMessage,
    content: Buffer.from(updatedContent).toString("base64"),
    sha: fileInfo ? fileInfo.sha : null,
    branch: branchName,
  });
}

// const b = "test5340";
// createBranch({
//   owner: "kjameer0",
//   repo: "changelog-generator",
//   baseBranch: "main",
//   newBranchName: b,
// }).then(async (e) => {
//   await updateFile("change1.md", b, "kjameer0", "changelog-generator", "hello");
// });
// updateFile("change1.md", b, "kjameer0", "changelog-generator", "hello");
