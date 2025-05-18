import fs from "node:fs/promises";
import path from "node:path";

export async function getPrDiffs() {
  const absolutePath = path.resolve("sample.json");
  const data = await fs.readFile(absolutePath, "utf8");
  const res = JSON.parse(data);
  let urls = res.data.map((pr) => {
    return pr.diff_url;
  });

  const diffs = [];
  for (const diff_url of urls) {
    try {
      const response = await fetch(diff_url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      diffs.push(text);
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  return diffs.join("\n");
}
