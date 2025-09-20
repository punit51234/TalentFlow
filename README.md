
# TalentFlow — Mini Hiring Platform

> A polished, front-end–only hiring tool where HRs can manage jobs, candidates, assessments, and notifications — with realistic server behavior simulated via MSW/Mirage, local pagination/virtualization, and robust local persistence (IndexedDB).

---

## 🔗 Links

* **GitHub Repository**: [TalentFlow Repo](https://github.com/punit51234/TalentFlow)
* **Live Demo**: [TalentFlow on Vercel](https://project-chi-pearl-49.vercel.app/)

---

## ✨ Highlights

* *HR-focused UX* with a clean sidebar (Company Logo, \*Dashboard, \*\*Jobs, \*\*Candidates, \*\*Assessments, \**Notifications*)
* *Dashboard*: active jobs, total candidates, assessments, hiring rate, recent activity, and urgent tasks
* \*Jobs: create/edit/archive, \**drag-and-drop reorder* (optimistic UI + rollback), deep links
* \*Candidates: 1000+ seeded profiles, client search + stage filter, \*\*virtualized lists, profile timeline, \**Kanban* stage moves, notes with @mentions
* \*Assessments: builder per job (sections + question types), \**live preview*, local persistence, runtime validation & conditionals
* *Notifications*: centralized feed for system actions
* *“Server-like” API* simulated with MSW/Mirage (latency + error injection)
* *Persistence*: IndexedDB (Dexie/localForage). App restores from local DB on refresh

---

## 🧭 Table of Contents

* [Tech Stack](#-tech-stack)
* [Features & Flows](#-features--flows)
* [Routes](#-routes)
* [Data & Mock API](#-data--mock-api)
* [Persistence Model](#-persistence-model)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Configuration](#-configuration)
* [Troubleshooting](#-troubleshooting)
* [Roadmap](#-roadmap)
* [License](#-license)

---

## 🧰 Tech Stack

* *React* (with React Router)
* *Vite* (fast dev server & build)
* *Tailwind CSS* (utility styling; dark mode supported)
* *React Query* / TanStack Query (network/cache layer for mock API)
* *MSW or MirageJS* (pick one; this project showcases Mirage by default)
* *Dexie / localForage* (IndexedDB wrapper for persistence)
* *Drag-and-Drop*: DnD-Kit (reordering, Kanban)
* *Virtualization*: react-window / react-virtualized (large candidate lists)
* *Icons*: lucide-react

---

## 🧪 Features & Flows

### 1) Jobs Board

* *List with server-like pagination & filtering* (title, status, tags)
* *Create/Edit* in modal or dedicated route (title required, *unique slug*)
* *Archive/Unarchive*
* *Reorder* via drag-and-drop

  * *Optimistic update* with rollback when /jobs/\:id/reorder returns an injected error
* *Deep link*: /jobs/\:jobId to jump straight to a job

### 2) Candidates

* *1,000+ seeded candidates* across jobs/stages
* *Virtualized list* for smooth scrolling
* *Client search* (name/email) + *server-like filter* (stage)
* *Kanban board* to move candidates between stages:

  * applied → screen → tech → offer → hired (+ rejected)
* *Candidate profile*: /candidates/\:id shows details & *timeline* of status changes
* *Notes with @mentions* (UI only; suggestions from a local user list)

### 3) Assessments

* Per-job *assessment builder*:

  * Sections + questions:

    * \*Single choice, \*\*Multi choice, \*\*Short text, \*\*Long text, \*\*Numeric (range), \**File upload (stub)*
  * *Live preview* renders a fillable form
  * *Validation rules*: required, numeric range, max length
  * *Conditional logic*: e.g., show Q3 only if Q1 === “Yes”
* *Local persistence*:

  * Builder state and *candidate responses* are stored in IndexedDB
* Endpoints mimic saving/loading & submission round-trip

### 4) Notifications

* Central feed listing system and user actions (created, edited, archived, stage moved, submission made, etc.)

---

## 🗺 Routes

/                        → Landing/Intro (optional redirect)
/hr/dashboard            → HR Dashboard (KPIs, recent activity, urgent tasks)
/hr/jobs                 → Jobs board (list, filters, pagination)
/hr/jobs/new             → Create Job (guided form → then edits on new route)
/jobs/\:jobId             → Job Detail/Edit (reorder, archive, deep link)
/hr/candidates           → Candidates list (virtualized + filters)
/candidates/\:id          → Candidate Profile (timeline, notes)
/hr/assessments          → Assessments overview
/assessments/\:jobId      → Assessment Builder + Live Preview
/hr/notifications        → Notifications center

---

## 🔌 Data & Mock API

> *No real server.* MSW/Mirage simulate a REST API and latency/errors. The front-end treats it like a real network and writes through to IndexedDB.

*Resources & Shapes*

| Method | Path                        | Query / Body                         | Returns                                 | Notes                                       |
| ------ | --------------------------- | ------------------------------------ | --------------------------------------- | ------------------------------------------- |
| GET    | /jobs                       | search, status, page, pageSize, sort | { data: Job\[], meta: { total } }       | server-like pagination + filters            |
| POST   | /jobs                       | { title, slug?, tags?, status? }     | Job                                     | title required; slug auto-unique if omitted |
| PATCH  | /jobs/\:id                  | Partial Job                          | Job                                     | edit title/tags/status                      |
| PATCH  | /jobs/\:id/reorder          | { fromOrder, toOrder }               | { ok: true }                            | randomly 500 to test rollback               |
| GET    | /candidates                 | search, stage, page, pageSize        | { data: Candidate\[], meta: { total } } | virtualized list fed by paged API           |
| POST   | /candidates                 | { name, email, stage?, jobId? }      | Candidate                               | stage defaults to applied                   |
| PATCH  | /candidates/\:id            | { stage?, notes? }                   | Candidate                               | stage transitions for Kanban                |
| GET    | /candidates/\:id/timeline   | —                                    | TimelineEvent\[]                        | status history                              |
| GET    | /assessments/\:jobId        | —                                    | AssessmentDoc                           | builder document per job                    |
| PUT    | /assessments/\:jobId        | AssessmentDoc                        | AssessmentDoc                           | upsert sections & questions                 |
| POST   | /assessments/\:jobId/submit | AssessmentResponse                   | { id, savedAt }                         | stored locally (per candidate)              |

*Seeding*

* *25 jobs* (active + archived)
* *1,000 candidates* (random jobs & stages)
* \*≥ 3 assessments, each with \**10+ questions*
* *Latency*: 200–1200 ms
* *Write error rate*: 5–10% to validate optimistic UI + rollback

---

## 💾 Persistence Model

* *IndexedDB* (via Dexie/localForage) stores:

  * jobs, candidates, assessments, reorder state
  * candidate timelines
  * assessment builder drafts & submissions
* On app start, data is *restored* from IndexedDB. If DB is missing/cleared, Mirage reseeds defaults.
* To return to a clean slate: *clear site data* (Application → Storage → Clear) and refresh.

---

## 🧱 Project Structure

> Paths may vary; this is representative.

src/

api/

```
src/
  api/
    server/               # Mirage/MSW handlers, seeds, latency/error toggles
    services/
      jobs.js             # fetch wrappers (React Query)
      candidates.js
      assessments.js

```

components/

```
common/               # Sidebar, Header, Cards, Charts, Loaders, Toasts
ui/                   # small reusable primitives
```

features/

```
src/
  api/
    server/               # Mirage/MSW handlers, seeds, latency/error toggles
    services/
      jobs.js             # fetch wrappers (React Query)
      candidates.js
      assessments.js
  components/
    common/               # Sidebar, Header, Cards, Charts, Loaders, Toasts
    ui/                   # small reusable primitives
  features/
    dashboard/
      DashboardPage.jsx
    jobs/
      JobsPage.jsx
      JobDetailPage.jsx
      JobForm.jsx
      JobRow.jsx
      reorder/            # DnD order list, sensors, optimistic handlers
    candidates/
      CandidatesPage.jsx
      CandidateProfilePage.jsx
      CandidateKanban.jsx
      VirtualizedList.jsx
    assessments/
      AssessmentsPage.jsx
      Builder.jsx         # sections, questions, validators, conditionals
      Preview.jsx         # live form preview
      RuntimeForm.jsx     # fillable form + rules
    notifications/
      NotificationsPage.jsx
  lib/
    db/                   # Dexie/localForage schema & adapters
    dnd/                  # DnD-Kit helpers
    validation/           # zod/yup (if used)
    utils/                # slugify, formatters, guards
  router/
    index.jsx             # React Router config
  styles/
    index.css             # Tailwind entry
  assets/
    logo.svg

main.jsx
App.jsx

```

lib/

```
db/                   # Dexie/localForage schema & adapters
dnd/                  # DnD-Kit helpers
validation/           # zod/yup (if used)
utils/                # slugify, formatters, guards
```

router/

```
index.tsx             # React Router config
```

styles/

```
index.css             # Tailwind entry
```

assets/
logo.svg

main.tsx

App.tsx

---

## 🚀 Getting Started

### Prereqs

* pnpm / npm / yarn

### Install & Run

# install

pnpm install        # or npm i / yarn

# dev (starts Mirage/MSW + Vite)

pnpm dev

# build

pnpm build

# preview build

pnpm preview

### Scripts (example)

json
{
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview --port 5173",
"typecheck": "tsc --noEmit",
"lint": "eslint ."
}
}

---

## ⚙ Configuration

* *Mirage/MSW*:

  * Toggle latency and error rates in src/api/server.\*
  * Seed sizes (jobs/candidates/questions) configurable in seed file
* *Dexie/localForage*:

  * DB name: talentflow-db (change as needed)
  * Tables: jobs, candidates, timelines, assessments, submissions, notifications
* *React Query*:

  * Query keys by resource (e.g., \['jobs', params])
  * Mutation handlers perform write-through to IndexedDB

---

## ✅ UX Notes

* *Pagination* everywhere to prevent layout jamming
* *Virtualization* for large candidate lists
* *Accessible DnD* (keyboard reordering where possible)
* *Optimistic updates* with visual toasts; *rollback* on server error
* *Form validation* with friendly messages; conditional questions explained inline
* *Deep links* to jobs and candidates for quick collaboration

---

## 🛠 Troubleshooting

* *Changes lost on refresh*
  Ensure IndexedDB is available and not blocked. If you intentionally want a fresh demo, clear site data and refresh.
* *Tailwind classes not applied / “unknown utility”*
  Verify Tailwind config and that files are within content globs. Avoid typos like from-indigo-600 without the gradient plugin or proper syntax.
* *Drag-and-drop not reordering*
  Confirm DnD-Kit sensors and sortable context wrap the list rows correctly; check that order is persisted and query invalidations run.
* *Optimistic UI not rolling back*
  Ensure /jobs/\:id/reorder occasionally returns 500 (controlled in Mirage) and mutations have onError handlers to revert.

---

## 🗺 Roadmap

* Multi-tenant orgs & role-based access
* Bulk candidate actions & imports
* Assessment scoring, analytics & proctoring stubs
* Webhooks mock (status notifications)
* Theming & custom branding pack
* More keyboard-accessible DnD patterns

---

## 📜 License

This project is for learning/demo purposes. Use freely with attribution.
© TalentFlow — Mini Hiring Platform

---

## 🙌 Credits

Built with ❤ using React, Vite, Tailwind, React Query, Mirage/MSW, Dexie/localForage, DnD-Kit, react-window, and lucide icons.

---

Do you want me to also add **badges** (like GitHub stars, forks, license, live link deploy badge) at the top of the README for a more professional look?
