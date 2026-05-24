# Meeting Note — Sprint 1 Retrospective & Sprint 2 Planning

|             |                                           |
| ----------- | ----------------------------------------- |
| **Date**    | May 19, 2026                              |
| **Place**   | Discord (voice event)                     |
| **Members** | AlenaVP, Lorenzo-StJohn, mikhalenkadaniil |

---

## Agenda

1. Sprint 1 review and completed work
2. Discussion of collaboration and communication issues
3. Review of implemented Track Card designs
4. Pull request and review workflow improvements
5. Sprint 2 page assignments and planning
6. UI consistency and responsive design decisions
7. Discussion of frontend/backend priorities

---

## Outcomes and Decisions

1. **Completed work:**
   - Lorenzo-StJohn fully prepared the About page structure and layout.
   - mikhalenkadaniil implemented the Music Card component according to the project requirements. The Play button integration will be added during the current sprint.
   - AlenaVP implemented three Track Card design variations for:
     - Search page
     - Album page
     - Artist page

     The cards include animated UI effects such as:
     - neon glow highlights;
     - animated equalizer visualization.
       > To refactor all of these cards, a new ticket was created by user Lorenzo-StJohn.

2. **Collaboration and communication:**
   - The team actively collaborated through pull requests and discussions.
   - However, several discussions in chat became too long and inefficient for relatively minor topics.
   - The team agreed that short voice calls are more productive than extended text discussions.

3. **Communication schedule update:**
   - The team proposed regular short sync calls on:
     - Tuesday
     - Thursday
     - Saturday
   - Preliminary next meeting time:
     - Thursday, 15:00–15:30.

4. **Pull request and review process:**
   - The team agreed that very large pull requests make reviews significantly harder.
   - Future PRs should be smaller and more focused.
   - Review comments should be separated into:
     - required fixes (bugs/issues);
     - optional improvements (semantics, validation, style preferences).

5. **Task prioritization:**
   - The team agreed that primary sprint requirements must always be completed before starting secondary refactoring or experimental improvements.

6. **Requirements clarification:**
   - Several misunderstandings occurred because implementation details were not clarified before development started.
   - The team agreed to discuss ambiguous requirements earlier before implementation.

7. **UI consistency decision:**
   - The team selected a unified Track Card approach across the project:
     - equalizer overlay animation;
     - Play/Pause button positioned on top of the cover image;
     - consistent card geometry and interactions.

8. **Responsive UI improvements:**
   - The team agreed to:
     - configure responsive font breakpoints;
     - implement ellipsis truncation for long titles;
     - continue building layouts with Taiga UI components while preserving the geometry from the original mockups.

9. **Backend development:**
   - Backend-related work will be postponed until Sprint 3–4.
   - Current focus remains on frontend architecture and UI implementation.

---

## What Went Well

- Strong visual implementation and UI experimentation.
- Successful implementation of animated interactive elements.
- Team members remained supportive and available for help.
- Sprint extension allowed more thoughtful implementation and experimentation.

---

## Challenges

- Excessive time spent on mock refactoring that was ultimately not merged into `main`.
- Long text discussions slowed decision-making.
- Large pull requests complicated the review process.
- Some requirements were unclear before implementation started.

---

## Action Items

| #   | What                                                       | Who              | By when |
| --- | ---------------------------------------------------------- | ---------------- | ------- |
| 1   | Implement Registration page                                | Lorenzo-StJohn   | Ongoing |
| 2   | Implement Login page                                       | Lorenzo-StJohn   | Ongoing |
| 3   | Implement Discover page                                    | mikhalenkadaniil | Ongoing |
| 4   | Implement Search page                                      | AlenaVP          | Ongoing |
| 5   | Configure responsive typography breakpoints                | Entire team      | Ongoing |
| 6   | Implement ellipsis truncation for long track titles        | Entire team      | Ongoing |
| 7   | Keep pull requests smaller and easier to review            | Entire team      | Ongoing |
| 8   | Clarify implementation details before starting development | Entire team      | Ongoing |
| 9   | Schedule and maintain short regular voice sync meetings    | Entire team      | Ongoing |

---

## Reference Links

| Resource               | Link                                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| MusicFlow project spec | https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/PROJECT_MUSIC.md |
| Taiga UI               | https://taiga-ui.dev/                                                                                       |
