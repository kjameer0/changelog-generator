import { fal } from "@fal-ai/client";
import { getPrDiffs } from "../parser/index.js";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

fal.config({
  credentials: process.env.FAL_AI,
});

async function getChangelogText() {
  const diff = await getPrDiffs();
  if (!diff) {
    return;
  }
  const result = await fal.subscribe("fal-ai/any-llm", {
    input: {
      prompt: `Given the following git diff that may contain multiple diffs that have been merged provide a changelog of the changes that have been done. Keep response to 50 words or less. Here is the diff: ${diff}`,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });

  console.log(result.data);
  console.log(result.requestId);
}

getChangelogText();
