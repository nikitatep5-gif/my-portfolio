/**
 * Portfolio & Interactive Playground Scripts
 * Features: Dark/Light Mode, Web Audio Quack Synth, Excuse Generator,
 * Duck Counter, Form Simulation, and Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark / Light Theme Toggle with LocalStorage
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('site-theme') || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('site-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }

  // 2. Mobile Hamburger Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.textContent = '☰';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Silly Stuff Zone: Developer Excuse & Vibe Generator
  const excuseBtn = document.getElementById('generate-excuse-btn');
  const excuseText = document.getElementById('excuse-display');

  const sillyExcuses = [
    "“It worked fine in my dream last night.”",
    "“I'm a creep, I'm a weirdo... what the hell is this null pointer doing here?”",
    "“A cosmic ray must have flipped a bit in production.”",
    "“My rubber duck approved this pull request without comments.”",
    "“The CSS was hungry and ate all my margins.”",
    "“That's not a bug, that's an undocumented surprise feature.”",
    "“I wish I was special... but this code is just spaghetti.”",
    "“It compiles on my refrigerator, so the code is definitely sound.”",
    "“I didn't break it; the universe simply experienced quantum divergence.”",
    "“Have you tried turning the solar system off and on again?”",
    "“The cache refused my eviction notice on legal grounds.”",
    "“It worked perfectly until the user tried to use it.”",
    "“Syntactically correct, spiritually conflicted.”",
    "“I outsourced that algorithm to my future self.”"
  ];

  if (excuseBtn && excuseText) {
    excuseBtn.addEventListener('click', () => {
      excuseText.style.opacity = '0';
      excuseText.style.transform = 'translateY(8px)';
      
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * sillyExcuses.length);
        excuseText.textContent = sillyExcuses[randomIndex];
        excuseText.style.opacity = '1';
        excuseText.style.transform = 'translateY(0)';
      }, 180);
    });
  }

  // 4. Silly Stuff Zone: Interactive Rubber Duck Debugger
  const duckWrapper = document.getElementById('duck-wrapper');
  const duckCounter = document.getElementById('duck-count');
  const duckBubble = document.getElementById('duck-bubble');
  let clickCount = 0;

  const duckPhrases = [
    "Quack!",
    "I'm a creep... quack!",
    "Did you check line 42?",
    "Explain it to me slowly...",
    "Is the semicolon missing?",
    "Console.log is your friend!",
    "Drink some water, coder!",
    "I believe in your code!",
    "Quack quack! Clean syntax!"
  ];

  // Synthesize a retro duck quack sound with Web Audio API (zero external files required)
  function playQuackSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  if (duckWrapper && duckCounter && duckBubble) {
    duckWrapper.addEventListener('click', () => {
      clickCount++;
      duckCounter.textContent = clickCount;
      playQuackSound();

      // Random duck comment
      const randomPhrase = duckPhrases[Math.floor(Math.random() * duckPhrases.length)];
      duckBubble.textContent = randomPhrase;

      // Click animation
      duckWrapper.style.transform = 'scale(0.92) rotate(-8deg)';
      setTimeout(() => {
        duckWrapper.style.transform = '';
      }, 150);
    });
  }

  // 5. Contact Form Simulation with Live Validation
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        formStatus.textContent = `Thanks, ${name}! Your message has been sent successfully. I'll get back to you soon.`;
        formStatus.className = 'form-status success';

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 800);
    });
  }

  // 6. Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 7. AC/DC - Back in Black Music Engine
  const musicToggleBtn = document.getElementById('music-toggle');
  const musicBtnText = document.getElementById('music-btn-text');
  const playerPlayBtn = document.getElementById('player-play-btn');
  const playerPlayIcon = document.getElementById('player-play-icon');
  const playerEqualizer = document.getElementById('player-equalizer');
  const musicVolumeSlider = document.getElementById('music-volume');
  const audioSourceStatus = document.getElementById('audio-source-status');
  const acdcAudio = document.getElementById('acdc-audio');

  let isPlaying = false;
  let currentVolume = 0.7;
  let audioCtx = null;
  let masterGain = null;
  let distortionNode = null;
  let synthTimer = null;
  let activeOscillators = [];

  // Make a soft-clipping distortion curve for authentic rock overdrive
  function makeDistortionCurve(amount = 25) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  function initSynth() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!masterGain) {
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);

      // Overdrive & Marshall tone filter
      distortionNode = audioCtx.createWaveShaper();
      distortionNode.curve = makeDistortionCurve(18);
      distortionNode.oversample = '4x';

      const ampFilter = audioCtx.createBiquadFilter();
      ampFilter.type = 'lowpass';
      ampFilter.frequency.setValueAtTime(2600, audioCtx.currentTime);
      ampFilter.Q.setValueAtTime(2.5, audioCtx.currentTime);

      distortionNode.connect(ampFilter);
      ampFilter.connect(masterGain);
      masterGain.connect(audioCtx.destination);
    }
  }

  function playNoise(startTime, duration, filterFreq, gainVal, isSnare = false) {
    if (!audioCtx) return;
    const bufferSize = Math.max(1, Math.floor(audioCtx.sampleRate * duration));
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = isSnare ? 'highpass' : 'bandpass';
    filter.frequency.setValueAtTime(filterFreq, startTime);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(gainVal * currentVolume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    noise.connect(filter);
    filter.connect(audioCtx.destination);

    noise.start(startTime);
    noise.stop(startTime + duration);
  }

  function playKick(startTime) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(140, startTime);
    osc.frequency.exponentialRampToValueAtTime(38, startTime + 0.12);

    gain.gain.setValueAtTime(0.85 * currentVolume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.16);
  }

  function playSnare(startTime) {
    if (!audioCtx) return;
    playNoise(startTime, 0.18, 1200, 0.45, true);
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, startTime);
    gain.gain.setValueAtTime(0.28 * currentVolume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.12);
  }

  function playPowerChord(frequencies, startTime, duration = 0.25) {
    if (!audioCtx || !distortionNode) return;
    frequencies.forEach((freq) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.32, startTime);
      gain.gain.setValueAtTime(0.28, startTime + duration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(distortionNode);

      osc.start(startTime);
      osc.stop(startTime + duration);
      activeOscillators.push(osc);
    });
  }

  function playSingleNote(freq, startTime, duration = 0.18) {
    if (!audioCtx || !distortionNode) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.38, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(distortionNode);

    osc.start(startTime);
    osc.stop(startTime + duration);
    activeOscillators.push(osc);
  }

  // Back in Black Chord Frequencies (E5, D5, A5)
  const E5 = [82.4, 123.5, 164.8];     // E2, B2, E3
  const D5 = [146.8, 220.0, 293.7];    // D3, A3, D4
  const A5 = [110.0, 164.8, 220.0];    // A2, E3, A3

  function scheduleBackInBlackLoop() {
    if (!isPlaying) return;
    initSynth();

    const t = audioCtx.currentTime + 0.05;
    const beat = 60 / 92; // ~92 BPM
    const measure = beat * 4;

    // --- Rock Drum Pattern (4 Measures) ---
    for (let m = 0; m < 4; m++) {
      const mTime = t + m * measure;
      // Kick on 1 and 3
      playKick(mTime);
      playKick(mTime + beat * 2);

      // Snare on 2 and 4
      playSnare(mTime + beat);
      playSnare(mTime + beat * 3);

      // Hi-hats on eighth notes
      for (let h = 0; h < 8; h++) {
        playNoise(mTime + h * (beat / 2), 0.04, 7500, 0.12, false);
      }
    }

    // --- Iconic Guitar Riff ---
    // Bar 1: E5 chord hit on Beat 1
    playPowerChord(E5, t, beat * 0.85);

    // Bar 2: D5 (3 quick hits) + A5 (3 quick hits)
    const bar2 = t + measure;
    playPowerChord(D5, bar2 + beat * 1.5, beat * 0.35);
    playPowerChord(D5, bar2 + beat * 2.0, beat * 0.35);
    playPowerChord(D5, bar2 + beat * 2.5, beat * 0.45);

    playPowerChord(A5, bar2 + beat * 3.0, beat * 0.35);
    playPowerChord(A5, bar2 + beat * 3.5, beat * 0.35);
    playPowerChord(A5, bar2 + beat * 4.0, beat * 0.45);

    // Bar 3: Descending pentatonic lick (E4, D4, C#4, B3, G3, E3)
    const bar3 = t + measure * 2;
    playSingleNote(329.63, bar3 + beat * 1.5, beat * 0.35); // E4
    playSingleNote(293.66, bar3 + beat * 2.0, beat * 0.35); // D4
    playSingleNote(277.18, bar3 + beat * 2.5, beat * 0.35); // C#4
    playSingleNote(246.94, bar3 + beat * 3.0, beat * 0.45); // B3
    playSingleNote(196.00, bar3 + beat * 3.5, beat * 0.45); // G3
    playSingleNote(164.81, bar3 + beat * 4.0, beat * 0.55); // E3

    // Bar 4: Turns around and repeats seamlessly
    const loopDurationMs = 4 * measure * 1000;
    synthTimer = setTimeout(() => {
      if (isPlaying) scheduleBackInBlackLoop();
    }, loopDurationMs - 50);
  }

  function startMusic() {
    isPlaying = true;
    updateMusicUI(true);

    if (acdcAudio && acdcAudio.src && !acdcAudio.error) {
      acdcAudio.volume = currentVolume;
      const playPromise = acdcAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (audioSourceStatus) audioSourceStatus.textContent = 'Original MP3 ⚡';
          })
          .catch(() => {
            if (audioSourceStatus) audioSourceStatus.textContent = 'Rock Synth ⚡';
            scheduleBackInBlackLoop();
          });
      } else {
        scheduleBackInBlackLoop();
      }
    } else {
      if (audioSourceStatus) audioSourceStatus.textContent = 'Rock Synth ⚡';
      scheduleBackInBlackLoop();
    }
  }

  function stopMusic() {
    isPlaying = false;
    updateMusicUI(false);

    if (synthTimer) {
      clearTimeout(synthTimer);
      synthTimer = null;
    }

    if (acdcAudio) {
      acdcAudio.pause();
    }

    if (audioCtx && audioCtx.state !== 'closed') {
      audioCtx.suspend();
    }
  }

  function toggleMusic() {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  function updateMusicUI(active) {
    if (musicToggleBtn) {
      musicToggleBtn.classList.toggle('playing', active);
    }
    if (musicBtnText) {
      musicBtnText.textContent = active ? 'AC/DC: ON ⚡' : 'Music: OFF';
    }
    if (playerPlayBtn) {
      playerPlayBtn.classList.toggle('playing', active);
    }
    if (playerPlayIcon) {
      playerPlayIcon.textContent = active ? '⏸' : '▶';
    }
    if (playerEqualizer) {
      playerEqualizer.classList.toggle('active', active);
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
  }

  if (playerPlayBtn) {
    playerPlayBtn.addEventListener('click', toggleMusic);
  }

  if (musicVolumeSlider) {
    musicVolumeSlider.addEventListener('input', (e) => {
      currentVolume = parseFloat(e.target.value);
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
      }
      if (acdcAudio) {
        acdcAudio.volume = currentVolume;
      }
    });
  }
});

