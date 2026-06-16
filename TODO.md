# TODO (Workfolio) — Image performance via Cloudinary transforms

- [ ] Create `src/utils/cloudinary.ts` utility to inject Cloudinary transformations into existing image URLs
- [ ] Update thumbnails:
  - [ ] `src/components/work/work.section.card.tsx`
  - [ ] `src/components/project/project.section.card.tsx`
  - [ ] `src/components/certificate/certificate.card.tsx`
- [ ] Update modal/hero images:
  - [ ] `src/components/work/work.section.modal.tsx`
  - [ ] `src/components/project/project.section.modal.tsx`
  - [ ] `src/components/certificate/certificate.modal.tsx`
- [ ] Add `loading="lazy"` to non-critical thumbnails (cards)
- [x] Sanity check for main Cloudinary thumbnails: updated `Work/Project/Certificate` cards + modals to use Cloudinary transforms.

- [ ] Run `npm run lint` and `npm run build`

