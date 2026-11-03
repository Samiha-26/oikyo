# Oikyo (ঐক্য)

**Oikyo (ঐক্য)** is a civic impact platform designed to mobilize, coordinate, and track social service events across all 64 districts of Bangladesh. Built for grassroots community resilience, the platform lets organizers launch verified relief campaigns—such as winter clothing distributions, canal cleanups, medical camps, and coastal tree planting—while giving volunteers transparent rosters to sign up and participate with ease.

Live site: https://oikyo-topaz.vercel.app

Client repository: https://github.com/Samiha-26/oikyo

Server repository: https://github.com/Samiha-26/oikyo-server

## Features

- Browse community service events across Bangladesh, filter by category (Cleanup, Plantation, Donation, Winter Clothing, Medical Relief, Education, Water Sanitation) or district, and view the six newest upcoming drives on the home page.
- Register with name, email, profile photo URL, and password (enforcing uppercase, lowercase, and minimum 6 characters) or sign in with Google. Private routes send unauthenticated users to Login, and reloading a private page keeps you logged in.
- Create social service drives with title, category, district, location, cover image, volunteer quota, and strict future-date validation. Manage, edit, or delete your own created events from Manage Events with custom SweetAlert confirmation dialogs.
- Join an event directly from its details page. Each drive tracks its capacity with a live quota progress bar that increments on join and disables enrollment once all spots are filled.
- You cannot join the same event twice. Joined Events lists every event you have signed up for, sorted chronologically by event date, with a button to release your spot if you can no longer attend.
- The Express API verifies JSON Web Tokens using remote JWKS on every protected route, ensuring only logged-in users can create, update, delete, or join events, and only the creator can edit their own drive.
- Light and dark themes with a toggle in the navbar, interactive 64-district impact map, shimmering loading skeletons, volunteer profile editor, and a fully responsive layout with the official X logo in the footer.

## Tech stack

- Next.js 16 (App Router) with TypeScript
- Tailwind CSS and DaisyUI
- BetterAuth with MongoDB adapter, Google OAuth, and the JWT plugin
- Express.js with the official MongoDB driver
- Jose for remote JWKS token verification
- SweetAlert2, React Hot Toast, and React Icons

## Project structure

```text
oikyo/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/[...all]/
│   │   ├── create-event/
│   │   ├── events/
│   │   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── impact-map/
│   │   ├── joined-events/
│   │   ├── manage-events/
│   │   ├── profile/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   ├── create-event/
│   │   ├── event-details/
│   │   ├── events/
│   │   ├── impact/
│   │   ├── joined-events/
│   │   ├── manage-events/
│   │   ├── EventCard.tsx
│   │   ├── EventCardSkeleton.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── Footer.tsx
│   │   ├── GallerySection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── NewsletterSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── UserAvatarDropdown.tsx
│   └── lib/
│       ├── auth.ts
│       ├── auth-client.ts
│       └── events.ts
├── public/
├── package.json
└── README.md
```

## Run it locally

Clone this repository and install packages:

```bash
npm install
```

Start the Oikyo server, then run the client:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.
