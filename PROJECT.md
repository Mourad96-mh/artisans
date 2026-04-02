# ReseauArtisans — Project Overview

A French artisan marketplace platform that connects qualified tradespeople (artisans) with homeowners (particuliers) looking for construction/renovation work. Both sides are targeted equally.

**Goal:**

- **Artisans** — pay a one-time membership (120€ or 190€) to receive qualified leads in their zone
- **Homeowners** — free service, submit a project and receive up to 3 quotes within 48h

---

## How to Run

```bash
# 1. Start MongoDB
mongod

# 2. Start Backend (http://localhost:5000)
cd backend
npm run dev

# 3. Start Frontend (http://localhost:5173)
cd ..
npm run dev
```

**Admin access:** http://localhost:5173/admin/login

- Email: `admin@reseauxartisans.fr`
- Password: `admin123`

---

## Architecture

**Frontend** — React + Vite

- React Router v7, react-i18next (FR/EN), custom CSS only (no UI library)
- All API calls go through `src/services/api.js`

**Backend** — Express + MongoDB (Mongoose)

- JWT auth for admin, bcrypt password hashing
- Admin account auto-seeded from `backend/.env` on first run
- MongoDB: `mongodb://localhost:27017/artisan`

---

## How It Works

### For Homeowners (free)

1. Browse the site → CTA buttons lead to `/contact`
2. Fill the project form (name, email, phone, postal code, type of work, description)
3. Submit → saved in MongoDB with status `new`
4. Admin processes the request and connects them with matching artisans

### For Artisans (paid)

1. Browse `/packs` or `/devenir-pro` — see two pricing plans
2. Click "Choisir ce pack" → registration form appears inline
3. Fill form (company, name, email, phone, postal code, trade, comments)
4. Submit → saved in MongoDB with status `new`
5. Success message shows link to artisan portal: https://app.monartisanpro.com/login-artisan
6. Header always shows "Espace artisan" button → same portal URL

### For Admin

- Login at `/admin/login`
- Dashboard at `/admin` (JWT-protected) with **two tabs**:
  - **🔧 Artisans** — manage artisan registrations
  - **🏠 Projets clients** — manage homeowner project requests
- Each tab: stats bar, search + filters, table with inline status update and delete

---

## Pricing Plans (Artisans)

Annual subscription — renews every year.

| Pack       | Price   | Projects included | Per project after | Competition                |
| ---------- | ------- | ----------------- | ----------------- | -------------------------- |
| Découverte | 120€/yr | 1 free            | 40€/project       | With competition           |
| Premium    | 190€/yr | 2 free            | 90€/project       | Exclusive — no competition |

---

## Pages & Routes

| Route                | Purpose                                             |
| -------------------- | --------------------------------------------------- |
| `/`                  | Landing page (targets both artisans and homeowners) |
| `/comment-ca-marche` | How it works — 3-step process for clients           |
| `/packs`             | Pricing cards + inline artisan registration form    |
| `/devenir-pro`       | Same as packs with benefits sidebar                 |
| `/contact`           | Homeowner project request form (free, saves to DB)  |
| `/admin/login`       | Admin login                                         |
| `/admin`             | Lead management dashboard (two tabs)                |

---

## API Endpoints

### Artisan Registrations

| Method | Route                           | Auth   | Purpose                                   |
| ------ | ------------------------------- | ------ | ----------------------------------------- |
| POST   | `/api/registrations`            | public | Submit artisan registration               |
| GET    | `/api/registrations`            | admin  | List leads (filter: status, plan, search) |
| GET    | `/api/registrations/stats`      | admin  | Stats for dashboard                       |
| PATCH  | `/api/registrations/:id/status` | admin  | Update lead status                        |
| DELETE | `/api/registrations/:id`        | admin  | Delete lead                               |

### Homeowner Projects

| Method | Route                      | Auth   | Purpose                                       |
| ------ | -------------------------- | ------ | --------------------------------------------- |
| POST   | `/api/projects`            | public | Submit homeowner project request              |
| GET    | `/api/projects`            | admin  | List projects (filter: status, trade, search) |
| GET    | `/api/projects/stats`      | admin  | Stats for dashboard                           |
| PATCH  | `/api/projects/:id/status` | admin  | Update project status                         |
| DELETE | `/api/projects/:id`        | admin  | Delete project                                |

### Auth

| Method | Route             | Auth   | Purpose           |
| ------ | ----------------- | ------ | ----------------- |
| POST   | `/api/auth/login` | public | Admin login → JWT |
| GET    | `/api/auth/me`    | admin  | Verify token      |

---

## Status Flows

**Artisan leads:** `new` → `contacted` → `converted` / `rejected`

- `renewsAt` field set to +1 year from registration date
- Admin can extend by 1 year at any time with the ↻ button
- Expired subscriptions shown in red in the dashboard

**Homeowner projects:** `new` → `processing` → `matched` → `completed` / `cancelled`

---

## Key Files

```
src/
  services/api.js                — all API calls (registrations + projects + auth)
  context/AdminAuthContext.jsx   — JWT auth state (persists via localStorage)
  pages/
    ContactPage.jsx              — homeowner project request form
    PacksPage.jsx                — artisan pricing + inline form (/packs)
    DevenirProPage.jsx           — artisan pricing + inline form (/devenir-pro)
    admin/
      AdminLoginPage.jsx         — /admin/login
      AdminDashboardPage.jsx     — /admin — two tabs: artisans + homeowner projects
  index.css                      — all styles including admin UI (no separate CSS files)

backend/
  server.js                      — Express app entry point
  models/
    Registration.js              — artisan lead model
    Project.js                   — homeowner project model
    Admin.js                     — admin user model
  routes/
    registrations.js             — artisan CRUD routes
    projects.js                  — homeowner project CRUD routes
    auth.js                      — login + token verify
  middleware/auth.js             — JWT verification
  .env                           — config (gitignored)
```

---

## Trades Supported

plumbing, electrical, painting, masonry, hvac, carpentry, roofing, tiling
(FR: Plomberie, Électricité, Peinture, Maçonnerie, Climatisation, Menuiserie, Toiture, Carrelage)

---

## Artisan Portal (external)

https://app.monartisanpro.com/login-artisan
Shown in: header "Espace artisan" button + post-registration success message

let's continue the artisan project
