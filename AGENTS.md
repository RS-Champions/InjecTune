# AGENTS.md - Custom Agents for InjecTune

This file defines custom agents tailored to the InjecTune Angular project. These agents provide specialized expertise for common development tasks.

## Available Agents

### 1. Component Generator
**Name:** `ComponentGenerator`

**Purpose:** Generate and scaffold new Angular components with proper structure, styling, and testing.

**Expertise:**
- Create new standalone components
- Set up component templates with modern Angular syntax (@if, @for, @switch)
- Generate corresponding test files using Vitest
- Apply project conventions (naming, structure, selectors)
- Configure component inputs/outputs with signals

**Invocation:** Use when creating new components or refactoring existing ones.

---

### 2. Forms & Validation Specialist
**Name:** `FormsExpert`

**Purpose:** Design and implement Angular forms with validation, error handling, and reactive patterns.

**Expertise:**
- Create reactive forms with FormBuilder
- Implement custom validators
- Handle form state management
- Set up error messaging and user feedback
- Work with @angular/forms v21.2

**Invocation:** Use when building forms, implementing validation, or handling form submissions.

---

### 3. Routing & Navigation
**Name:** `RoutingArchitect`

**Purpose:** Design and implement Angular routing strategies with lazy loading and guards.

**Expertise:**
- Set up routing configuration in app.routes.ts
- Implement functional route guards
- Configure lazy-loaded feature modules
- Handle navigation and state preservation
- Implement breadcrumb or navigation tracking

**Invocation:** Use when designing application navigation or implementing routing features.

---

### 4. Testing & Quality Assurance
**Name:** `TestingExpert`

**Purpose:** Write comprehensive tests using Vitest and ensure code quality.

**Expertise:**
- Create unit tests for components, services, and utilities
- Mock dependencies and services
- Test async operations and observables with RxJS
- Configure test setup and teardown
- Achieve high code coverage
- Work with Vitest configuration and best practices

**Invocation:** Use when writing tests or debugging test failures.

---

### 5. Performance & Optimization
**Name:** `PerformanceOptimizer`

**Purpose:** Analyze and optimize Angular application performance.

**Expertise:**
- Implement OnPush change detection strategy
- Optimize component lifecycle
- Reduce bundle size
- Implement lazy loading
- Profile and measure performance
- Apply signals for improved reactivity
- Handle memory leaks and cleanup

**Invocation:** Use when optimizing performance or investigating slow components.

---

### 6. State & Dependency Injection
**Name:** `DISpecialist`

**Purpose:** Design and implement dependency injection patterns and state management.

**Expertise:**
- Configure services with providedIn injection tokens
- Implement singleton services
- Manage component dependencies
- Handle service communication with RxJS
- Design state management strategies
- Implement observable data flows

**Invocation:** Use when designing services or managing application state.

---

### 7. Angular Integration Assistant
**Name:** `AngularIntegrator`

**Purpose:** Integrate Angular features and handle common integration scenarios.

**Expertise:**
- Integrate third-party libraries into Angular
- Handle HttpClient configuration and interceptors
- Work with reactive programming patterns
- Implement custom directives and pipes
- Configure environment-specific builds
- Handle common Angular gotchas and edge cases

**Invocation:** Use when integrating libraries or implementing cross-cutting features.

---

## Usage Examples

### Example 1: Generate a New Component
```
Use the ComponentGenerator agent to create a new feature component with 
all necessary files (template, styles, tests) following project conventions.
```

### Example 2: Implement Complex Form
```
Use the FormsExpert agent to design a reactive form with custom validators, 
error handling, and accessibility features.
```

### Example 3: Debug Test Failures
```
Use the TestingExpert agent to diagnose failing tests and implement proper 
mocking strategies using Vitest.
```

### Example 4: Improve Performance
```
Use the PerformanceOptimizer agent to analyze component performance and 
implement OnPush change detection with signals.
```

---

## Project Context

- **Framework:** Angular 21.2
- **Language:** TypeScript 5.9
- **Testing:** Vitest 4.0
- **Styling:** SCSS
- **Build Tool:** Angular CLI 21.2
- **Node/npm:** Node 24.15, npm 11.12.1

## Notes

- All agents follow Angular 21.2 best practices
- Code should use modern syntax: standalone components, signals, and built-in control flow
- Tests should be written with Vitest (not Jasmine/Karma)
- Components should use OnPush change detection strategy when possible
- Service injection should use providedIn pattern
