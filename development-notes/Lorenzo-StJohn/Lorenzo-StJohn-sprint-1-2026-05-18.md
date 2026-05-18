# Sprint 1

## ✨ What was done in Sprint 1

#### **What was done:**

I built the `About` page: two components (the page itself and a developer card), a service (fetches card data from JSON), and an interface (describes the format in which developer data is stored).

**Time spent:**
I think about 20 hours.

### Rendering data in the `AboutCard` component template

#### **Problems:**

I ran into a problem with my own code’s readability. There was a lot of mixed logic: displaying an error message when data failed to load, showing a loader while the data was loading, and handling the case when the loaded array turned out to be empty.

#### **Solutions:**

First, I wrote my own generic interface that held the data, a loading flag, and an error status. But this minimal set of fields still led to a lot of hard-to-read checks in the template.

Our team lead advised using a recently introduced Angular feature called `Resource` for this task, which noticeably reduced the amount of code.

Our mentor suggested an even more suitable entity for this task — `httpResource`, which, unlike `Resource`, does not require `params`. As a result, the code became even more concise and readable.

#### **What I learned:**

In the end, I learned how to use a new Angular feature like `httpResource`, which in the latest Angular version is becoming stable.

### Working with Taiga UI while developing the `About` page

#### **What was done:**

I wanted to style the page closely enough to the design mockup generated in Stitch (and I think I did it).

#### **Problems:**

I encountered the fact that Taiga UI comes with light and dark themes out of the box, and they are applied based on the user’s device system settings. The mockup, however, was designed exclusively for a dark theme.

Using dev tools, I found where exactly `dark` or `light` was being set on the page, but trying to hardcode it directly was unsuccessful.

An AI chat also suggested a non-working solution, apparently lacking enough information about this library.

#### **Solutions:**

While exploring the library’s website, I discovered that the theme could be set in the `provideTaiga` provider configuration.

#### **What I learned:**

While searching for information on this specific issue, I found out not only how to set dark mode, but also other useful features of this libraries and other sections of its website that I had overlooked during my initial quick look. I will continue to explore the library’s capabilities.

## ✨ Plans for Sprint 2

**Plans:**
In the next sprint, I plan to build the registration and login pages. I’ll need to think through the form-filling logic, learn to properly work with child routes using `loadChildren`, write a `canDeactivate` guard for the case when a user tries to navigate away from a page with a filled but unsent form, and determine the services needed for registration and login.
