# Acceleren Motors Ghana — Website Starter

A separate React/Vite + Express starter for a luxury and performance automobile dealership, using public business details from the [Acceleren Motors Ghana Instagram profile](https://www.instagram.com/accelerenmotorsghltd/).

## Project layout

- `client/` — React 19, Vite 7 and Tailwind CSS 4 website
- `server/` — small Express API starter
- `client/src/data/cars.js` — Instagram-sourced vehicle features and model paths
- `client/public/instagram/` — approved profile logo and vehicle photos
- `client/public/models/` — optional GLB models for the interactive showroom
- `client/src/data/siteDefaults.js` — dealership name, contact details and initial site copy

## Start the website

In PowerShell:

```powershell
cd client
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

To check the frontend:

```powershell
npm test
npm run lint
npm run build
```

## Optional API

In a second terminal:

```powershell
cd server
npm install
npm run dev
```

The API listens on port `5000` by default and exposes `/api/health`, `/api/cars`, and `/api/site-settings`. The current frontend prototype uses in-memory browser state; it does not persist inventory or settings through the API.

## Content and assets to replace before launch

- The public Instagram profile identifies Acceleren Motors Ghana as a luxury and performance dealership with local inventory and global sourcing. It lists **+233 53 262 7932** and links to WhatsApp at `wa.link/1obkjs`.
- A specific showroom address, opening hours and email address were not visible in the public profile, so the site asks customers to contact the team for directions and hours rather than displaying guessed details.
- Vehicle photos and the logo in this prototype were reused from the public Instagram profile with the user's authorization. The featured vehicle labels are intentionally generic; years, specifications, prices and current availability are unverified and shown as contact-to-confirm.
- Every vehicle detail page includes a showroom viewer. To enable interactive 360° rotation, add the matching GLB file described in [`client/public/models/README.md`](./client/public/models/README.md). Until a model exists, the viewer displays the vehicle's Instagram photo and a pending-model notice.
- The admin screen is a prototype with the demo password `acceleren-demo`; it is not secure authentication. The API also has no authentication or persistent storage. Do not deploy the admin or mutation endpoints publicly until proper access control and storage are implemented.
