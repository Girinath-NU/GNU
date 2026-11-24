# ORBITAL portfolio — content guide
Static site, no build step. **All content lives in `config/portfolio.config.js`.**

```
index.html                 layout + animations (don't edit for content)
config/portfolio.config.js ← edit this
js/render.js               builds sections from the config
api/contact.js             Resend email endpoint
assets/profile/profile.jpg replace to change your photo
assets/projects/           project screenshots/thumbnails
assets/certificates/       certificate images (reference from config if needed)
resume/resume.pdf          replace to update your resume
```

## How to update
| What | Where in config |
|---|---|
| Name, tagline, intro, email, phone, location, photo path | `personal` |
| LinkedIn / GitHub / LeetCode / any link | `socialLinks` (empty = hidden; add any key) |
| Resume | `resume` (see below) |
| About card fields | `about` |
| Projects | `projects` (add / delete / reorder) |
| Skills | `skills` (categories + items) |
| Experience / internships | `experience` |
| Positions & clubs | `positions` |
| Achievements | `achievements` (shows under Leadership) |
| Education / certifications | `education`, `certifications` |
| Services | `services` (extra block under Expertise) |
| Hide or rename a section | `sections.<id>.enabled / title / nav` |
| Contact heading, form endpoint | `contact` |

Empty lists hide their section automatically; section numbers and the nav update themselves.

## Add a project
Copy any block in `projects`, add a comma, edit: `title, description (short, shown on card), category, year, featured, visual, image, github, demo, tags, objective, approach, details, concepts, work`. Every field is optional except `title`. With no `image`, an animated preview (`visual`: packets, sar, imu, phase, gnss, scope) is shown; if the image file is missing it falls back to the animation. Set `projectsOptions.featuredFirst: true` to list featured projects first.

## Replace the resume
Drop your new PDF into `resume/` named `resume.pdf` (or use another name and change `resume.file`). Optionally set `resume.lastUpdated` to force browsers to fetch the new file, and `resume.showViewButton: true` for a "View Resume" button.

## Add images
Put files in `assets/projects/` (etc.) and reference them as `'assets/projects/name.png'`.

## Email (Resend)
Set `RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`, `CONTACT_FROM_EMAIL` (see `.env.example`) on Vercel, and verify your sending domain in Resend (DNS SPF/DKIM). `contact.formEndpoint` is the URL the form posts to.

## Limits
Section layout, colours, the 3D scene and the HUD telemetry text are in `index.html`; new `visual` styles need code. The contact receiver address is an environment variable, not part of the config.
