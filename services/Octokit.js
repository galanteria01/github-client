class Octokit {
  octokit
  constructor(token) {
    this.octokit = new Octokit({
      auth: token,
      userAgent: "octokit/rest.js v1.2.3",
      baseUrl: "https://api.github.com"
    })
  }
  async getUser() {
    const user = await this.octokit.users.get()
    return user
  }
  async getRepos() {
    const repos = await this.octokit.repos.listForAuthenticatedUser()
    return repos
  }
  async getRepo(repo) {
    const repoInfo = await this.octokit.repos.get({
      owner: repo.owner.login,
      repo: repo.name
    })
    return repoInfo
  }
}