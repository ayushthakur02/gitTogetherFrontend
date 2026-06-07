# gitTogether — Frontend

A developer matchmaking platform. Browse collaborators in a swipeable feed, send collaboration requests, and manage your matches — built for developers who want to find people who share their stack and vision.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| UI | Chakra UI v3 |
| Routing | TanStack Router |
| Data Fetching | TanStack React Query |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| HTTP | Axios |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Copy the env file and fill in your values
cp .env.example .env
```

**.env variables**

```
VITE_API_BASE_URL=http://localhost:3069
```

```bash
# Start the dev server
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── api/          # Axios request modules (auth, profile, user, upload, request)
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── interfaces/   # TypeScript types and interfaces
├── pages/        # Page-level components (Feed, Profile, Matches, Requests, Chats)
├── routes/       # TanStack Router route definitions
├── schemas/      # Zod validation schemas
├── utils/        # Helper utilities
└── theme.ts      # Chakra UI theme configuration
```
