# Guitar Collection Tracker

A Progressive Web App for tracking your guitar collection with offline support. Keep detailed records of each guitar you own including purchase info, specs, and service history.

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