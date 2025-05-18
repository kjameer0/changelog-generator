async function getClosedPRs(repoName, token) {
  const url = `https://api.github.com/repos/${repoName}/pulls?state=closed&per_page=100`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const pullRequests = await response.json();
  return pullRequests.map((pr) => ({
    number: pr.number,
    title: pr.title,
    user: pr.user.login,
    closed_at: pr.closed_at,
    merged: pr.merged_at !== null,
  }));
}
getClosedPRs("octocat/Hello-World", "token")
  .then((prs) => console.log(prs))
  .catch((error) => console.error(error));
