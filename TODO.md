# Workfolio - Certificates & Admin CRUD Fix

## Plan
1. Fix `src/admin/pages/certificates.page.tsx` to actually render certificate form + list (CRUD) using existing admin components and Firestore services.
2. Add landing page section for certificates by creating a new section component and including it in `src/pages/landing.page.tsx`.
3. Verify Firestore services and types: ensure certificates are fetched from `certificates` collection and mapped to UI.
4. Run typecheck/build to ensure no TS/compile errors.

## Status
- [x] Implement Admin Certificates CRUD page
- [x] Implement Landing Certificates section + wire into LandingPage
- [ ] Build/Typecheck



