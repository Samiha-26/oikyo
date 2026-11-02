# Oikyo (ঐক্য) — Bangladesh Grassroots Coalition

> **A Community-Driven Civic Development & Emergency Relief Platform**  
> **Live Site URL**: [https://oikyo.vercel.app](https://oikyo.vercel.app) *(or your deployed production URL)*  
> **Client Repository**: [c:/projects/oikyo](https://github.com/Samiha-26/oikyo)  
> **Server Repository**: [c:/projects/oikyo-server](https://github.com/Samiha-26/oikyo-server)

---

## 🌟 Overview

**Oikyo (ঐক্য)** is an editorial civic impact platform designed to mobilize, coordinate, and track social service events across all 64 districts of Bangladesh. Built specifically for grassroots community resilience, the platform empowers verified organizers to launch relief campaigns (such as North Bengal winter clothing distributions, canal cleanups, pediatric camps, and coastal mangrove planting) while offering volunteers instant, transparent participation rosters with zero bureaucratic friction.

---

## ✨ Key Features (5+ Core Capabilities)

* **🗺️ 64-District Verified Civic Drives Explorer**: Filter upcoming relief initiatives in real time by category (*Winter Clothing*, *Medical Relief*, *Clean Environment*, *Tree Planting*, *Education & Youth*, *Water Sanitation*), district, search keywords, and chronological date sorting. Past operations are strictly archived.
* **📊 Real-Time Volunteer Spot Capacity Quota**: Interactive visual capacity progress bars on every event card indicate current volunteer enrollments versus target quotas (e.g. `28/35 spots filled • 80%`), preventing overcrowding and ensuring optimal logistical deployment.
* **🔐 BetterAuth & Google OAuth Authentication**: Robust authentication system supporting Email/Password with real-time password strength verification (length ≥ 6, uppercase, lowercase) and 1-click Google OAuth sign-in, paired with session persistence and avatar display tooltips.
* **🛡️ Protected Organizer Dashboard & SweetAlert2 Modals**: Secure, private routes (`/create-event`, `/manage-events`, `/joined-events`, `/profile`) guarded by Next.js 16 route proxying. Organizers can create drives with strict future-date validation, update details, or delete campaigns using interactive SweetAlert2 confirmation dialogs.
* **🎫 Volunteer Mission Passport & Instant Roster Join**: Volunteers can join active initiatives in one click, instantly incrementing the database quota and populating their chronological Mission Passport with meeting points, coordinator briefings, and one-click spot release.
* **⚡ Streaming Loading Skeletons**: Tailored DaisyUI shimmering skeleton components for event cards, explorer grids, and event details pages to ensure fluid, zero-layout-shift streaming experiences.
* **👤 Volunteer Profile Management**: Full profile passport allowing volunteers to view their organized initiatives, joined deployments, standing badges, and update their display name and profile picture URL with live session sync.
* **🌓 System-Wide Light/Dark Mode**: Built-in DaisyUI theme toggle switching between crisp daylight editorial slate and rich deep night mode without UI flickers.

---

## 🛠️ Tech Stack

### Frontend (Client)
* **Framework**: Next.js 16 (App Router, Server & Client Components)
* **Language**: TypeScript
* **Styling**: Tailwind CSS + DaisyUI (Custom Oikyo Light & Dark themes)
* **Icons**: React Icons (`react-icons/lu` Lucide pack)
* **Modals & Alerts**: SweetAlert2 (`sweetalert2`), React Hot Toast (`react-hot-toast`)
* **Authentication**: BetterAuth + MongoDB Adapter
* **Data Fetching**: Native Fetch with dynamic caching and Next.js Route Handlers

### Backend (Server)
* **Framework**: Express.js (Node.js ESM)
* **Database**: MongoDB Atlas Native Driver (`MongoClient`, `ObjectId`)
* **Security & Tokens**: `jose` (JWT verification with remote JWKS)
* **Middleware**: `cors`, `dotenv`

---

## 🚀 Getting Started Locally

### 1. Clone the repository:
```bash
git clone https://github.com/Samiha-26/oikyo.git
cd oikyo
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Configure Environment Variables:
Create a single `.env` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=oikyo_grassroots_better_auth_secret_key_2026
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/?authSource=admin
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience Oikyo!

---

## 📋 Available Routes

| Route | Access | Purpose |
| :--- | :--- | :--- |
| `/` | Public | Civic solidarity landing page, features, recent drives, impact stats, testimonials, photo gallery |
| `/events` | Public | 64-district upcoming drives explorer with reactive category, district, and sort filters |
| `/events/:id` | Public | Event details, organizer credentials, logistics meeting points, live volunteer roster, and Join button |
| `/signin` | Public | Email/Password login, Google OAuth, validation rules |
| `/signup` | Public | Volunteer registration with real-time password criteria validation |
| `/create-event` | **Private** | Event creation with strictly future-date validation and interactive card preview |
| `/manage-events`| **Private** | Organizer management table with SweetAlert2 update and delete confirmations |
| `/joined-events`| **Private** | Chronologically sorted volunteer mission passport with SweetAlert2 spot release |
| `/profile` | **Private** | Profile view, volunteer metrics, and credential update modal |
| `/*` (404) | Public | Unmatched route error page with navigation to Home and events |

---

## 📄 License
This project is open-source under the MIT License.
