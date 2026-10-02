# 🚀 Escapade — GDG On Campus USLS

> The official landing page for **Escapade**, a GDG On Campus USLS event — featuring event info, a ticketing section, leaderboard, and an admin dashboard.

---

## ✨ Features

- 🏠 **Landing Page** — Hero, Story, Mission, Tickets, and Leaderboard sections
- 🔐 **Admin Login** — Protected modal at `/admin` for authorized access
- 📊 **Dashboard** — Admin-only view at `/dashboard`
- ⚡ **Supabase Integration** — Real-time data for leaderboard and ticketing
- 📱 **Responsive Design** — Mobile-first layout with Tailwind CSS v4
- 🎨 **Scroll Animations** — Smooth reveal effects via custom hooks

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Backend / DB** | [Supabase](https://supabase.com/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Linter** | ESLint + Prettier |

---

## 🗂️ Project Structure

```
src/
├── assets/         # Images and static media
├── components/     # Reusable UI components (modals, inputs, etc.)
├── controllers/    # Business logic and data-fetching
├── hooks/          # Custom React hooks (e.g., useScrollReveal)
├── lib/            # Supabase client setup
├── models/         # TypeScript types and data models
├── routes/         # React Router route definitions
└── views/          # Page-level sections (Hero, Story, Mission, etc.)
```

---

## 🛠️ Prerequisites

- **Node.js** `v18.0.0+` (v20.x or v22.x recommended) — [nodejs.org](https://nodejs.org/)
- **pnpm** (preferred) — `npm install -g pnpm`
- **Git** — [git-scm.com](https://git-scm.com/)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd escapade
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key_here
```

> ⚠️ Never commit `.env.local`. It is already listed in `.gitignore`.

### 4. Start the development server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|:---|:---|
| `pnpm dev` | Start local dev server with HMR |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint across the project |

---

## 🌐 Routes

| Path | Description |
|---|---|
| `/` or `/home` | Main landing page |
| `/story` | Story section (anchor) |
| `/mission` | Mission section (anchor) |
| `/tickets` | Tickets section (anchor) |
| `/leaderboard` | Leaderboard section (anchor) |
| `/admin` | Landing page + Admin login modal |
| `/dashboard` | Admin dashboard (protected) |

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before opening a PR, and make sure to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

For security issues, see our [Security Policy](SECURITY.md).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with 💙 by GDG On Campus USLS</p>
