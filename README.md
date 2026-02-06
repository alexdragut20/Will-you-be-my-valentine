# Valentine Envelope Website

A romantic, single-page interactive website with an animated envelope, a playful valentine prompt, and a premium sparkle celebration when `Yes` is clicked.

## Features

- Romantic envelope opening animation
- Question modal: **"Will you be my valentine?"**
- Evasive **No** button (desktop + mobile tap/press)
- Dynamic `No` button text: _Are you sure?_, _Think again_, etc.
- Success invitation message:
  - **"Great, then see you at Akos Restaurant on 14th february at 16:30, Love you !"**
- Diamond-like glitter/reflection effect on `Yes`
- Responsive design for desktop and mobile

## Quick Start

### 1) Run locally

```bash
cd /Users/alexandrudragut/Codex_projects/valentine-site
python3 -m http.server 8765
```

Open: [http://localhost:8765](http://localhost:8765)

### 2) Access from another device on the same network

```bash
cd /Users/alexandrudragut/Codex_projects/valentine-site
python3 -m http.server 8765 --bind 0.0.0.0
```

Then open from another device:

```text
http://<your-local-ip>:8765
```

Example:

```text
http://192.168.0.161:8765
```

## Project Structure

```text
valentine-site/
├── index.html
├── styles.css
├── script.js
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
└── README.md
```

## Customization

### Change intro text

Edit in `index.html`:

- `Dear Melania, please open the envelope`

### Change question and invitation

Edit in `index.html`:

- `Will you be my valentine?`
- `Great, then see you at Akos Restaurant on 14th february at 16:30, Love you !`

### Change "No" button messages

Edit `noMessages` array in `script.js`.

### Tune glitter effect

In `script.js`, adjust counts:

- `flareCount`
- `shardCount`

In `styles.css`, adjust sparkle intensity and motion in:

- `.glitter-piece`, `.glitter-piece.flare`, `.glitter-piece.shard`
- `@keyframes diamond-fall`, `@keyframes diamond-flicker`

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In GitHub repo settings, open **Pages**.
3. Set source to:
   - Branch: `main`
   - Folder: `/ (root)`
4. Save and wait for deployment.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT License. See [LICENSE](LICENSE).
