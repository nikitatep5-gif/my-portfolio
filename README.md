# ⚡ Nikita | Developer Portfolio & Creative Playground

A modern, responsive personal portfolio, project showcase, and interactive web playground handcrafted with **semantic HTML5**, **custom CSS3**, and **vanilla JavaScript**.

Built to showcase web experiments, clean UI engineering, and interactive browser features.

---

## 🚀 Key Features

* **🎨 Aurora Cyber Theme & Dark / Light Switcher**:
  * Smooth theme transition powered by CSS custom properties (variables).
  * Remembers your theme preference across visits using `localStorage`.

* **🎸 AC/DC — "Back in Black" Audio Player**:
  * Dedicated enable/disable button in the sticky navigation bar and floating player widget.
  * Real-time volume control and animated equalizer soundbars.
  * **Zero-dependency Web Audio rock synth**: Procedurally synthesizes the iconic 92 BPM drum beat, distorted power chords (`E5`, `D5`, `A5`), and descending pentatonic lick using the browser's native Web Audio API.
  * **Custom MP3 Support**: Drop your own `back-in-black.mp3` into the `assets/` folder, and the player will automatically stream your audio file.

* **🦆 The Silly Stuff Zone**:
  * **Developer Excuse Machine**: Generates humorous, relatable excuses and programmer fortunes with smooth animations.
  * **Rubber Duck Debugger**: Click the duck to explain your bugs—it bounces, tallies your bug count, and quacks using an oscillator sound synthesizer.

* **💻 Featured Projects**:
  * **Pick One (Random Number Generator)**: Minimalist decision engine with customizable boundaries, quick dice presets, pick history, and clipboard support.
  * **8-Bit Retro Audio Synth**: Real-time browser synthesizer concept.
  * **Atmosphere Weather Deck**: Modern weather dashboard with glassmorphism styling.

* **📝 Field Notes & Blog**:
  * Articles discussing semantic HTML standards, CSS Grid vs. Flexbox intuition, and the craft of micro-apps.

* **📬 Interactive Contact Section**:
  * Semantic contact form with input validation and instant visual feedback.
  * Social links for Email, GitHub, and LinkedIn.

---

## 🏷️ Semantic HTML5 Elements Used

This project strictly adheres to modern HTML5 semantic structure:

| Tag | Purpose in Project |
| :--- | :--- |
| `<header>` | Sticky site header and section title containers |
| `<nav>` | Primary site navigation bar with accessibility labels |
| `<main>` | Core container for all primary sections |
| `<section>` | Distinct thematic sections (`#home`, `#about`, `#projects`, `#blog`, `#silly-stuff`, `#contact`) |
| `<article>` | Independent cards for project items and blog posts |
| `<aside>` | Quick facts sidebar and floating audio player widget |
| `<figure>` / `<figcaption>` | Responsive project illustrations and avatar frames |
| `<time>` | Machine-readable publishing timestamps (`datetime="YYYY-MM-DD"`) |
| `<blockquote>` | Highlighted personal quotes in the About section |
| `<form>` / `<label>` / `<input>` / `<textarea>` / `<button>` | Accessible contact form controls |
| `<footer>` | Semantic site footer with copyright and back-to-top navigation |

---

## 📂 Project Directory Structure

```text
├── index.html                    # Main website entry point (GitHub Pages default)
├── styles.css                    # Custom responsive stylesheet (variables, grid, flexbox)
├── script.js                     # Interactive JS (theme switcher, audio synth, forms)
├── number-generator-simple.html  # Standalone Pick One random number generator app
├── README.md                     # Project documentation
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions deployment to Pages
└── assets/
    ├── avatar.svg                # Developer vector portrait
    ├── duck.svg                  # Rubber duck vector illustration
    ├── project-number.svg        # Number generator project preview
    ├── project-arcade.svg        # 8-Bit synth project preview
    └── project-weather.svg       # Weather deck project preview
```

---

## 💻 Running Locally

No build tools, bundlers, or package managers required!

1. Clone or download this repository.
2. Double-click `index.html` to open it directly in any modern web browser.
3. (Optional) To serve via a local HTTP server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`.

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to **GitHub**.
2. Go to your repository's **Settings** tab.
3. In the left sidebar under **Code and automation**, click **Pages**.
4. Under **Build and deployment** $\rightarrow$ **Source**, choose **GitHub Actions**.
5. The included workflow [deploy.yml](.github/workflows/deploy.yml) will automatically run and publish your site!

---

## 👤 Author

* **Nikita**
* 📍 Location: Israel (GMT+3) 🇮🇱
* 🎸 Soundtrack: *Radiohead — Creep* & *AC/DC — Back in Black*
* 📄 License: MIT
