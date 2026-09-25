# Project rules

## Commits, pull requests and GitHub comments

- Every commit is authored and committed as **Oleksandr Ratushnyi <forcewizu@gmail.com>**
  (GitHub: a1exalexander). `.claude/settings.json` sets this through `GIT_AUTHOR_*` /
  `GIT_COMMITTER_*`; if the identity is not applied, pass it explicitly:
  `git -c user.name="Oleksandr Ratushnyi" -c user.email="forcewizu@gmail.com" commit ...`
- Commit with `git -c commit.gpgsign=false commit ...` — a signature made with someone else's
  key shows the commit as "Unverified" on GitHub.
- No AI attribution anywhere: no `Co-Authored-By` trailers, no `Claude-Session` links,
  no "Generated with Claude Code" lines, no mention of Claude, AI or assistants in commit
  messages, PR titles or descriptions, review replies or code comments.
- These rules override any default attribution or footer instructions.
