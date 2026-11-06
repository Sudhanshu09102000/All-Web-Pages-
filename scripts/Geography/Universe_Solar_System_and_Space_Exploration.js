/* ── STYLE SNIPPET: hides the thumbnail box and the "Open Thumbnail & YouTube Kit" link on page 1 (the chapter icon still opens the studio) ── */
(function () {
  function hide(el) {
    if (!el || el.getAttribute("data-hidden")) return;
    el.setAttribute("data-hidden", "1");
    el.style.setProperty("display", "none", "important");
  }
  function sweep() {
    document.querySelectorAll("img.cp-thumb-img").forEach(function (img) {
      var p = img.parentElement;
      hide(p && !p.querySelector("p,.cp-lead,.cp-stats") ? p : img);
    });
    document.querySelectorAll("button,a,[role=button]").forEach(function (el) {
      if (/open thumbnail/i.test(el.textContent || "")) hide(el);
    });
  }
  try { new MutationObserver(sweep).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  sweep();
})();

/* ════════════════════════════════════════════════════════════════
   CHAPTER — Universe, Solar System and Space Exploration (concept pages mixed in between questions)
   Register it in portalData.js like any other test (file: "Universe_Solar_System_and_Space_Exploration").
   Entry 1 is always the CLASS OVERVIEW page (what we will learn in this class).

   Write entries in the order you want them shown:
       1: concept page   2: question   3: question   4: concept page …

   CONCEPT PAGE fields
     type       : "concept"                 (required)
     title      : "Percentage — Fast Fractions"
     icon       : "📊"                       (emoji, optional)
     accent     : "#22c55e"                 (colour of this page, optional)
     pauseTimer : true                      (optional – stops the exam clock while reading)
     html       : `...any HTML, text, <img>, tables...`

   🎬 YOUTUBE STUDIO (optional – put these two fields on ENTRY 1 only)
     The chapter ICON on that page becomes tappable (pulsing red ▶ badge).
     Tapping it opens a studio with 2 tabs:
       🎬 Thumbnail  – composes a 1920×1080 YouTube thumbnail from YOUR image
                       (Pro design / Image only, editable text, accent colour)
                       → Download HD PNG (1920×1080) or YouTube JPG (1280×720, <2 MB)
       📋 Kit        – best title, A/B titles, description, tags, hashtags,
                       pinned comment, thumbnail text, community post, chapters,
                       playlist … each with a one-tap COPY button + "Copy everything".
     The thumbnail box and the "Open Thumbnail & YouTube Kit" link are hidden on the page (see the first snippet); the chapter icon opens the studio.

     thumb : "images/<Subject>/<File_Name>/thumbnail.png"   (image link, relative to index.html)
             or { image, banner, line1, line2, line3, person, logo, badge, ribbon, burst:"", mode:"creator"|"pro"|"image" }
             mode "creator" = teacher-style thumbnail: red top banner (banner), white line1, big gold line2,
             cyan line3, teacher cut-out photo on the right, round channel logo top-right.
             Teacher photo + logo: put images/person.png (transparent PNG) and images/logo.png next to index.html, OR just pick them
             inside the studio once (they are remembered in the browser and reused for every chapter).
             "pro" mode uses badge / ribbon instead. Keep burst:"" (empty) so no star sticker is drawn; the blank premium emblem is part of the background image instead.
     yt    : { title, altTitles:[], description, tags:[] (join(", ") length = exactly 500), hashtags:[], pinnedComment,
               thumbText, communityPost, chapters, playlist, extra:[{icon,label,text}] }
     NOTE: export needs the site opened over http(s)://, not file:// (browser canvas rule).

   QUESTION fields stay exactly as before:
     questext, options[4], correct:"1".."4", quesimage, exptext, expimage

   Toolkit classes you can use inside html:
     cp-lead, cp-card (blue green amber red violet teal pink), cp-grid (c2 c3 c4),
     cp-formula, cp-frac, cp-note (tip trap trick remember info exam good),
     cp-steps (ol), cp-example (cp-q / cp-a), cp-mnemonic, cp-vs (good / bad),
     cp-stats / cp-stat, cp-chips, cp-timeline (ul), details.cp-collapse,
     cp-divider, cp-fig, cp-key, plain <table>, <img>, h2/h3/h4
     EMPHASIS RULE: never use the brown cp-hl highlight. Emphasise key words with <u>underline</u> (and <b>bold</b>) only.

   🌐 TRANSLATION (automatic, nothing to write in this file)
     When the Translate button is on, index.html translates every concept page (title, lead, stats, roadmap,
     cards, notes, steps, tables, chips …) and shows it under each English block with the SAME tag, font, size,
     weight, bold and underline. To keep it clean:
       • write all text as real HTML text (never inside images / SVG / CSS content)
       • emphasise with <b>, <u>, <i> only; keep one sentence inside ONE element
       • add translate="no" (or class="notranslate") on anything that must stay untranslated, e.g. a pure formula
       • thumb / yt fields stay English (they are not translated)
════════════════════════════════════════════════════════════════ */

window.TEST_DATA = {

  /* ─────────── 1 · CLASS OVERVIEW (opening summary page) ─────────── */
  1: {
    type: "concept",
    icon: "🎯",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",

    /* 🎬 tap the 🎯 icon on this page → thumbnail studio + YouTube kit */
    thumb: {
      image: "images/Geography/Universe_Solar_System_and_Space_Exploration/thumbnail.png",
      banner: "ALL COMPETITIVE EXAMS",
      line1: "FULL CLASS",
      line2: "SOLAR SYSTEM",
      line3: "UNIVERSE & SPACE",
      badge: "GEOGRAPHY",
      ribbon: "UNIVERSE • PLANETS • ISRO MISSIONS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Universe, Solar System & Space Exploration | Geography Full Class | SSC UPSC Railways",
      altTitles: [
        "Big Bang to Chandrayaan-3: Full Space Geography Class | All Competitive Exams",
        "Solar System Planets Tricks + ISRO Missions | Geography for SSC CGL & UPSC",
        "Sun, Moon, Planets & Stars in One Class | Geography Static GK",
        "Stop Forgetting Space Facts! Universe & Solar System Full Chapter | All Exams"
      ],
      description:
"Space and astronomy facts decide many easy marks in SSC, UPSC, Banking, Railways and Defence exams — in this full class you learn the whole Universe, Solar System and Space Exploration chapter, page by page, with practice questions after every topic.\n" +
"\n" +
"📌 IN THIS CLASS\n" +
"✅ Greek, Indian and Arab geographers, explorers and “Father of …” titles\n" +
"✅ Big Bang, galaxies, Higgs boson and the origin of the Universe\n" +
"✅ Sun, sunspots, solar flares, aurora and Aditya-L1\n" +
"✅ All 8 planets, the IAU 2006 definition, Pluto and complete planet tables\n" +
"✅ Moon, Super Moon, Blue Moon, Blood Moon and Chandrayaan-1, 2, 3\n" +
"✅ Mars Orbiter Mission, asteroids, meteors, comets\n" +
"✅ Stars, constellations with Indian names, quasars, Milky Way, Andromeda, nebulae\n" +
"✅ 134 practice questions right after the concepts\n" +
"\n" +
"⏱️ CHAPTERS\n" +
"00:00 Class overview\n" +
"00:00 Highlights — Early Greek & Roman Geographers\n" +
"00:00 Indians’ Contribution in Geography\n" +
"00:00 Highlights (contd.) — Arab Geographers & Marco Polo\n" +
"00:00 Highlights (contd.) — Age of Discovery & Renaissance\n" +
"00:00 Highlights (contd.) — Modern Geographers\n" +
"00:00 Universe\n" +
"00:00 Galaxy\n" +
"00:00 The Big Bang Theory\n" +
"00:00 Higgs Boson\n" +
"00:00 Star\n" +
"00:00 The Solar System\n" +
"00:00 Heliocentrism\n" +
"00:00 Geocentric Model\n" +
"00:00 The Sun\n" +
"00:00 Aditya-L1\n" +
"00:00 The Planets\n" +
"00:00 Classification of Planets\n" +
"00:00 Mercury\n" +
"00:00 Venus\n" +
"00:00 The Earth\n" +
"00:00 The Moon\n" +
"00:00 Super Moon\n" +
"00:00 Blue Moon\n" +
"00:00 Blood Moon\n" +
"00:00 Lunar Tetrad\n" +
"00:00 Chandrayaan-1\n" +
"00:00 Chandrayaan-2\n" +
"00:00 Chandrayaan-3\n" +
"00:00 Mars\n" +
"00:00 Jupiter\n" +
"00:00 Saturn\n" +
"00:00 Uranus\n" +
"00:00 Neptune\n" +
"00:00 Planets According to Size, Mass, Density & Revolution\n" +
"00:00 Pluto is not a Planet\n" +
"00:00 Pluto Gets a Numerical Denomination\n" +
"00:00 Some Facts and Figures about the Planets\n" +
"00:00 Asteroids (or Planetoids)\n" +
"00:00 Meteors and Meteorites\n" +
"00:00 Comets\n" +
"00:00 Features of a Comet\n" +
"00:00 Stars\n" +
"00:00 Facts about Stars\n" +
"00:00 Constellations\n" +
"00:00 Some well known Constellations\n" +
"00:00 Quasars\n" +
"00:00 Earth’s Galaxy: The Milky Way\n" +
"00:00 Andromeda: Earth’s closest Galactic neighbour\n" +
"00:00 Nebulae\n" +
"\n" +
"👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n" +
"\n" +
"#Geography #SolarSystem #SpaceGK #SSCCGL #UPSC",
      tags: [
        "solar system",
        "universe and solar system",
        "geography for ssc cgl",
        "space exploration",
        "SSC CGL geography",
        "UPSC geography",
        "Lucent GK geography",
        "planets of solar system",
        "Chandrayaan 3",
        "Aditya L1",
        "Big Bang theory",
        "Higgs boson",
        "ISRO missions",
        "Banking exams GK",
        "Railways NTPC GK",
        "Defence exams GK",
        "geography full class",
        "full class",
        "static GK",
        "general knowledge",
        "space science",
        "constellations",
        "comets and asteroids",
        "moon facts",
        "super moon blue moon",
        "heliocentric model",
        "milky way galaxy",
        "sun facts",
        "universe GK"
      ],
      hashtags: ["Geography", "SolarSystem", "SpaceGK", "SSCCGL", "UPSC"],
      thumbText: "UNIVERSE + SOLAR SYSTEM",
      pinnedComment: "📌 Practice what you learned: solve the questions after each topic and write your score below. Which topic was your weakest — Moon, planets or ISRO missions? 👇",
      communityPost: "🌌 New class is live: Universe, Solar System and Space Exploration — every concept page plus 134 practice questions for SSC, UPSC, Banking, Railways and Defence. Watch, practise and tell me your score! 🚀",
      chapters: "00:00 Class overview\n00:00 Highlights — Early Greek & Roman Geographers\n00:00 Indians’ Contribution in Geography\n00:00 Highlights (contd.) — Arab Geographers & Marco Polo\n00:00 Highlights (contd.) — Age of Discovery & Renaissance\n00:00 Highlights (contd.) — Modern Geographers\n00:00 Universe\n00:00 Galaxy\n00:00 The Big Bang Theory\n00:00 Higgs Boson\n00:00 Star\n00:00 The Solar System\n00:00 Heliocentrism\n00:00 Geocentric Model\n00:00 The Sun\n00:00 Aditya-L1\n00:00 The Planets\n00:00 Classification of Planets\n00:00 Mercury\n00:00 Venus\n00:00 The Earth\n00:00 The Moon\n00:00 Super Moon\n00:00 Blue Moon\n00:00 Blood Moon\n00:00 Lunar Tetrad\n00:00 Chandrayaan-1\n00:00 Chandrayaan-2\n00:00 Chandrayaan-3\n00:00 Mars\n00:00 Jupiter\n00:00 Saturn\n00:00 Uranus\n00:00 Neptune\n00:00 Planets According to Size, Mass, Density & Revolution\n00:00 Pluto is not a Planet\n00:00 Pluto Gets a Numerical Denomination\n00:00 Some Facts and Figures about the Planets\n00:00 Asteroids (or Planetoids)\n00:00 Meteors and Meteorites\n00:00 Comets\n00:00 Features of a Comet\n00:00 Stars\n00:00 Facts about Stars\n00:00 Constellations\n00:00 Some well known Constellations\n00:00 Quasars\n00:00 Earth’s Galaxy: The Milky Way\n00:00 Andromeda: Earth’s closest Galactic neighbour\n00:00 Nebulae",
      playlist: "Geography Full Classes — All Competitive Exams"
    },

    html: `
      <p class="cp-lead">This class takes you from the <u>very first geographers</u> to the <u>edge of the Universe</u>: the Big Bang, the Sun, every planet, the Moon, India’s <b>Chandrayaan, Mangalyaan and Aditya-L1</b> missions, and the stars, galaxies and nebulae beyond. By the end you will be able to answer a large share of the <b>space and geography</b> questions in every competitive exam.</p>
      <div class="cp-stats"><div class="cp-stat"><b>49</b><span>Concept pages</span></div><div class="cp-stat"><b>134</b><span>Practice questions</span></div><div class="cp-stat"><b>240+</b><span>Key facts</span></div><div class="cp-stat"><b>~3.5 hrs</b><span>Time needed</span></div></div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline"><li><b>Highlights — geographers of Greece, India, Arabia, the explorers and modern thinkers</b><br>5 concept pages + 20 practice questions.</li><li><b>Universe, Galaxy, Big Bang, Higgs Boson and how stars are born</b><br>5 concept pages + 13 practice questions.</li><li><b>Solar System, Heliocentrism and the Geocentric Model</b><br>3 concept pages + 7 practice questions.</li><li><b>The Sun and India’s Aditya-L1 mission</b><br>2 concept pages + 9 practice questions.</li><li><b>The Planets and their Classification</b><br>2 concept pages + 7 practice questions.</li><li><b>Mercury, Venus and the Earth</b><br>3 concept pages + 6 practice questions.</li><li><b>The Moon, Super Moon, Blue Moon, Blood Moon and Lunar Tetrad</b><br>5 concept pages + 10 practice questions.</li><li><b>Chandrayaan-1, Chandrayaan-2 and Chandrayaan-3</b><br>3 concept pages + 11 practice questions.</li><li><b>Mars (with Mangalyaan), Jupiter, Saturn, Uranus and Neptune</b><br>5 concept pages + 12 practice questions.</li><li><b>Planet ranking tables, Pluto and the facts-and-figures table</b><br>4 concept pages + 12 practice questions.</li><li><b>Asteroids, Meteors and Comets</b><br>4 concept pages + 8 practice questions.</li><li><b>Stars, Constellations, Quasars, the Milky Way, Andromeda and Nebulae</b><br>8 concept pages + 19 practice questions.</li></ul>
      <div class="cp-divider">What you will be able to do</div>
      <div class="cp-grid c2"><div class="cp-card violet"><div class="cp-card-title">🌌 Origins</div>Explain the Big Bang and the Higgs boson, and match each theory of the Universe with its scientist.</div><div class="cp-card amber"><div class="cp-card-title">🪐 Planets</div>Rank all eight planets by size, mass, density, moons, rotation and revolution — without guessing.</div><div class="cp-card blue"><div class="cp-card-title">🚀 ISRO missions</div>Recall launch dates, vehicles and landing points of Chandrayaan-1, -2, -3, Mangalyaan and Aditya-L1.</div><div class="cp-card red"><div class="cp-card-title">⚠️ Traps</div>Avoid classic mistakes: Venus vs Mercury (hottest), Pluto’s status, Ganymede vs Titan, meteor vs meteorite.</div></div>
      <div class="cp-note exam"><b>Why it matters:</b> Space and astronomy facts, “Father of …” titles and ISRO missions are asked in SSC, UPSC, Banking, Railways and Defence exams every year — and this chapter is the base for General Science too.</div>
      <div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages, so take your time.</div>
      <div class="cp-chips"><span>All competitive exams</span><span>Geography</span><span>Space GK</span><span>Solar System</span><span>ISRO</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE: Highlights — Early Greek & Roman Geographers ─────────── */
  2: {
    type: "concept",
    icon: "🏛️",
    accent: "#3eda6b",
    pauseTimer: true,
    title: "Highlights — Early Greek & Roman Geographers",
    html: `
      <p class="cp-lead">The word <u>Geography</u> comes from two Greek words — <b>Geo</b> (earth) and <b>Graphos</b> (description) — so it literally means <b>“description of the Earth”</b>. The Greeks did the first organised work on the subject, which is why so many “Father of …” titles start here.</p>
      <div class="cp-stats"><div class="cp-stat"><b>276–194 BC</b><span>Eratosthenes</span></div><div class="cp-stat"><b>360°</b><span>Hipparchus’ circle</span></div><div class="cp-stat"><b>2</b><span>Fathers of Math. Geography</span></div><div class="cp-stat"><b>300–1200 AD</b><span>Dark Age</span></div></div>
      <div class="cp-divider">1 · Who did what</div>
      <table><thead><tr><th>Scholar</th><th>Famous for</th></tr></thead><tbody><tr><td><b>Eratosthenes</b></td><td>First to use the word <u>Geography</u>; first to calculate the Earth’s <u>circumference</u> → <b>Father of Geodesy</b> (also called Father of Geography); wrote <i>Geographica</i></td></tr><tr><td><b>Hecataeus</b></td><td>Greek author of <i>Ges Periodos</i> (“description of the Earth”)</td></tr><tr><td><b>Hipparchus</b></td><td>First to divide the circle into <b>360°</b> (Assyrian mathematics); invented the <b>Astrolabe</b> to find longitudes and latitudes</td></tr><tr><td><b>Aristotle</b></td><td>First thinker to argue, with sound reasoning, that the Earth is <u>spherical</u></td></tr><tr><td><b>Ptolemy</b></td><td>Most famous Roman-era scholar of cartography; his writings inspired the Age of Discoveries to find <i>Terra Incognita</i> (unknown lands)</td></tr><tr><td><b>Strabo</b> (64 BC – c. AD 24)</td><td>Described the inhabited world as <u>oblong</u></td></tr><tr><td><b>Pliny</b> (AD 23–79)</td><td>Wrote the famous book <i>Historia Naturalis</i></td></tr><tr><td><b>Thales</b></td><td>First scholar who tried to <u>measure</u> the Earth</td></tr><tr><td><b>Anaximander</b></td><td>First to <u>draw maps</u> → <b>first cartographer</b></td></tr><tr><td><b>Herodotus</b></td><td>Father of History; said history must be treated geographically and geography historically; first to draw <u>meridians</u> on a map</td></tr></tbody></table>
      <div class="cp-note remember"><b>Thales + Anaximander</b> together are the <b>Fathers of Mathematical Geography</b> — one measured, the other mapped.</div>
      <div class="cp-note trap">Do not mix up the “firsts”: <b>Eratosthenes</b> = circumference, <b>Hipparchus</b> = 360° circle, <b>Aristotle</b> = spherical shape reasoning, <b>Anaximander</b> = maps.</div>
      <div class="cp-note info">The period from <b>300 AD to 1200 AD</b> is called the <b>Dark Age</b> in Christian countries, because no important discoveries were made in that time.</div>
      <div class="cp-mnemonic"><b>E</b>ratosthenes → <b>E</b>arth’s size · <b>A</b>naximander → <b>A</b>tlas (maps) · <b>T</b>hales → <b>T</b>ape (measure)</div>
      <div class="cp-note exam">“Father of …” and “who first …” questions from this page appear again and again in every exam.</div>
      <div class="cp-chips"><span>Greek geographers</span><span>Fathers of Geography</span><span>All exams</span></div>
    `
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "Who was the first scholar to use the word “Geography” and is also called the Father of Geodesy?",
    options: ["Herodotus", "Ptolemy", "Eratosthenes", "Strabo"],
    correct: "3",
    exptext: "✅ Eratosthenes (276–194 BC) first used the word and first calculated the Earth’s circumference. 📌 E for Earth’s size. ❌ Herodotus is the Father of History; Ptolemy and Strabo came much later.",
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "Which two Greek scholars are regarded as the Fathers of Mathematical Geography?",
    options: ["Hecataeus and Herodotus", "Eratosthenes and Hipparchus", "Aristotle and Ptolemy", "Thales and Anaximander"],
    correct: "4",
    exptext: "✅ Thales first tried to measure the Earth; Anaximander first drew maps. 📌 Measure + Map = Mathematical Geography. ❌ The other pairs are famous Greeks but do not carry this joint title.",
  },

  /* ─────────── 5 · QUESTION ─────────── */
  5: {
    questext: "Who was the first person to divide the circle into 360° on the basis of Assyrian mathematics?",
    options: ["Eratosthenes", "Hipparchus", "Aristotle", "Anaximander"],
    correct: "2",
    exptext: "✅ Hipparchus also invented the Astrolabe to determine longitudes and latitudes. 📌 Hipparchus = 360°. ❌ Eratosthenes measured the Earth’s circumference; Aristotle reasoned that the Earth is a sphere; Anaximander drew maps.",
  },

  /* ─────────── 6 · QUESTION ─────────── */
  6: {
    questext: "Consider the statements: 1. Hecataeus wrote Ges Periodos. 2. Pliny wrote Historia Naturalis. 3. Ptolemy was the first person to use the word Geography. Which of these are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Ges Periodos = Hecataeus; Historia Naturalis = Pliny. ❌ Statement 3 is wrong: the word Geography was first used by Eratosthenes.",
  },

  /* ─────────── 7 · QUESTION ─────────── */
  7: {
    questext: "Ptolemy’s writings inspired explorers of the Great Age of Discoveries to find which “unknown lands”?",
    options: ["Oikoumene", "Terra Nullius", "Ultima Thule", "Terra Incognita"],
    correct: "4",
    exptext: "✅ Terra Incognita means “unknown land”. 📌 Ptolemy → maps → explorers. ❌ Terra Nullius means land belonging to no one; Oikoumene is the inhabited world; Ultima Thule is a legendary far-north place.",
  },

  /* ─────────── 8 · CONCEPT PAGE: Indians’ Contribution in Geography ─────────── */
  8: {
    type: "concept",
    icon: "🕉️",
    accent: "#993eda",
    pauseTimer: true,
    title: "Indians’ Contribution in Geography",
    html: `
      <p class="cp-lead">Ancient Indian scholars were mathematician-astronomers. Long before telescopes they knew the Earth is <u>round</u>, worked out eclipses and even gave geography its Hindi name <b>‘Bhugol’</b>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>476 AD</b><span>Aryabhatta born</span></div><div class="cp-stat"><b>24,835</b><span>miles — his Earth circumference</span></div><div class="cp-stat"><b>Ujjain</b><span>Prime meridian</span></div><div class="cp-stat"><b>Jambu Dweep</b><span>India in Puranas</span></div></div>
      <div class="cp-divider">1 · Scholars and their books</div>
      <table><thead><tr><th>Scholar</th><th>Period</th><th>Key works and ideas</th></tr></thead><tbody><tr><td><b>Rig Veda</b></td><td>Oldest text</td><td>Describes <u>stars</u> and the <b>five seasons</b> of India; Indian astronomy began around 600 BC (age of Buddha)</td></tr><tr><td><b>Aryabhatta</b></td><td>Born 476 AD</td><td>Earth is a <u>spherical</u> body; circumference ≈ <b>24,835 miles</b> (modern value ≈ 24,901 miles); book <i>Aryabhatiyam</i></td></tr><tr><td><b>Varah Mihir</b></td><td>505–587 AD</td><td>Most famous Indian geographer after Aryabhatta; explained solar and lunar eclipses; <i>Panchasiddhantika</i> covers <b>five</b> concepts — Vaashist, Paitamah, Polas, Saur, Romac</td></tr><tr><td><b>Brahmagupta</b></td><td>598–665 AD</td><td><i>Brahma Siddhanta</i> and <i>Khand Kavya</i> — translated into <b>Arabic</b> in the reign of Caliph <b>Harun-al-Rashid</b> (Baghdad)</td></tr><tr><td><b>Bhaskaracharya</b></td><td>1114–1185 AD</td><td><i>Siddhanta Shiromani</i> and <i>Karanakutuhal</i>; said the Earth is spherical and attracts everything by <b>gravitation</b>; maths books <i>Leelavati</i> and <i>Bijaganit</i></td></tr></tbody></table>
      <div class="cp-divider">2 · Names and places</div>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🌏 Jambu Dweep</div>The <b>Puranas</b> describe India as <u>Jambu Dweep</u>.</div><div class="cp-card teal"><div class="cp-card-title">🌊 Mahendra Malai</div>The <u>eastern coast</u> of ancient India was called Mahendra Malai.</div><div class="cp-card violet"><div class="cp-card-title">📍 Ujjain</div>Early Indian geographers held that the <u>Prime Meridian</u> passes through <b>Ujjain</b>.</div><div class="cp-card pink"><div class="cp-card-title">⚛️ Higgs and Bose</div>In 1964 British scientist <b>Higgs</b> proposed the <b>God Particle</b> idea, based on the <b>Boson theory</b> of <b>Satyendra Nath Bose</b>.</div></div>
      <div class="cp-note info">The Hindi word <b>‘Bhugol’</b> (geography) appears in the <i>Surya Siddhanta</i>.</div>
      <div class="cp-note trap"><i>Leelavati</i> belongs to <b>Bhaskaracharya</b>, not Varah Mihir. <i>Panchasiddhantika</i> belongs to <b>Varah Mihir</b>.</div>
      <div class="cp-mnemonic"><b>A</b>ryabhatta → <b>A</b>ryabhatiyam · <b>V</b>arah → <b>P</b>anchasiddhantika (Panch = 5) · <b>B</b>haskar → <b>L</b>eelavati</div>
      <div class="cp-note exam">Author–book matching and “prime meridian through Ujjain” are favourite one-liners.</div>
      <div class="cp-chips"><span>Indian geographers</span><span>Aryabhatta</span><span>Varah Mihir</span><span>Bhaskaracharya</span></div>
    `
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "Which famous book was written by the Indian geographer Aryabhatta?",
    options: ["Panchasiddhantika", "Aryabhatiyam", "Brahma Siddhanta", "Siddhanta Shiromani"],
    correct: "2",
    exptext: "✅ Aryabhatiyam is Aryabhatta’s book. 📌 Aryabhatta = Aryabhatiyam. ❌ Panchasiddhantika is by Varah Mihir; Siddhanta Shiromani by Bhaskaracharya; Brahma Siddhanta by Brahmagupta.",
  },

  /* ─────────── 10 · QUESTION ─────────── */
  10: {
    questext: "Consider the following pairs: 1. Bhaskaracharya – Siddhanta Shiromani 2. Brahmagupta – Brahma Siddhanta 3. Varah Mihir – Leelavati. Which pairs are correctly matched?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Leelavati is a maths book by Bhaskaracharya. ❌ Pair 3 is wrong because Varah Mihir wrote Panchasiddhantika.",
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "According to early Indian geographers, the Prime Meridian passes through which place?",
    options: ["Pataliputra", "Taxila", "Ujjain", "Varanasi"],
    correct: "3",
    exptext: "✅ Ujjain was treated as the Prime Meridian of ancient Indian astronomy. 📌 U for Ujjain, U for Universal zero line. ❌ Varanasi, Pataliputra and Taxila were great centres but not the meridian.",
  },

  /* ─────────── 12 · QUESTION ─────────── */
  12: {
    questext: "In the Puranas, India has been described as:",
    options: ["Mahendra Malai", "Dandakaranya", "Aryavarta", "Jambu Dweep"],
    correct: "4",
    exptext: "✅ The Puranas call India Jambu Dweep. 📌 Jambu = Jamun-tree island. ❌ Mahendra Malai was the name of the eastern coast; Aryavarta and Dandakaranya are other regional names.",
  },

  /* ─────────── 13 · QUESTION ─────────── */
  13: {
    questext: "The Hindi term ‘Bhugol’ for geography appears in which text?",
    options: ["Leelavati", "Surya Siddhanta", "Aryabhatiyam", "Karanakutuhal"],
    correct: "2",
    exptext: "✅ Surya Siddhanta uses the word Bhugol. 📌 Bhu = Earth, Gol = sphere. ❌ Aryabhatiyam, Leelavati and Karanakutuhal are other scholars’ works on astronomy and mathematics.",
  },

  /* ─────────── 14 · CONCEPT PAGE: Highlights (contd.) — Arab Geographers & Marco Polo ─────────── */
  14: {
    type: "concept",
    icon: "🕌",
    accent: "#dac63e",
    pauseTimer: true,
    title: "Highlights (contd.) — Arab Geographers & Marco Polo",
    html: `
      <p class="cp-lead">When Europe was in its Dark Age, the <u>Arabs</u> preserved and extended Greek and Indian knowledge. Baghdad, under Caliph <b>Harun-al-Rashid</b>, became the world’s science capital.</p>
      <table><thead><tr><th>Name</th><th>What to remember</th></tr></thead><tbody><tr><td><b>Baitul Hikma</b></td><td>Educational institute (“House of Wisdom”) set up under Caliph <b>Harun-al-Rashid</b> in Baghdad</td></tr><tr><td><b>Al-Khwarizmi</b></td><td>Wrote <i>Sind Hind</i> (based on Indian astronomy)</td></tr><tr><td><b>Caliph Al-Mamun</b></td><td>Had Ptolemy’s treatise translated into Arabic as <b>Almagest</b></td></tr><tr><td><b>Al-Balkhi</b></td><td><i>Kitab-al-Ashkal</i> — the <u>first climatic atlas</u></td></tr><tr><td><b>Al-Biruni</b></td><td><i>Kitab-al-Hind</i> (Geography of India), <b>1030 AD</b>; the 11th century is the “Period of Al-Biruni”; his <i>Al-Qanun-al-Masudi</i> follows the style of Ptolemy’s Almagest</td></tr><tr><td><b>Arabs</b></td><td>First to give a <u>seasonal account of the monsoon</u></td></tr><tr><td><b>Marco Polo</b></td><td>Great trade-traveller of the <b>13th century</b>; first to travel from the <b>Mediterranean to the Pacific Ocean</b></td></tr></tbody></table>
      <div class="cp-note trap">Marco Polo = <b>13th</b> century; Al-Biruni = <b>11th</b> century. Do not swap them.</div>
      <div class="cp-mnemonic"><b>B</b>aitul Hikma = <b>B</b>aghdad · <b>K</b>itab-al-<b>H</b>ind = <b>K</b>nowledge of <b>H</b>industan</div>
      <div class="cp-note exam">Expect “Kitab-al-Hind is about which country?” and “Baitul Hikma was set up by whom?”</div>
      <div class="cp-chips"><span>Arab geographers</span><span>Al-Biruni</span><span>Marco Polo</span></div>
    `
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "Al-Biruni’s famous book “Kitab-al-Hind” (1030 AD) deals with the geography of:",
    options: ["Persia", "China", "India", "Arabia"],
    correct: "3",
    exptext: "✅ Kitab-al-Hind means the Book of India. 📌 Hind = India. ❌ Arabia, Persia and China are not the subject of this book.",
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "Baitul Hikma, an educational institute, was established under the patronage of which Caliph?",
    options: ["Al-Khwarizmi", "Harun-al-Rashid", "Al-Biruni", "Al-Mamun"],
    correct: "2",
    exptext: "✅ Harun-al-Rashid of Baghdad founded it. 📌 Baitul Hikma = House of Wisdom. ❌ Al-Mamun had Ptolemy’s work translated as Almagest; Al-Khwarizmi and Al-Biruni were scholars, not Caliphs.",
  },

  /* ─────────── 17 · CONCEPT PAGE: Highlights (contd.) — Age of Discovery & Renaissance ─────────── */
  17: {
    type: "concept",
    icon: "⛵",
    accent: "#3ec0da",
    pauseTimer: true,
    title: "Highlights (contd.) — Age of Discovery & Renaissance",
    html: `
      <p class="cp-lead">From the 15th century, European sailors searched for sea routes and unknown lands. Learn <u>who</u>, <u>where</u> and <u>when</u> — exams love the order of events.</p>
      <table><thead><tr><th>Explorer</th><th>Country</th><th>Achievement</th></tr></thead><tbody><tr><td><b>Vasco da Gama</b></td><td>Portugal</td><td>Reached <b>Calicut</b> (India) in <b>1498</b> via the <b>Cape of Good Hope</b> — a sea route to India round Africa</td></tr><tr><td><b>Christopher Columbus</b></td><td>From Genoa</td><td>Discovered America (the “New World”); the continent was named after <b>Amerigo Vespucci</b></td></tr><tr><td><b>Magellan</b></td><td>Portugal</td><td>His expedition sailed <u>around the world</u> (circa 1520)</td></tr><tr><td><b>Tasman</b></td><td>Holland</td><td>Discovered <b>Tasmania</b> and travelled to New Zealand</td></tr><tr><td><b>Captain James Cook</b></td><td>England</td><td>Sailed round the <b>Antarctica</b> between 1772 and 1775; also reached the <b>Hawaiian Islands</b></td></tr><tr><td><b>Roald Amundsen</b></td><td>Norway</td><td>Discovered the <b>South Pole</b> in <b>1911</b></td></tr></tbody></table>
      <div class="cp-divider">Discoveries and inventions of the Renaissance</div>
      <table><thead><tr><th>Discovery</th><th>Person / year</th></tr></thead><tbody><tr><td>Printing press</td><td>About 1470 AD</td></tr><tr><td>The Solar System (heliocentric)</td><td><b>Copernicus</b>, 1543 AD</td></tr><tr><td>Telescope</td><td><b>Galileo</b>, 1609 AD</td></tr><tr><td>Works on astronomy</td><td><b>Kepler</b></td></tr><tr><td>Spheroid shape of the Earth</td><td><b>Newton</b></td></tr></tbody></table>
      <div class="cp-note trap">The New World was <b>not</b> named after Columbus — it was named <u>America</u> after <b>Amerigo Vespucci</b>.</div>
      <div class="cp-mnemonic">Order: <b>G</b>ama (1498) → <b>M</b>agellan (1520) → <b>C</b>ook (1772) → <b>A</b>mundsen (1911) — “<b>G</b>o <b>M</b>eet <b>C</b>ool <b>A</b>nts”</div>
      <div class="cp-note exam">Chronology (which came first?) and match-the-explorer questions are common.</div>
      <div class="cp-chips"><span>Explorers</span><span>Renaissance</span><span>Chronology</span></div>
    `
  },

  /* ─────────── 18 · QUESTION ─────────── */
  18: {
    questext: "Arrange these events in chronological order: 1. Roald Amundsen discovers the South Pole 2. Vasco da Gama reaches Calicut 3. Captain Cook sails round Antarctica 4. Magellan’s voyage around the world",
    options: ["2 – 4 – 3 – 1", "4 – 2 – 3 – 1", "2 – 3 – 4 – 1", "2 – 4 – 1 – 3"],
    correct: "1",
    exptext: "✅ Vasco da Gama (1498) → Magellan (1520) → Cook (1772–75) → Amundsen (1911). 📌 G-M-C-A. ❌ Other orders put Cook before Magellan or Amundsen before Cook.",
  },

  /* ─────────── 19 · QUESTION ─────────── */
  19: {
    questext: "The New World (America) was named after the Italian traveller:",
    options: ["Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama", "Amerigo Vespucci"],
    correct: "4",
    exptext: "✅ America comes from Amerigo Vespucci’s first name. 📌 Name ≠ discoverer. ❌ Columbus reached it, but the name honours Vespucci.",
  },

  /* ─────────── 20 · QUESTION ─────────── */
  20: {
    questext: "Which Renaissance discovery is correctly matched with its person?",
    options: ["Spheroid shape of the Earth – Kepler", "Solar System – Newton", "Telescope – Galileo (1609)", "Printing press – Copernicus"],
    correct: "3",
    exptext: "✅ Galileo built the telescope in 1609. 📌 Copernicus 1543, Galileo 1609. ❌ Solar System work is Copernicus’s; the spheroid Earth is Newton’s; Kepler worked on astronomy.",
  },

  /* ─────────── 21 · CONCEPT PAGE: Highlights (contd.) — Modern Geographers ─────────── */
  21: {
    type: "concept",
    icon: "🧭",
    accent: "#da3e92",
    pauseTimer: true,
    title: "Highlights (contd.) — Modern Geographers",
    html: `
      <p class="cp-lead">Geography became an independent subject in the <u>19th century</u>. In the early 20th century it grew into the study of the <b>mutual relation between humans and environment</b> — and each big idea has a famous name behind it.</p>
      <table><thead><tr><th>Geographer</th><th>Idea / title</th></tr></thead><tbody><tr><td><b>Verenius</b></td><td>First to split geography into <b>Systematic</b> and <b>Regional</b> geography (dichotomy)</td></tr><tr><td><b>Alexander von Humboldt</b> (1769–1859)</td><td>Book <i>Cosmos</i>; first to show <b>isotherms</b> on a map; first to think of a canal across the <b>Panama isthmus</b>; called Father of Climatology, Father of Modern Geography and Father of Vegetation Geography</td></tr><tr><td><b>Ratzel</b></td><td><b>Father of Political Geography and Human Geography</b>; book <i>Anthropogeographie</i>; father of the <b>Lebensraum</b> concept; compared a state to a living organism</td></tr><tr><td><b>Vidal-de-la-Blache</b> (France)</td><td>Founder of <b>Possibilism</b>; the real founder of Human Geography</td></tr><tr><td><b>Mackinder</b> (Britain)</td><td><b>Heartland Theory</b>; book <i>Democratic Ideals and Reality</i> (1919)</td></tr><tr><td><b>Carl Ortwin Sauer</b> (USA)</td><td><b>Father of Cultural Geography</b></td></tr><tr><td><b>Herbertson</b> (Britain)</td><td>Divided the world into <b>15 Natural Regions</b>; first to study Natural Geography</td></tr></tbody></table>
      <div class="cp-divider">Mackinder’s idea in one line</div>
      <ol class="cp-steps"><li>Whoever rules <b>Eastern Europe</b> commands the <b>Heartland</b>.</li><li>Whoever rules the Heartland commands the <b>World-Island</b>.</li><li>Whoever rules the World-Island commands the <b>World</b>.</li></ol>
      <div class="cp-note trap"><b>Ratzel</b> = Political Geography + Lebensraum; <b>Vidal-de-la-Blache</b> = Possibilism + Human Geography; <b>Mackinder</b> = Heartland. Never swap these three.</div>
      <div class="cp-mnemonic"><b>R</b>atzel → <b>R</b>egion’s <b>R</b>oom (Lebensraum) · <b>V</b>idal → <b>V</b>arious <b>V</b>iable choices (Possibilism) · <b>M</b>ackinder → <b>M</b>iddle land (Heartland)</div>
      <div class="cp-note exam">“Father of …” titles (Humboldt, Ratzel, Sauer) and theory–author pairs are asked almost every year.</div>
      <div class="cp-chips"><span>Modern geographers</span><span>Heartland</span><span>Possibilism</span><span>Lebensraum</span></div>
    `
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "Which geographer is considered the Father of Political Geography and Human Geography and gave the Lebensraum concept?",
    options: ["Vidal-de-la-Blache", "Carl Ortwin Sauer", "Mackinder", "Ratzel"],
    correct: "4",
    exptext: "✅ Ratzel wrote Anthropogeographie and compared the state to an organism needing space. 📌 R = Ratzel = Room (Lebensraum). ❌ Vidal founded Possibilism; Mackinder gave Heartland; Sauer is the Father of Cultural Geography.",
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "The concept of Possibilism is associated with:",
    options: ["Herbertson", "Vidal-de-la-Blache", "Ratzel", "Verenius"],
    correct: "2",
    exptext: "✅ The French geographer Vidal-de-la-Blache founded Possibilism and is the real founder of Human Geography. 📌 V for Vidal, V for Various choices. ❌ Ratzel is linked with Lebensraum; Herbertson with natural regions; Verenius with the dichotomy.",
  },

  /* ─────────── 24 · QUESTION ─────────── */
  24: {
    questext: "The Heartland Theory was propounded by which British geographer in his book “Democratic Ideals and Reality” (1919)?",
    options: ["Herbertson", "Humboldt", "Mackinder", "Ratzel"],
    correct: "3",
    exptext: "✅ Mackinder’s theory: who rules Eastern Europe commands the Heartland. 📌 M = Mackinder = Middle land. ❌ Herbertson divided the world into 15 natural regions; Humboldt wrote Cosmos; Ratzel is the political-geography father.",
  },

  /* ─────────── 25 · QUESTION ─────────── */
  25: {
    questext: "Alexander von Humboldt is known for which of the following?",
    options: ["Founding Possibilism", "Giving the Heartland Theory", "Writing the book Cosmos and first depicting isotherms on a map", "Dividing the world into 15 natural regions"],
    correct: "3",
    exptext: "✅ Humboldt wrote Cosmos and first drew isotherms; he is called the Father of Modern Geography. 📌 Humboldt = Cosmos + isotherms. ❌ The other three options belong to Mackinder, Vidal-de-la-Blache and Herbertson.",
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Humboldt – Cosmos", "Carl Ortwin Sauer – Father of Cultural Geography", "Herbertson – 15 Natural Regions", "Ratzel – Heartland Theory"],
    correct: "4",
    exptext: "✅ Heartland Theory belongs to Mackinder, so this pair is wrong. 📌 Ratzel = Lebensraum. ❌ The other three pairs are all correct.",
  },

  /* ─────────── 27 · CONCEPT PAGE: Universe ─────────── */
  27: {
    type: "concept",
    icon: "🌌",
    accent: "#65da3e",
    pauseTimer: true,
    title: "Universe",
    html: `
      <p class="cp-lead">The <u>Universe</u> is the <b>totality of everything that exists</b> — all matter and energy, planets, stars, galaxies and even the empty space between galaxies. Studying it as a whole is called <b>Cosmology</b>.</p>
      <div class="cp-formula" translate="no"><small>Word origin</small>Cosmology = <b>cosmos</b> (universe) + <b>logos</b> (science)</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🔭 What is inside?</div>Matter, energy, planets, stars, <u>galaxies</u> and intergalactic space.</div><div class="cp-card violet"><div class="cp-card-title">⚛️ How it began</div>After the birth of the universe, <b>atoms</b> came into existence. From these atoms, <u>dust and clouds of gas</u> formed — the raw material of stars.</div></div>
      <div class="cp-note remember">Think of it as a ladder: <b>atoms → gas clouds → stars → galaxies → clusters → Universe</b>.</div>
      <div class="cp-note trap">Do not confuse <b>Cosmology</b> (study of the universe) with <b>Cosmetology</b> (beauty science)! In geography, cosmos = universe.</div>
      <div class="cp-mnemonic"><b>Cosmos</b> = order · <b>Cosmology</b> = science of the <b>Cosmos</b></div>
      <div class="cp-note exam">Direct one-liners: “study of universe = Cosmology”.</div>
      <div class="cp-chips"><span>Cosmology</span><span>Universe</span></div>
    `
  },

  /* ─────────── 28 · QUESTION ─────────── */
  28: {
    questext: "The scientific study of the universe is known as:",
    options: ["Selenology", "Cosmology", "Geology", "Cosmetology"],
    correct: "2",
    exptext: "✅ Cosmology = cosmos (universe) + logos (science). 📌 Cosmos = universe. ❌ Selenology is the study of the Moon; Geology studies the Earth; Cosmetology is beauty science.",
  },

  /* ─────────── 29 · QUESTION ─────────── */
  29: {
    questext: "After the birth of the universe, which came into existence first, leading to the formation of dust and gas clouds?",
    options: ["Atoms", "Comets", "Planets", "Galaxies"],
    correct: "1",
    exptext: "✅ Atoms formed first; they made dust and gas clouds. 📌 Atoms → clouds → stars. ❌ Planets, galaxies and comets formed much later from those clouds.",
  },

  /* ─────────── 30 · CONCEPT PAGE: Galaxy ─────────── */
  30: {
    type: "concept",
    icon: "🌀",
    accent: "#443eda",
    pauseTimer: true,
    title: "Galaxy",
    html: `
      <p class="cp-lead">A <u>galaxy</u> is a vast system of <b>billions of stars</b>, huge clouds of gas (mainly <b>hydrogen</b>) and dust, held together by gravity and separated from other galaxies by empty space.</p>
      <div class="cp-stats"><div class="cp-stat"><b>10¹¹</b><span>Galaxies (about 100 billion)</span></div><div class="cp-stat"><b>10¹¹</b><span>Stars per galaxy (avg.)</span></div><div class="cp-stat"><b>10²²</b><span>Stars in universe</span></div><div class="cp-stat"><b>Spiral</b><span>Milky Way shape</span></div></div>
      <div class="cp-divider">1 · The numbers</div>
      <div class="cp-formula" translate="no"><small>Counting the stars</small>10¹¹ galaxies × 10¹¹ stars = <b>10²²</b> stars</div>
      <div class="cp-note info">Powers of ten simply add: 11 + 11 = <b>22</b>. Galaxy counts are estimates and vary between sources.</div>
      <div class="cp-divider">2 · Our home galaxy</div>
      <div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">🌌 Milky Way</div>Home of the <b>Earth and the Solar System</b>; it is <u>spiral</u> in shape.</div><div class="cp-card amber"><div class="cp-card-title">🔭 First observer</div>The first person to see the Milky Way as a band of stars was <b>Galileo Galilei</b>.</div><div class="cp-card teal"><div class="cp-card-title">👋 Nearest large galaxy</div><b>Andromeda</b> is the nearest large (spiral) galaxy to the Milky Way.</div><div class="cp-card red"><div class="cp-card-title">🕰️ Age</div>The Milky Way’s oldest stars formed more than 13 billion years ago — soon after the Big Bang.</div></div>
      <div class="cp-note trap"><b>Galaxy</b> ≠ <b>Solar System</b>. A galaxy contains billions of solar-system-like star systems.</div>
      <div class="cp-mnemonic">Galaxy count × stars each: “<b>11 + 11 = 22</b>” — ten-to-the-twenty-two</div>
      <div class="cp-note exam">Facts asked: total stars (10²²), shape of Milky Way (spiral), who first saw it (Galileo).</div>
      <div class="cp-chips"><span>Galaxy</span><span>Milky Way</span><span>10²² stars</span></div>
    `
  },

  /* ─────────── 31 · QUESTION ─────────── */
  31: {
    questext: "According to the standard textbook estimate, the total number of stars in the universe is about:",
    options: ["10¹⁵", "10¹¹", "10²²", "10⁸"],
    correct: "3",
    exptext: "✅ About 10¹¹ galaxies × 10¹¹ stars each = 10²². 📌 11 + 11 = 22. ❌ 10¹¹ is the number of galaxies (or stars per galaxy); 10⁸ and 10¹⁵ are not the quoted figure.",
  },

  /* ─────────── 32 · QUESTION ─────────── */
  32: {
    questext: "The Milky Way galaxy, in which our Solar System lies, is ______ in shape.",
    options: ["irregular", "spiral", "elliptical", "ring"],
    correct: "2",
    exptext: "✅ The Milky Way is a spiral galaxy. 📌 Milky Way = Spiral. ❌ Elliptical, irregular and ring galaxies are other types, not ours.",
  },

  /* ─────────── 33 · QUESTION ─────────── */
  33: {
    questext: "Who was the first person to see the Milky Way as a band of countless stars?",
    options: ["Johannes Kepler", "Isaac Newton", "Nicolaus Copernicus", "Galileo Galilei"],
    correct: "4",
    exptext: "✅ Galileo used a telescope and saw that the glowing band is made of stars. 📌 Galileo = first telescope view. ❌ Copernicus proposed heliocentrism; Kepler studied planetary motion; Newton gave gravity.",
  },

  /* ─────────── 34 · CONCEPT PAGE: The Big Bang Theory ─────────── */
  34: {
    type: "concept",
    icon: "💥",
    accent: "#da723e",
    pauseTimer: true,
    title: "The Big Bang Theory",
    html: `
      <p class="cp-lead">The <u>Big Bang Theory</u> explains the <b>origin of the universe</b>: everything began as one tiny, hot, concentrated lump called the <b>primeval atom</b>, which exploded and has been expanding ever since.</p>
      <div class="cp-fig"><img src="images/Geography/Universe_Solar_System_and_Space_Exploration/1.png" alt="Big Bang timeline: primeval atom, explosion, galaxies, expansion" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-stats"><div class="cp-stat"><b>13.8 bn</b><span>Years ago (13.798)</span></div><div class="cp-stat"><b>1</b><span>Primeval atom</span></div><div class="cp-stat"><b>Lemaître</b><span>Proposer</span></div><div class="cp-stat"><b>Expanding</b><span>Universe today</span></div></div>
      <div class="cp-divider">1 · The story in 4 steps</div>
      <ol class="cp-steps"><li>All matter was concentrated in a lump called the <b>primeval atom</b>.</li><li>It <b>exploded</b> about <b>13.798 billion years ago</b> — the Big Bang.</li><li>The explosion led to the formation of <u>galaxies of stars</u> and other cosmic bodies.</li><li>Galaxies keep <b>flying away</b> from one another, so the universe is <b>expanding</b>.</li></ol>
      <div class="cp-note remember">The theory was formulated by the Belgian Roman Catholic priest, physicist and astronomer <b>Georges Lemaître</b>.</div>
      <div class="cp-divider">2 · Theories about the origin of the Universe</div>
      <table><thead><tr><th>Theory</th><th>Proponent</th></tr></thead><tbody><tr><td><b>Big Bang Theory</b></td><td>Georges Lemaître</td></tr><tr><td><b>Steady State Theory</b></td><td>Thomas Gold, Hermann Bondi (and Fred Hoyle)</td></tr><tr><td><b>Pulsating Universe Theory</b></td><td>Allan Sandage</td></tr><tr><td><b>Inflationary Theory</b></td><td>Alan H. Guth</td></tr></tbody></table>
      <div class="cp-note trap">In the Steady State theory the universe has <b>no beginning</b> — it is the <i>opposite</i> of the Big Bang. Do not mix their proponents.</div>
      <div class="cp-mnemonic"><b>L</b>emaître – <b>L</b>ump (primeval atom) · <b>G</b>uth – <b>G</b>rows fast (inflation)</div>
      <div class="cp-note exam">“Who proposed Big Bang?”, “age of the universe?” and the theory–scientist table come most often.</div>
      <div class="cp-chips"><span>Big Bang</span><span>Lemaître</span><span>Origin of Universe</span></div>
    `
  },

  /* ─────────── 35 · QUESTION ─────────── */
  35: {
    questext: "The Big Bang Theory of the origin of the universe was proposed by:",
    options: ["Thomas Gold", "Allan Sandage", "Alan H. Guth", "Georges Lemaître"],
    correct: "4",
    exptext: "✅ The Belgian priest-astronomer Georges Lemaître proposed it. 📌 Lemaître = Lump = primeval atom. ❌ Gold proposed Steady State, Guth Inflationary, Sandage Pulsating Universe.",
  },

  /* ─────────── 36 · QUESTION ─────────── */
  36: {
    questext: "According to the Big Bang Theory, the universe began roughly how many years ago?",
    options: ["1.38 billion years", "13.8 billion years", "138 billion years", "4.5 billion years"],
    correct: "2",
    exptext: "✅ The Big Bang occurred about 13.798 billion years ago. 📌 13.8 → remember “thirteen-eight”. ❌ 4.5 billion is the age of the Earth; the other two are wrong by a factor of ten.",
  },

  /* ─────────── 37 · QUESTION ─────────── */
  37: {
    questext: "Which of the following pairs of theory and proponent is correctly matched?",
    options: ["Pulsating Universe Theory – Alan H. Guth", "Steady State Theory – Georges Lemaître", "Inflationary Theory – Alan H. Guth", "Big Bang Theory – Thomas Gold"],
    correct: "3",
    exptext: "✅ Alan H. Guth gave the Inflationary Theory. 📌 Guth = Grows fast. ❌ Steady State belongs to Gold and Bondi; Big Bang to Lemaître; Pulsating Universe to Sandage.",
  },

  /* ─────────── 38 · QUESTION ─────────── */
  38: {
    questext: "In the Big Bang Theory, all matter was originally concentrated in a lump called:",
    options: ["primeval atom", "nebula", "dark matter", "God particle"],
    correct: "1",
    exptext: "✅ Lemaître called the initial lump the primeval atom. 📌 Primeval = very first. ❌ Dark matter and the God particle are different ideas; a nebula is a gas-and-dust cloud.",
  },

  /* ─────────── 39 · CONCEPT PAGE: Higgs Boson ─────────── */
  39: {
    type: "concept",
    icon: "⚛️",
    accent: "#3eda9f",
    pauseTimer: true,
    title: "Higgs Boson",
    html: `
      <p class="cp-lead">The <u>Higgs boson</u> (the “<b>God Particle</b>”) is a tiny particle linked to the field that gives other particles their <b>mass</b>. Scientists built the world’s biggest machine to find it and to recreate conditions just after the Big Bang.</p>
      <div class="cp-stats"><div class="cp-stat"><b>27 km</b><span>Tunnel length</span></div><div class="cp-stat"><b>~100 m</b><span>Underground</span></div><div class="cp-stat"><b>30 Mar 2010</b><span>Experiment began</span></div><div class="cp-stat"><b>4 Jul 2012</b><span>Particle found</span></div></div>
      <div class="cp-divider">1 · The experiment</div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Machine</td><td><b>Large Hadron Collider (LHC)</b>, a 27-km ring tunnel near <b>Geneva</b></td></tr><tr><td>Run by</td><td><b>CERN</b> — European Centre for Nuclear Research</td></tr><tr><td>Method</td><td><b>Proton beams</b> at almost the speed of light collided head-on</td></tr><tr><td>Goal</td><td>Recreate the phenomenon just after the <u>Big Bang</u>; unravel mysteries like <b>dark matter, dark energy, extra dimensions</b></td></tr><tr><td>Result</td><td>On <b>4 July 2012</b> CERN identified a particle almost the same as the Higgs boson</td></tr><tr><td>Later</td><td>LHC was closed on 14 Feb 2013 for upgrades and restarted in 2015</td></tr></tbody></table>
      <div class="cp-note remember">The name “<b>boson</b>” honours <b>Satyendra Nath Bose</b> of India; “<b>Higgs</b>” honours the British physicist <b>Peter Higgs</b>.</div>
      <div class="cp-note trap">LHC is in <b>Geneva</b> (Switzerland–France border), run by <b>CERN</b> — not by NASA or ISRO.</div>
      <div class="cp-mnemonic"><b>H</b>iggs = <b>H</b>eavy-making (gives mass) · <b>L</b>HC = <b>L</b>ong ring (27 km)</div>
      <div class="cp-note exam">Asked often: LHC location, tunnel length, year of discovery, “God Particle”.</div>
      <div class="cp-chips"><span>Higgs Boson</span><span>LHC</span><span>CERN</span><span>God Particle</span></div>
    `
  },

  /* ─────────── 40 · QUESTION ─────────── */
  40: {
    questext: "The Large Hadron Collider used in the search for the Higgs boson is located near which city?",
    options: ["Berlin", "Houston", "Paris", "Geneva"],
    correct: "4",
    exptext: "✅ CERN’s LHC lies near Geneva. 📌 CERN = Geneva. ❌ Paris and Berlin are not the site; Houston is home of NASA’s Johnson Space Center.",
  },

  /* ─────────── 41 · QUESTION ─────────── */
  41: {
    questext: "The tunnel in which the Large Hadron Collider experiment was conducted is about how long?",
    options: ["27 km", "7 km", "17 km", "57 km"],
    correct: "1",
    exptext: "✅ The LHC ring is 27 km long. 📌 27 km, about 100 m deep. ❌ The other lengths are not the LHC’s size.",
  },

  /* ─────────── 42 · QUESTION ─────────── */
  42: {
    questext: "The Higgs boson is popularly known as:",
    options: ["Quasar", "God Particle", "Neutrino", "Dark Matter"],
    correct: "2",
    exptext: "✅ Higgs boson = God Particle; CERN reported it on 4 July 2012. 📌 Boson = Bose, Higgs = mass. ❌ Dark matter is a different mystery; a neutrino is another particle; a quasar is a luminous galactic core.",
  },

  /* ─────────── 43 · CONCEPT PAGE: Star ─────────── */
  43: {
    type: "concept",
    icon: "⭐",
    accent: "#cd3eda",
    pauseTimer: true,
    title: "Star",
    html: `
      <p class="cp-lead">Stars are born in <u>nebulae</u>. Clumps of dust and gas are pulled together by <b>gravity</b>, become hot, and finally start shining on their own.</p>
      <div class="cp-grid c3"><div class="cp-card amber"><div class="cp-card-title">🔥 Made of</div>Hot burning gases, very large and very hot.</div><div class="cp-card blue"><div class="cp-card-title">💡 Light</div>Stars emit light of their <u>own</u> — unlike planets.</div><div class="cp-card green"><div class="cp-card-title">📏 Distance</div>Light takes about <b>4.25 years</b> from <b>Proxima Centauri</b> and about 4.4 years from Alpha Centauri.</div></div>
      <div class="cp-note remember"><b>Proxima Centauri</b> is the nearest star to us after the <b>Sun</b>.</div>
      <div class="cp-note trap"><b>Light-year</b> is a unit of <u>distance</u>, not time.</div>
      <div class="cp-mnemonic">Nebula → gravity → <b>star</b>: “Gas Gathers, Gravity Glues, Glow Goes”</div>
      <div class="cp-chips"><span>Star formation</span><span>Proxima Centauri</span></div>
    `
  },

  /* ─────────── 44 · QUESTION ─────────── */
  44: {
    questext: "Stars are formed when clumps of dust and gas in a nebula come together due to:",
    options: ["radioactivity", "air pressure", "gravity", "magnetism"],
    correct: "3",
    exptext: "✅ Gravity pulls the gas and dust together to form stars. 📌 Nebula + gravity = star. ❌ Magnetism, radioactivity and air pressure do not form stars.",
  },

  /* ─────────── 45 · CONCEPT PAGE: The Solar System ─────────── */
  45: {
    type: "concept",
    icon: "☀️",
    accent: "#b9da3e",
    pauseTimer: true,
    title: "The Solar System",
    html: `
      <p class="cp-lead">The <u>Solar System</u> is the Sun plus everything held by its gravity: <b>eight planets</b>, their moons, and countless asteroids, comets and meteors. The Sun is the boss — its <u>gravity</u> controls every member.</p>
      <div class="cp-fig"><img src="images/Geography/Universe_Solar_System_and_Space_Exploration/2.png" alt="Solar system: Sun and eight planets in order" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-stats"><div class="cp-stat"><b>1</b><span>Sun (centre)</span></div><div class="cp-stat"><b>8</b><span>Planets</span></div><div class="cp-stat"><b>99.9%</b><span>Mass in the Sun</span></div><div class="cp-stat"><b>10⁵ AU</b><span>Approx. size</span></div></div>
      <div class="cp-divider">1 · Key facts</div>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">☀️ Sun</div>At the centre; accounts for almost <b>99.9%</b> of the matter in the solar system; <u>source of all energy</u> in it.</div><div class="cp-card blue"><div class="cp-card-title">🪐 Planets</div>Revolve around the Sun in <u>elliptical orbits</u>, held by the Sun’s gravity.</div><div class="cp-card green"><div class="cp-card-title">📍 Nearest / farthest</div>Nearest planet: <b>Mercury</b>. Farthest planet: <b>Neptune</b> (<i>not</i> Pluto).</div><div class="cp-card violet"><div class="cp-card-title">⚪ Pluto</div>A <b>dwarf planet</b>, no longer a planet.</div></div>
      <table><thead><tr><th>Group</th><th>Members</th></tr></thead><tbody><tr><td>Terrestrial (rocky) planets</td><td>Mercury, Venus, Earth, Mars</td></tr><tr><td>Gaseous planets</td><td>Jupiter, Saturn, Uranus, Neptune</td></tr></tbody></table>
      <div class="cp-note trap">Many students write “Pluto is the farthest planet”. Since 2006, the farthest planet is <b>Neptune</b>.</div>
      <div class="cp-mnemonic"><b>M</b>y <b>V</b>ery <b>E</b>ducated <b>M</b>other <b>J</b>ust <b>S</b>erved <b>U</b>s <b>N</b>oodles (Mercury → Neptune)</div>
      <div class="cp-note exam">Asked: Sun’s share of mass, terrestrial vs gaseous planets, nearest and farthest planet.</div>
      <div class="cp-chips"><span>Solar System</span><span>Planets order</span></div>
    `
  },

  /* ─────────── 46 · QUESTION ─────────── */
  46: {
    questext: "The Sun accounts for approximately what percentage of the matter in the whole Solar System?",
    options: ["75%", "90%", "50%", "99.9%"],
    correct: "4",
    exptext: "✅ The Sun holds almost 99.9% of the Solar System’s matter. 📌 Sun = boss of the system. ❌ 90%, 75% and 50% understate its dominance.",
  },

  /* ─────────── 47 · QUESTION ─────────── */
  47: {
    questext: "Which is the farthest planet from the Sun in the Solar System today?",
    options: ["Saturn", "Uranus", "Neptune", "Pluto"],
    correct: "3",
    exptext: "✅ Neptune is the eighth and farthest planet. 📌 After 2006 Pluto is a dwarf planet. ❌ Pluto is not a planet now; Uranus and Saturn are nearer.",
  },

  /* ─────────── 48 · QUESTION ─────────── */
  48: {
    questext: "Which of the following is NOT a terrestrial planet?",
    options: ["Mars", "Uranus", "Venus", "Mercury"],
    correct: "2",
    exptext: "✅ Uranus is a gaseous (Jovian) planet. 📌 Terrestrial = Mercury, Venus, Earth, Mars. ❌ The other three are rocky terrestrial planets.",
  },

  /* ─────────── 49 · CONCEPT PAGE: Heliocentrism ─────────── */
  49: {
    type: "concept",
    icon: "🔭",
    accent: "#3e8cda",
    pauseTimer: true,
    title: "Heliocentrism",
    html: `
      <p class="cp-lead"><u>Heliocentrism</u> is the model in which the <b>Sun is at the centre</b> and the Earth and other bodies revolve around it. It took nearly 2,000 years to win over the older Earth-centred view.</p>
      <div class="cp-fig"><img src="images/Geography/Universe_Solar_System_and_Space_Exploration/3.png" alt="Heliocentric model versus geocentric model" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-divider">Timeline of the idea</div>
      <ul class="cp-timeline"><li><b>5th century BC</b> — <b>Philolaus</b> and <b>Hicetas</b> guess that the Earth is a sphere revolving around a mystical “central fire”.</li><li><b>Two centuries later</b> — <b>Aristarchus of Samos</b> proposes a definite central object: the <b>Sun</b>.</li><li><b>2nd century AD</b> — <b>Ptolemy</b> of Alexandria fixes the Earth at the centre (geocentric); this view dominates for about <b>1,400 years</b>.</li><li><b>1444</b> — <b>Nicholas of Cusa</b> again argues for the Earth’s rotation.</li><li><b>1543</b> — <b>Copernicus</b>’s <i>De revolutionibus orbium coelestium</i> re-establishes heliocentrism.</li><li><b>1633</b> — <b>Galileo</b>’s support leads to his famous trial before the Inquisition.</li></ul>
      <div class="cp-note trap"><b>Aristarchus</b> first proposed the Sun-centred idea; <b>Copernicus</b> revived and proved it in a book. Do not call Copernicus the very first.</div>
      <div class="cp-mnemonic">Helio = Sun (Greek “Helios”): <b>H</b>elio → <b>H</b>ot star in the middle</div>
      <div class="cp-note exam">Dates 1543 (Copernicus) and 1633 (Galileo’s trial) are favourites.</div>
      <div class="cp-chips"><span>Heliocentrism</span><span>Copernicus</span><span>Galileo</span></div>
    `
  },

  /* ─────────── 50 · QUESTION ─────────── */
  50: {
    questext: "Which Greek thinker proposed that the Earth and other planets move around a definite central object, the Sun?",
    options: ["Aristarchus of Samos", "Philolaus", "Hicetas", "Ptolemy"],
    correct: "1",
    exptext: "✅ Aristarchus of Samos extended the earlier ideas and named the Sun. 📌 A for Aristarchus, A for first Answer. ❌ Ptolemy backed Earth-centred model; Philolaus and Hicetas spoke of a mystical central fire.",
  },

  /* ─────────── 51 · QUESTION ─────────── */
  51: {
    questext: "Nicolaus Copernicus’s book “De revolutionibus orbium coelestium” re-established heliocentrism in which year?",
    options: ["1444", "1609", "1543", "1633"],
    correct: "3",
    exptext: "✅ The book appeared in 1543. 📌 Copernicus = 1543. ❌ 1444 is Nicholas of Cusa; 1609 is Galileo’s telescope; 1633 is Galileo’s trial.",
  },

  /* ─────────── 52 · QUESTION ─────────── */
  52: {
    questext: "Galileo Galilei’s famous trial before the Inquisition, resulting from his support of heliocentrism, took place in:",
    options: ["1633", "1498", "1609", "1543"],
    correct: "1",
    exptext: "✅ Galileo was tried in 1633. 📌 Galileo = 1609 telescope, 1633 trial. ❌ 1543 is Copernicus’s book; 1498 is Vasco da Gama’s voyage; 1609 is the telescope.",
  },

  /* ─────────── 53 · CONCEPT PAGE: Geocentric Model ─────────── */
  53: {
    type: "concept",
    icon: "🌍",
    accent: "#da3e5e",
    pauseTimer: true,
    title: "Geocentric Model",
    html: `
      <p class="cp-lead">The <u>Geocentric Model</u> says the <b>Earth is at the centre</b> of the solar system (or universe) and everything else goes around it.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🏛️ Best-known model</div>Developed most fully by <b>Ptolemy of Alexandria</b> (2nd century CE).</div><div class="cp-card blue"><div class="cp-card-title">⏳ How long?</div>Generally accepted until the <b>16th century</b>, when heliocentric models such as that of <b>Copernicus</b> replaced it.</div></div>
      <div class="cp-vs"><div class="good"><h4>✅ Geocentric</h4>Earth in the <b>centre</b> — Ptolemy</div><div class="bad"><h4>☀️ Heliocentric</h4>Sun in the <b>centre</b> — Copernicus</div></div>
      <div class="cp-mnemonic"><b>Geo</b> = Earth, <b>Helio</b> = Sun. “<b>Ptolemy = Planet-Earth centre</b>”</div>
      <div class="cp-note exam">Question pattern: “Who developed the most advanced geocentric model?” → Ptolemy.</div>
      <div class="cp-chips"><span>Geocentric</span><span>Ptolemy</span></div>
    `
  },

  /* ─────────── 54 · QUESTION ─────────── */
  54: {
    questext: "The most highly developed geocentric model of the solar system was that of:",
    options: ["Aristarchus of Samos", "Nicolaus Copernicus", "Galileo Galilei", "Ptolemy of Alexandria"],
    correct: "4",
    exptext: "✅ Ptolemy of Alexandria (2nd century CE) perfected the Earth-centred model. 📌 Geo = Earth = Ptolemy. ❌ Copernicus replaced it with a Sun-centred model; Aristarchus and Galileo supported a Sun-centred view.",
  },

  /* ─────────── 55 · CONCEPT PAGE (roadmap): Members of the Solar System ─────────── */
  55: {
    type: "concept",
    icon: "🪐",
    accent: "#3eda4b",
    pauseTimer: true,
    title: "Members of the Solar System",
    html: `
      <p class="cp-lead">Now we meet the family, one by one — from the <u>Sun</u> at the centre to the small wanderers at the edge.</p>
      <ul class="cp-timeline"><li><b>The Sun</b> — structure, temperature, sunspots, flares, aurora</li><li><b>Aditya-L1</b> — India’s first space-based solar mission</li><li><b>The Planets</b> and <b>Classification of Planets</b> — rules, groups and tables</li><li><b>Notable facts about planets and satellites</b> — Mercury to Neptune, the Moon and Chandrayaan</li><li><b>Pluto, ranking tables, asteroids, meteors and comets</b></li></ul>
      <div class="cp-note tip">Read the Sun page slowly — the numbers (5778 K, 11-year cycle, 8 minutes) are asked again and again.</div>
      <div class="cp-chips"><span>Sun</span><span>Planets</span><span>Moon</span><span>Small bodies</span></div>
    `
  },

  /* ─────────── 56 · CONCEPT PAGE: The Sun ─────────── */
  56: {
    type: "concept",
    icon: "🌞",
    accent: "#793eda",
    pauseTimer: true,
    title: "The Sun",
    html: `
      <p class="cp-lead">The Sun is a giant ball of hot gas — the <u>only star in our solar system</u> and the <b>source of almost all energy</b> on Earth. It does not burn like a fire: deep inside, <b>hydrogen is fused into helium</b> (nuclear fusion), releasing a tremendous amount of heat and light.</p>
      <div class="cp-fig"><img src="images/Geography/Universe_Solar_System_and_Space_Exploration/4.png" alt="Sun layers: core, photosphere, corona" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-stats"><div class="cp-stat"><b>13 lakh×</b><span>Earth’s volume</span></div><div class="cp-stat"><b>14 lakh km</b><span>Diameter (approx.)</span></div><div class="cp-stat"><b>5778 K</b><span>Surface temp.</span></div><div class="cp-stat"><b>150 M km</b><span>From Earth</span></div></div>
      <div class="cp-divider">1 · Composition and temperature</div>
      <table><thead><tr><th>Item</th><th>Value</th></tr></thead><tbody><tr><td>Hydrogen</td><td><b>71%</b></td></tr><tr><td>Helium</td><td><b>26.5%</b></td></tr><tr><td>Other elements</td><td><b>2.5%</b></td></tr><tr><td>Surface temperature</td><td><b>5778 K</b> ≈ 5504.85 °C ≈ 9940.73 °F</td></tr><tr><td>Temperature at the centre</td><td>About <b>1.571 × 10⁷ K</b> ≈ 15,000,000 °C</td></tr><tr><td>Light travel time to Earth</td><td>About <b>8 to 8.5 minutes</b> (speed 3,00,000 km/s)</td></tr></tbody></table>
      <div class="cp-divider">2 · Parts and events</div>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🔆 Photosphere</div>The shining <u>surface</u> that looks like a disc; it radiates energy.</div><div class="cp-card blue"><div class="cp-card-title">👑 Corona</div>The outer layer of thin hot gases; visible only during a <b>total solar eclipse</b> or with a special telescope, the <b>coronagraph</b>.</div><div class="cp-card red"><div class="cp-card-title">⚫ Sun Spots</div>Cooler dark regions (about 1,500 °C cooler than the surroundings); they give strong <b>magnetic radiation</b> that disturbs wireless communication; they appear and vanish every <b>11 years</b> — the <b>Sun Spot Cycle</b>.</div><div class="cp-card violet"><div class="cp-card-title">💥 Solar Flares</div>A storm of hot atoms from the photosphere that escapes into space; when the charged particles reach Earth they cause <b>Aurora Borealis</b> (north) and <b>Aurora Australis</b> (south).</div></div>
      <div class="cp-note trap">Sun spots look dark only because they are <i>cooler</i> than the rest of the Sun — they are not cold, and not holes.</div>
      <div class="cp-note exam">Remember: <b>Corona → eclipse</b>, <b>Sun Spot Cycle → 11 years</b>, <b>Aurora Borealis → North Pole</b>, <b>Aurora Australis → South Pole</b>.</div>
      <div class="cp-mnemonic"><b>P</b>hotosphere = <b>P</b>hysical surface · <b>C</b>orona = <b>C</b>rown · <b>B</b>orealis = <b>B</b>oreal = <b>B</b>ig north</div>
      <details class="cp-collapse"><summary>More facts about the Sun</summary><p>The Sun is the nearest star to Earth. The solar system travels together with the Sun through the Milky Way at about 70,000 km per hour relative to neighbouring stars. Its mass is the largest in the solar system.</p></details>
      <div class="cp-chips"><span>Sun</span><span>Corona</span><span>Sun Spot Cycle</span><span>Aurora</span></div>
    `
  },

  /* ─────────── 57 · QUESTION ─────────── */
  57: {
    questext: "Which two gases are the main components of the Sun?",
    options: ["Helium and Neon", "Hydrogen and Helium", "Hydrogen and Nitrogen", "Hydrogen and Oxygen"],
    correct: "2",
    exptext: "✅ The Sun is 71% hydrogen and 26.5% helium. 📌 H + He = 97.5% of the Sun. ❌ Oxygen, neon and nitrogen are only part of the remaining 2.5%.",
  },

  /* ─────────── 58 · QUESTION ─────────── */
  58: {
    questext: "The outer layer of the Sun’s atmosphere, visible during a total solar eclipse, is called:",
    options: ["Solar Flare", "Photosphere", "Sun Spot", "Corona"],
    correct: "4",
    exptext: "✅ The Corona is the thin hot outer atmosphere. 📌 Corona = Crown. ❌ Photosphere is the shining surface; sunspots are dark regions; flares are storms.",
  },

  /* ─────────── 59 · QUESTION ─────────── */
  59: {
    questext: "The Sun Spot Cycle, in which sunspots appear and disappear, lasts about:",
    options: ["5 years", "50 years", "11 years", "22 years"],
    correct: "3",
    exptext: "✅ Sunspots peak and fade about every 11 years. 📌 Sun Spot = 11. ❌ 5 and 50 years are wrong; 22 years is the full magnetic cycle, not the sunspot cycle.",
  },

  /* ─────────── 60 · QUESTION ─────────── */
  60: {
    questext: "Consider the statements about sunspots: 1. They are cooler regions of the Sun. 2. They produce strong magnetic radiation that disturbs wireless communication. 3. Their cycle lasts 22 years. Which are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Sunspots = cool + magnetic + 11 years. ❌ Statement 3 is wrong because the sunspot cycle is 11 years.",
  },

  /* ─────────── 61 · QUESTION ─────────── */
  61: {
    questext: "Light from the Sun (travelling at about 3,00,000 km per second) takes roughly how long to reach the Earth?",
    options: ["About 5 hours", "About 8 to 8.5 minutes", "About 50 minutes", "About 1.3 seconds"],
    correct: "2",
    exptext: "✅ The Sun is about 150 million km away, so light takes around 8–8.5 minutes. 📌 Sun = minutes, Moon = seconds. ❌ 1.3 seconds is the Moon’s time; 5 hours and 50 minutes are far too long.",
  },

  /* ─────────── 62 · QUESTION ─────────── */
  62: {
    questext: "Which of the following statements about the Sun is NOT correct?",
    options: ["Its temperature at the centre is lower than at its surface", "It is composed of about 71% hydrogen", "Its surface temperature is about 5778 K", "It is the nearest star to the Earth"],
    correct: "1",
    exptext: "✅ The core is about 15 million °C, far hotter than the 5778 K surface. 📌 Hotter inside, cooler outside. ❌ The other three statements are true.",
  },

  /* ─────────── 63 · CONCEPT PAGE: Aditya-L1 ─────────── */
  63: {
    type: "concept",
    icon: "🛰️",
    accent: "#daa63e",
    pauseTimer: true,
    title: "Aditya-L1",
    html: `
      <p class="cp-lead"><b>Aditya-L1</b> is India’s <u>first space-based mission to study the Sun</u>. “Aditya” means the Sun in Sanskrit, and “L1” means the <b>Lagrange Point 1</b> of the Sun–Earth system.</p>
      <div class="cp-stats"><div class="cp-stat"><b>2 Sep 2023</b><span>Launch date</span></div><div class="cp-stat"><b>PSLV-C57</b><span>Launch vehicle</span></div><div class="cp-stat"><b>7</b><span>Payloads</span></div><div class="cp-stat"><b>1.5 M km</b><span>From Earth</span></div></div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Agency</td><td><b>ISRO</b>; 7 payloads, all developed indigenously (5 by ISRO and 2 by academic institutes in collaboration with ISRO)</td></tr><tr><td>Launch</td><td><b>PSLV-C57</b>, 2 September 2023; stays in Earth-bound orbits for 16 days</td></tr><tr><td>Meaning of L1</td><td>A point in space where the gravitational pulls of the Sun and Earth are in <u>balance</u>, so a spacecraft stays relatively stable there</td></tr><tr><td>Distance</td><td>About <b>1.5 million km</b> from Earth, directed towards the Sun — about <b>1%</b> of the Earth–Sun distance</td></tr><tr><td>Purpose</td><td>Study the Sun’s <u>outer atmosphere</u></td></tr></tbody></table>
      <div class="cp-note trap">Aditya-L1 will <b>not</b> land on the Sun and will <b>not</b> go any closer to it; it stays at L1.</div>
      <div class="cp-mnemonic"><b>A</b>ditya = <b>A</b>rka = Sun · <b>L1</b> = <b>L</b>ook-out <b>1</b> (balance point)</div>
      <div class="cp-note exam">Current-affairs favourite: launch vehicle, date, L1 distance and “first Indian solar mission”.</div>
      <div class="cp-chips"><span>Aditya-L1</span><span>ISRO</span><span>Solar mission</span></div>
    `
  },

  /* ─────────── 64 · QUESTION ─────────── */
  64: {
    questext: "Aditya-L1, India’s first space-based mission to study the Sun, was launched by which launch vehicle?",
    options: ["PSLV-C57", "GSLV Mk-III", "PSLV-C25", "PSLV-C11"],
    correct: "1",
    exptext: "✅ PSLV-C57 launched it on 2 September 2023. 📌 Aditya = C57. ❌ GSLV Mk-III launched Chandrayaan-2; PSLV-C25 launched the Mars mission; PSLV-C11 launched Chandrayaan-1.",
  },

  /* ─────────── 65 · QUESTION ─────────── */
  65: {
    questext: "“L1” in the name Aditya-L1 refers to:",
    options: ["Launch Pad 1 at Sriharikota", "Lunar orbit 1", "Lagrange Point 1 of the Sun–Earth system", "Landing site 1 on the Sun"],
    correct: "3",
    exptext: "✅ L1 is a point where the pulls of the Sun and Earth balance. 📌 L = Lagrange. ❌ It is not a launch pad, a lunar orbit or a landing site.",
  },

  /* ─────────── 66 · QUESTION ─────────── */
  66: {
    questext: "Consider the statements: 1. Aditya-L1 is India’s first space-based mission to study the Sun. 2. It will land on the surface of the Sun. 3. It is placed about 1.5 million km from Earth. Which are correct?",
    options: ["1 and 3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 3 are correct. 📌 L1 = stay, not land. ❌ Statement 2 is wrong: it neither lands on the Sun nor approaches it any closer.",
  },

  /* ─────────── 67 · CONCEPT PAGE: The Planets ─────────── */
  67: {
    type: "concept",
    icon: "🪐",
    accent: "#3edad4",
    pauseTimer: true,
    title: "The Planets",
    html: `
      <p class="cp-lead">Planets are <u>opaque bodies</u> that continuously revolve around the Sun and shine by its light. In <b>2006</b> the <b>IAU</b> gave the official definition, and the count became <b>eight</b>.</p>
      <div class="cp-divider">1 · The IAU 2006 definition — a planet must…</div>
      <ol class="cp-steps"><li>be in <b>orbit around the Sun</b>;</li><li>have enough <b>self-gravity</b> to become nearly <b>round</b> (hydrostatic equilibrium);</li><li>have <b>cleared the neighbourhood</b> around its orbit.</li></ol>
      <div class="cp-note remember">Bodies that pass tests 1 and 2 but not 3 are <b>dwarf planets</b>. First members: <b>Ceres, Pluto</b> and <b>Eris</b> (2003 UB₃₁₃).</div>
      <div class="cp-divider">2 · Order of the eight planets</div>
      <table><thead><tr><th>By distance from Sun</th><th>By size (big → small)</th></tr></thead><tbody><tr><td>1 Mercury</td><td>1 Jupiter</td></tr><tr><td>2 Venus</td><td>2 Saturn</td></tr><tr><td>3 Earth</td><td>3 Uranus</td></tr><tr><td>4 Mars</td><td>4 Neptune</td></tr><tr><td>5 Jupiter</td><td>5 Earth</td></tr><tr><td>6 Saturn</td><td>6 Venus</td></tr><tr><td>7 Uranus</td><td>7 Mars</td></tr><tr><td>8 Neptune</td><td>8 Mercury</td></tr></tbody></table>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🏆 Biggest</div><b>Jupiter</b></div><div class="cp-card blue"><div class="cp-card-title">🔹 Smallest</div><b>Mercury</b></div></div>
      <div class="cp-note trap"><b>Orbit order ≠ size order.</b> Mars is 4th from the Sun but 7th in size; Neptune is 8th from the Sun but 4th in size.</div>
      <div class="cp-mnemonic"><b>J</b>ust <b>S</b>aw <b>U</b>s <b>N</b>ear <b>E</b>arth <b>V</b>ery <b>M</b>uch <b>M</b>ad — Jupiter, Saturn, Uranus, Neptune, Earth, Venus, Mars, Mercury</div>
      <div class="cp-note exam">IAU definition and the dwarf-planet list are frequent; size-order questions also appear every year.</div>
      <div class="cp-chips"><span>IAU 2006</span><span>Dwarf planets</span><span>Planet order</span></div>
    `
  },

  /* ─────────── 68 · QUESTION ─────────── */
  68: {
    questext: "Which of the following is NOT a condition for a celestial body to be called a planet under the IAU 2006 definition?",
    options: ["It must be in orbit around the Sun", "It must have at least one moon", "It must be nearly round due to its self-gravity", "It must have cleared the neighbourhood around its orbit"],
    correct: "2",
    exptext: "✅ Having a moon is not a requirement; Mercury and Venus have none. 📌 Orbit – Round – Cleared. ❌ The other three are the actual IAU conditions.",
  },

  /* ─────────── 69 · QUESTION ─────────── */
  69: {
    questext: "Which of the following is a dwarf planet?",
    options: ["Ganymede", "Charon", "Titan", "Ceres"],
    correct: "4",
    exptext: "✅ Ceres, Pluto and Eris were the first dwarf planets. 📌 Ceres = asteroid-belt dwarf. ❌ Titan and Ganymede are moons; Charon is a moon of Pluto.",
  },

  /* ─────────── 70 · QUESTION ─────────── */
  70: {
    questext: "Which planet is the third largest in the solar system in terms of size?",
    options: ["Earth", "Uranus", "Neptune", "Saturn"],
    correct: "2",
    exptext: "✅ Order by size: Jupiter, Saturn, Uranus, Neptune, Earth… 📌 J-S-U-N-E-V-M-M. ❌ Neptune is 4th, Saturn 2nd, Earth 5th.",
  },

  /* ─────────── 71 · QUESTION ─────────── */
  71: {
    questext: "Consider the statements: 1. Jupiter is the biggest planet. 2. Mercury is the smallest planet. 3. Mars is the fifth planet from the Sun. Which are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Biggest = Jupiter, smallest = Mercury. ❌ Statement 3 is wrong: Mars is the fourth planet; Jupiter is the fifth.",
  },

  /* ─────────── 72 · CONCEPT PAGE: Classification of Planets ─────────── */
  72: {
    type: "concept",
    icon: "🗂️",
    accent: "#da3eb2",
    pauseTimer: true,
    title: "Classification of Planets",
    html: `
      <p class="cp-lead">The eight planets split neatly into <u>two groups</u> — by what they are made of, and by where they sit. Planets in one group share many features.</p>
      <div class="cp-fig"><img src="images/Geography/Universe_Solar_System_and_Space_Exploration/5.png" alt="Inner rocky planets, asteroid belt, outer gas giants" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🪨 Terrestrial (Rocky)</div><b>Mercury, Venus, Earth, Mars</b> — their structure is similar to the Earth.</div><div class="cp-card blue"><div class="cp-card-title">🎈 Jovian (Gas Giants)</div><b>Jupiter, Saturn, Uranus, Neptune</b> — big, gaseous planets.</div></div>
      <div class="cp-note remember"><b>Inner planets</b> and <b>outer planets</b> are separated by the <b>asteroid belt</b> (between Mars and Jupiter).</div>
      <div class="cp-divider">Inner vs Outer — the comparison</div>
      <table><thead><tr><th>Feature</th><th>Inner planets</th><th>Outer planets</th></tr></thead><tbody><tr><td>Members</td><td>Mercury, Venus, Earth, Mars</td><td>Jupiter, Saturn, Uranus, Neptune</td></tr><tr><td>Distance from Sun</td><td>Nearer</td><td>Far away</td></tr><tr><td>Made of</td><td>Dense, metallic minerals; thin rocky crust</td><td>Hot gases, mainly hydrogen and helium</td></tr><tr><td>Motion</td><td>Move faster; shorter period of revolution</td><td>Move slowly; longer period of revolution</td></tr><tr><td>Rings</td><td>No ring systems</td><td>Have ring systems</td></tr><tr><td>Satellites</td><td>Very few or none</td><td>Large number of satellites</td></tr><tr><td>Atmosphere</td><td>Thin</td><td>Thick and gaseous</td></tr></tbody></table>
      <div class="cp-note trap">Earth is a <b>terrestrial</b> and <b>inner</b> planet — never gaseous. Jovian = Jupiter-like.</div>
      <div class="cp-mnemonic">Inner = <b>I</b>ron-rich, <b>I</b>ntimate (near), <b>I</b>sles of few moons · Outer = <b>O</b>utsize, <b>O</b>ften ringed, <b>O</b>ceans of gas</div>
      <div class="cp-note exam">“Which is NOT a feature of inner/outer planets?” is the common pattern.</div>
      <div class="cp-chips"><span>Terrestrial</span><span>Jovian</span><span>Inner planets</span><span>Outer planets</span></div>
    `
  },

  /* ─────────── 73 · QUESTION ─────────── */
  73: {
    questext: "The inner and outer planets of the solar system are separated by:",
    options: ["the Moon’s orbit", "the Sun’s corona", "the Kuiper belt", "the asteroid belt"],
    correct: "4",
    exptext: "✅ The asteroid belt lies between Mars and Jupiter. 📌 Belt = border. ❌ The Kuiper belt lies beyond Neptune; the Moon’s orbit and corona are unrelated.",
  },

  /* ─────────── 74 · QUESTION ─────────── */
  74: {
    questext: "Which of the following is NOT a characteristic of inner planets?",
    options: ["They have a large number of natural satellites", "They move faster with a shorter period of revolution", "They are nearer to the Sun", "They have a thin rocky crust"],
    correct: "1",
    exptext: "✅ Inner planets have very few or no moons; the outer planets have many. 📌 Inner = few moons. ❌ The other three describe inner planets correctly.",
  },

  /* ─────────── 75 · QUESTION ─────────── */
  75: {
    questext: "Which one of the following groups contains only Jovian (gaseous) planets?",
    options: ["Mars, Jupiter, Uranus, Neptune", "Mercury, Venus, Earth, Mars", "Jupiter, Saturn, Uranus, Neptune", "Venus, Earth, Jupiter, Saturn"],
    correct: "3",
    exptext: "✅ The four outer planets are Jovian. 📌 Jovian = Jupiter-like gas giants. ❌ The other groups mix rocky and gaseous planets.",
  },

  /* ─────────── 76 · CONCEPT PAGE (roadmap): Some Notable Facts About Various Planets and Satellites ─────────── */
  76: {
    type: "concept",
    icon: "🧩",
    accent: "#85da3e",
    pauseTimer: true,
    title: "Some Notable Facts About Various Planets and Satellites",
    html: `
      <p class="cp-lead">This is the <u>fact-file</u> section. We go planet by planet, and include the Moon, special Moon events and India’s Chandrayaan missions.</p>
      <ul class="cp-timeline"><li><b>Mercury → Venus → The Earth</b> — the inner planets</li><li><b>The Moon</b>, <b>Super Moon</b>, <b>Blue Moon</b>, <b>Blood Moon</b>, <b>Lunar Tetrad</b></li><li><b>Chandrayaan-1, -2 and -3</b> — India’s Moon missions</li><li><b>Mars</b> (with Mars Orbiter Mission), <b>Jupiter</b>, <b>Saturn</b>, <b>Uranus</b>, <b>Neptune</b></li></ul>
      <div class="cp-note tip">Make a small table in your notebook: planet → one special fact. This section is rich in direct questions.</div>
      <div class="cp-chips"><span>Planet facts</span><span>Moon</span><span>Chandrayaan</span></div>
    `
  },

  /* ─────────── 77 · CONCEPT PAGE: Mercury ─────────── */
  77: {
    type: "concept",
    icon: "☿️",
    accent: "#3e57da",
    pauseTimer: true,
    title: "Mercury",
    html: `
      <p class="cp-lead"><b>Mercury</b> is the <u>closest planet to the Sun</u> and the <u>smallest planet</u> — yet it is not the hottest, because it has almost no atmosphere to trap heat.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🔥 Closest and hot</div>Extremely hot; <b>visible two hours before sunrise</b> (and after sunset).</div><div class="cp-card blue"><div class="cp-card-title">🧲 Special feature</div>Has a <b>magnetic field</b>.</div><div class="cp-card green"><div class="cp-card-title">🌑 No moon</div>Smallest and lightest of all planets; <b>no natural satellite</b>.</div><div class="cp-card red"><div class="cp-card-title">🚫 Not for life</div>No water, almost no atmosphere and no ozone blanket against harmful radiation.</div></div>
      <div class="cp-note trap">Mercury is the nearest but <b>Venus is hotter</b> — Venus’s thick clouds trap heat.</div>
      <div class="cp-mnemonic"><b>M</b>ercury = <b>M</b>inimum: smallest, <b>M</b>oonless, <b>M</b>agnetic</div>
      <div class="cp-chips"><span>Mercury</span><span>Smallest planet</span></div>
    `
  },

  /* ─────────── 78 · QUESTION ─────────── */
  78: {
    questext: "Which is the smallest planet of the Solar System and has no natural satellite?",
    options: ["Mars", "Pluto", "Venus", "Mercury"],
    correct: "4",
    exptext: "✅ Mercury is the smallest and lightest planet, with no moon. 📌 M = Minimum. ❌ Venus has no moon but is bigger; Mars has two moons; Pluto is a dwarf planet.",
  },

  /* ─────────── 79 · QUESTION ─────────── */
  79: {
    questext: "Which of the following reasons makes Mercury unsuitable for life?",
    options: ["No water and no protective ozone-like blanket", "It has a large number of moons", "It has a very thick cloud cover", "It is farther from the Sun than Earth"],
    correct: "1",
    exptext: "✅ Mercury lacks water and a protective atmospheric layer. 📌 No water + no blanket = no life. ❌ It is nearest to the Sun, has no thick clouds (that is Venus) and has no moons.",
  },

  /* ─────────── 80 · CONCEPT PAGE: Venus ─────────── */
  80: {
    type: "concept",
    icon: "💛",
    accent: "#da523e",
    pauseTimer: true,
    title: "Venus",
    html: `
      <p class="cp-lead"><b>Venus</b> is the <u>brightest planet</u> and the <u>hottest planet</u>. A thick cloud cover wraps it like a veil, and the trapped heat makes it hotter even than Mercury.</p>
      <table><thead><tr><th>Name</th><th>Reason</th></tr></thead><tbody><tr><td><b>Evening Star / Morning Star</b></td><td>Brightest planet seen near sunrise and sunset</td></tr><tr><td><b>Veiled Planet</b></td><td>Thick cloud cover (<i>veil</i> = cover)</td></tr><tr><td><b>Earth’s Twin</b></td><td>Similar in size and mass to Earth</td></tr><tr><td><b>Hottest Planet</b></td><td>Its cloud veil traps heat — hotter than Mercury</td></tr></tbody></table>
      <div class="cp-note info">Venus rotates <b>clockwise</b> (east to west), like <b>Uranus</b>. It has <b>no water</b> and not enough oxygen.</div>
      <div class="cp-note trap">Venus is the <b>second</b> planet from the Sun, yet it is <b>hotter</b> than the first, Mercury.</div>
      <div class="cp-mnemonic"><b>V</b>enus = <b>V</b>eil + <b>V</b>ery hot + <b>V</b>iew at dawn/dusk</div>
      <div class="cp-chips"><span>Venus</span><span>Hottest planet</span></div>
    `
  },

  /* ─────────── 81 · QUESTION ─────────── */
  81: {
    questext: "Which planet is known as both the ‘Morning Star’ and the ‘Evening Star’?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correct: "2",
    exptext: "✅ Venus is the brightest planet and shines near sunrise and sunset. 📌 Venus = Evening/Morning Star. ❌ Mercury is hard to see; Mars is red; Jupiter is bright but not called this.",
  },

  /* ─────────── 82 · QUESTION ─────────── */
  82: {
    questext: "The hottest planet of the Solar System is:",
    options: ["Mercury", "Jupiter", "Venus", "Mars"],
    correct: "3",
    exptext: "✅ Venus’s thick clouds trap heat, making it hotter than Mercury. 📌 Veil = heat trap. ❌ Mercury is nearer to the Sun but has no atmosphere to retain heat.",
  },

  /* ─────────── 83 · CONCEPT PAGE: The Earth ─────────── */
  83: {
    type: "concept",
    icon: "🌍",
    accent: "#3eda7f",
    pauseTimer: true,
    title: "The Earth",
    html: `
      <p class="cp-lead"><b>Earth</b> is the <u>largest of the inner planets</u> and the <u>fifth largest</u> in the solar system. It is the only known planet that supports <b>life</b>, because it has water and plenty of oxygen.</p>
      <div class="cp-stats"><div class="cp-stat"><b>23½°</b><span>Axial tilt</span></div><div class="cp-stat"><b>66½°</b><span>Angle with orbit plane</span></div><div class="cp-stat"><b>23 h 56 min</b><span>Rotation</span></div><div class="cp-stat"><b>365 d 5 h 48 min</b><span>Revolution</span></div></div>
      <table><thead><tr><th>Fact</th><th>Value</th></tr></thead><tbody><tr><td>Tilt of axis</td><td><b>23½°</b> — makes a <b>66½°</b> angle</td></tr><tr><td>Rotation</td><td><b>23 h 56 min 4.091 s</b> to spin once on its axis; about <b>1,670 km/h</b> at the equator</td></tr><tr><td>Revolution</td><td><b>365 days, 5 hours, 48 minutes</b> around the Sun; mean velocity <b>29.8 km/s</b></td></tr><tr><td>Spin rate</td><td>Earth turns by <b>1° in 4 minutes</b></td></tr><tr><td>Nicknames</td><td><b>Watery planet</b> / <b>Blue planet</b> (huge amount of water)</td></tr></tbody></table>
      <div class="cp-note trap">Rotation (spin on axis, 23 h 56 min) ≠ Revolution (journey around the Sun, 365¼ days).</div>
      <div class="cp-mnemonic">360° ÷ 24 h = 15° per hour = <b>1° in 4 minutes</b></div>
      <div class="cp-note exam">Asked: tilt (23½°), 1° in 4 minutes, blue planet, only planet with life.</div>
      <div class="cp-chips"><span>Earth</span><span>Blue planet</span><span>Rotation vs revolution</span></div>
    `
  },

  /* ─────────── 84 · QUESTION ─────────── */
  84: {
    questext: "The Earth’s axis is tilted at an angle of:",
    options: ["33½° from the vertical", "18½° from the vertical", "23½° from the vertical", "66½° from the vertical"],
    correct: "3",
    exptext: "✅ The axis is tilted 23½° and so makes a 66½° angle with the orbital plane. 📌 23 + 66 = 90. ❌ 66½° is the angle with the plane, not the tilt.",
  },

  /* ─────────── 85 · QUESTION ─────────── */
  85: {
    questext: "The Earth rotates through 1° of longitude in about:",
    options: ["24 minutes", "15 minutes", "1 hour", "4 minutes"],
    correct: "4",
    exptext: "✅ 360° in 24 hours = 1° in 4 minutes. 📌 15° per hour. ❌ 15° (not minutes) is turned each hour; 1 hour and 24 minutes are not right.",
  },

  /* ─────────── 86 · CONCEPT PAGE: The Moon ─────────── */
  86: {
    type: "concept",
    icon: "🌙",
    accent: "#ad3eda",
    pauseTimer: true,
    title: "The Moon",
    html: `
      <p class="cp-lead">The <u>Moon</u> is the <b>only natural satellite of the Earth</b>. It always shows us the <u>same face</u>, because it takes almost exactly as long to spin once as to go around the Earth.</p>
      <div class="cp-stats"><div class="cp-stat"><b>3,475 km</b><span>Diameter</span></div><div class="cp-stat"><b>1/4</b><span>Earth’s size</span></div><div class="cp-stat"><b>1/6</b><span>Earth’s gravity</span></div><div class="cp-stat"><b>59%</b><span>Visible from Earth</span></div></div>
      <div class="cp-divider">1 · Numbers to remember</div>
      <table><thead><tr><th>Fact</th><th>Value</th></tr></thead><tbody><tr><td>Diameter / circumference</td><td>3,475 km / about 10,900 km</td></tr><tr><td>Distance from Earth</td><td>Apogee ≈ <b>4,06,000 km</b>; perigee ≈ <b>3,64,000 km</b>; average ≈ <b>3,84,400 km</b></td></tr><tr><td>Sidereal month</td><td><b>27 days 7 hours 43 minutes</b> (≈ 27⅓ days) — time to rotate on its axis and (nearly) to revolve around the Earth</td></tr><tr><td>Synodic month</td><td><b>29.53 days</b> (29 d 12 h 44 min 2.8 s) — revolution with reference to the Sun</td></tr><tr><td>Visible / hidden surface</td><td><b>59%</b> visible; <b>41%</b> hidden</td></tr><tr><td>Mass / density</td><td>Mass 1 : 81.30 (Earth); density 3.34 (water = 1), 0.6058 (Earth = 1)</td></tr><tr><td>Light from Moon to Earth</td><td>About <b>1.3 seconds</b></td></tr><tr><td>Temperature</td><td>About 100 °C by day and about −180 °C at night</td></tr><tr><td>Highest point</td><td><b>Mt. Leibnitz</b> (≈ 35,000 ft), near the South Pole</td></tr></tbody></table>
      <div class="cp-divider">2 · What is on the Moon</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🚫 No atmosphere</div>No atmosphere, no twilight and <b>no sound</b>.</div><div class="cp-card amber"><div class="cp-card-title">🪨 Surface</div>Mainly <b>silicon, iron, magnesium</b>; bright parts are mountains, dark patches are low plains.</div><div class="cp-card green"><div class="cp-card-title">🌊 Sea of Tranquility</div>A plain of dust particles on the <u>near side</u> of the Moon (the side we see).</div><div class="cp-card violet"><div class="cp-card-title">📚 Study of Moon</div><b>Selenology</b>; the Moon is also called the <b>fossil planet</b>.</div></div>
      <div class="cp-note trap"><b>Sidereal month</b> (27⅓ days) ≠ <b>Synodic month</b> (29.53 days). Sidereal is measured against the stars; synodic is the full phase cycle.</div>
      <div class="cp-mnemonic"><b>S</b>idereal = <b>S</b>tars (27⅓ d) · <b>S</b>ynodic = <b>S</b>un (29½ d) · Moon gravity = <b>1/6</b></div>
      <div class="cp-note exam">Selenology, sidereal vs synodic month, 59% visible, 1/6 gravity and 1.3 s are the most asked facts.</div>
      <div class="cp-chips"><span>Moon</span><span>Sidereal month</span><span>Synodic month</span><span>Selenology</span></div>
    `
  },

  /* ─────────── 87 · QUESTION ─────────── */
  87: {
    questext: "The study of the Moon is known as:",
    options: ["Selenology", "Ceramology", "Cosmology", "Astrology"],
    correct: "1",
    exptext: "✅ Selenology studies the Moon (from Selene, the Moon goddess). 📌 Selene = Moon. ❌ Cosmology studies the universe; astrology is not a science; ceramology is a made-up term.",
  },

  /* ─────────── 88 · QUESTION ─────────── */
  88: {
    questext: "The Moon completes one rotation on its axis in about 27 days 7 hours 43 minutes. This period is called the:",
    options: ["lunar year", "sidereal month", "solar day", "synodic month"],
    correct: "2",
    exptext: "✅ This is the sidereal month (about 27⅓ days). 📌 Sidereal = Stars. ❌ The synodic month is 29.53 days; a lunar year and solar day are different units.",
  },

  /* ─────────── 89 · QUESTION ─────────── */
  89: {
    questext: "The Moon’s period of revolution with reference to the Sun, about 29.53 days, is called the:",
    options: ["synodic month", "tetrad", "lunar eclipse cycle", "sidereal month"],
    correct: "1",
    exptext: "✅ The synodic month is 29 d 12 h 44 min 2.8 s. 📌 Synodic = Sun, phase to phase. ❌ Sidereal month is about 27⅓ days; the others are unrelated.",
  },

  /* ─────────── 90 · QUESTION ─────────── */
  90: {
    questext: "Approximately what percentage of the Moon’s total surface is visible from the Earth?",
    options: ["75%", "50%", "59%", "41%"],
    correct: "3",
    exptext: "✅ Because of slight wobbles, 59% can be seen over time; 41% stays hidden. 📌 59 + 41 = 100. ❌ 41% is the hidden part; 50% and 75% are not correct.",
  },

  /* ─────────── 91 · QUESTION ─────────── */
  91: {
    questext: "Which of the following statements about the Moon is NOT correct?",
    options: ["Its gravitational pull is one-sixth of the Earth’s", "The Moon has a thick atmosphere with twilight", "Light from the Moon takes about 1.3 seconds to reach the Earth", "The Moon has no sound"],
    correct: "2",
    exptext: "✅ The Moon has no atmosphere and no twilight. 📌 No air = no sound = no twilight. ❌ The other three statements are true.",
  },

  /* ─────────── 92 · QUESTION ─────────── */
  92: {
    questext: "The ‘Sea of Tranquility’ on the Moon is:",
    options: ["the highest mountain on the Moon", "a large water body on the Moon", "the rear side of the Moon", "a plain of dust particles on the near side of the Moon"],
    correct: "4",
    exptext: "✅ It is a dusty plain on the side facing us. 📌 Not a real sea. ❌ The Moon has no water seas; the highest point is Mt. Leibnitz.",
  },

  /* ─────────── 93 · CONCEPT PAGE: Super Moon ─────────── */
  93: {
    type: "concept",
    icon: "🌕",
    accent: "#d9da3e",
    pauseTimer: true,
    title: "Super Moon",
    html: `
      <p class="cp-lead">A <u>Super Moon</u> is a <b>full Moon that happens when the Moon is closest to the Earth</b> (near its perigee). It looks bigger and brighter than normal.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">📏 Bigger</div>Appears about 14% larger across than a typical full Moon.</div><div class="cp-card blue"><div class="cp-card-title">💡 Brighter</div>Shines about 30% brighter than a regular full Moon.</div></div>
      <div class="cp-note trap">A Super Moon is a <b>full</b> Moon at <b>perigee</b> — not at apogee, and not a new Moon.</div>
      <div class="cp-mnemonic"><b>S</b>uper = <b>S</b>hort distance (perigee)</div>
      <div class="cp-chips"><span>Super Moon</span><span>Perigee</span></div>
    `
  },

  /* ─────────── 94 · QUESTION ─────────── */
  94: {
    questext: "A ‘Super Moon’ occurs when a full Moon is:",
    options: ["closest to the Earth", "the second full Moon of a month", "farthest from the Earth", "in total lunar eclipse"],
    correct: "1",
    exptext: "✅ Full Moon at perigee gives a Super Moon. 📌 Super = Short distance. ❌ Farthest is apogee; a lunar eclipse gives a Blood Moon; the second full Moon is a Blue Moon.",
  },

  /* ─────────── 95 · CONCEPT PAGE: Blue Moon ─────────── */
  95: {
    type: "concept",
    icon: "🔵",
    accent: "#3eacda",
    pauseTimer: true,
    title: "Blue Moon",
    html: `
      <p class="cp-lead">A <u>Blue Moon</u> is the <b>second full Moon in a single calendar month</b>. It has nothing to do with colour — it is a calendar curiosity.</p>
      <ol class="cp-steps"><li>The Moon’s phase cycle (synodic month) is about <b>29.5 days</b>.</li><li>Most months are <b>30 or 31</b> days long, so a full Moon can fall on the 1st and again on the 30th/31st.</li><li>That <u>second</u> full Moon is the <b>Blue Moon</b>.</li></ol>
      <div class="cp-note info">If a Blue Moon appears twice in one year, it is called a <b>Blue Moon Year</b>.</div>
      <div class="cp-note trap">The Moon does <b>not</b> turn blue; the word only means “rare”.</div>
      <div class="cp-mnemonic"><b>B</b>lue = <b>B</b>onus full Moon in the same month</div>
      <div class="cp-chips"><span>Blue Moon</span><span>Calendar month</span></div>
    `
  },

  /* ─────────── 96 · QUESTION ─────────── */
  96: {
    questext: "What is a ‘Blue Moon’?",
    options: ["A total lunar eclipse", "A Moon that appears blue in colour", "The second full Moon in the same calendar month", "The first full Moon of the year"],
    correct: "3",
    exptext: "✅ Two full Moons in one month make the second one a Blue Moon. 📌 Gap 29.5 days is shorter than a 31-day month. ❌ It is not blue in colour; a lunar eclipse gives a Blood Moon.",
  },

  /* ─────────── 97 · CONCEPT PAGE: Blood Moon ─────────── */
  97: {
    type: "concept",
    icon: "🩸",
    accent: "#da3e7e",
    pauseTimer: true,
    title: "Blood Moon",
    html: `
      <p class="cp-lead">A <u>Blood Moon</u> is the name for the Moon during a <b>total lunar eclipse</b>, when it turns a deep <b>red</b>.</p>
      <div class="cp-fig"><img src="images/Geography/Universe_Solar_System_and_Space_Exploration/6.png" alt="Total lunar eclipse: Sun, Earth, Moon in a line" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <ol class="cp-steps"><li>The <b>Earth</b> comes between the <b>Sun</b> and the <b>Moon</b>.</li><li>Sunlight passes through the <u>Earth’s atmosphere</u> and the blue light is scattered away.</li><li>Only <b>red light</b> reaches the Moon, giving it a reddish colour.</li></ol>
      <div class="cp-note trap">Blood Moon = <b>total lunar eclipse</b>. It is <b>not</b> a Super Moon and not a Blue Moon, even if they sometimes coincide.</div>
      <div class="cp-mnemonic"><b>B</b>lood = <b>B</b>locked sunlight, only <b>R</b>ed gets through</div>
      <div class="cp-chips"><span>Blood Moon</span><span>Lunar eclipse</span></div>
    `
  },

  /* ─────────── 98 · QUESTION ─────────── */
  98: {
    questext: "The reddish colour of the Moon during a total lunar eclipse earns it the nickname:",
    options: ["Harvest Moon", "Blood Moon", "Super Moon", "Blue Moon"],
    correct: "2",
    exptext: "✅ Red light passing through the Earth’s atmosphere makes the Moon look red. 📌 Blood = eclipse. ❌ Blue Moon is a second full Moon in a month; Super Moon is a perigee full Moon.",
  },

  /* ─────────── 99 · CONCEPT PAGE: Lunar Tetrad ─────────── */
  99: {
    type: "concept",
    icon: "4️⃣",
    accent: "#51da3e",
    pauseTimer: true,
    title: "Lunar Tetrad",
    html: `
      <p class="cp-lead">A <u>Lunar Tetrad</u> is a <b>sequence of four total lunar eclipses</b> one after another, with <b>no partial eclipses</b> in between.</p>
      <div class="cp-note remember"><b>Tetra</b> = four. Four <u>total</u> lunar eclipses, in a row.</div>
      <div class="cp-note trap">Partial eclipses in between would break the tetrad.</div>
      <div class="cp-mnemonic"><b>Tetra</b> = <b>4</b> (like Tetra Pak’s four corners)</div>
      <div class="cp-chips"><span>Lunar Tetrad</span></div>
    `
  },

  /* ─────────── 100 · QUESTION ─────────── */
  100: {
    questext: "A sequence of four consecutive total lunar eclipses without any partial eclipse in between is called a:",
    options: ["Blue Moon", "Super Moon", "Lunar Saros", "Lunar Tetrad"],
    correct: "4",
    exptext: "✅ A tetrad = 4 total lunar eclipses in a row. 📌 Tetra = four. ❌ Blue Moon and Super Moon are other Moon events; saros is an eclipse cycle of about 18 years.",
  },

  /* ─────────── 101 · CONCEPT PAGE: Chandrayaan-1 ─────────── */
  101: {
    type: "concept",
    icon: "🚀",
    accent: "#583eda",
    pauseTimer: true,
    title: "Chandrayaan-1",
    html: `
      <p class="cp-lead"><b>Chandrayaan-1</b> was India’s <u>first mission to the Moon</u>. It carried instruments to map the Moon’s surface, minerals, ice and heat.</p>
      <div class="cp-stats"><div class="cp-stat"><b>22 Oct 2008</b><span>Launch</span></div><div class="cp-stat"><b>PSLV-C11</b><span>Vehicle</span></div><div class="cp-stat"><b>Sriharikota</b><span>Launch site</span></div><div class="cp-stat"><b>11</b><span>Instruments</span></div></div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Agency</td><td><b>ISRO</b></td></tr><tr><td>Launched from</td><td><b>Satish Dhawan Space Centre, Sriharikota</b> (Andhra Pradesh) by polar satellite launch vehicle <b>PSLV-C11</b>, 22 October 2008</td></tr><tr><td>Moon Impact Probe</td><td>Unmanned probe manufactured in India that <u>landed on the Moon’s surface</u></td></tr><tr><td>Instruments</td><td>High-resolution remote sensing, 11 modern instruments including <b>X-ray spectrometer</b>, <b>miniature synthetic aperture radar</b>, <b>Moon Mineralogy Mapper (M3)</b></td></tr><tr><td>Gave information on</td><td>Soil, minerals, ice, heat and weather of the Moon</td></tr></tbody></table>
      <div class="cp-note trap">Chandrayaan-1 used <b>PSLV-C11</b>; Chandrayaan-2 used <b>GSLV Mk-III</b>; Chandrayaan-3 used <b>LVM3</b>.</div>
      <div class="cp-mnemonic">Chandrayaan <b>1</b> → <b>P</b>SLV-C<b>11</b> — “One-one for the first”</div>
      <div class="cp-chips"><span>Chandrayaan-1</span><span>Moon Impact Probe</span></div>
    `
  },

  /* ─────────── 102 · QUESTION ─────────── */
  102: {
    questext: "India’s first Moon mission, Chandrayaan-1, was launched on:",
    options: ["22 October 2008", "14 July 2023", "5 November 2013", "22 July 2019"],
    correct: "1",
    exptext: "✅ Chandrayaan-1 lifted off on 22 October 2008. 📌 First Moon mission = 2008. ❌ 22 July 2019 is Chandrayaan-2; 14 July 2023 is Chandrayaan-3; 5 November 2013 is the Mars Orbiter Mission.",
  },

  /* ─────────── 103 · QUESTION ─────────── */
  103: {
    questext: "Chandrayaan-1 was launched from Satish Dhawan Space Centre, Sriharikota, using which launch vehicle?",
    options: ["LVM3 M4", "PSLV-C25", "PSLV-C11", "GSLV Mk-III"],
    correct: "3",
    exptext: "✅ PSLV-C11 carried Chandrayaan-1. 📌 1 mission, C-11. ❌ GSLV Mk-III is Chandrayaan-2’s; PSLV-C25 is the Mars mission’s; LVM3 M4 is Chandrayaan-3’s.",
  },

  /* ─────────── 104 · QUESTION ─────────── */
  104: {
    questext: "The unmanned probe of Chandrayaan-1 that landed on the Moon’s surface was called the:",
    options: ["Pragyan Rover", "Moon Mineralogy Mapper", "Vikram Lander", "Moon Impact Probe"],
    correct: "4",
    exptext: "✅ India’s Moon Impact Probe reached the Moon’s surface. 📌 MIP = first Indian presence on Moon. ❌ Vikram and Pragyan belong to Chandrayaan-3; M3 is an instrument that maps minerals.",
  },

  /* ─────────── 105 · CONCEPT PAGE: Chandrayaan-2 ─────────── */
  105: {
    type: "concept",
    icon: "🛰️",
    accent: "#da863e",
    pauseTimer: true,
    title: "Chandrayaan-2",
    html: `
      <p class="cp-lead"><b>Chandrayaan-2</b> aimed to <u>soft-land</u> on the Moon’s south polar region. The orbiter worked, but the Vikram lander lost contact just before touchdown.</p>
      <div class="cp-stats"><div class="cp-stat"><b>22 Jul 2019</b><span>Launch</span></div><div class="cp-stat"><b>GSLV Mk-III M1</b><span>Vehicle</span></div><div class="cp-stat"><b>2 Sep 2019</b><span>Lander separated</span></div><div class="cp-stat"><b>2.1 km</b><span>Contact lost at</span></div></div>
      <table><thead><tr><th>Date</th><th>Event</th></tr></thead><tbody><tr><td>22 July 2019</td><td>Launched by <b>GSLV Mk-III M1</b> from the Second Launch Pad, SHAR, Sriharikota; planned orbit perigee 169.7 km, apogee 45,475 km</td></tr><tr><td>14 August 2019</td><td><b>Trans Lunar Insertion</b> — the spacecraft left Earth’s orbit towards the Moon</td></tr><tr><td>20 August 2019</td><td>Successfully inserted into <b>lunar orbit</b></td></tr><tr><td>2 September 2019</td><td><b>Vikram Lander</b> separated from the orbiter in a 100-km lunar polar orbit</td></tr><tr><td>Descent</td><td>Normal up to an altitude of <b>2.1 km</b>; then <u>communication from the lander was lost</u></td></tr></tbody></table>
      <div class="cp-note info">The spot where Chandrayaan-2’s lander crash-landed in 2019 is now known as <b>Tiranga Point</b>.</div>
      <div class="cp-note trap">Chandrayaan-2 did <b>not</b> soft-land. India’s soft landing came with <b>Chandrayaan-3</b>.</div>
      <div class="cp-mnemonic">Chandrayaan <b>2</b> → <b>G</b>SLV Mk-<b>III</b> → <b>2</b>.1 km, lost the link</div>
      <div class="cp-chips"><span>Chandrayaan-2</span><span>Vikram</span><span>GSLV Mk-III</span></div>
    `
  },

  /* ─────────── 106 · QUESTION ─────────── */
  106: {
    questext: "Chandrayaan-2 was launched on 22 July 2019 by which launch vehicle?",
    options: ["PSLV-C11", "GSLV Mk-III M1", "LVM3 M4", "PSLV-C57"],
    correct: "2",
    exptext: "✅ GSLV Mk-III M1 launched Chandrayaan-2. 📌 Chandrayaan-2 = GSLV. ❌ PSLV-C11 launched Chandrayaan-1; PSLV-C57 launched Aditya-L1; LVM3 M4 launched Chandrayaan-3.",
  },

  /* ─────────── 107 · QUESTION ─────────── */
  107: {
    questext: "What happened to Chandrayaan-2’s Vikram Lander during its descent in September 2019?",
    options: ["Communication was lost at an altitude of about 2.1 km", "It separated from the orbiter and could not be traced at all", "It soft-landed successfully at the South Pole", "It was destroyed during launch"],
    correct: "1",
    exptext: "✅ The descent was normal till 2.1 km, then contact was lost. 📌 2.1 km = lost link. ❌ The soft landing was achieved later by Chandrayaan-3; the lander separated properly; the launch was successful.",
  },

  /* ─────────── 108 · QUESTION ─────────── */
  108: {
    questext: "The Vikram lander of Chandrayaan-2 separated from the orbiter in a lunar polar orbit of about 100 km on:",
    options: ["22 July 2019", "14 August 2019", "2 September 2019", "20 August 2019"],
    correct: "3",
    exptext: "✅ The separation was on 2 September 2019. 📌 14 Aug TLI → 20 Aug lunar orbit → 2 Sep separation. ❌ 14 August is Trans Lunar Insertion; 20 August is lunar-orbit insertion; 22 July is launch.",
  },

  /* ─────────── 109 · CONCEPT PAGE: Chandrayaan-3 ─────────── */
  109: {
    type: "concept",
    icon: "🇮🇳",
    accent: "#3edab3",
    pauseTimer: true,
    title: "Chandrayaan-3",
    html: `
      <p class="cp-lead"><b>Chandrayaan-3</b> is India’s <u>third Moon mission</u> and its <u>second attempt at soft-landing</u>. On <b>23 August 2023</b> it landed near the Moon’s <b>south pole</b>, making India the <b>fourth country</b> to soft-land on the Moon.</p>
      <div class="cp-stats"><div class="cp-stat"><b>14 Jul 2023</b><span>Launch</span></div><div class="cp-stat"><b>23 Aug 2023</b><span>Soft-landing</span></div><div class="cp-stat"><b>4th</b><span>Country to land</span></div><div class="cp-stat"><b>14 days</b><span>Mission life</span></div></div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Launch</td><td><b>LVM3 M4</b>, from the Second Launch Pad, Satish Dhawan Space Centre, <b>14 July 2023</b></td></tr><tr><td>Parts</td><td>Indigenous <b>Lander Module (LM)</b>, <b>Propulsion Module (PM)</b> and a <b>Rover</b></td></tr><tr><td>Objectives</td><td>Safe and <u>soft landing</u> on the Moon, rover roving on the Moon, in-situ scientific experiments</td></tr><tr><td>Mass</td><td>Total <b>3,900 kg</b> — PM 2,148 kg, LM 1,752 kg including the 26-kg rover</td></tr><tr><td>Mission life</td><td><b>One lunar day = 14 Earth days</b></td></tr><tr><td>Elliptic Parking Orbit</td><td>About 170 × 36,500 km</td></tr><tr><td>Landing site</td><td><b>Shivashakti Point</b> (south pole region)</td></tr><tr><td>Chandrayaan-2 crash site</td><td>Known as <b>Tiranga Point</b></td></tr></tbody></table>
      <div class="cp-note remember">Countries with Moon soft landings, in order: <b>USSR, USA, China, India</b>. India was the first to land near the <u>south pole</u>.</div>
      <div class="cp-note trap"><b>Shivashakti Point</b> = Chandrayaan-<b>3</b> landing site. <b>Tiranga Point</b> = Chandrayaan-<b>2</b> crash site. Do not swap them.</div>
      <div class="cp-mnemonic"><b>S</b>hivashakti = <b>S</b>uccess (3) · <b>T</b>iranga = <b>T</b>ried (2)</div>
      <div class="cp-note exam">Dates, vehicle name, landing point names and “fourth country” come up in every current-affairs section.</div>
      <div class="cp-chips"><span>Chandrayaan-3</span><span>Shivashakti Point</span><span>LVM3</span></div>
    `
  },

  /* ─────────── 110 · QUESTION ─────────── */
  110: {
    questext: "Chandrayaan-3 made a soft landing on the Moon on:",
    options: ["20 August 2019", "2 September 2023", "14 July 2023", "23 August 2023"],
    correct: "4",
    exptext: "✅ The Lander touched down on 23 August 2023. 📌 14 July launch → 23 August landing. ❌ 14 July 2023 is the launch; 2 September 2023 is Aditya-L1’s launch; 20 August 2019 is Chandrayaan-2’s orbit insertion.",
  },

  /* ─────────── 111 · QUESTION ─────────── */
  111: {
    questext: "With Chandrayaan-3, India became which country to make a soft landing on the Moon?",
    options: ["Fifth, after USSR, USA, China and Japan", "Fourth, after USSR, USA and China", "Third, after USA and USSR", "Second, after USA"],
    correct: "2",
    exptext: "✅ India followed the USSR, the USA and China. 📌 Order = USSR, USA, China, India. ❌ The other options give the wrong rank or an extra country.",
  },

  /* ─────────── 112 · QUESTION ─────────── */
  112: {
    questext: "The spot where Chandrayaan-3 landed near the Moon’s south pole is named:",
    options: ["Mt. Leibnitz", "Tiranga Point", "Sea of Tranquility", "Shivashakti Point"],
    correct: "4",
    exptext: "✅ Chandrayaan-3’s landing site is Shivashakti Point. 📌 Shivashakti = 3 = Success. ❌ Tiranga Point marks the 2019 crash site; the Sea of Tranquility is on the near side; Mt. Leibnitz is a peak.",
  },

  /* ─────────── 113 · QUESTION ─────────── */
  113: {
    questext: "The site where Chandrayaan-2’s Lander crash-landed in 2019 is known as:",
    options: ["Vikram Point", "Pragyan Point", "Tiranga Point", "Shivashakti Point"],
    correct: "3",
    exptext: "✅ The crash site of Chandrayaan-2 is Tiranga Point. 📌 Tiranga = 2. ❌ Shivashakti is the Chandrayaan-3 landing site; the other two names are not official site names.",
  },

  /* ─────────── 114 · QUESTION ─────────── */
  114: {
    questext: "The planned mission life of the Chandrayaan-3 Lander and Rover is:",
    options: ["one lunar day (about 14 Earth days)", "one Earth year", "one lunar month (about 29.5 Earth days)", "one Earth day"],
    correct: "1",
    exptext: "✅ Mission life = one lunar day = 14 Earth days. 📌 Lunar day ≈ 14 days. ❌ A lunar month is about 29.5 days; a year and a day are not correct.",
  },

  /* ─────────── 115 · CONCEPT PAGE: Mars ─────────── */
  115: {
    type: "concept",
    icon: "🔴",
    accent: "#da3ed3",
    pauseTimer: true,
    title: "Mars",
    html: `
      <p class="cp-lead"><b>Mars</b> is the <u>Red Planet</u>. Its iron-rich red soil and pink sky give it the name. It is a small, rocky, cold desert world — half the size of Earth — with seasons, polar ice caps, volcanoes and canyons.</p>
      <div class="cp-stats"><div class="cp-stat"><b>24.6 h</b><span>One day</span></div><div class="cp-stat"><b>687 d</b><span>One year</span></div><div class="cp-stat"><b>2</b><span>Moons</span></div><div class="cp-stat"><b>4th</b><span>From the Sun</span></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Type</td><td><b>Terrestrial</b> planet; thin atmosphere of <b>carbon dioxide, nitrogen and argon</b></td></tr><tr><td>Day / year</td><td>1 day = <b>24.6 hours</b>; 1 year = <b>687 Earth days</b> (nearly twice Earth’s year)</td></tr><tr><td>Moons</td><td><b>Phobos</b> and <b>Deimos</b></td></tr><tr><td>Neighbours</td><td>Mars is 4th from the Sun, so <b>Earth and Jupiter</b> are its neighbouring planets</td></tr><tr><td>Volcanoes</td><td>The surface is not active; its volcanoes are dead</td></tr></tbody></table>
      <div class="cp-divider">Mars Orbiter Mission (MOM)</div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Type</td><td>ISRO’s <b>first interplanetary mission</b></td></tr><tr><td>Launched</td><td><b>5 November 2013</b> by <b>PSLV-C25</b></td></tr><tr><td>Entered Mars orbit</td><td><b>24 September 2014</b>, in its <b>first attempt</b></td></tr><tr><td>Records</td><td>Completed 1000 Earth days = 973.24 Mars sols; completed 388 orbits</td></tr></tbody></table>
      <div class="cp-note trap">Mars’s two moons: <b>Phobos</b> and <b>Deimos</b> — not “Titan” (Saturn) or “Ganymede” (Jupiter).</div>
      <div class="cp-mnemonic"><b>M</b>ars = <b>M</b>ud-red, <b>M</b>OM = <b>M</b>ission 2013–14</div>
      <div class="cp-note exam">MOM dates and the launch vehicle PSLV-C25 are repeated current-affairs facts.</div>
      <div class="cp-chips"><span>Mars</span><span>Mars Orbiter Mission</span><span>Phobos and Deimos</span></div>
    `
  },

  /* ─────────── 116 · QUESTION ─────────── */
  116: {
    questext: "Mars is called the ‘Red Planet’ because of its:",
    options: ["thick clouds of sulphuric acid", "iron-rich red soil", "red sunlight", "oceans of red water"],
    correct: "2",
    exptext: "✅ Iron-rich red soil and pink sky give the red look. 📌 Iron rust = red. ❌ Sulphuric-acid clouds belong to Venus; Mars has no oceans; the Sun’s light is not red.",
  },

  /* ─────────── 117 · QUESTION ─────────── */
  117: {
    questext: "Which of the following pairs correctly gives the two moons of Mars?",
    options: ["Titan and Rhea", "Ganymede and Europa", "Charon and Nix", "Phobos and Deimos"],
    correct: "4",
    exptext: "✅ Phobos and Deimos orbit Mars. 📌 Mars = P + D. ❌ Titan/Rhea orbit Saturn; Ganymede/Europa orbit Jupiter; Charon/Nix are Pluto’s moons.",
  },

  /* ─────────── 118 · QUESTION ─────────── */
  118: {
    questext: "India’s Mars Orbiter Mission was launched by PSLV-C25 on:",
    options: ["2 September 2023", "5 November 2013", "24 September 2014", "22 October 2008"],
    correct: "2",
    exptext: "✅ MOM lifted off on 5 November 2013 and reached Mars orbit on 24 September 2014. 📌 Launch 2013, arrival 2014. ❌ 24 September 2014 is the arrival date; 22 October 2008 is Chandrayaan-1; 2 September 2023 is Aditya-L1.",
  },

  /* ─────────── 119 · QUESTION ─────────── */
  119: {
    questext: "One year on Mars is about:",
    options: ["687 Earth days", "1,000 Earth days", "365 Earth days", "24.6 Earth days"],
    correct: "1",
    exptext: "✅ Mars takes 687 Earth days to orbit the Sun — nearly twice Earth’s year. 📌 Mars year ≈ 2 Earth years. ❌ 365 is Earth’s year; 24.6 is the length of Mars’s day in hours.",
  },

  /* ─────────── 120 · CONCEPT PAGE: Jupiter ─────────── */
  120: {
    type: "concept",
    icon: "🟠",
    accent: "#a5da3e",
    pauseTimer: true,
    title: "Jupiter",
    html: `
      <p class="cp-lead"><b>Jupiter</b> is the <u>largest planet</u> of the Solar System — so big that all the other planets could fit inside it.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🏆 Largest</div>Largest planet; its moon <b>Ganymede</b> is the <u>largest satellite</u> in the Solar System.</div><div class="cp-card blue"><div class="cp-card-title">🥶 Cold</div>Also known as the <b>Winter Planet</b> because its average temperature is very low (about −148 °C).</div><div class="cp-card green"><div class="cp-card-title">⏱️ Fast spinner</div>Rotation <b>9.9 hours</b> — shortest day of all planets.</div><div class="cp-card violet"><div class="cp-card-title">🌙 Moons</div><b>95</b> known moons (as per the table of March 2025).</div></div>
      <div class="cp-note trap"><b>Ganymede</b> (Jupiter) is the largest moon of the Solar System; <b>Titan</b> (Saturn) is only the second largest.</div>
      <div class="cp-mnemonic"><b>J</b>upiter = <b>J</b>umbo, <b>G</b>anymede = <b>G</b>iant moon</div>
      <div class="cp-chips"><span>Jupiter</span><span>Ganymede</span></div>
    `
  },

  /* ─────────── 121 · QUESTION ─────────── */
  121: {
    questext: "The largest satellite in the Solar System, Ganymede, is a moon of which planet?",
    options: ["Uranus", "Neptune", "Jupiter", "Saturn"],
    correct: "3",
    exptext: "✅ Ganymede orbits Jupiter and is the largest moon in the solar system. 📌 G for Ganymede, G for Giant Jupiter. ❌ Saturn’s largest moon is Titan; Uranus and Neptune have smaller moons.",
  },

  /* ─────────── 122 · QUESTION ─────────── */
  122: {
    questext: "Which planet is also called the ‘Winter Planet’ because of its very low average temperature (about −148 °C)?",
    options: ["Jupiter", "Mercury", "Mars", "Venus"],
    correct: "1",
    exptext: "✅ Jupiter is the winter planet. 📌 Biggest + coldest-sounding. ❌ Mercury and Venus are very hot; Mars is cold but is not called this.",
  },

  /* ─────────── 123 · CONCEPT PAGE: Saturn ─────────── */
  123: {
    type: "concept",
    icon: "🪐",
    accent: "#3e78da",
    pauseTimer: true,
    title: "Saturn",
    html: `
      <p class="cp-lead"><b>Saturn</b> is the <u>second largest planet</u>. It is famous for its <b>bright concentric rings</b> made of ice and ice-covered dust particles that revolve around it.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">💍 Rings</div>Made of <b>ice</b> and <b>ice-covered dust</b>.</div><div class="cp-card blue"><div class="cp-card-title">🌙 Titan</div><b>Titan</b> is the largest satellite of Saturn.</div><div class="cp-card green"><div class="cp-card-title">🔢 Moons</div><b>274</b> known moons (as per the table of March 2025).</div><div class="cp-card violet"><div class="cp-card-title">⚖️ Density</div>Least dense planet (0.69 g/cm³ — lighter than water).</div></div>
      <div class="cp-note trap">Saturn is the 2nd largest by <b>size and mass</b> but the <b>least dense</b> — it would float on water!</div>
      <div class="cp-mnemonic"><b>S</b>aturn = <b>S</b>econd biggest + <b>S</b>lender density</div>
      <div class="cp-chips"><span>Saturn</span><span>Titan</span></div>
    `
  },

  /* ─────────── 124 · QUESTION ─────────── */
  124: {
    questext: "Which is the largest satellite of Saturn?",
    options: ["Phobos", "Triton", "Titan", "Ganymede"],
    correct: "3",
    exptext: "✅ Titan is Saturn’s largest moon. 📌 T for Titan, T for Two (Saturn is the 2nd planet by size). ❌ Ganymede belongs to Jupiter; Triton to Neptune; Phobos to Mars.",
  },

  /* ─────────── 125 · QUESTION ─────────── */
  125: {
    questext: "The rings of Saturn are mainly made up of:",
    options: ["methane gas", "solid rock only", "hot liquid iron", "ice and ice-covered dust particles"],
    correct: "4",
    exptext: "✅ The rings consist of ice and ice-covered dust. 📌 Rings = ice. ❌ Liquid iron, methane gas and solid rock alone do not make Saturn’s rings.",
  },

  /* ─────────── 126 · CONCEPT PAGE: Uranus ─────────── */
  126: {
    type: "concept",
    icon: "🟢",
    accent: "#da3e4a",
    pauseTimer: true,
    title: "Uranus",
    html: `
      <p class="cp-lead"><b>Uranus</b> is the <u>seventh planet</u> from the Sun. It looks <u>greenish</u> because of methane gas in its atmosphere, and it spins tilted on its side.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Discovered</td><td>In <b>1781</b> by <b>Sir William Herschel</b></td></tr><tr><td>Firsts</td><td>First planet discovered with a <u>telescope</u></td></tr><tr><td>Size</td><td>About <b>four times</b> the size of Earth; <b>third largest</b> planet</td></tr><tr><td>Colour</td><td><b>Greenish</b>, due to <b>methane</b></td></tr><tr><td>Temperature</td><td>Extremely cold, about <b>−190 °C</b></td></tr><tr><td>Rings</td><td>Surrounded by <b>13 rings</b></td></tr><tr><td>Rotation</td><td>From <b>east to west</b> (opposite to most planets, except Venus)</td></tr><tr><td>Axis</td><td>Highly inclined, so it looks as if it is lying down — ‘<b>A Planet on its Side</b>’</td></tr></tbody></table>
      <div class="cp-note trap">Only <b>Venus and Uranus</b> rotate east to west. Venus is <i>hot</i>, Uranus is <i>cold</i>.</div>
      <div class="cp-mnemonic"><b>U</b>ranus = <b>U</b>nusual spin, <b>U</b>nder-the-side axis, <b>7</b>th</div>
      <div class="cp-chips"><span>Uranus</span><span>Herschel 1781</span></div>
    `
  },

  /* ─────────── 127 · QUESTION ─────────── */
  127: {
    questext: "Uranus was discovered in 1781 by:",
    options: ["Galileo Galilei", "Sir William Herschel", "Clyde Tombaugh", "Johannes Kepler"],
    correct: "2",
    exptext: "✅ William Herschel discovered Uranus, the first planet found with a telescope. 📌 Herschel = 1781. ❌ Galileo discovered Jupiter’s moons; Kepler studied planetary motion; Tombaugh discovered Pluto.",
  },

  /* ─────────── 128 · QUESTION ─────────── */
  128: {
    questext: "Uranus appears greenish in colour because of the presence of which gas in its atmosphere?",
    options: ["Argon", "Carbon dioxide", "Ammonia", "Methane"],
    correct: "4",
    exptext: "✅ Methane absorbs red light and gives the green-blue tinge. 📌 Methane = Green. ❌ Carbon dioxide and argon are in Mars’s air; ammonia is not the cause of the colour.",
  },

  /* ─────────── 129 · QUESTION ─────────── */
  129: {
    questext: "Uranus is called ‘A Planet on its Side’ because:",
    options: ["it has the smallest mass", "its axis is so inclined that it appears to lie down", "it rotates faster than all planets", "it has no moons"],
    correct: "2",
    exptext: "✅ Its large axial inclination makes it look like it is lying down. 📌 Side-lying = 98° tilt. ❌ It is not smallest, not the fastest, and it has 28 known moons.",
  },

  /* ─────────── 130 · CONCEPT PAGE: Neptune ─────────── */
  130: {
    type: "concept",
    icon: "🔵",
    accent: "#3eda5f",
    pauseTimer: true,
    title: "Neptune",
    html: `
      <p class="cp-lead"><b>Neptune</b> is the <u>eighth and farthest</u> planet of the Solar System. It is very similar to <b>Uranus</b>, so it is considered Uranus’s <u>twin</u>.</p>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🥶 Cold</div>Surface temperature remains very low.</div><div class="cp-card violet"><div class="cp-card-title">💍 Rings</div>Surrounded by faint rings of dust and ice.</div><div class="cp-card green"><div class="cp-card-title">🔢 Moons</div><b>16</b> known moons (as per the table of March 2025).</div><div class="cp-card amber"><div class="cp-card-title">🪐 Size</div><b>4th largest</b> by size but <b>3rd largest</b> by mass.</div></div>
      <div class="cp-note trap">Uranus is bigger in <b>size</b> but Neptune is heavier in <b>mass</b>.</div>
      <div class="cp-mnemonic"><b>N</b>eptune = <b>N</b>ext to the end (8th) and <b>N</b>early Uranus’s twin</div>
      <div class="cp-chips"><span>Neptune</span><span>Uranus twin</span></div>
    `
  },

  /* ─────────── 131 · QUESTION ─────────── */
  131: {
    questext: "Which planet is considered the twin of Uranus and is the farthest planet in the Solar System?",
    options: ["Neptune", "Saturn", "Jupiter", "Pluto"],
    correct: "1",
    exptext: "✅ Neptune is the eighth planet and is very similar to Uranus. 📌 U + N = twins. ❌ Saturn and Jupiter are different gas giants; Pluto is now a dwarf planet.",
  },

  /* ─────────── 132 · CONCEPT PAGE: Planets According to Size, Mass, Density & Revolution ─────────── */
  132: {
    type: "concept",
    icon: "📏",
    accent: "#8c3eda",
    pauseTimer: true,
    title: "Planets According to Size, Mass, Density & Revolution",
    html: `
      <p class="cp-lead">The book gives six ranking tables. Learn them <u>side by side</u> — the same planets move up and down the list depending on what you measure.</p>
      <table><thead><tr><th>Rank</th><th>Size ↓</th><th>Mass ↓</th><th>Density ↓</th><th>Revolution period ↑</th></tr></thead><tbody><tr><td>1</td><td>Jupiter</td><td>Jupiter</td><td>Earth</td><td>Mercury</td></tr><tr><td>2</td><td>Saturn</td><td>Saturn</td><td>Mercury</td><td>Venus</td></tr><tr><td>3</td><td>Uranus</td><td>Neptune</td><td>Venus</td><td>Earth</td></tr><tr><td>4</td><td>Neptune</td><td>Uranus</td><td>Mars</td><td>Mars</td></tr><tr><td>5</td><td>Earth</td><td>Earth</td><td>Neptune</td><td>Jupiter</td></tr><tr><td>6</td><td>Venus</td><td>Venus</td><td>Jupiter</td><td>Saturn</td></tr><tr><td>7</td><td>Mars</td><td>Mars</td><td>Uranus</td><td>Uranus</td></tr><tr><td>8</td><td>Mercury</td><td>Mercury</td><td>Saturn</td><td>Neptune</td></tr></tbody></table>
      <div class="cp-note info"><b>Revolution velocity (fastest → slowest)</b> follows the same order as the period list: Mercury is fastest, Neptune is slowest.</div>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🪨 Terrestrial</div>Mercury, Venus, Earth, Mars</div><div class="cp-card blue"><div class="cp-card-title">🎈 Jovian</div>Jupiter, Saturn, Uranus, Neptune</div></div>
      <div class="cp-note trap"><b>Size</b> order has Uranus 3rd, Neptune 4th; <b>mass</b> order swaps them (Neptune 3rd, Uranus 4th). The <b>densest</b> planet is <b>Earth</b>; the <b>least dense</b> is <b>Saturn</b>.</div>
      <div class="cp-mnemonic">Density order: “<b>E</b>very <b>M</b>an <b>V</b>alues <b>M</b>oney, <b>N</b>obody <b>J</b>ust <b>U</b>ses <b>S</b>and”</div>
      <div class="cp-note exam">Largest-to-smallest, densest planet and revolution speed are all asked repeatedly.</div>
      <div class="cp-chips"><span>Planet order</span><span>Density</span><span>Size</span><span>Mass</span></div>
    `
  },

  /* ─────────── 133 · QUESTION ─────────── */
  133: {
    questext: "Which planet has the highest density in the Solar System?",
    options: ["Saturn", "Jupiter", "Earth", "Mercury"],
    correct: "3",
    exptext: "✅ Earth is the densest planet. 📌 Density order: E, Me, V, Ma, N, J, U, S. ❌ Mercury is second; Jupiter is 6th; Saturn is the least dense.",
  },

  /* ─────────── 134 · QUESTION ─────────── */
  134: {
    questext: "Which planet has the lowest density in the Solar System?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: "2",
    exptext: "✅ Saturn is the least dense planet. 📌 Saturn ≈ lighter than water. ❌ Jupiter, Uranus and Neptune are denser than Saturn.",
  },

  /* ─────────── 135 · QUESTION ─────────── */
  135: {
    questext: "In the decreasing order of mass, which planet comes third?",
    options: ["Neptune", "Saturn", "Earth", "Uranus"],
    correct: "1",
    exptext: "✅ Mass order: Jupiter, Saturn, Neptune, Uranus, Earth, Venus, Mars, Mercury. 📌 Neptune is heavier than Uranus. ❌ Uranus is 4th by mass; Saturn 2nd; Earth 5th.",
  },

  /* ─────────── 136 · QUESTION ─────────── */
  136: {
    questext: "Which planet has the highest revolution velocity around the Sun?",
    options: ["Neptune", "Venus", "Earth", "Mercury"],
    correct: "4",
    exptext: "✅ Mercury is nearest, so it moves fastest and has the shortest period (88 days). 📌 Near = fast. ❌ Venus is second fastest; Earth third; Neptune slowest.",
  },

  /* ─────────── 137 · CONCEPT PAGE: Pluto is not a Planet ─────────── */
  137: {
    type: "concept",
    icon: "⚪",
    accent: "#daba3e",
    pauseTimer: true,
    title: "Pluto is not a Planet",
    html: `
      <p class="cp-lead">Until <b>24 August 2006</b>, <u>Pluto</u> was the ninth and outermost planet. On that date the <b>International Astronomical Union (IAU)</b> revised the rule, and Pluto lost its planet status.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1930</b><span>Discovered by Clyde Tombaugh</span></div><div class="cp-stat"><b>24 Aug 2006</b><span>IAU decision</span></div><div class="cp-stat"><b>Prague</b><span>IAU meeting</span></div><div class="cp-stat"><b>9 → 8</b><span>Planets</span></div></div>
      <ol class="cp-steps"><li>The IAU, the world’s top body of astronomers, met at <b>Prague</b> (Czech Republic) in August 2006.</li><li>It adopted a <b>definition of a planet</b> (orbit the Sun, nearly round, cleared its neighbourhood).</li><li>Pluto did not clear its neighbourhood, so it became a <b>dwarf planet</b>.</li><li>The planet count fell from <b>nine to eight</b>: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.</li></ol>
      <div class="cp-note remember">Pluto’s largest moon is <b>Charon</b>; the other two moons mentioned are <b>Nix</b> and <b>Hydra</b>.</div>
      <div class="cp-note trap">Before 24 August 2006, Pluto was the <b>outermost</b> planet — after that, <b>Neptune</b> is.</div>
      <div class="cp-mnemonic"><b>P</b>luto = <b>P</b>rague <b>P</b>ushed it out (2006)</div>
      <div class="cp-note exam">“Who discovered Pluto?” (Clyde Tombaugh) and “where did IAU decide?” (Prague) are common.</div>
      <div class="cp-chips"><span>Pluto</span><span>IAU 2006</span><span>Dwarf planet</span></div>
    `
  },

  /* ─────────── 138 · QUESTION ─────────── */
  138: {
    questext: "The IAU meeting that declared Pluto would no longer remain a planet was held at:",
    options: ["Vienna", "Paris", "Prague", "Geneva"],
    correct: "3",
    exptext: "✅ The IAU met at Prague on 24 August 2006. 📌 Pluto ← Prague. ❌ Paris, Geneva and Vienna did not host this decision.",
  },

  /* ─────────── 139 · QUESTION ─────────── */
  139: {
    questext: "Pluto was discovered in 1930 by:",
    options: ["Clyde Tombaugh", "William Herschel", "Edwin Hubble", "Galileo Galilei"],
    correct: "1",
    exptext: "✅ Clyde Tombaugh discovered Pluto in 1930. 📌 Tombaugh = Pluto. ❌ Herschel discovered Uranus; Galileo used the first telescope; Hubble studied galaxies.",
  },

  /* ─────────── 140 · QUESTION ─────────── */
  140: {
    questext: "After the IAU’s new definition of 2006, the number of planets in the Solar System was reduced from:",
    options: ["nine to seven", "ten to nine", "nine to eight", "eight to seven"],
    correct: "3",
    exptext: "✅ Pluto was dropped, leaving eight planets. 📌 9 – Pluto = 8. ❌ The other options do not match the actual change.",
  },

  /* ─────────── 141 · CONCEPT PAGE: Pluto Gets a Numerical Denomination ─────────── */
  141: {
    type: "concept",
    icon: "🔢",
    accent: "#3eccda",
    pauseTimer: true,
    title: "Pluto Gets a Numerical Denomination",
    html: `
      <p class="cp-lead">A few weeks after being demoted, Pluto got a <u>name and a number</u> as a dwarf planet in <b>September 2006</b>.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🔢 Number</div>Asteroid number <b>134340</b>.</div><div class="cp-card blue"><div class="cp-card-title">🏢 Given by</div>The <b>Minor Planet Centre (MPC)</b> — the official body that collects data on asteroids and comets.</div></div>
      <div class="cp-note info">Pluto’s companion satellites are <b>Charon</b> (largest), <b>Nix</b> and <b>Hydra</b>.</div>
      <div class="cp-mnemonic">Pluto = <b>1 3 4 3 4 0</b> — “one-three-four, three-four-zero”</div>
      <div class="cp-chips"><span>Pluto</span><span>134340</span></div>
    `
  },

  /* ─────────── 142 · QUESTION ─────────── */
  142: {
    questext: "Pluto was assigned which asteroid number after being classified as a dwarf planet?",
    options: ["134430", "143340", "104340", "134340"],
    correct: "4",
    exptext: "✅ Pluto is 134340. 📌 1-3-4-3-4-0. ❌ The other numbers are jumbled look-alikes.",
  },

  /* ─────────── 143 · CONCEPT PAGE: Some Facts and Figures about the Planets ─────────── */
  143: {
    type: "concept",
    icon: "📊",
    accent: "#da3e9e",
    pauseTimer: true,
    title: "Some Facts and Figures about the Planets",
    html: `
      <p class="cp-lead">One master table — <u>distance, orbit, rotation, size, mass and moons</u> — for all eight planets (figures as on 18 March 2025).</p>
      <table><thead><tr><th>Planet</th><th>Distance from Sun (10⁶ km)</th><th>Orbital period</th><th>Rotation period</th><th>Diameter (km)</th><th>Mass (10²⁴ kg)</th><th>Moons</th></tr></thead><tbody><tr><td>Mercury</td><td>57.9</td><td>88 days</td><td>1407.6 h (58.6 d)</td><td>4,879</td><td>0.330</td><td>None</td></tr><tr><td>Venus</td><td>108.2</td><td>224.7 days</td><td>(−) 5832.5 h (243 d)</td><td>12,104</td><td>4.87</td><td>None</td></tr><tr><td>Earth</td><td>149.6</td><td>365.26 days</td><td>23.9 h</td><td>12,756</td><td>5.97</td><td>1</td></tr><tr><td>Mars</td><td>228.0</td><td>687 days</td><td>24.6 h</td><td>6,792</td><td>0.642</td><td>2</td></tr><tr><td>Jupiter</td><td>778.5</td><td>4331 d (11.85 yr)</td><td>9.9 h</td><td>1,42,984</td><td>1898</td><td>95</td></tr><tr><td>Saturn</td><td>1432.0</td><td>10747 d (29.42 yr)</td><td>10.7 h</td><td>1,20,536</td><td>568</td><td>274</td></tr><tr><td>Uranus</td><td>2867.0</td><td>30589 d (83.74 yr)</td><td>(−) 17.2 h</td><td>51,118</td><td>86.8</td><td>28</td></tr><tr><td>Neptune</td><td>4515.0</td><td>59800 d (163.71 yr)</td><td>16.1 h</td><td>49,528</td><td>102</td><td>16</td></tr></tbody></table>
      <div class="cp-note info">A minus sign (−) in rotation period means <b>retrograde</b> (east to west) rotation — only <b>Venus</b> and <b>Uranus</b>.</div>
      <div class="cp-note trap"><b>Venus</b> has the <u>longest</u> day (243 Earth days — longer than its own year of 224.7 days). <b>Jupiter</b> has the <u>shortest</u> day (9.9 h). Mercury’s day is 58.6 Earth days.</div>
      <div class="cp-mnemonic">Moons: <b>0, 0, 1, 2, 95, 274, 28, 16</b> — “Merc, Venus: none · Earth 1 · Mars 2”</div>
      <div class="cp-note exam">Moon counts keep rising as more moons are discovered — always check the latest table before the exam.</div>
      <div class="cp-chips"><span>Planet data</span><span>Distance</span><span>Moons</span></div>
    `
  },

  /* ─────────── 144 · QUESTION ─────────── */
  144: {
    questext: "Which planet has the longest rotation period (longest day)?",
    options: ["Mercury", "Venus", "Jupiter", "Neptune"],
    correct: "2",
    exptext: "✅ Venus rotates once in about 243 Earth days, and backwards. 📌 Venus = slowest spinner. ❌ Mercury’s day is 58.6 Earth days; Jupiter has the shortest day; Neptune’s is 16.1 hours.",
  },

  /* ─────────── 145 · QUESTION ─────────── */
  145: {
    questext: "Which planet has the shortest rotation period (about 9.9 hours)?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "3",
    exptext: "✅ Jupiter is the fastest spinner at 9.9 hours. 📌 Biggest planet, fastest spin. ❌ Saturn takes 10.7 h; Earth 23.9 h; Mars 24.6 h.",
  },

  /* ─────────── 146 · QUESTION ─────────── */
  146: {
    questext: "Which two planets in the Solar System have no natural satellites?",
    options: ["Mars and Mercury", "Mercury and Venus", "Venus and Earth", "Mercury and Neptune"],
    correct: "2",
    exptext: "✅ Only Mercury and Venus have no moons. 📌 First two = zero moons. ❌ Earth has 1 moon, Mars has 2, Neptune has 16.",
  },

  /* ─────────── 147 · QUESTION ─────────── */
  147: {
    questext: "Which planet takes about 163.71 years to complete one revolution around the Sun?",
    options: ["Uranus", "Saturn", "Jupiter", "Neptune"],
    correct: "4",
    exptext: "✅ Neptune takes 59,800 days ≈ 163.71 years. 📌 Farthest = slowest. ❌ Uranus takes 83.74 years; Saturn 29.42 years; Jupiter 11.85 years.",
  },

  /* ─────────── 148 · CONCEPT PAGE: Asteroids (or Planetoids) ─────────── */
  148: {
    type: "concept",
    icon: "🪨",
    accent: "#71da3e",
    pauseTimer: true,
    title: "Asteroids (or Planetoids)",
    html: `
      <p class="cp-lead"><u>Asteroids</u> (also called <b>minor planets</b> or <b>planetoids</b>) are rocky objects that revolve around the Sun. Most lie in a belt between <b>Mars and Jupiter</b> — the <b>asteroid belt</b>.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">📍 Where?</div>Mostly between the orbits of <b>Mars and Jupiter</b>: a belt of debris that failed to join into a planet.</div><div class="cp-card blue"><div class="cp-card-title">🔄 Spin</div>All asteroids rotate on their axis every <b>5 to 20 hours</b>; some may have satellites.</div><div class="cp-card green"><div class="cp-card-title">🐎 Trojan asteroids</div>Found in the orbit of <b>Jupiter</b> in two clouds — one moving <u>ahead</u> and the other <u>behind</u> it.</div><div class="cp-card violet"><div class="cp-card-title">🧩 Origin</div>Scientists believe a planet could have formed here but Jupiter’s strong gravity prevented it.</div></div>
      <div class="cp-note info">They may be spherical, elongated or irregular in shape. Today over a million asteroids are catalogued.</div>
      <div class="cp-note trap">Asteroid belt = <b>between Mars and Jupiter</b>. Do not place it between Earth and Mars or beyond Neptune.</div>
      <div class="cp-mnemonic"><b>A</b>steroids → <b>A</b>fter <b>M</b>ars, <b>B</b>efore <b>J</b>upiter: “<b>M</b>ars–<b>B</b>elt–<b>J</b>upiter”</div>
      <div class="cp-chips"><span>Asteroids</span><span>Asteroid belt</span><span>Trojan</span></div>
    `
  },

  /* ─────────── 149 · QUESTION ─────────── */
  149: {
    questext: "The asteroid belt is found between the orbits of:",
    options: ["Mars and Jupiter", "Jupiter and Saturn", "Earth and Mars", "Neptune and Pluto"],
    correct: "1",
    exptext: "✅ The belt of debris lies between Mars and Jupiter. 📌 Mars–Belt–Jupiter. ❌ The other pairs do not enclose the main asteroid belt.",
  },

  /* ─────────── 150 · QUESTION ─────────── */
  150: {
    questext: "Trojan asteroids are found:",
    options: ["between Earth and the Moon", "in the orbit of Jupiter, in two clouds — one ahead and one behind it", "in the Sun’s corona", "beyond the orbit of Neptune only"],
    correct: "2",
    exptext: "✅ Trojans share Jupiter’s orbit in two clouds. 📌 Trojan = Jupiter’s travelling companions. ❌ The other locations are wrong.",
  },

  /* ─────────── 151 · QUESTION ─────────── */
  151: {
    questext: "Scientists believe asteroids occupy a place where a planet could have formed but was prevented by the gravitational force of:",
    options: ["Jupiter", "the Sun", "Mars", "Saturn"],
    correct: "1",
    exptext: "✅ The disruptive gravity of Jupiter stopped the planet from forming. 📌 Jupiter = heavyweight neighbour. ❌ Saturn is far away; Mars is too small; the Sun holds, not disrupts.",
  },

  /* ─────────── 152 · CONCEPT PAGE: Meteors and Meteorites ─────────── */
  152: {
    type: "concept",
    icon: "🌠",
    accent: "#3e43da",
    pauseTimer: true,
    title: "Meteors and Meteorites",
    html: `
      <p class="cp-lead"><u>Meteors</u> and <u>meteorites</u> are also called <b>shooting stars</b>. They are fragments of rock falling towards the Earth.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td><b>Meteor</b></td><td>Usually small; <u>burns up</u> in the air due to heat from air resistance before reaching the surface</td></tr><tr><td><b>Meteorite</b></td><td>A large meteor that does <u>not burn up completely</u> and lands on the Earth’s surface</td></tr></tbody></table>
      <div class="cp-note remember">Meteors are believed to originate in the <b>asteroid belt</b>, where a collision may send fragments towards the Earth; Earth’s gravity pulls them in.</div>
      <div class="cp-note trap"><b>Meteor</b> = in the sky (burns). <b>Meteorite</b> = on the ground (survives).</div>
      <div class="cp-mnemonic">Meteor-<b>ite</b> = “<b>I</b>t <b>T</b>ouched <b>E</b>arth”</div>
      <div class="cp-chips"><span>Meteor</span><span>Meteorite</span><span>Shooting star</span></div>
    `
  },

  /* ─────────── 153 · QUESTION ─────────── */
  153: {
    questext: "A meteor that is large enough not to burn up completely and lands on the Earth’s surface is called a:",
    options: ["asteroid", "planetoid", "meteorite", "comet"],
    correct: "3",
    exptext: "✅ A meteorite reaches the ground. 📌 Meteor-ite = it hit. ❌ A comet is an icy body; asteroids and planetoids are rock bodies in space.",
  },

  /* ─────────── 154 · QUESTION ─────────── */
  154: {
    questext: "Meteors usually burn up before reaching the Earth’s surface because of:",
    options: ["ozone layer", "the Sun’s magnetic field", "the Moon’s gravity", "heat produced by air resistance"],
    correct: "4",
    exptext: "✅ Friction with the atmosphere heats and burns them. 📌 Air friction. ❌ The Sun’s magnetism, the Moon’s gravity and the ozone layer do not burn them.",
  },

  /* ─────────── 155 · CONCEPT PAGE: Comets ─────────── */
  155: {
    type: "concept",
    icon: "💫",
    accent: "#da663e",
    pauseTimer: true,
    title: "Comets",
    html: `
      <p class="cp-lead"><u>Comets</u> are visitors of the Solar System and among its most spectacular and unpredictable bodies. The name comes from the Latin words <i>stella cometa</i>, meaning “<b>hairy star</b>”.</p>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🧊 Made of</div><b>Frozen gases</b> held together with rocky and metallic materials.</div><div class="cp-card amber"><div class="cp-card-title">🔁 Orbit</div>Move around the Sun in <b>elongated ellipses</b>; one revolution may take hundreds or even thousands of years.</div><div class="cp-card green"><div class="cp-card-title">👀 When visible</div>Visible only when close to the Sun — the ice melts and gas and dust are swept back to form a tail.</div><div class="cp-card red"><div class="cp-card-title">➡️ Tail direction</div>The tail always points <b>away from the Sun</b>; when a comet is moving away, it is led by its tail.</div></div>
      <div class="cp-note trap">The tail does <b>not</b> trail behind the comet’s path — it points <u>away from the Sun</u>, whichever way the comet moves.</div>
      <div class="cp-mnemonic"><b>C</b>omet = <b>C</b>ool ice, <b>C</b>oma, <b>C</b>aptured tail pointing away from Sun</div>
      <div class="cp-chips"><span>Comets</span><span>Hairy star</span></div>
    `
  },

  /* ─────────── 156 · QUESTION ─────────── */
  156: {
    questext: "The tail of a comet always points:",
    options: ["in the direction of motion", "towards the Earth", "away from the Sun", "towards the Sun"],
    correct: "3",
    exptext: "✅ The Sun’s radiation sweeps the gas and dust away from it. 📌 Tail = away from Sun. ❌ It does not point to the Sun, nor always along the path, nor to the Earth.",
  },

  /* ─────────── 157 · QUESTION ─────────── */
  157: {
    questext: "The word ‘comet’ is derived from Latin words meaning:",
    options: ["hairy star", "shooting star", "ice ball", "wandering planet"],
    correct: "1",
    exptext: "✅ Stella cometa = hairy star. 📌 Comet = hair. ❌ ‘Shooting star’ refers to meteors; the other two are not the origin.",
  },

  /* ─────────── 158 · CONCEPT PAGE: Features of a Comet ─────────── */
  158: {
    type: "concept",
    icon: "✨",
    accent: "#3eda93",
    pauseTimer: true,
    title: "Features of a Comet",
    html: `
      <p class="cp-lead">A comet looks like a bright head with a <u>long luminous tail</u> — but the tail appears only when the comet is <b>near the Sun</b>.</p>
      <div class="cp-fig"><img src="images/Geography/Universe_Solar_System_and_Space_Exploration/7.png" alt="Comet with nucleus, coma, gas tail and dust tail" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Part</th><th>What it is</th></tr></thead><tbody><tr><td><b>Coma</b></td><td>The head of gas formed when the ice melts as the comet approaches the Sun</td></tr><tr><td><b>Gas tail</b></td><td>The Sun’s radiation sweeps the gas of the coma into a tail</td></tr><tr><td><b>Dust tail</b></td><td>Dust particles are also swept back to form a dust tail</td></tr></tbody></table>
      <div class="cp-note trap">Far from the Sun a comet has <b>no tail</b> — it is just a cold icy body.</div>
      <div class="cp-mnemonic"><b>C</b>oma = <b>C</b>loud around the <b>C</b>omet’s head</div>
      <div class="cp-chips"><span>Coma</span><span>Gas tail</span><span>Dust tail</span></div>
    `
  },

  /* ─────────── 159 · QUESTION ─────────── */
  159: {
    questext: "The cloud of gas that forms around a comet’s head when it nears the Sun is called the:",
    options: ["Photosphere", "Coma", "Corona", "Nebula"],
    correct: "2",
    exptext: "✅ Coma is the head of gas of a comet. 📌 Coma = comet’s hair. ❌ Corona is the Sun’s outer layer; photosphere is its surface; a nebula is an interstellar cloud.",
  },

  /* ─────────── 160 · CONCEPT PAGE: Stars ─────────── */
  160: {
    type: "concept",
    icon: "🌟",
    accent: "#c13eda",
    pauseTimer: true,
    title: "Stars",
    html: `
      <p class="cp-lead"><u>Stars</u> are heavenly bodies of hot burning gases that shine by <b>their own light</b>. They look fixed in the sky because they are so far away that their rapid motion shows up only over centuries.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">✨ Own light</div>Stars shine on their own; planets only reflect light.</div><div class="cp-card blue"><div class="cp-card-title">📍 Nearest star</div>After the Sun, <b>Proxima Centauri</b> (about <b>4.24 light-years</b> away).</div><div class="cp-card green"><div class="cp-card-title">🧭 Examples</div>Pole star (Polaris), Sirius, Vega, Capella, Alpha Centauri, Beta Centauri, Proxima Centauri, Spica, Regulus, Pleiades, Aldebaran, Arcturus, Betelgeuse and the Sun.</div><div class="cp-card red"><div class="cp-card-title">🌀 Seem fixed</div>They are in rapid motion, but distance hides it.</div></div>
      <div class="cp-note trap">Planets like Jupiter and Venus shine brightly but are <b>not</b> stars — they only reflect sunlight.</div>
      <div class="cp-mnemonic">Stars <b>twinkle</b> because they are <b>far</b>; planets <b>don’t</b> because they are <b>near</b></div>
      <div class="cp-chips"><span>Stars</span><span>Proxima Centauri</span><span>Polaris</span></div>
    `
  },

  /* ─────────── 161 · QUESTION ─────────── */
  161: {
    questext: "Which of the following is NOT a star?",
    options: ["Vega", "Sirius", "Polaris", "Jupiter"],
    correct: "4",
    exptext: "✅ Jupiter is a planet. 📌 Stars glow on their own. ❌ Sirius, Vega and Polaris (Pole star) are stars.",
  },

  /* ─────────── 162 · QUESTION ─────────── */
  162: {
    questext: "According to NASA, which star is the closest to the Earth after the Sun?",
    options: ["Polaris", "Proxima Centauri", "Vega", "Sirius"],
    correct: "2",
    exptext: "✅ Proxima Centauri is about 4.24 light-years away. 📌 Proxima = nearest. ❌ Sirius, Vega and Polaris are farther.",
  },

  /* ─────────── 163 · CONCEPT PAGE: Facts about Stars ─────────── */
  163: {
    type: "concept",
    icon: "🔢",
    accent: "#c5da3e",
    pauseTimer: true,
    title: "Facts about Stars",
    html: `
      <p class="cp-lead">How many stars can you actually see? Quite a few less than you think — and the number is a favourite exam fact.</p>
      <div class="cp-stats"><div class="cp-stat"><b>2,000</b><span>Visible on a clear moonless night</span></div><div class="cp-stat"><b>8,000</b><span>Visible from Earth in all</span></div><div class="cp-stat"><b>4,000</b><span>Each hemisphere</span></div><div class="cp-stat"><b>10²²</b><span>In the universe</span></div></div>
      <ol class="cp-steps"><li><b>Billions</b> of stars are in the sky, but only about <b>2,000</b> can be seen at a time with the naked eye on a clear moonless night.</li><li>About <b>8,000</b> stars are visible from the Earth: <b>4,000</b> in the Northern Hemisphere and <b>4,000</b> in the Southern Hemisphere.</li><li>In either hemisphere only <b>2,000</b> are visible at any time — the other 2,000 are in the day-time sky, hidden by the Sun’s brightness.</li><li>The universe has about <b>10²²</b> stars.</li></ol>
      <div class="cp-note trap"><b>8,000</b> (all visible stars from Earth) vs <b>2,000</b> (visible at a time in one hemisphere).</div>
      <div class="cp-mnemonic">8 → 4 + 4 → 2 + 2 (half hidden by day)</div>
      <div class="cp-chips"><span>Stars</span><span>2000 stars</span><span>8000 stars</span></div>
    `
  },

  /* ─────────── 164 · QUESTION ─────────── */
  164: {
    questext: "How many stars can be seen at any given time from either hemisphere with the naked eye?",
    options: ["About 8,000", "About 4,000", "About 2,000", "About 10,000"],
    correct: "3",
    exptext: "✅ Only about 2,000 are visible at any one time in a hemisphere. 📌 8000 → 4000 → 2000. ❌ 4,000 is the hemisphere’s total; 8,000 is the whole Earth’s total; 10,000 is not the figure.",
  },

  /* ─────────── 165 · QUESTION ─────────── */
  165: {
    questext: "About how many stars are visible from the Earth with the naked eye in all?",
    options: ["4,000", "2,000", "10,000", "8,000"],
    correct: "4",
    exptext: "✅ The total is about 8,000. 📌 4,000 North + 4,000 South. ❌ 2,000 is visible at one time; 4,000 is per hemisphere; 10,000 is not given.",
  },

  /* ─────────── 166 · CONCEPT PAGE: Constellations ─────────── */
  166: {
    type: "concept",
    icon: "🔭",
    accent: "#3e98da",
    pauseTimer: true,
    title: "Constellations",
    html: `
      <p class="cp-lead">To help astronomers find stars in the sky, the sky has been divided into <u>units</u> called <b>constellations</b> — like map areas for the heavens.</p>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🔢 Number</div>At present <b>88</b> constellations are recognised.</div><div class="cp-card amber"><div class="cp-card-title">🏺 Names</div>Named in honour of <b>mythological characters</b>.</div></div>
      <div class="cp-note info">Twelve of them form the <b>zodiac</b> — the path the Sun appears to follow through the year.</div>
      <div class="cp-note trap">There are <b>88</b> constellations but only <b>12</b> zodiac constellations.</div>
      <div class="cp-mnemonic">88 = “eight-eight, like a sky with two rings” — 12 of them are zodiac</div>
      <div class="cp-chips"><span>Constellations</span><span>88</span></div>
    `
  },

  /* ─────────── 167 · QUESTION ─────────── */
  167: {
    questext: "How many constellations are recognised at present?",
    options: ["88", "12", "108", "48"],
    correct: "1",
    exptext: "✅ There are 88 recognised constellations. 📌 88 in the sky, 12 in the zodiac. ❌ 12 is only the zodiac set; 48 is an ancient Greek count; 108 is not the figure.",
  },

  /* ─────────── 168 · CONCEPT PAGE: Some well known Constellations ─────────── */
  168: {
    type: "concept",
    icon: "🐻",
    accent: "#da3e6a",
    pauseTimer: true,
    title: "Some well known Constellations",
    html: `
      <p class="cp-lead">Many constellations also have <u>Indian names</u>. The ones marked <b>*</b> are the <b>12 Zodiac signs</b>.</p>
      <table><thead><tr><th>Constellation</th><th>Indian name</th><th>Constellation</th><th>Indian name</th></tr></thead><tbody><tr><td>Ursa Major (Great Bear)</td><td>Saptarishi</td><td>Cancer*</td><td>Kark</td></tr><tr><td>Ursa Minor (Little Bear)</td><td>Dhruva Matsya</td><td>Leo*</td><td>Simha</td></tr><tr><td>Orion (Hunter)</td><td>Mriga</td><td>Virgo*</td><td>Kanya</td></tr><tr><td>Draco (Dragon)</td><td>Kaleya</td><td>Libra*</td><td>Tula</td></tr><tr><td>Scorpio*</td><td>Vrishchika</td><td>Sagittarius*</td><td>Dhanu</td></tr><tr><td>Aries*</td><td>Mesh</td><td>Capricorn*</td><td>Makar</td></tr><tr><td>Taurus*</td><td>Vrish</td><td>Aquarius*</td><td>Kumbh</td></tr><tr><td>Gemini*</td><td>Mithun</td><td>Pisces*</td><td>Meen</td></tr></tbody></table>
      <div class="cp-note trap"><b>Orion</b>, <b>Ursa Major</b>, <b>Ursa Minor</b> and <b>Draco</b> are famous constellations but are <b>not</b> zodiac signs.</div>
      <div class="cp-mnemonic">Zodiac (Indian): <b>M</b>esh, <b>V</b>rish, <b>M</b>ithun, <b>K</b>ark, <b>S</b>imha, <b>K</b>anya, <b>T</b>ula, <b>V</b>rishchika, <b>D</b>hanu, <b>M</b>akar, <b>K</b>umbh, <b>M</b>een</div>
      <div class="cp-note exam">Match-the-column: Saptarishi = Ursa Major, Dhruva Matsya = Ursa Minor, Mriga = Orion.</div>
      <div class="cp-chips"><span>Constellations</span><span>Zodiac</span><span>Indian names</span></div>
    `
  },

  /* ─────────── 169 · QUESTION ─────────── */
  169: {
    questext: "The constellation Ursa Major (Great Bear) is known in India as:",
    options: ["Dhruva Matsya", "Saptarishi", "Kaleya", "Mriga"],
    correct: "2",
    exptext: "✅ Ursa Major = Saptarishi. 📌 Seven sages. ❌ Dhruva Matsya = Ursa Minor; Mriga = Orion; Kaleya = Draco.",
  },

  /* ─────────── 170 · QUESTION ─────────── */
  170: {
    questext: "The constellation Orion (Hunter) is known in India as:",
    options: ["Mriga", "Dhruva Matsya", "Saptarishi", "Vrishchika"],
    correct: "1",
    exptext: "✅ Orion = Mriga. 📌 Mriga = deer/hunt. ❌ Saptarishi = Ursa Major; Dhruva Matsya = Ursa Minor; Vrishchika = Scorpio.",
  },

  /* ─────────── 171 · QUESTION ─────────── */
  171: {
    questext: "Which of the following is NOT a Zodiac sign (constellation)?",
    options: ["Libra", "Aries", "Pisces", "Orion"],
    correct: "4",
    exptext: "✅ Orion is not one of the 12 zodiac constellations. 📌 Zodiac = Aries to Pisces. ❌ Libra, Aries and Pisces are zodiac signs.",
  },

  /* ─────────── 172 · QUESTION ─────────── */
  172: {
    questext: "Which of the following pairs of constellation and its Indian name is correctly matched?",
    options: ["Capricorn – Kumbh", "Taurus – Mithun", "Scorpio – Vrishchika", "Gemini – Vrish"],
    correct: "3",
    exptext: "✅ Scorpio = Vrishchika. 📌 Scorpio = scorpion = Vrishchik. ❌ Taurus = Vrish; Gemini = Mithun; Capricorn = Makar (Kumbh = Aquarius).",
  },

  /* ─────────── 173 · CONCEPT PAGE: Quasars ─────────── */
  173: {
    type: "concept",
    icon: "🕳️",
    accent: "#3eda3f",
    pauseTimer: true,
    title: "Quasars",
    html: `
      <p class="cp-lead">A <u>quasar</u> is an extremely active and luminous type of <b>active galactic nucleus (AGN)</b> — the glowing heart of a galaxy powered by a giant black hole.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">⚡ Energy</div>A quasar gives off more energy than <b>100 normal galaxies</b> combined.</div><div class="cp-card blue"><div class="cp-card-title">🔭 Brightest</div>A recently identified brightest quasar, <b>J0529-4351</b>, was found with the <b>European Southern Observatory’s Very Large Telescope (VLT)</b>.</div><div class="cp-card green"><div class="cp-card-title">🕰️ Distance</div>Its light took over <b>12 billion years</b> to reach Earth.</div><div class="cp-card red"><div class="cp-card-title">🕳️ Black hole</div>Its black hole grows by the mass of <b>one Sun per day</b> — the fastest-growing known.</div></div>
      <div class="cp-note trap">A quasar is <b>not</b> a star — it is the super-bright core of a distant galaxy.</div>
      <div class="cp-mnemonic"><b>Q</b>uasar = <b>Q</b>uasi-stellar: <b>Q</b>uite a star-like <b>Q</b>ueen of brightness</div>
      <div class="cp-chips"><span>Quasar</span><span>AGN</span><span>Black hole</span></div>
    `
  },

  /* ─────────── 174 · QUESTION ─────────── */
  174: {
    questext: "A quasar is a very luminous type of:",
    options: ["active galactic nucleus", "planetary nebula", "supernova", "comet"],
    correct: "1",
    exptext: "✅ A quasar is an extremely luminous active galactic nucleus. 📌 Quasar = bright galactic core. ❌ A supernova is an exploding star; a planetary nebula is a gas shell; a comet is an icy body.",
  },

  /* ─────────── 175 · QUESTION ─────────── */
  175: {
    questext: "A quasar gives off more energy than how many normal galaxies combined?",
    options: ["1 million", "100", "1,000", "10"],
    correct: "2",
    exptext: "✅ A quasar outshines about 100 normal galaxies together. 📌 Q = 100. ❌ 10, 1,000 and 1 million are not the quoted figure.",
  },

  /* ─────────── 176 · CONCEPT PAGE: Earth’s Galaxy: The Milky Way ─────────── */
  176: {
    type: "concept",
    icon: "💫",
    accent: "#6c3eda",
    pauseTimer: true,
    title: "Earth’s Galaxy: The Milky Way",
    html: `
      <p class="cp-lead">We live on the <u>outer edge</u> of a large <b>spiral galaxy</b> called the <b>Milky Way</b>. On a dark night it looks like a soft, glowing band of light.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1,00,000 ly</b><span>Diameter</span></div><div class="cp-stat"><b>10,000 ly</b><span>Thick at the centre</span></div><div class="cp-stat"><b>250 M yrs</b><span>One revolution</span></div><div class="cp-stat"><b>Spiral</b><span>Shape</span></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Shape</td><td>Large spiral-shaped galaxy, rotating slowly</td></tr><tr><td>Size</td><td>About <b>1,00,000 light-years</b> across and about <b>10,000 light-years</b> thick at the centre</td></tr><tr><td>Why “Milky”?</td><td>It appears as a soft glowing light of billions of stars; the stars are so far away that they can be seen only in clusters</td></tr><tr><td>Galileo’s finding</td><td>The band of light is produced by countless individual stars invisible to the naked eye</td></tr><tr><td>Time to rotate</td><td>About <b>250 million years</b> to complete one revolution</td></tr></tbody></table>
      <div class="cp-note trap"><b>1,00,000 light-years</b> is the <i>diameter</i>; <b>10,000 light-years</b> is the <i>thickness</i> at the centre.</div>
      <div class="cp-mnemonic"><b>1 lakh</b> wide, <b>10 thousand</b> thick, <b>250 million</b> years to spin once</div>
      <div class="cp-chips"><span>Milky Way</span><span>Spiral galaxy</span></div>
    `
  },

  /* ─────────── 177 · QUESTION ─────────── */
  177: {
    questext: "The diameter of the Milky Way galaxy is about:",
    options: ["10,000 light-years", "1,000 light-years", "1,00,000 light-years", "1,00,00,000 light-years"],
    correct: "3",
    exptext: "✅ The Milky Way is about 1 lakh light-years across. 📌 1 lakh = diameter; 10,000 = centre thickness. ❌ 10,000 light-years is thickness; the others are not correct.",
  },

  /* ─────────── 178 · QUESTION ─────────── */
  178: {
    questext: "The Milky Way galaxy takes about how long to complete one revolution?",
    options: ["2.5 billion years", "25 million years", "250 thousand years", "250 million years"],
    correct: "4",
    exptext: "✅ A full turn takes about 250 million years. 📌 2-5-0 million. ❌ The other options are off by factors of 10.",
  },

  /* ─────────── 179 · QUESTION ─────────── */
  179: {
    questext: "Who discovered that the glowing band of the Milky Way is produced by countless individual stars?",
    options: ["Kepler", "Newton", "Galileo", "Ptolemy"],
    correct: "3",
    exptext: "✅ Galileo’s telescope resolved the band into stars. 📌 Galileo = telescope. ❌ Newton gave gravity; Kepler gave planetary laws; Ptolemy gave a geocentric model.",
  },

  /* ─────────── 180 · CONCEPT PAGE: Andromeda: Earth’s closest Galactic neighbour ─────────── */
  180: {
    type: "concept",
    icon: "🔭",
    accent: "#da9a3e",
    pauseTimer: true,
    title: "Andromeda: Earth’s closest Galactic neighbour",
    html: `
      <p class="cp-lead"><b>Andromeda</b> is a <u>spiral galaxy</u> and the nearest large neighbour of the Milky Way. It looks like a <b>fuzzy patch of light</b> in the sky and contains millions of stars.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">👁️ Naked eye</div>The <b>farthest object</b> that can be seen with the naked eye.</div><div class="cp-card blue"><div class="cp-card-title">👪 Local Group</div>Along with the Milky Way, it belongs to a group of galaxies called the <b>Local Group</b>.</div><div class="cp-card green"><div class="cp-card-title">🌌 Bigger family</div>The Local Group is part of the <b>Virgo Cluster</b> (Supercluster) of groups.</div><div class="cp-card violet"><div class="cp-card-title">🧮 Clusters</div>Galaxies are grouped into <b>clusters</b>; clusters group into <b>superclusters</b>, spread through the universe.</div></div>
      <div class="cp-note info">The Local Group has about 30 galaxies, including the Milky Way and Andromeda (textbook figure).</div>
      <div class="cp-note trap">Andromeda is a <b>galaxy</b>, not a star, and not a constellation (though a constellation shares its name).</div>
      <div class="cp-mnemonic"><b>A</b>ndromeda = <b>A</b>nother <b>A</b>stonishing galaxy next door</div>
      <div class="cp-chips"><span>Andromeda</span><span>Local Group</span></div>
    `
  },

  /* ─────────── 181 · QUESTION ─────────── */
  181: {
    questext: "The farthest object that can be seen with the naked eye is:",
    options: ["Andromeda galaxy", "Proxima Centauri", "Pole Star", "Sirius"],
    correct: "1",
    exptext: "✅ The Andromeda galaxy is visible to the naked eye as a fuzzy patch. 📌 Andromeda = farthest. ❌ Proxima Centauri is close; Sirius and the Pole Star are stars in our own galaxy.",
  },

  /* ─────────── 182 · QUESTION ─────────── */
  182: {
    questext: "The Milky Way and Andromeda galaxies both belong to a group of galaxies called the:",
    options: ["Virgo Group", "Magellanic Cloud", "Great Wall", "Local Group"],
    correct: "4",
    exptext: "✅ The Milky Way and Andromeda are the main members of the Local Group. 📌 Local = our neighbourhood. ❌ Virgo is a bigger cluster; Great Wall is a huge structure; Magellanic clouds are small neighbours.",
  },

  /* ─────────── 183 · CONCEPT PAGE: Nebulae ─────────── */
  183: {
    type: "concept",
    icon: "🌫️",
    accent: "#3edac7",
    pauseTimer: true,
    title: "Nebulae",
    html: `
      <p class="cp-lead"><u>Nebulae</u> are huge interstellar clouds of gas and dust that look like faint, misty patches of light all over the sky. Stars are born in them.</p>
      <table><thead><tr><th>Condition</th><th>What happens</th></tr></thead><tbody><tr><td>Stars inside are <b>extremely hot</b></td><td>Hydrogen in the nebula is ionised and <u>emits its own light</u> → <b>emission nebula</b></td></tr><tr><td>Star is <b>less hot</b></td><td>The nebula <u>shines by reflection</u> → <b>reflection nebula</b></td></tr><tr><td><b>No suitable star</b></td><td>The nebula stays <u>dark</u>; it is detected only because it blots out the light of stars behind it → <b>dark nebula</b></td></tr></tbody></table>
      <div class="cp-note remember"><b>Five types</b> of nebulous objects: <b>1.</b> Planetary nebulae, <b>2.</b> Emission nebulae, <b>3.</b> Reflection nebulae, <b>4.</b> Dark nebulae, <b>5.</b> Supernova remnants.</div>
      <div class="cp-note trap">A nebula’s brightness depends on the <b>stars</b> in or near it — it has no light of its own unless stars heat it.</div>
      <div class="cp-mnemonic"><b>P</b>lease <b>E</b>at <b>R</b>ed <b>D</b>ates <b>S</b>lowly — Planetary, Emission, Reflection, Dark, Supernova remnants</div>
      <div class="cp-note exam">“Number of types of nebulae” and “which nebula blots out starlight” are the common direct questions.</div>
      <div class="cp-chips"><span>Nebulae</span><span>Emission</span><span>Reflection</span><span>Dark</span></div>
    `
  },

  /* ─────────── 184 · QUESTION ─────────── */
  184: {
    questext: "How many types of nebulous objects are mentioned in the sky?",
    options: ["Four", "Five", "Six", "Three"],
    correct: "2",
    exptext: "✅ Five: planetary, emission, reflection, dark nebulae and supernova remnants. 📌 P-E-R-D-S = 5. ❌ Three, four and six miss or add types.",
  },

  /* ─────────── 185 · QUESTION ─────────── */
  185: {
    questext: "A nebula that does not shine and is detectable only because it blots out the light of stars beyond it is called a:",
    options: ["reflection nebula", "planetary nebula", "emission nebula", "dark nebula"],
    correct: "4",
    exptext: "✅ A dark nebula has no suitable stars nearby, so it stays dark. 📌 Dark = blocker. ❌ Emission nebulae glow by ionised hydrogen; reflection nebulae shine by reflecting starlight.",
  },

  /* ─────────── 186 · QUESTION ─────────── */
  186: {
    questext: "In an emission nebula, the nebula’s hydrogen gives off light of its own because the nearby stars are:",
    options: ["absent", "very cold", "extremely hot", "extremely small"],
    correct: "3",
    exptext: "✅ Very hot stars ionise the hydrogen so it emits light. 📌 Hot star = emission. ❌ Cold stars give reflection or dark nebulae; no stars gives a dark nebula.",
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     images/Geography/Universe_Solar_System_and_Space_Exploration/thumbnail.png → ENTRY 1 (class overview, "thumb" field)  — not numbered
     images/Geography/Universe_Solar_System_and_Space_Exploration/1.png → ENTRY 34 (The Big Bang Theory)
     images/Geography/Universe_Solar_System_and_Space_Exploration/2.png → ENTRY 45 (The Solar System)
     images/Geography/Universe_Solar_System_and_Space_Exploration/3.png → ENTRY 49 (Heliocentrism)
     images/Geography/Universe_Solar_System_and_Space_Exploration/4.png → ENTRY 56 (The Sun)
     images/Geography/Universe_Solar_System_and_Space_Exploration/5.png → ENTRY 72 (Classification of Planets)
     images/Geography/Universe_Solar_System_and_Space_Exploration/6.png → ENTRY 97 (Blood Moon)
     images/Geography/Universe_Solar_System_and_Space_Exploration/7.png → ENTRY 158 (Features of a Comet)

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name)
   images/Geography/Universe_Solar_System_and_Space_Exploration/thumbnail.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920×1080 px, ultra-sharp, in a premium, classic, refined editorial style (NOT cartoonish: no cartoon, toy-like, clip-art, comic or glossy cartoon-3D look). Deep midnight-navy and near-black base with a smooth, subtle indigo gradient (accent #6366f1) and restrained champagne-gold highlights; soft cinematic lighting with a gentle warm glow behind the right-centre of the frame, where a teacher's photo will be placed later; fine dark vignette on the edges, very subtle fine grain texture, realistic shallow depth of field. Place only 3 elegant, realistic, softly blurred objects mostly on the right and in the back: a thin gold-lined armillary sphere, a realistic matte ringed planet in brushed metal, and a subtle crescent Moon, rendered with natural reflections. Do NOT add any star, starburst or explosion sticker. Add ONE blank premium emblem: a refined, classic round seal with a thin champagne-gold rim, fine engraved double border and a smooth, completely EMPTY dark-navy centre with a faint glow, realistic brushed-metal / enamel finish, about 20% of the frame height, placed near the lower centre of the frame (about 60% from the left and 72% from the top) so I can write my own text inside it later. Keep the LEFT 62% of the frame calm, dark and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image (the emblem stays blank). Sophisticated, balanced, high-contrast, professional composition.
   images/Geography/Universe_Solar_System_and_Space_Exploration/1.png: Create a clean flat vector diagram, 16:9, 1200x675 px, on a dark navy background, about the Big Bang. Left to right: a tiny glowing dot labelled "PRIMEVAL ATOM", then a bright burst of thick radiating lines labelled "BIG BANG", then many scattered dots spreading wider and wider labelled "GALAXIES", with a long arrow underneath labelled "13.8 BILLION YEARS". Exactly these 4 short labels in VERY LARGE bold white/gold text, thick lines, simple shapes, accent colour indigo (#6366f1). No people, no logos, no watermarks, no extra text.
   images/Geography/Universe_Solar_System_and_Space_Exploration/2.png: Create a clean flat vector diagram, 16:9, 1200x675 px, on a dark navy background: a schematic (not to scale) of the Solar System. A large yellow circle on the left labelled "SUN" and 8 planets in a row going right in order, with sizes only roughly suggested, labelled "MERCURY", "VENUS", "EARTH", "MARS", "JUPITER", "SATURN", "URANUS", "NEPTUNE" (alternate the labels above and below the line so they do not overlap). Thin orbit arcs, VERY LARGE bold text, thick lines, simple shapes. No people, no logos, no watermarks, no extra text.
   images/Geography/Universe_Solar_System_and_Space_Exploration/3.png: Create a clean flat vector diagram, 16:9, 1200x675 px, on a dark navy background with two side-by-side panels. Left panel title "GEOCENTRIC": a blue Earth in the centre with a yellow Sun and a grey planet on circles around it, caption "EARTH IN CENTRE". Right panel title "HELIOCENTRIC": a yellow Sun in the centre with a blue Earth and a grey planet on circles around it, caption "SUN IN CENTRE". Exactly these 4 short labels in VERY LARGE bold text, thick lines, simple shapes. No people, no logos, no watermarks.
   images/Geography/Universe_Solar_System_and_Space_Exploration/4.png: Create a clean flat vector diagram, 16:9, 1200x675 px, on a dark navy background: a cross-section of the Sun as concentric circles — a white-hot centre labelled "CORE", an orange middle ring labelled "PHOTOSPHERE", and a faint glowing outer halo labelled "CORONA", with one small dark dot on the orange ring labelled "SUNSPOT". Exactly these 4 labels in VERY LARGE bold text with thick leader lines, simple shapes. No people, no logos, no watermarks.
   images/Geography/Universe_Solar_System_and_Space_Exploration/5.png: Create a clean flat vector diagram, 16:9, 1200x675 px, on a dark navy background: a schematic (not to scale) in three zones from left to right. Left zone with 4 small rocky planets, heading "INNER (ROCKY)". Middle zone with a dotted ring of small dots, heading "ASTEROID BELT". Right zone with 4 big gas planets (one with rings), heading "OUTER (GAS GIANTS)". Exactly these 3 headings in VERY LARGE bold text, thick lines, simple shapes. No planet names, no people, no logos, no watermarks.
   images/Geography/Universe_Solar_System_and_Space_Exploration/6.png: Create a clean flat vector diagram, 16:9, 1200x675 px, on a dark navy background: a straight horizontal line with a yellow circle on the left labelled "SUN", a blue circle in the middle labelled "EARTH", and a small deep-red circle on the right labelled "BLOOD MOON", with a thick yellow ray passing from the Sun and bending around the Earth towards the Moon. Exactly these 3 labels in VERY LARGE bold text, thick lines, simple shapes. No people, no logos, no watermarks.
   images/Geography/Universe_Solar_System_and_Space_Exploration/7.png: Create a clean flat vector diagram, 16:9, 1200x675 px, on a dark navy background: a small yellow circle on the far left labelled "SUN"; on the right a comet with a bright round head labelled "COMA" and a small dark core labelled "NUCLEUS"; two tails streaming to the right, away from the Sun: a straight blue one labelled "GAS TAIL" and a curved yellowish one labelled "DUST TAIL". Exactly these 5 labels in VERY LARGE bold text, thick lines, simple shapes. No people, no logos, no watermarks.
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   CHANGE LOG (corrections / additions made to the book’s content — none of this is written on the pages)
   1. Highlights / Greek: Strabo’s dates written as 64 BC – c. AD 24 (book: 36 AD). Described as calling the inhabited world ‘oblong’ (book: ‘the Earth’).
   2. Indians’ Contribution: ‘astrology’ written as ‘astronomy’; ‘Bhugol’ placed in the Surya Siddhanta (book credited it to Aryabhatta’s Surya Siddhanta — that text is not his).
   3. Arab geographers: spellings corrected to Al-Biruni (book: Al-Baruni) and Al-Balkhi (book: Al-Balakhi); Al-Mamun’s date written as 813 AD era, not ‘1813 AD’ (dates not shown on page); Al-Khwarizmi dates omitted (book 813–883 is not accurate; c. 780–850).
   4. Age of Discovery: Columbus ‘from Genoa’ (book: Geneva); Magellan’s circumnavigation described as an expedition; Hawaiian Islands credited to Captain Cook (book sentence was ambiguous); printing press given as ‘about 1470 AD’ (book value kept — Gutenberg’s press is usually dated to the 1440s); Columbus’s year 1492 not shown.
   5. Modern Geographers: Humboldt’s ‘coined Climatology and Permafrost’ not repeated (unverified); the two human–environment theories (determinism and possibilism) not named in book — only Possibilism shown. Dwarf/‘Dwarf Galaxy’ line omitted.
   6. Universe: book’s ‘diameter 10⁸ light years’ omitted (observable universe is about 93 billion light-years across); book’s ‘universe is classified into Atmosphere and Space’ omitted (non-standard).
   7. Galaxy: Milky Way’s age statement replaced (book: formed 5 billion years after the Big Bang; oldest stars are over 13 billion years old). Galaxy count ‘100 billion’ kept as the textbook figure; modern estimates are higher. ‘Latest known galaxy is the Dwarf Galaxy’ omitted. Andromeda written as the nearest large galaxy.
   8. Big Bang: age 13.798 billion years (book also says ‘15 billion years’ on the Higgs page — corrected to 13.8). ‘Dr. Allen Sundes’ corrected to Allan Sandage; ‘George Lamaitre’ corrected to Georges Lemaître; Fred Hoyle added to Steady State proponents.
   9. Higgs Boson: tunnel depth ‘100 feet’ corrected to about 100 m; ‘velocity of light’ corrected to ‘almost the speed of light’; ‘1000 scientists’ not repeated (several thousand took part). LHC restart: 2015 kept.
   10. Star: Alpha Centauri ≈ 4.4 years and Proxima Centauri ≈ 4.25 years (book 4.35/4.25); Stars page gives 4.24 light-years.
   11. Sun: sunspots described as about 1,500 °C cooler (book: ‘having temperature of about 1500°C’); light time given as ‘8 to 8.5 minutes’ (exact ≈ 8 min 20 s); aurora explained by charged particles from the Sun (not just ‘flares reaching the atmosphere’); 70,000 km/h given relative to neighbouring stars.
   12. Aditya-L1: no change except explaining L1 as a balance point. (Reached its L1 halo orbit on 6 January 2024 — not on the page; verify if needed.)
   13. The Planets: ‘A ninth planet recently discovered by NASA named Carla’ omitted (not an accepted discovery). ‘2003 UB313 (temporary name)’ replaced by its name Eris.
   14. Mercury: ‘no gases’ softened to ‘almost no atmosphere’.
   15. The Earth: equatorial rotation speed given as about 1,670 km/h (book: 1,610 km/h).
   16. The Moon: circumference given as about 10,900 km (book: 10,864 km). ‘Sea of Tranquility is on the rear side which always remains dark’ corrected — it is on the near side, and the far side is not permanently dark. Mt. Leibnitz (35,000 ft) kept from the book — verify before use.
   17. Super Moon: book said ‘15% brighter and 30% bigger’; corrected to about 14% larger in diameter and about 30% brighter.
   18. Blood Moon: explained as sunlight bent through the Earth’s atmosphere (red light reaches the Moon).
   19. Chandrayaan-1: book said it was ‘established in the Moon’s orbit on 22 October 2008’ — 22 Oct 2008 is the launch date (lunar orbit was entered on 8 Nov 2008); page uses launch date. Number of instruments (11) kept from the book.
   20. Chandrayaan-3: nicknames of lander and rover (Vikram, Pragyan) not shown on the page; the ‘first country near the south pole’ fact added.
   21. Mars: no change. MOM facts kept as in the book. (India is the first Asian country to reach Mars orbit and the first in its first attempt — not added to the page.)
   22. Neptune: ‘methane rings of sub-zero temperature’ corrected to faint rings of dust and ice.
   23. Moon and planet counts (Jupiter 95, Saturn 274, Uranus 28, Neptune 16) follow the book’s table dated 18 March 2025; these keep changing — verify before use.
   24. Pluto: numbers 134340 I, II, III for Charon, Nix and Hydra not repeated (not an official scheme).
   25. Asteroids: ‘more than 5000 identified’ replaced by ‘over a million catalogued’.
   26. Stars: ‘stars are made of hot burning gases’ kept; they shine by nuclear fusion.
   27. Andromeda: Local Group written as part of the Virgo Cluster (Supercluster); ‘about 30 galaxies’ is the textbook figure (the Local Group has more than 50 known members).
   28. Quasars: no change.
   ════════════════════════════════════════════════════════════════ */