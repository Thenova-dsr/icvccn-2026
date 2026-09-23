# ICVCCNA 2027 — Conference Website

Static website (HTML / CSS / JS, no build step) for the **International Conference on VLSI,
Communication, Computer Networks and Artificial Intelligence**, organised by the Department of ECE,
AMC Engineering College (Autonomous), Bengaluru.

The layout and page structure follow the two reference conference sites
(cvs3-conference.com and icncda.co.uk): utility strip → masthead → sticky dropdown nav →
hero carousel → countdown → content sections → dark three-column footer.

## Run locally

```bash
cd /Users/Krsnutech/Desktop/amcec
python3 -m http.server 8777
# open http://localhost:8777
```

Or just double-click `index.html` — everything works from `file://` except the Google Maps iframes.

## Structure

```
index.html              Home — hero carousel, countdown, about, tracks, dates
about-conference.html   About the conference + highlights
about-college.html      About AMC Engineering College
about-department.html   About the ECE department
call-for-papers.html    Four tracks + submission requirements + dates
paper-submission.html   Submission steps, plagiarism policy, declarations, T&C
publication.html        Springer proceedings + publication process
quality-policies.html   Review policy, ethics, conflict of interest
committee.html          All seven committees
registration.html       Fee tables, inclusions, payment
venue.html              Campus, travel, embedded map
contact.html            Contact details, secretariat, enquiry form
downloads.html          Brochure / template / copyright form
css/style.css           Single stylesheet (CSS custom properties at the top)
js/main.js              Nav, carousel, countdown, accordions, scroll reveal
assets/                 Logos and campus photo
```

## Before going live — replace these placeholders

All content from `AMCEC_College Details-Draft.docx` (committees, tracks, about sections) is real.
The items below were **not** in the document and are placeholders:

| What | Where | Note |
|---|---|---|
| Conference dates (17–18 Dec 2026) | `build`-time constants, now baked into every page | Not in the draft doc — search & replace `17 &ndash; 18 December 2026` and the countdown `data-date="2026-12-17T09:00:00"` in `index.html` |
| Important dates | `index.html`, `call-for-papers.html` | Deadlines were invented to sit sensibly before the conference |
| Registration fees | `registration.html` | Indicative amounts only |
| E-mail / phone | site-wide (`icvccn@amcgroup.edu.in`, `+91 80 2843 5175`) | Confirm with the department |
| Submission portal link | `paper-submission.html` | Add the CMT / EasyChair / Google Form URL |
| Download files | `downloads.html` | Buttons are inert (`href="#"`) until real PDFs are added to `assets/` |
| Springer logo | `assets/springer-logo.png` | **Masthead already points here — just save the official PNG.** Falls back to the hand-drawn `springer-logo.svg` stand-in until you do |
| Campus photos | `assets/campus2.jpg`, `assets/campus3.jpg` | **Carousel is already wired for these two filenames — just save the files.** Until then each falls back to `campus.jpg` automatically, so nothing looks broken |

## Where each part of the document is used

Every line of `AMCEC_College Details-Draft.docx` appears on the site, and most of it in more than
one place so the names are not buried on a single page.

| Document section | Pages it appears on |
|---|---|
| Chief Patrons (4) | committee, **index** (Under the Patronage Of), **about-college** (Management & Leadership) |
| Patrons (4) | committee, **index**, **about-college**, **about-department** (Dr. Yuvaraju as Principal) |
| Convenor — Dr. J. Jenitta | committee, contact, **index**, **about-conference**, **about-department** (HOD) |
| Co-Convenors (3) | committee, contact, **index**, **about-conference** |
| Organising Committee (8 ECE faculty) | committee, **about-department** (Faculty on the Organising Committee) |
| Advisory Committee (10) | committee, **index** (split into From Industry / From Academia), **publication** |
| Technical Committee (13) | committee, **index** (named cards + institution chips), **call-for-papers** (Your Paper Will Be Reviewed By), **publication**, **paper-submission** |
| About Conference | index, about-conference |
| About College | index (stats), about-college |
| About Department | about-department, footer |
| Tracks 1–4 (22 topics) | index, call-for-papers |
| College logo + building photo | masthead, footer, favicon, hero, page banners, about pages |

