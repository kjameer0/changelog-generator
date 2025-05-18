export function parseGitHubUrl(url) {
  const match = url.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/)?$/);
  if (!match) {
    throw new Error("Invalid GitHub URL format");
  }

  return {
    owner: match[1],
    repo: match[2],
  };
}

// Example usage
// const url = "https://github.com/kjameer0/changelog-generator";
// const result = parseGitHubUrl(url);
// console.log(result); // { owner: 'kjameer0', repo: 'changelog-generator' }
