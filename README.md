# Marina Chavez — portfolio

Static site for GitHub Pages. No build step: what is in this folder is what goes online.

## Edit the site

| I want to change… | Open |
|---|---|
| Any text, link, project, job, quote, espresso card | `js/content.js` |
| Colours | top of `css/style.css`: `--a1` (work accent) and `--a2` (cream-act accent). Preview others with `?palette=blue`, `?palette=lime` or `?palette=violet` |
| Fonts | `--serif` (headlines), `--brush` (Yellowtail, big calligraphy) and `--hand` (Dancing Script, notes) in `css/style.css` |
| A photo, screenshot, certificate or the CV | put the file at the path listed in `MEDIA.md` |
| One section's layout or animation | `js/sections/<section>.js` and its block in `css/style.css` |

Empty text (`''`) and missing files are hidden on the live site, so it never shows a broken image.

## Preview on your computer

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Locally, every empty slot shows a yellow label with the exact path and size to fill.
Add `?live` to the address to see exactly what visitors see. Add `?plain` to see the reduced-motion version.

## Before publishing

```bash
node tools/check.mjs
```

It lists every empty media slot and empty text, and rewrites `MEDIA.md`.

## Replace the espresso clip

Needs ffmpeg. Give the clip, the start second and the end second:

```bash
tools/espresso.sh assets/food/source/my-clip.mp4 0 8
```

Then set `espresso.frames` in `js/content.js` to the number it prints. The clip should be on pure black.

## Publish (GitHub Pages)

1. Merge this branch into `main`.
2. On GitHub: Settings → Pages → Source: "Deploy from a branch" → `main`, folder `/ (root)` → Save.
3. Wait about a minute, then open https://monsmce.github.io

## Hidden things

- Click the naruto (the pink swirl) in the ramen bowl, or type `ramen` anywhere.
- Hover "hiii!" and the word "high" in the hero.
- Sound is off until the visitor clicks "Sound: off" in the top bar.
