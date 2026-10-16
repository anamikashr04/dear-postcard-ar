/* Dear Postcard – AR animations
   Each printed card/sticker is one image target (order = order in targets.mind).
   Animations are drawn on a transparent canvas laid exactly over the print,
   in the same pixel coordinates as the design files. */
(function () {
  var TARGETS = [
    { file: 'moon.png',             w: 397, h: 559, m: 40,  anim: 'moon' },
    { file: 'csmt.png',             w: 559, h: 397, m: 40,  anim: 'csmt' },
    { file: 'diwali.png',           w: 559, h: 397, m: 40,  anim: 'diwali' },
    { file: 'christmas.png',        w: 559, h: 397, m: 220, anim: 'christmas' },
    { file: 'newyear.png',          w: 559, h: 397, m: 40,  anim: 'newyear' },
    { file: 'torii-portrait.png',   w: 397, h: 559, m: 20,  anim: 'sakura' },
    { file: 'torii-landscape.png',  w: 559, h: 397, m: 20,  anim: 'sakura' },
    { file: 'sticker-mumbai.png',   w: 284, h: 284, m: 70,  anim: 'stickerMumbai' },
    { file: 'sticker-navi.png',     w: 284, h: 284, m: 70,  anim: 'stickerNavi' },
    { file: 'sticker-cat.png',      w: 284, h: 284, m: 80,  anim: 'cat' },
    { file: 'sticker-fah.png',      w: 284, h: 284, m: 90,  anim: 'fah' }
  ];

  var INK = '#1D1D1B';
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function shape(ctx, fill, lw) { ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); } }
  function circle(ctx, x, y, r, fill, lw) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); shape(ctx, fill, lw); }
  function star4(ctx, x, y, r, col, a) {
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath();
    ctx.moveTo(x, y - r); ctx.lineTo(x + r * 0.22, y - r * 0.22); ctx.lineTo(x + r, y); ctx.lineTo(x + r * 0.22, y + r * 0.22);
    ctx.lineTo(x, y + r); ctx.lineTo(x - r * 0.22, y + r * 0.22); ctx.lineTo(x - r, y); ctx.lineTo(x - r * 0.22, y - r * 0.22);
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function petal(ctx, x, y, rot, s, col) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath();
    ctx.moveTo(0, -5); ctx.bezierCurveTo(4, -4, 4, 3, 0, 5); ctx.bezierCurveTo(-4, 3, -4, -4, 0, -5); ctx.fill(); ctx.restore();
  }
  function shootingStar(ctx, x, y, len, p) {
    var a = p < 0.15 ? p / 0.15 : (p > 0.75 ? (1 - p) / 0.25 : 1);
    var hx = x - len * p, hy = y + len * 0.55 * p;
    var g = ctx.createLinearGradient(hx, hy, hx + 70, hy - 38);
    g.addColorStop(0, 'rgba(255,255,255,' + a + ')'); g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 70, hy - 38); ctx.stroke();
    circle(ctx, hx, hy, 1.8, 'rgba(255,255,255,' + a + ')');
  }

  /* ---------- vehicle sprites (same drawing as the printed card) ---------- */
  function taxi(ctx, x, y, s, wheelT) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-32, -379);
    ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(62, 346); ctx.lineTo(76, 322); ctx.lineTo(130, 322); ctx.lineTo(146, 346); ctx.closePath(); shape(ctx, '#FFC300', 2.5);
    ctx.beginPath(); ctx.moveTo(80, 343); ctx.lineTo(88, 327); ctx.lineTo(102, 327); ctx.lineTo(102, 343); ctx.closePath();
    ctx.moveTo(107, 343); ctx.lineTo(107, 327); ctx.lineTo(126, 327); ctx.lineTo(136, 343); ctx.closePath(); shape(ctx, '#BDE4F4', 2.5);
    rr(ctx, 94, 313, 22, 9, 2); shape(ctx, '#FFC300', 2.5);
    rr(ctx, 38, 344, 128, 22, 9); shape(ctx, INK, 2.5);
    ctx.fillStyle = '#FFC300'; ctx.fillRect(56, 350, 96, 3);
    circle(ctx, 160, 351, 3.5, '#FFF1A8', 2);
    [68, 136].forEach(function (cx) {
      circle(ctx, cx, 368, 11, INK, 2.5); circle(ctx, cx, 368, 4, '#CFCFCF', 2);
      ctx.strokeStyle = '#CFCFCF'; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(cx, 368); ctx.lineTo(cx + 8 * Math.cos(wheelT), 368 + 8 * Math.sin(wheelT)); ctx.stroke();
    });
    ctx.restore();
  }
  function bus(ctx, x, y, s, wheelT) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-356, -360); ctx.lineJoin = 'round';
    rr(ctx, 362, 266, 164, 80, 9); shape(ctx, '#E63B2E', 2.5);
    ctx.fillStyle = '#BDE4F4'; ctx.fillRect(374, 274, 144, 20); ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.strokeRect(374, 274, 144, 20);
    ctx.fillStyle = '#FFF3DC'; ctx.fillRect(362, 298, 164, 5);
    ctx.fillStyle = '#BDE4F4'; ctx.fillRect(388, 307, 130, 18); ctx.strokeRect(388, 307, 130, 18);
    ctx.fillRect(366, 306, 16, 26); ctx.strokeRect(366, 306, 16, 26);
    ctx.lineWidth = 1.6; ctx.beginPath();
    for (var i = 392; i <= 500; i += 18) { ctx.moveTo(i, 274); ctx.lineTo(i, 294); }
    for (var j = 406; j <= 496; j += 18) { ctx.moveTo(j, 307); ctx.lineTo(j, 325); }
    ctx.stroke();
    circle(ctx, 366, 338, 3, '#FFF1A8', 2);
    [398, 492].forEach(function (cx) {
      circle(ctx, cx, 348, 12, INK, 2.5); circle(ctx, cx, 348, 4.5, '#CFCFCF', 2);
      ctx.strokeStyle = '#CFCFCF'; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(cx, 348); ctx.lineTo(cx + 9 * Math.cos(-wheelT), 348 + 9 * Math.sin(-wheelT)); ctx.stroke();
    });
    ctx.restore();
  }
  function bubble(ctx, x, y, text, p, col) {
    var s = p < 0.2 ? p / 0.2 * 1.1 : (p < 0.3 ? 1.1 - (p - 0.2) : 1);
    var a = p > 0.85 ? (1 - p) / 0.15 : 1;
    ctx.save(); ctx.globalAlpha = Math.max(0, a); ctx.translate(x, y); ctx.scale(s, s);
    ctx.font = '800 18px "Baloo 2", system-ui, sans-serif'; var w = ctx.measureText(text).width + 22;
    rr(ctx, -w / 2, -17, w, 30, 15); shape(ctx, col || '#FFFFFF', 2.5);
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, -1);
    ctx.restore();
  }

  /* ---------------- animations ---------------- */
  var ANIMS = {};

  ANIMS.moon = {
    init: function (st) {
      st.glints = []; for (var i = 0; i < 46; i++) st.glints.push({ x: rnd(125, 255), y: rnd(414, 500), w: rnd(8, 26), ph: rnd(0, 6.28), sp: rnd(1.5, 3.5) });
      st.stars = [[70, 96], [248, 66], [40, 300], [150, 40], [230, 120], [30, 180], [110, 260]];
      st.leaves = []; for (var j = 0; j < 4; j++) st.leaves.push({ ph: j * 2.4 });
    },
    draw: function (ctx, t, st) {
      st.glints.forEach(function (g) {
        var a = 0.5 + 0.5 * Math.sin(t * g.sp + g.ph); var fade = 1 - (g.y - 414) / 100;
        ctx.globalAlpha = a * fade * 0.9; ctx.fillStyle = '#FFF0BE';
        ctx.fillRect(g.x - g.w / 2 + Math.sin(t * 0.8 + g.ph) * 4, g.y, g.w, 1.8);
      });
      ctx.globalAlpha = 1;
      st.stars.forEach(function (s, i) { star4(ctx, s[0], s[1], 4 + 3 * Math.abs(Math.sin(t * 1.3 + i)), '#FFFFFF', 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i))); });
      st.leaves.forEach(function (l) {
        var p = ((t + l.ph) % 9.6) / 9.6; var x = 380 - p * 260 + Math.sin(p * 12) * 18; var y = 60 + p * 380;
        ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(p * 10) * 0.8 + 2.6); ctx.globalAlpha = p > 0.85 ? (1 - p) / 0.15 : 1;
        ctx.fillStyle = '#163A45'; ctx.beginPath(); ctx.ellipse(0, 0, 16, 3.4, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      });
    }
  };

  ANIMS.csmt = {
    init: function (st) { st.birds = [[418, 306], [446, 308], [478, 306]]; },
    draw: function (ctx, t, st, w) {
      var T = t % 9;
      /* sun rays */
      ctx.save(); ctx.translate(500, 42); ctx.rotate(t * 0.6); ctx.strokeStyle = INK; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.beginPath();
      for (var k = 0; k < 10; k++) { var a = k * Math.PI / 5; ctx.moveTo(Math.cos(a) * 30, Math.sin(a) * 30); ctx.lineTo(Math.cos(a) * 38, Math.sin(a) * 38); }
      ctx.stroke(); ctx.restore();
      /* taxi zooms right in the near lane, bus rolls left in the same lane later */
      if (T < 4.5) { var p = T / 4.5; taxi(ctx, -150 + p * (w + 300), 397, 0.62, T * 14); bubble(ctx, -95 + p * (w + 300), 340, 'PAWP PAWP!', (T % 1.5) / 1.5, '#FFC93C'); }
      else { var q = (T - 4.5) / 4.5; bus(ctx, w + 30 - q * (w + 260), 396, 0.5, T * 10); }
      /* pigeons take off */
      var bp = Math.min(1, Math.max(0, (T - 1) / 3.5));
      st.birds.forEach(function (b, i) {
        var x = b[0] + bp * (60 + i * 30), y = b[1] - bp * (180 + i * 25), f = Math.sin(t * 18 + i) * 5;
        ctx.globalAlpha = bp > 0.85 ? (1 - bp) / 0.15 : (bp > 0 ? 1 : 0);
        ctx.strokeStyle = INK; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x - 9, y - f); ctx.quadraticCurveTo(x - 4, y - 4, x, y); ctx.quadraticCurveTo(x + 4, y - 4, x + 9, y - f); ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }
  };

  ANIMS.diwali = {
    init: function (st) { st.bursts = []; st.next = 0; st.flames = [[196, 336], [364, 336], [232, 358], [328, 358]]; },
    draw: function (ctx, t, st, w) {
      var cols = ['#FFD23F', '#FF7AA2', '#5CE1D8', '#FF9F1C', '#FFFFFF', '#B78CFF'];
      if (t > st.next) {
        var bx = rnd(50, w - 50), by = rnd(50, 150), c = cols[Math.floor(rnd(0, cols.length))], parts = [];
        for (var i = 0; i < 36; i++) { var a = i / 36 * Math.PI * 2, sp = rnd(50, 90); parts.push({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp }); }
        st.bursts.push({ x: bx, y: by, t0: t, c: c, parts: parts }); st.next = t + rnd(0.5, 0.9);
      }
      st.bursts = st.bursts.filter(function (b) { return t - b.t0 < 2.2; });
      st.bursts.forEach(function (b) {
        var dt = t - b.t0;
        if (dt < 0.45) {
          var ry = 397 - (397 - b.y) * (dt / 0.45);
          ctx.strokeStyle = 'rgba(255,230,160,0.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(b.x, ry + 18); ctx.lineTo(b.x, ry); ctx.stroke();
          return;
        }
        var e = dt - 0.45, a = Math.max(0, 1 - e / 1.7);
        ctx.fillStyle = b.c; ctx.globalAlpha = a;
        b.parts.forEach(function (p) {
          var x = b.x + p.vx * e, y = b.y + p.vy * e + 30 * e * e;
          ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = a * 0.35; ctx.beginPath(); ctx.arc(x - p.vx * 0.04, y - p.vy * 0.04, 1.4, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = a;
        });
        if (e < 0.15) { ctx.globalAlpha = 1 - e / 0.15; circle(ctx, b.x, b.y, 22 * (e / 0.15) + 4, '#FFF8E0'); }
        ctx.globalAlpha = 1;
      });
      /* diya flames wiggle */
      st.flames.forEach(function (f, i) {
        var s = 1 + 0.18 * Math.sin(t * 11 + i * 2), sw = Math.sin(t * 7 + i) * 2.2;
        var g = ctx.createRadialGradient(f[0], f[1], 0, f[0], f[1], 22); g.addColorStop(0, 'rgba(255,200,80,0.55)'); g.addColorStop(1, 'rgba(255,200,80,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f[0], f[1], 22, 0, Math.PI * 2); ctx.fill();
        ctx.save(); ctx.translate(f[0], f[1] + 8); ctx.scale(s, s);
        ctx.beginPath(); ctx.moveTo(0, -20); ctx.bezierCurveTo(sw - 6, -10, -6, -2, 0, 0); ctx.bezierCurveTo(6, -2, sw + 6, -10, 0, -20); shape(ctx, '#FFD23F', 2);
        ctx.beginPath(); ctx.moveTo(0, -12); ctx.bezierCurveTo(sw - 2, -7, -2, -2, 0, -1); ctx.bezierCurveTo(2, -2, sw + 2, -7, 0, -12); shape(ctx, '#FF6B35');
        ctx.restore();
      });
      /* sparkler sparks */
      for (var k = 0; k < 10; k++) {
        var a2 = rnd(0, 6.28), l = rnd(6, 20);
        ctx.strokeStyle = k % 2 ? '#FFD23F' : '#FFFFFF'; ctx.lineWidth = 1.4; ctx.beginPath();
        ctx.moveTo(147 + Math.cos(a2) * 4, 246 + Math.sin(a2) * 4); ctx.lineTo(147 + Math.cos(a2) * l, 246 + Math.sin(a2) * l); ctx.stroke();
      }
    }
  };

  function reindeer(ctx, x, y, t, i, nose) {
    var g = Math.sin(t * 10 + i) * 6;
    ctx.save(); ctx.translate(x, y); ctx.strokeStyle = '#5A3A1E'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-8, 4); ctx.lineTo(-12 - g * 0.6, 14); ctx.moveTo(8, 4); ctx.lineTo(12 + g * 0.6, 13); ctx.stroke();
    ctx.fillStyle = '#9A6436'; ctx.beginPath(); ctx.ellipse(0, 0, 14, 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-10, -2); ctx.lineTo(-16, -10); ctx.lineWidth = 5; ctx.strokeStyle = '#9A6436'; ctx.stroke();
    circle(ctx, -18, -12, 5, '#9A6436');
    ctx.strokeStyle = '#5A3A1E'; ctx.lineWidth = 1.8; ctx.beginPath();
    ctx.moveTo(-17, -16); ctx.lineTo(-14, -26); ctx.lineTo(-10, -28); ctx.moveTo(-15, -22); ctx.lineTo(-20, -27); ctx.stroke();
    circle(ctx, -23, -11, nose ? 2.6 : 1.6, nose ? '#FF3B3B' : '#3A2410');
    ctx.restore();
  }
  function sleigh(ctx, x, y, t) {
    ctx.save(); ctx.translate(x, y);
    ctx.strokeStyle = '#E7C36A'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(-26, 16); ctx.lineTo(26, 16); ctx.quadraticCurveTo(36, 16, 34, 6); ctx.moveTo(-26, 16); ctx.quadraticCurveTo(-34, 14, -30, 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-24, 12); ctx.lineTo(24, 12); ctx.lineTo(30, -6); ctx.lineTo(10, -2); ctx.lineTo(-20, -2); ctx.closePath(); shape(ctx, '#D62828', 1.5);
    circle(ctx, 4, -12, 9, '#D62828'); circle(ctx, 4, -24, 6, '#F2C29B');
    ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(1, -19, 6, 5, 0, 0, Math.PI); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-2, -28); ctx.lineTo(12, -30); ctx.lineTo(16, -36); ctx.closePath(); shape(ctx, '#D62828'); circle(ctx, 16, -37, 2.4, '#FFFFFF');
    ctx.fillStyle = '#7A4B2E'; rr(ctx, 14, -16, 12, 12, 3); ctx.fill();
    ctx.restore();
  }
  ANIMS.christmas = {
    init: function (st, w, h) { st.flakes = []; for (var i = 0; i < 110; i++) st.flakes.push({ x: rnd(0, w), y: rnd(-h, h), r: rnd(1, 3), s: rnd(18, 42), ph: rnd(0, 6.28) }); },
    draw: function (ctx, t, st, w, h, m) {
      var T = t % 11;
      /* Santa from top-right (outside the card) to the left, then gone */
      if (T > 2.5 && T < 9.5) {
        var p = (T - 2.5) / 7, x = w + m - 20 - p * (w + 2 * m + 60), y = -m + 70 + p * 130 + Math.sin(t * 3) * 5;
        ctx.globalAlpha = p > 0.85 ? (1 - p) / 0.15 : 1;
        for (var k = 0; k < 14; k++) star4(ctx, x + 40 + k * 9, y + 6 - k * 1.5 + Math.sin(t * 9 + k) * 2, 2 + (k % 3), '#FFE9A8', Math.max(0, 0.8 - k * 0.055));
        ctx.strokeStyle = '#C9A050'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - 20, y); ctx.lineTo(x - 110, y + 2); ctx.stroke();
        sleigh(ctx, x, y, t); reindeer(ctx, x - 52, y + 2, t, 0); reindeer(ctx, x - 82, y, t, 1); reindeer(ctx, x - 112, y - 2, t, 2, true);
        ctx.globalAlpha = 1;
      }
      /* snow, kept inside the card */
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
      st.flakes.forEach(function (f) {
        var y = ((f.y + t * f.s) % (h + 20)) - 10; var x = f.x + Math.sin(t + f.ph) * 8;
        circle(ctx, x, y, f.r, 'rgba(255,255,255,0.92)');
      });
      ctx.restore();
      /* snowman winks twice */
      if ((T > 1.0 && T < 1.25) || (T > 1.6 && T < 1.85)) {
        circle(ctx, 222, 191, 4.6, '#FFFFFF');
        ctx.strokeStyle = '#111111'; ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(217.5, 191); ctx.quadraticCurveTo(222, 195, 226.5, 191); ctx.stroke();
      }
    }
  };

  ANIMS.newyear = {
    init: function (st, w) { st.conf = []; for (var i = 0; i < 70; i++) st.conf.push({ x: rnd(0, w), y: rnd(-400, 0), s: rnd(40, 90), r: rnd(0, 6), vr: rnd(-4, 4), c: ['#FFC93C', '#5CE1D8', '#FFF3DC', '#6A4C9C', '#E2502E'][i % 5] }); },
    draw: function (ctx, t, st, w, h) {
      var T = t % 7;
      st.conf.forEach(function (c) {
        var y = ((c.y + t * c.s) % (h + 420)) - 20;
        ctx.save(); ctx.translate(c.x + Math.sin(t * 2 + c.r) * 10, y); ctx.rotate(c.r + t * c.vr); ctx.fillStyle = c.c; ctx.fillRect(-4, -2, 8, 4); ctx.restore();
      });
      for (var k = 0; k < 3; k++) { var a = t * 4 + k * 2.09; star4(ctx, 92 + Math.cos(a) * 30, 252 + Math.sin(a) * 10, 6, '#FFD23F', 1); }
      if (T < 2.2) bubble(ctx, 78, 160, 'WHOOPS!', T / 2.2, '#FFF3DC');
      ctx.save(); ctx.translate(168, 344); ctx.rotate(Math.sin(t * 5) * 0.25); ctx.strokeStyle = '#FFF3DC'; ctx.lineWidth = 2.4; ctx.beginPath();
      ctx.moveTo(-34, -6); ctx.lineTo(-44, -14); ctx.moveTo(34, -6); ctx.lineTo(44, -14); ctx.stroke(); ctx.restore();
    }
  };

  ANIMS.sakura = {
    init: function (st, w, h) {
      st.petals = []; for (var i = 0; i < 55; i++) st.petals.push({ x: rnd(-20, w + 20), y: rnd(-h, h), s: rnd(14, 34), sz: rnd(0.7, 1.4), r: rnd(0, 6), vr: rnd(-2, 2), ph: rnd(0, 6), c: ['#FFC2DA', '#F7A8C8', '#FFD9E8', '#F27BAE'][i % 4] });
      st.next = 0.6; st.stars = [];
    },
    draw: function (ctx, t, st, w, h) {
      if (t > st.next) { st.stars.push({ x: rnd(w * 0.35, w), y: rnd(10, h * 0.3), t0: t, len: rnd(120, 200) }); st.next = t + rnd(1.8, 3.2); }
      st.stars = st.stars.filter(function (s) { return t - s.t0 < 1.1; });
      st.stars.forEach(function (s) { shootingStar(ctx, s.x, s.y, s.len, (t - s.t0) / 1.1); });
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
      st.petals.forEach(function (p) {
        var y = ((p.y + t * p.s) % (h + 30)) - 15; var x = p.x + Math.sin(t * 0.9 + p.ph) * 18 - (t * 6 % 40);
        petal(ctx, x, y, p.r + t * p.vr, p.sz, p.c);
      });
      ctx.restore();
    }
  };

  function sparkles(ctx, t, pts) { pts.forEach(function (s, i) { var a = Math.abs(Math.sin(t * 2 + i * 1.3)); star4(ctx, s[0], s[1], 4 + 5 * a, i % 2 ? '#FFFFFF' : '#FFE27A', 0.3 + 0.7 * a); }); }
  ANIMS.stickerMumbai = {
    init: function () {},
    draw: function (ctx, t) {
      sparkles(ctx, t, [[20, 40], [262, 30], [-20, 160], [300, 150], [40, 290], [250, 280], [142, -30]]);
      ctx.strokeStyle = '#1D1D1B'; ctx.lineWidth = 2.4; ctx.lineCap = 'round'; var o = (t * 40) % 16;
      ctx.beginPath(); for (var i = 0; i < 3; i++) { ctx.moveTo(138 - o - i * 3, 200 + i * 9); ctx.lineTo(126 - o - i * 3, 200 + i * 9); } ctx.stroke();
      if ((t % 3) < 1.2) bubble(ctx, 270, 168, 'PAWP!', (t % 3) / 1.2, '#FFC93C');
    }
  };
  ANIMS.stickerNavi = {
    init: function () {},
    draw: function (ctx, t) {
      sparkles(ctx, t, [[22, 36], [262, 30], [-18, 150], [302, 160], [250, 290], [142, -30]]);
      for (var i = 0; i < 4; i++) {
        var p = ((t * 0.8 + i * 0.25) % 1); var x = 124 + p * 40, y = 232 - p * 30;
        ctx.globalAlpha = 1 - p; circle(ctx, x, y, 4 + p * 10, '#CFCFCF', 1.5);
      }
      ctx.globalAlpha = 1;
    }
  };

  ANIMS.cat = {
    init: function (st) {
      st.L = new Image(); st.L.src = './assets/cat-hand-left.png';
      st.R = new Image(); st.R.src = './assets/cat-hand-right.png';
      st.hearts = []; for (var i = 0; i < 6; i++) st.hearts.push({ x: i % 2 ? rnd(220, 300) : rnd(-20, 60), ph: i * 0.6 });
    },
    draw: function (ctx, t, st) {
      var T = t % 2.6, tap = T < 1.5 ? Math.abs(Math.sin(T / 1.5 * Math.PI * 3)) : 0, d = tap * 6;
      /* blush pulse */
      ctx.globalAlpha = 0.18 + 0.18 * Math.sin(t * 4);
      ctx.fillStyle = '#FF7A9A'; ctx.beginPath(); ctx.ellipse(52, 144, 22, 10, 0, 0, Math.PI * 2); ctx.ellipse(192, 138, 22, 10, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      if (st.L.complete && st.L.naturalWidth) ctx.drawImage(st.L, 83.9 + d, 175.4 - d * 0.3, 69.9, 80);
      if (st.R.complete && st.R.naturalWidth) ctx.drawImage(st.R, 151.2 - d, 171.5 - d * 0.3, 68.6, 83.9);
      /* "pretty please?" */
      var p = Math.min(1, t / 0.6), s = p < 1 ? 0.6 + 0.5 * p : 1 + 0.04 * Math.sin(t * 3);
      ctx.save(); ctx.translate(142, -38); ctx.rotate(-0.06); ctx.scale(s, s);
      ctx.font = '700 40px Caveat, "Comic Sans MS", cursive'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.lineWidth = 7; ctx.strokeStyle = '#FFFFFF'; ctx.strokeText('pretty please?', 0, 0); ctx.fillStyle = '#E8467C'; ctx.fillText('pretty please?', 0, 0);
      ctx.restore();
      st.hearts.forEach(function (h) {
        var q = ((t * 0.5 + h.ph) % 1); var y = 260 - q * 260;
        ctx.save(); ctx.globalAlpha = q > 0.8 ? (1 - q) / 0.2 : 1; ctx.translate(h.x, y); ctx.scale(0.9, 0.9);
        ctx.fillStyle = '#FF5C8A'; ctx.beginPath(); ctx.moveTo(0, 6); ctx.bezierCurveTo(-12, -4, -6, -14, 0, -6); ctx.bezierCurveTo(6, -14, 12, -4, 0, 6); ctx.fill(); ctx.restore();
      });
    }
  };

  ANIMS.fah = {
    init: function () {},
    onFound: function () {
      try { var u = new SpeechSynthesisUtterance('Faaaaaaaaah'); u.rate = 0.55; u.pitch = 0.7; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {}
    },
    draw: function (ctx, t) {
      var T = t % 4.6, n = Math.max(1, Math.min(26, Math.floor((T - 0.15) * 9))), txt = 'FA' + new Array(n + 1).join('H');
      var intensity = Math.min(1, n / 26), sx = (Math.random() - 0.5) * 4 * intensity, sy = (Math.random() - 0.5) * 4 * intensity;
      var fs = 46; ctx.font = '800 ' + fs + 'px "Baloo 2", system-ui, sans-serif';
      var tw = ctx.measureText(txt).width; if (tw > 400) { fs = fs * 400 / tw; ctx.font = '800 ' + fs + 'px "Baloo 2", system-ui, sans-serif'; tw = ctx.measureText(txt).width; }
      var bw = tw + 30, bh = fs + 22, cx = 142 + sx, cy = -46 + sy;
      if (T < 0.15) return;
      ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(cx - 40, cy + bh / 2 - 4); ctx.lineTo(118, 116); ctx.lineTo(cx - 6, cy + bh / 2 - 4); ctx.closePath(); shape(ctx, '#FFFFFF', 3);
      rr(ctx, cx - bw / 2, cy - bh / 2, bw, bh, bh / 2); shape(ctx, '#FFFFFF', 3);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(cx - 38, cy + bh / 2 - 8, 30, 7);
      ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, cx, cy + 2);
      ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
      for (var k = 0; k < 3; k++) {
        var r = 10 + k * 7 + (t * 30 % 7);
        ctx.globalAlpha = intensity * (1 - k * 0.3);
        ctx.beginPath(); ctx.arc(102, 129, r + 20, Math.PI * 0.85, Math.PI * 1.15); ctx.stroke();
        ctx.beginPath(); ctx.arc(102, 129, r + 20, -Math.PI * 0.15, Math.PI * 0.15); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  };

  /* ---------------- A-Frame wiring ---------------- */
  if (window.AFRAME) {
    AFRAME.registerComponent('dp-anim', {
      schema: { index: { type: 'int' } },
      init: function () {
        var T = TARGETS[this.data.index], THREE = AFRAME.THREE;
        this.T = T; this.A = ANIMS[T.anim]; this.st = {};
        var fw = T.w + 2 * T.m, fh = T.h + 2 * T.m;
        this.S = Math.min(2, 1600 / Math.max(fw, fh));
        var c = document.createElement('canvas'); c.width = Math.round(fw * this.S); c.height = Math.round(fh * this.S);
        this.ctx = c.getContext('2d');
        this.tex = new THREE.CanvasTexture(c); if ('colorSpace' in this.tex) this.tex.colorSpace = THREE.SRGBColorSpace;
        var mat = new THREE.MeshBasicMaterial({ map: this.tex, transparent: true, depthWrite: false });
        this.el.setObject3D('mesh', new THREE.Mesh(new THREE.PlaneGeometry(fw / T.w, fh / T.w), mat));
        this.A.init(this.st, T.w, T.h);
        var self = this, target = this.el.parentNode;
        target.addEventListener('targetFound', function () { self.active = true; self.t0 = performance.now(); if (self.A.onFound) self.A.onFound(); var h = document.getElementById('hint'); if (h) h.hidden = true; });
        target.addEventListener('targetLost', function () { self.active = false; self.ctx.clearRect(0, 0, c.width, c.height); self.tex.needsUpdate = true; var h = document.getElementById('hint'); if (h) h.hidden = false; });
      },
      tick: function () {
        if (!this.active) return;
        var T = this.T, ctx = this.ctx, t = (performance.now() - this.t0) / 1000;
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.setTransform(this.S, 0, 0, this.S, T.m * this.S, T.m * this.S);
        this.A.draw(ctx, t, this.st, T.w, T.h, T.m);
        this.tex.needsUpdate = true;
      }
    });
  }

  function buildScene(holder) {
    var ents = TARGETS.map(function (T, i) {
      return '<a-entity mindar-image-target="targetIndex: ' + i + '"><a-entity dp-anim="index: ' + i + '" position="0 0 0.002"></a-entity></a-entity>';
    }).join('');
    holder.innerHTML = '<a-scene mindar-image="imageTargetSrc: ./targets.mind; maxTrack: 1; filterMinCF: 0.0001; filterBeta: 0.001" color-space="sRGB" renderer="colorManagement: true; alpha: true" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false" embedded style="position:absolute;top:0;left:0;width:100%;height:100%">' +
      '<a-camera position="0 0 0" look-controls="enabled: false"></a-camera>' + ents + '</a-scene>';
  }

  window.DPAR = { TARGETS: TARGETS, ANIMS: ANIMS, buildScene: buildScene };
})();
