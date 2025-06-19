This is an experiment in _**✨ Vibe Coding™ ✨**_ with Claude Code.

Aside from this initial prompt, nothing in this codebase was written by a human:

> I want to build a simple app for tracking my guitar collection. I want to keep track of each guitar I own or have owned (model, serial number, date purchased, price, photos, etc) as well as a history of service (string changes, repairs, etc). I want the app to work in a web browser on desktop/mobile, and ideally be installable as a progressive web app (PWA) so it feels like a native app.
>
> Your tasks:
>
> 1. Choose a progamming language/framework that will work best for this
> 2. Setup and configure the project
> 3. Create a detailed checklist list of the requirements (TODOS.md)
> 4. Begin building out the functionality.
>
> Start with the most basic case: adding, editing, deleting guitars from my collection.
>
> think hard at every step, and make your own decisions (tech stack, database, etc).

# Guitar Collection Tracker

A Progressive Web App for tracking your guitar collection with offline support. Keep detailed records of each guitar you own including purchase info, specs, and service history.

**Live Demo**: [https://guitar-tracker.netlify.app](https://guitar-tracker.netlify.app)

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Database**: IndexedDB (via Dexie.js)
- **Routing**: React Router v7
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **PWA**: vite-plugin-pwa

## Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

### Other Commands
```bash
npm run lint     # Run ESLint
npm run typecheck  # Run TypeScript compiler check
```

## Features

- ✅ Add, edit, delete, and view guitars
- ✅ Search across all guitar fields
- ✅ Offline-first with IndexedDB
- ✅ Responsive design (mobile/desktop)
- ✅ Installable as PWA
- 🚧 Service history tracking (coming soon)

## Project Structure

```
src/
├── components/     # Shared UI components
├── pages/         # Route page components
├── services/      # Database layer
├── types/         # TypeScript interfaces
└── main.tsx       # App entry point
```
