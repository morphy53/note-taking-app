# 📝 Notes — Smart Note-Taking App

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-000000?logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![Inngest](https://img.shields.io/badge/Inngest-1A1A1A?logo=inngest&logoColor=white)](https://www.inngest.com/)
[![Clerk](https://img.shields.io/badge/Clerk-0A0A0A?logo=clerk&logoColor=white)](https://clerk.com/)
[![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)](https://zod.dev/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Lucide](https://img.shields.io/badge/Lucide-000000?logo=lucide&logoColor=white)](https://lucide.dev/)
[![MDX](https://img.shields.io/badge/MDX-1B1F24?logo=mdx&logoColor=white)](https://mdxjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0EA5E9?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![class-variance-authority](https://img.shields.io/badge/CVA-000000)](https://cva.style/)

**A modern, fast, and minimal note-taking application.**

[View Demo](https://note-taking-app-chi-three.vercel.app) · [Report Bug](https://github.com/morphy53/note-taking-app/issues) · [Request Feature](https://github.com/morphy53/note-taking-app/issues)

</div>

-----

## 📖 Overview

**Notes** is designed to help users capture, organize, search, and manage information effortlessly. Built with a clean UI, intuitive workflow, and powerful features like tagging, search filters, and cloud sync — all powered by a robust **Next.js** and **PostgreSQL** architecture.

This project features a fully configured **Dev Container**, allowing zero-setup development environments using Docker.

-----

## 🚀 Features

### ✏️ Core Experience

  * **CRUD Operations:** Create, edit, delete, and archive notes instantly.
  * **Rich Text Support:** Optional rich-text editing for detailed entries.
  * **Organization:** Tagging system and category management.
  * **Sorting:** Sort by title, date modified, or custom tags.

### ⚡ Background Workflows (Inggest)

  * **Reliable Job Processing:** Complex tasks run in the background without blocking the UI.
  * **Event-Driven:** Architecture set up to handle events (e.g., user.signup, note.created).
  * **Retries & durability:** Automatic error handling and retries for critical operations.

### 🔍 Search & Discovery

  * **Full-Text Search:** Find notes instantly by title or content.
  * **Smart Filters:** Filter by date range or specific tags.
  * **Shareable URLs:** Search states are preserved in the URL for easy bookmarking.

### 👤 User & Security

  * **Secure Auth:** Powered by **Clerk** (Social login, Email/Password).
  * **Data Isolation:** Middleware ensures users only access their own data.
  * **Persistency:** PostgreSQL database ensures data integrity.

### 🎨 UI & Customization

  * **Responsive Design:** Mobile-first approach using **Tailwind CSS**.
  * **Theming:** Light, Dark, and System modes.
  * **Typography:** Customizable font families and size (Small/Medium/Large).

-----

## 🧱 Tech Stack

| Area             | Technology                                        |
| ---------------- | --------------------------------------------------|
| Frontend         | Next.js, React, TypeScript                        |
| UI Components    | shadcn/ui, Radix UI, TailwindCSS, Lucide Icons    |
| Forms/Validation | React Hook Form, Zod, @hookform/resolvers         |
| Styling Helpers  | class-variance-authority, tailwind-merge, clsx    |
| Backend          | Next.js API Routes                                |
| Database         | PostgreSQL, Drizzle ORM                           |
| Workflows        | Inngest                                           |
| Auth             | Clerk                                             |
| Markdown/MDX     | MDX Editor, next-mdx-remote, remark-gfm           |
| Deployment       | Vercel, Docker                                    |

-----

## 🛠️ Getting Started

### Prerequisites

  * **Node.js** 18+
  * **npm** or **yarn**
  * **Docker** (Optional, for Dev Container or local DB)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/morphy53/note-taking-app.git
cd notes-app
```

### 2️⃣ Environment Setup

Create a `.env` file in the root directory. You can copy the sample:

```bash
cp .env.sample .env
```

**Required Variables:**

```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Database Setup (Drizzle)

Push the schema to your database:

```bash
npm run db:push
```

*(Or if using migrations: `npm run db:generate && npm run db:migrate`)*

### 5️⃣ Run the App

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 6️⃣ Start Inggest Dev Server (Optional)

To test background functions locally, run the Inggest dashboard:
Bash

```bash
npm run inngest
```

Open [http://localhost:8288](http://localhost:8288) to view the Inggest dashboard.

-----

## 🐳 Dev Container (Zero Setup)

This project includes a `.devcontainer` configuration. If you have **VS Code** and **Docker** installed, you don't need to install Node or Postgres locally.

1.  Open the project in VS Code.
2.  Click the prominent button: **"Reopen in Container"** (or press `F1` -\> `Dev Containers: Reopen in Container`).
3.  Wait for the container to build.

**What happens automatically?**

  * ✅ Node.js & PostgreSQL are installed in the container.
  * ✅ Dependencies (`npm install`) run automatically.
  * ✅ Database is initialized.
  * ✅ Starts Inggest Dev Server.
  * ✅ VS Code extensions (ESLint, Prettier, Tailwind) are pre-installed.

-----

## 🛣️ Roadmap

  - [ ] **Offline Support:** PWA capabilities for offline reading/writing.
  - [ ] **AI Summaries:** Integration with OpenAI to summarize long notes.
  - [ ] **Collaboration:** Note sharing & collaboration.
  - [ ] **File Attachments:** Drag-and-drop image and PDF support.
  - [ ] **Mobile App:** React Native wrapper.

-----

## 🤝 Contributing

Contributions are welcome\! Please follow these steps:

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

-----

## 📄 License

MIT License © 2025
