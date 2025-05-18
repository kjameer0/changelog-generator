import fs from "node:fs/promises";
import path from "node:path";

async function main() {
  const absolutePath = path.resolve("sample.json");
  const data = await fs.readFile(absolutePath, "utf8");
  const res = JSON.parse(data);
  let prs = res.data.map((pr) => {
    return pr.diff_url;
  });
  console.log(prs);
}

main();
