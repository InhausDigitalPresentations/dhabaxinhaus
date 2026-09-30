/* THE ROAD TO DHABA — deck content + builder.
   Copy is verbatim from Dhaba_Abu_Dhabi_Deck_Copy_v2.md. Every slide is a
   `.stop` on the horizontal road; `.inter` panels are photographic roadside
   interludes between slides (no anchor, not counted). Each photo is used once. */
(() => {
  const AR = window.PHOTO_AR || {};
  const esc = s => s;

  // ---------- helpers ----------
  // polaroid photo: id, left(vw), top(vh), height(vh), rotate(deg), caption, depth
  const pol = (id, l, t, h, r = 0, cap = '', depth = 1, cls = '') =>
    `<figure class="pol rv ${cls}" data-depth="${depth}" style="left:${l}vw;top:${t}vh;height:${h}vh;aspect-ratio:${AR[id] || 1.5};--r:${r}deg">` +
    `<img data-src="assets/photos/${id}.webp" alt="">${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
  // full-bleed-ish plate (no frame)
  const plate = (id, l, t, h, cls = '', depth = 1) =>
    `<figure class="plate rv ${cls}" data-depth="${depth}" style="left:${l}vw;top:${t}vh;height:${h}vh;aspect-ratio:${AR[id] || 1.5}">` +
    `<img data-src="assets/photos/${id}.webp" alt=""></figure>`;
  // illustration standing on the kerb
  const ill = (name, l, h, lift = 0) =>
    `<img class="roadside" data-src="assets/ill/${name}.webp" style="left:${l}vw;height:${h}vh;--lift:${lift}vh" alt="">`;
  const milestone = (l, num, label, cap = 'var(--orange)') =>
    `<div class="milestone" style="left:${l}vw;--cap:${cap}"><span class="cap"></span><b>${num}</b><em>${label}</em></div>`;
  const lines = arr => arr.map((x, i) => `<span class="ln rv" style="--d:${i}">${x}</span>`).join('');
  const small = s => s ? `<p class="s-small rv">${s}</p>` : '';
  const num = () => `<p class="s-num rv">%%N%%</p>`;   // numbered sequentially at build time

  // ---------- panels ----------
  // kind: 'slide' | 'inter'. n = slide label for the counter.
  const P = [];
  const slide = (o) => P.push({ kind: 'slide', w: 100, ...o });
  const inter = (o) => P.push({ kind: 'inter', w: 80, bg: '#F5EDDE', ink: '#142196', ...o });

  const BLUE = '#142196', CREAM = '#F5EDDE', ORANGE = '#FA682C', GREEN = '#47984B', TEAL = '#002B35',
    YELLOW = '#FFF8B5', PINK = '#FAD0F0', LILAC = '#D1C2F5', SKY = '#D0EAF9', LIME = '#D1E877',
    MAGENTA = '#D04C91', PLUM = '#591950', RUST = '#B4381C', DEEP = '#00553B', GOLD = '#FFD208';

  // TITLE
  slide({ n: '00', label: 'The Road to Dhaba', bg: BLUE, ink: CREAM, ghost: 'DHABA', html: `
    <div class="t-title">
      <h1 class="s-title xl rv">THE ROAD TO DHABA</h1>
      <p class="s-body center rv" style="--d:2">Field notes from the journey that brings Dhaba to Abu Dhabi.</p>
    </div>
    <p class="hint"><span>Scroll to drive</span> <i class="arrow"></i></p>` });

  // STRATEGIC PROPOSITION
  slide({ n: '—', label: 'Strategic proposition', bg: CREAM, ink: BLUE, ghost: 'THE ROAD', w: 110, html: `
    <div class="col-wide">
      <p class="s-num rv">Strategic proposition</p>
      <p class="s-statement rv" style="--d:1">Before Dhaba opens, we follow the chef on the journey that brings it to Abu Dhabi, so people get to know the chef, the food and the brand before their first visit.</p>
    </div>
    ${ill('elephant', 84, 30)}` });

  // PART ONE
  slide({ n: 'I', label: 'Part one: The road', bg: ORANGE, ink: CREAM, ghost: 'PART ONE', html: `
    <div class="t-part"><p class="s-num rv">Part one</p><h2 class="s-title xxl rv" style="--d:1">THE ROAD</h2></div>
    ${milestone(62, '0', 'Copenhagen', BLUE)}` });

  // 01
  slide({ n: '01', label: 'Heritage', bg: CREAM, ink: BLUE, ghost: 'COPENHAGEN', w: 110, html: `
    <div class="col-l">${num('01')}<h2 class="s-title l rv" style="--d:1">Dhaba started long before Abu Dhabi.</h2>
      <p class="s-body rv lines" style="--d:2">${lines(['In Copenhagen.', 'Across Denmark and Sweden.', 'In two cookbooks.', 'On television.'])}</p></div>
    ${plate('pf-copenhagen', 58, 11, 52, 'tilt-r')}` });

  // 02
  slide({ n: '02', label: 'Departure', bg: BLUE, ink: CREAM, ghost: 'ABU DHABI', html: `
    <div class="col-l">${num('02')}<h2 class="s-title l rv" style="--d:1">Now the story moves again.</h2>
      <p class="s-body big rv" style="--d:2">This time, to Abu Dhabi.</p></div>
    <div class="route-map rv" style="--d:3">
      <svg viewBox="0 0 1430 1286" preserveAspectRatio="xMidYMid meet">
        <path id="road-cph-auh" d="M262 75 C 250 140, 270 190, 285 213 S 290 262, 300 285 S 360 340, 372 360 S 380 405, 400 410 S 440 425, 452 462 S 455 510, 470 522 S 520 575, 545 590 S 600 622, 640 632 S 700 640, 720 648 S 770 660, 778 690 S 805 740, 832 770 S 900 768, 940 768 S 1010 760, 1030 770 S 1045 800, 1050 830 S 1065 880, 1075 900 S 1120 960, 1150 990 S 1170 1030, 1180 1040 S 1205 1085, 1220 1110 S 1245 1150, 1262 1156 S 1305 1150, 1325 1145"/>
        <circle class="pin" cx="262" cy="75" r="16"/><circle class="pin end" cx="1325" cy="1145" r="16"/>
        <circle class="traveller" r="13"><animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#road-cph-auh"/></animateMotion></circle>
      </svg>
      <span class="rm-a">Copenhagen</span><span class="rm-b">Abu Dhabi</span>
    </div>` });

  inter({ label: 'From the cookbooks', bg: YELLOW, w: 95, html: `
    ${pol('pf-roast', 6, 10, 30, -3, 'From the cookbooks', .92)}
    ${pol('pf-pour', 40, 6, 44, 2.5, '', 1.06)}
    ${pol('pf-coconut', 64, 16, 36, -2, '', .96)}
    ${ill('redchili', 20, 14, 2)}` });

  // 03
  slide({ n: '03', label: 'The convention', bg: LILAC, ink: BLUE, ghost: 'SOON', w: 110, html: `
    <div class="col-l">${num('03')}<h2 class="s-title l rv" style="--d:1">Most restaurant launches look familiar.</h2></div>
    <div class="cliche">
      ${[['render', 'A render.'], ['countdown', 'A countdown.'], ['soon', '“Coming soon.”'], ['open', '“Now open.”']]
        .map(([f, t], i) => `<div class="cl-card rv" style="--d:${i + 2}"><img data-src="assets/generic/${f}.webp" alt=""><span>${t}</span></div>`).join('')}
    </div>` });

  // 04
  slide({ n: '04', label: 'The turn', bg: GOLD, ink: BLUE, ghost: 'STORY', html: `
    <div class="col-l">${num('04')}<h2 class="s-title l rv" style="--d:1">Dhaba has more of a story than that.</h2>
      <p class="s-body big rv" style="--d:2">So we don't start with the restaurant.</p></div>
    ${ill('umbrella', 70, 40, 8)}` });

  // 05
  slide({ n: '05', label: 'The chef', bg: CREAM, ink: BLUE, ghost: 'SAFI', w: 115, html: `
    <div class="col-l">${num('05')}<h2 class="s-title l rv" style="--d:1">We start with the person bringing it here.</h2>
      <p class="s-body rv lines" style="--d:2">${lines(['Chef.', 'Author.', 'Television personality.', 'Entrepreneur.', 'Traveller.'])}</p>
      ${small('Enayatullah Safi')}</div>
    ${plate('pf-portrait', 60, 8, 64, 'portrait')}` });

  // 06
  slide({ n: '06', label: 'Pause', bg: TEAL, ink: CREAM, ghost: '', w: 90, html: `
    <div class="t-pause"><h2 class="s-title xl rv">And we follow him.</h2></div>` });

  inter({ label: 'Old Delhi', bg: PINK, w: 100, html: `
    ${pol('del-chai', 4, 7, 44, -2.5, 'Old Delhi', .92)}
    ${pol('del-karim', 30, 16, 32, 2, '', 1.06)}
    ${pol('del-naan', 64, 5, 40, -1.5, '', .97)}
    ${ill('bike', 50, 26)}` });

  // 07
  slide({ n: '07', label: 'The concept', bg: BLUE, ink: CREAM, ghost: 'THE ROAD', w: 115, html: `
    <div class="t-reveal">
      <div class="reveal-copy">
        ${num('07')}
        <h2 class="s-title xl rv" style="--d:1">THE ROAD TO DHABA</h2>
        <p class="s-body rv" style="--d:2">Before Dhaba opens,<br>we follow the journey that brings it to Abu Dhabi.</p>
        ${small('The restaurant isn\'t the hero yet. The journey is. Dhaba is the destination.')}
      </div>
      <div class="reveal-frame"><img class="frame-img rv" src="assets/brand/frame-cream.svg" alt="">
        <p class="s-body rv lines" style="--d:3">${lines(['Through food.', 'Through people.', 'Through the tables shared along the way.'])}</p></div>
    </div>` });

  // 08
  slide({ n: '08', label: 'The goal', bg: CREAM, ink: BLUE, ghost: 'FAMILIAR', w: 125, html: `
    <div class="col-l">${num('08')}
      <h2 class="s-title m rv" style="--d:1">The goal is not just awareness before opening.</h2>
      <h2 class="s-title l rv accent-o" style="--d:2">It is familiarity before first visit.</h2></div>
    <div class="goal">
      <p class="s-body big rv" style="--d:2">By opening night, people should already know something about</p>
      <div class="goal-cards">
        ${[['del-chef-naan', 'the chef,'], ['pf-banana-leaf', 'his food,'], ['del-laugh', 'his personality,'], ['koc-leaf', 'and some of the people around him.']]
          .map(([id, t], i) => `<figure class="gc rv" style="--d:${i + 3}"><i><img data-src="assets/photos/${id}.webp" alt=""></i><figcaption>${t}</figcaption></figure>`).join('')}
      </div>
      <p class="s-body strong goal-end rv" style="--d:7">So the opening feels like an arrival, not an introduction.</p>
    </div>` });

  // 09
  slide({ n: '09', label: 'Tone', bg: SKY, ink: BLUE, ghost: 'JOURNAL', w: 125, html: `
    <div class="col-l">${num('09')}<h2 class="s-title l rv" style="--d:1">A journal, not a restaurant feed.</h2>
      <p class="s-body rv lines" style="--d:2">${lines(['Field notes.', 'Portraits.', 'Voice notes.', 'Maps.', 'Food.'])}</p>
      ${small('Some of it crafted. Some of it caught on a phone.')}</div>
    <div class="journal">
      <img class="j-ill rv" data-src="assets/ill/journal.webp" alt="">
      ${pol('jai-portrait', 86, 8, 30, 3, 'Portraits', 1.04)}
      <div class="wa rv" style="--d:3">
        <span class="wa-av"><img data-src="assets/photos/chef-avatar.webp" alt=""><i class="wa-mic"><svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1A7 7 0 0 0 19 12h-2z"/></svg></i></span>
        <span class="wa-play"><svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg></span>
        <span class="wa-track"><i class="wa-dot"></i>${Array.from({length: 38}, (_, k) => `<b style="--h:${[30,55,40,70,85,60,45,90,65,50,35,75,95,70,55,40,60,80,50,35,65,90,70,45,55,75,60,40,85,65,50,30,55,70,45,60,40,30][k]}%"></b>`).join('')}</span>
        <em class="wa-dur">0:39</em><em class="wa-time">10:13 PM <svg viewBox="0 0 18 11"><path d="M1 6l3 3 6-7M7 9l1.5 1.2L16 2"/></svg></em>
      </div>
      <div class="mapcard rv" style="--d:4"><svg viewBox="0 0 200 120"><path d="M10 100 C 50 20, 90 110, 130 50 S 180 30, 190 20" /></svg><span>Maps</span></div>
      ${pol('luc-kebab', 106, 22, 28, -2, 'Food', .95)}
    </div>` });

  inter({ label: 'Jaipur, Rajasthan', bg: PINK, w: 100, html: `
    ${pol('jai-roti', 5, 10, 32, -2, 'Jaipur, Rajasthan', .93)}
    ${pol('jai-brass', 42, 6, 46, 2, '', 1.07)}
    ${pol('jai-arch', 70, 14, 34, -1.5, '', .97)}
    ${ill('peacock', 28, 30)}` });

  // 10
  slide({ n: '10', label: 'The archive', bg: CREAM, ink: BLUE, ghost: 'ARCHIVE', w: 130, html: `
    <div class="col-l">${num('10')}<h2 class="s-title l rv" style="--d:1">The first pages are already written.</h2>
      <p class="s-body rv lines" style="--d:2">${lines(['Copenhagen.', 'The cookbooks.', 'The television work.', 'Years of travel photography.'])}</p>
      <p class="s-body strong rv" style="--d:3">Before he arrives, we open the archive.</p></div>
    ${pol('pf-tv-1', 58, 8, 44, -3, 'The television work', .93)}
    ${pol('pf-tv-2', 76, 14, 44, 2, '', 1.05)}
    ${pol('pf-naan', 95, 6, 34, -1.5, 'The cookbooks', .97)}
    ${pol('pf-rickshaw', 108, 40, 22, 2.5, 'Travel photography', 1.08)}
    ${ill('tv', 118, 34)}` });

  // 11
  slide({ n: '11', label: 'Landing', bg: DEEP, ink: CREAM, ghost: 'UAE', w: 110, html: `
    <div class="col-l">${num('11')}<h2 class="s-title l rv" style="--d:1">Then he lands in the UAE.</h2>
      <p class="s-body big rv" style="--d:2">And the journal moves into the present tense.</p></div>
    ${ill('dhow', 62, 44)}` });

  // 12
  slide({ n: '12', label: 'The chapters', bg: SKY, ink: BLUE, ghost: 'CHAPTERS', w: 150, html: `
    <div class="col-l wide">${num('12')}
      <h2 class="s-title m rv chapters" style="--d:1"><span>A kitchen in Dubai.</span><span>A fire in the mountains of Jebel Hafeet.</span><span>A morning at the market.</span><span>A farm. A producer. A family table.</span></h2>
      <p class="s-body strong rv" style="--d:2">Each chapter is a story, not just a post.</p>
      ${small('The route will be shaped by the right people, stories and opportunities.')}</div>
    ${milestone(70, 'I', 'Dubai', BLUE)}
    ${milestone(88, 'II', 'Jebel Hafeet', ORANGE)}
    ${milestone(106, 'III', 'The market', GREEN)}
    ${milestone(124, 'IV', 'The farm', MAGENTA)}` });

  inter({ label: 'Lucknow, Uttar Pradesh', bg: LIME, w: 100, html: `
    ${pol('luc-pan', 4, 6, 44, -2, 'Lucknow, Uttar Pradesh', .93)}
    ${pol('luc-flowers', 34, 12, 38, 2.5, '', 1.06)}
    ${pol('luc-milk', 62, 8, 42, -1.5, '', .97)}
    ${ill('disco', 84, 32)}` });

  // 13
  slide({ n: '13', label: 'Collaboration', bg: CREAM, ink: BLUE, ghost: 'MEET', w: 130, html: `
    <div class="col-l">${num('13')}
      <h2 class="s-title l rv" style="--d:1"><s>Not: Invite. Eat. Post.</s></h2>
      <h2 class="s-title l rv accent" style="--d:2">Instead: Meet. Discover. Cook. Share.</h2>
      <p class="s-body rv lines" style="--d:3">${lines(['He goes to them.', 'They show him their UAE.'])}</p>
      ${small('Chefs, creators, founders, producers, cultural personalities and interesting local voices. Not every collaboration is a paid partnership.')}</div>
    <div class="quad">
      ${pol('luc-talk', 60, 8, 24, -2, 'Meet', .95)}
      ${pol('koc-spices', 84, 12, 22, 2, 'Discover', 1.04)}
      ${pol('koc-cook', 64, 40, 26, 1.5, 'Cook', 1.02)}
      ${pol('jai-table', 90, 42, 22, -2.5, 'Share', .97)}
    </div>` });

  // 14
  slide({ n: '14', label: 'Shared episodes', bg: MAGENTA, ink: CREAM, ghost: 'EPISODE', w: 110, html: `
    <div class="col-l">${num('14')}<h2 class="s-title l rv" style="--d:1">They become part of the story.</h2>
      <p class="s-body rv" style="--d:2">Their audience sees more than an endorsement.</p>
      <p class="s-body strong rv" style="--d:3">They see an episode with someone they already know in it.</p></div>
    <div class="phone rv" style="left:64vw;top:8vh;--d:2"><div class="ph-bar"><i></i><i></i><i></i></div><img data-src="assets/photos/luc-steps.webp" alt=""><div class="ph-tag">Episode · The Road to Dhaba</div></div>` });

  // 15
  slide({ n: '15', label: 'Audience-led stops', bg: YELLOW, ink: BLUE, ghost: 'WHERE?', w: 110, html: `
    <div class="col-l">${num('15')}<h2 class="s-title l rv" style="--d:1">Some stops can come from the audience.</h2>
      <p class="s-body rv lines" style="--d:2">${lines(['Where should he eat?', 'Who should he meet?'])}</p>
      <p class="s-body strong rv" style="--d:3">The people following the journey help shape it.</p></div>
    <div class="phone rv" style="left:64vw;top:8vh;--d:2"><div class="ph-bar"><i></i><i></i><i></i></div><img data-src="assets/photos/del-street.webp" alt="">
      <div class="poll"><b>Where should he eat?</b><span class="ask">Type something…</span></div></div>` });

  // 16
  slide({ n: '16', label: 'Supper clubs', bg: RUST, ink: CREAM, ghost: 'SUPPER', w: 125, html: `
    <div class="col-l">${num('16')}<h2 class="s-title l rv" style="--d:1">Some nights, he sets the table.</h2>
      <p class="s-body rv" style="--d:2">Intimate supper clubs for chefs, writers, creators and tastemakers.</p>
      <p class="s-body rv lines" style="--d:3">${lines(['Dishes get tested.', 'Relationships begin.', 'Guests tell the story.'])}</p>
      ${small('One chapter of the journey, not the whole campaign. Frequency and scale to be agreed based on budget and timeline.')}</div>
    ${plate('pf-jaipur-table', 58, 8, 44, 'tilt-l')}
    ${pol('jai-setting', 98, 34, 30, 3, '', 1.08)}` });

  inter({ label: 'Kochi, Kerala', bg: SKY, w: 110, html: `
    ${pol('koc-boat', 4, 12, 30, -2, 'Kochi, Kerala', .93)}
    ${pol('koc-woman', 38, 6, 44, 2, '', 1.06)}
    ${pol('koc-shop', 66, 10, 34, -1.5, '', .97)}
    <img class="oncoming" data-src="assets/ill/samosa.webp" data-from="115" data-rate="0.7" alt="">` });

  // 17
  slide({ n: '17', label: 'PR', bg: CREAM, ink: BLUE, ghost: 'PRESS', w: 125, html: `
    <div class="col-l">${num('17')}<h2 class="s-title l rv" style="--d:1">One press release is one story.<br><em>The road gives us several.</em></h2>
      ${small('PR builds chapter by chapter towards the opening.')}</div>
    <div class="clips">
      ${["Dhaba's move from Scandinavia to the Gulf.", 'The chef behind it.', 'What he finds in the UAE.', 'The people he cooks with.', 'Saadiyat Grove and the tandoors.']
        .map((t, i) => `<div class="clip rv" style="--d:${i + 2};--i:${i}"><small>Chapter ${String(i + 1).padStart(2, '0')}</small>${t}</div>`).join('')}
    </div>` });

  // 18
  slide({ n: '18', label: 'Paid media', bg: BLUE, ink: CREAM, ghost: 'PAID', w: 130, html: `
    <div class="col-l">${num('18')}<h2 class="s-title l rv" style="--d:1">Paid media follows the same road.</h2></div>
    <ol class="steps">
      <li class="rv" style="--d:2"><b>Introduce.</b> The chef and the Dhaba story.</li>
      <li class="rv" style="--d:3"><b>Carry.</b> The best chapters and collaborators.</li>
      <li class="rv" style="--d:4"><b>Reveal.</b> Saadiyat, the restaurant, the food, the date.</li>
      <li class="rv" style="--d:5"><b>Book.</b> Reservations, retargeting, visits.</li>
    </ol>` });

  // 19
  slide({ n: '19', label: 'Anticipation', bg: PLUM, ink: CREAM, ghost: 'PAYOFF', html: `
    <div class="t-pause left">${num('19')}<h2 class="s-title l rv" style="--d:1">By then, the opening is no longer the first story.</h2>
      <h2 class="s-title xl rv accent" style="--d:2">It's the payoff.</h2></div>` });

  inter({ label: 'On the table', bg: YELLOW, w: 95, html: `
    ${pol('pf-plantain', 6, 8, 40, -2.5, 'From the cookbooks', .93)}
    ${pol('del-seekh', 36, 16, 30, 2, 'Old Delhi', 1.06)}
    ${pol('pf-fish-leaf', 66, 6, 42, -1, '', .97)}
    ${ill('elephant', 50, 28)}` });

  // 20
  slide({ n: '20', label: 'The approach', bg: CREAM, ink: BLUE, ghost: 'SAADIYAT', w: 115, html: `
    <div class="col-l">${num('20')}<h2 class="s-title l rv" style="--d:1">The road narrows.</h2>
      <p class="s-body big rv" style="--d:2">Closer to Saadiyat.</p>
      <p class="s-body rv lines" style="--d:3">${lines(['The site.', 'The team.', 'The kitchen.', 'The first dishes.'])}</p>
      <p class="s-body strong rv" style="--d:4">Some of what he found along the way, on the menu.</p>
      ${small('Opening date (TBC) revealed at this stage.')}</div>
    <div class="narrow rv" style="--d:2"><i></i></div>
    ${milestone(92, 'km 0', 'Saadiyat', GREEN)}` });

  // 21
  slide({ n: '21', label: 'Two fires', bg: TEAL, ink: CREAM, ghost: 'FIRE', w: 130, html: `
    <div class="col-l">${num('21')}<h2 class="s-title l rv" style="--d:1">At the front of the room,<br><em>two fires.</em></h2>
      <p class="s-body rv" style="--d:2">Two signature tandoors.</p>
      <p class="s-body rv lines" style="--d:3">${lines(['Fire.', 'Smoke.', 'Heat.', 'Sound.', 'Hands at work.'])}</p>
      ${small('A visual signature for Dhaba Abu Dhabi, at opening and long after.')}</div>
    ${plate('pf-fire', 58, 8, 50, 'glow')}
    ${pol('luc-fire', 96, 12, 40, 2, '', 1.06)}
    ${ill('tandoor', 114, 34)}` });

  // 22
  slide({ n: '22', label: 'Arrival', bg: GREEN, ink: CREAM, ghost: 'ARRIVAL', w: 115, html: `
    <div class="col-l">${num('22')}<h2 class="s-title m rv lines-title" style="--d:1">He travelled.<br>He tasted.<br>He cooked at other people's tables.</h2>
      <h2 class="s-title l rv accent" style="--d:2">Now he sets his own.</h2></div>
    <div class="col-r shift2"><p class="s-body big rv" style="--d:3">Dhaba Abu Dhabi.<br>Saadiyat Grove.</p>${small('Press launch · VIP night · Opening.')}</div>
    ${ill('falcon', 86, 36)}` });

  // 23
  slide({ n: '23', label: 'The Dhaba Journal', bg: CREAM, ink: BLUE, ghost: 'JOURNAL', w: 120, html: `
    <div class="col-l">${num('23')}<h2 class="s-title l rv" style="--d:1">The road ends at the door.<br><em>The journal doesn't.</em></h2>
      ${small('The chef doesn\'t need to stay on the road. The editorial world continues without it.')}</div>
    <div class="col-r shift"><p class="masthead rv" style="--d:2">THE DHABA JOURNAL</p>
      <p class="s-body rv lines" style="--d:3">${lines(['Food. Fire. Ingredients.', 'Chefs. Guests. Recipes.', 'Abu Dhabi. India.', 'The team. The seasons.'])}</p></div>
    ${ill('bike', 100, 24)}` });

  // PART TWO
  slide({ n: 'II', label: 'Part two: The plan', bg: BLUE, ink: CREAM, ghost: 'PART TWO', html: `
    <div class="t-part"><p class="s-num rv">Part two</p><h2 class="s-title xxl rv" style="--d:1">THE PLAN</h2></div>` });

  // 24
  slide({ n: '24', label: 'Phases', bg: CREAM, ink: BLUE, ghost: 'PHASES', w: 150, html: `
    <div class="col-l">${num('24')}<h2 class="s-title l rv" style="--d:1">The campaign, phase by phase.</h2>
      ${small('The timeline will be set against the confirmed opening date and the chef\'s availability in the UAE.')}</div>
    <div class="phases">
      ${[['00', 'Groundwork.', 'Strategy, collaborator outreach, route planning, account setup.'],
         ['01', 'The Archive.', 'The world behind Dhaba, from existing material.'],
         ['02', 'The Road.', 'The chef in the UAE: chapters, collaborators, supper clubs.'],
         ['03', 'The Approach.', 'Saadiyat, the team, the kitchen, the tandoors, the date.'],
         ['04', 'Arrival.', 'Press launch, VIP night, opening weeks.'],
         ['Then', 'The Dhaba Journal.', 'Ongoing monthly.']]
        .map(([k, t, d], i) => `<div class="phase rv" style="--d:${i + 2}"><b>${k}</b><strong>${t}</strong><span>${d}</span></div>`).join('')}
    </div>` });

  // 25
  slide({ n: '25', label: 'Production', bg: LIME, ink: TEAL, ghost: 'CAPTURE', w: 125, html: `
    <div class="col-l">${num('25')}<h2 class="s-title l rv" style="--d:1">How we capture the road.</h2>
      <p class="s-body rv" style="--d:2">Each selected chapter is produced as one dedicated travel shoot of up to 6 hours, capturing both photo and video.</p>
      <p class="s-body strong rv" style="--d:3">The archive fills the early chapters. New shoots carry the story in the UAE.</p>
      ${small('The number of travel shoots depends on campaign length, budget, the chef\'s availability and the stories and collaborators we select. We film in two modes: crafted (documentary, portraits, food) and collected (phone footage, voice notes, moments on the way).')}</div>
    ${pol('pf-curry-pot', 60, 8, 46, -2, 'Crafted', .95)}
    <div class="phone small rv" style="left:92vw;top:14vh;--d:3"><div class="ph-bar"><i></i><i></i><i></i></div><img data-src="assets/photos/del-candid.webp" alt=""><div class="ph-tag">Collected</div></div>` });

  // 26
  slide({ n: '26', label: 'Social', bg: PINK, ink: BLUE, ghost: 'SOCIAL', w: 125, html: `
    <div class="col-l">${num('26')}<h2 class="s-title l rv" style="--d:1">Social and community, pre-opening.</h2>
      <p class="s-body rv" style="--d:2">Instagram and TikTok.<br>A content calendar built around the chapters, not a fixed weekly quota.</p>
      <p class="s-body rv" style="--d:3">Content comes from the archive, the travel chapters, supper clubs, the restaurant approach and the opening.</p>
      ${small('Includes strategy, calendar, copywriting, editing, platform adaptation, publishing and community management.')}</div>
    <div class="grid9 rv" style="--d:2">
      ${['luc-chai', 'del-snacks', 'koc-cucumber', 'jai-hands', 'luc-lid', 'del-spices', 'koc-stove', 'pf-chicken', 'del-chillies']
        .map(id => `<i><img data-src="assets/photos/${id}.webp" alt=""></i>`).join('')}
    </div>` });

  inter({ label: 'Jaipur, Rajasthan', bg: CREAM, w: 80, html: `
    ${pol('jai-bowls', 6, 10, 34, -2, 'Jaipur, Rajasthan', .94)}
    ${pol('jai-ladle', 44, 6, 44, 2, '', 1.06)}
    ${ill('redchili', 30, 12, 3)}` });

  // 27
  slide({ n: '27', label: 'People and press', bg: SKY, ink: BLUE, ghost: 'PEOPLE', w: 115, html: `
    <div class="col-l">${num('27')}<h2 class="s-title l rv" style="--d:1">People and press.</h2>
      ${small('Collaborators are chosen for fit and credibility, not follower count alone.')}</div>
    <div class="col-r shift">
      <p class="s-body rv" style="--d:2"><b>Collaborators.</b> Identification, outreach, briefing, co-creation and usage rights.</p>
      <p class="s-body rv" style="--d:3"><b>Press.</b> Press kit, media list, story calendar, interviews and supper club invitations.</p>
    </div>
    ${pol('koc-laugh', 94, 34, 28, 2.5, '', 1.05)}` });

  // 28
  slide({ n: '28', label: 'Paid & opening', bg: ORANGE, ink: CREAM, ghost: 'OPENING', w: 115, html: `
    <div class="col-l">${num('28')}<h2 class="s-title l rv" style="--d:1">Paid media and opening.</h2>
      ${small('Media budget is separate from agency fees.')}</div>
    <div class="col-r shift">
      <p class="s-body rv" style="--d:2"><b>Paid.</b> Introduce → Carry → Reveal → Book.</p>
      <p class="s-body rv" style="--d:3"><b>Press launch.</b> Media preview, tasting, chef interviews.</p>
      <p class="s-body rv" style="--d:4"><b>VIP night.</b> A guest list drawn from the people met along the road.</p>
      <p class="s-body rv" style="--d:5"><b>Opening weeks.</b> Coverage of the first nights and first guests.</p>
    </div>` });

  // 29
  slide({ n: '29', label: 'Journal series', bg: CREAM, ink: BLUE, ghost: 'SERIES', w: 150, html: `
    <div class="col-l">${num('29')}<h2 class="s-title l rv" style="--d:1">The Dhaba Journal, every month.</h2>
      <p class="s-body rv" style="--d:2">Recurring series instead of one-off posts.</p>
      ${small('Plus menu launches, seasonal campaigns and events.')}</div>
    <div class="series">
      ${[['luc-biryani', 'The Fire.', 'The tandoors and the craft.'], ['luc-feast', 'At the Table.', 'Guests and stories from the floor.'],
         ['koc-wall', 'Field Notes.', 'Ingredients, producers, discoveries.'], ['koc-smoke', 'Guest Chef.', 'Collaborations.'],
         [null, 'From the Book.', 'Recipes from the cookbooks.'], ['jai-hug', 'The Team.', 'The people behind service.']]
        .map(([id, t, d], i) => `<div class="card rv" style="--d:${i + 2}">${id ? `<i><img data-src="assets/photos/${id}.webp" alt=""></i>` : `<i class="book"><img data-src="assets/ill/tv.webp" alt=""></i>`}<b>${t}</b><span>${d}</span></div>`).join('')}
    </div>` });

  // 30
  slide({ n: '30', label: 'Monthly scope', bg: BLUE, ink: CREAM, ghost: 'SCOPE', w: 150, html: `
    <div class="col-l">${num('30')}<h2 class="s-title l rv" style="--d:1">Monthly scope.</h2>
      ${small('Organic Stories may also be captured around events, shoots and live moments. Media budget is separate.')}</div>
    <div class="scope">
      <div class="rv" style="--d:2"><h4>Social output (Instagram + TikTok)</h4><p>12 posts per month in total, spread across both platforms by format and relevance.</p><p>Reels, video posts, carousels, photography, editorial posts.</p><h4 class="mt">12 designed Stories per month</h4></div>
      <div class="rv" style="--d:3"><h4>Production</h4><p>1 video shoot every month.</p><p>1 photography shoot every other month.</p></div>
      <div class="rv" style="--d:4"><h4>Management</h4><ul><li>Monthly content strategy and calendar.</li><li>Copywriting, platform adaptation, publishing and scheduling.</li><li>Community management.</li><li>Campaign planning.</li><li>Coordination of monthly production.</li><li>Paid media management.</li><li>PR and creator coordination.</li><li>Monthly performance reporting.</li></ul></div>
    </div>` });

  // 30B — PR scope (from the PR partner proposal)
  slide({ n: '30b', label: 'PR scope', bg: MAGENTA, ink: CREAM, ghost: 'PRESS', w: 140, html: `
    <div class="col-l">${num('30b')}<h2 class="s-title l rv" style="--d:1">Recommended PR scope.</h2>
      <p class="s-body rv" style="--d:2">Pre-opening, launch and ongoing PR support for Dhaba Abu Dhabi, Saadiyat Grove.</p></div>
    <div class="scope pr">
      <div class="rv" style="--d:2"><h4>Pre-opening strategy</h4><ul><li>PR strategy, positioning, key messages and launch narrative</li><li>Boilerplate, press release, fact sheet and founder / chef notes</li><li>Media, influencer and KOL mapping across priority sectors</li><li>Pre-opening teaser alert issued to the media</li><li>Community and local group partnership recommendations</li></ul></div>
      <div class="rv" style="--d:3"><h4>Launch</h4><ul><li>Launch announcement and targeted media pitching</li><li>Media / tastemaker preview dinner: invitations, RSVPs and follow-up</li><li>Gifting and hard invites sent to key media</li><li>Priority reviews and approved barter or paid collaborations</li><li>Coverage drive across online, print, broadcast and social editorial</li><li>Reactive press office, reputation and crisis communications support</li></ul></div>
      <div class="rv" style="--d:4"><h4>Post-launch press office</h4><ul><li>Ongoing media relations, story creation and proactive pitching</li><li>Monthly media alert / listings push for offers and seasonal news</li><li>Awards, guides and industry recognition opportunities</li><li>Media monitoring plus a monthly coverage report</li><li>Weekly calls, monthly meetings and forward recommendations</li></ul></div>
    </div>` });

  // 31
  slide({ n: '31', label: 'Measurement', bg: CREAM, ink: BLUE, ghost: 'MEASURE', w: 115, html: `
    <div class="col-l">${num('31')}<h2 class="s-title l rv" style="--d:1">What we measure.</h2>${small('Monthly report and review meeting.')}</div>
    <div class="col-r shift">
      <p class="s-body rv" style="--d:2"><b>Before opening:</b> chapter reach, video views and completion, follower growth, saves and shares, press coverage, collaborator content performance, reservation interest.</p>
      <p class="s-body rv" style="--d:3"><b>After opening:</b> reservations from social and search, engagement, reviews, audience growth, paid media efficiency.</p>
    </div>` });

  // 32
  slide({ n: '32', label: 'The team', bg: GOLD, ink: BLUE, ghost: 'TEAM', w: 115, html: `
    <div class="col-l">${num('32')}<h2 class="s-title l rv" style="--d:1">The team.</h2></div>
    <ul class="roster">
      ${['Creative Director', 'Account Lead', 'Content Strategist and Copywriter', 'Social Media and Community Manager', 'Director / Videographer', 'Photographer', 'Editor', 'PR Lead', 'Paid Media Specialist']
        .map((r, i) => `<li class="rv" style="--d:${i + 2}">${r}</li>`).join('')}
    </ul>` });

  inter({ label: 'Lucknow, Uttar Pradesh', bg: LILAC, w: 80, html: `
    ${pol('luc-shop', 6, 8, 40, -2, 'Lucknow, Uttar Pradesh', .94)}
    ${pol('luc-rickshaw', 46, 12, 38, 2, '', 1.06)}` });

  // 33 — INVESTMENT (totals only)
  slide({ n: '33', label: 'Investment', bg: CREAM, ink: BLUE, ghost: 'AED', w: 125, html: `
    <div class="col-l">${num('33')}<h2 class="s-title l rv" style="--d:1">Investment.</h2>
      ${small('Excludes media budget, collaborator fees, supper club costs, travel, accommodation and third-party production.')}</div>
    <div class="totals">
      <div class="tot rv" style="--d:2"><p class="inv-k">The Road to Dhaba <span>Launch phase · 2 months</span></p><p class="inv-v">AED 86,500</p></div>
      <div class="tot rv" style="--d:3"><p class="inv-k">The Dhaba Journal <span>Ongoing · 10 months</span></p><p class="inv-v">AED 32,383.33 <small>/ month</small></p></div>
      <div class="tot grand rv" style="--d:4"><p class="inv-k">Total · 12 months</p><p class="inv-v">AED 410,333.30</p></div>
      <div class="inv opt rv" style="--d:5">
        <p class="inv-k">Optional, quoted separately</p>
        <ul><li>Additional travel chapter shoots</li><li>Additional creator activations</li><li>Long-form campaign film</li><li>YouTube and long-form content</li><li>Event coverage</li><li>Additional paid media production</li></ul>
      </div>
    </div>` });

  // 33b — MEDIA INVESTMENT + PERFORMANCE MARKETING SCOPE
  slide({ n: '33b', label: 'Media investment', bg: TEAL, ink: CREAM, ghost: 'MEDIA', w: 150, html: `
    <div class="col-l">${num('33b')}<h2 class="s-title l rv" style="--d:1">Media investment.</h2>
      <p class="s-body rv" style="--d:2">Ad spend paid into Meta and Google, separate from agency fees.</p>
      ${small('Google stays very light pre-opening: there is little search demand to capture yet. Meta / Instagram carries the early story.')}</div>
    <div class="media rv" style="--d:2">
      <table>
        <thead><tr><th>Phase</th><th>Meta / Instagram</th><th>Google Search</th><th>Total</th><th>Focus</th></tr></thead>
        <tbody>
          <tr><td>Pre-opening</td><td>AED 3,000/mo</td><td>AED 500/mo</td><td><b>AED 3,500/mo</b></td><td>Awareness · Road to Dhaba content · chef story · audience building · light retargeting</td></tr>
          <tr><td>Launch <small>4–6 weeks</small></td><td>AED 8,000</td><td>AED 4,000</td><td><b>AED 12,000 total</b></td><td>Restaurant reveal · creator amplification · retargeting · reservations · high-intent search</td></tr>
          <tr><td>Ongoing</td><td>AED 4,000/mo</td><td>AED 1,000/mo</td><td><b>AED 5,000/mo</b></td><td>Reservations · seasonal pushes · menu launches · retargeting · branded/local search</td></tr>
        </tbody>
      </table>
    </div>
    <div class="pm rv" style="--d:3">
      <p class="inv-k">Performance marketing scope · Meta / Instagram + Google Search / PPC</p>
      <div class="pm-cols">
        <div><h4>Strategy</h4><ul><li>Paid media strategy</li><li>Audience strategy</li><li>Channel strategy</li><li>Attribution strategy</li><li>Budget allocation</li><li>Campaign planning</li></ul></div>
        <div><h4>Meta / Instagram</h4><ul><li>Awareness campaigns</li><li>Engagement campaigns</li><li>Lead generation campaigns</li><li>Traffic campaigns</li><li>Retargeting campaigns</li><li>Partnership Ads</li></ul></div>
        <div><h4>Google Search / PPC</h4><ul><li>Brand campaigns</li><li>Generic search campaigns</li><li>Event campaigns</li><li>Reservation campaigns</li><li>Group booking campaigns</li><li>Search optimisation</li></ul></div>
        <div><h4>Optimise &amp; report</h4><ul><li>Campaign setup</li><li>Audience optimisation</li><li>Budget optimisation</li><li>Continuous campaign optimisation</li><li>A/B testing</li><li>Performance monitoring</li><li>Monthly reporting</li></ul></div>
      </div>
    </div>` });

  // 34 — CLOSE
  slide({ n: '34', label: 'Close', bg: BLUE, ink: CREAM, ghost: '', w: 100, end: true, html: `` });

  // ---------- build ----------
  const track = document.getElementById('track');
  let k = 0;
  P.forEach(p => { if (p.kind === 'slide') { p.n = String(k++).padStart(2, '0'); p.html = p.html.replaceAll('%%N%%', p.n); } });
  window.DECK_LAST = P.filter(p => p.kind === 'slide').length - 1;
  track.innerHTML = P.map((p, i) =>
    `<section class="stop ${p.kind}${p.end ? ' end' : ''}" data-kind="${p.kind}" data-n="${p.n || ''}" data-label="${p.label || ''}" data-bg="${p.bg}" data-ink="${p.ink}" data-ghost="${p.ghost || ''}" data-w="${p.w}">${p.html}</section>`
  ).join('');
})();
