# Contributing to Escapade 🎉

Thank you for your interest in contributing to **Escapade** — the official GDG On Campus USLS landing page! We welcome contributions of all kinds, from bug fixes and UI improvements to new features and documentation.

Please take a moment to read this guide before getting started.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `v18.0.0` or higher (`v20.x` or `v22.x` recommended)
- **pnpm** (preferred package manager)
  ```bash
  npm install -g pnpm
  ```
- **Git**

### Local Setup

1. **Fork** this repository and **clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/escapade.git
   cd escapade
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key_here
   ```
   > ⚠️ Never commit `.env.local` or any file containing secrets.

4. **Start the development server:**
   ```bash
   pnpm dev
   ```

---

## Project Structure

This project follows an **MVC-inspired** architecture:

```
src/
├── assets/         # Static images and media files
├── components/     # Reusable UI components (InputField, Modals, etc.)
├── controllers/    # Business logic and data-fetching hooks/functions
├── hooks/          # Custom React hooks
├── lib/            # Third-party client setup (e.g., supabase.ts)
├── models/         # TypeScript types, interfaces, and data models
├── routes/         # React Router route definitions
└── views/          # Page-level components (HeroSection, Navbar, etc.)
```

| Layer | Folder | Responsibility |
|---|---|---|
| **View** | `views/`, `components/` | UI rendering only — no direct data fetching |
| **Controller** | `controllers/` | Handles logic, calls models, passes data to views |
| **Model** | `models/` | TypeScript types and Supabase query functions |
| **Lib** | `lib/` | Supabase client instance |

> Please respect this structure when adding new files.

---

## Development Workflow

### 1. Create a branch

Always branch off from `main`:

```bash
git checkout main
git pull origin main
git checkout -b <type>/<short-description>
```

**Branch naming examples:**
- `fix/hero-section-mobile-layout`
- `feat/add-countdown-timer`
- `chore/update-dependencies`
- `docs/update-readme`

### 2. Make your changes

- Keep changes **focused and atomic** — one feature or fix per PR.
- Follow the [Coding Standards](#coding-standards) below.

### 3. Lint and format before committing

```bash
pnpm lint        # Check for ESLint errors
```

> Prettier is configured to run automatically. Ensure your editor respects `.prettierrc`.

### 4. Commit your changes

Follow the [Commit Message Guidelines](#commit-message-guidelines).

### 5. Push and open a PR

```bash
git push origin <your-branch-name>
```

Then open a Pull Request on GitHub against the `main` branch.

---

## Coding Standards

### TypeScript

- Use **explicit types** — avoid `any`.
- Define all shared types in `src/models/types.ts`.
- Prefer `interface` for object shapes and `type` for unions/aliases.

### React

- Use **functional components** with hooks only — no class components.
- Keep components **small and focused** — extract logic into controllers or hooks.
- Place reusable components in `src/components/`, page-level UI in `src/views/`.

### Tailwind CSS

- Use Tailwind utility classes directly in JSX.
- Avoid inline `style` props unless absolutely necessary.
- For complex or reusable styles, use Tailwind's `@apply` in a `.css` file (see `BoothPromotion.css` as an example).

### Prettier Config

This project enforces the following formatting rules (`.prettierrc`):

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all"
}
```

---

## Commit Message Guidelines

We follow the **[Conventional Commits](https://www.conventionalcommits.org/)** specification:

```
<type>(<scope>): <short description>
```

### Types

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore` | Dependency updates, config changes, tooling |
| `perf` | Performance improvements |

### Examples

```
feat(hero): add countdown timer to hero section
fix(tickets): resolve modal not closing on mobile
docs(contributing): add branch naming conventions
chore: update tailwindcss to v4.3.3
```

---

## Submitting a Pull Request

1. Ensure your branch is up to date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. Open a PR on GitHub with a **clear title and description**.
3. Fill out the PR template (if provided).
4. Link any related issues using `Closes #<issue-number>`.
5. Wait for a maintainer review — we aim to respond within **3–5 business days**.

### PR Checklist

- [ ] Code follows the project structure and coding standards
- [ ] No `console.log` statements left in production code
- [ ] No secrets or `.env` values committed
- [ ] Prettier formatting applied
- [ ] ESLint passes with no errors
- [ ] PR description clearly explains what changed and why

---

## Reporting Issues

Found a bug or have a suggestion? Please use our GitHub Issue templates:

- 🐛 **Bug Report** — for unexpected behavior or errors
- ✨ **Feature Request** — for ideas and improvements

For **security vulnerabilities**, please follow our [Security Policy](SECURITY.md) and **do not** open a public issue.

---

Thank you for contributing to Escapade! 💙 Every contribution, big or small, makes a difference.
