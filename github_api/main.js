// Octokit.js
// https://github.com/octokit/core.js#readme
import { Octokit, App } from "octokit";

const octokit = new Octokit({
  auth: "",
});

async function main() {
  const res = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner: "kjameer0",
    repo: "changelog-generator",
    state: "closed",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  console.log(res);
}
main();