Bolded pages are where the content was added beyond the committee listing. Designations are quoted
exactly as written in the document — no roles were invented (for example, advisory-committee members
are listed as advisors, not as speakers).

## Springer logo

The masthead on all 13 pages loads `assets/springer-logo.png`, falling back to the placeholder
`assets/springer-logo.svg` if that file is missing:

```html
<img src="assets/springer-logo.png" alt="Springer"
     onerror="this.onerror=null;this.src='assets/springer-logo.svg'">
```

Save the official logo as `assets/springer-logo.png` and it replaces the placeholder everywhere at
once. Use a transparent-background PNG (or an SVG, renaming the reference) — the masthead renders it
at 52px tall on desktop, 44px on mobile, so supply at least 2× that height for sharp display on
retina screens.

Get the file from Springer directly — their proceedings/organiser pack, or your Springer editorial
contact for ICVCCN. Publishers are specific about logo usage, and the version they send will be the
one cleared for conference material.

## Hero carousel

Full-bleed background hero: the campus photo fills the whole hero area (`background-size: cover`),
with the headline and buttons over it. Three slides, 5.5s each, pauses on hover, clickable dots
(`js/main.js` -> `initHero`).

| Slide | File |
|---|---|
| 1 | `assets/campus.jpg` |
| 2 | `assets/campus2.jpg` |
| 3 | `assets/campus3.jpg` |

A gradient `.veil` sits over the image - darkest on the left where the headline is, lighter on the
right so the photo shows through. On phones it switches to a top-to-bottom gradient, because the
text stacks over the middle of the frame.

To add a slide, copy a `.slide` div in `index.html`; the dots generate themselves.

### Image quality

The source photos are small - 592x168, 596x335 and 678x452. `assets/originals/` keeps them
untouched; the files in `assets/` are Lanczos-upscaled to 1920px wide with a light unsharp mask.

A full-bleed hero stretches them 2-3x (more on a retina screen), so some softness is unavoidable -
sharpening cannot add detail that was never captured. The veil hides most of it, and slide 1 shows
it most because it is a 3.5:1 panorama only 168px tall, so `cover` crops the sides and enlarges the
middle.

The real fix is bigger source files: get originals about **2400px wide** from the college and drop
them in under the same filenames. Large originals usually need no sharpening at all.

Always re-process from `assets/originals/`, never from `assets/` - repeated passes compound JPEG loss.

## Source of truth

All content comes from **`amc_newdoc.docx`** (the second, revised document). Nothing is invented.
Where the document is silent, the page says "To be announced" rather than guessing:

- Registration fees and registration portal
- Conference e-mail and phone number
- The CMT submission portal link

The earlier draft (`AMCEC_College Details-Draft.docx`) is superseded. Differences applied:
acronym ICVCCN to ICVCCNA; real dates (conference 18-19 March 2027); Honorary Chair and
Publication Chair roles added; Convenor changed to Dr G. Senbagavalli; the three CSE
co-convenors removed; advisory committee 10 to 12; technical 13 to 14; organising 8 to 14;
INNOTRONICS replaced by TECHTANTRA.

Track headings are the document's own ("Track 1" ... "Track 4") - no invented titles.

## Notes

- Fonts load from Google Fonts (Oswald / Inter / Source Serif 4); they degrade to
  Impact / Arial / Georgia offline.
- Colours are defined once as custom properties in `:root` at the top of `css/style.css`
  — change `--navy` and `--orange` to re-theme the whole site.
- Pages were generated from a script, so the header and footer are duplicated in each file.
  Edit one and mirror the change across the others (or re-run the generator).
