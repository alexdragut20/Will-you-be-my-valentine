# Valentine Envelope Website

https://alexdragut20.github.io/Will-you-be-my-valentine/


A romantic, single-page interactive website with an animated envelope, a playful valentine prompt, and a premium sparkle celebration when `Yes` is clicked.

## Features

- Romantic envelope opening animation
- Question modal: **"Will you be my valentine?"**
- Evasive **No** button (desktop + mobile tap/press)
- Dynamic `No` button text: _Are you sure?_, _Think again_, etc.
- Custom success invitation message (fully editable)
- Diamond-like glitter/reflection effect on `Yes`
- Responsive design for desktop and mobile

## Quick Start

### 1) Run locally

```bash
cd <your-project-folder>
python3 -m http.server 8765
```

Open: [http://localhost:8765](http://localhost:8765)

### 2) Access from another device on the same network

```bash
cd <your-project-folder>
python3 -m http.server 8765 --bind 0.0.0.0
```

Then open from another device:

```text
http://<your-local-ip>:8765
```

Example URL:

```text
http://192.168.1.24:8765
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

Edit the subtitle in `index.html`.

Example text:

- `Dear [Name], please open the envelope`

### Change question and invitation

Edit the modal question and success message in `index.html`.

Example values:
- `Will you be my valentine?`
- `Great, then see you at [Place] on [Date] at [Time], Love you !`

Tip: replace name, place, date, and time with your own details.

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

## Reuse This Template

1. Fork this repo, or use **Use this template** on GitHub.
2. Edit `index.html` text content for your own message.
3. Adjust animation and sparkle settings in `styles.css` and `script.js`.
4. Deploy with GitHub Pages.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT License. See [LICENSE](LICENSE).
