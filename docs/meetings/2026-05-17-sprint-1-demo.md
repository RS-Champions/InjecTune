# Meeting Note — Sprint 1 Planning

|             |                                                    |
| ----------- | -------------------------------------------------- |
| **Date**    | May 16-17, 2026                                    |
| **Place**   | Discord (voice event)                              |
| **Members** | AlenaVP, Lorenzo-StJohn, mikhalenkadaniil, TELEUZI |

---

## Agenda

1. Team communication and collaboration issues
2. Discussion of difficulties of Taiga UI usage in the project
3. Discussion of Angular Resources and HTTP Resources
4. Review of the proposed project structure
5. Clarification of individual task requirements
6. Best practices for mocks and dumb components
7. Sprint planning and communication schedule

---

## Outcomes and Decisions

1. **Team communication:** The team discussed several situations related to misunderstandings during collaboration and agreed to improve communication and clarify expectations earlier during development discussions.

2. **Taiga UI:** The team agreed to continue use Taiga UI as the primary UI library for the project.

3. **Angular experimental APIs:** We discussed using Angular Resources and decided to use [http-resource](https://angular.dev/guide/http/http-resource), despite its experimental status, because it aligns well with the reactive architecture of the project.

4. **Project structure:** The team reviewed the proposed project architecture and agreed that a very detailed folder structure would be excessive for the current scope of the task. However, the following high-level structure was approved:
   - `app/core`
   - `app/shared`
   - `app/features`

   Internal structure details may evolve during development.

5. **Design implementation approach:** The team agreed to prioritize the official project requirements over strict visual implementation. The provided design should be treated as guidance rather than a mandatory pixel-perfect specification.

6. **Mocks and dumb components:** We discussed best practices for mock data and presentational components:
   - mock data should match the API response format as closely as possible;
   - presentational components should remain максимально “dumb” and avoid business logic.

7. **Responsibilities and preferences:**
   - AlenaVP was asked to refactor mock data into JSON format and align property names with the API response structure by May 17, 2026.
   - AlenaVP was also asked to implement the Track Card component as a fully presentational (“dumb”) component by May 18, 2026.
   - Lorenzo-StJohn was offered responsibility for implementing the Player feature, but preferred to work on the Registration and Login pages instead.

8. **Communication schedule:** Due to mikhalenkadaniil’s work schedule, the team agreed to temporarily schedule voice meetings at **15:00 UTC+2** / **17:00 UTC+4** for the next two weeks. The exact meeting day will be agreed upon in advance before each call.

---

## Action Items

| #   | What                                                                 | Who            | By when          |
| --- | -------------------------------------------------------------------- | -------------- | ---------------- |
| 1   | Refactor mock data into JSON format and align fields with API schema | AlenaVP        | May 17, 2026     |
| 2   | Implement Track Card as a dumb/presentational component              | AlenaVP        | May 18, 2026     |
| 3   | Start working on Registration and Login pages                        | Lorenzo-StJohn | —                |
| 4   | Finalize shared project structure during development                 | Entire team    | Ongoing          |
| 5   | Continue infrastructure and architecture discussions                 | Entire team    | Ongoing          |
| 6   | Schedule next voice meeting                                          | Entire team    | Before next sync |

---

## Reference Links

| Resource                                   | Link                                                                                                        |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Async reactivity with resources            | https://angular.dev/guide/signals/resource                                                                  |
| Reactive data fetching with `httpResource` | https://angular.dev/guide/http/http-resource                                                                |
| Taiga UI                                   | https://taiga-ui.dev/                                                                                       |
| Angular Sprint README                      | https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/README.md        |
| MusicFlow project spec                     | https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/PROJECT_MUSIC.md |
| Jamendo API docs                           | https://developer.jamendo.com/v3.0/docs                                                                     |
