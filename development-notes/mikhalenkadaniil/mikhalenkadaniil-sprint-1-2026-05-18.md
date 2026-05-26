# What was done in Sprint 1

### What was done:

- I initialized the repository and set up the project structure. I also configured CI/CD pipelines, which was completely new for me, so this became an important practical experience. In addition, I set up ESLint, Prettier, and lint-staged to maintain code quality and formatting consistency in the project.

- I also created a reusable dumb component for displaying music cards, designed to be flexible enough for reuse in different parts of the application.

- And a lot of time for discussing project with a team and code review (not estimated below)

### Time spent: Around 15–18 hours.

## Setting up project infrastructure and code quality tools

#### Problems:

Since I had never configured CI/CD before, it was difficult at first to understand how the automation pipeline should work and how all tools interact with each other. I also had to figure out how to correctly connect ESLint, Prettier, and lint-staged so they would not conflict.

#### Solutions:

I studied examples from documentation and existing repositories, gradually configuring each tool step by step. After several attempts, I managed to make the checks and formatting work consistently both locally and in the pipeline.

#### What I learned:

I learned the basics of CI/CD configuration and better understood how automated checks help maintain code quality in team development. I also gained practical experience integrating ESLint, Prettier, and lint-staged into a real project.

## Creating a reusable music card component

#### What was done:

I developed a universal dumb component for music cards. The component is responsible only for displaying data and does not contain business logic, making it easier to reuse and maintain.

#### Problems:

At first, I was unsure how flexible the component structure should be and which data should be passed through inputs so the component would remain reusable without becoming overly complicated.

#### Solutions:

I focused on separating presentation from logic and kept the component maximal simple. I moved all dynamic behavior outside the component and left only the UI-related responsibility inside it.

#### What I learned:

I better understood the concept of smart and dumb components and why separating responsibilities improves maintainability and scalability of the application.

#### Discoveries during code review:

During code review, I found out that a page can contain more than one header element. Before that, I mistakenly thought there should only be one header per page.

## Plans for Sprint 2:

#### Plans:

In the next sprint, I plan to continue building reusable UI components, learn Taiga UI and start implementing pages with more complex logic.

And also focus more time on writing code instead of codereview that sometimes was superfluous.
