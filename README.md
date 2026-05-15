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

## 📊 User-flow diagram

[mermaid.live](https://mermaid.live/edit#pako:eNrVWd1u2zYUfhVCQIcNTVw3iZPGFxvSpusP0iCL0w1b0gtaYmQukqhSklM3CJCr3a0Y2lwNKAYMe4VhF7sYsEfJE-wRdg5JyRQtu1ntrVhRwCJ5SJ5z-J3fnHm-CJjX9UJJ0wE52D5KCPzLir6e2ErT3oBFETmEL6I_ry4uCY1O6SgjQ57xfsSe6V347yGjAZOHR95fP12-NaPx6tXlxTX_W3sufiY7IhTk6rvXZJtnvhjWjoTlXTrsVkvkFukxKv0BfOzwvqRyBF9bfVHk9V2G6i51Ttsq8gHJcpoXGeG-SI48S769iI6YhD1KxFe_mgnnlPcU857h_4DnEUOmZc4zh2u8j_z5G9mjRcbUh2RD_N1lL1xSKULJsgyZIzdBXnZSJ_hSREXM4NoklyKqr31RsIKRXIRhxCoNsCQ4SlyIgLr2aMgywAh8WrrC4YOCyuAMv1iSc5_mLPjsfEwCD8sT3K0R84OeIDgzvzrvx5RHhCep-_J7NMtOhQya1npFP-Y56Rd5LhIHhTw5USjcZyG8C6DQRkY5WUnz5m019yEFgtc95jImqaH55-KqN5mJgdL2UExyCKL_PjZHnLMNSKRFROWBpP5JBnoyY6In5tfR7fbVxZvbHX0euQfoyxyJhQQQkv6IpPpqno9qD7nLTvdZxGjGkD8YkXK4CO6uw1gAZlJj6QFLJDugITKkvgkO5mdHCmDlFvmWvnwJP6CP-jKI7YNnSLgPq61Wq8aTkgPFKF-69IhjARflEcG7aZcIH00-cbuQNOciUe4Q_aMviqTJbzbBHBd4EoLpBOifhJyJdB00Spxffl9GEQflelaHicY4876BkA8ZyfSBDba-zSDMJT6g6HnBZB3Wmo3PeQT-CHFkvshHCniggfm509CMiyjny5kCz5R3kjSp-UOD_q5lkoA4NAP4SWjMGiTZZxlclI0VbCbmFwPekicYqUg0AbUdQQMSCxDTYKnRJDRH_wODqPaDqODtcRj1i1iNZkd9tau0g1e_lMc4dqBnHyXHApRhSHC0gEcaiFyovAfggb93uXDyOCWJltyb4KkKQIarRcWfMp7l6rwGBCm9b0Ee3QAgzYti3GJNj-dnTSukIfJMguprALCa0FppBLnm7r8BeQno6T59JlhR8BKrr_8winChipMlUhXBYoA6zWK1jdVITZ6hHR_uEDmNSDBdds1nE5BwoYK4fpudOhTfU5zdIu4z2egbr_9aJGXGQma-mynfqqzyx6qgU1OqEMViTbLnBQeenDoNOdzREC2Hi1KC8TlascrFvENuWL0fcE0Fr-zkdyV7nwsZ29zieEHcljpyE4bMlzxVsUKoH-rUgY8SwCnTj2UyD-cISUNCk4AEUqRwDZQYE5WRD8VfNFKlcgDylRO6eF6Aw9DvMACVCQDHTZLzmEEFH6eOo9tGwzpWiU_DG4EO_IhbmKy5OwO9DxfUr-3tsNWhbUZ9uo5umw1ZJMACkXkQpxoraciL1X8hOO-LyM33BpDwkT5XZA94_rDo17MOhZxezx8IEWH_B3HTI3qsGkKLyKYh5wFGZdbK1Lkz9ao7Pb0cMXRo2j56hI4ojESfRhOdoh4gkhmTVvQwXABgCinBgkqr5OGE2ZZVTaYYbKIwzR-zNNnjUg0gw3kfr1ET8_OuG0sNeRH2sW6pNhaJRMj9ekArAi7uJ5CYI09qRPRwfo4eHjzZ6egbHIzmktGYPN3fIcdSxOQxoDkJxEyU7Arw4kUSaANca6-55lcSYG9BoIsvkgW4kCcsy6hbU93FZwN8V13TBsZv3AA95hK7IbwsEbbS9OPDpxngFdxCkhGaps8-IcvLn45betZ21S89jsSp2VySwAaSCPWYIcPWlDqh6vhdi9puqjVsqBPbXShNXF2GxJludfkQBLEXSaOMPP7qwBXLbeVZOxuoKyXoTjfUqkMeWjmAmUbZ9AqbwukUwnG7YSZZ5fJdqnyUMt0LuO5xtYRKv9g4CzNatdKy5ZbzarALdvo5aU3IWSmr6g2m1Zm1tqC6dqK_pAmt7twssqpjhsKpqE5yyFNOOWJVJQCNCpk4DbenGHiR2nLpljSm_TCWpWr-WFfUmhO1VsxsIjNVF7VnpWHO5HR-pxBr3VBdkmCrRQOqKu_ftVFVION9ZaVl-wd99lg_46aAdZddfzcS2FWwvaWuGjtxciZnq8Y5clymz6DWLLnK8LVzmqIMRWLpoqw6r_8WtS1WGdjM6LgQrOTXWcN0QLt_0qr-5qV41H8sypqvsyYsAitzcAmsuG5xUJZ5ln-w6rlKkLSsk6byYm9hWH-VlGW1VSfFGeXw6ZDVSMdlY72YqYPPsO2grxTm3Z7kaXKSiFPwoeDNWRWK0ccWZgVTEXSsZRJhfKIZ4RV9J-ZPxBtvyQslD7xuLgu25MVMxhSH3hkeduTlA4b91i58BuyYgvc58o6Sc9iW0uQbIeJyJ3AZDrzuMQRSGBUpdi22OYU0aEwCiQbUGVgfe93V9qo6w-ueeS-87kp7s7XSWVtdXV3bXG9vrm50lryR111eX2t1VjfXN1budG531lc650veS3VruwWza2sr65vtjfbKnZWN878BUqCFvA) - preview

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
- [Project Options](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/PROJECTS.md)
- [MusicFlow — Music Streaming Service](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/PROJECT_MUSIC.md)
- [Team Score](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/SCORE_TEAM.md)
- [Personal Score](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/SCORE_PERSONAL.md)
- [Project Technical Requirements](https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/CODE_STANDARDS.md)
