/* Alternate presentation layers. Documentation and its router keep their own state. */
(function () {
  'use strict';

  var themes = [
    { id: 'original', name: 'Teal & Grey', kind: 'original', category: 'The original reading desk', mode: 'light', note: 'The original Prism design: warm white, teal links and quiet grey chrome, with serif prose and the exploded processor.', tags: 'Teal accents · quiet grey · light & dark' },
    { id: 'mono', name: 'Monochrome', kind: 'palette', category: 'Black, white and the silicon', mode: 'light', note: 'Pure black and white for text, links and controls. Only the processor layers keep their colors.', tags: 'Black & white · high contrast · light & dark' },
    { id: 'current', name: 'Ink & Violet', kind: 'palette', category: 'Neutral grey · ink buttons', mode: 'light', note: 'Cool neutral-grey paper, violet links and ink-colored buttons. The sidebar shares the page color.', tags: 'Neutral grey · violet links · light & dark' },
    { id: 'indigo', name: 'Indigo & Slate', kind: 'palette', category: 'Blue-grey · indigo buttons', mode: 'light', note: 'Blue-grey slate surfaces, a separate sidebar shade and indigo buttons, with deep navy paper after dark.', tags: 'Blue-grey chrome · indigo controls · light & dark' },
    { id: 'loam', name: 'Loam', kind: 'palette', category: 'Oat paper · moss accents', mode: 'light', note: 'Oat paper, espresso ink and a moss-green accent, with peat and lichen after dark.', tags: 'Earth tones · oat & moss · light & dark' },
    { id: 'databook', name: 'Databook', kind: 'palette', category: 'Signal yellow · printed circuits', mode: 'light', note: 'The signal yellow of a semiconductor databook, printed in black with a red second color. Black and yellow after dark.', tags: 'Signal yellow · black ink · light & dark' },
    { id: 'claret', name: 'Claret', kind: 'palette', category: 'Salmon paper · wine ink', mode: 'light', note: 'Salmon newsprint, wine-black ink and a claret accent, with dark cellar-red surfaces and blush links after dark.', tags: 'Newsprint & wine · blush links · light & dark' },
    { id: 'xp', name: 'Windows XP', category: 'Blissfully outdated', mode: 'light', note: 'Luna blue, grassy hills, glossy green buttons. Please do not turn off your SoC.', tags: 'Luna chrome · Tahoma · bevels' },
    { id: 'minecraft', name: 'Minecraft', category: 'Some assembly required', mode: 'dark', note: 'Mine the silicon. Craft the processor. A blocky world with exactly zero rounded corners.', tags: 'Pixel type · dirt & grass · stone buttons' },
    { id: 'vice', name: 'GTA VI', category: 'Grand theft silicon', mode: 'dark', note: 'Sunset gradients, palm silhouettes and loud neon. The only thing getting stolen is a clock cycle.', tags: 'Pricedown wordmark · neon · Miami dusk' },
    { id: 'glitch', name: 'Glitch', category: 'The signal has opinions', mode: 'light', note: 'A corrupted monochrome document with red fault labels, acid-green fragments and torn type. Recovery is going surprisingly well.', tags: 'Broken document · acid fragments · offset type' },
    { id: 'pipboy', name: 'Pip-Boy', category: 'War never changes. RTL does.', mode: 'dark', note: 'A wrist-mounted field manual for the silicon wasteland. All systems nominal. Probably.', tags: 'Phosphor green · scanlines · instrument panels' },
    { id: 'blueprint', name: 'Architecture Blueprint', category: 'Measure twice. Synthesize once.', mode: 'dark', note: 'White ink, engineering grids and drawing-sheet borders. Your SoC, ready for the drafting table.', tags: 'Cobalt · technical lettering · construction lines' },
    { id: 'notebook', name: 'Notebook', category: 'It started in the margins', mode: 'light', note: 'Ruled paper, handwritten headings and little pencil marks. Office hours, but make it a website.', tags: 'Paper rules · ink blue · handwritten headings' },
    { id: 'material', name: 'Material Red', category: 'Seeing red', mode: 'dark', note: 'Crimson backgrounds, burgundy panels and scarlet tabs. Every surface commits to red. Every single one.', tags: 'Red on red · editor tabs · more red' },
    { id: 'terminal', name: 'Amber Terminal', category: 'Connected at 9600 baud', mode: 'dark', note: 'A warm amber console from a quieter era. No green wasteland here; just you and the machine.', tags: 'Amber phosphor · ASCII borders · console type' },
    { id: 'bsod', name: 'Windows 11 BSOD', category: 'Your SoC ran into a theme', mode: 'dark', note: 'An entire engineering manual in crash-screen blue. Everything is fine. The sad face is just the aesthetic.', tags: 'Crash blue · Segoe UI · 100% documentation' },
    { id: 'bios', name: 'BIOS Setup Utility', category: 'Advanced chipset features', mode: 'light', note: 'Blue menu bars, gray panels and a CMOS setup screen that somehow contains a whole processor manual.', tags: 'Award-era chrome · monospace · blue selections' },
    { id: 'reddit', name: 'Old Reddit', category: 'r/Prism, before the redesign', mode: 'light', note: 'Classic Verdana, small blue post titles, powder-blue tabs and ranked link rows. The exploded SoC made the front page.', tags: 'Verdana · compact post titles · vote columns' },
    { id: 'vegas', name: 'Silicon Las Vegas', category: 'The house always meets timing', mode: 'light', note: 'An enormous bulb-studded roadside sign, red velvet, green casino felt and cream playing cards. Your processor just hit the jackpot.', tags: 'Bulb marquee · green felt · red & gold casino' },
    { id: 'spongebob', name: 'SpongeBob', category: 'Bikini Bottom silicon lab', mode: 'light', note: 'Buck teeth, square pants, a pineapple under the sea and sponge-yellow panels. The processor is ready for its shift at the Krusty Krab.', tags: 'SpongeBob portrait · pineapple house · sea flowers' },
    { id: 'peppa', name: 'Peppa Pig', category: 'Everyone loves muddy processors', mode: 'light', note: 'Peppa in her red dress, a muddy puddle and the little yellow house on the hill. Everyone loves jumping into microarchitecture.', tags: 'Peppa portrait · muddy puddles · hilltop house' },
    { id: 'barbie', name: 'Barbie', category: 'This Barbie designs processors', mode: 'light', note: 'A ponytail silhouette, oversized pink script and a striped doll-box window. This processor comes with its own dreamhouse.', tags: 'Doll-box stripes · ponytail silhouette · hot pink script' },
    { id: 'airport', name: 'Airport Departures', category: 'Now boarding: your next SoC', mode: 'dark', note: 'Mechanical split-flap tiles turn through characters before settling on your destinations. Pick a flight. Mind the processor layers.', tags: 'Animated hinged flaps · departure rows · gate signage' },
    { id: 'apollo', name: 'NASA / Apollo Mission Control', category: 'Houston, all stations are go', mode: 'light', note: 'A wall-sized lunar trajectory display above rows of cream flight consoles. CAPCOM, FIDO, EECOM and FLIGHT are ready for your next small step.', tags: 'Houston control room · lunar trajectory · flight consoles' },
    { id: 'arcade', name: '1980s Arcade', category: 'Insert clock to continue', mode: 'dark', note: 'A blue-and-red arcade cabinet with pixel invaders, a curved CRT window and chunky player buttons. Insert clock to continue.', tags: 'Pixel invaders · CRT cabinet · primary colors' },
    { id: 'black-gold', name: 'Black & Gold', category: 'Built to engineer', mode: 'light', note: 'Black panels, warm gold, engineering-manual cream and bold collegiate lettering. The original restrained gold-and-black design.', tags: 'Warm gold · black panels · collegiate type' },
    { id: 'teletubbies', name: 'Teletubbies', category: 'Eh-oh, silicon!', mode: 'light', note: 'Four antennae, four tummy screens, impossibly green hills and a smiling sun. Time for microarchitecture. Again! Again!', tags: 'Four colorful friends · tummy screens · sunny hills' },
    { id: 'barney', name: 'Barney the Dinosaur', category: 'A super-dee-duper system', mode: 'light', note: 'A friendly purple dinosaur, a lime-green tummy and a playroom full of stars. Everybody is special. Even your bus fabric.', tags: 'Purple dinosaur · green tummy · playroom stars' },
    { id: 'thomas', name: 'Thomas the Tank Engine', category: 'A really useful processor', mode: 'light', note: 'A smiling blue number-one engine, red buffer beams and railway timetables. Mind the gap between processor layers.', tags: 'Blue engine · number one · Sodor railway signs' },
    { id: 'purdue', name: 'Purdue Boilermakers', category: 'Boiler Up. Hammer Down.', mode: 'light', note: 'The Purdue University signature, a Bell Tower skyline, a wall of Boilermaker Gold and a black campus masthead. There is no mistaking whose engineering desk this is.', tags: 'Purdue signature · Bell Tower · Boiler Up' }
  ];
  var selectableIDs = ['original', 'mono', 'current', 'indigo', 'loam', 'databook', 'claret', 'blueprint', 'material', 'black-gold'];
  var storageKey = 'prism-internal-costume';
  var modeKey = 'prism-internal-mode';
  var root = document.documentElement;
  var systemMode = window.matchMedia('(prefers-color-scheme: dark)');
  var modePreference = null;
  var previewMode = null;
  function validMode(mode) { return mode === 'light' || mode === 'dark'; }
  try {
    var storedMode = localStorage.getItem(modeKey);
    if (validMode(storedMode)) modePreference = storedMode;
  } catch (error) { /* Use the system preference. */ }
  function find(id) {
    if (id === 'orange') id = 'glitch';
    return themes.find(function (theme) { return theme.id === id; });
  }
  function selectable(theme) { return !!theme && selectableIDs.indexOf(theme.id) !== -1; }
  function current() { return find(root.getAttribute('data-costume') || root.getAttribute('data-palette') || 'original'); }
  function preferredMode() {
    return modePreference || (systemMode.matches ? 'dark' : 'light');
  }
  function rememberMode(mode) {
    modePreference = mode;
    try { localStorage.setItem(modeKey, mode); } catch (error) { /* Keep this visit's choice. */ }
  }
  function paint(theme, mode) {
    root.removeAttribute('data-costume');
    root.removeAttribute('data-palette');
    if (theme.kind === 'palette') root.setAttribute('data-palette', theme.id);
    else if (!theme.kind) root.setAttribute('data-costume', theme.id);
    // Reading palettes have two modes; costumes keep their designed appearance.
    var chosenMode = theme.kind ? (validMode(mode) ? mode : preferredMode()) : theme.mode;
    root.setAttribute('data-theme', chosenMode);
    return chosenMode;
  }
  function restore() {
    var params = new URLSearchParams(location.search);
    var requested = find(params.get('theme'));
    if (!selectable(requested)) requested = null;
    var saved = null;
    try {
      saved = find(localStorage.getItem(storageKey));
      // Old versions saved surprises. Only deliberate gallery choices return.
      if (saved && !selectable(saved)) {
        saved = null;
        if (params.get('preview') !== '1') localStorage.removeItem(storageKey);
      }
    } catch (error) { /* Themes also work without storage. */ }
    var theme = requested || saved || find('original');
    var requestedMode = requested && theme.kind && validMode(params.get('mode')) ? params.get('mode') : null;
    if (params.get('preview') === '1') previewMode = requestedMode;
    paint(theme, requestedMode);
    if (requested && params.get('preview') !== '1') {
      try {
        localStorage.setItem(storageKey, theme.id);
      } catch (error) { /* session only */ }
      if (requestedMode) rememberMode(requestedMode);
    }
    if ((params.has('theme') && !requested) || (!theme.kind && params.has('mode'))) updateURL(theme);
  }
  restore();

  function themeURL(id, sample, mode) { return 'index.html?theme=' + encodeURIComponent(id) + (mode ? '&mode=' + mode : '') + (sample ? '&preview=1' : '') + '#/'; }
  function updateURL(theme) {
    try {
      var url = new URL(location.href);
      if (selectable(theme)) url.searchParams.set('theme', theme.id); else url.searchParams.delete('theme');
      if (theme.kind && modePreference) url.searchParams.set('mode', modePreference); else url.searchParams.delete('mode');
      history.replaceState(null, '', url);
    } catch (error) { /* Some file:// contexts refuse URL changes. */ }
  }

  function announce(message) {
    var node = document.getElementById('announcer');
    if (node) node.textContent = message;
  }
  function sync() {
    var theme = current();
    var mode = root.getAttribute('data-theme');
    var modeButton = document.getElementById('mode-button');
    if (modeButton) {
      modeButton.hidden = !theme.kind;
      var next = mode === 'dark' ? 'light' : 'dark';
      var label = 'Switch to ' + next + ' mode';
      modeButton.setAttribute('aria-label', label);
      modeButton.setAttribute('title', label);
      document.getElementById('mode-label').textContent = label;
      document.getElementById('mode-icon').textContent = mode === 'dark' ? '☀' : '☾';
    }
    document.querySelectorAll('[data-apply-theme]').forEach(function (button) {
      var sameTheme = button.getAttribute('data-apply-theme') === theme.id;
      button.setAttribute('aria-pressed', String(sameTheme));
      button.textContent = sameTheme ? 'Applied ✓' : 'Try theme';
      button.closest('.theme-card').classList.toggle('is-applied', sameTheme);
    });
    document.querySelectorAll('[data-theme-current]').forEach(function (label) { label.textContent = theme ? theme.name : 'Original Prism'; });
    document.querySelectorAll('[data-explore-theme]').forEach(function (link) {
      var choice = find(link.getAttribute('data-explore-theme'));
      link.href = themeURL(choice.id, false, choice.kind ? modePreference : null);
    });
    document.querySelectorAll('[data-preview-theme]').forEach(function (frame) {
      var choice = find(frame.getAttribute('data-preview-theme'));
      var src = themeURL(choice.id, true, choice.kind ? mode : null);
      frame.style.colorScheme = choice.kind ? mode : choice.mode;
      if (frame.getAttribute('src') !== src) frame.src = src;
    });
    enhancePage();
    window.dispatchEvent(new Event('prism-theme-change'));
  }
  function setTheme(theme, mode) {
    if (theme.kind && validMode(mode)) rememberMode(mode);
    paint(theme, mode);
    updateURL(theme);
    if (selectable(theme)) {
      try { localStorage.setItem(storageKey, theme.id); } catch (error) { /* session only */ }
    }
    sync();
    announce(theme.name + ' applied to the documentation');
  }
  function apply(id, mode) {
    var theme = find(id);
    if (!selectable(theme)) return;
    setTheme(theme, mode);
  }
  function toggleMode() {
    var theme = current();
    if (!theme.kind) return;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(theme, next);
    announce((next === 'dark' ? 'Dark' : 'Light') + ' mode');
  }
  function reset() {
    apply('original');
    announce('Original Prism theme restored');
  }
  function surprise() {
    var selected = current();
    var choices = themes.filter(function (theme) { return !selectable(theme) && theme.id !== selected.id; });
    setTheme(choices[Math.floor(Math.random() * choices.length)]);
  }
  systemMode.addEventListener('change', function () {
    if (modePreference || previewMode || !current().kind) return;
    paint(current());
    sync();
  });
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function action(text, fn, className) {
    var button = el('button', className || 'gallery-button', text);
    button.type = 'button'; button.addEventListener('click', fn);
    return button;
  }

  var airportDisplay = null;
  function enhancePage() {
    var hero = document.querySelector('.page[data-un="home"] > .hero');
    var heading = hero && hero.querySelector('h1');
    if (heading) heading.setAttribute('data-glitch-text', heading.textContent);
    var airport = root.getAttribute('data-costume') === 'airport';
    if (airportDisplay && (!airport || airportDisplay.hero !== hero)) {
      airportDisplay.dispose();
      airportDisplay = null;
    }
    if (airport && hero && !airportDisplay) airportDisplay = makeAirportDisplay(hero);
  }

  function makeAirportDisplay(hero) {
    var board = el('section', 'airport-board');
    board.setAttribute('aria-label', 'Departure board');
    var header = el('div', 'sf-header');
    header.append(el('span', 'sf-title', '✈ Departures'));
    var replay = action('↻ Replay', play, 'sf-replay');
    replay.setAttribute('aria-label', 'Flip the departure board again');
    header.append(replay);
    var labels = el('div', 'sf-labels');
    ['Flight', 'Destination', 'Gate', 'Status'].forEach(function (label, index) {
      labels.append(el('span', ['sf-flight', 'sf-destination', 'sf-gate', 'sf-status'][index], label));
    });
    board.append(header, labels);
    var tiles = [], timers = [], disposed = false;
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var flights = [
      ['PR032', 'GET STARTED', 'A01', 'NOW BOARDING', '#/guides/getting-started'],
      ['PR064', 'ARCHITECTURE', 'B02', 'ON TIME', '#/architecture'],
      ['PR128', 'ADDRESS MAP', 'C03', 'GATE OPEN', '#/reference/address-map']
    ];
    flights.forEach(function (flight) {
      var row = el('a', 'sf-row');
      row.href = flight[4];
      row.setAttribute('aria-label', flight[1] + ' — gate ' + flight[2] + ', ' + flight[3]);
      [5, 12, 3, 12].forEach(function (width, index) {
        var field = el('span', ['sf-flight', 'sf-destination', 'sf-gate', 'sf-status'][index]);
        field.setAttribute('aria-hidden', 'true');
        flight[index].padEnd(width, ' ').split('').forEach(function (letter) {
          var node = el('span', 'sf-tile');
          var faces = ['sf-upper', 'sf-lower', 'sf-leaf-top', 'sf-leaf-bottom'].map(function (className) {
            var half = el('span', 'sf-half ' + className);
            var glyph = el('span', 'sf-glyph');
            half.append(glyph); node.append(half);
            return glyph;
          });
          var tile = { node: node, faces: faces, target: letter, value: letter };
          settle(tile, letter); tiles.push(tile); field.append(node);
        });
        row.append(field);
      });
      board.append(row);
    });
    hero.prepend(board);
    function later(fn, delay) { timers.push(window.setTimeout(fn, delay)); }
    function clear() { timers.forEach(window.clearTimeout); timers = []; }
    function settle(tile, letter) {
      tile.value = letter;
      tile.faces.forEach(function (face) { face.textContent = letter === ' ' ? '\u00a0' : letter; });
      tile.node.classList.remove('is-flipping');
    }
    function turn(tile, next) {
      if (disposed || !board.isConnected || tile.value === next) return;
      tile.faces[0].textContent = next;
      tile.faces[1].textContent = tile.faces[2].textContent = tile.value === ' ' ? '\u00a0' : tile.value;
      tile.faces[3].textContent = next;
      tile.node.classList.add('is-flipping');
      later(function () { settle(tile, next); }, 300);
    }
    function play() {
      clear();
      replay.hidden = motion.matches;
      if (motion.matches) { tiles.forEach(function (tile) { settle(tile, tile.target); }); return; }
      replay.disabled = true;
      var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      tiles.forEach(function (tile, index) {
        settle(tile, ' ');
        [alphabet[(index * 7 + 3) % alphabet.length], alphabet[(index * 11 + 17) % alphabet.length], tile.target].forEach(function (letter, step) {
          later(function () { turn(tile, letter); }, 80 + index * 9 + step * 340);
        });
      });
      later(function () { replay.disabled = false; }, 1120 + tiles.length * 9);
    }
    motion.addEventListener('change', play);
    play();
    return { hero: hero, dispose: function () {
      disposed = true; clear(); motion.removeEventListener('change', play); board.remove();
    } };
  }

  function preview(theme) {
    var viewport = el('div', 'theme-preview');
    viewport.setAttribute('aria-hidden', 'true');
    viewport.inert = true;
    // Each sample is the complete upstream-gallery design, with its real
    // exploded processor figure, contents tree and page runtime.
    var frame = el('iframe', 'theme-canvas');
    var mode = root.getAttribute('data-theme');
    frame.src = themeURL(theme.id, true, theme.kind ? mode : null);
    frame.style.colorScheme = theme.kind ? mode : theme.mode;
    frame.title = theme.name + ' preview';
    frame.setAttribute('data-preview-theme', theme.id);
    frame.loading = 'lazy'; frame.tabIndex = -1;
    viewport.append(frame);
    return viewport;
  }

  function gallery(onLeave) {
    var galleryThemes = themes.filter(selectable);
    var page = el('div', 'page theme-gallery');
    var intro = el('header', 'gallery-intro');
    var kicker = el('p', 'gallery-kicker', 'PRISM / DESIGN GALLERY');
    var heading = el('h1', 'gallery-title', 'Choose your reading desk.');
    heading.id = 'page-title'; heading.tabIndex = -1;
    intro.append(kicker, heading, el('p', 'gallery-lede', 'Seven reading palettes and three more playful designs. All share the same documentation, diagrams and interactive tools.'));
    var toolbar = el('div', 'gallery-toolbar');
    var status = el('div', 'gallery-current');
    status.append(el('span', 'gallery-status-dot'), el('span', '', 'Wearing: '));
    var name = el('strong'); name.setAttribute('data-theme-current', ''); status.append(name);
    var returnButton = action('Return to original theme', reset);
    returnButton.setAttribute('data-return-original', '');
    toolbar.append(status, returnButton);
    var grid = el('div', 'theme-grid');
    galleryThemes.forEach(function (theme, index) {
      var card = el('article', 'theme-card'); card.id = 'theme-' + theme.id;
      var header = el('div', 'theme-card-head');
      header.append(el('span', 'theme-number', String(index + 1).padStart(2, '0')), el('span', 'theme-category', theme.category));
      var body = el('div', 'theme-card-body');
      var title = el('h2', '', theme.name); title.id = 'theme-title-' + theme.id;
      card.setAttribute('aria-labelledby', title.id);
      body.append(title, el('p', 'theme-note', theme.note), el('p', 'theme-tags', theme.tags));
      var controls = el('div', 'theme-card-actions');
      var tryButton = action('Try theme', function () { apply(theme.id); }, 'gallery-button gallery-button-primary');
      tryButton.setAttribute('data-apply-theme', theme.id);
      tryButton.setAttribute('aria-label', 'Apply ' + theme.name + ' theme');
      var explore = el('a', 'gallery-explore', 'Explore site ↗');
      explore.setAttribute('data-explore-theme', theme.id);
      explore.href = themeURL(theme.id, false, theme.kind ? modePreference : null); explore.setAttribute('aria-label', 'Explore the site in ' + theme.name);
      explore.addEventListener('click', function () { apply(theme.id); });
      controls.append(tryButton, explore); body.append(controls);
      card.append(header, preview(theme), body); grid.append(card);
    });
    var footer = el('p', 'gallery-footnote', 'Your gallery selection is remembered. Light and dark follow your device until you switch them yourself. Surprise themes last for this visit.');
    page.append(intro, toolbar, grid, footer);
    // Scale the wide overview down to each card without changing its layout.
    var observer = null;
    function resize() {
      page.querySelectorAll('.theme-preview').forEach(function (sample) {
        sample.style.setProperty('--sample-scale', sample.clientWidth / 1360);
      });
    }
    if (window.ResizeObserver) { observer = new ResizeObserver(resize); observer.observe(page); }
    window.addEventListener('resize', resize);
    var frame = window.requestAnimationFrame(function () { resize(); sync(); });
    onLeave(function () {
      window.cancelAnimationFrame(frame);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', resize);
    });
    return page;
  }

  window.PrismThemes = { gallery: gallery, apply: apply, reset: reset, current: current, surprise: surprise, toggleMode: toggleMode, enhance: enhancePage };
  document.addEventListener('DOMContentLoaded', sync);
})();
