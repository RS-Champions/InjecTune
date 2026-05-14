# InjecTune 🎵

A music streaming service built with Angular 21+, powered by the [Jamendo API](https://developer.jamendo.com/v3.0/docs).

Search for tracks and artists, listen to music, build playlists, and maintain your personal favorites library — all in a modern, responsive web application.

> Built as a final team project for the [RS School Angular Course](https://rs.school/).

---

## 🥇 Team — Champions

| Name    | Role                                     | GitHub                                                   |
| ------- | ---------------------------------------- | -------------------------------------------------------- |
| Alena   | Project Management & Communication       | [@AlenaVP](https://github.com/AlenaVP)                   |
| Lorenzo | Git Culture & Code Review                | [@Lorenzo-StJohn](https://github.com/Lorenzo-StJohn)     |
| Daniil  | Product Integrity & Delivery / Team Lead | [@mikhalenkadaniil](https://github.com/mikhalenkadaniil) |

---

## 🛠️ Tech Stack

- [Angular 21+](https://angular.dev/) — standalone components, signals, new control flow
- [TypeScript](https://www.typescriptlang.org/) — strict mode
- [Jamendo API v3.0](https://developer.jamendo.com/v3.0/docs) — music catalog (500,000+ tracks)
- [NestJS](https://nestjs.com/) — custom backend for playlists and user uploads

---

## 🚀 Getting Started

### 🧩 Prerequisites

- Node.js 19+
- npm 10+

### 🔧 Local Setup

```bash
# Clone the repository
git clone https://github.com/RS-Champions/InjecTune.git
cd InjecTune

# Run project
npm start
# or
npm install + ng serve
```

Open your browser at `http://localhost:4200`

---

### 🔍 Linting

```bash
npm run lint
```

---

### 🚀 Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/InjecTune` directory. By default, the production build optimizes your application for performance and speed.

### 🧪 Testing

```bash
# To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:
npm run test
```

---

## 🌐 Deployment

**Live app:** https://injectune.netlify.app/

CI/CD is configured via Netlify — every merge to `main` triggers an automatic deploy and a pull request also trigger the deploy for testing.

---

## 📌 Commit Message Types

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- chore: Routine tasks and maintenance that do not modify source or test files (for example, editing configurations of development tools, maintaining the repository, etc)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

---

## 📋 Project Board

[InjecTune Board](https://github.com/orgs/RS-Champions/projects/3) — GitHub Projects Kanban board

---

## 💬 Meeting Notes

| #   | Meeting                                                              | Date         |
| --- | -------------------------------------------------------------------- | ------------ |
| 1   | [Sprint 0 — Kickoff](docs/meetings/2026-05-10-sprint-0-kickoff.md)   | May 10, 2026 |
| 2   | [Sprint 1 — Planning](docs/meetings/2026-05-11-sprint-1-planning.md) | May 11, 2026 |

---

## ⚠️ AI Usage Policy

This team uses AI tools (Claude, GitHub Copilot) transparently during development.
Each team member documents AI usage in their personal Development Diary,
clearly indicating which parts were written by the developer and which were
generated or assisted by AI.

---

## 👩‍💻 Development Diaries

Personal learning journals — updated at least once per sprint:

- [AlenaVP](development-notes/AlenaVP/)
- [Lorenzo-StJohn](development-notes/Lorenzo-StJohn/)
- [mikhalenkadaniil](development-notes/mikhalenkadaniil/)

---

## 🔌 Course References

- [RS Angular Sprint Overview](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/README.md)
- [Project Options](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/README.md)
- [MusicFlow — Music Streaming Service](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/PROJECT_MUSIC.md)
- [Team Score](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/SCORE_TEAM.md)
- [Personal Score](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/SCORE_PERSONAL.md)
- [Project Technical Requirements](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/CODE_STANDARDS.md)
