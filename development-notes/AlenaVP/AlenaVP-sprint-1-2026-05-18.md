# Sprint 1

## 🧱 What was done in Sprint 1

### 🧩 **What was done:**

My responsibilities mainly included creating project documentation. I also created and configured the Kanban board using GitHub Projects.

As a frontend developer, I worked on mock data for the `track`, `album`, and `artist` features and implemented a base track directive from which `AlbumTrackCard`, `ArtistTrackCard`, and `SearchTrackCard` components are inherited.

I was also responsible for organizing team calls, writing follow-up summaries, and preparing Meeting Notes. The Meeting Notes were generated with the assistance of ChatGPT AI based on my summaries.

Creating the GitHub Projects Board was a new experience for me, so I spent a significant amount of time studying the documentation. I included this research time in the "Time spent" column of the table below.

Preparing the initial project folder structure proposal for the team was completed fast enough because I created a prompt to Claude AI.

Work on the mock data took longer than expected, mainly due to communication difficulties within the team. I updated the mock data multiple times according to team feedback, but the implementation still did not fully satisfy their expectations, and eventually the pull request was closed without being merged into the repository.

Reviewing pull requests from my teammates did not require much time because my colleagues actively reviewed each other’s work while I was busy with my own tasks. However, I still participated in reviewing several pull requests.

Creating the TrackCard component was not a straightforward process.

First, after investigating the requirements, I decided to create a single large reusable component that could cover all 6 use cases in the application: 3 large "square" cards and 3 "row" cards. I initially tried to implement this approach with the help of Claude AI. However, but it turned out that one of my teammates had already implemented a very similar idea for the `Discover` page in the form of a MusicCard component.

Looking back, I believe I made a mistake by not clarifying with the team earlier what exactly was the TrackCard component. My teammates suggested to implement a very "dumb" component, so I removed the previously created files and implemented a truly dumb component for the `Artist` page.

While working on these components, I became even more convinced of the importance of the DRY (Don’t Repeat Yourself) principle. As a result, I created a clean and maintainable solution that reusables track directive with generic typing and three components: `AlbumTrackCard`, `ArtistTrackCard`, and `SearchTrackCard`.

I believe this codebase could still be made more concise and polished, but the Sprint 1 deadline was coming.

Additionally, while working on these track components, I did a lot of work on the CSS styles for the neon lighting of html elements and can say that I sorted out this well.

🧭 **Time spent:**

| #   | What                                                                     | Label | Time spent |
| --- | ------------------------------------------------------------------------ | ----- | ---------- |
| 1   | Generated Meeting Notes (using AI) : 2026-05-10-sprint-0-kickoff.        | docs  | 3          |
| 2   | Generated Meeting Notes (using AI) : 2026-05-11-sprint-1-planning.       | docs  | 2          |
| 3   | Generated Meeting Notes (using AI) : 2026-05-17-sprint-1-demo.           | docs  | 2          |
| 4   | Created README.md (using Claude AI)                                      | chore | 2          |
| 5   | Created GitHub Projects Board                                            | chore | 5          |
| 6   | Generated (using AI) issues and added to GitHub Projects Board           | chore | 6          |
| 7   | Prepare (using Claude AI) a project folder structure for team            | chore | 2          |
| 8   | Created mock data based on the Jamendo API (in cooperation with AI chat) | feat  | 16         |
| 9   | Created a mermaid user flow diagram (using Claude AI)                    | feat  | 2          |
| 10  | Implement directive Card component (in cooperation with Claude AI)       | feat  | 3          |
| 11  | Implement TrackCard component                                            | feat  | 3          |
| 12  | Implement ArtistTrackCard component                                      | feat  | 3          |
| 13  | Implement AlbumTrackCard component                                       | feat  | 2          |
| 14  | Implement SearchTrackCard component                                      | feat  | 2          |
|     |                                                                          |       | 53 hours   |

### 🏆 **What I learned**

- how to use AI not only as a chat assistant, but also as a tool integrated into the project;
- how to generate generate docs using AI chat;
- how to create and manage GitHub Projects Boards, milestones, and issues (tickets);
- that core application services and infrastructure should exist as singletons throughout the application lifecycle (authentication state, interceptors, layout shell, etc.);
- how to map API responses to application models using DTOs and mappers;
- the purpose and practical usage of `lint-staged`;
- how Husky works;
- that `Mermaid` can be used for creating application user flow diagrams;
- best practices for creating mock data;
- advanced CSS styling techniques for implementing neon lighting effects;
- the importance of initial clarification of the task and looking for simpler solutions before introducing unnecessary complexity;
- practical usage of generic typing in TypeScript.

## 🎯 Plans for Sprint 2

- to get acuainted with `Taiga UI` and and use it in my work;
- to study Angular documentation in more depth in order to implement routing and lazy loading in a prpoper way;
- to implement a complete application feature (not only a separate component);
- to dive into the state management subject;
- to learn the best practices from my colleagues.
