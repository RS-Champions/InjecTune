# Sprint 1

## ✨ What was done in Sprint 1

#### **What was done:**

I created an `about` page last week. This week, I started sorting through the `signup` and `login` pages.

**Time spent:**
I think about 20 hours.

### Validation of the registration form

#### **Problems:**

When using the Taiga UI library, there is a ready-made convenient output of validation error messages, but the problem is that the error text is preset and there is no way to change it directly.

#### **Solutions:**

While searching for a solution to the problem, I found that there is a special injection token `TUI_VALIDATION_ERRORS`, which can be used to set the text that will be displayed for each type of validation (for example, in the case of an incorrect email).

#### **What I learned:**

As a result, I gained additional experience in using `useFactory`, a special mechanism for configuring Dependency Injection, which is an important Angular concept.

## ✨ Plans for Sprint 2

**Plans:**

In the next sprint, I plan to finish work on the `signup` and `login` pages by configuring integration with Google's cloud platform such as Firebase.
