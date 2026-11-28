    var PE = (function () {
      "use strict";
      var MAXID = 100000000;
      function $(id) { return document.getElementById(id); }
      function now() { return performance.now(); }
      function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
      function validId(n) { return typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= MAXID; }
      function uniq(a) { var s = {}, o = []; a.forEach(function (x) { if (!s[x]) { s[x] = 1; o.push(x); } }); return o; }

      var ICONS = {
        more: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
        chevD: '<path d="M5 9l7 7 7-7"/>',
        chevUp: '<path d="M5 15l7-7 7 7"/>',
        sparkle: '<path d="M12 3l1.8 5.4L19.2 10.2 13.8 12l-1.8 5.4L10.2 12 4.8 10.2 10.2 8.4zM19 17l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>',
        flame: '<path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5C15.5 10 12 7 12 7s-3.5 3-3.5 7.5z"/><path d="M12 2c5 4 8 8.5 8 13a8 8 0 1 1-16 0c0-4.5 3-9 8-13z"/>',
        star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
        play: '<path d="M8 5.5v13l11-6.5z"/>',
        pause: '<path d="M8.5 5v14M15.5 5v14"/>',
        heart: '<path d="M12 20.5C7 17 3 13.6 3 9.4 3 6.9 4.9 5 7.2 5c1.9 0 3.7 1 4.8 2.8C13.1 6 14.9 5 16.8 5 19.1 5 21 6.9 21 9.4c0 4.2-4 7.6-9 11.1z"/>',
        tag: '<path d="M3 4.5V11l9.5 9.5a1.5 1.5 0 0 0 2.1 0l5.9-5.9a1.5 1.5 0 0 0 0-2.1L11 3H4.5A1.5 1.5 0 0 0 3 4.5z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
        filter: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
        x: '<path d="M6 6l12 12M18 6L6 18"/>',
        layers: '<path d="M12 3.5l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
        gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',
        info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".7"/>',
        fit: '<rect x="4" y="6" width="16" height="12" rx="2"/>',
        download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
        upload: '<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5M5 19.5h14"/>',
        expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
        volume: '<path d="M4 10v4h3.5l4.5 3.5v-11L7.5 10z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/>',
        mute: '<path d="M4 10v4h3.5l4.5 3.5v-11L7.5 10z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
        search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
        back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
        arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
        arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
        arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
        arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
        chevL: '<path d="M15 5l-7 7 7 7"/>',
        chevR: '<path d="M9 5l7 7-7 7"/>',
        dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r=".8"/><circle cx="15" cy="9" r=".8"/><circle cx="9" cy="15" r=".8"/><circle cx="15" cy="15" r=".8"/>',
        trash: '<path d="M5 7h14M10 4h4M7 7l1 13h8l1-13M10 11v6M14 11v6"/>',
        swap: '<path d="M8 20V4M4.5 7.5L8 4l3.5 3.5M16 4v16M12.5 16.5L16 20l3.5-3.5"/>',
        keyboard: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/>',
        shuffle: '<path d="M4 7h3.5c5 0 5 10 10 10H20M4 17h3.5c1.8 0 3-.9 4-2M13 8.2c1-.8 2.2-1.2 4.5-1.2H20M17 4l3 3-3 3M17 14l3 3-3 3"/>',
        ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
        help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1.1.9-1.1 1.7M12 17h.01"/>',
        video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10.5l5-3v9l-5-3z"/>',
        edit: '<path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-4-4L4 16v4z"/><path d="M14 6l4 4"/>',
        copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
        link: '<path d="M10 14a4 4 0 0 1 0-6l2-2a4 4 0 0 1 6 6l-2 2"/><path d="M14 10a4 4 0 0 1 0 6l-2 2a4 4 0 0 1-6-6l2-2"/>',
        share: '<path d="M12 16V4M7.5 8.5L12 4l4.5 4.5"/><path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>',
        book: '<path d="M4 5a2 2 0 0 1 2-2h5v16H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 1 2 2z"/>',
        refresh: '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 4v3h-3M6 20v-3h3"/>',
        eyeOff: '<path d="M3 3l18 18M10.6 6.2A10.8 10.8 0 0 1 12 6c7 0 11 6 11 6a17.6 17.6 0 0 1-3.2 3.7M6.7 6.7C3.7 8.4 1 12 1 12s4 6 11 6c1.5 0 2.9-.3 4.1-.8M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'
      };
      function ic(n) {
        var p = ICONS[n === "heartfill" ? "heart" : n] || "";
        return '<svg class="ic' + (n === "heartfill" ? " fill" : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>';
      }
      function paintIcons(root) {
        var list = (root || document).querySelectorAll("[data-ic]");
        for (var i = 0; i < list.length; i++) list[i].innerHTML = ic(list[i].getAttribute("data-ic"));
      }
      var LEAD = /^[\u{1F000}-\u{1FAFF}\u{2190}-\u{21FF}\u{2300}-\u{23FF}\u{25A0}-\u{25FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}️‍\s]+/u;
      function lead(t) { return typeof t === "string" ? t.replace(LEAD, "") : t; }

      var okLS = true, mem = {};
      try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); } catch (e) { okLS = false; }
      function lsGet(k) { if (okLS) { try { return localStorage.getItem(k); } catch (e) { okLS = false; } } return k in mem ? mem[k] : null; }
      function lsSet(k, v) {
        if (okLS) {
          try {
            localStorage.setItem(k, v);
            return;
          } catch (e) {
            try {
              localStorage.removeItem("darknight_alpha_cache2");
              localStorage.setItem(k, v);
              return;
            } catch (e2) {
              okLS = false;
            }
          }
        }
        mem[k] = v;
      }
      function jget(k, d) { try { var r = lsGet(k); return r ? JSON.parse(r) : d; } catch (e) { return d; } }
      function jset(k, v) { try { lsSet(k, JSON.stringify(v)); } catch (e) { } }

      var S = (function () {
        var d = { interval: 5, skipMissing: true, fit: "contain", muted: true, saver: false, keepZoom: false, speed: 1, filterAi: false, autoNextVid: false, markSeen: true, safeMode: false, autoPanic: false, autoOffline: false, hswipe: false, dblFav: false, wheelNav: false, autoClose: true, haptic: true, sfx: false, skipSeen: false };
        var s = jget("pe_settings", {});
        if (!s || typeof s !== "object" || Array.isArray(s)) s = {};
        for (var k in d) if (Object.prototype.hasOwnProperty.call(s, k)) d[k] = s[k];
        if (!isFinite(Number(d.interval)) || Number(d.interval) < 0.5 || Number(d.interval) > 3600) d.interval = 5; else d.interval = Number(d.interval);
        if (["contain", "cover"].indexOf(d.fit) < 0) d.fit = "contain";
        if (typeof d.skipMissing !== "boolean") d.skipMissing = true;
        if (typeof d.muted !== "boolean") d.muted = true;
        if (typeof d.saver !== "boolean") d.saver = false;
        if (typeof d.keepZoom !== "boolean") d.keepZoom = false;
        if (typeof d.filterAi !== "boolean") d.filterAi = false;
        if (typeof d.autoNextVid !== "boolean") d.autoNextVid = false;
        if (typeof d.markSeen !== "boolean") d.markSeen = true;
        if (typeof d.safeMode !== "boolean") d.safeMode = false;
        if (typeof d.autoPanic !== "boolean") d.autoPanic = false;
        if (typeof d.autoOffline !== "boolean") d.autoOffline = false;
        if (typeof d.hswipe !== "boolean") d.hswipe = false;
        if (typeof d.dblFav !== "boolean") d.dblFav = false;
        if (typeof d.wheelNav !== "boolean") d.wheelNav = false;
        if (typeof d.autoClose !== "boolean") d.autoClose = true;
        if (typeof d.haptic !== "boolean") d.haptic = true;
        if (typeof d.sfx !== "boolean") d.sfx = false;
        if (typeof d.skipSeen !== "boolean") d.skipSeen = false;
        if (!isFinite(Number(d.speed)) || Number(d.speed) < 0.25 || Number(d.speed) > 4) d.speed = 1; else d.speed = Number(d.speed);
        return d;
      })();
      function saveS() { jset("pe_settings", S); }

      var input = $("numberInput"), stage = $("stage"), swipeLayer = $("swipeLayer"), zoomLayer = $("zoomLayer");
      var spin = $("spin"), idTag = $("idTag"), zoomBadge = $("zoomBadge");
      var hintL = $("hintL"), hintR = $("hintR"), hintU = $("hintU"), hintD = $("hintD");
      var autoBar = $("autoBar"), autoFill = $("autoFill"), autoLbl = $("autoLbl");
      var sheet = $("sheet"), sheetBackdrop = $("sheetBackdrop"), sheetBody = $("sheetBody"), sheetBackBtn = $("sheetBack");
      var popupBackdrop = $("popupBackdrop"), popupList = $("popupList"), popupNewRow = $("popupNewRow"), popupNewInput = $("popupNewInput");
      var dlgBackdrop = $("dlgBackdrop"), dlgMsg = $("dlgMsg"), dlgInput = $("dlgInput"), dlgOk = $("dlgOk");
      var infoBackdrop = $("infoBackdrop"), infoIdEl = $("infoId"), infoMetaEl = $("infoMeta"), infoTagsEl = $("infoTags"), infoSuggEl = $("infoSuggestions");
      var tagTypeFilter = null;
      var toastEl = $("toast");
      var soundBtn = $("soundBtn");
      var filterHubBackdrop = $("filterHubBackdrop");
      var fhActiveTagChips = $("fhActiveTagChips");
      var fhBlockTagChips = $("fhBlockTagChips");
      var fhTagInput = $("fhTagInput");
      var fhBlockInput = $("fhBlockInput");

      function showHeartPop(x, y) {
        var h = document.createElement("div");
        h.className = "heart-pop";
        h.innerHTML = ic("heartfill");
        h.style.left = (x || window.innerWidth / 2) + "px";
        h.style.top = (y || window.innerHeight / 2) + "px";
        document.body.appendChild(h);
        burst(x || window.innerWidth / 2, y || window.innerHeight / 2, 12);
        sfx("like");
        setTimeout(function () {
          if (h.parentNode) h.parentNode.removeChild(h);
        }, 780);
      }

      var sp = parseInt(lsGet("lastPost"), 10);
      var current = (isFinite(sp) && sp >= 1 && sp <= MAXID) ? sp : 1;
      var shownId = 0;
      var anchorPost = parseInt(lsGet("pe_anchor_post"), 10) || 1;

      function updateAnchor(id) {
        if (!activePlaylistId && !activeTag && validId(id)) {
          anchorPost = id;
          lsSet("pe_anchor_post", String(id));
        }
      }

      var token = 0, finalTok = 0, phTimer = null;
      var currentURL = "", currentType = "";
      var autoEnabled = false, autoTimer = null, autoStart = 0, autoRAF = null, wakeLock = null, lastLbl = "";
      var playlists = [], activePlaylistId = null, shuffleOn = false, playOrder = [], returnId = null;
      var activeTag = null, tagPosts = [], tagCursor = null, tagLoading = false, tagHasMore = true;
      var selectedTags = [], activeTagsDetail = [];
      var tagSet = new Set(), playCfg = null;
      var bPosts = [], bSet = new Set(), bTags = [], bCursor = 0, bHasMore = true, bLoading = false, bToken = 0;
      var PAGE = 40, HOT_WINDOW = 150000, QLIMIT = 4;
      var streamAhead = [], streamBehind = [];
      var tagSortMode = "newest";
      var postMetaCache = new Map();
      function metaCacheSet(id, post) {
        tmSet(id, post);
        postMetaCache.delete(id);
        postMetaCache.set(id, post);
        while (postMetaCache.size > 500) {
          postMetaCache.delete(postMetaCache.keys().next().value);
        }
      }
      var tagView = "list", popularTagsCache = [], searchedTags = [], tagSearchTerm = "";
      var sheetTab = "playlist", plView = "list", plDetailId = null;
      var selMode = false, sel = {}, plShown = 120, sortAsc = true, selCountEl = null;
      var popupPostId = null, popupMode = "add", pickCb = null, pickExclude = null;
      var hist = (jget("pe_hist", []) || []).filter(validId).slice(0, 60);
      var vpos = new Map();
      var locked = false, lastHeart = 0;
      var seenSet = new Set((jget("pe_seen", []) || []).filter(validId));
      var seenT = null;
      function saveSeen() { clearTimeout(seenT); jset("pe_seen", Array.from(seenSet)); }
      // ===== Statistik harian + streak =====
      function dayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
      var daily = jget("pe_daily", {}); if (!daily || typeof daily !== "object" || Array.isArray(daily)) daily = {};
      function bumpDaily() {
        var k = dayKey(); daily[k] = (daily[k] || 0) + 1;
        var ks = Object.keys(daily).sort(); while (ks.length > 120) delete daily[ks.shift()];
        jset("pe_daily", daily);
        var n = daily[k];
        if (n === 25 || n === 50 || n === 100 || n === 250 || n === 500 || n === 1000) { toast(n + " post baru hari ini", "ok"); vibe([10, 30, 10]); }
      }
      function streakDays() {
        var d = new Date(), s = 0;
        if (!daily[dayKey(d)]) d.setDate(d.getDate() - 1); // hari ini belum mulai: streak kemarin tetap dihitung
        while (daily[dayKey(d)]) { s++; d.setDate(d.getDate() - 1); }
        return s;
      }
      function markSeen(id) {
        if (S.markSeen === false || seenSet.has(id)) return;
        seenSet.add(id); bumpDaily();
        if (seenSet.size > 10000) seenSet.delete(seenSet.values().next().value);
        clearTimeout(seenT); seenT = setTimeout(saveSeen, 1500);
      }

      var toastT = null;
      function toast(msg, type, action) {
        toastEl.textContent = lead(msg);
        toastEl.className = "toast" + (type ? " " + type : "") + (action ? " act" : "");
        void toastEl.offsetWidth; // paksa reflow agar animasi toast diulang tiap pesan baru
        if (type === "bad") sfx("bad");
        toastEl.classList.add("show");
        if (action) {
          var ab = document.createElement("button");
          ab.className = "toast-act"; ab.textContent = action.label;
          ab.onclick = function (e) {
            e.stopPropagation(); clearTimeout(toastT); toastEl.classList.remove("show");
            try { action.fn(); } catch (er) { }
          };
          toastEl.appendChild(ab);
        }
        clearTimeout(toastT); var dur = action ? 5500 : 1800; toastEl.style.setProperty("--toast-dur", dur + "ms"); toastT = setTimeout(function () { toastEl.classList.remove("show"); }, dur);
      }
      function pulse(node, cls) { if (!node) return; node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); setTimeout(function () { node.classList.remove(cls); }, 700); }
      function snapPlaylists() { try { return JSON.stringify(playlists); } catch (e) { return null; } }
      function restorePlaylists(snap) {
        if (!snap) return;
        try { playlists = loadPlaylists(JSON.parse(snap)); persist(); refreshBtns(); updateChip(); rerender(); toast("Dibatalkan", "ok"); } catch (e) { }
      }
      function undoable(msg, snap) { toast(msg, "bad", { label: "Batalkan", fn: function () { restorePlaylists(snap); } }); }
      var dlgCb = null;
      function dialog(msg, opts, cb) {
        opts = opts || {};
        dlgMsg.innerHTML = msg;
        dlgInput.style.display = opts.input ? "block" : "none";
        dlgInput.type = opts.password ? "password" : "text";
        dlgInput.value = opts.value || "";
        dlgOk.textContent = opts.ok || "OK";
        dlgOk.className = "d-ok" + (opts.danger ? " danger" : "");
        dlgCb = cb; dlgBackdrop.classList.add("open");
        if (opts.input) setTimeout(function () { dlgInput.focus(); dlgInput.select(); }, 60);
      }
      function dlgYes() { var v = dlgInput.value; dlgBackdrop.classList.remove("open"); var cb = dlgCb; dlgCb = null; if (cb) cb(v); }
      function dlgNo() { dlgBackdrop.classList.remove("open"); dlgCb = null; }
      dlgInput.addEventListener("keydown", function (e) { if (e.key === "Enter") dlgYes(); });
      function vibe(ms) { try { if (S.haptic !== false && navigator.vibrate) navigator.vibrate(ms || 8); } catch (e) { } }

      // Efek suara kecil (opsional, default mati) lewat WebAudio, tanpa file eksternal
      var _ac = null;
      function sfx(kind) {
        if (!S.sfx) return;
        try {
          _ac = _ac || new (window.AudioContext || window.webkitAudioContext)();
          if (_ac.state === "suspended") _ac.resume();
          var t0 = _ac.currentTime;
          var tones = kind === "like" ? [[660, 0], [990, 0.07]] : kind === "bad" ? [[220, 0]] : [[520, 0]];
          tones.forEach(function (n) {
            var o = _ac.createOscillator(), g = _ac.createGain(), s = t0 + n[1];
            o.type = "sine"; o.frequency.value = n[0];
            g.gain.setValueAtTime(0.0001, s);
            g.gain.exponentialRampToValueAtTime(0.12, s + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, s + 0.14);
            o.connect(g); g.connect(_ac.destination); o.start(s); o.stop(s + 0.16);
          });
        } catch (e) { }
      }

      // Percikan partikel (Suka / Simpan)
      function burst(x, y, n, cls) {
        n = n || 10;
        for (var i = 0; i < n; i++) {
          var p = document.createElement("i"); p.className = "spark" + (cls ? " " + cls : "");
          var a = (Math.PI * 2 * i) / n + Math.random() * 0.5, d = 36 + Math.random() * 36;
          p.style.cssText = "left:" + x + "px;top:" + y + "px;--dx:" + (Math.cos(a) * d).toFixed(1) + "px;--dy:" + (Math.sin(a) * d).toFixed(1) + "px;--s:" + (0.6 + Math.random() * 0.9).toFixed(2);
          document.body.appendChild(p);
          (function (q) { setTimeout(function () { if (q.parentNode) q.parentNode.removeChild(q); }, 720); })(p);
        }
      }
      function burstFrom(node, n, cls) { if (!node) return; var r = node.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, n, cls); }

      function copyText(txt, okMsg) {
        function done(ok) { toast(ok ? okMsg : "Gagal menyalin", ok ? "ok" : "bad"); if (ok) vibe(10); }
        function legacy() {
          try { var t = document.createElement("textarea"); t.value = txt; t.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(t); t.select(); var ok = document.execCommand("copy"); document.body.removeChild(t); done(ok); } catch (e) { done(false); }
        }
        try { navigator.clipboard.writeText(txt).then(function () { done(true); }, legacy); } catch (e) { legacy(); }
      }
      function saveBlob(blob, name) {
        var u = URL.createObjectURL(blob), a = document.createElement("a");
        a.href = u; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(u); }, 5000);
      }

      var R34_API_KEY = "bebe222a50299520c4a08f2b0ad0d5e0194222fe80fe4d6e1b47efe8425470d9679a6ce79ccd3af2b9a983bfa0d7c194fad1d4b6bfb42ee5884f6d47611bf0c5";
      var R34_USER_ID = "7058579";

