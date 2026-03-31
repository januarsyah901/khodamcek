# Khodam Registry (Personal Edition)

## What This Is

A lightweight web-based Khodam (spiritual guardian) simulator with a personal twist of Indonesian internet humor. Users input their name, receive a deterministic result that persists in local SQLite storage, and browse previous checks through a history log. Built for solo personal use with cinematic animations powered by Framer Motion.

## Core Value

**Deterministic name-to-Khodam mapping with 100% persistence** — the same name always yields the same whimsical guardian, even if the Khodam list is reordered or expanded in the future.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [x] Landing page with dark theme and "Submit" button for name input
- [x] Deterministic hash function (name → Khodam ID) ensuring persistent results
- [x] SQLite database storing user name + mapped Khodam ID
- [x] 32 unique Khodam entities with descriptions grounded in Indonesian internet culture
- [x] Cinematic animation sequence during result reveal (text reveals, color shifts, effects)
- [x] Display selected Khodam with name, description.
- [x] History log showing all previously checked names (read-only view)
- [x] ID-based persistence so reordering/adding Khodams doesn't break old mappings

### Out of Scope

- Multi-user support or authentication — solo personal use only
- Admin panel for Khodam management — static seed data only
- Deployment/hosting — local development only
- Shareable links or public deployment
- Real-time updates or live Khodam list management
- Mobile app — web-first only

## Context

**Tech Stack (Fixed):**
- Next.js 15 (App Router)
- SQLite with Prisma ORM
- Tailwind CSS
- Lucide React for icons

**Humor Grounding:**
Khodam descriptions are rooted in Indonesian meme culture and internet references, not purely absurdist. This gives them cultural authenticity while being humorous to Indonesian audiences.

**Persistence Model:**
Uses hash-based determinism: `hash(name) % khodam_count` maps to a Khodam ID (not list position). The ID is stored in the database, so if the list is reordered or expanded later, the original mapping is preserved.

**Animation Expectations:**
Cinematic and elaborate — text reveals, color shifts, particle effects, or similar theatrical elements during the result reveal phase.

## Constraints

- **Tech Stack**: Next.js 15, SQLite, Prisma, Tailwind  
- **Scope**: Personal use only; no auth, no multi-user, no deployment
- **Data**: 30+ Khodams with. 
- **Persistence**: ID-based mapping to survive Khodam list evolution

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hash-based determinism | Ensures same name always maps to same Khodam; survives list reordering if using ID-based mapping | Pending |
| Static seed data | Simplicity for personal use; no admin overhead | Pending |
| Cinematic animations | Fits the "ritual" theme and user expectation for whimsy | Pending |
| Local SQLite only | Lightweight, no server needed, persistent across sessions | Pending |

---
*Last updated: 2026-03-29 after initialization*
