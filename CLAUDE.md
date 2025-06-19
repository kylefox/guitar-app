# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production (runs TypeScript check first)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

**Note**: There is no `npm run typecheck` command. TypeScript checking happens automatically during `npm run build`.

## Architecture Overview

This is a client-side only Progressive Web App built with React + TypeScript + Vite. All data is stored locally in the browser using IndexedDB.

### Data Flow
1. **User Interface** (React components in `/pages`) → 
2. **Service Layer** (`/services/database.ts`) → 
3. **IndexedDB** (via Dexie.js ORM)

### Key Architectural Decisions

**Offline-First Database**: 
- Uses Dexie.js to wrap IndexedDB for reactive, typed database operations
- Two tables: `guitars` and `serviceRecords` (service records not yet implemented in UI)
- All CRUD operations go through service classes (`GuitarService`, `ServiceRecordService`)
- Relationships managed manually (e.g., deleting a guitar cascades to delete its service records)

**Routing Structure**:
- `/` - Guitar list with search
- `/add` - Add new guitar form
- `/guitar/:id` - View guitar details
- `/guitar/:id/edit` - Edit existing guitar

**Type Safety**:
- All data models defined in `/types/guitar.ts`
- Form data has separate interfaces from database models
- React Hook Form provides runtime validation

**Styling Approach**:
- Tailwind CSS v4 with new `@import "tailwindcss"` syntax
- No custom Tailwind config needed
- PostCSS configured with `@tailwindcss/postcss`

### Important Configuration Notes

1. **TypeScript**: `verbatimModuleSyntax` is set to `false` in tsconfig.app.json (was causing export issues)

2. **PWA**: Configured in vite.config.ts but missing icon assets (will show console warnings)

3. **No Backend**: This is a fully client-side app. No API calls, no authentication, no server-side code.

### Common Issues & Solutions

**Blank page on load**: Usually means a module import error. Check browser console and ensure dev server was restarted after dependency changes.

**TypeScript build errors**: The codebase uses strict TypeScript. Optional chaining results must be coerced to boolean in filter functions (use `?? false`).

**Tailwind not working**: Must use Tailwind CSS v4 syntax (`@import "tailwindcss"`) not v3 directives.