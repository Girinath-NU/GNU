/* Builds the page from window.portfolioConfig. You normally never edit this file. */
(function (w) {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const url = u => { u = String(u || '').trim(); return /^(https?:|mailto:|tel:|#)/i.test(u) || /^[\w\-./%]+$/.test(u) ? esc(u) : ''; };
  const arr = a => (Array.isArray(a) ? a : []).filter(Boolean);
  const ICONS = ['<path d="M3 12h3l2-6 4 12 3-9 2 3h4"/>', '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/>', '<circle cx="12" cy="12" r="3"/><path d="M5 12a7 7 0 0 1 14 0M2 12a10 10 0 0 1 20 0"/>'];
  const VIS = ['packets', 'sar', 'imu', 'phase', 'gnss', 'scope'];
  const LABELS = { github: 'GitHub', linkedin: 'LinkedIn', leetcode: 'LeetCode', portfolio: 'Portfolio' };

  function build(U) {
    const P = U.personal || {}, R = U.resume || {}, H = U.hero || {}, B = H.buttons || {}, S = U.sections || {}, site = U.site || {}, C = U.contact || {};
    let n = 0; const nav = [];
    const sec = (id, navDef, eyebrow, title, body) => {
      const s = S[id] || {};
      if (!body || s.enabled === false) return '';
      n++; nav.push(`<li><a href="#${id}">${esc(s.nav || navDef)}</a></li>`);
      return `<section class="s rv" id="${id}"><div class="mono">${String(n).padStart(2, '0')} · ${esc(s.eyebrow || eyebrow)}</div><h2>${esc(s.title || title)}</h2>${body}</section>`;
    };
    const chips = t => arr(t).map(x => `<span class="chip">${esc(x)}</span>`).join('');
    const initials = esc(P.initials || String(P.name || '').split(/\s+/).map(x => x[0]).join('').slice(0, 3)).toUpperCase();

    /* hero */
    const resumeHref = R.file ? url(R.file) + (R.lastUpdated ? '?v=' + encodeURIComponent(R.lastUpdated) : '') : '';
    const hero = `<div class="mono">${esc(H.eyebrow)}</div><h1>${esc(String(P.name || '').toUpperCase())}</h1><div class="tag">${esc(P.tagline)}</div><p class="d">${esc(P.intro)}</p><div class="btns"><a class="btn p" href="#missions">${esc(B.missions || 'Explore Missions')}</a><a class="btn" href="#contact">${esc(B.contact || 'Establish Connection')}</a>${resumeHref ? `<a class="btn" href="${resumeHref}" download="${esc(R.fileName || 'Resume.pdf')}">${esc(B.resume || 'Download Resume')}</a>` : ''}${resumeHref && R.showViewButton ? `<a class="btn" href="${resumeHref}" target="_blank" rel="noopener">${esc(B.viewResume || 'View Resume')}</a>` : ''}</div>`;
    const hudA = `<div><span></span>${esc(H.hudTop)}</div><div>${esc(H.missionClass)}</div>`;
    const hudB = `<div>${esc(H.signalStatus)}</div><div id="tel">AZ 000.0° · EL 00.0°</div>`;

    /* about */
    const A = U.about || {}, img = url(P.profileImage);
    const about = (P.name || A.summary) ? `<div class="gl id"><div class="ph${img ? '' : ' nophoto'}" data-i="${initials}">${img ? `<img alt="${esc(P.profileAlt || P.name)}" src="${img}" onerror="this.parentNode.classList.add('nophoto');this.remove()">` : ''}</div><div><div class="mono">${esc(A.idLine)}</div><p style="margin-top:12px">${esc(A.summary)}</p><dl class="kv">${arr(A.details).filter(d => d.value).map(d => `<dt>${esc(d.label)}</dt><dd>${esc(d.value)}</dd>`).join('')}</dl></div></div>` : '';

    /* projects */
    const O = U.projectsOptions || {}, ps = arr(U.projects).map(p => ({
      title: esc(p.title), desc: esc(p.description), cat: esc(p.category), year: esc(p.year), featured: !!p.featured,
      visual: VIS.includes(p.visual) ? p.visual : 'scope', image: url(p.image), github: url(p.github), demo: url(p.demo),
      tags: arr(p.tags).map(esc), objective: esc(p.objective || p.description), approach: esc(p.approach), details: esc(p.details),
      concepts: arr(p.concepts).map(esc), work: esc(p.work)
    }));
    if (O.featuredFirst) ps.sort((a, b) => b.featured - a.featured);
    const pl = (S.missions || {}).cardLabel || 'Mission';
    const cards = ps.map((p, i) => {
      p.label = `${p.featured ? '★ ' : ''}${esc(pl)} ${String(i + 1).padStart(2, '0')}${p.cat ? ' · ' + p.cat : ''}${p.year ? ' · ' + p.year : ''}`;
      const cv = `<canvas data-m="${p.visual}" height="190"${p.image ? ' style="display:none"' : ''}></canvas>`;
      const m = p.image ? `<img class="pimg" loading="lazy" src="${p.image}" alt="${p.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">${cv}` : cv;
      return `${m}<div><div class="mono">${p.label}</div><h3>${p.title}</h3>${p.desc ? `<p style="color:var(--mut);font-size:.9rem;margin:-4px 0 12px">${p.desc}</p>` : ''}<div class="chips">${p.tags.slice(0, 4).map(t => `<span class="chip">${t}</span>`).join('')}</div></div>`;
    });

    /* expertise */
    const skills = arr(U.skills).filter(s => arr(s.items).length).map(s => ({ cat: esc(s.category), icon: ICONS[(s.icon | 0) % 3], items: arr(s.items).map(esc) }));
    const svc = arr(U.services);
    const expertise = skills.length || svc.length ? (skills.length ? '<div class="tabs" role="tablist" id="tabs"></div><div class="gl eq" id="eq" role="tabpanel"></div>' : '') + (svc.length ? `<div class="grid" style="margin-top:22px">${svc.map(x => `<div class="gl" style="padding:22px"><h3 style="font-size:1.05rem">${esc(x.title)}</h3><p style="color:var(--mut);margin-top:6px">${esc(x.description)}</p></div>`).join('')}</div>` : '') : '';

    /* research */
    const ex = arr(U.experience);
    const research = ex.length ? `<div class="lab"><div style="display:grid;gap:22px">${ex.map(e => `<div class="gl"><div class="mono">${esc(e.period)}</div><h3 style="margin:8px 0">${esc(e.role)}</h3><p>${esc(e.org)}</p>${e.summary ? `<p style="color:var(--mut);margin-top:10px">${esc(e.summary)}</p>` : ''}${arr(e.tags).length ? `<div class="chips" style="margin-top:16px">${chips(e.tags)}</div>` : ''}</div>`).join('')}</div><div class="gl"><div class="mono">DSO · Oscilloscope trace</div><canvas data-m="scope" height="150"></canvas><div class="mono" style="margin-top:14px">Signal analyzer · Spectrum</div><canvas data-m="spec" height="150"></canvas></div></div>` : '';

    /* leadership */
    const pos = arr(U.positions), ach = arr(U.achievements);
    let org = '';
    if (pos.length) {
      const k = pos.length, nodes = pos.map((p, i) => { const a = Math.PI + i * 2 * Math.PI / k, x = Math.round(400 + 270 * Math.cos(a)), y = Math.round(190 + 120 * Math.sin(a)); return { x, y, p }; });
      org = `<div class="gl org"><svg viewBox="0 0 800 380" role="img" aria-label="Network of leadership roles"><g stroke="rgba(0,229,255,.25)" fill="none"><ellipse cx="400" cy="190" rx="300" ry="120"/><ellipse cx="400" cy="190" rx="170" ry="70"/></g><g stroke="rgba(57,123,255,.45)">${nodes.map(o => `<line x1="400" y1="190" x2="${o.x}" y2="${o.y}"/>`).join('')}</g><circle cx="400" cy="190" r="34" fill="rgba(0,229,255,.12)" stroke="#00E5FF"/><text x="400" y="195" text-anchor="middle">${initials}</text>${nodes.map(o => `<g><circle class="n" cx="${o.x}" cy="${o.y}" r="14"/><text x="${o.x}" y="${o.y - 30}" text-anchor="middle">${esc(o.p.role)}</text><text class="sm" x="${o.x}" y="${o.y + 34}" text-anchor="middle">${esc([o.p.org, o.p.period].filter(Boolean).join(' · '))}</text></g>`).join('')}</svg></div>`;
    }
    if (ach.length) org += `<div class="gl" style="padding:22px;margin-top:22px"><div class="mono">Achievements</div><ul style="padding-left:20px;margin-top:10px">${ach.map(a => `<li><b>${esc(a.title)}</b>${a.year ? ' · ' + esc(a.year) : ''}${a.description ? ' — <span style="color:var(--mut)">' + esc(a.description) + '</span>' : ''}</li>`).join('')}</ul></div>`;

    /* education */
    const tl = (items) => items.length ? `<div class="tl">${items.join('')}</div>` : '';
    const edu = arr(U.education).map(e => `<div><div class="mono">${esc(e.period)}</div><h3>${esc(e.title)}</h3><p>${esc([e.institute, e.details].filter(Boolean).join(' · '))}</p></div>`);
    const cer = arr(U.certifications).map(c => { const t = c.link && url(c.link) ? `<a href="${url(c.link)}" target="_blank" rel="noopener">${esc(c.title)}</a>` : esc(c.title); return `<div><div class="mono">${esc(c.date)}</div><h3>${t}</h3>${c.note ? `<p>${esc(c.note)}</p>` : ''}</div>`; });
    const education = edu.length && cer.length ? `<div class="two">${tl(edu)}${tl(cer)}</div>` : tl(edu) + tl(cer);

    /* contact */
    const disp = u => String(u).replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    const row = (label, text, href, ext) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span class="mono">${esc(label)}</span>${esc(text)}</a>`;
    const links = [P.email && row('Email', P.email, 'mailto:' + url(P.email)), P.phone && row('Phone', P.phone, 'tel:' + esc(String(P.phone).replace(/[^\d+]/g, ''))),
      ...Object.entries(U.socialLinks || {}).filter(([, v]) => url(v)).map(([k, v]) => row(LABELS[k] || k.charAt(0).toUpperCase() + k.slice(1), disp(v), url(v), true))].filter(Boolean).join('');
    const loc = P.location ? `<p style="color:var(--mut);margin-top:14px">${esc(P.location)}</p>` : '';
    const contact = `<div class="two"><div class="ct"><p style="color:var(--mut);margin-bottom:18px">${esc(C.text)}</p>${links}${loc}</div><form class="gl" id="cf" novalidate data-endpoint="${url(C.formEndpoint) || '/api/contact'}"><label>Name<input name="name" required maxlength="100" autocomplete="name"></label><label>Email<input name="email" type="email" required maxlength="200" autocomplete="email"></label><label>Subject<input name="subject" required maxlength="150"></label><label>Message<textarea name="message" rows="5" required maxlength="4000"></textarea></label><input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn p" id="sb" type="submit" data-l="${esc(C.submitLabel || 'Send')}">${esc(C.submitLabel || 'Send')}</button><div id="st" role="status" aria-live="polite"></div></form></div>`;

    const main = sec('about', 'About', 'Personnel Identification', 'About', about) + sec('missions', 'Missions', 'Featured Missions', 'Projects', ps.length ? '<div class="grid" id="pg"></div>' : '') +
      sec('expertise', 'Expertise', 'Technical Expertise', 'Skills', expertise) + sec('research', 'Research', 'Research Experience', 'Experience', research) +
      sec('leadership', 'Leadership', 'Leadership & Community', 'Leadership', org) + sec('education', 'Education', 'Education & Certifications', 'Education', education) +
      sec('contact', 'Contact', 'Establish Communication', C.heading || 'Contact', contact);
    return { title: site.title, desc: site.description, brand: site.brand, nav: nav.join(''), hudA, hudB, hero, main, foot: esc(site.footer), projects: ps, cards, skills };
  }
  w.PortfolioRender = { build };

  /* ---- DOM wiring (browser only) ---- */
  if (typeof document === 'undefined' || !w.portfolioConfig) return;
  const r = build(w.portfolioConfig), $ = id => document.getElementById(id);
  if (r.title) document.title = r.title;
  const md = document.querySelector('meta[name=description]'); if (md && r.desc) md.content = r.desc;
  if (r.brand) document.querySelector('nav b').textContent = r.brand;
  $('nl').innerHTML = r.nav; $('hudA').innerHTML = r.hudA; $('hudB').innerHTML = r.hudB; $('heroC').innerHTML = r.hero; $('app').innerHTML = r.main; $('foot').innerHTML = r.foot;
  w.__P = r.projects;
  const pg = $('pg');
  if (pg) r.cards.forEach((h, i) => { const b = document.createElement('button'); b.className = 'gl pc'; b.innerHTML = h; b.onclick = () => w.openM(i, b); pg.appendChild(b); });
  const tb = $('tabs'), eq = $('eq');
  if (tb) {
    const show = i => { [...tb.children].forEach((b, j) => b.setAttribute('aria-selected', j === i)); eq.innerHTML = r.skills[i].items.map(x => `<div><svg viewBox="0 0 24 24">${r.skills[i].icon}</svg><span>${x}</span></div>`).join(''); };
    r.skills.forEach((s, i) => { const b = document.createElement('button'); b.setAttribute('role', 'tab'); b.innerHTML = s.cat; b.onclick = () => show(i); tb.appendChild(b); });
    show(0);
  }
})(typeof window !== 'undefined' ? window : globalThis);
