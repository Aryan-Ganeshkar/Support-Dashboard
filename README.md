# Helpdesk — Customer Support Dashboard

A customer support ticket dashboard built for a frontend technical assignment. Support agents can view ticket statistics, browse analytics, and search/filter/manage tickets from a single place.

## Overview

The app has two views:

- **Overview** — four stat cards (Total / Open / In Progress / Resolved), computed live from ticket data, plus three Recharts visualizations (status distribution, priority distribution, tickets-per-day).
- **Tickets** — searchable, filterable ticket list (table on desktop, cards on mobile) with inline status updates and a slide-in details drawer showing full customer info and a chat-style conversation history.

## Tech stack

- React 19 + Vite
- Tailwind CSS v4
- Zustand — global ticket store (data, loading/error, search, filters, selected ticket)
- Recharts — status/priority/overview charts
- Framer Motion — entrance/stagger animations, animated stat counters, sliding sidebar tab indicator, and drawer transitions
- React Toastify — success/error notifications on status changes
- React Router — `/` (Overview) and `/tickets` (Tickets)
- Lucide React — icons

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## API / data

Ticket data is fetched from **JSONPlaceholder** (`https://jsonplaceholder.typicode.com/`), a free public REST API (`/users` + `/posts`). JSONPlaceholder has no concept of "support tickets", so `src/api/ticketsApi.js` normalizes the response into the shape this app needs — mapping each post + its author into a ticket with a deterministic (but pseudo-random) priority, status, created date, and a generated conversation thread. Status updates are sent as a `PATCH` request to the same API to simulate a real write.

If the network request fails, the app falls back to a small local mock dataset (`src/data/mockTickets.js`) so the UI still works offline — this is handled inside `fetchTickets()`.

All API logic lives in `src/api/`, kept separate from both the UI and the Zustand store.

## Project structure

```
src/
  api/            # fetch + normalize logic (ticketsApi.js)
  data/           # local fallback mock tickets
  store/          # Zustand ticket store
  components/
    layout/       # Sidebar, Header, DashboardLayout
    dashboard/    # StatCard, StatsRow, AnalyticsCharts
    tickets/      # Filters, Table, Card, Badges, StatusSelect, Drawer, Conversation
    ui/           # LoadingSkeleton, EmptyState, ErrorState
  pages/          # Overview.jsx, Tickets.jsx
  App.jsx         # routes + toast container
```

## Features implemented

- Live-computed stats (Total / Open / In Progress / Resolved)
- Status + priority distribution charts and a tickets-per-day area chart
- Search (name, email, subject, ticket ID) combined with status + priority filters
- Inline status change with success/error toasts, reflected instantly in stats and charts
- Ticket details side drawer: customer info, issue details, and a chat-style conversation
- Loading state with skeleton cards/rows (no bare "Loading…" text)
- Error state with a retry button
- Empty state with a "Clear filters" action
- Fully responsive: collapsible sidebar → mobile drawer, table → cards, stacked filters

## AI tools used

This project was built with the help of **Claude** (Anthropic) — used for scaffolding the component structure, the Zustand store, the API normalization layer, and the Tailwind styling. All code was reviewed for correctness and understanding before submission.
