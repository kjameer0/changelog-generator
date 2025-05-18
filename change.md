This commit introduces changelog generation.  It fetches closed PRs, retrieves their diffs, uses an LLM (likely for changelog text generation), creates a new branch ("generated-changelog"), and updates a changelog file ("change.md") with the LLM's output.  The `llm` and `parser` modules were refactored.  A server (`server/index.js`) was added to orchestrate these steps.