function parseApiResponse(raw) {
        if (!raw || !raw.trim()) return [];
        var trimmed = raw.trim();
        if (trimmed.charAt(0) === "<") {
          try {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(trimmed, "text/xml");
            if (xmlDoc.getElementsByTagName("parsererror").length) return null;
            var root = xmlDoc.documentElement;
            if (root && root.getAttribute && root.getAttribute("success") === "false") return null;
            var postNodes = xmlDoc.getElementsByTagName("post");
            if (!postNodes.length) postNodes = xmlDoc.getElementsByTagName("tag");
            var posts = [];
            for (var i = 0; i < postNodes.length; i++) {
              var node = postNodes[i];
              var po = {};
              for (var a = 0; a < node.attributes.length; a++) {
                po[node.attributes[a].name] = node.attributes[a].value;
              }
              if (po.id) po.id = Number(po.id);
              posts.push(po);
            }
            return posts;
          } catch (e) {
            return null;
          }
        }
        try {
          var parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) return parsed;
          if (parsed && typeof parsed === "object") {
            if (parsed.success === false || parsed.error) return null;
            var inner = parsed.post !== undefined ? parsed.post : parsed.tag;
            if (Array.isArray(inner)) return inner.map(unwrapAttrs);
            if (inner && typeof inner === "object") return [unwrapAttrs(inner)];
            return [];
          }
          return null;
        } catch (e) {
          return null;
        }
      }

      function unwrapAttrs(o) { return (o && o["@attributes"]) ? o["@attributes"] : o; }
      function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
      function fetchT(url, ms) {
        if (typeof AbortController === "undefined") return fetch(url);
        var ac = new AbortController(), t = setTimeout(function () { ac.abort(); }, ms || 12000);
        return fetch(url, { signal: ac.signal }).then(function (r) { clearTimeout(t); return r; }, function (e) { clearTimeout(t); throw e; });
      }

      // Mengembalikan array post. Melempar error HANYA jika semua jalur gagal (jaringan / respons rusak).
      // Array kosong berarti benar-benar tidak ada hasil.
      var rateLimitedUntil = 0;
      async function rule34ApiFetch(params) {
        if (Date.now() < rateLimitedUntil) throw new Error("Rate limited");
        params = Object.assign({}, params || {});
        var wantXml = !!params._xml;
        delete params._xml;
        params.api_key = R34_API_KEY;
        params.user_id = R34_USER_ID;
        if (!wantXml) params.json = "1";
        var qs = Object.keys(params).map(function (k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
        }).join("&");

        var directUrl = "https://api.rule34.xxx/index.php?" + qs;
        var isHttp = window.location.protocol === "http:" || window.location.protocol === "https:";
        var isR34 = window.location.hostname.indexOf("rule34.xxx") !== -1;
        var tiers = [];
        if (isHttp && !isR34) tiers.push(["/api/dapi?" + qs, 10000]);
        tiers.push([directUrl, 8000]);
        if (!isHttp || isR34) tiers.push(["/api/dapi?" + qs, 10000]);
        tiers.push(["https://api.allorigins.win/raw?url=" + encodeURIComponent(directUrl), 10000]);

        for (var attempt = 0; attempt < 2; attempt++) {
          for (var i = 0; i < tiers.length; i++) {
            try {
              var res = await fetchT(tiers[i][0], tiers[i][1]);
              if (res.status === 429) {
                rateLimitedUntil = Date.now() + 15000;
                throw new Error("HTTP 429");
              }
              if (!res.ok) continue;
              var parsed = parseApiResponse(await res.text());
              if (parsed) return parsed;
            } catch (e) {
              if (e && e.message === "HTTP 429") throw e;
            }
          }
          if (attempt === 0) await sleep(500);
        }
        throw new Error("Gagal mengambil data dari Rule34 API");
      }

      function thumbURL(id) {
        var meta = postMetaCache.get(id);
        return (meta && meta.preview_url) ? meta.preview_url : "";
      }

      var cache = new Map(), pending = new Map(), queue = [], queuedResolvers = new Map(), queuedPromises = new Map(), running = 0, MAX_PAR = 4, MAX_CACHE = 12, cacheGeneration = 0;
      function invalidateCache() { cacheGeneration++; cache.forEach(releaseWarm); cache.clear(); }
      function cacheSet(id, r) { cache.delete(id); cache.set(id, r); while (cache.size > MAX_CACHE) { var ek = cache.keys().next().value; releaseWarm(cache.get(ek)); cache.delete(ek); } }
      function saverOn() { try { return !!(S.saver || (navigator.connection && navigator.connection.saveData)); } catch (e) { return !!S.saver; } }
      function loadImg(url, ms) {
        return new Promise(function (res) {
          var im = new Image(); im.decoding = "async";
          var t = setTimeout(function () { im.onload = im.onerror = null; res(null); }, ms || 15000);
          im.onload = function () { clearTimeout(t); res(im); };
          im.onerror = function () { clearTimeout(t); res(null); };
          im.src = url;
        });
      }
      /* probeVideo removed (unused) */
      // API mengembalikan host api-cdn-mp4 (lambat); website asli memakai {nama}mp4.rule34.xxx
      function fastVideoUrl(u, pid) {
        try {
          var x = new URL(u);
          if (x.hostname === "api-cdn-mp4.rule34.xxx") {
            x.hostname = "ahrimp4.rule34.xxx";
            if (!x.search) x.search = "?" + pid;
            return x.toString();
          }
        } catch (e) { }
        return u;
      }
      function buildResultFromMeta(post) {
        if (!post || !post.file_url) return Promise.resolve({ type: null, miss: true });
        var url = post.file_url;
        var isVid = !!(url.match(/\.(mp4|webm|mov)(\?|$)/i) || (post.image && post.image.match(/\.(mp4|webm|mov)$/i)));
        var pid = Number(post.id);
        if (isVid) {
          var posterUrl = (post.sample_url && post.sample) ? post.sample_url : (post.preview_url || "");
          if (posterUrl) { var img = new Image(); img.src = posterUrl; }
          return Promise.resolve({ type: "mp4", url: fastVideoUrl(url, pid), altUrl: url, meta: post, poster: posterUrl, postId: pid });
        }
        // Gunakan sample_url (versi kompresi web yang tajam & ringan), fallback ke file_url
        var isGif = !!(url.match(/\.gif(\?|$)/i) || (post.image && post.image.match(/\.gif$/i)));
        var targetUrl = (isGif || !post.sample || !post.sample_url) ? url : (saverOn() ? (post.sample_url || post.preview_url || url) : post.sample_url);
        var mediaType = isGif ? "gif" : "jpg";
        return loadImg(targetUrl).then(function (im) {
          if (im) return { type: mediaType, url: targetUrl, el: im, meta: post, fullUrl: url, postId: pid };
          var fallbackUrl = (targetUrl === post.sample_url) ? post.file_url : (post.sample_url || post.preview_url);
          if (fallbackUrl && fallbackUrl !== targetUrl) {
            return loadImg(fallbackUrl).then(function (im2) {
              if (im2) return { type: mediaType, url: fallbackUrl, el: im2, meta: post, fullUrl: url, postId: pid };
              return { type: null, miss: true, error: true };
            });
          }
          return { type: null, miss: true, error: true };
        });
      }
      // Preload metadata video tetangga DIMATIKAN: berebut koneksi ke host CDN yang sama dengan video aktif.
      var videoHold = false, videoHoldT = null;
      function holdPreload() {
        videoHold = true;
        clearTimeout(preloadTimer); clearQueued();
        clearTimeout(videoHoldT);
        videoHoldT = setTimeout(function () { releasePreload(current); }, 12000); // pengaman bila canplaythrough tak pernah muncul
      }
      function releasePreload(id) {
        clearTimeout(videoHoldT);
        if (!videoHold) return;
        videoHold = false;
        if (id === current) preloadAround(id);
      }
      function warmVideo(id, r) {
        return;
        if (!r || r.type !== "mp4" || id === current || r.warm) return;
        try { var w = document.createElement("video"); w.preload = "metadata"; w.muted = true; w.src = r.url; r.warm = w; } catch (e) { }
      }
      function releaseWarm(r) {
        if (r && r.warm) { try { r.warm.removeAttribute("src"); r.warm.load(); } catch (e) { } r.warm = null; }
      }
      function startResolve(id) {
        running++;
        var generation = cacheGeneration;
        var p;
        function apiPath() {
          if (postMetaCache.has(id)) return buildResultFromMeta(postMetaCache.get(id));
          return rule34ApiFetch({ page: "dapi", s: "post", q: "index", id: id, tags: "id:" + id, limit: 1 })
            .then(function (data) {
              if (!Array.isArray(data) || !data.length) return { type: null, miss: true };
              var post = null;
              for (var i = 0; i < data.length; i++) {
                if (Number(data[i].id) === Number(id)) { post = data[i]; break; }
              }
              if (!post) return { type: null, miss: true };
              metaCacheSet(id, post);
              return buildResultFromMeta(post);
            })
            .catch(function () {
              return { type: null, miss: true, error: true };
            });
        }
        if (isOffline(id) && navigator.onLine === false) {
          p = offlineResolve(id).then(function (r) { return r || apiPath(); });
        } else {
          p = apiPath().then(function (r) {
            if (r && r.error && isOffline(id)) return offlineResolve(id).then(function (o) { return o || r; });
            return r;
          });
        }
        function done() { running--; pending.delete(id); pump(); }
        p.then(done, done);
        pending.set(id, p);
        if (generation === cacheGeneration) {
          p.then(function (r) {
            if (r && !r.miss) { cacheSet(id, r); warmVideo(id, r); }
          });
        }
        return p;
      }
      function get(id) {
        if (id < 1 || id > MAXID) return Promise.resolve({ type: null, miss: true });
        if (cache.has(id)) { var r = cache.get(id); cacheSet(id, r); return Promise.resolve(r); }
        if (pending.has(id)) return pending.get(id);
        // Post yang diminta user diprioritaskan di depan antrean preload
        var qi = queue.indexOf(id);
        if (qi >= 0) queue.splice(qi, 1);
        queue.unshift(id);
        var promise = new Promise(function (resolve) { queuedResolvers.set(id, resolve); });
        queuedPromises.set(id, promise);
        pending.set(id, promise);
        pump();
        return promise;
      }
      function schedule(id) {
        if (videoHold) return;
        if (id < 1 || id > MAXID || cache.has(id) || pending.has(id) || queue.indexOf(id) > -1) return;
        queue.push(id); pump();
      }
      function pump() {
        while (running < MAX_PAR && queue.length) {
          var id = queue.shift(), resolveQueued = queuedResolvers.get(id);
          queuedResolvers.delete(id); queuedPromises.delete(id);
          var task = startResolve(id);
          if (resolveQueued) task.then(resolveQueued, function () { resolveQueued({ type: null, miss: true }); });
        }
      }
      function neighbors(id) {
        var out = [], offs = [1, -1, 2, 3, 4, -2], ord = activeOrder();
        if (ord) {
          var i = ord.indexOf(id); if (i < 0) return out;
          offs.forEach(function (o) { var j = i + o; if (j >= 0 && j < ord.length) out.push(ord[j]); });
        } else offs.forEach(function (o) { out.push(id + o); });
        return out;
      }
      function clearQueued(keepNearId) {
        if (!keepNearId) {
          while (queue.length) {
            var id = queue.shift(), resolveQueued = queuedResolvers.get(id), queuedPromise = queuedPromises.get(id);
            queuedResolvers.delete(id); queuedPromises.delete(id);
            if (pending.get(id) === queuedPromise) pending.delete(id);
            if (resolveQueued) resolveQueued({ type: null, miss: true, cancelled: true });
          }
          return;
        }
        var ord = activeOrder();
        var toKeep = [];
        while (queue.length) {
          var qid = queue.shift(), rq = queuedResolvers.get(qid), qp = queuedPromises.get(qid);
          var isNear = false;
          if (ord) {
            var curIdx = ord.indexOf(keepNearId), qIdx = ord.indexOf(qid);
            isNear = (curIdx >= 0 && qIdx >= 0 && Math.abs(curIdx - qIdx) <= 5);
          } else {
            isNear = Math.abs(qid - keepNearId) <= 8;
          }
          if (isNear) {
            toKeep.push({ id: qid, res: rq, prom: qp });
          } else {
            queuedResolvers.delete(qid); queuedPromises.delete(qid);
            if (pending.get(qid) === qp) pending.delete(qid);
            if (rq) rq({ type: null, miss: true, cancelled: true });
          }
        }
        for (var i = 0; i < toKeep.length; i++) {
          queue.push(toKeep[i].id);
          if (toKeep[i].res) queuedResolvers.set(toKeep[i].id, toKeep[i].res);
          if (toKeep[i].prom) queuedPromises.set(toKeep[i].id, toKeep[i].prom);
        }
      }
      var preloadTimer = null;
      function preloadAround(id) {
        clearQueued(id);
        var ord = activeOrder();
        if (ord) {
          // Dalam mode Tag / Playlist: ID sudah ada di memori! Preload langsung jalan 0ms tanpa debounce!
          neighbors(id).forEach(schedule);
          return;
        }
        clearTimeout(preloadTimer);
        preloadTimer = setTimeout(function () {
          _doPreloadAround(id);
        }, 120);
      }
      function _doPreloadAround(id) {
        var ord = activeOrder();
        if (ord) {
          neighbors(id).forEach(schedule);
          return;
        }
        streamAhead = streamAhead.filter(function (k) { return k > id; });
        streamBehind = streamBehind.filter(function (k) { return k < id; });
        if (streamAhead.length >= 4 && (id <= 1 || streamBehind.length >= 1)) {
          streamAhead.slice(0, 5).forEach(schedule);
          streamBehind.slice(0, 2).forEach(schedule);
          return;
        }
        var cfg = currentCfg(), exs = streamExtra(cfg, 2), exStr = exs.length ? " " + exs.join(" ") : "";
        rule34ApiFetch({
          page: "dapi", s: "post", q: "index",
          tags: "id:>" + id + " sort:id:asc" + exStr,
          limit: 8
        }).then(function (nextPosts) {
          if (!Array.isArray(nextPosts)) return;
          nextPosts.sort(function (a, b) { return Number(a.id) - Number(b.id); });
          var ids = [];
          nextPosts.forEach(function (po) {
            var pid = Number(po.id);
            metaCacheSet(pid, po);
            if (!isBlockedPost(po, cfg)) ids.push(pid);
          });
          if (id === current) { streamAhead = ids; ids.slice(0, 5).forEach(schedule); }
        }).catch(function () {});

        if (id > 1 && !streamBehind.length) {
          rule34ApiFetch({
            page: "dapi", s: "post", q: "index",
            tags: "id:<" + id + " sort:id:desc" + exStr,
            limit: 3
          }).then(function (prevPosts) {
            if (!Array.isArray(prevPosts)) return;
            prevPosts.sort(function (a, b) { return Number(b.id) - Number(a.id); });
            var ids = [];
            prevPosts.forEach(function (po) {
              var pid = Number(po.id);
              metaCacheSet(pid, po);
              if (!isBlockedPost(po, cfg)) ids.push(pid);
            });
            if (id === current) { streamBehind = ids; ids.slice(0, 2).forEach(schedule); }
          }).catch(function () {});
        }
      }

      var idbP = null;
      function idb() {
        if (idbP) return idbP;
        idbP = new Promise(function (res) {
          try {
            var r = indexedDB.open("pe_db", 1);
            r.onupgradeneeded = function () { r.result.createObjectStore("kv"); };
            r.onsuccess = function () { res(r.result); };
            r.onerror = function () { res(null); };
            r.onblocked = function () { res(null); };
          } catch (e) { res(null); }
        });
        return idbP;
      }
      function idbSet(k, v) {
        idb().then(function (db) { if (!db) return; try { db.transaction("kv", "readwrite").objectStore("kv").put(v, k); } catch (e) { } });
      }
      function idbGet(k) {
        return idb().then(function (db) {
          return new Promise(function (res) {
            if (!db) return res(null);
            try {
              var q = db.transaction("kv").objectStore("kv").get(k);
              q.onsuccess = function () { res(q.result === undefined ? null : q.result); };
              q.onerror = function () { res(null); };
            } catch (e) { res(null); }
          });
        });
      }
      // ===== Metadata ringan untuk grid (preview_url + tipe) - bertahan setelah reload =====
      var thumbMeta = new Map(), thumbDirty = false, thumbSaveT = null;
      var thumbReady = idbGet("thumbmeta_v1").then(function (raw) {
        try {
          if (raw) JSON.parse(raw).forEach(function (e) { if (e && validId(e[0]) && !thumbMeta.has(e[0])) thumbMeta.set(e[0], [e[1], e[2]]); });
        } catch (e) { }
      });
      function tmSet(id, post) {
        if (!post || !post.preview_url) return;
        var cur = thumbMeta.get(id), vid = postIsVideo(post) ? 1 : 0;
        if (cur && cur[0] === post.preview_url && cur[1] === vid) return;
        thumbMeta.delete(id); thumbMeta.set(id, [post.preview_url, vid]);
        if (thumbMeta.size > 15000) thumbMeta.delete(thumbMeta.keys().next().value);
        thumbDirty = true;
        if (!thumbSaveT) thumbSaveT = setTimeout(tmFlush, 5000);
      }
      function tmFlush() {
        thumbSaveT = null;
        if (!thumbDirty) return;
        thumbDirty = false;
        try {
          var arr = [];
          thumbMeta.forEach(function (v, k) { arr.push([k, v[0], v[1]]); });
          idbSet("thumbmeta_v1", JSON.stringify(arr));
        } catch (e) { }
      }
      // Ambil metadata post TANPA memuat gambar penuh (maks 4 paralel)
      var metaFetchQ = [], metaFetchRun = 0;
      function fetchThumbMeta(id) {
        var m = postMetaCache.get(id);
        if (m) return Promise.resolve(m);
        return new Promise(function (resolve) { metaFetchQ.push([id, resolve]); pumpMeta(); });
      }
      function pumpMeta() {
        while (metaFetchRun < 4 && metaFetchQ.length) {
          var it = metaFetchQ.shift(); metaFetchRun++;
          (function (id, resolve) {
            rule34ApiFetch({ page: "dapi", s: "post", q: "index", id: id, tags: "id:" + id, limit: 1 })
              .then(function (data) {
                var po = null;
                if (Array.isArray(data)) for (var i = 0; i < data.length; i++) { if (Number(data[i].id) === id) { po = data[i]; break; } }
                if (po) metaCacheSet(id, po);
                resolve(po);
              })
              .catch(function () { resolve(null); })
              .then(function () { metaFetchRun--; pumpMeta(); });
          })(it[0], it[1]);
        }
      }

      // ===== Penyimpanan offline (Cache Storage + IndexedDB untuk metadata) =====
      var OFF_CACHE = "pe-offline-v1", OFF_MAX_FILE = 60 * 1024 * 1024;
      var offIds = new Set((jget("pe_offline_ids", []) || []).filter(validId));
      var offThumbCache = new Map(), offBusy = false;
      function isOffline(id) { return offIds.has(id); }
      function saveOffIds() { jset("pe_offline_ids", Array.from(offIds)); }
      function offKey(id, suffix) { return "/__offline/" + id + (suffix || ""); }
      function hasCaches() { try { return typeof caches !== "undefined" && !!caches.open && (location.protocol === "http:" || location.protocol === "https:"); } catch (e) { return false; } }
      function slimPost(po) {
        var o = {};
        ["id", "file_url", "sample_url", "sample", "preview_url", "tags", "rating", "score", "width", "height", "image", "duration"].forEach(function (k) { if (po[k] !== undefined) o[k] = po[k]; });
        return o;
      }
      async function offlineResolve(id) {
        try {
          if (!hasCaches()) return null;
          var c = await caches.open(OFF_CACHE);
          var res = await c.match(offKey(id));
          if (!res) return null;
          var raw = await idbGet("off_" + id), po = { id: id };
          try { if (raw) po = JSON.parse(raw); } catch (e) { }
          if (po && po.file_url) metaCacheSet(id, po);
          var blob = await res.blob();
          var u = URL.createObjectURL(blob);
          if (postIsVideo(po) || /^video\//.test(blob.type)) return { type: "mp4", url: u, altUrl: u, meta: po, poster: "", postId: id, offline: true };
          var im = await loadImg(u, 15000);
          if (!im) return null;
          return { type: /gif/.test(blob.type) ? "gif" : "jpg", url: u, el: im, meta: po, fullUrl: po.file_url || u, postId: id, offline: true };
        } catch (e) { return null; }
      }
      async function offlineThumbURL(id) {
        if (offThumbCache.has(id)) return offThumbCache.get(id);
        try {
          if (!hasCaches()) return null;
          var c = await caches.open(OFF_CACHE);
          var res = await c.match(offKey(id, "_p"));
          if (!res) return null;
          var u = URL.createObjectURL(await res.blob());
          offThumbCache.set(id, u);
          return u;
        } catch (e) { return null; }
      }
      async function saveOffline(id) {
        if (!hasCaches()) throw new Error("Cache Storage tidak tersedia");
        var po = await fetchThumbMeta(id);
        if (!po || !po.file_url) throw new Error("metadata tidak ada");
        var vid = postIsVideo(po), isGif = /\.gif(\?|$)/i.test(po.file_url);
        var src = vid ? po.file_url : ((isGif || !po.sample || !po.sample_url) ? po.file_url : po.sample_url);
        var res = await fetchMedia(src);
        if (!res.ok) throw new Error("HTTP " + res.status);
        var blob = await res.blob();
        if (blob.size > OFF_MAX_FILE) throw new Error("file terlalu besar");
        var c = await caches.open(OFF_CACHE);
        await c.put(offKey(id), new Response(blob, { headers: { "Content-Type": blob.type || (vid ? "video/mp4" : "image/jpeg") } }));
        if (po.preview_url) {
          try { var pr = await fetchMedia(po.preview_url); if (pr.ok) await c.put(offKey(id, "_p"), pr); } catch (e) { }
        }
        idbSet("off_" + id, JSON.stringify(slimPost(po)));
        offIds.add(id); saveOffIds();
      }
      async function removeOffline(id) {
        try {
          if (hasCaches()) { var c = await caches.open(OFF_CACHE); await c.delete(offKey(id)); await c.delete(offKey(id, "_p")); }
        } catch (e) { }
        idbSet("off_" + id, null);
        offIds.delete(id); offThumbCache.delete(id); saveOffIds();
      }
      async function clearOffline() {
        var ids = Array.from(offIds);
        try { if (hasCaches()) await caches.delete(OFF_CACHE); } catch (e) { }
        ids.forEach(function (i) { idbSet("off_" + i, null); });
        offIds.clear(); offThumbCache.clear(); saveOffIds();
      }
      async function saveOfflineMany(ids) {
        if (offBusy) { toast("Penyimpanan offline sedang berjalan"); return; }
        var todo = ids.filter(function (i) { return !offIds.has(i); });
        if (!todo.length) { toast("Semua sudah tersimpan offline", "ok"); return; }
        offBusy = true;
        var ok = 0, fail = 0;
        try {
          for (var i = 0; i < todo.length; i++) {
            toast("Offline " + (i + 1) + "/" + todo.length + "…");
            try {
              if (navigator.storage && navigator.storage.estimate) {
                var est = await navigator.storage.estimate();
                if (est.quota && est.usage && est.quota - est.usage < 60 * 1024 * 1024) { toast("Ruang penyimpanan hampir penuh, dihentikan", "bad"); break; }
              }
              await saveOffline(todo[i]); ok++;
            } catch (e) { fail++; }
          }
        } finally { offBusy = false; }
        toast("Offline: " + ok + " tersimpan" + (fail ? ", " + fail + " gagal" : ""), fail ? "bad" : "ok");
        rerender();
      }
      async function toggleOffline(id, btn) {
        if (isOffline(id)) { await removeOffline(id); toast("Salinan offline dihapus"); }
        else {
          toast("Menyimpan offline…");
          try { await saveOffline(id); toast("Tersimpan offline", "ok"); } catch (e) { toast("Gagal menyimpan offline: " + (e.message || "error"), "bad"); }
        }
        if (btn) btn.innerHTML = ic(isOffline(id) ? "check" : "download") + "<span>" + (isOffline(id) ? "Tersimpan offline (hapus)" : "Simpan offline") + "</span>";
      }
      function autoOff(id) { if (S.autoOffline && !isOffline(id)) saveOffline(id).catch(function () { }); }

      function loadPlaylists(src) {
        var arr = src || jget("playlists_v1", []); if (!Array.isArray(arr)) return [];
        var out = [];
        arr.forEach(function (p) {
          if (p && typeof p.id === "string" && typeof p.name === "string" && Array.isArray(p.postIds))
            out.push({ id: p.id, name: p.name, postIds: uniq(p.postIds.filter(validId)), last: validId(p.last) ? p.last : null });
        });
        return out;
      }
      var persistT = null;
      function persist() {
        clearTimeout(persistT);
        jset("playlists_v1", playlists);
        try { idbSet("playlists_v1", JSON.stringify(playlists)); } catch (e) { }
      }
      function persistSoon() { clearTimeout(persistT); persistT = setTimeout(persist, 800); }

      // Session state persistence: save active tag/playlist/sort mode/checkpoint across page reloads
      function saveSession() {
        try {
          var idx = activeTag ? tagPosts.indexOf(current) : -1;
          var keepTag = !!activeTag && idx < 2000 && tagPosts.length > 0;
          var tp = keepTag ? tagPosts.slice(0, 2000) : [];
          var truncated = keepTag && tp.length < tagPosts.length;
          jset('pe_session', {
            current: current,
            activeTag: keepTag ? activeTag : null,
            activeTagsDetail: keepTag ? (activeTagsDetail || []) : [],
            tagPosts: tp,
            tagCursor: truncated ? Math.floor(tp.length / PAGE) : tagCursor,
            tagHasMore: truncated ? true : tagHasMore,
            playCfg: keepTag ? playCfg : null,
            activePlaylistId: activePlaylistId,
            selectedTags: selectedTags || [],
            tagSortMode: tagSortMode,
            tagTypeFilter: tagTypeFilter,
            shuffleOn: shuffleOn,
            playOrder: (playOrder && playOrder.length && playOrder.length <= 2000) ? playOrder : []
          });
        } catch (e) { }
      }
      playlists = loadPlaylists();
      function restoreFromBackup() {
        if (playlists.length) return;
        idbGet("playlists_v1").then(function (raw) {
          if (!raw || playlists.length) return;
          try {
            var restored = loadPlaylists(JSON.parse(raw));
            if (!restored.length) return;
            playlists = restored; jset("playlists_v1", playlists);
            refreshBtns(); updateChip();
            if (sheet.classList.contains("open")) rerender();
            toast("Playlist dipulihkan dari cadangan (" + playlists.length + ")", "ok");
          } catch (e) { }
        });
      }
      function getPL(id) { for (var i = 0; i < playlists.length; i++) if (playlists[i].id === id) return playlists[i]; return null; }
      function genId() { return "pl_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8); }
      function isIn(p, id) { return p.postIds.indexOf(id) !== -1; }
      function addTo(pid, id) { var p = getPL(pid); if (!p || isIn(p, id)) return false; p.postIds.push(id); persist(); return true; }
      function removeFrom(pid, id) { var p = getPL(pid); if (!p) return false; var i = p.postIds.indexOf(id); if (i < 0) return false; p.postIds.splice(i, 1); persist(); return true; }
      function shuffleArr(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
      function activeOrder() {
        if (activeTag) {
          if (!shuffleOn) return tagPosts;
          if (playOrder.length !== tagPosts.length) {
            var set = {}, have = {}; tagPosts.forEach(function (id) { set[id] = 1; });
            playOrder = playOrder.filter(function (id) { return set[id] === 1; });
            playOrder.forEach(function (id) { have[id] = 1; });
            tagPosts.forEach(function (id) { if (!have[id]) playOrder.push(id); });
          }
          return playOrder;
        }
        if (!activePlaylistId) return null;
        var p = getPL(activePlaylistId); if (!p) return null;
        if (!shuffleOn) return p.postIds;
        if (playOrder.length !== p.postIds.length) {
          var set = {}, have = {}; p.postIds.forEach(function (id) { set[id] = 1; });
          playOrder = playOrder.filter(function (id) { return set[id] === 1; });
          playOrder.forEach(function (id) { have[id] = 1; });
          p.postIds.forEach(function (id) { if (!have[id]) playOrder.push(id); });
        }
        return playOrder;
      }
      function updateChip() {
        var chip = $("chip"), ord, i, kind, name, ico;
        if (activeTag) {
          kind = shuffleOn ? "TAG · ACAK" : "TAG"; name = activeTag; ico = "tag"; chip.classList.remove("pl");
        } else {
          var p = activePlaylistId ? getPL(activePlaylistId) : null;
          if (!p) { chip.classList.remove("on"); return; }
          kind = shuffleOn ? "PLAYLIST · ACAK" : "PLAYLIST"; name = p.name; ico = "layers"; chip.classList.add("pl");
        }
        ord = activeOrder() || []; i = ord.indexOf(current);
        $("chipIco").innerHTML = ic(shuffleOn ? "shuffle" : ico);
        $("chipKind").textContent = kind;
        $("chipName").textContent = name;
        var more = (activeTag && tagHasMore) ? "+" : "";
        $("chipPos").textContent = i >= 0 ? (i + 1) + "/" + ord.length + more : ord.length + more;
        $("chipBar").style.width = (i >= 0 && ord.length ? ((i + 1) / ord.length * 100) : 0) + "%";
        chip.title = kind + ": " + name;
        chip.classList.add("on");
      }
      function exitPlaylist() { activeTag = null; activePlaylistId = null; shuffleOn = false; playOrder = []; returnId = null; updateChip(); }
      function leavePlaylist() {
        var back = returnId;
        exitPlaylist();
        if (back && back !== current) { loadPost(back, 0); toast("Kembali ke #" + back, "ok"); }
      }
      function startPlaylist(pid, startId, shuffle) {
        activeTag = null; activeTagsDetail = []; tagPosts = []; tagCursor = null;
        var p = getPL(pid); if (!p) return;
        if (!p.postIds.length) { toast("Playlist kosong"); return; }
        if (!activePlaylistId) returnId = current;
        activePlaylistId = pid; shuffleOn = !!shuffle;
        if (shuffleOn) {
          playOrder = shuffleArr(p.postIds.slice());
          if (startId && isIn(p, startId)) { playOrder.splice(playOrder.indexOf(startId), 1); playOrder.unshift(startId); }
        }
        var ord = activeOrder(), target, resumed = false;
        if (startId && isIn(p, startId)) target = startId;
        else if (!shuffleOn && p.last && isIn(p, p.last)) { target = p.last; resumed = true; }
        else target = ord[0];
        closeSheet();
        loadPost(target, 0);
        toast(resumed && target !== ord[0] ? "Lanjut dari #" + target : (shuffleOn ? "Acak: " : "Memutar: ") + p.name, "ok");
      }

      function refreshBtns() {
        var any = false, fav = false;
        playlists.forEach(function (p) { if (isIn(p, current)) { any = true; if (p.id === "pl_fav") fav = true; } });
        var plActBtn = $("plBtnAction"), plActIco = $("plIcoAction");
        if (plActBtn) plActBtn.classList.toggle("on", any);
        if (plActIco) plActIco.innerHTML = ic(any ? "check" : "plus");
        $("favBtn").classList.toggle("on", fav); $("favIco").innerHTML = ic(fav ? "heartfill" : "heart"); refreshBadges();
        idTag.textContent = "#" + current;
      }
      function updateBack() {
        var b = $("backBtn");
        var show = !activePlaylistId && anchorPost && anchorPost !== current;
        if (show && anchorPost) {
          b.classList.add("on");
          b.title = "Kembali ke posisi utama #" + anchorPost;
          $("backId").textContent = "#" + anchorPost;
        } else {
          b.classList.remove("on");
        }
      }
      function back() {
        if (anchorPost && anchorPost !== current) {
          var target = anchorPost;
          exitPlaylist();
          loadPost(target, 0);
          toast("Kembali ke progress utama #" + target, "ok");
        } else {
          toast("Sudah di posisi utama #" + current);
        }
      }
      function toggleFav() {
        var p = getPL("pl_fav");
        if (!p) { p = { id: "pl_fav", name: "Favorit", postIds: [], last: null }; playlists.unshift(p); }
        if (isIn(p, current)) { var sn = snapPlaylists(); removeFrom("pl_fav", current); undoable("Dihapus dari Favorit", sn); }
        else { addTo("pl_fav", current); toast("Masuk Favorit", "ok"); vibe([12, 40, 18]); sfx("like"); autoOff(current); pulse($("favBtn"), "pop"); burstFrom($("favBtn"), 12); }
        refreshBtns(); updateChip();
        if (sheet.classList.contains("open")) rerender();
      }
      function addFav(id) {
        var p = getPL("pl_fav");
        if (!p) { p = { id: "pl_fav", name: "Favorit", postIds: [], last: null }; playlists.unshift(p); }
        if (!isIn(p, id)) { addTo("pl_fav", id); toast("Masuk Favorit", "ok"); vibe(12); autoOff(id); refreshBtns(); if (sheet.classList.contains("open")) rerender(); }
      }

      var pendingEnter = null, enterTimer = null;
      function TR() { return "transform 180ms cubic-bezier(.25,.1,.25,1),opacity 180ms cubic-bezier(.25,.1,.25,1)"; }
      function clearSwipeStyles() {
        swipeLayer.style.transition = ""; swipeLayer.style.transform = ""; swipeLayer.style.opacity = "";
        swipeLayer.classList.remove("dragging");
      }
      function playEnter(from) {
        swipeLayer.style.transition = "none"; swipeLayer.style.transform = from; swipeLayer.style.opacity = "0";
        void swipeLayer.offsetWidth;
        swipeLayer.style.transition = TR(); swipeLayer.style.transform = "translate(0,0) scale(1)"; swipeLayer.style.opacity = "1";
        setTimeout(clearSwipeStyles, 200);
      }
      function settleEnter() {
        if (!pendingEnter) return;
        var t = pendingEnter; pendingEnter = null; clearTimeout(enterTimer); playEnter(t);
      }
      function isVideo() { return !!zoomLayer.querySelector("video"); }
      function vposSet(id, t) { vpos.delete(id); vpos.set(id, t); if (vpos.size > 100) vpos.delete(vpos.keys().next().value); }
      function teardownVideo(v) {
        if (!v) return;
        try {
          if (v._pid && v.currentTime > 2 && !v.ended) vposSet(v._pid, v.currentTime);
          v.pause(); v.removeAttribute("src"); v.load();
        } catch (e) { }
      }
      function emptyStage() {
        var old = zoomLayer.querySelector("video");
        while (zoomLayer.firstChild) zoomLayer.removeChild(zoomLayer.firstChild);
        teardownVideo(old);
      }
      var navDir = 0;
      function setMedia(el, kind) {
        emptyStage();
        if (el.tagName === "IMG") { el.alt = "Post " + current; el.className = kind === "ph" ? "ph" : ""; el.draggable = false; }
        if (el.tagName === "IMG" || el.tagName === "VIDEO") { el.classList.remove("media-in"); el.setAttribute("data-dir", String(navDir)); void el.offsetWidth; el.classList.add("media-in"); }
        zoomLayer.appendChild(el);
        stage.classList.toggle("isvid", el.tagName === "VIDEO");
        if (soundBtn) { soundBtn.style.display = el.tagName === "VIDEO" ? "flex" : "none"; soundBtn.innerHTML = ic(S.muted ? "mute" : "volume"); }
        if (S.keepZoom && zoom.scale > 1.02 && el.tagName === "IMG") { zoom.tx = 0; zoom.ty = 0; clampPan(); applyZoom(); }
        else resetZoom();
        if (pendingEnter) settleEnter();
      }
      function showStatus(msg) {
        emptyStage();
        var s = document.createElement("span"); s.id = "status"; s.textContent = msg; zoomLayer.appendChild(s);
        stage.classList.remove("isvid");
        if (soundBtn) soundBtn.style.display = "none";
        resetZoom(); settleEnter();
      }
      function showLoadError(id) {
        emptyStage();
        var wrap = document.createElement("div");
        wrap.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:10px";
        var s = document.createElement("span"); s.id = "status"; s.textContent = "Gagal memuat #" + id + " (jaringan)";
        var b = document.createElement("button"); b.className = "pill pri"; b.textContent = "Coba lagi";
        b.onclick = function () { cache.delete(id); loadPost(id, 0); };
        wrap.appendChild(s); wrap.appendChild(b);
        zoomLayer.appendChild(wrap);
        stage.classList.remove("isvid");
        if (soundBtn) soundBtn.style.display = "none";
        resetZoom(); settleEnter();
      }
      function makeVideo(id, url, posterUrl, altUrl) {
        var v = document.createElement("video");
        v._pid = id;
        v.controls = true; v.playsInline = true; v.setAttribute("playsinline", "");
        v.preload = "auto"; v.muted = S.muted; v.loop = !(autoEnabled || S.autoNextVid);
        v.defaultPlaybackRate = S.speed; v.playbackRate = S.speed;
        if (posterUrl) v.poster = posterUrl;
        v.addEventListener("loadedmetadata", function () {
          var t = vpos.get(id);
          if (t && isFinite(v.duration) && t < v.duration - 2) { try { v.currentTime = t; } catch (e) { } }
          v.playbackRate = S.speed;
        });
        v.addEventListener("timeupdate", function () { if (id === current && v.duration && vprogFill) vprogFill.style.transform = "scaleX(" + Math.min(1, v.currentTime / v.duration).toFixed(4) + ")"; });
        v.addEventListener("play", function () { if (id === current && v.currentTime > 0.3) playFlash(false); });
        v.addEventListener("pause", function () { if (id === current && !v.ended && !v.seeking) playFlash(true); });
        v.addEventListener("waiting", function () { if (id === current) setLoading(true); });
        v.addEventListener("canplay", function () { if (id === current) setLoading(false); });
        // Preload tetangga baru jalan setelah video aktif cukup ter-buffer, supaya bandwidth 100% untuk video ini
        v.addEventListener("canplaythrough", function () { if (id === current) releasePreload(id); });
        v.addEventListener("playing", function () { if (id === current) setLoading(false); });
        v.addEventListener("ended", function () {
          if ((autoEnabled || S.autoNextVid) && v.parentNode && id === current) {
            if (v.duration && v.duration > 0.5 && v.currentTime >= v.duration - 0.5) change(1);
          }
        });
        v.addEventListener("error", function () {
          if (altUrl && v.src !== altUrl) { var a = altUrl; altUrl = null; v.src = a; v.load(); try { v.play(); } catch (e) { } return; }
          if (id === current) {
            setLoading(false);
            console.warn("Video load error for post #" + id);
            if (autoEnabled || S.autoNextVid) {
              setTimeout(function () { if (id === current) change(1); }, 1500);
            }
          }
        });
        v.src = url;
        return v;
      }
      function setLoading(b) { spin.classList.toggle("show", !!b); }
      function addHist(id) {
        var i = hist.indexOf(id); if (i > -1) hist.splice(i, 1);
        hist.unshift(id); if (hist.length > 60) hist.length = 60;
        jset("pe_hist", hist);
      }

      var saveSessionDebounce = null;
      function commit(id) {
        current = id; input.value = id; lsSet("lastPost", String(id)); updateAnchor(id);
        refreshBtns(); updateChip(); updateBack();
        if (activePlaylistId) {
          var ap = getPL(activePlaylistId);
          if (ap && ap.last !== id && isIn(ap, id)) { ap.last = id; persistSoon(); }
        }
        if (activeTag && !activePlaylistId) {
          cpSteps++;
          if (cpSteps >= 6) scheduleCheckpoint(id); // salah ketuk / intip sebentar tidak menimpa posisi tersimpan
        }
        clearTimeout(saveSessionDebounce);
        saveSessionDebounce = setTimeout(saveSession, 500);
      }
      function autoBarIdle() {
        if (autoEnabled) { autoFill.style.width = "0%"; lastLbl = S.interval.toFixed(1) + "s"; autoLbl.textContent = lastLbl; }
      }
      function loadPost(id, dir, tries) {
        if (id === undefined || id === null) id = Number(input.value);
        if (!validId(id)) { toast("ID harus 1 – 100000000", "bad"); input.value = current; return; }
        tries = tries || 0;
        navDir = dir || 0;
        if (!dir) { streamAhead = []; streamBehind = []; }
        commit(id);
        var tok = ++token;
        currentURL = ""; currentType = "";
        clearAutoTimer(); autoBarIdle();
        clearTimeout(phTimer);

        // Jika sudah di RAM cache, tampilkan INSTAN tanpa memunculkan spinner!
        var c = cache.get(id);
        if (c) { present(c, tok, dir, tries); return; }

        // Hanya nyalakan spinner jika post belum ada di cache
        setLoading(true);

        // Tampilkan thumbnail seketika (0ms delay) jika metadata sudah tersedia
        var meta = postMetaCache.get(id);
        if (meta && meta.preview_url) {
          var th = new Image();
          th.onload = function () { if (tok === token && finalTok !== tok) setMedia(th, "ph"); };
          th.src = meta.preview_url;
        } else {
          var tu = thumbURL(id);
          if (tu) {
            var th2 = new Image();
            th2.onload = function () { if (tok === token && finalTok !== tok) setMedia(th2, "ph"); };
            th2.src = tu;
          }
        }
        get(id).then(function (r) { if (tok !== token) return; present(r, tok, dir, tries); });
      }
      function present(r, tok, dir, tries) {
        if (!r || r.cancelled) return;
        finalTok = tok; setLoading(false); clearTimeout(phTimer);
        if (r.postId && Number(r.postId) !== Number(current)) return;
        if (r.error) { showLoadError(current); if (autoEnabled) resetAutoTimer(); return; }
        if (r.miss || !r.type) {
          var ord = activeOrder();
          if (ord && ord.length) {
            var curIdx = ord.indexOf(current);
            if (curIdx >= 0 && curIdx + 1 < ord.length && tries < 5) {
              loadPost(ord[curIdx + 1], 1, tries + 1);
              return;
            }
          }
          if (S.skipMissing && tries < 5) {
            var tagQuery = "id:>" + current + " sort:id:asc";
            rule34ApiFetch({ page: "dapi", s: "post", q: "index", tags: tagQuery, limit: 1 })
              .then(function (posts) {
                if (tok !== token) return;
                if (Array.isArray(posts) && posts.length) {
                  var validPost = posts[0];
                  var validId = Number(validPost.id);
                  metaCacheSet(validId, validPost);
                  loadPost(validId, 1, tries + 1);
                } else {
                  showStatus("Post #" + current + " tidak ditemukan");
                }
              }).catch(function () {
                showStatus("Post #" + current + " tidak ditemukan");
              });
            return;
          }
          showStatus("Post #" + current + " tidak ditemukan");
          preloadAround(current);
          if (autoEnabled) resetAutoTimer();
          return;
        }
        currentURL = r.url; currentType = r.type;
        shownId = current;
        var idFmt = $("idFormat");
        if (idFmt) {
          idFmt.textContent = r.type === "mp4" ? "VIDEO" : (r.type === "gif" ? "GIF" : "");
        }
        if (r.type === "mp4") {
          var poster = r.poster || (r.meta && (r.meta.sample_url || r.meta.preview_url)) || "";
          releaseWarm(r);
          holdPreload();
          var el = makeVideo(current, r.url, poster, r.altUrl); setMedia(el);
          clearAutoTimer();
          if (autoEnabled) { lastLbl = "VIDEO"; autoLbl.textContent = "VIDEO"; autoFill.style.width = "100%"; }
          var pr = locked ? null : el.play();
          if (pr && pr.catch) pr.catch(function () {
            el.muted = true;
            var p2 = el.play();
            if (p2 && p2.catch) p2.catch(function () { });
          });
        } else {
          videoHold = false; clearTimeout(videoHoldT);
          setMedia(r.el);
          if (autoEnabled) resetAutoTimer();
        }
        addHist(current); markSeen(current);
        if (r.type !== "mp4") preloadAround(current);
      }

      var changeBusy = false;
      async function change(step) {
        var ord = activeOrder();
        if (ord) {
          if (!ord.length) { exitPlaylist(); return false; }
          var idx = ord.indexOf(current); if (idx < 0) idx = 0;
          var ni = idx + step;
          if (activeTag) {
            var cfgB = currentCfg(), skipped = 0;
            while (ni >= 0 && ni < ord.length && skipped < 30 && (isBlockedPost(postMetaCache.get(ord[ni]), cfgB) || (S.skipSeen && seenSet.has(ord[ni])))) { ni += step; skipped++; }
          }
          if (activeTag && ni >= ord.length - 3 && tagHasMore && !tagLoading) {
            loadMoreTagPosts();
          }
          if (activeTag && step > 0 && ni >= ord.length && (tagHasMore || tagLoading)) {
            toast("Memuat post berikutnya…");
            return false;
          }
          if (ni >= ord.length && autoEnabled) ni = 0;
          if (ni < 0 || ni >= ord.length) { toast(step > 0 ? "Playlist selesai" : "Awal playlist"); return false; }
          loadPost(ord[ni], step); return true;
        }

        if (changeBusy) return false;
        changeBusy = true;
        try {
          var nextTargetId = await nextStreamId(step);
          if (nextTargetId && nextTargetId >= 1 && nextTargetId <= MAXID) {
            if (step > 0) streamBehind.unshift(current); else streamAhead.unshift(current);
            loadPost(nextTargetId, step);
            return true;
          }
          toast(step > 0 ? "Sudah mencapai post terakhir" : "Sudah mencapai post pertama");
          return false;
        } catch (e) {
          var fallbackId = current + step;
          if (fallbackId >= 1 && fallbackId <= MAXID) {
            loadPost(fallbackId, step);
            return true;
          }
          return false;
        } finally {
          changeBusy = false;
        }
      }

      // Cari post berikutnya/sebelumnya di mode stream; post yang kena blacklist/AI/mode aman dilewati.
      async function nextStreamId(step) {
        var cfg = currentCfg();
        var arr = step > 0 ? streamAhead : streamBehind;
        for (var i = 0; i < arr.length; i++) {
          var m = postMetaCache.get(arr[i]);
          if (!m || !isBlockedPost(m, cfg)) return arr[i];
        }
        var from = current;
        for (var guard = 0; guard < 6; guard++) {
          var q = step > 0 ? ("id:>" + from + " sort:id:asc") : ("id:<" + from + " sort:id:desc");
          var ex = streamExtra(cfg, 2);
          if (ex.length) q += " " + ex.join(" ");
          var posts = await rule34ApiFetch({ page: "dapi", s: "post", q: "index", tags: q, limit: 10 });
          if (!Array.isArray(posts) || !posts.length) return null;
          posts.sort(function (a, b) { return step > 0 ? Number(a.id) - Number(b.id) : Number(b.id) - Number(a.id); });
          posts.forEach(function (po) { metaCacheSet(Number(po.id), po); });
          var ok = posts.filter(function (po) { return !isBlockedPost(po, cfg); });
          if (ok.length) {
            var rest = ok.slice(1).map(function (po) { return Number(po.id); });
            if (step > 0) streamAhead = rest; else streamBehind = rest;
            return Number(ok[0].id);
          }
          from = Number(posts[posts.length - 1].id);
        }
        return null;
      }

      var randTries = 0;
      async function randomPost() {
        randTries = 0;
        var ord = activeOrder();
        if (ord && ord.length) { loadPost(ord[Math.floor(Math.random() * ord.length)], 0); return; }
        setLoading(true);
        try {
          var cfg = currentCfg();
          for (var k = 0; k < 4; k++) {
            var ex = streamExtra(cfg, 3);
            var posts = await rule34ApiFetch({ page: "dapi", s: "post", q: "index", tags: "sort:random" + (ex.length ? " " + ex.join(" ") : ""), limit: 6 });
            if (Array.isArray(posts)) {
              var ok = posts.filter(function (po) { return po && po.id && !isBlockedPost(po, cfg); });
              if (ok.length) {
                var rpid = Number(ok[0].id);
                metaCacheSet(rpid, ok[0]);
                loadPost(rpid, 0);
                return;
              }
            }
          }
        } catch (e) { }
        tryRandom();
      }
      function tryRandom() {
        if (++randTries > 12) { setLoading(false); toast("Gagal dapat post acak, coba lagi", "bad"); return; }
        var km = parseInt(lsGet("knownMaxId"), 10), upper;
        upper = (isFinite(km) && km >= 1) ? km + 100 : Math.max(current * 2, 2000000);
        upper = Math.min(upper, MAXID);
        var ids = []; for (var i = 0; i < 3; i++) ids.push(1 + Math.floor(Math.random() * upper));
        var tok = ++token, settled = 0, won = false;
        setLoading(true); clearAutoTimer(); autoBarIdle(); clearTimeout(phTimer);
        ids.forEach(function (id) {
          get(id).then(function (r) {
            if (tok !== token || won) return;
            settled++;
            if (!r.miss && r.type) {
              won = true;
              if (id > (isFinite(km) ? km : 0)) lsSet("knownMaxId", String(id));
              commit(id); present(r, tok, 0, 0);
            } else if (settled === ids.length) tryRandom();
          });
        });
      }

      function toggleAuto() { autoEnabled ? stopAuto() : startAuto(); }
      var wakeLockRequest = 0;
      function startAuto() {
        autoEnabled = true;
        var wakeToken = ++wakeLockRequest;
        $("autoBtn").classList.add("on"); $("autoIco").innerHTML = ic("pause"); $("autoTxt").textContent = "Stop";
        autoBar.classList.add("on");
        var v = zoomLayer.querySelector("video"); if (v) v.loop = false;
        try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function (l) { if (autoEnabled && wakeToken === wakeLockRequest) { wakeLock = l; l.addEventListener("release", function () { if (wakeLock === l) wakeLock = null; }); } else { l.release().catch(function () { }); } }).catch(function () { }); } catch (e) { }
        if (isVideo()) { lastLbl = "VIDEO"; autoLbl.textContent = "VIDEO"; autoFill.style.width = "100%"; } else resetAutoTimer();
      }
      function stopAuto() {
        autoEnabled = false; ++wakeLockRequest; clearAutoTimer();
        $("autoBtn").classList.remove("on"); $("autoIco").innerHTML = ic("play"); $("autoTxt").textContent = "Auto";
        autoBar.classList.remove("on"); autoFill.style.width = "0%";
        var v = zoomLayer.querySelector("video"); if (v) v.loop = !S.autoNextVid;
        try { if (wakeLock) { wakeLock.release(); wakeLock = null; } } catch (e) { }
      }
      function clearAutoTimer() {
        if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
        if (autoRAF) { cancelAnimationFrame(autoRAF); autoRAF = null; }
      }
      function resetAutoTimer() {
        clearAutoTimer();
        if (!autoEnabled) { autoFill.style.width = "0%"; return; }
        var iv = S.interval * 1000;
        autoStart = now();
        autoTimer = setTimeout(function () {
          autoTimer = null;
          if (zoom.scale > 1.02 || overlayOpen() || document.hidden) { resetAutoTimer(); return; }
          change(1).then(function (ok) {
            if (!ok) { if (current >= MAXID) stopAuto(); else if (autoEnabled && !autoTimer) resetAutoTimer(); }
          });
        }, iv);
        tickBar(iv);
      }
      function tickBar(iv) {
        if (!autoEnabled || !autoTimer) return;
        var e = now() - autoStart;
        autoFill.style.width = Math.min(100, e / iv * 100) + "%";
        var t = Math.max(0, (iv - e) / 1000).toFixed(1) + "s";
        if (t !== lastLbl) { lastLbl = t; autoLbl.textContent = t; }
        autoRAF = requestAnimationFrame(function () { tickBar(iv); });
      }

      function toggleFs() {
        var de = document.documentElement;
        var inFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
        if (document.body.classList.contains("fs") || inFs) {
          document.body.classList.remove("fs");
          if (inFs) { if (document.exitFullscreen) document.exitFullscreen(); else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); }
          return;
        }
        document.body.classList.add("fs");
        try { var rq = de.requestFullscreen || de.webkitRequestFullscreen; if (rq) { var pr = rq.call(de); if (pr && pr.catch) pr.catch(function () { }); } } catch (e) { }
      }
      function syncFs() { if (!document.fullscreenElement && !document.webkitFullscreenElement) document.body.classList.remove("fs"); }
      document.addEventListener("fullscreenchange", syncFs);
      document.addEventListener("webkitfullscreenchange", syncFs);
      function applyFit() { stage.classList.toggle("fit-cover", S.fit === "cover"); }
      function toggleFit() { S.fit = S.fit === "cover" ? "contain" : "cover"; saveS(); applyFit(); toast(S.fit === "cover" ? "Mode: penuhi layar" : "Mode: muat gambar"); }
      applyFit();

      var zoom = { scale: 1, tx: 0, ty: 0 };
      function applyZoom() {
        zoomLayer.style.transform = "translate(" + zoom.tx + "px," + zoom.ty + "px) scale(" + zoom.scale + ")";
        var show = zoom.scale > 1.05; zoomBadge.classList.toggle("visible", show);
        if (show) zoomBadge.textContent = zoom.scale.toFixed(1) + "x";
      }
      var lastZoomT = 0;
      function toggleDblZoom(x, y) {
        if (now() - lastZoomT < 500) return; // dblclick + sentuhan bisa datang bersamaan
        if (!zoomLayer.querySelector("img")) return;
        lastZoomT = now();
        zoomLayer.classList.add("zsmooth"); setTimeout(function () { zoomLayer.classList.remove("zsmooth"); }, 320);
        if (zoom.scale > 1.05) { resetZoom(); vibe(6); return; }
        var r = stage.getBoundingClientRect(), dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2);
        zoom.scale = 2.5; zoom.tx = -dx * 1.5; zoom.ty = -dy * 1.5; clampPan(); applyZoom(); vibe(6);
      }
      function resetZoom() { zoom.scale = 1; zoom.tx = 0; zoom.ty = 0; zoomLayer.classList.remove("dragging"); applyZoom(); }
      function clampPan() {
        if (zoom.scale <= 1) { zoom.tx = 0; zoom.ty = 0; return; }
        var mx = (zoom.scale - 1) * stage.clientWidth / 2, my = (zoom.scale - 1) * stage.clientHeight / 2;
        zoom.tx = Math.max(-mx, Math.min(mx, zoom.tx)); zoom.ty = Math.max(-my, Math.min(my, zoom.ty));
      }

      var SW_MIN = 40, SW_MS = 800, SW_CD = 250, DOM = 1.8, VCZ = 56, DT_MS = 280, SNAP = 180;
      var sw = { active: false, sx: 0, sy: 0, cx: 0, cy: 0, t: 0, id: null, axis: null, last: 0, dbl: false };
      var gm = null;
      var g = { d0: 0, s0: 1, tx0: 0, ty0: 0, mx: 0, my: 0, px: 0, py: 0, lastTap: 0, lx: 0, ly: 0 };

      function hint(el, vis, armed) { if (armed && !el.classList.contains("armed")) vibe(10); el.classList.toggle("visible", !!vis); el.classList.toggle("armed", !!armed); }
      function clearHints() { hint(hintL, 0, 0); hint(hintR, 0, 0); hint(hintU, 0, 0); hint(hintD, 0, 0); }
      function isDbl(t) { return (now() - g.lastTap < DT_MS) && Math.abs(t.clientX - g.lx) < 30 && Math.abs(t.clientY - g.ly) < 30; }
      function beginSwipe(t, dbl) {
        sw.active = true; sw.sx = sw.cx = t.clientX; sw.sy = sw.cy = t.clientY; sw.t = now(); sw.id = t.identifier; sw.axis = null; sw.dbl = dbl;
        gm = "swipe"; swipeLayer.classList.add("dragging");
      }
      function onTouchStart(e) {
        if (isVideo()) {
          if (e.touches.length !== 1) { sw.active = false; return; }
          var tv = e.touches[0], tg = e.target;
          if (tg && tg.closest && tg.closest("button")) return;
          if (tg && tg.tagName === "VIDEO") { var r = tg.getBoundingClientRect(); if (tv.clientY - r.top > r.height - VCZ) return; }
          if (now() - sw.last < SW_CD) return;
          beginSwipe(tv, isDbl(tv)); return;
        }
        if (e.touches.length === 2) {
          sw.active = false; gm = "pinch";
          var a = e.touches[0], b = e.touches[1], dx = b.clientX - a.clientX, dy = b.clientY - a.clientY;
          g.d0 = Math.sqrt(dx * dx + dy * dy);
          var rc = stage.getBoundingClientRect();
          g.mx = (a.clientX + b.clientX) / 2 - rc.left - rc.width / 2; g.my = (a.clientY + b.clientY) / 2 - rc.top - rc.height / 2;
          g.s0 = zoom.scale; g.tx0 = zoom.tx; g.ty0 = zoom.ty;
          zoomLayer.classList.add("dragging"); clearSwipeStyles(); clearHints();
          return;
        }
        if (e.touches.length !== 1) { sw.active = false; return; }
        var t = e.touches[0];
        if (e.target && e.target.closest && e.target.closest("button")) return;
        if (zoom.scale > 1.02) {
          gm = "pan"; g.px = t.clientX; g.py = t.clientY; g.tx0 = zoom.tx; g.ty0 = zoom.ty; zoomLayer.classList.add("dragging"); return;
        }
        if (now() - sw.last < SW_CD) return;
        beginSwipe(t, isDbl(t));
      }
      function onTouchMove(e) {
        if (gm === "pinch" && e.touches.length === 2 && !isVideo()) {
          var a = e.touches[0], b = e.touches[1], dx = b.clientX - a.clientX, dy = b.clientY - a.clientY;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (g.d0 > 0) {
            var ns = Math.max(1, Math.min(5, g.s0 * dist / g.d0)), k = ns / g.s0;
            zoom.tx = g.mx * (1 - k) + g.tx0 * k; zoom.ty = g.my * (1 - k) + g.ty0 * k; zoom.scale = ns;
            clampPan(); applyZoom();
          }
          return;
        }
        if (gm === "pan" && e.touches.length === 1 && !isVideo()) {
          var tp = e.touches[0];
          zoom.tx = g.tx0 + (tp.clientX - g.px); zoom.ty = g.ty0 + (tp.clientY - g.py);
          clampPan(); applyZoom(); return;
        }
        if (!sw.active) return;
        var t = null;
        for (var i = 0; i < e.touches.length; i++) if (e.touches[i].identifier === sw.id) { t = e.touches[i]; break; }
        if (!t) return;
        sw.cx = t.clientX; sw.cy = t.clientY;
        var dxs = sw.cx - sw.sx, dys = sw.cy - sw.sy, adx = Math.abs(dxs), ady = Math.abs(dys);
        if (sw.axis === null && (adx > 8 || ady > 8)) sw.axis = adx >= ady ? "h" : "v";
        if (sw.axis === "h") {
          if (!S.hswipe) return;
          hint(hintU, 0, 0); hint(hintD, 0, 0);
          var f = dxs; if (f > 120) f = 120 + (f - 120) * .35; if (f < -120) f = -120 + (f + 120) * .35;
          swipeLayer.style.transform = "translateX(" + f + "px)";
          if (adx >= 25) {
            if (dxs > 0) { hint(hintR, 1, adx >= 50); hint(hintL, 0, 0); } else { hint(hintL, 1, adx >= 50); hint(hintR, 0, 0); }
          } else { hint(hintL, 0, 0); hint(hintR, 0, 0); }
        } else if (sw.axis === "v") {
          hint(hintL, 0, 0); hint(hintR, 0, 0);
          var p = Math.min(1, ady / (stage.clientHeight || 400));
          swipeLayer.style.transform = "translateY(" + dys + "px) scale(" + (1 - .12 * p) + ")";
          swipeLayer.style.opacity = 1 - .6 * p;
          if (ady >= 25) {
            if (dys < 0) { hint(hintD, 1, ady >= 50); hint(hintU, 0, 0); } else { hint(hintU, 1, ady >= 50); hint(hintD, 0, 0); }
          } else { hint(hintU, 0, 0); hint(hintD, 0, 0); }
        }
      }
      function snapBack() {
        swipeLayer.style.transition = TR();
        swipeLayer.style.transform = "translate(0,0) scale(1)"; swipeLayer.style.opacity = "1";
        clearHints();
        setTimeout(clearSwipeStyles, SNAP + 20);
      }
      function snapToNew(dir, step) {
        var out, inn;
        if (dir === "up") { out = "translateY(-100%) scale(.85)"; inn = "translateY(100%) scale(.85)"; }
        else { out = "translateY(100%) scale(.85)"; inn = "translateY(-100%) scale(.85)"; }
        swipeLayer.style.transition = TR(); swipeLayer.style.transform = out; swipeLayer.style.opacity = "0"; clearHints();
        setTimeout(function () {
          pendingEnter = inn;
          change(step).then(function (ok) {
            if (!ok) { pendingEnter = null; playEnter(out); return; }
            clearTimeout(enterTimer);
            enterTimer = setTimeout(function () { if (finalTok !== token) showStatus("Memuat #" + current + "…"); else settleEnter(); }, 1200);
          });
        }, SNAP);
      }
      function onTouchEnd() {
        if (gm === "pinch") { gm = null; zoomLayer.classList.remove("dragging"); if (zoom.scale < 1.02) resetZoom(); else applyZoom(); g.lastTap = 0; return; }
        if (gm === "pan") { gm = null; zoomLayer.classList.remove("dragging"); if (zoom.scale < 1.02) resetZoom(); return; }
        if (!sw.active) return;
        var axis = sw.axis; sw.active = false; sw.axis = null; gm = null;
        var dx = sw.cx - sw.sx, dy = sw.cy - sw.sy, dt = now() - sw.t, adx = Math.abs(dx), ady = Math.abs(dy);
        if (adx < 10 && ady < 10 && dt < 300) {
          clearSwipeStyles(); clearHints();
          if (sw.dbl && !S.dblFav) { g.lastTap = 0; toggleDblZoom(sw.sx, sw.sy); }
          else if (sw.dbl) {
            g.lastTap = 0;
            // Di video: sisi kiri/kanan = loncat 10 dtk, area kontrol bawah = milik kontrol video; hanya bagian tengah yang jadi Favorit
            var vd = zoomLayer.querySelector("video"), seekZone = false;
            if (vd) { var vr = vd.getBoundingClientRect(), rel = (sw.sx - vr.left) / vr.width; seekZone = sw.sy > vr.bottom - 64 || rel < 0.38 || rel > 0.62; }
            if (!seekZone) {
              lastHeart = now();
              showHeartPop(sw.sx, sw.sy);
              addFav(current);
            }
          } else { g.lastTap = now(); g.lx = sw.sx; g.ly = sw.sy; }
          return;
        }
        var valid = false;
        if (axis === "h") valid = adx >= SW_MIN && adx >= ady * DOM && dt <= SW_MS;
        else if (axis === "v") valid = ady >= SW_MIN && ady >= adx * DOM && dt <= SW_MS;
        if (valid && !(axis === "h" && !S.hswipe) && now() - sw.last >= SW_CD) {
          sw.last = now(); vibe(8);
          if (axis === "h") { snapBack(); if (dx > 0) openPopup(current); else swipeDelete(); }
          else snapToNew(dy < 0 ? "up" : "down", dy < 0 ? 1 : -1);
        } else snapBack();
      }
      function onTouchCancel() {
        sw.active = false; sw.axis = null; gm = null; clearSwipeStyles(); clearHints();
        zoomLayer.classList.remove("dragging"); if (zoom.scale < 1.02) resetZoom();
      }
      stage.addEventListener("touchstart", onTouchStart, { passive: true });
      stage.addEventListener("touchmove", onTouchMove, { passive: true });
      stage.addEventListener("touchend", onTouchEnd, { passive: true });
      stage.addEventListener("touchcancel", onTouchCancel, { passive: true });
      var lastWheel = 0, lastWheelEv = 0;
      stage.addEventListener("wheel", function (e) {
        if (!S.wheelNav) return;
        if (zoom.scale > 1.02) return;
        e.preventDefault();
        var t = now(), gap = t - lastWheelEv; lastWheelEv = t;
        if (gap < 140) return; // lanjutan gesture / inertia trackpad: abaikan
        if (t - lastWheel < 300) return; lastWheel = t;
        change(e.deltaY > 0 ? 1 : -1);
      }, { passive: false });
      stage.addEventListener("dblclick", function (e) {
        if (e.target && e.target.closest && e.target.closest("button")) return;
        if (!S.dblFav) { toggleDblZoom(e.clientX, e.clientY); return; }
        if (isVideo()) return;
        if (now() - lastHeart < 600) return;
        lastHeart = now();
        showHeartPop(e.clientX, e.clientY);
        addFav(current);
      });

      function swipeDelete() {
        if (activePlaylistId) {
          var p = getPL(activePlaylistId); if (!p) return;
          if (!isIn(p, current)) { toast("Post ini tidak ada di " + p.name); return; }
          dialog("Hapus post <b>" + current + "</b> dari playlist <b>" + esc(p.name) + "</b>?", { ok: "Hapus", danger: true }, function () {
            var snap = snapPlaylists(); removeFrom(p.id, current); undoable("Dihapus dari " + p.name, snap); refreshBtns(); updateChip();
            if (!p.postIds.length) exitPlaylist();
          });
        } else {
          var cont = playlists.filter(function (p) { return isIn(p, current); });
          if (!cont.length) { toast("Post #" + current + " belum di playlist mana pun. Swipe kanan untuk simpan.", "bad"); return; }
          dialog("Hapus post <b>" + current + "</b> dari <b>" + cont.length + " playlist</b>?", { ok: "Hapus", danger: true }, function () {
            var snap2 = snapPlaylists();
            cont.forEach(function (p) { removeFrom(p.id, current); });
            undoable("Dihapus dari semua playlist", snap2); refreshBtns();
          });
        }
      }

      function openPopup(id) {
        closeOverlays("popup");
        popupMode = "add"; pickCb = null; popupPostId = id;
        $("popupTitle").innerHTML = 'Simpan ke playlist <span>#' + id + '</span>';
        renderPopup(); popupNewRow.classList.remove("show"); popupNewInput.value = "";
        popupBackdrop.classList.add("open");
      }
      function openPick(title, excludeId, cb) {
        popupMode = "pick"; pickCb = cb; pickExclude = excludeId; popupPostId = null;
        $("popupTitle").textContent = title;
        renderPopup(); popupNewRow.classList.remove("show"); popupNewInput.value = "";
        popupBackdrop.classList.add("open");
      }
      function closePopup(e) {
        if (e && e.target !== popupBackdrop) return;
        popupBackdrop.classList.remove("open"); popupPostId = null; popupMode = "add"; pickCb = null;
      }
      function togglePopup() { popupBackdrop.classList.contains("open") ? closePopup() : openPopup(current); }
      function renderPopup() {
        popupList.innerHTML = "";
        var list = playlists.filter(function (p) { return popupMode === "add" || p.id !== pickExclude; });
        if (!list.length) { var h = el("div", "empty", "Belum ada playlist. Buat baru di bawah."); popupList.appendChild(h); return; }
        list.forEach(function (pl) {
          var inl = popupMode === "add" && isIn(pl, popupPostId);
          var it = el("div", "pli" + (inl ? " in" : "") + (popupMode === "pick" ? " pick" : ""));
          it.innerHTML = '<span class="ck">' + (inl ? ic("check") : "") + '</span><span class="nm">' + esc(pl.name) + '</span><span class="ct">' + pl.postIds.length + ' post</span>';
          it.onclick = function () {
            if (popupMode === "pick") { var cb = pickCb; closePopup(); if (cb) cb(pl); return; }
            if (inl) { removeFrom(pl.id, popupPostId); toast("Dihapus dari " + pl.name, "bad"); }
            else {
              addTo(pl.id, popupPostId); toast("Ditambahkan ke " + pl.name, "ok"); vibe(10);
              pulse($("plBtnAction"), "pop"); burstFrom($("plBtnAction"), 8, "w"); sfx("save");
              if (S.autoClose) { var pidKeep = popupPostId; setTimeout(function () { if (popupPostId === pidKeep) closePopup(); }, 650); }
            }
            renderPopup(); refreshBtns(); updateChip();
            if (sheet.classList.contains("open")) rerender();
          };
          popupList.appendChild(it);
        });
      }
      function showNewRow() { popupNewRow.classList.add("show"); popupNewInput.focus(); }
      function confirmNewPl() {
        var n = popupNewInput.value.trim();
        if (!n) { toast("Nama tidak boleh kosong"); return; }
        var exists = playlists.some(function(p) { return p.name.toLowerCase() === n.toLowerCase(); });
        if (exists) { toast("Playlist '" + n + "' sudah ada", "bad"); return; }
        var pl = { id: genId(), name: n, postIds: [], last: null };
        if (popupMode === "pick") {
          var cb = pickCb; playlists.push(pl); persist(); closePopup(); if (cb) cb(pl); return;
        }
        if (popupPostId) pl.postIds.push(popupPostId);
        playlists.push(pl); persist();
        popupNewInput.value = ""; popupNewRow.classList.remove("show");
        renderPopup(); refreshBtns();
        if (sheet.classList.contains("open")) rerender();
        toast("Playlist '" + n + "' dibuat", "ok");
      }
      popupNewInput.addEventListener("keydown", function (e) { if (e.key === "Enter") confirmNewPl(); });

      var infoRequestToken = 0;
      // created_at Rule34: "Fri Nov 21 09:15:33 +0000 2025" (di-parse manual karena Safari tidak konsisten)
      function parseR34Date(str) {
        if (!str) return 0;
        var m = String(str).match(/^\w{3} (\w{3}) (\d{1,2}) (\d{2}):(\d{2}):(\d{2}) ([+-])(\d{2})(\d{2}) (\d{4})$/);
        if (m) {
          var mon = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(m[1]) / 3;
          if (mon >= 0 && mon % 1 === 0) {
            var off = (m[6] === "-" ? -1 : 1) * (Number(m[7]) * 60 + Number(m[8]));
            return Date.UTC(Number(m[9]), mon, Number(m[2]), Number(m[3]), Number(m[4]), Number(m[5])) - off * 60000;
          }
        }
        var t = Date.parse(str);
        return isNaN(t) ? 0 : t;
      }
      function fmtUpload(ts) {
        try { return new Date(ts).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
        catch (e) { return new Date(ts).toISOString().slice(0, 16).replace("T", " "); }
      }
      function openInfo(id) {
        closeOverlays("info");
        id = id || current;
        var infoToken = ++infoRequestToken;
        infoIdEl.textContent = id;
        infoMetaEl.innerHTML = "Mengambil detail post…";
        infoTagsEl.innerHTML = "";
        infoSuggEl.innerHTML = "";
        var ia = $("infoActions");
        if (ia) {
          ia.innerHTML = "";
          var pageUrl = "https://rule34.xxx/index.php?page=post&s=view&id=" + id;
          ia.appendChild(ipill("copy", "Salin ID", "", function () { copyText(String(id), "ID #" + id + " disalin"); }));
          ia.appendChild(ipill("link", "Salin link", "", function () { copyText(id === current && currentURL ? currentURL : pageUrl, "Link disalin"); }));
          if (navigator.share && id === current && currentURL) ia.appendChild(ipill("share", "Bagikan", "", shareURL));
          ia.appendChild(ipill("expand", "Sumber", "", function () { window.open(pageUrl, "_blank", "noopener,noreferrer"); }));
        }
        infoBackdrop.classList.add("open");

        var postPromise;
        if (postMetaCache.has(id)) {
          postPromise = Promise.resolve(postMetaCache.get(id));
        } else {
          postPromise = rule34ApiFetch({ page: "dapi", s: "post", q: "index", id: id, tags: "id:" + id, limit: 1 }).then(function (data) {
            if (Array.isArray(data) && data.length) {
              var p = null;
              for (var i = 0; i < data.length; i++) {
                if (Number(data[i].id) === Number(id)) { p = data[i]; break; }
              }
              if (p) {
                metaCacheSet(id, p);
                return p;
              }
            }
            return null;
          });
        }

        postPromise.then(function (post) {
          if (infoToken !== infoRequestToken || !infoBackdrop.classList.contains("open")) return;
          if (!post) {
            infoMetaEl.textContent = "Detail post tidak ditemukan";
            return;
          }
          infoMetaEl.innerHTML = "";
          if (post.score !== undefined) {
            var lk = el("span", "", "Score: " + post.score);
            infoMetaEl.appendChild(lk);
          }
          if (post.width && post.height) {
            var sz = el("span", "", post.width + " × " + post.height);
            infoMetaEl.appendChild(sz);
          }
          var isVid = (post.file_url && post.file_url.match(/\.(mp4|webm|mov)(\?|$)/i)) || (post.image && post.image.match(/\.(mp4|webm)$/i));
          if (isVid) {
            var vt = el("span", "", "Video");
            vt.style.color = "var(--blue)";
            infoMetaEl.appendChild(vt);
          }
          if (post.rating) {
            var rt = el("span", "", post.rating);
            infoMetaEl.appendChild(rt);
          }
          var upTs = parseR34Date(post.created_at);
          var dateSpan = el("span", "", upTs ? ("Diunggah " + fmtUpload(upTs)) : (post.change ? ("Diubah " + fmtUpload(Number(post.change) * 1000)) : ""));
          if (dateSpan.textContent) infoMetaEl.appendChild(dateSpan);
          if (post.owner) infoMetaEl.appendChild(el("span", "", "Oleh " + post.owner));
          if (!upTs) {
            rule34ApiFetch({ page: "dapi", s: "post", q: "index", id: id, _xml: true }).then(function (xPosts) {
              if (infoToken !== infoRequestToken || !infoBackdrop.classList.contains("open")) return;
              if (Array.isArray(xPosts) && xPosts[0] && xPosts[0].created_at) {
                post.created_at = xPosts[0].created_at;
                metaCacheSet(id, post);
                var ts2 = parseR34Date(post.created_at);
                if (ts2) dateSpan.textContent = "Diunggah " + fmtUpload(ts2);
              }
            }).catch(function () { });
          }

          var tagStr = (post.tags || "").trim();
          var tagTokens = tagStr ? tagStr.split(/\s+/).filter(Boolean) : [];
          if (!tagTokens.length) {
            infoTagsEl.innerHTML = '<div style="font-size:12px;color:var(--text-faint);font-style:italic">Tidak ada metadata tag untuk post ini</div>';
          } else {
            infoTagsEl.innerHTML = "";
            var groupsHost = el("div", "infotag-groups");
            infoTagsEl.appendChild(groupsHost);
            function buildChip(tVal) {
              var wrap = el("span", "tagchip-wrap");
              var chip = el("button", "tagchip", tVal);
              chip.onclick = function () {
                closeInfo();
                openTag(tVal);
              };
              var bb = el("button", "tagchip blkb");
              bb.innerHTML = ic("ban");
              bb.setAttribute("aria-label", "Sembunyikan tag " + tVal);
              function paintBlk() {
                var on = blacklistTags.indexOf(normTag(tVal)) !== -1;
                wrap.classList.toggle("blocked", on);
                bb.title = on ? "Tampilkan lagi tag ini" : "Sembunyikan tag ini";
              }
              bb.onclick = function (e) {
                e.stopPropagation();
                var wasOn = blacklistTags.indexOf(normTag(tVal)) !== -1;
                function doBlk() {
                  toggleTagBlock(tVal); paintBlk();
                  toast(wasOn ? "Tag ditampilkan lagi: " + tVal : "Disembunyikan: " + tVal, wasOn ? "ok" : "bad");
                }
                if (wasOn) doBlk();
                else dialog("Sembunyikan semua post bertag <b>" + esc(tVal) + "</b>?", { ok: "Sembunyikan", danger: true }, doBlk);
              };
              paintBlk();
              wrap.appendChild(chip); wrap.appendChild(bb);
              return wrap;
            }
            var GROUPS = [[8, "Artist", "#f59e0b"], [4, "Karakter", "#38bdf8"], [2, "Seri", "#10b981"], [1, "Tag umum", ""], [16, "Meta", ""]];
            function paintGroups() {
              groupsHost.innerHTML = "";
              var by = { 8: [], 4: [], 2: [], 1: [], 16: [] };
              tagTokens.forEach(function (tv) { var ty = tagTypeMap[normTag(tv)] || 1; (by[ty] || by[1]).push(tv); });
              GROUPS.forEach(function (g) {
                var arr = by[g[0]];
                if (!arr.length) return;
                var sec = el("div", "infotag-sec");
                var ttl = el("div", "infotag-title", g[1] + " (" + arr.length + ")");
                if (g[2]) ttl.style.color = g[2];
                sec.appendChild(ttl);
                var chips = el("div", "infotag-chips");
                arr.forEach(function (tv) { chips.appendChild(buildChip(tv)); });
                sec.appendChild(chips);
                groupsHost.appendChild(sec);
              });
            }
            paintGroups();
            resolveTagTypes(
              tagTokens,
              function () { return infoToken === infoRequestToken && infoBackdrop.classList.contains("open"); },
              function () { if (infoToken === infoRequestToken && infoBackdrop.classList.contains("open")) paintGroups(); }
            );

            // Post serupa berdasarkan tag yang menarik (pilih tag selain tag generik seperti 1girl/video jika ada)
            var chosenTag = tagTokens[0];
            for (var ti = 0; ti < tagTokens.length; ti++) {
              var candidate = tagTokens[ti];
              if (candidate !== "video" && candidate !== "sound" && candidate !== "1girl" && candidate !== "tagme") {
                chosenTag = candidate;
                break;
              }
            }
            if (chosenTag) {
              rule34ApiFetch({ page: "dapi", s: "post", q: "index", tags: chosenTag, limit: 12 }).then(function (suggs) {
                if (infoToken !== infoRequestToken || !infoBackdrop.classList.contains("open")) return;
                if (!Array.isArray(suggs) || !suggs.length) return;
                var filtered = suggs.filter(function (item) { return Number(item.id) !== id; }).slice(0, 8);
                if (!filtered.length) return;
                infoSuggEl.innerHTML = '<div class="infotag-title" style="margin-bottom:6px">Post serupa (' + esc(chosenTag) + ')</div>';
                var grid = el("div", "sugg-grid");
                filtered.forEach(function (item) {
                  var sid = Number(item.id);
                  metaCacheSet(sid, item);
                  var th = thumb(sid, function () {
                    closeInfo();
                    loadPost(sid, 0);
                  });
                  grid.appendChild(th);
                });
                infoSuggEl.appendChild(grid);
              }).catch(function () { });
            }
          }
          // aksi cepat: simpan offline
          var oRow = el("div", "arow"); oRow.style.marginTop = "6px";
          var ob = el("button", "pill");
          ob.innerHTML = ic(isOffline(id) ? "check" : "download") + "<span>" + (isOffline(id) ? "Tersimpan offline (hapus)" : "Simpan offline") + "</span>";
          ob.onclick = function () { toggleOffline(id, ob); };
          oRow.appendChild(ob);
          if (activePlaylistId) {
            var apl = getPL(activePlaylistId);
            if (apl && isIn(apl, id)) {
              var delb = el("button", "pill dng");
              delb.innerHTML = ic("trash") + "<span>Hapus dari playlist</span>";
              delb.onclick = function () { closeInfo(); swipeDelete(); };
              oRow.appendChild(delb);
            }
          }
          infoTagsEl.appendChild(oRow);
        }).catch(function (err) {
          if (infoToken === infoRequestToken && infoBackdrop.classList.contains("open")) infoMetaEl.textContent = "Detail post tidak tersedia";
        });
      }

      function closeInfo(e) {
        if (e && e.target !== infoBackdrop) return;
        ++infoRequestToken;
        infoBackdrop.classList.remove("open");
      }


      // Tipe dari autocomplete bila tersedia; 0 = belum diketahui (nanti dicari lewat dapi)
      function acTypeOf(item) {
        var raw = item && (item.category !== undefined ? item.category : item.type);
        if (raw === undefined || raw === null) return 0;
        var str = String(raw).toLowerCase();
        if (str === "artist") return 8;
        if (str === "character") return 4;
        if (str === "copyright" || str === "series") return 2;
        if (str === "metadata" || str === "meta") return 16;
        if (str === "general") return 1;
        return 0;
      }
      function parseAutocompleteList(list) {
        if (!Array.isArray(list)) return [];
        return list.map(function (item) {
          var val = item.value || "";
          var cnt = 0;
          if (item.label) {
            var m = item.label.match(/\((\d+)\)/);
            if (m) cnt = parseInt(m[1], 10);
          }
          return {
            value: val,
            count: cnt,
            popularity: cnt,
            type: acTypeOf(item)
          };
        });
      }

      async function r34Autocomplete(q) {
        if (q === null || q === undefined) return [];
        var targetParam = "?q=" + encodeURIComponent(String(q));
        var directUrl = "https://api.rule34.xxx/autocomplete.php" + targetParam;
        var proxyUrl = "/api/autocomplete" + targetParam;
        try {
          var res = await fetch(proxyUrl);
          if (res.ok) {
            var d = await res.json();
            if (Array.isArray(d)) return parseAutocompleteList(d);
          }
        } catch (e) { }
        try {
          var res2 = await fetch(directUrl);
          if (res2.ok) {
            var d2 = await res2.json();
            if (Array.isArray(d2)) return parseAutocompleteList(d2);
          }
        } catch (e2) { }
        return [];
      }

      // ===== Progress tag (termasuk kombinasi multi-tag) =====
      function knownMax() { var km = parseInt(lsGet("knownMaxId"), 10); return (isFinite(km) && km > 1000) ? km : 0; }
      function currentCfg() {
        return {
          sort: tagSortMode === "views" ? "popular" : tagSortMode,
          type: (tagTypeFilter === undefined ? null : tagTypeFilter),
          ai: !!S.filterAi,
          block: blacklistTags.slice(),
          safe: !!S.safeMode
        };
      }
      function postIsVideo(po) {
        var u = (po && po.file_url) || "";
        return !!(u.match(/\.(mp4|webm|mov)(\?|$)/i) || (po && po.image && String(po.image).match(/\.(mp4|webm|mov)$/i)));
      }
      // Blacklist, filter AI, dan mode aman diterapkan di sisi klien (juga untuk tag di luar batas query server)
      function isBlockedPost(po, cfg) {
        if (!po) return false;
        cfg = cfg || currentCfg();
        var tg = " " + (po.tags || "") + " ";
        var bl = cfg.block || [];
        for (var i = 0; i < bl.length; i++) { if (bl[i] && tg.indexOf(" " + bl[i] + " ") !== -1) return true; }
        if (cfg.ai && (tg.indexOf(" ai_generated ") !== -1 || tg.indexOf(" ai-generated ") !== -1 || tg.indexOf(" ai_assisted ") !== -1)) return true;
        if (cfg.safe && po.rating && po.rating !== "safe" && po.rating !== "general") return true;
        return false;
      }
      function streamExtra(cfg, maxN) {
        var out = [];
        if (cfg.safe) out.push("rating:safe");
        if (cfg.ai) out.push("-ai_generated");
        (cfg.block || []).forEach(function (b) { if (b) out.push("-" + b); });
        return out.slice(0, maxN);
      }
      // Batas query Rule34 = 4 tag. Urutan prioritas: tag pilihan + sort, lalu tipe/aman/AI/blacklist.
      // Apa pun yang tidak muat di server tetap disaring di klien.
      function buildTagQuery(tags, cfg) {
        var user = [];
        (tags || []).forEach(function (t) { var n = String(t || "").trim().replace(/\s+/g, "_"); if (n) user.push(n); });
        var sortTags = [];
        if (cfg.sort === "popular" || cfg.sort === "top") sortTags.push("sort:score:desc");
        else if (cfg.sort === "hot") {
          sortTags.push("sort:score:desc");
          var km = knownMax(); if (km > HOT_WINDOW) sortTags.push("id:>" + (km - HOT_WINDOW));
        } else if (cfg.sort === "oldest") sortTags.push("sort:id:asc");
        var room = Math.max(0, QLIMIT - sortTags.length);
        var q = user.slice(0, room).concat(sortTags);
        var client = user.slice(room).filter(function (t) { return t.indexOf(":") < 0 && t.indexOf("*") < 0; });
        function free() { return QLIMIT - q.length; }
        if (cfg.type === 1 && free() > 0) q.push("video");
        else if (cfg.type === 0 && free() > 0) q.push("-video");
        if (cfg.safe && free() > 0) q.push("rating:safe");
        if (cfg.ai && free() > 0) q.push("-ai_generated");
        (cfg.block || []).forEach(function (b) { if (b && free() > 0) q.push("-" + b); });
        return { q: q.join(" "), client: client };
      }
      async function fetchTagPage(tags, cursor, cfg) {
        var bq = buildTagQuery(tags, cfg);
        var params = { page: "dapi", s: "post", q: "index", limit: PAGE, pid: cursor };
        if (bq.q) params.tags = bq.q;
        var data = await rule34ApiFetch(params);
        var raw = Array.isArray(data) ? data : [];
        var kept = [];
        raw.forEach(function (it) {
          if (!it || !it.id) return;
          metaCacheSet(Number(it.id), it);
          if (isBlockedPost(it, cfg)) return;
          if (cfg.type === 1 && !postIsVideo(it)) return;
          if (cfg.type === 0 && postIsVideo(it)) return;
          if (bq.client.length) {
            var tg = " " + (it.tags || "") + " ";
            for (var i = 0; i < bq.client.length; i++) { if (tg.indexOf(" " + bq.client[i] + " ") === -1) return; }
          }
          kept.push(it);
        });
        return { raw: raw, kept: kept };
      }

      // ===== Progress tag (termasuk kombinasi multi-tag). Satu sistem: checkpoint =====
      function tagProgKey(tags, cfg) {
        cfg = cfg || currentCfg();
        var t = (tags || []).map(normTag).filter(Boolean).sort().join("+") || "__all__";
        return t + "|" + cfg.sort + "|" + cfg.type;
      }
      function getTagProg(tags, cfg) {
        var all = jget("pe_tagprog", {}), r = all[tagProgKey(tags, cfg)];
        return r && validId(r.id) ? r : null;
      }
      function clearTagProg(tags, cfg) {
        var all = jget("pe_tagprog", {}); delete all[tagProgKey(tags, cfg)]; jset("pe_tagprog", all);
      }
      function getTagCheckpoints() {
        return jget("pe_tag_checkpoints", {});
      }
      function getTagCheckpoint(tags, cfg) {
        var cpMap = getTagCheckpoints();
        return cpMap[tagProgKey(tags, cfg)] || null;
      }
      function saveTagCheckpoint(tags, postId, postIndex, cfg) {
        if (!validId(postId)) return;
        var key = tagProgKey(tags, cfg);
        var cpMap = getTagCheckpoints();
        cpMap[key] = {
          lastId: postId,
          lastIndex: (typeof postIndex === "number" && postIndex >= 0) ? postIndex : 0,
          updatedAt: Date.now()
        };
        var keys = Object.keys(cpMap);
        if (keys.length > 200) {
          keys.sort(function (a, b) { return cpMap[a].updatedAt - cpMap[b].updatedAt; });
          for (var i = 0; i < keys.length - 200; i++) delete cpMap[keys[i]];
        }
        jset("pe_tag_checkpoints", cpMap);
      }
      function clearTagCheckpoint(tags, cfg) {
        var cpMap = getTagCheckpoints();
        var key = tagProgKey(tags, cfg);
        if (cpMap[key]) {
          delete cpMap[key];
          jset("pe_tag_checkpoints", cpMap);
        }
      }
      // Posisi terakhir: checkpoint baru, atau data lama (pe_tagprog) bila belum ada
      function getResume(tags, cfg) {
        var cp = getTagCheckpoint(tags, cfg);
        if (cp && validId(cp.lastId)) return { id: cp.lastId, index: cp.lastIndex };
        var pr = getTagProg(tags, cfg);
        if (pr && validId(pr.id)) return { id: pr.id, index: -1 };
        return null;
      }
      var cpTimer = null, cpPendingId = null, cpSteps = 0, cpTrust = false;
      function scheduleCheckpoint(id) { cpPendingId = id; clearTimeout(cpTimer); cpTimer = setTimeout(flushCheckpoint, 400); }
      function flushCheckpoint() {
        clearTimeout(cpTimer);
        var id = cpPendingId; cpPendingId = null;
        if (!id || !activeTag || activePlaylistId) return;
        saveTagCheckpoint(activeTagsDetail, id, tagPosts.indexOf(id), playCfg);
      }

      var tagResuming = false;
      async function resumeTag(tags) {
        var cp = getResume(tags); if (!cp || tagResuming) return;
        tagResuming = true;
        try {
          var guard = 0;
          toast("Mencari posisi terakhir #" + cp.id + "…");
          while (!bSet.has(cp.id) && bHasMore && guard++ < 150) {
            if (bLoading) { await sleep(150); continue; }
            await loadTagDetail(tags, false);
          }
          if (bSet.has(cp.id)) { cpTrust = true; startTag(tags, cp.id, false); }
          else { toast("Posisi tidak ditemukan, mulai dari awal", "bad"); startTag(tags, null, false); }
        } finally { tagResuming = false; }
      }

      // Memutar daftar yang sedang ditelusuri (browse) -> disalin ke state putar agar grid lain tidak mengubah urutan putar
      function startTag(tags, startId, shuffle) {
        if (!bPosts.length) { toast("Belum ada post untuk tag ini", "bad"); return; }
        if (!activePlaylistId && !activeTag) returnId = current;
        if (Array.isArray(tags)) {
          activeTagsDetail = tags.slice();
          activeTag = tagLabel(tags);
        } else {
          activeTagsDetail = [tags];
          activeTag = tags;
        }
        ++tagRequestToken;
        tagPosts = bPosts.slice(); tagSet = new Set(bSet); tagCursor = bCursor; tagHasMore = bHasMore; tagLoading = false;
        playCfg = currentCfg();
        cpSteps = cpTrust ? 99 : 0; cpTrust = false;
        activePlaylistId = null;
        shuffleOn = !!shuffle;
        if (shuffleOn) {
          playOrder = shuffleArr(tagPosts.slice());
          if (startId && tagSet.has(startId)) {
            playOrder.splice(playOrder.indexOf(startId), 1);
            playOrder.unshift(startId);
          }
        }
        var ord = activeOrder(), target = (startId && tagSet.has(startId)) ? startId : ord[0];
        if (!activeTagsDetail.length) {
          activeTag = tagSortMode === "hot" ? "Hot" : (tagSortMode === "popular" || tagSortMode === "top" || tagSortMode === "views" ? "Top Rated" : (tagSortMode === "oldest" ? "Terlama" : "Terbaru"));
        }
        closeSheet();
        loadPost(target, 0);
        toast((shuffleOn ? "Acak Tag: " : "Tag: ") + activeTag, "ok");
      }

      var tagRequestToken = 0;
      async function fetchLatestPostId() {
        try {
          var data = await rule34ApiFetch({
            page: "dapi",
            s: "post",
            q: "index",
            limit: 1
          });
          if (Array.isArray(data) && data.length && data[0].id) {
            var latestId = Number(data[0].id);
            lsSet("knownMaxId", String(latestId));
            return latestId;
          }
        } catch (e) {
          console.warn("Gagal mengambil post terbaru dari Rule34 API:", e);
        }
        var km = parseInt(lsGet("knownMaxId"), 10);
        return (isFinite(km) && km > 1000000) ? km : 16000000;
      }


      var alphaFetchTokens = {};
      var alphaRenderDebounce = null;
      // ===== Kategori tag: 1 General, 2 Seri, 4 Karakter, 8 Artist, 16 Meta =====
      var tagTypeMap = jget("darknight_tagtypes", {}), tagTypeMiss = {}, tagTypePending = {}, tagTypeSaveT = null, tagTypeRenderT = null;
      var POPULAR_CAT_SEEDS = {
        8: ["sakimichan", "wlop", "cutesexyrobutts", "derpixon", "dross", "nyantcha", "afrobull", "kinkymation", "sciamano240", "diives", "minus8", "hews", "ratatatat74", "khyle.", "speedosausage", "zone", "incase", "flick", "slugbox", "shindol", "krekk0v", "fumihiko", "personal_ami", "reiq", "yakovlev-vad"],
        4: ["d.va_(overwatch)", "mercy_(overwatch)", "tracer_(overwatch)", "widowmaker_(overwatch)", "2b_(nier:automata)", "tifa_lockhart", "aerith_gainsborough", "raiden_shogun", "ganyu_(genshin_impact)", "hu_tao_(genshin_impact)", "yelan_(genshin_impact)", "furina_(genshin_impact)", "kafka_(honkai:_star_rail)", "nami_(one_piece)", "nico_robin", "hinata_hyuga", "tsunade", "zero_two_(darling_in_the_franxx)", "makima_(chainsaw_man)", "power_(chainsaw_man)", "yor_forger", "frieren", "fern_(sousou_no_frieren)", "gardevoir", "lopunny"],
        2: ["genshin_impact", "overwatch", "honkai:_star_rail", "pokemon", "one_piece", "naruto", "bleach", "fate/grand_order", "blue_archive", "hololive", "league_of_legends", "final_fantasy", "nier:automata", "chainsaw_man", "my_hero_academia", "demon_slayer", "spy_x_family", "azur_lane", "arknights", "nikke:_goddess_of_victory", "resident_evil", "the_legend_of_zelda", "sonic_the_hedgehog", "undertale", "minecraft"]
      };
      var COMMON_GENERAL_SEED = [
        "1girl", "1girls", "2girls", "3girls", "1boy", "2boys", "female", "male", "solo", "breasts", "large_breasts", "huge_breasts",
        "ass", "penis", "pussy", "nipples", "cum", "clothed", "nude", "naked", "blush", "smile", "open_mouth", "closed_eyes",
        "looking_at_viewer", "long_hair", "short_hair", "blonde_hair", "brown_hair", "black_hair", "blue_hair", "red_hair", "white_hair",
        "pink_hair", "green_hair", "purple_hair", "blue_eyes", "red_eyes", "green_eyes", "brown_eyes", "yellow_eyes",
        "highres", "absurdres", "video", "sound", "animated", "colored", "monochrome", "greyscale", "back_view", "clenched_teeth",
        "cleft_of_venus", "thighhighs", "stockings", "skirt", "dress", "shirt", "gloves", "ribbon", "bow", "tail", "wings", "horns",
        "animal_ears", "cat_ears", "fox_ears", "glasses", "barefoot", "feet", "swimsuit", "bikini", "lingerie", "underwear", "panties",
        "bra", "sweat", "tears", "tongue", "saliva", "indoors", "outdoors", "simple_background", "white_background", "tagme", "translated"
      ];
      (function seedPopularTypes() {
        COMMON_GENERAL_SEED.forEach(function (name) {
          var k = normTag(name);
          if (k && !tagTypeMap[k]) tagTypeMap[k] = 1;
        });
        Object.keys(POPULAR_CAT_SEEDS).forEach(function (ty) {
          var numTy = Number(ty);
          POPULAR_CAT_SEEDS[ty].forEach(function (name) {
            var k = normTag(name);
            if (k && !tagTypeMap[k]) tagTypeMap[k] = numTy;
          });
        });
      })();
      function dapiTypeToInternal(n) { n = Number(n); return n === 1 ? 8 : n === 3 ? 2 : n === 4 ? 4 : n === 5 ? 16 : 1; }
      function tagTypeOf(t) {
        var v = t && (t.value || t.name);
        var k = normTag(v);
        if (tagTypeMap[k]) return tagTypeMap[k];
        if (t && t.type > 0) return t.type;
        return 0;
      }
      function saveTagTypes() {
        if (tagTypeSaveT) return;
        tagTypeSaveT = setTimeout(function () {
          tagTypeSaveT = null;
          var keys = Object.keys(tagTypeMap);
          if (keys.length > 6000) { keys.slice(0, keys.length - 6000).forEach(function (k) { delete tagTypeMap[k]; }); }
          jset("darknight_tagtypes", tagTypeMap);
        }, 1500);
      }
      function rememberTagType(name, type) { var k = normTag(name); if (k && type) { tagTypeMap[k] = type; saveTagTypes(); } }
      function dapiTagRow(t) { return { value: t.name, count: Number(t.count) || 0, type: dapiTypeToInternal(t.type) }; }
      // Cari kategori sekumpulan nama tag secara aman & berurutan (1 per 1, anti-429).
      async function resolveTagTypes(names, shouldContinue, onBatch) {
        if (Date.now() < rateLimitedUntil) return 0;
        var todo = [];
        (names || []).forEach(function (n) {
          var k = normTag(n);
          if (k && !tagTypeMap[k] && !tagTypeMiss[k] && !tagTypePending[k] && todo.indexOf(k) === -1) todo.push(k);
        });
        if (!todo.length) return 0;
        todo = todo.slice(0, 60);
        todo.forEach(function (k) { tagTypePending[k] = 1; });
        var found = 0, sincePaint = 0;
        for (var j = 0; j < todo.length; j++) {
          var k = todo[j];
          if ((shouldContinue && !shouldContinue()) || Date.now() < rateLimitedUntil) {
            for (var rem = j; rem < todo.length; rem++) delete tagTypePending[todo[rem]];
            break;
          }
          try {
            var one = await rule34ApiFetch({ page: "dapi", s: "tag", q: "index", name: k, limit: 1 });
            if (one && one[0] && one[0].name) {
              tagTypeMap[k] = dapiTypeToInternal(one[0].type);
              found++;
              sincePaint++;
            } else {
              tagTypeMiss[k] = 1;
            }
          } catch (e) {
            delete tagTypePending[k];
            if (e && e.message === "HTTP 429") {
              for (var rem2 = j + 1; rem2 < todo.length; rem2++) delete tagTypePending[todo[rem2]];
              break;
            }
          }
          delete tagTypePending[k];
          if (sincePaint >= 3 && typeof onBatch === "function") {
            sincePaint = 0;
            onBatch();
          }
          if (j + 1 < todo.length) await sleep(350);
        }
        saveTagTypes();
        if (sincePaint > 0 && typeof onBatch === "function") onBatch();
        if (found && typeof onTagTypesResolved === "function") onTagTypesResolved();
        return found;
      }
      var onTagTypesResolved = null;

      var alphaTagCache = {};
      try {
        var savedAlpha = lsGet("darknight_alpha_cache2");
        if (savedAlpha) {
          var parsedAlpha = JSON.parse(savedAlpha);
          if (parsedAlpha && typeof parsedAlpha === "object") alphaTagCache = parsedAlpha;
        }
      } catch (e) { }

      var saveAlphaDebounce = null;
      function saveAlphaCacheDebounced() {
        if (saveAlphaDebounce) return;
        saveAlphaDebounce = setTimeout(function () {
          saveAlphaDebounce = null;
          try {
            var toSave = {};
            Object.keys(alphaTagCache).forEach(function (k) {
              if (Array.isArray(alphaTagCache[k])) {
                toSave[k] = alphaTagCache[k].slice(0, 500);
              }
            });
            lsSet("darknight_alpha_cache2", JSON.stringify(toSave));
          } catch (e) { }
        }, 1500);
      }

      function cacheAnyTags(list) {
        if (!Array.isArray(list) || !list.length) return;
        var modified = false;
        list.forEach(function (t) {
          if (!t || !t.value) return;
          var nv = normTag(t.value);
          var fc = nv.charAt(0).toUpperCase();
          var k = /[0-9]/.test(fc) ? "0-9" : (/^[A-Z]$/.test(fc) ? fc : null);
          if (k) {
            if (!alphaTagCache[k]) alphaTagCache[k] = [];
            var found = false;
            for (var i = 0; i < alphaTagCache[k].length; i++) {
              if (normTag(alphaTagCache[k][i].value) === nv) {
                found = true;
                if ((Number(t.count) || 0) > (Number(alphaTagCache[k][i].count) || 0)) {
                  alphaTagCache[k][i] = t;
                  modified = true;
                }
                break;
              }
            }
            if (!found) {
              alphaTagCache[k].push(t);
              modified = true;
            }
          }
        });
        if (modified) {
          saveAlphaCacheDebounced();
          if (tagAlphaActive && alphaTagCache[tagAlphaActive]) {
            alphaTagCache[tagAlphaActive].sort(function (a, b) {
              var cA = Number(a.count) || 0;
              var cB = Number(b.count) || 0;
              if (cB !== cA) return cB - cA;
              return a.value.localeCompare(b.value);
            });
          }
        }
      }

      async function fetchAlphaTags(key) {
        var token = (alphaFetchTokens[key] || 0) + 1;
        alphaFetchTokens[key] = token;

        if (alphaTagCache[key] && alphaTagCache[key].length > 100 && !tagFetching) {
          renderTagList();
          return alphaTagCache[key];
        }

        var tagMap = new Map();
        if (alphaTagCache[key] && alphaTagCache[key].length) {
          alphaTagCache[key].forEach(function (t) {
            if (t && t.value) tagMap.set(normTag(t.value), t);
          });
        }

        function scheduleLiveRender() {
          if (tagAlphaActive !== key) return;
          if (alphaRenderDebounce) return;
          alphaRenderDebounce = setTimeout(function () {
            alphaRenderDebounce = null;
            if (tagAlphaActive === key) renderTagList();
          }, 70);
        }

        function processTagList(list) {
          if (!Array.isArray(list) || !list.length) return 0;
          var added = 0;
          cacheAnyTags(list);
          list.forEach(function (t) {
            if (t && t.value) {
              var nVal = normTag(t.value);
              var matches = false;
              if (key === "0-9") {
                matches = /^[0-9]/.test(nVal);
              } else {
                var lk = key.toLowerCase();
                matches = nVal.startsWith(lk) || t.value.toLowerCase().startsWith(lk);
              }
              if (matches) {
                if (!tagMap.has(nVal)) {
                  tagMap.set(nVal, t);
                  added++;
                } else {
                  var prev = tagMap.get(nVal);
                  if ((Number(t.count) || 0) > (Number(prev.count) || 0)) {
                    tagMap.set(nVal, t);
                  }
                }
              }
            }
          });

          if (added > 0 || !alphaTagCache[key] || !alphaTagCache[key].length) {
            var sorted = Array.from(tagMap.values()).sort(function (a, b) {
              var cA = Number(a.count) || 0;
              var cB = Number(b.count) || 0;
              if (cB !== cA) return cB - cA;
              return a.value.localeCompare(b.value);
            });
            alphaTagCache[key] = sorted;
            scheduleLiveRender();
          }
          return added;
        }

        tagFetching = true;
        if (tagAlphaActive === key) renderTagList();

        var lower = key.toLowerCase();

        var stemMap = {
          "a": ["armpit", "armpits", "arm_", "arms_", "areola", "areolae", "abs", "apron", "armor", "arched_", "artist_", "alien", "angel", "animal", "agent", "ahoge", "akali", "alice", "android", "apology", "aqua", "asuka", "aunt", "autofellatio", "all_fours", "armwear", "artist_name", "asphyxiation", "athletic", "azur_lane", "after_", "airtight", "amputee", "anthro", "anus", "anal_", "ass_", "asian_", "anime_", "ahegao_"],
          "b": ["big_", "blowjob_", "bondage_", "boobs_", "breasts_", "butt_", "bunny_", "black_", "blonde_", "brunette_", "bdsm", "bikini", "bukkake", "barefoot", "bell", "belly", "blindfold", "blood", "blush", "body_", "bow", "bra", "braids", "bride", "bridge", "brother", "buildup", "business", "blue_archive", "bouncing_", "back_", "bad_", "ball_", "bitch", "booty"],
          "c": ["cum_", "cock_", "creampie_", "cosplay_", "clit_", "crying_", "cat_", "close_", "collar", "corset", "cameltoe", "choker", "cleavage", "crossdressing", "cunnilingus", "cowgirl", "cheating", "cervix", "chubby", "clothed_", "coat", "crown", "cuff", "cumshot", "cyber", "cyborg", "cbt"],
          "d": ["dick_", "doggy_", "dildo_", "dark_", "dress_", "deepthroat_", "drooling", "drunk", "demon", "dragon", "double_", "defloration", "dilatation", "dominatrix", "dorm", "drow", "drill_", "dungeon", "dynamic", "date", "defeat"],
          "e": ["elf_", "erotic_", "eyes_", "ear_", "ecchi", "ejaculation", "elbow", "emotion", "enema", "erection", "exposure", "eyepatch", "extra_", "exhibitionism", "eating", "electric", "energy"],
          "f": ["female_", "fingering_", "foot_", "footjob_", "futanari_", "facial_", "femdom_", "fox_", "fart", "fat", "feelings", "fencing", "feral", "fisting", "fitness", "flashing", "flower", "fondling", "forced", "foreskin", "furry", "fur", "fangs", "free"],
          "g": ["girl_", "group_", "gangbang_", "garter_", "glasses_", "giantess_", "gag", "gender_", "genshin_impact", "giggle", "glove", "gloves", "glow", "golden_shower", "goth", "grope", "guro", "gym", "gyaru", "giant"],
          "h": ["huge_", "handjob_", "hentai_", "harem_", "hair_", "horny_", "halter", "hanging", "harness", "headband", "headphones", "heart", "heel", "heels", "helmet", "hairy", "hijab", "hoodie", "horn", "horns", "hose", "housewife", "humiliation", "hug"],
          "i": ["implied_", "interracial_", "incest", "incontinence", "inflation", "inject", "insert", "inside", "instructor", "inverted", "invisible", "iron", "isekai", "idol"],
          "j": ["japanese_", "jeans_", "jacket", "jail", "jaw", "jersey", "jewelry", "jiggle", "jockstrap", "joint", "jumpsuit"],
          "k": ["kiss_", "kneeling_", "kimono_", "kemonomimi", "kidnap", "kinky", "kitchen", "knee", "kneepits", "knees", "knife", "knot", "knotting"],
          "l": ["legs_", "lingerie_", "lactation_", "leash_", "latex_", "labia", "lace", "large_", "leather", "leotard", "lesbian", "licking", "lip", "lipstick", "living", "lolita", "long_", "loss", "lotion", "lucid"],
          "m": ["male_", "milf_", "masturbation_", "monster_", "maid_", "mouth_", "magic", "mask", "massage", "mecha", "mermaid", "messy", "micro", "mind_break", "mind_control", "mirror", "mismatched", "mound", "muscle", "muzzle", "milking"],
          "n": ["nipples_", "naked_", "netorare_", "nurse_", "navel", "neck", "necklace", "needle", "nekopara", "ninja", "no_bra", "no_panties", "nose", "nude", "nun"],
          "o": ["oral_", "orgasm_", "oil_", "outdoor_", "one_", "office", "ogre", "oil", "old", "on_bed", "on_couch", "on_floor", "on_table", "one_piece", "open_", "oppai", "original", "overflow"],
          "p": ["pussy_", "panties_", "penetration_", "pov_", "public_", "pregnant_", "petplay_", "paizuri", "pale", "pantling", "pantyhose", "piercing", "pigtails", "pillow", "pinup", "ponytail", "pool", "poster", "pubic", "pupil"],
          "q": ["queen_", "quickie", "quiver", "quiet"],
          "r": ["rape_", "red_", "rope_", "rimjob_", "rabbit", "race", "rail", "rain", "raven", "real", "rebound", "reverse", "ribbon", "riding", "ring", "ripped", "robot", "room", "rubbing"],
          "s": ["sex_", "solo_", "stockings_", "skirt_", "swimsuit_", "spanking_", "squirt_", "strapon_", "sucking_", "saliva", "scat", "schoolgirl", "scrotum", "secret", "seduction", "see_through", "semen", "shadow", "shaved", "sheath", "shimapan", "shiny", "shirt", "shoes", "shorts", "shower", "side_", "silk", "sink", "sister", "size_difference", "skin", "slave", "sleep", "slime", "slit", "small_", "smell", "smile", "smoking", "smooth", "smug", "socks", "sofa", "spit", "spread_", "spurs", "squeeze", "stained", "stall", "stand", "star", "stomach", "strap", "stretch", "striped", "strong", "stud", "submissive", "suit", "sweat"],
          "t": ["tentacles_", "thighs_", "tits_", "tied_", "twins_", "trans_", "tail", "tan", "tank_top", "tattoo", "teacher", "teasing", "tears", "teen", "thong", "throat", "thumb", "tied_up", "tight", "tomboy", "tongue", "torn", "towel", "toy", "trainer", "transformation", "trap", "trim", "triple", "tube", "tummy"],
          "u": ["underwear_", "uniform_", "uncensored_", "undressing", "umbrella", "unconscious", "underbust", "underboob", "unbuttoned", "unzipped", "upkilt", "upskirt", "urination"],
          "v": ["vaginal_", "video_", "vibrator_", "voyeur_", "vampire", "vanilla", "veil", "veins", "venus", "vest", "vine", "virgin", "visual", "voice", "vore"],
          "w": ["white_", "wet_", "wings_", "wolf_", "waist", "waitress", "walking", "wall", "wand", "warm", "wash", "water", "watersports", "web", "wedding", "whip", "whore", "wide", "wiggle", "window", "wine", "witch", "wooden", "wool", "workout", "wrestling", "wrinkles"],
          "x": ["x-ray_", "x-ray", "xenomorph"],
          "y": ["yuri_", "yaoi_", "yellow", "yoga", "young", "yandere"],
          "z": ["zombie_", "zenless_zone_zero", "zipper", "zero_two"]
        };

        var triMap = {
          "a": ["arm", "are", "art", "arc", "abs", "ana", "ani", "ano", "ant", "ass", "asp", "ast", "aba", "abi", "aca", "ace", "ach", "ada", "adi", "ado", "aeg", "ahe", "air", "aka", "aki", "aku", "ali", "all", "alm", "alp", "ama", "ame", "ami", "amp", "apa", "ape", "app", "apr", "aqu", "ata", "ath", "aud", "aur", "aut", "ava", "ave", "awa", "awk", "aya", "ayu", "azu"],
          "b": ["bab", "bac", "bad", "bag", "bal", "ban", "bar", "bas", "bat", "bea", "bed", "bel", "ben", "ber", "bes", "bet", "bik", "bil", "bin", "bir", "bit", "bla", "bli", "blo", "blu", "boa", "bob", "bod", "bon", "boo", "bor", "bot", "bou", "bow", "boy", "bra", "bre", "bri", "bro", "bru", "buk", "bul", "bun", "bur", "bus", "but"],
          "c": ["cal", "cam", "can", "cap", "car", "cas", "cat", "cav", "cer", "cha", "che", "chi", "cho", "chu", "cla", "cle", "cli", "clo", "clu", "coa", "coc", "col", "com", "con", "coo", "cor", "cos", "cou", "cow", "cra", "cre", "cri", "cro", "cru", "cry", "cuf", "cum", "cun", "cup", "cut", "cya", "cyb"],
          "d": ["dad", "dai", "dak", "dan", "dar", "dat", "dau", "dea", "deb", "dec", "dee", "def", "del", "dem", "den", "dep", "der", "des", "dia", "dic", "dil", "dim", "din", "dio", "dir", "dis", "doc", "dog", "doi", "dol", "dom", "don", "doo", "dor", "dot", "dou", "dra", "dre", "dri", "dro", "dru", "duc", "dun"],
          "e": ["ear", "eas", "ecl", "ecc", "eec", "egg", "egy", "ehe", "eir", "eja", "ela", "elb", "ele", "elf", "eli", "elk", "elm", "elo", "elv", "ema", "emb", "eme", "emi", "emo", "emp", "emu", "enc", "end", "ene", "eng", "enh", "eni", "enj", "enm", "eno", "ent", "epi", "epo", "equ", "era", "ere", "eri", "ero", "err", "esc", "esp", "est", "eta", "ete", "eth", "eun", "eve", "evi", "evo", "ewe", "exa", "exc", "exe", "exh", "exi", "exo", "exp", "ext", "eye"],
          "f": ["fac", "fai", "fak", "fal", "fam", "fan", "far", "fas", "fat", "fau", "fav", "faw", "fea", "fee", "fei", "fel", "fem", "fen", "fer", "fes", "fet", "fib", "fie", "fig", "fil", "fin", "fir", "fis", "fit", "fix", "fla", "fle", "fli", "flo", "flu", "fly", "foa", "foc", "foe", "fog", "foi", "fol", "fon", "foo", "for", "fos", "fou", "fox", "fra", "fre", "fri", "fro", "fru", "fuc", "fug", "fuj", "fuk", "ful", "fum", "fun", "fur", "fus", "fut"],
          "g": ["gag", "gai", "gal", "gam", "gan", "gap", "gar", "gas", "gat", "gau", "gay", "gea", "gee", "gei", "gel", "gem", "gen", "geo", "ger", "get", "gha", "gho", "gia", "gib", "gif", "gig", "gil", "gim", "gin", "gir", "gis", "git", "giv", "gla", "gle", "gli", "glo", "glu", "gly", "gno", "goa", "gob", "god", "gog", "goi", "gol", "gon", "goo", "gor", "gos", "got", "gou", "gow", "gra", "gre", "gri", "gro", "gru", "gry", "gui", "gun", "gur", "gut", "guy", "gwa", "gya", "gym", "gyo", "gyr"],
          "h": ["haa", "hac", "had", "hae", "haf", "hag", "hah", "hai", "haj", "hak", "hal", "ham", "han", "hap", "har", "has", "hat", "hau", "hav", "haw", "hay", "haz", "hea", "heb", "hee", "hei", "hel", "hem", "hen", "heo", "hep", "her", "hes", "het", "heu", "hid", "hie", "hig", "hij", "hik", "hil", "him", "hin", "hip", "hir", "his", "hit", "hiy", "hoa", "hob", "hoc", "hoe", "hog", "hoi", "hok", "hol", "hom", "hon", "hoo", "hop", "hor", "hos", "hot", "hou", "hov", "how", "hoy", "hub", "huf", "hug", "huh", "hui", "huk", "hul", "hum", "hun", "hup", "hur", "hus", "hut", "huv", "hyb", "hyd", "hye", "hyg", "hym", "hyp"],
          "i": ["iaa", "iba", "ibe", "ibi", "ibo", "ibu", "ica", "ice", "ich", "ici", "ico", "ict", "icy", "ida", "ide", "idi", "ido", "idu", "iga", "igi", "igl", "ign", "igo", "igu", "iih", "ika", "ike", "iki", "iko", "iku", "ila", "ill", "ilm", "ilo", "ima", "ime", "imi", "imm", "imo", "imp", "imu", "ina", "inc", "ind", "ine", "inf", "ing", "ini", "inj", "ink", "inm", "inn", "ino", "inp", "inq", "inr", "ins", "int", "inu", "inv", "inw", "iny", "inz", "ipa", "ipp", "ira", "ire", "iri", "irk", "iro", "iru", "isa", "ise", "ish", "isi", "isk", "isl", "ism", "iso", "isp", "iss", "ist", "isu", "ita", "itc", "ite", "ith", "iti", "ito", "itt", "itu", "iva", "ive", "ivo", "ivy", "iwa", "iyo", "iza", "izu"],
          "j": ["jaa", "jab", "jac", "jad", "jae", "jag", "jai", "jak", "jal", "jam", "jan", "jap", "jar", "jas", "jat", "jau", "jav", "jaw", "jay", "jea", "jee", "jeh", "jel", "jem", "jen", "jeo", "jer", "jes", "jet", "jew", "jia", "jib", "jig", "jil", "jim", "jin", "jio", "jip", "jir", "jit", "jiu", "joa", "job", "joc", "joe", "jog", "joh", "joi", "jok", "jol", "jon", "joo", "jor", "jos", "jou", "jov", "joy", "jub", "jud", "jug", "jui", "juk", "jul", "jum", "jun", "jup", "jur", "jus", "jut", "jux"],
          "k": ["kaa", "kab", "kac", "kad", "kae", "kaf", "kag", "kah", "kai", "kaj", "kak", "kal", "kam", "kan", "kao", "kap", "kar", "kas", "kat", "kau", "kav", "kaw", "kay", "kaz", "kea", "keb", "ked", "kee", "kef", "keg", "keh", "kei", "kej", "kek", "kel", "kem", "ken", "keo", "kep", "ker", "kes", "ket", "keu", "kev", "kew", "key", "kez", "kha", "khi", "kho", "kia", "kib", "kid", "kie", "kig", "kih", "kii", "kij", "kik", "kil", "kim", "kin", "kio", "kip", "kir", "kis", "kit", "kiu", "kiv", "kiw", "kiy", "kiz", "kla", "kle", "kli", "klo", "klu", "kme", "kna", "kne", "kni", "kno", "knu", "koa", "kob", "koc", "kod", "koe", "kof", "kog", "koh", "koi", "koj", "kok", "kol", "kom", "kon", "koo", "kop", "kor", "kos", "kot", "kou", "kov", "kow", "koy", "koz", "kra", "kre", "kri", "kro", "kru", "kry", "kua", "kub", "kuc", "kud", "kue", "kuf", "kug", "kuh", "kui", "kuj", "kuk", "kul", "kum", "kun", "kuo", "kup", "kur", "kus", "kut", "kuu", "kuz", "kwa", "kwi", "kya", "kye", "kyo", "kyu"],
          "l": ["laa", "lab", "lac", "lad", "lae", "laf", "lag", "lah", "lai", "laj", "lak", "lal", "lam", "lan", "lao", "lap", "laq", "lar", "las", "lat", "lau", "lav", "law", "lay", "laz", "lea", "leb", "lec", "led", "lee", "lef", "leg", "leh", "lei", "lek", "lel", "lem", "len", "leo", "lep", "ler", "les", "let", "leu", "lev", "lew", "ley", "lez", "lia", "lib", "lic", "lid", "lie", "lif", "lig", "lih", "lii", "lik", "lil", "lim", "lin", "lio", "lip", "liq", "lir", "lis", "lit", "liu", "liv", "liw", "lix", "liy", "liz", "lla", "lle", "lli", "llo", "llu", "loa", "lob", "loc", "lod", "loe", "lof", "log", "loh", "loi", "loj", "lok", "lol", "lom", "lon", "loo", "lop", "loq", "lor", "los", "lot", "lou", "lov", "low", "loy", "loz", "lua", "lub", "luc", "lud", "lue", "luf", "lug", "lui", "luj", "luk", "lul", "lum", "lun", "luo", "lup", "lur", "lus", "lut", "luu", "luv", "lux", "luz", "lya", "lyc", "lyd", "lye", "lym", "lyn", "lyo", "lyr", "lys"],
          "m": ["maa", "mab", "mac", "mad", "mae", "maf", "mag", "mah", "mai", "maj", "mak", "mal", "mam", "man", "mao", "map", "mar", "mas", "mat", "mau", "mav", "maw", "max", "may", "maz", "mea", "meb", "mec", "med", "mee", "meg", "meh", "mei", "mej", "mek", "mel", "mem", "men", "meo", "mep", "mer", "mes", "met", "meu", "mew", "mey", "mez", "mia", "mic", "mid", "mie", "mif", "mig", "mih", "mii", "mij", "mik", "mil", "mim", "min", "mio", "mip", "mir", "mis", "mit", "miu", "miv", "miw", "mix", "miy", "miz", "moa", "mob", "moc", "mod", "moe", "mof", "mog", "moh", "moi", "moj", "mok", "mol", "mom", "mon", "moo", "mop", "mor", "mos", "mot", "mou", "mov", "mow", "mox", "moy", "moz", "mua", "muc", "mud", "mue", "muf", "mug", "mui", "muj", "muk", "mul", "mum", "mun", "muo", "mup", "mur", "mus", "mut", "muu", "muz", "mwa", "mye", "myo", "myr", "mys", "myt"],
          "n": ["naa", "nab", "nac", "nad", "nae", "naf", "nag", "nah", "nai", "naj", "nak", "nal", "nam", "nan", "nao", "nap", "naq", "nar", "nas", "nat", "nau", "nav", "naw", "nay", "naz", "nea", "neb", "nec", "ned", "nee", "neg", "neh", "nei", "nek", "nel", "nem", "nen", "neo", "nep", "ner", "nes", "net", "neu", "nev", "new", "nex", "ney", "nez", "nga", "ngh", "ngo", "nia", "nib", "nic", "nid", "nie", "nif", "nig", "nih", "nii", "nij", "nik", "nil", "nim", "nin", "nio", "nip", "niq", "nir", "nis", "nit", "niu", "niv", "niw", "nix", "niy", "niz", "noa", "nob", "noc", "nod", "noe", "nof", "nog", "noh", "noi", "noj", "nok", "nol", "nom", "non", "noo", "nop", "nor", "nos", "not", "nou", "nov", "now", "nox", "noy", "noz", "nua", "nub", "nuc", "nud", "nue", "nuf", "nug", "nuh", "nui", "nuk", "nul", "num", "nun", "nuo", "nur", "nus", "nut", "nuu", "nya", "nye", "nyo", "nyu"],
          "o": ["oat", "oba", "obe", "obi", "obo", "obs", "oca", "occ", "oce", "och", "oct", "ocu", "oda", "odd", "ode", "odi", "odo", "off", "oga", "oge", "ogg", "ogi", "ogl", "ogo", "ogr", "oil", "oin", "oir", "ois", "oji", "oka", "oke", "oki", "oko", "oku", "old", "ole", "olf", "oli", "oll", "olm", "olo", "oly", "oma", "omb", "ome", "omi", "omn", "omo", "omu", "ona", "one", "oni", "onl", "onn", "ono", "ont", "ony", "ooh", "ool", "oom", "oon", "oop", "oor", "oot", "oox", "ooz", "opa", "ope", "oph", "opi", "opo", "opp", "opr", "opt", "ora", "orb", "orc", "ord", "ore", "orf", "org", "ori", "ork", "orl", "orm", "orn", "oro", "orp", "ors", "ort", "oru", "ory", "osa", "ose", "osh", "osi", "osk", "osl", "osm", "oso", "osp", "oss", "ost", "osu", "ota", "otc", "ote", "oth", "oti", "oto", "ott", "otu", "oty", "ouc", "oug", "oui", "oun", "our", "ous", "out", "ova", "ove", "ovi", "ovo", "owc", "owl", "own", "oxe", "oxi", "oxy", "oya", "oyo", "oyu", "oza", "oze", "ozi", "ozo", "ozu"],
          "p": ["paa", "pab", "pac", "pad", "pae", "pag", "pah", "pai", "paj", "pak", "pal", "pam", "pan", "pao", "pap", "paq", "par", "pas", "pat", "pau", "pav", "paw", "pay", "paz", "pea", "peb", "pec", "ped", "pee", "peg", "peh", "pei", "pel", "pem", "pen", "peo", "pep", "per", "pes", "pet", "peu", "pev", "pew", "pey", "pez", "pha", "phe", "phi", "pho", "phr", "phy", "pia", "pic", "pid", "pie", "pig", "pik", "pil", "pim", "pin", "pio", "pip", "piq", "pir", "pis", "pit", "piu", "piv", "piw", "pix", "piy", "piz", "pla", "ple", "pli", "plo", "plu", "ply", "pne", "poa", "poc", "pod", "poe", "pof", "pog", "poi", "pok", "pol", "pom", "pon", "poo", "pop", "por", "pos", "pot", "pou", "pov", "pow", "pox", "poy", "poz", "pra", "pre", "pri", "pro", "pru", "pry", "psh", "psi", "psy", "pub", "puc", "pud", "pue", "puf", "pug", "puj", "puk", "pul", "pum", "pun", "pup", "pur", "pus", "put", "puz", "pwa", "pye", "pyg", "pyj", "pyo", "pyr", "pyt"],
          "q": ["qia", "qin", "qip", "qiu", "qua", "que", "qui", "quo"],
          "r": ["raa", "rab", "rac", "rad", "rae", "raf", "rag", "rah", "rai", "raj", "rak", "ral", "ram", "ran", "rao", "rap", "raq", "rar", "ras", "rat", "rau", "rav", "raw", "rax", "ray", "raz", "rea", "reb", "rec", "red", "ree", "ref", "reg", "reh", "rei", "rej", "rek", "rel", "rem", "ren", "reo", "rep", "req", "rer", "res", "ret", "reu", "rev", "rew", "rex", "rey", "rez", "rha", "rhe", "rhi", "rho", "ria", "rib", "ric", "rid", "rie", "rif", "rig", "rih", "rii", "rij", "rik", "ril", "rim", "rin", "rio", "rip", "riq", "rir", "ris", "rit", "riu", "riv", "rix", "riy", "riz", "roa", "rob", "roc", "rod", "roe", "rog", "roh", "roi", "rok", "rol", "rom", "ron", "roo", "rop", "roq", "ror", "ros", "rot", "rou", "rov", "row", "rox", "roy", "roz", "rua", "rub", "ruc", "rud", "rue", "ruf", "rug", "ruh", "rui", "ruj", "ruk", "rul", "rum", "run", "ruo", "rup", "rur", "rus", "rut", "ruu", "ruv", "rux", "ruy", "ruz", "rya", "rye", "ryo", "ryu"],
          "s": ["saa", "sab", "sac", "sad", "sae", "saf", "sag", "sah", "sai", "saj", "sak", "sal", "sam", "san", "sao", "sap", "saq", "sar", "sas", "sat", "sau", "sav", "saw", "sax", "say", "saz", "sca", "sce", "sch", "sci", "sco", "scr", "scu", "sea", "seb", "sec", "sed", "see", "seg", "seh", "sei", "sej", "sek", "sel", "sem", "sen", "seo", "sep", "seq", "ser", "ses", "set", "seu", "sev", "sew", "sex", "sey", "sez", "sha", "she", "shi", "shk", "shl", "shm", "sho", "shp", "shr", "shu", "shw", "shy", "sia", "sib", "sic", "sid", "sie", "sif", "sig", "sih", "sii", "sik", "sil", "sim", "sin", "sio", "sip", "sir", "sis", "sit", "siu", "siv", "six", "siy", "siz", "ska", "ske", "ski", "skl", "sko", "skr", "sku", "sky", "sla", "sle", "sli", "sll", "slo", "slr", "slu", "sly", "sma", "sme", "smi", "smo", "smu", "sna", "sne", "sni", "sno", "snu", "soa", "sob", "soc", "sod", "soe", "sof", "sog", "soh", "soi", "soj", "sok", "sol", "som", "son", "soo", "sop", "sor", "sos", "sot", "sou", "sov", "sow", "sox", "soy", "soz", "spa", "spe", "sph", "spi", "spl", "spo", "spr", "spu", "spy", "squ", "sri", "sta", "ste", "sth", "sti", "sto", "str", "stu", "sty", "sua", "sub", "suc", "sud", "sue", "suf", "sug", "suh", "sui", "suj", "suk", "sul", "sum", "sun", "suo", "sup", "sur", "sus", "sut", "suu", "suv", "suw", "suz", "swa", "swe", "swi", "swo", "swu", "sya", "sye", "syo", "syu"],
          "t": ["taa", "tab", "tac", "tad", "tae", "taf", "tag", "tah", "tai", "taj", "tak", "tal", "tam", "tan", "tao", "tap", "taq", "tar", "tas", "tat", "tau", "tav", "taw", "tax", "tay", "taz", "tea", "teb", "tec", "ted", "tee", "teg", "teh", "tei", "tej", "tek", "tel", "tem", "ten", "teo", "tep", "ter", "tes", "tet", "teu", "tev", "tew", "tex", "tey", "tez", "tha", "the", "thi", "tho", "thr", "thu", "tia", "tib", "tic", "tid", "tie", "tif", "tig", "tih", "tii", "tij", "tik", "til", "tim", "tin", "tio", "tip", "tiq", "tir", "tis", "tit", "tiu", "tiv", "tiw", "tix", "tiy", "tiz", "toa", "tob", "toc", "tod", "toe", "tof", "tog", "toh", "toi", "toj", "tok", "tol", "tom", "ton", "too", "top", "toq", "tor", "tos", "tot", "tou", "tov", "tow", "tox", "toy", "toz", "tra", "tre", "tri", "tro", "tru", "try", "tsu", "tua", "tub", "tuc", "tud", "tue", "tuf", "tug", "tuh", "tui", "tuk", "tul", "tum", "tun", "tuo", "tup", "tur", "tus", "tut", "tuu", "tuv", "twa", "twe", "twi", "two", "tya", "tye", "tyi", "tyl", "tyo", "typ", "tyr"],
          "u": ["uba", "ubi", "ubo", "ubu", "uca", "uch", "ude", "udi", "udo", "udu", "ueh", "uem", "ues", "uff", "uga", "uge", "ugi", "ugo", "ugu", "uha", "uho", "uhr", "uis", "uji", "uka", "uke", "uki", "uko", "uku", "ula", "ulb", "ule", "ulf", "uli", "ull", "ulm", "ulo", "ulp", "ulq", "ult", "ulu", "uma", "umb", "ume", "umi", "umo", "ump", "umu", "una", "unb", "unc", "und", "une", "unf", "ung", "unh", "uni", "unj", "unk", "unl", "unm", "unn", "uno", "unp", "unr", "uns", "unt", "unu", "unv", "unw", "unx", "uny", "unz", "uon", "upa", "upb", "upc", "upd", "upe", "upg", "uph", "upi", "upk", "upl", "upm", "upo", "upp", "upr", "ups", "upt", "upu", "upv", "upw", "upz", "ura", "urb", "urc", "urd", "ure", "urf", "urg", "uri", "urn", "uro", "urp", "urr", "urs", "urt", "uru", "ury", "usa", "usb", "use", "ush", "usi", "usk", "usl", "uso", "usp", "usr", "uss", "ust", "usu", "uta", "utc", "ute", "uth", "uti", "uto", "uts", "utt", "utu", "uty", "uva", "uve", "uvi", "uwa", "uya", "uza", "uzi", "uzu"],
          "v": ["vaa", "vac", "vad", "vae", "vag", "vai", "vaj", "vak", "val", "vam", "van", "vao", "vap", "var", "vas", "vat", "vau", "vav", "vaw", "vay", "vaz", "vea", "vec", "ved", "vee", "veg", "veh", "vei", "vel", "vem", "ven", "veo", "vep", "ver", "ves", "vet", "veu", "vev", "vex", "vey", "vez", "via", "vib", "vic", "vid", "vie", "vig", "vih", "vii", "vik", "vil", "vim", "vin", "vio", "vip", "vir", "vis", "vit", "viu", "viv", "vix", "viy", "viz", "vla", "vle", "vli", "vlu", "voa", "voc", "vod", "voe", "vog", "voi", "vol", "vom", "von", "voo", "vop", "vor", "vos", "vot", "vou", "vow", "vox", "voy", "voz", "vri", "vse", "vuc", "vuk", "vul", "vur", "vya", "vye", "vyo"],
          "w": ["waa", "wab", "wac", "wad", "wae", "waf", "wag", "wah", "wai", "waj", "wak", "wal", "wam", "wan", "wao", "wap", "waq", "war", "was", "wat", "wau", "wav", "waw", "wax", "way", "waz", "wea", "web", "wed", "wee", "weg", "weh", "wei", "wel", "wen", "wer", "wes", "wet", "wev", "wex", "wha", "whe", "whi", "who", "why", "wic", "wid", "wie", "wif", "wig", "wii", "wik", "wil", "wim", "win", "wio", "wip", "wir", "wis", "wit", "wiv", "wiz", "woa", "wob", "woe", "wof", "wok", "wol", "wom", "won", "woo", "wor", "wos", "wot", "wou", "wow", "wox", "wra", "wre", "wri", "wro", "wru", "wry", "wue", "wun", "wur", "wuu", "wya", "wyl", "wyn"],
          "x": ["xal", "xan", "xav", "xen", "xia", "xie", "xin", "xio", "xra", "x-r"],
          "y": ["yaa", "yab", "yac", "yad", "yae", "yaf", "yag", "yah", "yai", "yaj", "yak", "yal", "yam", "yan", "yao", "yap", "yaq", "yar", "yas", "yat", "yau", "yav", "yaw", "yay", "yaz", "yea", "yeb", "yec", "yed", "yee", "yeg", "yeh", "yei", "yel", "yem", "yen", "yeo", "yer", "yes", "yet", "yew", "yez", "ygg", "yid", "yim", "yin", "yio", "yis", "yiu", "yke", "yma", "yoh", "yoi", "yok", "yom", "yon", "yoo", "yor", "yos", "you", "yow", "yoz", "yra", "yri", "yua", "yub", "yue", "yuf", "yug", "yui", "yuj", "yuk", "yul", "yum", "yun", "yuo", "yup", "yur", "yus", "yut", "yuu", "yuv", "yuy", "yuz", "yve", "yvo", "ywa"],
          "z": ["zaa", "zac", "zad", "zaf", "zag", "zah", "zai", "zaj", "zak", "zal", "zam", "zan", "zao", "zap", "zar", "zas", "zat", "zau", "zav", "zaw", "zax", "zay", "zaz", "zea", "zeb", "zee", "zeg", "zei", "zek", "zel", "zem", "zen", "zeo", "zep", "zer", "zet", "zeu", "zha", "zhe", "zhi", "zho", "zhu", "zia", "zie", "zig", "zik", "zil", "zim", "zin", "zio", "zip", "zir", "zis", "zit", "ziv", "ziz", "zlu", "zme", "zoa", "zod", "zoe", "zof", "zog", "zom", "zon", "zoo", "zop", "zor", "zos", "zot", "zou", "zow", "zro", "zst", "zub", "zue", "zuf", "zug", "zui", "zuk", "zul", "zum", "zun", "zup", "zur", "zus", "zva", "zwa", "zye", "zyg", "zyo", "zyr"]
        };

        var queryQueue = [];
        if (key === "0-9") {
          queryQueue = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1g", "2g", "3g", "1b", "2b", "3d", "4k", "69", "1girl", "2girls", "3girls", "1boy", "2boys"];
        } else {
          queryQueue.push(lower, lower + "_");
          if (stemMap[lower]) {
            stemMap[lower].forEach(function (st) {
              if (queryQueue.indexOf(st) === -1) queryQueue.push(st);
            });
          }
          if (triMap[lower]) {
            triMap[lower].forEach(function (tri) {
              if (queryQueue.indexOf(tri) === -1) queryQueue.push(tri);
            });
          }
          "abcdefghijklmnopqrstuvwxyz".split("").forEach(function (ch) {
            var pair = lower + ch;
            if (queryQueue.indexOf(pair) === -1) queryQueue.push(pair);
          });
        }

        var concurrency = 6;
        var cursor = 0;

        async function worker() {
          while (cursor < queryQueue.length) {
            if (alphaFetchTokens[key] !== token || tagAlphaActive !== key) break;
            var q = queryQueue[cursor++];
            try {
              var autoRes = await r34Autocomplete(q).catch(function () { return []; });
              if (alphaFetchTokens[key] !== token) break;
              if (Array.isArray(autoRes) && autoRes.length) processTagList(autoRes);
            } catch (err) { }
          }
        }

        var workers = [];
        for (var w = 0; w < concurrency; w++) {
          workers.push(worker());
        }

        await Promise.all(workers);

        if (alphaFetchTokens[key] === token) {
          tagFetching = false;
          if (tagAlphaActive === key) {
            renderTagList();
          }
        }
        return alphaTagCache[key];
      }

      // Memuat halaman ke state BROWSE (grid). State putar (tagPosts) tidak tersentuh.
      async function loadTagDetail(tags, reset) {
        if (Array.isArray(tags)) bTags = tags.slice();
        else if (typeof tags === "string") bTags = [tags];
        if (reset) { ++bToken; bPosts = []; bSet = new Set(); bCursor = 0; bHasMore = true; bLoading = false; }
        if (!bHasMore || bLoading) return;
        var myTok = bToken, myTags = bTags.slice(), cfg = currentCfg();
        bLoading = true;
        rerender();
        try {
          var added = 0, tries = 0;
          while (bHasMore && added < 20 && tries++ < 4) {
            var res = await fetchTagPage(myTags, bCursor, cfg);
            if (myTok !== bToken) return;
            res.kept.forEach(function (item) {
              var n = Number(item.id);
              if (!bSet.has(n)) { bSet.add(n); bPosts.push(n); added++; }
            });
            bCursor += 1;
            if (res.raw.length < PAGE) bHasMore = false;
          }
        } catch (err) {
          if (myTok === bToken) toast("Gagal memuat post: " + (err.message || "koneksi"), "bad");
        } finally {
          if (myTok === bToken) { bLoading = false; rerender(); }
        }
      }

      // Memuat halaman berikutnya ke state PUTAR (dipanggil saat hampir habis di mode tag)
      async function loadMoreTagPosts() {
        if (!activeTag || tagLoading || !tagHasMore) return;
        var myTok = tagRequestToken, tags = activeTagsDetail.slice(), cfg = playCfg || currentCfg();
        tagLoading = true;
        try {
          var added = 0, tries = 0;
          while (tagHasMore && added < 20 && tries++ < 4) {
            var res = await fetchTagPage(tags, tagCursor || 0, cfg);
            if (myTok !== tagRequestToken) return;
            res.kept.forEach(function (item) {
              var n = Number(item.id);
              if (!tagSet.has(n)) { tagSet.add(n); tagPosts.push(n); added++; }
            });
            tagCursor = (tagCursor || 0) + 1;
            if (res.raw.length < PAGE) tagHasMore = false;
          }
        } catch (err) {
          if (myTok === tagRequestToken) toast("Gagal memuat post berikutnya", "bad");
        } finally {
          if (myTok === tagRequestToken) tagLoading = false;
        }
        if (activeTag) updateChip();
      }

      function saveTagAsPlaylist(tagTitle) {
        if (!bPosts.length) { toast("Tidak ada post untuk disimpan", "bad"); return; }
        var plName = "Tag: " + tagTitle;
        var existing = null;
        playlists.forEach(function (pl) { if (pl.name.toLowerCase() === plName.toLowerCase()) existing = pl; });
        if (existing) {
          var added = 0;
          bPosts.forEach(function (id) { if (!isIn(existing, id)) { existing.postIds.push(id); added++; } });
          persist();
          toast("Ditambahkan " + added + " post ke " + existing.name, "ok");
        } else {
          var newPl = { id: genId(), name: plName, postIds: bPosts.slice(), last: null };
          playlists.push(newPl);
          persist();
          toast("Playlist '" + plName + "' dibuat (" + bPosts.length + " post)", "ok");
        }
        refreshBtns();
      }

      var tagDebounceT = null;

      var tagListErr = false, tagFetching = false, tagSearching = false, tagPickMode = "want", tagCatFilter = null, tagAlphaActive = null;
      function normTag(v) { return String(v || "").trim().toLowerCase().replace(/\s+/g, "_"); }
      function tagLabel(arr) { return arr && arr.length ? arr.join(" + ") : (tagSortMode === "popular" ? "Terpopuler" : "Semua post"); }
      function fmtN(n) { n = Number(n) || 0; if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M"; if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k"; return String(n); }
      function openTag(t) {
        selectedTags = Array.isArray(t) ? t.slice() : [t];
        tagView = "detail"; tdPick = null; refreshBadges();
        openSheet("tags", "detail"); loadTagDetail(selectedTags.slice(), true);
      }
      function filterSummary() {
        var a = [];
        if (tagSortMode === "popular" || tagSortMode === "views") a.push("Terpopuler"); else if (tagSortMode === "hot") a.push("Hot"); else if (tagSortMode === "oldest") a.push("Terlama");
        if (S.safeMode) a.push("Mode aman");
        if (tagTypeFilter === 1) a.push("Video"); else if (tagTypeFilter === 0) a.push("Gambar");
        if (S.filterAi) a.push("Tanpa AI");
        if (blacklistTags.length) a.push(blacklistTags.length + " tag disembunyikan");
        return a;
      }
      function refreshBadges() {
        try {
          var f = filterSummary().length > 0, fb = $("filterBtn"), tb = $("tagBtn");
          if (fb) fb.classList.toggle("dot", f);
          if (tb) tb.classList.toggle("dot", selectedTags.length > 0);
        } catch (e) { }
      }
      function syncTagUI() {
        refreshBadges();
        if (filterHubBackdrop && filterHubBackdrop.classList.contains("open")) renderFilterHub();
        if ($("tagListContainer")) { renderTagFsum(); renderTagBar(); renderTagList(); }
      }
      function chipEl(label, cls, onRemove) {
        var c = el("span", "fh-chip " + (cls || ""), label);
        var x = el("button", ""); x.innerHTML = ic("x"); x.title = "Hapus";
        x.onclick = function (e) { e.stopPropagation(); onRemove(); };
        c.appendChild(x); return c;
      }

      function toggleTagWant(val) {
        var name = normTag(val); if (!name) return;
        var i = selectedTags.indexOf(name);
        if (i !== -1) { selectedTags.splice(i, 1); }
        else {
          selectedTags.push(name);
          var bi = blacklistTags.indexOf(name);
          if (bi !== -1) { blacklistTags.splice(bi, 1); saveBlacklist(); toast("Dikeluarkan dari daftar sembunyi: " + name); }
        }
        syncTagUI();
      }
      function toggleTagBlock(val) {
        var name = normTag(val); if (!name) return;
        var i = blacklistTags.indexOf(name);
        if (i !== -1) { blacklistTags.splice(i, 1); }
        else {
          blacklistTags.push(name);
          var si = selectedTags.indexOf(name);
          if (si !== -1) selectedTags.splice(si, 1);
        }
        saveBlacklist(); syncTagUI();
      }

      function renderTagFsum() {
        var f = $("tagFsum"); if (!f) return;
        var a = filterSummary();
        if (!a.length) { f.style.display = "none"; return; }
        f.style.display = "flex";
        f.innerHTML = ic("filter") + "<span>Filter aktif: " + esc(a.join(" · ")) + "</span><u>Ubah</u>";
      }
      function renderBlockBar(bar) {
        if (!blacklistTags.length) { bar.classList.remove("on"); return; }
        bar.classList.add("on");
        var chips = el("div", "tagbar-chips");
        blacklistTags.forEach(function (t) { chips.appendChild(chipEl(t, "block", function () { toggleTagBlock(t); })); });
        bar.appendChild(chips);
        var row = el("div", "tagbar-row");
        var ok = el("button", "bwide b-pri");
        ok.innerHTML = ic("check") + "<span>Selesai (" + blacklistTags.length + " disembunyikan)</span>";
        ok.onclick = function () { closeSheet(); openFilterHub(); };
        var clr = el("button", "bwide b-sec", "Kosongkan");
        clr.onclick = function () { blacklistTags = []; saveBlacklist(); syncTagUI(); };
        row.appendChild(ok); row.appendChild(clr);
        bar.appendChild(row);
      }
      function renderTagBar() {
        var bar = $("tagBar"); if (!bar) return;
        bar.innerHTML = "";
        if (tagPickMode === "block") { renderBlockBar(bar); return; }
        if (!selectedTags.length) { bar.classList.remove("on"); return; }
        bar.classList.add("on");
        var chips = el("div", "tagbar-chips");
        selectedTags.forEach(function (t) { chips.appendChild(chipEl(t, "", function () { toggleTagWant(t); })); });
        bar.appendChild(chips);
        var row = el("div", "tagbar-row");
        var go = el("button", "bwide b-pri");
        go.innerHTML = ic("play") + "<span>" + (selectedTags.length === 1 ? "Tonton tag ini" : "Tonton " + selectedTags.length + " tag sekaligus") + "</span>";
        go.onclick = function () { tagView = "detail"; loadTagDetail(selectedTags.slice(), true); };
        var clr = el("button", "bwide b-sec", "Kosongkan");
        clr.onclick = function () { selectedTags = []; syncTagUI(); };
        row.appendChild(go); row.appendChild(clr);
        bar.appendChild(row);
      }
      function renderTagList() {
        var box = $("tagListContainer"); if (!box) return;
        box.innerHTML = "";
        var rawSrc = [];
        var listTitle = "Tag Populer";

        if (tagAlphaActive) {
          rawSrc = alphaTagCache[tagAlphaActive] || [];
          if (tagFetching) {
            listTitle = "Memuat tag '" + tagAlphaActive + "'... (" + (rawSrc.length ? rawSrc.length + " termuat" : "mengambil data") + ")";
          } else {
            listTitle = "Semua Tag Berawalan '" + tagAlphaActive + "'";
          }
        } else if (tagSearchTerm) {
          rawSrc = searchedTags;
          listTitle = "Hasil Pencarian";
        } else {
          rawSrc = popularTagsCache;
          listTitle = "Tag Populer";
        }

        var src = tagCatFilter !== null ? rawSrc.filter(function (t) { return tagTypeOf(t) === tagCatFilter; }) : rawSrc;
        // Gabungkan tag kategori yang sudah dikenal di cache/seed (sesuai filter: ★, huruf A-Z, atau pencarian)
        if (tagCatFilter !== null) {
          var seenCat = {};
          src.forEach(function (t) { seenCat[normTag(t.value)] = 1; });
          var extraCat = [];
          function matchesActiveScope(name) {
            var nm = normTag(name);
            if (tagAlphaActive) {
              if (tagAlphaActive === "0-9") return /^[0-9]/.test(nm);
              return nm.charAt(0) === tagAlphaActive.toLowerCase();
            }
            if (tagSearchTerm) return nm.indexOf(normTag(tagSearchTerm)) !== -1;
            return true;
          }
          (POPULAR_CAT_SEEDS[tagCatFilter] || []).forEach(function (name) {
            var k = normTag(name);
            if (!seenCat[k] && matchesActiveScope(k) && (tagTypeMap[k] === tagCatFilter || !tagTypeMap[k])) {
              seenCat[k] = 1;
              extraCat.push({ value: name, count: 0, popularity: 0, type: tagCatFilter });
            }
          });
          Object.keys(tagTypeMap).forEach(function (k) {
            if (tagTypeMap[k] === tagCatFilter && !seenCat[k] && matchesActiveScope(k)) {
              seenCat[k] = 1;
              extraCat.push({ value: k, count: 0, popularity: 0, type: tagCatFilter });
            }
          });
          if (extraCat.length) src = src.concat(extraCat);
        }
        if (!src.length) {
          if (tagSearchTerm) { box.appendChild(el("div", "empty", tagSearching ? "Mencari…" : "Tag tidak ditemukan")); return; }
          if (tagCatFilter !== null && rawSrc.length && !tagFetching) {
            box.appendChild(el("div", "empty", "Belum ada tag kategori ini di daftar huruf ini. Buka Detail (i) pada post untuk mengenali lebih banyak tag, atau cari di kotak pencarian."));
            return;
          }
          if (tagListErr) {
            box.appendChild(el("div", "empty", "Gagal memuat daftar tag."));
            var rb = el("button", "pill", "Coba lagi");
            rb.onclick = function () { tagListErr = false; renderTagList(); };
            box.appendChild(rb);
            return;
          }
          box.appendChild(el("div", "empty", tagFetching ? "Memuat tag bertahap…" : "Memuat tag…"));
          if (!tagFetching && !tagAlphaActive) {
            tagFetching = true;
            var popSeeds = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
            function dapiTagType(rawType) {
              var n = Number(rawType);
              if (n === 1) return 8; // artist
              if (n === 4) return 4; // character
              if (n === 3) return 2; // copyright
              if (n === 5) return 16; // metadata
              if (n === 0) return 1; // general
              return 0;
            }
            var dapiTagPromise = rule34ApiFetch({ page: "dapi", s: "tag", q: "index", order: "count", limit: 1000, _xml: true })
              .then(function (rows) {
                if (!Array.isArray(rows)) return [];
                return rows.map(function (r) {
                  var val = r.name || r.value || "";
                  var cnt = parseInt(r.count, 10) || 0;
                  var tp = dapiTagType(r.type);
                  if (val && tp) tagTypeMap[normTag(val)] = tp;
                  return val ? { value: val, count: cnt, popularity: cnt, type: tp } : null;
                }).filter(Boolean);
              }).catch(function () { return []; });

            var acResults = [];
            var seedIdx = 0;
            function runAcBatch() {
              var workers = [];
              for (var w = 0; w < 6; w++) {
                workers.push((async function () {
                  while (seedIdx < popSeeds.length) {
                    var q = popSeeds[seedIdx++];
                    var arr = await r34Autocomplete(q).catch(function () { return []; });
                    if (Array.isArray(arr) && arr.length) acResults.push(arr);
                  }
                })());
              }
              return Promise.all(workers);
            }

            Promise.all([dapiTagPromise, runAcBatch()])
              .then(function (resArr) {
                var dapiTags = resArr[0] || [];
                var groups = [dapiTags].concat(acResults);
                var seen = new Map();
                groups.forEach(function (arr) {
                  (arr || []).forEach(function (t) {
                    if (!t || !t.value) return;
                    var nv = normTag(t.value);
                    var ex = seen.get(nv);
                    if (!ex || (t.count || 0) > (ex.count || 0)) {
                      seen.set(nv, ex && ex.type && !t.type ? Object.assign({}, t, { type: ex.type }) : t);
                    } else if (ex && !ex.type && t.type) {
                      ex.type = t.type;
                    }
                  });
                });
                popularTagsCache = Array.from(seen.values()).sort(function (a, b) {
                  return (b.count || 0) - (a.count || 0);
                });
                cacheAnyTags(popularTagsCache);
                saveTagTypes();
                if (!popularTagsCache.length) tagListErr = true;
              }).catch(function () { tagListErr = true; }).then(function () { tagFetching = false; renderTagList(); });
          }
          return;
        }
        box.appendChild(el("div", "tlabel", listTitle + " (" + src.length + " tag)"));
        var renderedCount = 0;
        var PAGE_SZ = 120;
        function renderTagChunk() {
          var slice = src.slice(renderedCount, renderedCount + PAGE_SZ);
          renderedCount += slice.length;
          var frag = document.createDocumentFragment();
          slice.forEach(function (t) {
            var val = t.value;
            var normVal = normTag(val);
            var blockMode = tagPickMode === "block";
            var isSel = !blockMode && selectedTags.indexOf(normVal) !== -1;
            var isBlk = blacklistTags.indexOf(normVal) !== -1;
            var row = el("div", "trow" + (isSel ? " sel" : "") + (isBlk ? " blk" : ""));
            var ck = el("span", "tck");
            if (isSel) ck.innerHTML = ic("check");
            else if (blockMode && isBlk) ck.innerHTML = ic("ban");
            row.appendChild(ck);
            row.appendChild(el("span", "tnm", val));
            var tt = tagTypeOf(t);
            var kind = tt === 8 ? ["artist", "Artist"] : tt === 4 ? ["character", "Karakter"] : tt === 2 ? ["copyright", "Seri"] : null;
            if (isBlk) row.appendChild(el("span", "tkind", "disembunyikan"));
            else if (kind) row.appendChild(el("span", "tkind " + kind[0], kind[1]));
            if (t.count) row.appendChild(el("span", "tcnt", fmtN(t.count)));
            var go = el("button", "tgo"); go.innerHTML = ic("play"); go.title = "Lihat post";
            go.onclick = function (e) {
              e.stopPropagation();
              selectedTags = [normVal];
              tagView = "detail";
              refreshBadges();
              loadTagDetail([normVal], true);
            };
            if (!blockMode) row.appendChild(go);
            row.onclick = function () {
              if (blockMode) toggleTagBlock(normVal);
              else toggleTagWant(normVal);
            };
            frag.appendChild(row);
          });
          box.appendChild(frag);
          if (renderedCount < src.length) {
            var mb = el("button", "bwide b-sec", "Muat " + Math.min(PAGE_SZ, src.length - renderedCount) + " tag lagi (" + renderedCount + "/" + src.length + ")");
            mb.style.marginTop = "8px";
            mb.onclick = function () { mb.remove(); renderTagChunk(); };
            box.appendChild(mb);
          }
        }
        renderTagChunk();
      }
      onTagTypesResolved = function () {
        clearTimeout(tagTypeRenderT);
        tagTypeRenderT = setTimeout(function () {
          if (sheet && sheet.classList.contains("open") && sheetTab === "tags" && tagView === "list") renderTagList();
        }, 200);
      };
      function onTagSearchInput(val) {
        tagSearchTerm = val.trim();
        var clr = $("tagSearchClear"); if (clr) clr.style.display = tagSearchTerm ? "flex" : "none";
        clearTimeout(tagDebounceT);
        if (!tagSearchTerm) {
          searchedTags = [];
          tagSearching = false;
          renderTagList();
          return;
        }
        tagAlphaActive = null;
        var actAlphaBtn = document.querySelector(".tag-alpha-btn.on");
        if (actAlphaBtn) actAlphaBtn.classList.remove("on");

        tagSearching = true;
        renderTagList();
        var term = tagSearchTerm;
        tagDebounceT = setTimeout(async function () {
          try {
            var queryTerm = term.replace(/\s+/g, "_");
            var autoRes = await r34Autocomplete(queryTerm).catch(function () { return []; });
            if (term !== tagSearchTerm) return;
            var combined = Array.isArray(autoRes) ? autoRes : [];
            var seen = new Map();
            combined.forEach(function (t) {
              if (t && t.value) {
                var nv = normTag(t.value);
                if (!seen.has(nv)) {
                  seen.set(nv, t);
                } else {
                  var ex = seen.get(nv);
                  if ((Number(t.count) || 0) > (Number(ex.count) || 0)) {
                    seen.set(nv, t);
                  }
                  if (t.type && t.type !== 1 && (!ex.type || ex.type === 1)) {
                    ex.type = t.type;
                  }
                }
              }
            });
            searchedTags = Array.from(seen.values()).sort(function (a, b) {
              return (Number(b.count) || 0) - (Number(a.count) || 0);
            });
            cacheAnyTags(searchedTags);
          } catch (e) {
            if (term !== tagSearchTerm) return;
            searchedTags = [];
          }
          tagSearching = false;
          renderTagList();
        }, 250);
      }
      var tagAlphaOpen = false, alphaDebT = null;
      function fetchAlphaSoon(k) { clearTimeout(alphaDebT); alphaDebT = setTimeout(function () { fetchAlphaTags(k); }, 400); }
      function renderTagsView() {
        var b = sheetBody;
        if (tagView === "detail") { renderTagDetailView(); return; }
        b.innerHTML = "";
        var sb = el("div", "tagsearchbox");
        var si = el("span", "search-ico"); si.innerHTML = ic("search");
        var inp = el("input");
        inp.id = "tagSearchInput"; inp.type = "text"; inp.autocomplete = "off";
        inp.setAttribute("autocapitalize", "off");
        inp.placeholder = "Cari tag (artist, karakter, seri…)";
        inp.value = tagSearchTerm;
        inp.oninput = function () { onTagSearchInput(inp.value); };
        var clr = el("button", "clear-btn"); clr.id = "tagSearchClear"; clr.innerHTML = ic("x");
        clr.style.display = tagSearchTerm ? "flex" : "none";
        clr.onclick = function () { inp.value = ""; onTagSearchInput(""); inp.focus(); };
        sb.appendChild(si); sb.appendChild(inp); sb.appendChild(clr);
        b.appendChild(sb);

        // 2. Kategori Tag Simetris (5 Kolom Rata: 20% x 5)
        var catBar = el("div", "tag-cat-bar");
        var cats = [
          [null, "Semua", ""],
          [8, "Artist", "artist"],
          [4, "Karakter", "char"],
          [2, "Seri", "copy"],
          [1, "General", ""]
        ];
        cats.forEach(function (c) {
          var cb = el("button", "tag-cat-btn" + (c[2] ? " " + c[2] : "") + (tagCatFilter === c[0] ? " on" : ""), c[1]);
          cb.onclick = function () {
            tagCatFilter = c[0];
            renderTagsView();
          };
          catBar.appendChild(cb);
        });
        b.appendChild(catBar);

        // 3. Keypad Abjad 7 x 4 = 28 Tombol Simetris Presisi (Zero Celah)
        var alphaPad = el("div", "tag-alpha-row");

        // Cell 1: Populer
        var popBtn = el("button", "tag-alpha-btn" + (!tagAlphaActive ? " on" : ""));
        popBtn.innerHTML = ic("star");
        popBtn.title = "Tag Populer";
        popBtn.onclick = function () {
          tagAlphaActive = null;
          tagSearchTerm = "";
          inp.value = "";
          renderTagsView();
        };
        alphaPad.appendChild(popBtn);

        // Cell 2 - 27: Huruf A sampai Z
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function (ch) {
          var ab = el("button", "tag-alpha-btn" + (tagAlphaActive === ch ? " on" : ""), ch);
          ab.onclick = function () {
            tagAlphaActive = ch;
            tagSearchTerm = "";
            inp.value = "";
            renderTagsView();
            fetchAlphaSoon(ch);
          };
          alphaPad.appendChild(ab);
        });

        // Cell 28: Angka 0-9 (#)
        var numBtn = el("button", "tag-alpha-btn" + (tagAlphaActive === "0-9" ? " on" : ""), "#");
        numBtn.title = "Tag berawalan angka (0-9)";
        numBtn.onclick = function () {
          tagAlphaActive = "0-9";
          tagSearchTerm = "";
          inp.value = "";
          renderTagsView();
          fetchAlphaSoon("0-9");
        };
        alphaPad.appendChild(numBtn);

        b.appendChild(alphaPad);
        var actAlpha = alphaPad.querySelector(".on"); if (actAlpha && actAlpha.offsetLeft > 200) alphaPad.scrollLeft = actAlpha.offsetLeft - 120;

        if (tagPickMode === "block") {
          var blkNotice = el("div", "fsum");
          blkNotice.style.cssText = "background:rgba(239,68,68,.10);border-color:rgba(239,68,68,.3);color:#fca5a5";
          blkNotice.innerHTML = ic("ban") + "<span>Mode sembunyikan — tap tag untuk menyembunyikan post bertag itu.</span>";
          var doneBtn = el("u", "", "Selesai");
          doneBtn.onclick = function () { closeSheet(); openFilterHub(); };
          blkNotice.appendChild(doneBtn);
          b.appendChild(blkNotice);
        } else {
          b.appendChild(el("div", "tagmode-hint", "Tap tag untuk memilih, lalu tonton."));
        }

        var fs = el("button", "fsum"); fs.id = "tagFsum"; fs.style.display = "none";
        fs.onclick = function () { openFilterHub(); };
        b.appendChild(fs);

        var box = el("div", "tlist"); box.id = "tagListContainer";
        b.appendChild(box);
        var bar = el("div", "tagbar"); bar.id = "tagBar";
        b.appendChild(bar);
        renderTagFsum(); renderTagBar(); renderTagList();
      }
      function ipill(icon, txt, cls, fn) {
        var b = el("button", "pill " + (cls || ""));
        b.innerHTML = ic(icon) + "<span>" + esc(txt) + "</span>";
        b.onclick = fn; return b;
      }
      var tdPick = null;
      function renderTagDetailView() {
        var b = sheetBody;
        var titleStr = bTags.length ? bTags.join(" + ") : "Semua post";
        var head = el("div", "tdhead");
        head.appendChild(el("div", "tdtitle", titleStr));
        var sm = filterSummary();
        head.appendChild(el("div", "tdsub", bPosts.length + (bHasMore ? "+" : "") + " post" + (sm.length ? " · " + sm.join(" · ") : "")));
        b.appendChild(head);

        var row = el("div", "arow");
        var tagsNow = bTags.slice();
        var cp = getResume(tagsNow);
        if (cp) {
          var posLabel = cp.index >= 0 ? " (post #" + (cp.index + 1) + ")" : "";
          row.appendChild(ipill("play", "Lanjut #" + cp.id + posLabel, "pri", function () { resumeTag(tagsNow); }));
          row.appendChild(ipill("refresh", "Mulai dari #1", "dng", function () {
            dialog("Hapus checkpoint <b>#" + cp.id + "</b> dan mulai dari awal?", { ok: "Hapus & mulai", danger: true }, function () {
              clearTagCheckpoint(tagsNow);
              clearTagProg(tagsNow);
              startTag(tagsNow, null, false);
              toast("Checkpoint direset, mulai dari awal", "ok");
            });
          }));
        } else {
          row.appendChild(ipill("play", "Putar semua", "pri", function () { startTag(tagsNow, null, false); }));
        }
        row.appendChild(ipill("shuffle", "Acak", "", function () { startTag(tagsNow, null, true); }));
        row.appendChild(ipill("filter", "Filter", "", function () { openFilterHub(); }));
        row.appendChild(ipill("plus", "Ke playlist", "", function () {
          dialog("Simpan <b>" + bPosts.length + "</b> post yang dimuat ke playlist?", { ok: "Simpan" }, function () { saveTagAsPlaylist(titleStr); });
        }));
        b.appendChild(row);

        var grid = el("div", "grid");
        b.appendChild(grid);
        if (!bPosts.length && !bLoading) grid.appendChild(el("div", "empty", "Tidak ada post yang cocok. Coba ubah Filter atau tag."));
        var tdThumbs = {};
        var pb = el("div", "pickbar"); pb.style.display = "none";
        function showPick(id) {
          tdPick = id;
          for (var k in tdThumbs) tdThumbs[k].classList.toggle("pick", Number(k) === id);
          if (id == null) { pb.style.display = "none"; return; }
          pb.style.display = "flex"; pb.innerHTML = "";
          pb.appendChild(el("span", "pk-id", "#" + id));
          var go = el("button", "pill pri", "Putar dari sini");
          go.onclick = function () { var t = tdPick; tdPick = null; startTag(bTags, t, false); };
          var cn = el("button", "pill", "Batal");
          cn.onclick = function () { showPick(null); };
          pb.appendChild(go); pb.appendChild(cn);
        }
        bPosts.forEach(function (id) {
          var th = thumb(id, function () { showPick(tdPick === id ? null : id); });
          tdThumbs[id] = th;
          grid.appendChild(th);
        });
        if (bLoading) grid.appendChild(el("div", "empty", "Memuat post…"));
        else if (bHasMore && bPosts.length > 0) {
          var mb = pill("Muat lagi", "more", function () { loadTagDetail(bTags, false); });
          grid.appendChild(mb);
          autoMore(mb);
        }
        b.appendChild(pb);
        if (tdPick && bSet.has(tdPick)) showPick(tdPick); else tdPick = null;
      }
      function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = lead(txt); return e; }
      function pill(txt, cls, fn) { var b = el("button", "pill " + (cls || ""), txt); b.onclick = fn; return b; }
      function resetSel() { selMode = false; sel = {}; plShown = 120; }
      // ===== Hanya SATU overlay (panel / Filter Hub / info / panduan / popup) yang boleh aktif =====
      var hubReturn = null; // panel yang sedang terbuka saat Filter Hub dibuka, dipulihkan bila Filter Hub dibatalkan
      function closeOverlays(except) {
        if (except !== "sheet" && sheet.classList.contains("open")) {
          sheet.classList.remove("open"); sheetBackdrop.classList.remove("open");
          resetSel(); if (tagPickMode === "block") tagPickMode = "want";
        }
        if (except !== "hub" && filterHubBackdrop) filterHubBackdrop.classList.remove("open");
        if (except !== "info" && infoBackdrop.classList.contains("open")) { ++infoRequestToken; infoBackdrop.classList.remove("open"); }
        if (except !== "guide") { var gb = $("guideBackdrop"); if (gb) gb.classList.remove("open"); }
        if (except !== "popup" && popupBackdrop.classList.contains("open")) { popupBackdrop.classList.remove("open"); popupPostId = null; popupMode = "add"; pickCb = null; }
        syncNavActive();
      }
      function closeAll() { hubReturn = null; closeOverlays(""); }
      function syncNavActive() {
        var isOpen = sheet && sheet.classList.contains("open");
        var hubOpen = !!(filterHubBackdrop && filterHubBackdrop.classList.contains("open"));
        var cur = hubOpen ? "filter" : (isOpen ? (sheetTab === "history" ? "playlist" : sheetTab) : "stream");
        var bns = { stream: $("bnStream"), tags: $("tagBtn"), playlist: $("bnPlaylist"), filter: $("filterBtn"), settings: $("bnSettings") };
        for (var k in bns) { if (bns[k]) bns[k].classList.toggle("active", k === cur); }
      }
      var sheetClearT = null;
      function openSheet(tab, mode) {
        clearTimeout(sheetClearT);
        closeOverlays("sheet");
        if (tab) sheetTab = tab;
        if (tab === "playlist") { plView = "list"; plDetailId = null; resetSel(); }
        if (tab === "tags") { tagView = (mode === "detail" || (!mode && tagView === "detail" && bPosts.length)) ? "detail" : "list"; tagPickMode = mode === "block" ? "block" : "want"; }
        renderSheet(); sheet.classList.add("open"); sheetBackdrop.classList.add("open");
        syncNavActive();
      }
      function closeSheet() {
        sheet.classList.remove("open"); sheetBackdrop.classList.remove("open"); resetSel();
        if (tagPickMode === "block") tagPickMode = "want";
        syncNavActive();
        clearTimeout(sheetClearT);
        sheetClearT = setTimeout(function () { if (!sheet.classList.contains("open") && sheetBody) sheetBody.innerHTML = ""; }, 380);
      }
      function navTo(tab) {
        var open = sheet.classList.contains("open");
        if (open && (sheetTab === tab || (tab === "playlist" && sheetTab === "history"))) closeSheet(); else openSheet(tab);
      }
      function sheetBack() {
        if (sheetTab === "playlist" && plView === "detail") { plView = "list"; plDetailId = null; resetSel(); renderSheet(); }
        else if (sheetTab === "tags" && tagView === "detail") { tagView = "list"; renderSheet(); }
      }
      function rerender() { if (!sheet.classList.contains("open")) return; var st = sheetBody.scrollTop; sheetBody.classList.add("static"); renderSheet(); sheetBody.scrollTop = st; setTimeout(function () { sheetBody.classList.remove("static"); }, 450); }
      var moreObs = null, thumbObs = null;
      function autoMore(btn) {
        if (typeof IntersectionObserver === "undefined") return;
        if (!moreObs) moreObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) { moreObs.unobserve(en.target); en.target.click(); } });
        }, { root: sheetBody, rootMargin: "240px" });
        moreObs.observe(btn);
      }
      function observeThumb(d) {
        if (typeof IntersectionObserver === "undefined") { if (d._load) d._load(); return; }
        if (!thumbObs) thumbObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { thumbObs.unobserve(en.target); var f = en.target._load; en.target._load = null; if (f) f(); }
          });
        }, { root: sheetBody, rootMargin: "300px" });
        thumbObs.observe(d);
      }
      function renderSheet() {
        var labelMap = { tags: "Tag", playlist: "Koleksi", history: "Riwayat", settings: "Setelan" };
        sheet.setAttribute("aria-label", "Panel " + (labelMap[sheetTab] || ""));
        var stEl = $("sheetTitle"); if (stEl) stEl.textContent = { tags: "Explore", playlist: "Koleksi", history: "Koleksi", settings: "Setelan" }[sheetTab] || "";
        sheetBackBtn.disabled = !((sheetTab === "playlist" && plView === "detail") || (sheetTab === "tags" && tagView === "detail"));
        if (moreObs) moreObs.disconnect();
        if (thumbObs) thumbObs.disconnect();
        sheetBody.innerHTML = "";
        if (sheetTab === "tags") renderTagsView();
        else if (sheetTab === "playlist") plView === "list" ? renderPlList() : renderPlDetail();
        else if (sheetTab === "history") renderHistory();
        else renderSettings();
      }
      function thumb(id, onclick) {
        var d = el("div", "thumb");
        var im = new Image(); im.loading = "lazy"; im.decoding = "async"; im.alt = "";
        var meta = postMetaCache.get(id), tm = thumbMeta.get(id);
        var url = (meta && meta.preview_url) || (tm && tm[0]) || "";
        var vid = meta ? postIsVideo(meta) : !!(tm && tm[1]);
        function markNo() { if (im.parentNode) im.parentNode.removeChild(im); d.classList.add("nothumb"); }
        function addVidBadge(po) {
          if (d._vb) return; d._vb = 1;
          d.appendChild(el("span", "vid-badge", po && po.duration ? po.duration + "s" : "VIDEO"));
        }
        im.onerror = function () {
          if (isOffline(id) && !d._off) {
            d._off = 1;
            offlineThumbURL(id).then(function (u) { if (u) im.src = u; else markNo(); });
            return;
          }
          markNo();
        };
        d.appendChild(im); d.appendChild(el("span", "tid", "#" + id));
        if (url) im.src = url;
        else {
          // Metadata belum ada: ambil ringan (tanpa gambar penuh) hanya saat thumbnail terlihat di layar
          d._load = function () {
            thumbReady.then(function () {
              var t2 = thumbMeta.get(id);
              if (t2 && t2[0]) { im.src = t2[0]; if (t2[1]) addVidBadge(null); return; }
              if (isOffline(id) && navigator.onLine === false) { im.onerror(); return; }
              fetchThumbMeta(id).then(function (po) {
                if (po && po.preview_url) { im.src = po.preview_url; if (postIsVideo(po)) addVidBadge(po); }
                else markNo();
              });
            });
          };
          observeThumb(d);
        }
        if (vid) addVidBadge(meta);
        if (S.markSeen !== false && seenSet.has(id)) d.classList.add("seen");
        if (isOffline(id)) { var ob = el("span", "off-badge"); ob.innerHTML = ic("download"); d.appendChild(ob); }
        if (id === current) d.classList.add("act");
        d.onclick = onclick; return d;
      }
      function subnav(active) {
        var s = el("div", "subnav");
        [["playlist", "Playlist"], ["history", "Riwayat"]].forEach(function (x) {
          var bt = el("button", x[0] === active ? "on" : "", x[1]);
          bt.onclick = function () {
            if (x[0] === active) return;
            sheetTab = x[0]; if (x[0] === "playlist") { plView = "list"; plDetailId = null; }
            resetSel(); renderSheet(); syncNavActive();
          };
          s.appendChild(bt);
        });
        return s;
      }
      function renderPlList() {
        sheetBody.appendChild(subnav("playlist"));
        var row = el("div", "arow");
        row.appendChild(ipill("plus", "Baru", "pri", newPlaylist));
        sheetBody.appendChild(row);
        var grid = el("div", "grid"); sheetBody.appendChild(grid);
        if (!playlists.length) { grid.appendChild(el("div", "empty", "Belum ada playlist. Tap Baru, atau swipe kanan di post.")); return; }
        playlists.forEach(function (pl) {
          var card = el("div", "card"), cv = el("div", "cv", "");
          if (pl.postIds.length) {
            var covId = pl.last && isIn(pl, pl.last) ? pl.last : pl.postIds[0];
            var im = new Image(); im.loading = "lazy"; im.alt = "";
            var meta = postMetaCache.get(covId);
            if (meta && meta.preview_url) {
              im.src = meta.preview_url;
            } else if (covId) {
              get(covId).then(function (r) {
                if (r && r.meta && r.meta.preview_url && !im.src) im.src = r.meta.preview_url;
              });
            }
            im.onerror = function () { if (im.parentNode) im.parentNode.removeChild(im); var fb = el("span"); fb.innerHTML = ic("layers"); cv.insertBefore(fb, cv.firstChild); };
            cv.appendChild(im);
          } else cv.innerHTML = ic("layers");
          var play = el("button", "play"); play.innerHTML = ic("play"); play.onclick = function (e) { e.stopPropagation(); startPlaylist(pl.id); };
          var menu = el("button", "menu"); menu.innerHTML = ic("more");
          var acts = el("div", "acts");
          var b1 = el("button", ""); b1.innerHTML = ic("shuffle") + "<span>Putar acak</span>"; b1.onclick = function (e) { e.stopPropagation(); startPlaylist(pl.id, null, true); };
          var b2 = el("button", ""); b2.innerHTML = ic("edit") + "<span>Ganti nama</span>"; b2.onclick = function (e) { e.stopPropagation(); renamePlaylist(pl.id); };
          var b3 = el("button", "d"); b3.innerHTML = ic("trash") + "<span>Hapus</span>"; b3.onclick = function (e) { e.stopPropagation(); deletePlaylist(pl.id); };
          var b4 = el("button", ""); b4.innerHTML = ic("x") + "<span>Tutup</span>"; b4.onclick = function (e) { e.stopPropagation(); acts.classList.remove("show"); };
          [b1, b2, b3, b4].forEach(function (b) { acts.appendChild(b); });
          menu.onclick = function (e) {
            e.stopPropagation();
            Array.prototype.forEach.call(grid.querySelectorAll(".acts.show"), function (a) { a.classList.remove("show"); });
            acts.classList.add("show");
          };
          cv.appendChild(play); cv.appendChild(menu); cv.appendChild(acts);
          var info = el("div", "ci"); info.appendChild(el("div", "cn", pl.name)); info.appendChild(el("div", "cm", pl.postIds.length + " post"));
          card.appendChild(cv); card.appendChild(info);
          card.onclick = function () { plView = "detail"; plDetailId = pl.id; resetSel(); renderSheet(); };
          grid.appendChild(card);
        });
      }
      function selIds(p) { return p.postIds.filter(function (id) { return sel[id] === 1; }); }
      function needSel(p) { var s = selIds(p); if (!s.length) { toast("Belum ada yang dipilih"); return null; } return s; }
      function renderPlDetail() {
        var p = getPL(plDetailId); if (!p) { plView = "list"; resetSel(); renderSheet(); return; }
        var ids = p.postIds;
        if (!selMode) {
          var r1 = el("div", "arow");
          r1.appendChild(ipill("play", "Putar", "pri", function () { startPlaylist(p.id); }));
          r1.appendChild(ipill("shuffle", "Acak", "", function () { startPlaylist(p.id, null, true); }));
          if (ids.length && p.last && isIn(p, p.last) && ids[0] !== p.last) r1.appendChild(ipill("back", "Dari awal", "", function () { startPlaylist(p.id, ids[0]); }));
          sheetBody.appendChild(r1);
          var r2 = el("div", "arow");
          r2.appendChild(ipill("check", "Pilih", "", function () { selMode = true; sel = {}; renderSheet(); }));
          r2.appendChild(ipill(sortAsc ? "arrowUp" : "arrowDown", "Urut ID", "", function () { ids.sort(function (a, b) { return sortAsc ? a - b : b - a; }); sortAsc = !sortAsc; persist(); rerender(); }));
          r2.appendChild(ipill("shuffle", "Kocok", "", function () { shuffleArr(ids); persist(); rerender(); }));
          r2.appendChild(ipill("download", "ZIP", "", function () { zipPlaylist(p, ids); }));
          r2.appendChild(ipill("layers", "Offline", "", function () { saveOfflineMany(ids.slice()); }));
          r2.appendChild(ipill("edit", "Nama", "", function () { renamePlaylist(p.id); }));
          sheetBody.appendChild(r2);
          sheetBody.appendChild(el("div", "selinfo", p.name + "  ·  " + ids.length + " post"));
        } else {
          selCountEl = el("div", "selinfo", selIds(p).length + " dipilih");
          sheetBody.appendChild(selCountEl);
          var a1 = el("div", "arow");
          a1.appendChild(pill("Semua", "", function () {
            ids.forEach(function (i) { sel[i] = 1; });
            var ths = grid.querySelectorAll(".thumb");
            for (var si = 0; si < ths.length; si++) ths[si].classList.add("sel");
            if (selCountEl) selCountEl.textContent = ids.length + " dipilih";
          }));
          a1.appendChild(pill("Kosongkan", "", function () {
            sel = {};
            var ths2 = grid.querySelectorAll(".thumb");
            for (var si2 = 0; si2 < ths2.length; si2++) ths2[si2].classList.remove("sel");
            if (selCountEl) selCountEl.textContent = "0 dipilih";
          }));
          a1.appendChild(ipill("x", "Selesai", "", function () { resetSel(); renderSheet(); }));
          sheetBody.appendChild(a1);
          var a2 = el("div", "arow");
          a2.appendChild(ipill("arrowUp", "Ke awal", "", function () { moveSel(p, true); }));
          a2.appendChild(ipill("arrowDown", "Ke akhir", "", function () { moveSel(p, false); }));
          a2.appendChild(ipill("copy", "Salin", "", function () { pickFor(p, false); }));
          a2.appendChild(ipill("arrowRight", "Pindah", "", function () { pickFor(p, true); }));
          a2.appendChild(ipill("download", "ZIP", "", function () { var s = needSel(p); if (s) zipPlaylist(p, s); }));
          a2.appendChild(ipill("layers", "Offline", "", function () { var s = needSel(p); if (s) saveOfflineMany(s); }));
          a2.appendChild(ipill("trash", "Hapus", "dng", function () { deleteSel(p); }));
          sheetBody.appendChild(a2);
        }
        var grid = el("div", "grid"); sheetBody.appendChild(grid);
        if (!ids.length) { grid.appendChild(el("div", "empty", "Playlist kosong. Swipe kanan di sebuah post untuk menambah.")); return; }
        var upto = Math.min(ids.length, plShown);
        for (var i = 0; i < upto; i++) {
          (function (id) {
            var t = thumb(id, function () {
              if (selMode) {
                if (sel[id]) delete sel[id]; else sel[id] = 1;
                t.classList.toggle("sel", sel[id] === 1);
                selCountEl.textContent = selIds(p).length + " dipilih";
              } else startPlaylist(p.id, id);
            });
            if (selMode && sel[id] === 1) t.classList.add("sel");
            if (!selMode) {
              var x = el("button", "x"); x.innerHTML = ic("x");
              x.onclick = function (e) { e.stopPropagation(); var snap = snapPlaylists(); removeFrom(p.id, id); rerender(); refreshBtns(); updateChip(); undoable("Dihapus dari " + p.name, snap); };
              t.appendChild(x);
            }
            grid.appendChild(t);
          })(ids[i]);
        }
        if (ids.length > upto) {
          var more = pill("Tampilkan lagi (" + (ids.length - upto) + ")", "more", function () { plShown += 120; rerender(); });
          grid.appendChild(more);
          autoMore(more);
        }
      }
      function moveSel(p, toTop) {
        var s = needSel(p); if (!s) return;
        var rest = p.postIds.filter(function (id) { return sel[id] !== 1; });
        p.postIds = toTop ? s.concat(rest) : rest.concat(s);
        persist(); rerender(); toast(toTop ? "Dipindah ke awal" : "Dipindah ke akhir", "ok");
      }
      function pickFor(p, move) {
        var s = needSel(p); if (!s) return;
        openPick((move ? "Pindahkan " : "Salin ") + s.length + " post ke…", p.id, function (dst) {
          s.forEach(function (id) { if (!isIn(dst, id)) dst.postIds.push(id); });
          if (move) p.postIds = p.postIds.filter(function (id) { return sel[id] !== 1; });
          persist(); resetSel(); renderSheet(); refreshBtns(); updateChip();
          toast((move ? "Dipindah " : "Disalin ") + s.length + " post ke " + dst.name, "ok");
          if (move && activePlaylistId === p.id && !p.postIds.length) exitPlaylist();
        });
      }
      function deleteSel(p) {
        var s = needSel(p); if (!s) return;
        dialog("Hapus <b>" + s.length + "</b> post dari <b>" + esc(p.name) + "</b>?", { ok: "Hapus", danger: true }, function () {
          var snap = snapPlaylists();
          p.postIds = p.postIds.filter(function (id) { return sel[id] !== 1; });
          persist(); resetSel(); renderSheet(); refreshBtns(); updateChip();
          undoable("Dihapus " + s.length + " post", snap);
          if (activePlaylistId === p.id && !p.postIds.length) exitPlaylist();
        });
      }
      function renderHistory() {
        sheetBody.appendChild(subnav("history"));
        var row = el("div", "arow");
        row.appendChild(ipill("trash", "Kosongkan riwayat", "dng", function () {
          var hs = hist.slice(); hist = []; jset("pe_hist", hist); renderSheet();
          toast("Riwayat dikosongkan", "bad", { label: "Batalkan", fn: function () { hist = hs; jset("pe_hist", hist); rerender(); } });
        }));
        sheetBody.appendChild(row);
        var grid = el("div", "grid"); sheetBody.appendChild(grid);
        if (!hist.length) { grid.appendChild(el("div", "empty", "Belum ada riwayat.")); return; }
        hist.forEach(function (id) { grid.appendChild(thumb(id, function () { exitPlaylist(); closeSheet(); loadPost(id, 0); })); });
      }
      function setRow(label, sub, ctrl) {
        var r = el("div", "setrow"), l = el("div"); l.appendChild(el("label", "", label));
        if (sub) l.appendChild(el("small", "", sub));
        r.appendChild(l); r.appendChild(ctrl); return r;
      }
      function seg(opts, val, cb) {
        var w = el("div", "seg");
        opts.forEach(function (o) { var b = el("button", o[0] === val ? "on" : "", o[1]); b.onclick = function () { cb(o[0]); renderSheet(); }; w.appendChild(b); });
        return w;
      }
      function renderSettings() {
        var b = sheetBody, onoff = [[true, "On"], [false, "Off"]];
        b.innerHTML = "";
        var sc = el("div", "stat-grid"), today = daily[dayKey()] || 0, strk = streakDays();
        [[today, "Hari ini"], [strk, "Streak (hari)"], [seenSet.size, "Total dilihat"]].forEach(function (x) {
          var t = el("div", "stat-tile"); t.innerHTML = '<b data-n="' + x[0] + '">0</b><span>' + esc(x[1]) + "</span>"; sc.appendChild(t);
        });
        b.appendChild(sc);
        Array.prototype.forEach.call(sc.querySelectorAll("b"), function (nb) { // hitung naik dari 0
          var to = Number(nb.getAttribute("data-n")), t0 = performance.now(), dur = 600;
          (function tick(t) { var p = Math.min(1, (t - t0) / dur); nb.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString(); if (p < 1) requestAnimationFrame(tick); })(t0);
        });
        b.appendChild(el("div", "set-sec", "Pemutaran"));
        b.appendChild(setRow("Auto-Next Video", "Otomatis lanjut post berikutnya saat video selesai", seg(onoff, !!S.autoNextVid, function (v) { S.autoNextVid = v; saveS(); var vid = zoomLayer.querySelector("video"); if (vid) vid.loop = !(autoEnabled || S.autoNextVid); })));
        b.appendChild(setRow("Interval Auto", "Jeda antar post", seg([[2, "2s"], [3, "3s"], [5, "5s"], [8, "8s"], [12, "12s"], [20, "20s"]], S.interval, function (v) { S.interval = v; saveS(); if (autoEnabled && !isVideo()) resetAutoTimer(); })));
        b.appendChild(setRow("Suara video", "Default saat video dibuka", seg([[true, "Mati"], [false, "Hidup"]], S.muted, function (v) { S.muted = v; saveS(); var vd = zoomLayer.querySelector("video"); if (vd) vd.muted = v; })));
        b.appendChild(setRow("Kecepatan video", "Playback rate", seg([[0.5, "0.5×"], [1, "1×"], [1.5, "1.5×"], [2, "2×"]], S.speed, function (v) { S.speed = v; saveS(); var vd = zoomLayer.querySelector("video"); if (vd) { vd.defaultPlaybackRate = v; vd.playbackRate = v; } })));
        b.appendChild(setRow("Lewati post kosong", "Loncat otomatis ID yang tidak ada", seg(onoff, S.skipMissing, function (v) { S.skipMissing = v; saveS(); })));
        b.appendChild(setRow("Lewati yang sudah dilihat", "Saat menjelajah tag, langsung loncat ke post yang belum pernah dibuka", seg(onoff, !!S.skipSeen, function (v) { S.skipSeen = v; saveS(); })));
        b.appendChild(el("div", "set-sec", "Tampilan"));
        b.appendChild(setRow("Tampilan", "Muat utuh / penuhi layar", seg([["contain", "Muat"], ["cover", "Penuh"]], S.fit, function (v) { S.fit = v; saveS(); applyFit(); })));
        b.appendChild(setRow("Pertahankan zoom", "Level zoom tetap saat pindah post", seg(onoff, S.keepZoom, function (v) { S.keepZoom = v; saveS(); })));
        b.appendChild(setRow("Hemat data", "Pakai gambar kecil dulu", seg(onoff, S.saver, function (v) { S.saver = v; saveS(); invalidateCache(); })));
        b.appendChild(setRow("Tandai sudah dilihat", "Redupkan & beri centang di grid", seg(onoff, S.markSeen !== false, function (v) { S.markSeen = v; saveS(); })));
        b.appendChild(el("div", "set-sec", "Gestur"));
        b.appendChild(setRow("Swipe samping", "Kanan: simpan ke playlist · Kiri: hapus dari playlist (rawan salah)", seg(onoff, !!S.hswipe, function (v) { S.hswipe = v; saveS(); })));
        b.appendChild(setRow("Double-tap = Favorit", "Ketuk 2x menyimpan ke Favorit. Di video hanya bagian tengah; sisi kiri/kanan = loncat 10 dtk", seg(onoff, !!S.dblFav, function (v) { S.dblFav = v; saveS(); })));
        b.appendChild(setRow("Scroll roda = pindah post", "Roda mouse / trackpad di layar post (desktop)", seg(onoff, !!S.wheelNav, function (v) { S.wheelNav = v; saveS(); })));
        b.appendChild(el("div", "set-sec", "Umpan balik"));
        b.appendChild(setRow("Getar (haptic)", "Getaran halus saat suka, simpan, dan geser", seg(onoff, S.haptic !== false, function (v) { S.haptic = v; saveS(); if (v) vibe(12); })));
        b.appendChild(setRow("Efek suara", "Bunyi kecil saat suka, simpan, dan error", seg(onoff, !!S.sfx, function (v) { S.sfx = v; saveS(); if (v) sfx("like"); })));
        b.appendChild(setRow("Tutup panel otomatis", "Popup koleksi menutup sendiri setelah menyimpan; tap area gelap atau geser turun untuk menutup panel", seg(onoff, S.autoClose !== false, function (v) { S.autoClose = v; saveS(); })));
        b.appendChild(el("div", "set-sec", "Privasi & data"));
        b.appendChild(setRow("Mode aman", "Sembunyikan post non-aman (berdasar rating)", seg(onoff, !!S.safeMode, function (v) { S.safeMode = v; saveS(); streamAhead = []; streamBehind = []; refreshBadges(); toast(v ? "Mode aman aktif" : "Mode aman mati", "ok"); })));
        b.appendChild(setRow("Sembunyikan otomatis", "Tutup layar saat tab ditinggalkan", seg(onoff, !!S.autoPanic, function (v) { S.autoPanic = v; saveS(); })));
        b.appendChild(setRow("Favorit otomatis offline", "Simpan salinan tiap kali menyukai post", seg(onoff, !!S.autoOffline, function (v) { S.autoOffline = v; saveS(); })));

        var sBox = el("div", "storage-card");
        var sTitle = el("div", "storage-title", "Pengelola Penyimpanan & Cache");
        sBox.appendChild(sTitle);

        var lsBytes = 0;
        try {
          for (var k in localStorage) {
            if (localStorage.hasOwnProperty(k)) {
              lsBytes += (localStorage[k].length + k.length) * 2;
            }
          }
        } catch (e) { }
        var lsKb = (lsBytes / 1024).toFixed(1);

        // Count items for display
        var _plCount = playlists.length;
        var _plPosts = playlists.reduce(function(a,p){ return a+(p.postIds?p.postIds.length:0); },0);
        var _histCount = hist.length;
        var _blCount = (typeof blacklistTags !== "undefined" && Array.isArray(blacklistTags)) ? blacklistTags.length : 0;
        var _alphaCacheLetters = Object.keys(alphaTagCache||{}).length;
        var _alphaCacheTotal = Object.keys(alphaTagCache||{}).reduce(function(a,k){ return a+((alphaTagCache[k]||[]).length); },0);

        var sStats = el("div", "storage-stats");
        sStats.innerHTML =
          '<div class="storage-row"><b>LocalStorage</b><span>' + lsKb + ' KB</span></div>' +
          '<div class="storage-row"><b>Riwayat Post</b><span>' + _histCount + ' post</span></div>' +
          '<div class="storage-row"><b>Playlist</b><span>' + _plCount + ' playlist &middot; ' + _plPosts + ' post tersimpan</span></div>' +
          '<div class="storage-row"><b>Blacklist</b><span>' + _blCount + ' tag</span></div>' +
          '<div class="storage-row"><b>Cache RAM (meta/gambar)</b><span>' + cache.size + ' / ' + MAX_CACHE + ' post</span></div>' +
          '<div class="storage-row"><b>Cache Tag Alfabet</b><span>' + _alphaCacheLetters + ' huruf &middot; ' + _alphaCacheTotal + ' tag</span></div>' +
          '<div class="storage-row"><b>Cache Disk Browser</b><span id="storageQuotaVal">Memeriksa...</span></div>';
        sBox.appendChild(sStats);

        if (navigator.storage && navigator.storage.estimate) {
          navigator.storage.estimate().then(function (est) {
            var qRow = $("storageQuotaVal");
            if (qRow && est.usage !== undefined) {
              var mb = (est.usage / (1024 * 1024)).toFixed(1);
              qRow.textContent = mb + " MB";
            }
          }).catch(function () { });
        }

        var sActs = el("div", "arow");
        sActs.style.marginTop = "6px";
        sActs.appendChild(ipill("refresh", "Bersihkan Cache", "pri", function () {
          invalidateCache();
          clearQueued();
          toast("Cache RAM dibersihkan", "ok");
          renderSettings();
        }));
        sActs.appendChild(ipill("tag", "Hapus Cache Tag", "", function () {
          alphaTagCache = {};
          lsSet("darknight_alpha_cache2", "{}"); lsSet("darknight_tagtypes", "{}");
          toast("Cache tag dibersihkan", "ok");
          renderSettings();
        }));
        sBox.appendChild(sActs);
        b.appendChild(sBox);

        b.appendChild(securityCard());
        b.appendChild(dataCard());
        b.appendChild(offlineCard());

        var gRow = el("div", "arow"); gRow.style.marginTop = "8px";
        gRow.appendChild(ipill("book", "Buka Panduan", "pri", openGuide));
        b.appendChild(gRow);
      }
      function securityCard() {
        var box = el("div", "storage-card");
        box.appendChild(el("div", "storage-title", "Privasi & Keamanan"));
        var info = el("div", "storage-stats");
        info.innerHTML = "<div>Tombol mata di bilah atas (atau tombol <b>`</b> di keyboard) langsung menutup layar. " +
          (hasPin() ? "PIN aktif: layar terkunci saat aplikasi dibuka." : "Tanpa PIN, ketuk layar gelap 3× untuk membuka.") + "</div>";
        box.appendChild(info);
        var acts = el("div", "arow"); acts.style.marginTop = "6px";
        acts.appendChild(ipill("eyeOff", "Sembunyikan sekarang", "pri", function () { closeSheet(); panicOn(); }));
        if (hasPin()) acts.appendChild(ipill("trash", "Hapus PIN", "dng", function () { lsSet("pe_pin", ""); toast("PIN dihapus", "ok"); renderSettings(); }));
        else acts.appendChild(ipill("edit", "Atur PIN", "", setPinDialog));
        box.appendChild(acts);
        return box;
      }
      function dataCard() {
        var box = el("div", "storage-card");
        box.appendChild(el("div", "storage-title", "Cadangan Data"));
        var info = el("div", "storage-stats");
        info.innerHTML = "<div>Cadangan lengkap berisi playlist, blacklist, riwayat, checkpoint tag, tanda sudah dilihat, dan setelan (PIN tidak ikut).</div>" +
          '<div class="storage-row"><b>Post sudah dilihat</b><span>' + seenSet.size + "</span></div>";
        box.appendChild(info);
        var acts = el("div", "arow"); acts.style.marginTop = "6px";
        acts.appendChild(ipill("upload", "Ekspor semua", "pri", exportAll));
        acts.appendChild(ipill("download", "Impor", "", function () { $("importFile").click(); }));
        acts.appendChild(ipill("eye", "Reset tanda dilihat", "", function () { seenSet.clear(); saveSeen(); toast("Tanda dilihat direset", "ok"); renderSettings(); }));
        box.appendChild(acts);
        return box;
      }
      function offlineCard() {
        var box = el("div", "storage-card");
        box.appendChild(el("div", "storage-title", "Offline"));
        var info = el("div", "storage-stats");
        info.innerHTML = '<div class="storage-row"><b>Post tersimpan offline</b><span>' + offIds.size + "</span></div>" +
          "<div>Simpan dari menu Detail (satu post) atau tombol Offline di playlist. Agar halaman aplikasi sendiri bisa dibuka tanpa sinyal, service worker (sw.js) harus meng-cache file aplikasi.</div>";
        box.appendChild(info);
        var acts = el("div", "arow"); acts.style.marginTop = "6px";
        acts.appendChild(ipill("trash", "Hapus semua offline", "dng", function () {
          dialog("Hapus <b>" + offIds.size + "</b> salinan offline?", { ok: "Hapus", danger: true }, function () { clearOffline().then(function () { toast("Salinan offline dihapus", "ok"); renderSettings(); }); });
        }));
        box.appendChild(acts);
        return box;
      }
      function newPlaylist() {
        dialog("Nama playlist baru", { input: true, ok: "Buat" }, function (v) {
          v = v.trim(); if (!v) { toast("Nama tidak boleh kosong"); return; }
          var exists = playlists.some(function(p) { return p.name.toLowerCase() === v.toLowerCase(); });
          if (exists) { toast("Playlist '" + v + "' sudah ada", "bad"); return; }
          playlists.push({ id: genId(), name: v, postIds: [], last: null }); persist(); renderSheet(); refreshBtns(); toast("Playlist '" + v + "' dibuat", "ok");
        });
      }
      function renamePlaylist(id) {
        var p = getPL(id); if (!p) return;
        dialog("Ganti nama playlist", { input: true, value: p.name, ok: "Simpan" }, function (v) {
          v = v.trim(); if (!v) { toast("Nama tidak boleh kosong"); return; }
          p.name = v; persist(); rerender(); updateChip(); toast("Nama diubah");
        });
      }
      function deletePlaylist(id) {
        if (id === "pl_fav") { toast("Playlist Favorit bawaan tidak dapat dihapus", "bad"); return; }
        var p = getPL(id); if (!p) return;
        dialog("Hapus playlist <b>" + esc(p.name) + "</b> (" + p.postIds.length + " post)?", { ok: "Hapus", danger: true }, function () {
          var snap = snapPlaylists();
          playlists = playlists.filter(function (x) { return x.id !== id; }); persist();
          if (activePlaylistId === id) exitPlaylist();
          plView = "list"; plDetailId = null; resetSel(); renderSheet(); refreshBtns(); undoable("Playlist dihapus", snap);
        });
      }
      function exportPlaylists() {
        saveBlob(new Blob([JSON.stringify({ v: 1, playlists: playlists }, null, 2)], { type: "application/json" }), "post-explorer-playlists.json");
        toast("Playlist diekspor", "ok");
      }
      function mergePlaylists(arr) {
        var added = 0;
        arr.forEach(function (pl) {
          if (!pl || typeof pl.name !== "string" || !Array.isArray(pl.postIds)) return;
          var cleanName = pl.name.trim().slice(0, 40); if (!cleanName) return;
          var ids = uniq(pl.postIds.map(function (v) { return typeof v === "string" && /^\d+$/.test(v) ? Number(v) : v; }).filter(validId));
          var isFav = pl.id === "pl_fav" || cleanName.toLowerCase() === "favorit";
          var ex = isFav ? getPL("pl_fav") : null;
          if (!ex) playlists.forEach(function (x) { if (String(x.name).toLowerCase() === cleanName.toLowerCase()) ex = x; });
          if (ex) { ids.forEach(function (i) { if (!isIn(ex, i)) { ex.postIds.push(i); added++; } }); }
          else { playlists.push({ id: isFav ? "pl_fav" : genId(), name: isFav ? "Favorit" : cleanName, postIds: ids, last: null }); added += ids.length; }
        });
        persist();
        return added;
      }
      var BACKUP_KEYS = ["playlists_v1", "pe_settings", "pe_blacklist", "pe_hist", "pe_tag_checkpoints", "pe_tagprog", "pe_seen", "pe_anchor_post", "lastPost", "pe_offline_ids"];
      function exportAll() {
        persist(); saveSeen();
        var data = {};
        BACKUP_KEYS.forEach(function (k) { var v = lsGet(k); if (v !== null && v !== undefined) data[k] = v; });
        saveBlob(new Blob([JSON.stringify({ v: 2, app: "darknight", at: Date.now(), data: data }, null, 2)], { type: "application/json" }),
          "darknight-backup-" + new Date().toISOString().slice(0, 10) + ".json");
        toast("Cadangan lengkap diekspor", "ok");
      }
      function importAll(data) {
        function rd(k) { try { return data[k] != null ? JSON.parse(data[k]) : null; } catch (e) { return null; } }
        var added = 0;
        var pls = rd("playlists_v1"); if (Array.isArray(pls)) added += mergePlaylists(pls);
        var bl = rd("pe_blacklist");
        if (Array.isArray(bl)) { bl.forEach(function (t) { t = normTag(t); if (t && blacklistTags.indexOf(t) === -1) blacklistTags.push(t); }); saveBlacklist(); }
        var hs = rd("pe_hist"); if (Array.isArray(hs)) { hist = uniq(hs.filter(validId).concat(hist)).slice(0, 60); jset("pe_hist", hist); }
        var sn = rd("pe_seen"); if (Array.isArray(sn)) { sn.filter(validId).forEach(function (i) { seenSet.add(i); }); saveSeen(); }
        var cps = rd("pe_tag_checkpoints");
        if (cps && typeof cps === "object") {
          var cur = getTagCheckpoints();
          Object.keys(cps).forEach(function (k) { var c = cps[k]; if (c && validId(c.lastId) && (!cur[k] || (cur[k].updatedAt || 0) < (c.updatedAt || 0))) cur[k] = c; });
          jset("pe_tag_checkpoints", cur);
        }
        var tp = rd("pe_tagprog");
        if (tp && typeof tp === "object") {
          var curP = jget("pe_tagprog", {});
          Object.keys(tp).forEach(function (k) { var c = tp[k]; if (c && validId(c.id) && (!curP[k] || (curP[k].t || 0) < (c.t || 0))) curP[k] = c; });
          jset("pe_tagprog", curP);
        }
        var st = rd("pe_settings");
        if (st && typeof st === "object" && !Array.isArray(st)) {
          Object.keys(st).forEach(function (k) { if (Object.prototype.hasOwnProperty.call(S, k) && typeof st[k] === typeof S[k]) S[k] = st[k]; });
          saveS(); applyFit();
        }
        refreshBtns(); updateChip(); refreshBadges(); renderSheet();
        toast("Impor selesai (" + added + " post baru ke playlist)", "ok");
      }
      $("importFile").addEventListener("change", function (e) {
        var f = e.target.files && e.target.files[0]; if (!f) return;
        var fr = new FileReader();
        fr.onload = function () {
          try {
            var d = JSON.parse(fr.result);
            if (d && d.v === 2 && d.data && typeof d.data === "object") {
              dialog("Impor <b>cadangan lengkap</b>? Playlist, blacklist, riwayat, dan checkpoint digabung; setelan ditimpa.", { ok: "Impor" }, function () { importAll(d.data); });
            } else {
              var arr = Array.isArray(d) ? d : d.playlists;
              if (!Array.isArray(arr)) throw 0;
              var n = mergePlaylists(arr);
              renderSheet(); refreshBtns(); toast("Impor selesai: " + n + " post", "ok");
            }
          } catch (err) { toast("File tidak valid", "bad"); }
        };
        fr.readAsText(f); e.target.value = "";
      });

      var crcT = null;
      function crc32(u8) {
        if (!crcT) { crcT = new Uint32Array(256); for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); crcT[n] = c >>> 0; } }
        var c2 = 0xFFFFFFFF; for (var i = 0; i < u8.length; i++) c2 = crcT[(c2 ^ u8[i]) & 255] ^ (c2 >>> 8);
        return (c2 ^ 0xFFFFFFFF) >>> 0;
      }
      function u16(v) { return [v & 255, (v >>> 8) & 255]; }
      function u32(v) { return [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255]; }
      function buildZip(files) {
        var enc = new TextEncoder(), parts = [], central = [], offset = 0, cdSize = 0;
        files.forEach(function (f) {
          var name = enc.encode(f.name);
          var lh = new Uint8Array([0x50, 0x4b, 3, 4, 20, 0, 0, 8, 0, 0, 0, 0, 0x21, 0].concat(u32(f.crc), u32(f.size), u32(f.size), u16(name.length), [0, 0]));
          var cd = new Uint8Array([0x50, 0x4b, 1, 2, 20, 0, 20, 0, 0, 8, 0, 0, 0, 0, 0x21, 0].concat(u32(f.crc), u32(f.size), u32(f.size), u16(name.length), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], u32(offset)));
          parts.push(lh, name, f.blob); central.push(cd, name);
          cdSize += cd.length + name.length; offset += lh.length + name.length + f.size;
        });
        var end = new Uint8Array([0x50, 0x4b, 5, 6, 0, 0, 0, 0].concat(u16(files.length), u16(files.length), u32(cdSize), u32(offset), [0, 0]));
        return new Blob(parts.concat(central, [end]), { type: "application/zip" });
      }
      /* tryFetch removed (unused) */
      // Ubah URL CDN rule34 jadi /media/<sub>/<path> (same-origin via Vercel rewrite) agar lolos CORS
      function mediaProxyUrl(u) {
        try {
          if (location.protocol !== "http:" && location.protocol !== "https:") return null;
          var x = new URL(u), m = x.hostname.match(/^([a-z0-9-]+)\.rule34\.xxx$/);
          if (!m) return null;
          return "/media/" + m[1] + x.pathname + x.search;
        } catch (e) { return null; }
      }
      function fetchMedia(u) {
        var pu = mediaProxyUrl(u);
        if (!pu) return fetch(u);
        return fetch(pu).then(function (res) { return res.ok ? res : fetch(u); }, function () { return fetch(u); });
      }
      var zipBusy = false;
      function zipPlaylist(p, ids) {
        if (zipBusy) { toast("ZIP sedang diproses"); return; }
        if (!ids.length) { toast("Playlist kosong"); return; }
        var list = ids.slice();
        function go() {
          zipBusy = true;
          var files = [], i = 0, fail = 0, totalBytes = 0, MAX_ZIP_BYTES = 80 * 1024 * 1024;
          function finish() {
            zipBusy = false;
            if (!files.length) { toast("Gagal: CDN mungkin blokir download langsung", "bad"); return; }
            saveBlob(buildZip(files), (p.name.replace(/[^\w\-]+/g, "_") || "playlist") + ".zip");
            toast("ZIP siap: " + files.length + " file" + (fail ? " (" + fail + " gagal)" : ""), "ok");
          }
          function next() {
            if (i >= list.length) { finish(); return; }
            var id = list[i++];
            toast("Mengambil " + i + "/" + list.length + "…");
            fetchThumbMeta(id).then(function (po) {
              if (!po || !po.file_url) throw 0;
              var zurl = po.file_url;
              var zm = zurl.match(/\.([a-z0-9]{2,5})(?:\?|$)/i);
              var ext = zm ? zm[1].toLowerCase() : (postIsVideo(po) ? "mp4" : "jpg");
              return fetchMedia(zurl).then(function (res) {
                if (!res.ok) throw 0;
                return res.blob().then(function (b) { return { blob: b, ext: ext }; });
              });
            }).then(function (r) {
              if (totalBytes + r.blob.size > MAX_ZIP_BYTES) {
                fail++;
                toast("ZIP dihentikan: batas aman 80 MB terlampaui", "bad");
                i = list.length;
                return;
              }
              totalBytes += r.blob.size;
              return r.blob.arrayBuffer().then(function (buf) {
                files.push({ name: "post_" + id + "." + r.ext, blob: r.blob, size: r.blob.size, crc: crc32(new Uint8Array(buf)) });
              });
            }).catch(function () { fail++; }).then(next);
          }
          next();
        }
        dialog("Unduh <b>" + list.length + "</b> post sebagai ZIP? Batas ukuran total 80 MB untuk menjaga RAM perangkat.", { ok: "Lanjut" }, go);
      }

      function download() {
        if (!currentURL) { toast("Buka post dulu"); return; }
        var meta = postMetaCache.get(current);
        var url = (meta && meta.file_url) ? meta.file_url : currentURL;
        var ext = currentType === "mp4" ? "mp4" : (meta && meta.image && meta.image.match(/\.([a-z0-9]+)$/i) ? meta.image.match(/\.([a-z0-9]+)$/i)[1] : "jpg");
        var id = current;
        toast("Mengunduh kualitas penuh…");
        fetchMedia(url).then(function (r) { if (!r.ok) throw 0; return r.blob(); }).then(function (b) {
          saveBlob(b, "post_" + id + "." + ext);
        }).catch(function () {
          var a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.download = "post_" + id + "." + ext;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      }
      function copyURL() {
        if (!currentURL) { toast("Buka post dulu"); return; }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(currentURL).then(function () { toast("URL disalin", "ok"); }, function () { toast("Gagal menyalin", "bad"); });
        else toast("Clipboard tidak didukung", "bad");
      }
      function shareURL() {
        if (!currentURL) { toast("Buka post dulu"); return; }
        if (navigator.share) navigator.share({ title: "Post #" + current, url: currentURL }).catch(function () { });
        else copyURL();
      }

      var deb = null;
      input.addEventListener("focus", function () { try { input.select(); } catch (e) { } });
      input.addEventListener("keydown", function (e) { if (e.key === "Enter") { clearTimeout(deb); input.blur(); exitPlaylist(); loadPost(); } });
      input.addEventListener("input", function () {
        clearTimeout(deb);
        deb = setTimeout(function () {
          var n = Number(input.value);
          if (validId(n) && n !== current) { exitPlaylist(); loadPost(n, 0); }
        }, 700);
      });

      function goToInput() {
        clearTimeout(deb);
        input.blur();
        var n = Number(input.value);
        if (validId(n)) {
          exitPlaylist();
          loadPost(n, 0);
        } else {
          toast("Masukkan nomor ID yang valid (1 - " + MAXID.toLocaleString() + ")");
        }
      }
      function openGuide() {
        closeOverlays("guide");
        var gb = $("guideBackdrop");
        if (gb) gb.classList.add("open");
      }
      function closeGuide(e) {
        var gb = $("guideBackdrop");
        if (!e || e.target === gb) {
          if (gb) gb.classList.remove("open");
        }
      }

      // ===== Gestur video: tahan = 2x, ketuk 2x kiri/kanan = loncat 10 dtk, J/L = 5 dtk, indikator play/pause =====
      var vprogFill = $("vprogFill"), speedBadge = $("speedBadge"), lastAct = 0;
      ["pointerdown", "keydown"].forEach(function (ev) { document.addEventListener(ev, function () { lastAct = now(); }, true); });
      function flashEl(cls, html, ms) {
        var d = document.createElement("div"); d.className = cls; d.innerHTML = html;
        stage.appendChild(d); setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, ms || 650);
      }
      function playFlash(paused) {
        if (now() - lastAct > 600) return;
        var old = stage.querySelector(".play-flash"); if (old) old.parentNode.removeChild(old);
        flashEl("play-flash", ic(paused ? "pause" : "play"), 600);
      }
      function seekBy(sec, side) {
        var v = zoomLayer.querySelector("video");
        if (!v || !isFinite(v.duration)) return;
        v.currentTime = Math.max(0, Math.min(v.duration - 0.1, v.currentTime + sec));
        var old = stage.querySelectorAll(".seek-flash"); for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
        var sd = side || (sec < 0 ? "l" : "r");
        flashEl("seek-flash " + sd, (sd === "l" ? ic("chevL") + ic("chevL") : ic("chevR") + ic("chevR")) + "<span>" + Math.abs(sec) + " dtk</span>", 600);
        vibe(8);
      }
      (function videoGestures() {
        var lp = null, lpT = null, slow = false, suppress = 0, lastTap = { t: 0, x: 0 };
        function vidAt(e) {
          var v = e.target && e.target.tagName === "VIDEO" ? e.target : null; if (!v) return null;
          var r = v.getBoundingClientRect(); if (e.clientY > r.bottom - 64) return null; // area kontrol bawaan: jangan diganggu
          return v;
        }
        function endLp() {
          clearTimeout(lpT);
          if (slow) { slow = false; suppress = now() + 350; if (lp && lp.v) lp.v.playbackRate = S.speed; if (speedBadge) speedBadge.classList.remove("on"); }
          lp = null;
        }
        zoomLayer.addEventListener("pointerdown", function (e) {
          var v = vidAt(e); if (!v || (e.pointerType === "mouse" && e.button !== 0)) return;
          lp = { x: e.clientX, y: e.clientY, v: v }; clearTimeout(lpT);
          lpT = setTimeout(function () {
            if (!lp || lp.v.paused) return;
            slow = true; lp.v.playbackRate = 2; if (speedBadge) speedBadge.classList.add("on"); vibe(14);
          }, 450);
        });
        zoomLayer.addEventListener("pointermove", function (e) {
          if (lp && !slow && (Math.abs(e.clientX - lp.x) > 12 || Math.abs(e.clientY - lp.y) > 12)) { clearTimeout(lpT); lp = null; }
        });
        // Chrome Android sudah punya ketuk-2x loncat 10 dtk bawaan (tidak bisa dicegat). Deteksi otomatis:
        // bila setelah loncat milik kita posisi video melebihi target, berarti bawaan ikut jalan -> nonaktifkan versi kita.
        var nativeDbl = lsGet("pe_native_dbl") === "1";
        zoomLayer.addEventListener("pointerup", function (e) {
          var wasSlow = slow; endLp();
          if (wasSlow || e.pointerType !== "touch" || nativeDbl) return;
          var v = vidAt(e); if (!v) return;
          var t = now();
          if (t - lastTap.t < 320 && Math.abs(e.clientX - lastTap.x) < 50) {
            var r = v.getBoundingClientRect(), rel = (e.clientX - r.left) / r.width, sec = rel < 0.38 ? -10 : (rel > 0.62 ? 10 : 0);
            lastTap.t = 0; if (!sec) return;
            var target = Math.max(0, Math.min((v.duration || 1e9) - 0.1, v.currentTime + sec));
            seekBy(sec, sec < 0 ? "l" : "r"); suppress = t + 350;
            setTimeout(function () {
              if (Math.abs(v.currentTime - target) > 5) { nativeDbl = true; lsSet("pe_native_dbl", "1"); try { v.currentTime = target; } catch (er) { } }
            }, 220);
          } else lastTap = { t: t, x: e.clientX };
        });
        zoomLayer.addEventListener("pointercancel", endLp);
        zoomLayer.addEventListener("click", function (e) { if (now() < suppress) { e.stopPropagation(); e.preventDefault(); } }, true);
      })();

      // Status koneksi
      window.addEventListener("offline", function () { toast("Offline: hanya konten tersimpan yang bisa dibuka", "bad"); });
      window.addEventListener("online", function () { toast("Kembali online", "ok"); });

      function toggleSound() {
        S.muted = !S.muted;
        saveS();
        var vd = zoomLayer.querySelector("video");
        if (vd) vd.muted = S.muted;
        if (soundBtn) soundBtn.innerHTML = ic(S.muted ? "mute" : "volume");
        toast(S.muted ? "Suara Video: Mati" : "Suara Video: Hidup", "ok");
      }

      var blacklistTags = jget("pe_blacklist", []); if (!Array.isArray(blacklistTags)) blacklistTags = [];

      function saveBlacklist() { jset("pe_blacklist", blacklistTags); }


      function toggleGrid() {
        var open = sheet.classList.contains("open");
        if (open && sheetTab === "tags" && tagView === "detail") { closeSheet(); return; }
        if (open && sheetTab === "playlist" && plView === "detail") { closeSheet(); return; }
        if (activeTag) {
          // tampilkan daftar yang sedang diputar
          ++bToken; bTags = activeTagsDetail.slice(); bPosts = tagPosts.slice(); bSet = new Set(tagSet);
          bCursor = tagCursor || 0; bHasMore = tagHasMore; bLoading = false;
          openSheet("tags", "detail");
          return;
        }
        if (activePlaylistId) {
          openSheet("playlist"); plView = "detail"; plDetailId = activePlaylistId; renderSheet();
          return;
        }
        // Mode stream biasa: grid post terbaru
        openSheet("tags", "detail");
        loadTagDetail([], true);
      }

      function toggleFilterHub(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        if (filterHubBackdrop) {
          var isOpen = filterHubBackdrop.classList.contains("open");
          if (isOpen) closeFilterHub();
          else openFilterHub();
        }
      }

      function openFilterHub() {
        if (!filterHubBackdrop) return;
        // ingat panel yang sedang terbuka (mis. Explore) lalu tutup, supaya tidak ada 2 panel aktif sekaligus
        hubReturn = sheet.classList.contains("open") ? { tab: sheetTab, tagView: tagView, plView: plView, plDetailId: plDetailId } : null;
        closeOverlays("hub");
        renderFilterHub();
        filterHubBackdrop.classList.add("open");
        syncNavActive();
      }

      // Tutup tanpa memulihkan panel sebelumnya (dipakai Terapkan, Pilih tag, mode sembunyi)
      function hideFilterHub(e) {
        if (!filterHubBackdrop) return false;
        if (e && e.target !== filterHubBackdrop) return false;
        var was = filterHubBackdrop.classList.contains("open");
        filterHubBackdrop.classList.remove("open");
        syncNavActive();
        return was;
      }

      // Dibatalkan pengguna (X / area gelap / Esc): kembali ke panel sebelumnya bila ada
      function closeFilterHub(e) {
        if (!hideFilterHub(e)) return;
        var r = hubReturn; hubReturn = null;
        if (!r) return;
        openSheet(r.tab, (r.tab === "tags" && r.tagView === "detail") ? "detail" : undefined);
        if (r.tab === "playlist" && r.plView === "detail" && getPL(r.plDetailId)) { plView = "detail"; plDetailId = r.plDetailId; renderSheet(); }
      }

      function renderFilterHub() {
        [
          ["newest", "fhSortNewest"],
          ["hot", "fhSortHot"],
          ["popular", "fhSortPopular"],
          ["views", "fhSortViews"],
          ["oldest", "fhSortOldest"]
        ].forEach(function (p) {
          var x = $(p[1]);
          if (x) {
            var active = (tagSortMode === p[0]) || (p[0] === "popular" && tagSortMode === "top");
            x.classList.toggle("on", active);
          }
        });
        var tf = (tagTypeFilter === undefined) ? null : tagTypeFilter;
        [[null, "fhTypeAll"], [1, "fhTypeVid"], [0, "fhTypeImg"]].forEach(function (p) {
          var x = $(p[1]); if (x) x.classList.toggle("on", tf === p[0]);
        });
        var ai = $("fhAiBtn"); if (ai) ai.classList.toggle("on", !!S.filterAi);

        if (fhActiveTagChips) {
          fhActiveTagChips.innerHTML = "";
          if (!selectedTags.length) fhActiveTagChips.appendChild(el("span", "fh-empty", "Belum ada tag aktif."));
          else selectedTags.forEach(function (t) { fhActiveTagChips.appendChild(chipEl(t, "", function () { toggleTagWant(t); })); });
        }
        if (fhBlockTagChips) {
          fhBlockTagChips.innerHTML = "";
          if (!blacklistTags.length) fhBlockTagChips.appendChild(el("span", "fh-empty", "Tidak ada tag yang disembunyikan."));
          else blacklistTags.forEach(function (t) { fhBlockTagChips.appendChild(chipEl(t, "block", function () { toggleTagBlock(t); })); });
        }
      }

      function setHubSort(mode) { tagSortMode = mode; renderFilterHub(); refreshBadges(); if ($("tagFsum")) renderTagFsum(); }
      function setHubType(v) { tagTypeFilter = v; renderFilterHub(); refreshBadges(); if ($("tagFsum")) renderTagFsum(); }
      function toggleHubAi() { S.filterAi = !S.filterAi; saveS(); renderFilterHub(); refreshBadges(); if ($("tagFsum")) renderTagFsum(); }
      function pickTags() { hubReturn = null; hideFilterHub(); openSheet("tags"); }
      function pickBlockTags() { hubReturn = null; hideFilterHub(); openSheet("tags", "block"); }

      function addHubTag() {
        if (!fhTagInput) return;
        var v = normTag(fhTagInput.value); if (!v) return;
        if (selectedTags.indexOf(v) === -1) selectedTags.push(v);
        var bi = blacklistTags.indexOf(v); if (bi !== -1) blacklistTags.splice(bi, 1);
        fhTagInput.value = ""; syncTagUI();
        if (fhActiveTagChips) renderFilterHub();
      }
      function addHubBlockTag() {
        if (!fhBlockInput) return;
        var v = normTag(fhBlockInput.value); if (!v) return;
        if (blacklistTags.indexOf(v) === -1) blacklistTags.push(v);
        var si = selectedTags.indexOf(v); if (si !== -1) selectedTags.splice(si, 1);
        fhBlockInput.value = ""; saveBlacklist(); syncTagUI();
        if (fhBlockTagChips) renderFilterHub();
      }
      if (fhTagInput) fhTagInput.addEventListener("keydown", function (e) { if (e.key === "Enter") addHubTag(); });
      if (fhBlockInput) fhBlockInput.addEventListener("keydown", function (e) { if (e.key === "Enter") addHubBlockTag(); });

      function resetFilter() {
        tagSortMode = "newest"; tagTypeFilter = null; selectedTags = []; blacklistTags = []; saveBlacklist();
        S.filterAi = false; saveS();
        syncTagUI(); renderFilterHub(); toast("Filter diatur ulang", "ok");
      }

      async function applyFilterHub() {
        var ret = hubReturn; hubReturn = null; hideFilterHub();
        var inDetail = !!(ret && ret.tab === "tags" && ret.tagView === "detail");
        var sortLabel = tagSortMode === "hot" ? "Hot" : (tagSortMode === "popular" || tagSortMode === "top" || tagSortMode === "views" ? "Top Rated" : (tagSortMode === "oldest" ? "Terlama" : "Terbaru"));
        var tagLabelStr = selectedTags.length ? selectedTags.join(", ") : "Semua";
        toast("Memuat: " + tagLabelStr + " (" + sortLabel + ")…");
        await loadTagDetail(selectedTags.slice(), true);
        if (inDetail) { openSheet("tags", "detail"); return; }
        if (bPosts.length) startTag(selectedTags.slice(), null, false);
        else toast("Tidak ada post yang cocok", "bad");
      }

      function overlayOpen() { return (filterHubBackdrop && filterHubBackdrop.classList.contains("open")) || sheet.classList.contains("open") || popupBackdrop.classList.contains("open") || dlgBackdrop.classList.contains("open") || infoBackdrop.classList.contains("open") || ($("guideBackdrop") && $("guideBackdrop").classList.contains("open")); }

      document.addEventListener("keydown", function (e) {
        if (locked) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return; // jangan bentrok dengan Ctrl+R, Ctrl+L, dll milik browser
        var ae = document.activeElement;
        if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA")) return;
        if (e.key === "Escape") {
          if (filterHubBackdrop && filterHubBackdrop.classList.contains("open")) { closeFilterHub(); return; }
          var gb = $("guideBackdrop");
          if (gb && gb.classList.contains("open")) closeGuide();
          if (dlgBackdrop.classList.contains("open")) dlgNo();
          else if (popupBackdrop.classList.contains("open")) closePopup();
          else if (infoBackdrop.classList.contains("open")) closeInfo();
          else if (sheet.classList.contains("open")) closeSheet();
          else if (zoom.scale > 1.02) resetZoom();
          else if (document.body.classList.contains("fs")) toggleFs();
          return;
        }
        if (e.key === "`") { panicOn(); return; }
        if (overlayOpen()) return;
        var k = e.key;
        if (k === "ArrowLeft" || k === "ArrowUp") change(-1);
        else if (k === "ArrowRight" || k === "ArrowDown") change(1);
        else if (k === " ") { var v = zoomLayer.querySelector("video"); if (v) { e.preventDefault(); v.paused ? v.play() : v.pause(); } }
        else if (k === "a" || k === "A") toggleAuto();
        else if (k === "f" || k === "F") toggleFav();
        else if (k === "r" || k === "R") randomPost();
        else if (k === "p" || k === "P") openPopup(current);
        else if (k === "t" || k === "T") openSheet("tags");
        else if (k === "i" || k === "I") openInfo();
        else if (k === "b" || k === "B") back();
        else if (k === "m" || k === "M") toggleSound();
        else if (k === "j" || k === "J") seekBy(-5);
        else if (k === "l" || k === "L") seekBy(5);
        else if (k === "?") openGuide();
        else if (k === "g" || k === "G") { e.preventDefault(); input.focus(); input.select(); }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key !== "Tab") return;
        var modal = document.querySelector(".modal.open, .filter-hub-backdrop.open, .sheet.open");
        if (!modal) return;
        var focusables = modal.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      });

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          var v = zoomLayer.querySelector("video");
          if (v) { try { v.pause(); } catch (e) { } }
          if (S.autoPanic) panicOn();
          flushCheckpoint(); saveSeen(); tmFlush();
          persist();
          saveSession();
        } else if (autoEnabled && navigator.wakeLock && !wakeLock) {
          // wake lock dilepas browser saat tab disembunyikan: minta lagi
          try {
            var wt = ++wakeLockRequest;
            navigator.wakeLock.request("screen").then(function (l) {
              if (autoEnabled && wt === wakeLockRequest) { wakeLock = l; l.addEventListener("release", function () { if (wakeLock === l) wakeLock = null; }); }
              else l.release().catch(function () { });
            }).catch(function () { });
          } catch (e) { }
        }
      });
      window.addEventListener("pagehide", function () { flushCheckpoint(); saveSeen(); tmFlush(); persist(); saveSession(); });

      // ===== Feedback sentuhan: ripple di semua tombol =====
      document.addEventListener("pointerdown", function (e) {
        var b = e.target && e.target.closest ? e.target.closest("button, .pli, .trow, .card") : null;
        if (!b || b.disabled || b.id === "panicBtn") return;
        var r = b.getBoundingClientRect(), sz = Math.max(r.width, r.height) * 2;
        var d = document.createElement("span");
        d.className = "ripple";
        d.style.cssText = "width:" + sz + "px;height:" + sz + "px;left:" + (e.clientX - r.left - sz / 2) + "px;top:" + (e.clientY - r.top - sz / 2) + "px";
        if (getComputedStyle(b).position === "static") b.classList.add("rip-host");
        b.classList.add("rip-clip");
        b.appendChild(d);
        setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 600);
      }, { passive: true });

      // ===== Auto-tutup panel: tap area gelap + geser turun =====
      sheetBackdrop.addEventListener("click", function () { if (S.autoClose !== false) closeSheet(); });
      (function sheetDrag() {
        var y0 = 0, dy = 0, drag = false, lastY = 0, lastT = 0, vel = 0;
        var grab = sheet.querySelector(".grab"), shead = sheet.querySelector(".shead");
        function begin(y) { y0 = y; dy = 0; vel = 0; lastY = y; lastT = performance.now(); drag = true; sheet.style.transition = "none"; }
        function moveTo(y) {
          dy = Math.max(0, y - y0);
          var t = performance.now(); if (t > lastT) vel = (y - lastY) / (t - lastT); lastY = y; lastT = t;
          sheet.style.transform = "translateY(" + dy + "px)";
          sheetBackdrop.style.opacity = String(Math.max(0, 1 - dy / 360));
        }
        function finish() {
          if (!drag) return; drag = false;
          sheet.style.transition = ""; sheetBackdrop.style.opacity = ""; sheet.style.transform = "";
          if (dy > 100 || (dy > 30 && vel > 0.6)) closeSheet(); // geser jauh atau lempar cepat = tutup
        }
        // Strip + header: Pointer Events (jari & mouse). Tombol di header tetap bisa diketuk karena capture baru aktif setelah bergeser.
        [grab, shead].forEach(function (n) {
          if (!n) return;
          var down = false, sy = 0, pid = null;
          n.addEventListener("pointerdown", function (e) { if (e.pointerType === "mouse" && e.button !== 0) return; down = true; sy = e.clientY; pid = e.pointerId; });
          n.addEventListener("pointermove", function (e) {
            if (!down || e.pointerId !== pid) return;
            if (!drag) {
              if (e.clientY - sy < 6) return;
              begin(sy); try { n.setPointerCapture(pid); } catch (er) { }
            }
            moveTo(e.clientY);
          });
          function up(e) { if (e.pointerId !== pid) return; down = false; finish(); }
          n.addEventListener("pointerup", up);
          n.addEventListener("pointercancel", up);
        });
        // Isi panel: geser turun saat sudah di paling atas (seperti bottom sheet bawaan HP)
        var by0 = null, bx0 = 0, engaged = false;
        sheetBody.addEventListener("touchstart", function (e) {
          if (e.touches.length !== 1) { by0 = null; return; }
          by0 = e.touches[0].clientY; bx0 = e.touches[0].clientX; engaged = false;
        }, { passive: true });
        sheetBody.addEventListener("touchmove", function (e) {
          if (by0 === null) return;
          var t = e.touches[0], ddy = t.clientY - by0, ddx = t.clientX - bx0;
          if (!engaged) {
            if (sheetBody.scrollTop > 0) { by0 = null; return; }
            if (ddy < 0) return;
            if (ddy > 8 && Math.abs(ddx) < ddy) { engaged = true; begin(by0); } else return;
          }
          if (e.cancelable) e.preventDefault();
          moveTo(t.clientY);
        }, { passive: false });
        function bodyEnd() { by0 = null; if (engaged) { engaged = false; finish(); } }
        sheetBody.addEventListener("touchend", bodyEnd, { passive: true });
        sheetBody.addEventListener("touchcancel", bodyEnd, { passive: true });
      })();

      paintIcons();
      Array.prototype.forEach.call(document.querySelectorAll("button[title]"), function (bt) { if (!bt.getAttribute("aria-label")) bt.setAttribute("aria-label", bt.title); });
      refreshBtns(); updateChip(); updateBack();
      
  // --- Restore session state on init ---
      (function restoreSession() {
        try {
          var sess = jget('pe_session', null);
          if (!sess) return;
          if (validId(sess.current)) current = sess.current;
          if (sess.tagSortMode !== undefined) tagSortMode = (sess.tagSortMode === "views") ? "popular" : sess.tagSortMode;
          if (sess.tagTypeFilter !== undefined) tagTypeFilter = sess.tagTypeFilter;
          if (Array.isArray(sess.selectedTags) && sess.selectedTags.length) selectedTags = sess.selectedTags;
          if (sess.shuffleOn !== undefined) shuffleOn = !!sess.shuffleOn;
          if (Array.isArray(sess.playOrder) && sess.playOrder.length) playOrder = sess.playOrder;
          if (sess.activePlaylistId) {
            var pls = getPL(sess.activePlaylistId);
            if (pls) activePlaylistId = sess.activePlaylistId;
          }
          if (!activePlaylistId && sess.activeTag && Array.isArray(sess.activeTagsDetail) && Array.isArray(sess.tagPosts) && sess.tagPosts.length) {
            activeTag = sess.activeTag;
            activeTagsDetail = sess.activeTagsDetail;
            tagPosts = sess.tagPosts; tagSet = new Set(tagPosts);
            tagCursor = Number(sess.tagCursor) || 0;
            tagHasMore = sess.tagHasMore !== false;
            playCfg = sess.playCfg || currentCfg();
            returnId = null;
          }
        } catch (e) { console.warn('restoreSession error', e); }
      })();

      updateChip();
      refreshBtns();
      updateBack();
      syncNavActive();

      if (!isFinite(sp) || sp < 1) {
        // Pengunjung baru pertama kali: ambil post terbaru agar tidak membuka post #1 yang sudah dihapus
        fetchLatestPostId().then(function (latestId) {
          var numInp = $("numberInput");
          if (numInp) numInp.placeholder = "#" + latestId;
          if (validId(latestId) && latestId > 1000) {
            current = latestId;
            input.value = latestId;
            if (sbInp) sbInp.value = latestId;
            loadPost(latestId, 0);
          } else {
            loadPost(10500000, 0);
          }
        }).catch(function () {
          loadPost(10500000, 0);
        });
      } else {
        loadPost(current, 0);
        fetchLatestPostId().then(function (id) {
          var numInp = $("numberInput");
          if (numInp) numInp.placeholder = "#" + id;
        }).catch(function () { });
      }

      try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { }
      if (hasPin()) panicOn();
      restoreFromBackup();
      if (playlists.length) persist();
      if (!okLS) setTimeout(function () { toast("Penyimpanan browser mati (mode private?). Playlist tidak akan tersimpan.", "bad"); }, 1200);
      if (!lsGet("pe_onboarded")) { lsSet("pe_onboarded", "1"); setTimeout(openGuide, 600); }

      try {
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function () {
            navigator.serviceWorker.register('./sw.js').catch(function (err) {
              console.warn('SW register error:', err);
            });
          });
        }
      } catch (e) { }

      // ===== Tempel link / ID: langsung buka post =====
      function parseIdFromText(t) {
        t = String(t || "").trim();
        var m = t.match(/(?:[?&]id=|\/posts?\/|\/show\/|#)(\d{1,9})(?!\d)/) || t.match(/^(\d{1,9})$/);
        var n = m ? Number(m[1]) : NaN; return validId(n) ? n : null;
      }
      [input].forEach(function (inp) {
        inp.addEventListener("paste", function (e) {
          var t = (e.clipboardData || window.clipboardData).getData("text"), n = parseIdFromText(t);
          if (n && String(n) !== String(t).trim()) { e.preventDefault(); inp.value = n; inp.blur(); exitPlaylist(); loadPost(n, 0); toast("Membuka #" + n + " dari link", "ok"); }
        });
      });
      document.addEventListener("paste", function (e) {
        if (locked) return;
        var ae = document.activeElement; if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA")) return;
        var n = parseIdFromText((e.clipboardData || window.clipboardData).getData("text"));
        if (n) { exitPlaylist(); loadPost(n, 0); toast("Membuka #" + n + " dari clipboard", "ok"); vibe(8); }
      });

      // Kursor & label ID menghilang saat mouse diam (nonton lebih bersih)
      (function idleUI() {
        var t = null;
        function wake() { stage.classList.remove("idle"); clearTimeout(t); t = setTimeout(function () { stage.classList.add("idle"); }, 2500); }
        stage.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse") wake(); });
        stage.addEventListener("pointerleave", function () { clearTimeout(t); stage.classList.remove("idle"); });
      })();


      // ===== Privasi: tutup layar cepat (panic) + PIN opsional =====
      var panicEl = $("panicCover"), panicForm = $("panicForm"), panicPin = $("panicPin"), panicMsg = $("panicMsg");
      var origTitle = document.title, panicTaps = 0, panicTapT = null;
      function hasPin() { return !!lsGet("pe_pin"); }
      function hashPin(pin) {
        var s = "darknight:" + pin;
        try {
          if (window.crypto && crypto.subtle && window.TextEncoder) {
            return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)).then(function (buf) {
              return Array.from(new Uint8Array(buf)).map(function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
            });
          }
        } catch (e) { }
        var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
        return Promise.resolve("x" + (h >>> 0).toString(16));
      }
      function setPinDialog() {
        dialog("Masukkan PIN baru (4–12 angka)", { input: true, password: true, ok: "Simpan" }, function (v) {
          v = (v || "").trim();
          if (!/^\d{4,12}$/.test(v)) { toast("PIN harus 4–12 angka", "bad"); return; }
          hashPin(v).then(function (h) { lsSet("pe_pin", h); toast("PIN disimpan", "ok"); renderSettings(); });
        });
      }
      function panicOn() {
        if (locked || !panicEl) return;
        locked = true;
        var v = zoomLayer.querySelector("video"); if (v) { try { v.pause(); v.muted = true; } catch (e) { } }
        if (autoEnabled) stopAuto();
        try { hubReturn = null; closeOverlays(""); dlgNo(); } catch (e) { }
        document.body.classList.add("panic");
        panicEl.classList.add("on"); panicEl.setAttribute("aria-hidden", "false");
        panicForm.style.display = hasPin() ? "flex" : "none";
        panicPin.value = ""; panicMsg.textContent = "";
        try { document.title = "Catatan"; } catch (e) { }
        if (hasPin()) setTimeout(function () { try { panicPin.focus(); } catch (e) { } }, 60);
      }
      function panicOff() {
        locked = false;
        document.body.classList.remove("panic");
        panicEl.classList.remove("on"); panicEl.setAttribute("aria-hidden", "true");
        try { document.title = origTitle; } catch (e) { }
      }
      var pBtn = $("panicBtn");
      if (pBtn) {
        var pT = null, pFired = false;
        pBtn.addEventListener("pointerdown", function () { pFired = false; clearTimeout(pT); pT = setTimeout(function () { pFired = true; panicOn(); }, 600); });
        ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) { pBtn.addEventListener(ev, function () { clearTimeout(pT); }); });
        pBtn.addEventListener("click", function () { if (!pFired) toast("Tahan tombol mata untuk menyembunyikan layar"); });
      }
      if (panicEl) {
        panicEl.addEventListener("click", function () {
          if (hasPin()) return;
          panicTaps++; clearTimeout(panicTapT); panicTapT = setTimeout(function () { panicTaps = 0; }, 700);
          if (panicTaps >= 3) { panicTaps = 0; panicOff(); }
        });
        panicForm.addEventListener("submit", function (e) {
          e.preventDefault();
          hashPin(panicPin.value || "").then(function (h) {
            if (h === lsGet("pe_pin")) panicOff();
            else { panicMsg.textContent = "PIN salah"; panicPin.value = ""; }
          });
        });
      }
      return {
        loadPost: loadPost,
        getCurrent: function () { return current; },
        prev: function () { change(-1); }, next: function () { change(1); }, back: back,
        randomPost: randomPost, toggleAuto: toggleAuto, toggleFav: toggleFav,
        togglePopup: togglePopup, closePopup: closePopup, showNewRow: showNewRow, confirmNewPl: confirmNewPl,
        openSheet: openSheet, closeSheet: closeSheet, sheetBack: sheetBack,
        download: download, toggleFs: toggleFs, toggleFit: toggleFit, openTag: openTag, openInfo: openInfo, closeInfo: closeInfo, toggleTagWant: toggleTagWant, toggleTagBlock: toggleTagBlock,
        getSelectedTags: function () { return selectedTags; }, getBlacklistTags: function () { return blacklistTags; },
        dlgYes: dlgYes, dlgNo: dlgNo, leavePlaylist: leavePlaylist, goToInput: goToInput, openGuide: openGuide, closeGuide: closeGuide,
        toggleFilterHub: toggleFilterHub, closeFilterHub: closeFilterHub, setHubSort: setHubSort, applyFilterHub: applyFilterHub, setHubType: setHubType, pickTags: pickTags, pickBlockTags: pickBlockTags, resetFilter: resetFilter, toggleHubAi: toggleHubAi,
        addHubTag: addHubTag, addHubBlockTag: addHubBlockTag,
        toggleSound: toggleSound, toggleGrid: toggleGrid, panic: panicOn, closeAll: closeAll, navTo: navTo
      };
    })();
