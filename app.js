    var PE = (function () {
      "use strict";
      var MAXID = 100000000;
      function $(id) { return document.getElementById(id); }
      function now() { return performance.now(); }
      function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
      function validId(n) { return typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= MAXID; }
      function uniq(a) { var s = {}, o = []; a.forEach(function (x) { if (!s[x]) { s[x] = 1; o.push(x); } }); return o; }

      var ICONS = {
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
        refresh: '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 4v3h-3M6 20v-3h3"/>'
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
              localStorage.removeItem("darknight_alpha_cache");
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
        var d = { interval: 5, skipMissing: true, fit: "contain", muted: true, saver: false, keepZoom: false, speed: 1, filterAi: false, autoNextVid: false };
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
      var tagSortMode = "newest";
      var postMetaCache = new Map();
      function metaCacheSet(id, post) {
        postMetaCache.delete(id);
        metaCacheSet(id, post);
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

      var toastT = null;
      function toast(msg, type) {
        toastEl.textContent = lead(msg); toastEl.className = "toast show" + (type ? " " + type : "");
        clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 1800);
      }
      var dlgCb = null;
      function dialog(msg, opts, cb) {
        opts = opts || {};
        dlgMsg.innerHTML = msg;
        dlgInput.style.display = opts.input ? "block" : "none";
        dlgInput.value = opts.value || "";
        dlgOk.textContent = opts.ok || "OK";
        dlgOk.className = "d-ok" + (opts.danger ? " danger" : "");
        dlgCb = cb; dlgBackdrop.classList.add("open");
        if (opts.input) setTimeout(function () { dlgInput.focus(); dlgInput.select(); }, 60);
      }
      function dlgYes() { var v = dlgInput.value; dlgBackdrop.classList.remove("open"); var cb = dlgCb; dlgCb = null; if (cb) cb(v); }
      function dlgNo() { dlgBackdrop.classList.remove("open"); dlgCb = null; }
      dlgInput.addEventListener("keydown", function (e) { if (e.key === "Enter") dlgYes(); });
      function vibe(ms) { try { if (navigator.vibrate) navigator.vibrate(ms || 8); } catch (e) { } }
      function saveBlob(blob, name) {
        var u = URL.createObjectURL(blob), a = document.createElement("a");
        a.href = u; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(u); }, 5000);
      }

      var R34_API_KEY = "bebe222a50299520c4a08f2b0ad0d5e0194222fe80fe4d6e1b47efe8425470d9679a6ce79ccd3af2b9a983bfa0d7c194fad1d4b6bfb42ee5884f6d47611bf0c5";
      var R34_USER_ID = "7058579";

      async function rule34ApiFetch(params) {
        params = params || {};
        params.api_key = R34_API_KEY;
        params.user_id = R34_USER_ID;
        params.json = "1";
        var qs = Object.keys(params).map(function (k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
        }).join("&");

        var directUrl = "https://api.rule34.xxx/index.php?" + qs;

        // 1. Direct fetch (CORS terbuka, keep-alive HTTP/2, paling cepat tanpa delay proxy)
        try {
          var res = await fetch(directUrl);
          if (res.ok) return await res.json();
        } catch (e) {
          console.warn("Direct fetch Rule34 gagal, mencoba proxy Vercel...", e);
        }

        // 2. Fallback rewrite proxy Vercel
        if (window.location.protocol === "http:" || window.location.protocol === "https:") {
          try {
            var proxyUrl = "/api/dapi?" + qs;
            var res2 = await fetch(proxyUrl);
            if (res2.ok) return await res2.json();
          } catch (e2) { }
        }

        // 3. Fallback allorigins
        try {
          var res3 = await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(directUrl));
          if (res3.ok) return await res3.json();
        } catch (e3) { }

        throw new Error("Gagal mengambil data dari Rule34 API");
      }

      function thumbURL(id) {
        var meta = postMetaCache.get(id);
        return (meta && meta.preview_url) ? meta.preview_url : "";
      }

      var cache = new Map(), pending = new Map(), queue = [], queuedResolvers = new Map(), queuedPromises = new Map(), running = 0, MAX_PAR = 4, MAX_CACHE = 40, cacheGeneration = 0;
      function invalidateCache() { cacheGeneration++; cache.clear(); }
      function cacheSet(id, r) { cache.delete(id); cache.set(id, r); while (cache.size > MAX_CACHE) cache.delete(cache.keys().next().value); }
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
        // Gunakan sample_url (versi kompresi web yang tajam & ringan, ~300KB), fallback ke file_url
        var isGif = !!(url.match(/\.gif(\?|$)/i) || (post.image && post.image.match(/\.gif$/i)));
        var targetUrl = (isGif || !post.sample || !post.sample_url) ? url : (S.saver ? (post.sample_url || post.preview_url || url) : post.sample_url);
        var mediaType = isGif ? "gif" : "jpg";
        return loadImg(targetUrl).then(function (im) {
          if (im) return { type: mediaType, url: targetUrl, el: im, meta: post, fullUrl: url, postId: pid };
          var fallbackUrl = (targetUrl === post.sample_url) ? post.file_url : (post.sample_url || post.preview_url);
          if (fallbackUrl && fallbackUrl !== targetUrl) {
            return loadImg(fallbackUrl).then(function (im2) {
              if (im2) return { type: mediaType, url: fallbackUrl, el: im2, meta: post, fullUrl: url, postId: pid };
              return { type: null, miss: true };
            });
          }
          return { type: null, miss: true };
        });
      }
      function startResolve(id) {
        running++;
        var generation = cacheGeneration;
        var p;
        if (postMetaCache.has(id)) {
          p = buildResultFromMeta(postMetaCache.get(id));
        } else {
          p = rule34ApiFetch({ page: "dapi", s: "post", q: "index", id: id, tags: "id:" + id, limit: 1 })
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
              return { type: null, miss: true };
            });
        }
        function done() { running--; pending.delete(id); pump(); }
        p.then(done, done);
        pending.set(id, p);
        if (generation === cacheGeneration) {
          p.then(function (r) {
            if (r && !r.miss) cacheSet(id, r);
          });
        }
        return p;
      }
      function get(id) {
        if (id < 1 || id > MAXID) return Promise.resolve({ type: null, miss: true });
        if (cache.has(id)) { var r = cache.get(id); cacheSet(id, r); return Promise.resolve(r); }
        if (pending.has(id)) return pending.get(id);
        var qi = queue.indexOf(id);
        if (qi < 0) queue.push(id);
        var promise = new Promise(function (resolve) { queuedResolvers.set(id, resolve); });
        queuedPromises.set(id, promise);
        pending.set(id, promise);
        pump();
        return promise;
      }
      function schedule(id) {
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
        // Mode Stream: ambil 8 post ke depan sekaligus dalam 1 request cepat
        rule34ApiFetch({
          page: "dapi", s: "post", q: "index",
          tags: "id:>" + id + " sort:id:asc",
          limit: 8
        }).then(function (nextPosts) {
          if (Array.isArray(nextPosts)) {
            nextPosts.forEach(function (p) {
              var pid = Number(p.id);
              metaCacheSet(pid, p);
              schedule(pid);
            });
          }
        }).catch(function () {});

        if (id > 1) {
          rule34ApiFetch({
            page: "dapi", s: "post", q: "index",
            tags: "id:<" + id + " sort:id:desc",
            limit: 3
          }).then(function (prevPosts) {
            if (Array.isArray(prevPosts)) {
              prevPosts.forEach(function (p) {
                var pid = Number(p.id);
                metaCacheSet(pid, p);
                schedule(pid);
              });
            }
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
          jset('pe_session', {
            current: current,
            activeTag: activeTag,
            activeTagsDetail: activeTagsDetail || [],
            tagPosts: (tagPosts && tagPosts.length) ? tagPosts.slice(0, 200) : [],
            tagCursor: tagCursor,
            tagHasMore: tagHasMore,
            activePlaylistId: activePlaylistId,
            selectedTags: selectedTags || [],
            tagSortMode: tagSortMode,
            tagTypeFilter: tagTypeFilter,
            shuffleOn: shuffleOn,
            playOrder: (playOrder && playOrder.length) ? playOrder.slice(0, 200) : [],
            tagView: tagView
          });
        } catch(e) {}
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
        $("plBtn").classList.toggle("on", any); $("plIco").innerHTML = ic(any ? "check" : "plus");
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
        if (isIn(p, current)) { removeFrom("pl_fav", current); toast("Dihapus dari Favorit", "bad"); }
        else { addTo("pl_fav", current); toast("Masuk Favorit", "ok"); vibe(12); }
        refreshBtns(); updateChip();
        if (sheet.classList.contains("open")) rerender();
      }
      function addFav(id) {
        var p = getPL("pl_fav");
        if (!p) { p = { id: "pl_fav", name: "Favorit", postIds: [], last: null }; playlists.unshift(p); }
        if (!isIn(p, id)) { addTo("pl_fav", id); toast("Masuk Favorit", "ok"); vibe(12); refreshBtns(); if (sheet.classList.contains("open")) rerender(); }
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
      function setMedia(el, kind) {
        emptyStage();
        if (el.tagName === "IMG") { el.alt = "Post " + current; el.className = kind === "ph" ? "ph" : ""; el.draggable = false; }
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
        v.addEventListener("waiting", function () { if (id === current) setLoading(true); });
        v.addEventListener("canplay", function () { if (id === current) { setLoading(false); preloadAround(id); } });
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
        current = id; input.value = id; var sbInp = $("numberInputSidebar"); if (sbInp) sbInp.value = id; lsSet("lastPost", String(id)); updateAnchor(id);
        refreshBtns(); updateChip(); updateBack();
        if (activePlaylistId) {
          var ap = getPL(activePlaylistId);
          if (ap && ap.last !== id && isIn(ap, id)) { ap.last = id; persistSoon(); }
        }
        if (activeTag && !activePlaylistId) {
          if (!shuffleOn) saveTagProg(id);
          saveTagCheckpoint(activeTagsDetail, id, tagPosts.indexOf(id));
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
          var el = makeVideo(current, r.url, poster, r.altUrl); setMedia(el);
          clearAutoTimer();
          if (autoEnabled) { lastLbl = "VIDEO"; autoLbl.textContent = "VIDEO"; autoFill.style.width = "100%"; }
          var pr = el.play();
          if (pr && pr.catch) pr.catch(function () {
            el.muted = true;
            var p2 = el.play();
            if (p2 && p2.catch) p2.catch(function () { });
          });
        } else {
          setMedia(r.el);
          if (autoEnabled) resetAutoTimer();
        }
        addHist(current);
        if (r.type !== "mp4") preloadAround(current);
      }

      var changeBusy = false;
      async function change(step) {
        var ord = activeOrder();
        if (ord) {
          if (!ord.length) { exitPlaylist(); return false; }
          var idx = ord.indexOf(current); if (idx < 0) idx = 0;
          var ni = idx + step;
          if (activeTag && ni >= ord.length - 3 && tagHasMore && !tagLoading) {
            loadMoreTagPosts(activeTag);
          }
          if (ni >= ord.length && autoEnabled) ni = 0;
          if (ni < 0 || ni >= ord.length) { toast(step > 0 ? "Playlist selesai" : "Awal playlist"); return false; }
          loadPost(ord[ni], step); return true;
        }

        if (changeBusy) return false;
        changeBusy = true;
        try {
          var nextTargetId = null;
          if (step > 0) {
            var cands = [];
            postMetaCache.forEach(function (meta, k) { if (k > current && k <= current + 5) cands.push(k); });
            cands.sort(function (a, b) { return a - b; });
            if (cands.length > 0) nextTargetId = cands[0];
          } else {
            var cands2 = [];
            postMetaCache.forEach(function (meta, k) { if (k < current && k >= current - 5) cands2.push(k); });
            cands2.sort(function (a, b) { return b - a; });
            if (cands2.length > 0) nextTargetId = cands2[0];
          }

          if (!nextTargetId) {
            var tagQuery = step > 0 ? ("id:>" + current + " sort:id:asc") : ("id:<" + current + " sort:id:desc");
            var posts = await rule34ApiFetch({
              page: "dapi", s: "post", q: "index",
              tags: tagQuery,
              limit: 4
            });
            if (Array.isArray(posts) && posts.length) {
              posts.forEach(function (p) {
                var pid = Number(p.id);
                metaCacheSet(pid, p);
              });
              nextTargetId = Number(posts[0].id);
            }
          }

          if (nextTargetId && nextTargetId >= 1 && nextTargetId <= MAXID) {
            loadPost(nextTargetId, step);
            return true;
          } else {
            toast(step > 0 ? "Sudah mencapai post terakhir" : "Sudah mencapai post pertama");
            return false;
          }
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

      var randTries = 0;
      async function randomPost() {
        randTries = 0;
        var ord = activeOrder();
        if (ord && ord.length) { loadPost(ord[Math.floor(Math.random() * ord.length)], 0); return; }
        setLoading(true);
        try {
          var posts = await rule34ApiFetch({ page: "dapi", s: "post", q: "index", tags: "sort:random", limit: 1 });
          if (Array.isArray(posts) && posts.length) {
            var rp = posts[0];
            var rpid = Number(rp.id);
            metaCacheSet(rpid, rp);
            loadPost(rpid, 0);
            return;
          }
        } catch(e) {}
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
            if (!ok && current >= MAXID) stopAuto();
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

      function hint(el, vis, armed) { el.classList.toggle("visible", !!vis); el.classList.toggle("armed", !!armed); }
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
          if (sw.dbl) {
            g.lastTap = 0;
            showHeartPop(sw.sx, sw.sy);
            addFav(current);
          } else { g.lastTap = now(); g.lx = sw.sx; g.ly = sw.sy; }
          return;
        }
        var valid = false;
        if (axis === "h") valid = adx >= SW_MIN && adx >= ady * DOM && dt <= SW_MS;
        else if (axis === "v") valid = ady >= SW_MIN && ady >= adx * DOM && dt <= SW_MS;
        if (valid && now() - sw.last >= SW_CD) {
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
      var lastWheel = 0;
      stage.addEventListener("wheel", function (e) {
        if (zoom.scale > 1.02) return;
        e.preventDefault();
        if (now() - lastWheel < 300) return; lastWheel = now();
        change(e.deltaY > 0 ? 1 : -1);
      }, { passive: false });

      function swipeDelete() {
        if (activePlaylistId) {
          var p = getPL(activePlaylistId); if (!p) return;
          if (!isIn(p, current)) { toast("Post ini tidak ada di " + p.name); return; }
          dialog("Hapus post <b>" + current + "</b> dari playlist <b>" + esc(p.name) + "</b>?", { ok: "Hapus", danger: true }, function () {
            removeFrom(p.id, current); toast("Dihapus dari " + p.name, "bad"); refreshBtns(); updateChip();
            if (!p.postIds.length) exitPlaylist();
          });
        } else {
          var cont = playlists.filter(function (p) { return isIn(p, current); });
          if (!cont.length) { toast("Post #" + current + " belum di playlist mana pun. Swipe kanan untuk simpan.", "bad"); return; }
          dialog("Hapus post <b>" + current + "</b> dari <b>" + cont.length + " playlist</b>?", { ok: "Hapus", danger: true }, function () {
            cont.forEach(function (p) { removeFrom(p.id, current); });
            toast("Dihapus dari semua playlist", "bad"); refreshBtns();
          });
        }
      }

      function openPopup(id) {
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
            else { addTo(pl.id, popupPostId); toast("Ditambahkan ke " + pl.name, "ok"); }
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
      function openInfo(id) {
        id = id || current;
        var infoToken = ++infoRequestToken;
        infoIdEl.textContent = id;
        infoMetaEl.innerHTML = "Mengambil detail post…";
        infoTagsEl.innerHTML = "";
        infoSuggEl.innerHTML = "";
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

          var tagStr = (post.tags || "").trim();
          var tagTokens = tagStr ? tagStr.split(/\s+/).filter(Boolean) : [];
          if (!tagTokens.length) {
            infoTagsEl.innerHTML = '<div style="font-size:12px;color:var(--text-faint);font-style:italic">Tidak ada metadata tag untuk post ini</div>';
          } else {
            infoTagsEl.innerHTML = "";
            var sec = el("div", "infotag-sec");
            sec.appendChild(el("div", "infotag-title", "Tags (" + tagTokens.length + ")"));
            var chips = el("div", "infotag-chips");
            tagTokens.forEach(function (tVal) {
              var chip = el("button", "tagchip", tVal);
              chip.onclick = function () {
                closeInfo();
                openTag(tVal);
              };
              chips.appendChild(chip);
            });
            sec.appendChild(chips);
            infoTagsEl.appendChild(sec);

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
                infoSuggEl.innerHTML = '<div class="infotag-title" style="margin-bottom:6px">Post serupa (' + chosenTag + ')</div>';
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
        }).catch(function (err) {
          if (infoToken === infoRequestToken && infoBackdrop.classList.contains("open")) infoMetaEl.textContent = "Detail post tidak tersedia";
        });
      }

      function closeInfo(e) {
        if (e && e.target !== infoBackdrop) return;
        ++infoRequestToken;
        infoBackdrop.classList.remove("open");
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
            type: 1
          };
        });
      }

      async function r34Autocomplete(q) {
        if (!q) return [];
        var targetParam = "?q=" + encodeURIComponent(q);
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
      function tagProgKey(tags) {
        var t = (tags || []).map(normTag).filter(Boolean).sort().join("+") || "__all__";
        return t + "|" + tagSortMode + "|" + tagTypeFilter;
      }
      function getTagProg(tags) {
        var all = jget("pe_tagprog", {}), r = all[tagProgKey(tags)];
        return r && validId(r.id) ? r : null;
      }
      function saveTagProg(id) {
        if (!validId(id)) return;
        var all = jget("pe_tagprog", {});
        all[tagProgKey(activeTagsDetail)] = { id: id, t: Date.now() };
        var keys = Object.keys(all);
        if (keys.length > 100) {
          keys.sort(function (x, y) { return all[x].t - all[y].t; });
          keys.slice(0, keys.length - 100).forEach(function (k) { delete all[k]; });
        }
        jset("pe_tagprog", all);
      }
      function clearTagProg(tags) {
        var all = jget("pe_tagprog", {}); delete all[tagProgKey(tags)]; jset("pe_tagprog", all);
      }
      // ===== Tag Checkpoint System =====
      function getTagCheckpoints() {
        return jget("pe_tag_checkpoints", {});
      }
      function getTagCheckpoint(tags) {
        var cpMap = getTagCheckpoints();
        var key = tagProgKey(tags);
        return cpMap[key] || null;
      }
      function saveTagCheckpoint(tags, postId, postIndex) {
        if (!validId(postId)) return;
        var key = tagProgKey(tags);
        var cpMap = getTagCheckpoints();
        var idx = typeof postIndex === "number" ? postIndex : tagPosts.indexOf(postId);
        cpMap[key] = {
          lastId: postId,
          lastIndex: idx >= 0 ? idx : 0,
          updatedAt: Date.now()
        };
        var keys = Object.keys(cpMap);
        if (keys.length > 200) {
          keys.sort(function (a, b) { return cpMap[a].updatedAt - cpMap[b].updatedAt; });
          for (var i = 0; i < keys.length - 200; i++) delete cpMap[keys[i]];
        }
        jset("pe_tag_checkpoints", cpMap);
      }
      function clearTagCheckpoint(tags) {
        var cpMap = getTagCheckpoints();
        var key = tagProgKey(tags);
        if (cpMap[key]) {
          delete cpMap[key];
          jset("pe_tag_checkpoints", cpMap);
        }
      }

      var tagResuming = false;
      async function resumeTag(tags) {
        var pr = getTagProg(tags); if (!pr || tagResuming) return;
        tagResuming = true;
        try {
          var guard = 0;
          toast("Mencari posisi terakhir #" + pr.id + "…");
          while (tagPosts.indexOf(pr.id) === -1 && tagHasMore && guard++ < 60) {
            if (tagLoading) { await new Promise(function (r) { setTimeout(r, 150); }); continue; }
            await loadTagDetail(tags, false);
          }
          if (tagPosts.indexOf(pr.id) !== -1) startTag(tags, pr.id, false);
          else { toast("Posisi tidak ditemukan, mulai dari awal", "bad"); startTag(tags, null, false); }
        } finally { tagResuming = false; }
      }

      function startTag(tags, startId, shuffle) {
        if (!tagPosts.length) { toast("Belum ada post untuk tag ini", "bad"); return; }
        if (!activePlaylistId && !activeTag) returnId = current;
        if (Array.isArray(tags)) {
          activeTagsDetail = tags.slice();
          activeTag = tagLabel(tags);
        } else {
          activeTagsDetail = [tags];
          activeTag = tags;
        }
        activePlaylistId = null;
        shuffleOn = !!shuffle;
        if (shuffleOn) {
          playOrder = shuffleArr(tagPosts.slice());
          if (startId && tagPosts.indexOf(startId) !== -1) {
            playOrder.splice(playOrder.indexOf(startId), 1);
            playOrder.unshift(startId);
          }
        }
        var ord = activeOrder(), target = startId || ord[0];
        if (!activeTagsDetail.length && !activePlaylistId) { activeTag = tagSortMode === "hot" ? "Hot" : (tagSortMode === "popular" || tagSortMode === "top" ? "Top Rated" : (tagSortMode === "views" ? "Most Viewed" : "Terbaru")); }
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
      var alphaTagCache = {};
      try {
        var savedAlpha = lsGet("darknight_alpha_cache");
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
                toSave[k] = alphaTagCache[k].slice(0, 150);
              }
            });
            lsSet("darknight_alpha_cache", JSON.stringify(toSave));
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

      async function loadTagDetail(tags, reset) {
        if (Array.isArray(tags)) {
          activeTagsDetail = tags.slice();
        } else if (typeof tags === "string") {
          activeTagsDetail = [tags];
        }
        if (reset) {
          ++tagRequestToken;
          tagPosts = [];
          tagCursor = 0;
          tagHasMore = true;
          tagLoading = false;
        }
        if (!tagHasMore || tagLoading) return;
        var requestToken = tagRequestToken, requestTags = activeTagsDetail.slice(), requestCursor = Number(tagCursor) || 0;
        tagLoading = true;
        rerender();
        try {
          var queryTags = [];
          if (activeTagsDetail && activeTagsDetail.length) {
            activeTagsDetail.forEach(function (t) {
              if (t) queryTags.push(t.trim().replace(/\s+/g, "_"));
            });
          }
          if (tagSortMode === "popular" || tagSortMode === "top" || tagSortMode === "hot" || tagSortMode === "views") {
            queryTags.push("sort:score:desc");
          } else if (tagSortMode === "oldest") {
            queryTags.push("sort:id:asc");
          }

          if (tagTypeFilter === 1) {
            queryTags.push("video");
          } else if (tagTypeFilter === 0) {
            queryTags.push("-video");
          }

          if (S.filterAi) {
            queryTags.push("-ai_generated");
          }

          if (blacklistTags.length > 0) {
            blacklistTags.forEach(function (bt) {
              if (bt) queryTags.push("-" + bt.trim().replace(/\s+/g, "_"));
            });
          }

          if (queryTags.length > 4) {
            // Rule34 API limit: maksimal 4 tag per request agar query tidak ditolak
            queryTags = queryTags.slice(0, 4);
          }
          var tagsParam = queryTags.join(" ").trim();
          var params = {
            page: "dapi",
            s: "post",
            q: "index",
            limit: 40,
            pid: requestCursor
          };
          if (tagsParam) params.tags = tagsParam;

          var data = await rule34ApiFetch(params);
          if (requestToken !== tagRequestToken || tagLabel(requestTags) !== tagLabel(activeTagsDetail)) return;
          var rawItems = Array.isArray(data) ? data : [];
          if (rawItems.length > 0) {
            rawItems.forEach(function (item) {
              if (item && item.id) {
                var numId = Number(item.id);
                metaCacheSet(numId, item);
                if (tagPosts.indexOf(numId) === -1) {
                  tagPosts.push(numId);
                }
              }
            });
            tagCursor = requestCursor + 1;
          }
          if (rawItems.length < 40) tagHasMore = false;
        } catch (err) {
          if (requestToken === tagRequestToken) toast("Gagal memuat post: " + (err.message || "koneksi"), "bad");
        } finally {
          if (requestToken === tagRequestToken) { tagLoading = false; rerender(); }
        }
      }

      async function loadMoreTagPosts() {
        await loadTagDetail(activeTagsDetail, false);
        if (activeTag) {
          updateChip();
        }
      }

      function saveTagAsPlaylist(tagTitle) {
        if (!tagPosts.length) { toast("Tidak ada post untuk disimpan", "bad"); return; }
        var plName = "Tag: " + tagTitle;
        var existing = null;
        playlists.forEach(function (p) { if (p.name.toLowerCase() === plName.toLowerCase()) existing = p; });
        if (existing) {
          var added = 0;
          tagPosts.forEach(function (id) { if (!isIn(existing, id)) { existing.postIds.push(id); added++; } });
          persist();
          toast("Ditambahkan " + added + " post ke " + existing.name, "ok");
        } else {
          var newPl = { id: genId(), name: plName, postIds: tagPosts.slice(), last: null };
          playlists.push(newPl);
          persist();
          toast("Playlist '" + plName + "' dibuat (" + tagPosts.length + " post)", "ok");
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
        tagView = "detail"; refreshBadges();
        openSheet("tags", "detail"); loadTagDetail(selectedTags.slice(), true);
      }
      function filterSummary() {
        var a = [];
        if (tagSortMode === "popular") a.push("Terpopuler"); else if (tagSortMode === "oldest") a.push("Terlama");
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

        var src = tagCatFilter !== null ? rawSrc.filter(function (t) { return t.type === tagCatFilter; }) : rawSrc;
        if (!src.length) {
          if (tagSearchTerm) { box.appendChild(el("div", "empty", tagSearching ? "Mencari…" : "Tag tidak ditemukan")); return; }
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
            rule34ApiFetch({ page: "dapi", s: "tag", q: "index", limit: 100, orderby: "count" }).then(function (tags) {
              if (Array.isArray(tags)) {
                popularTagsCache = tags.map(function (t) {
                  var rType = Number(t.type);
                  var dnType = rType === 1 ? 8 : (rType === 4 ? 4 : (rType === 3 ? 2 : 1));
                  return {
                    value: t.name,
                    count: Number(t.count) || 0,
                    type: dnType
                  };
                });
              } else {
                popularTagsCache = [];
              }
              if (!popularTagsCache.length) tagListErr = true;
            }).catch(function () { tagListErr = true; }).then(function () { tagFetching = false; renderTagList(); });
          }
          return;
        }
        box.appendChild(el("div", "tlabel", listTitle + " (" + src.length + " tag)"));
        src.forEach(function (t) {
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
          var kind = t.type === 8 ? ["artist", "Artist"] : t.type === 4 ? ["character", "Karakter"] : t.type === 2 ? ["copyright", "Seri"] : null;
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
          box.appendChild(row);
        });
      }
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

        // 1. Mode Switcher Simetris (50% : 50%)
        var segRow = el("div", "tag-mode-seg");
        var btnWant = el("button", "tag-mode-btn want" + (tagPickMode === "want" ? " on" : ""));
        btnWant.innerHTML = ic("tag") + "<span>Pilih (" + selectedTags.length + ")</span>";
        btnWant.onclick = function () { tagPickMode = "want"; renderTagsView(); };

        var btnBlock = el("button", "tag-mode-btn block" + (tagPickMode === "block" ? " on" : ""));
        btnBlock.innerHTML = ic("ban") + "<span>Sembunyikan (" + blacklistTags.length + ")</span>";
        btnBlock.onclick = function () { tagPickMode = "block"; renderTagsView(); };

        segRow.appendChild(btnWant);
        segRow.appendChild(btnBlock);
        b.appendChild(segRow);

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
        var alphaPad = el("div", "tag-alpha-pad");

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
            fetchAlphaTags(ch);
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
          fetchAlphaTags("0-9");
        };
        alphaPad.appendChild(numBtn);

        b.appendChild(alphaPad);

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
      function renderTagDetailView() {
        var b = sheetBody;
        var titleStr = activeTagsDetail.length ? activeTagsDetail.join(" + ") : "Semua post";
        var head = el("div", "tdhead");
        head.appendChild(el("div", "tdtitle", titleStr));
        var sm = filterSummary();
        head.appendChild(el("div", "tdsub", tagPosts.length + " post" + (sm.length ? " · " + sm.join(" · ") : "")));
        b.appendChild(head);

        var row = el("div", "arow");
        var tagsNow = activeTagsDetail.slice();
        var cp = getTagCheckpoint(tagsNow) || getTagProg(tagsNow);
        if (cp && validId(cp.lastId || cp.id)) {
          var resumePostId = cp.lastId || cp.id;
          var posLabel = (cp.lastIndex !== undefined && cp.lastIndex >= 0) ? " (post #" + (cp.lastIndex + 1) + ")" : "";
          row.appendChild(ipill("play", "Lanjut #" + resumePostId + posLabel, "pri", function () { resumeTag(tagsNow); }));
          row.appendChild(ipill("refresh", "Mulai dari #1", "", function () {
            clearTagCheckpoint(tagsNow);
            clearTagProg(tagsNow);
            startTag(tagsNow, null, false);
            toast("Checkpoint direset, mulai dari awal", "ok");
          }));
        } else {
          row.appendChild(ipill("play", "Putar semua", "pri", function () { startTag(tagsNow, null, false); }));
        }
        row.appendChild(ipill("shuffle", "Acak", "", function () { startTag(tagsNow, null, true); }));
        row.appendChild(ipill("filter", "Filter", "", function () { openFilterHub(); }));
        row.appendChild(ipill("plus", "Ke playlist", "", function () { saveTagAsPlaylist(titleStr); }));
        b.appendChild(row);

        var grid = el("div", "grid");
        b.appendChild(grid);
        if (!tagPosts.length && !tagLoading) grid.appendChild(el("div", "empty", "Tidak ada post yang cocok. Coba ubah Filter atau tag."));
        tagPosts.forEach(function (id) {
          grid.appendChild(thumb(id, function () { startTag(activeTagsDetail, id, false); }));
        });
        if (tagLoading) grid.appendChild(el("div", "empty", "Memuat post…"));
        else if (tagHasMore && tagPosts.length > 0) grid.appendChild(pill("Muat 30 lagi", "more", function () { loadMoreTagPosts(); }));
      }
      function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = lead(txt); return e; }
      function pill(txt, cls, fn) { var b = el("button", "pill " + (cls || ""), txt); b.onclick = fn; return b; }
      function resetSel() { selMode = false; sel = {}; plShown = 120; }
      function syncNavActive() {
        var isOpen = sheet && sheet.classList.contains("open");
        var cur = isOpen ? sheetTab : "stream";
        var bns = { stream: $("bnStream"), tags: $("tagBtn"), playlist: $("bnPlaylist"), settings: $("bnSettings") };
        for (var k in bns) { if (bns[k]) bns[k].classList.toggle("active", k === cur); }
        var sidebarItems = document.querySelectorAll(".app-sidebar .nav-item");
        if (sidebarItems.length >= 6) {
          sidebarItems[0].classList.toggle("active", cur === "stream");
          sidebarItems[1].classList.toggle("active", cur === "tags");
          sidebarItems[2].classList.toggle("active", cur === "playlist");
          sidebarItems[4].classList.toggle("active", cur === "history");
          sidebarItems[5].classList.toggle("active", cur === "settings");
        }
      }
      function openSheet(tab, mode) {
        if (tab) sheetTab = tab;
        if (tab === "playlist") { plView = "list"; plDetailId = null; resetSel(); }
        if (tab === "tags") { tagView = mode === "detail" ? "detail" : "list"; tagPickMode = mode === "block" ? "block" : "want"; }
        renderSheet(); sheet.classList.add("open"); sheetBackdrop.classList.add("open");
        syncNavActive();
      }
      function closeSheet() { sheet.classList.remove("open"); sheetBackdrop.classList.remove("open"); resetSel(); syncNavActive(); }
      function sheetBack() {
        if (sheetTab === "playlist" && plView === "detail") { plView = "list"; plDetailId = null; resetSel(); renderSheet(); }
        else if (sheetTab === "tags" && tagView === "detail") { tagView = "list"; renderSheet(); }
      }
      Array.prototype.forEach.call(document.querySelectorAll("[data-tab]"), function (b) {
        b.addEventListener("click", function () {
          sheetTab = b.getAttribute("data-tab");
          if (sheetTab === "playlist") { plView = "list"; plDetailId = null; }
          if (sheetTab === "tags") { tagView = "list"; tagPickMode = "want"; }
          resetSel(); renderSheet();
        });
      });
      function rerender() { var st = sheetBody.scrollTop; renderSheet(); sheetBody.scrollTop = st; }
      function renderSheet() {
        var labelMap = { tags: "Tag", playlist: "Koleksi", history: "Riwayat", settings: "Setelan" };
        sheet.setAttribute("aria-label", "Panel " + (labelMap[sheetTab] || ""));
        Array.prototype.forEach.call(document.querySelectorAll("[data-tab]"), function (b) { b.classList.toggle("on", b.getAttribute("data-tab") === sheetTab); });
        sheetBackBtn.disabled = !((sheetTab === "playlist" && plView === "detail") || (sheetTab === "tags" && tagView === "detail"));
        sheetBody.innerHTML = "";
        if (sheetTab === "tags") renderTagsView();
        else if (sheetTab === "playlist") plView === "list" ? renderPlList() : renderPlDetail();
        else if (sheetTab === "history") renderHistory();
        else renderSettings();
      }
      function thumb(id, onclick) {
        var d = el("div", "thumb");
        var im = new Image(); im.loading = "lazy"; im.decoding = "async"; im.alt = "";
        var meta = postMetaCache.get(id);
        if (meta && meta.preview_url) {
          im.src = meta.preview_url;
        } else {
          get(id).then(function (r) {
            if (r && r.meta && r.meta.preview_url && !im.src) {
              im.src = r.meta.preview_url;
            }
          });
        }
        im.onerror = function () { if (im.parentNode) im.parentNode.removeChild(im); d.classList.add("nothumb"); };
        d.appendChild(im); d.appendChild(el("span", "tid", "#" + id));
        var isVid = meta && (meta.type === 1 || (meta.file_url && meta.file_url.match(/\.(mp4|webm|mov)(\?|$)/i)));
        if (isVid) {
          var vb = el("span", "vid-badge", meta.duration ? meta.duration + "s" : "VIDEO");
          d.appendChild(vb);
        }
        if (id === current) d.classList.add("act");
        d.onclick = onclick; return d;
      }
      function renderPlList() {
        var row = el("div", "arow");
        row.appendChild(ipill("plus", "Baru", "pri", newPlaylist));
        row.appendChild(ipill("upload", "Ekspor", "", exportPlaylists));
        row.appendChild(ipill("download", "Impor", "", function () { $("importFile").click(); }));
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
          var menu = el("button", "menu", "⋯");
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
              var x = el("button", "x", "×");
              x.onclick = function (e) { e.stopPropagation(); removeFrom(p.id, id); rerender(); refreshBtns(); updateChip(); toast("Dihapus dari " + p.name, "bad"); };
              t.appendChild(x);
            }
            grid.appendChild(t);
          })(ids[i]);
        }
        if (ids.length > upto) {
          var more = pill("Tampilkan lagi (" + (ids.length - upto) + ")", "more", function () { plShown += 120; rerender(); });
          grid.appendChild(more);
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
          p.postIds = p.postIds.filter(function (id) { return sel[id] !== 1; });
          persist(); resetSel(); renderSheet(); refreshBtns(); updateChip();
          toast("Dihapus " + s.length + " post", "bad");
          if (activePlaylistId === p.id && !p.postIds.length) exitPlaylist();
        });
      }
      function renderHistory() {
        var row = el("div", "arow");
        row.appendChild(ipill("trash", "Kosongkan riwayat", "dng", function () { hist = []; jset("pe_hist", hist); renderSheet(); }));
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
        b.appendChild(setRow("Auto-Next Video", "Otomatis lanjut post berikutnya saat video selesai", seg(onoff, !!S.autoNextVid, function (v) { S.autoNextVid = v; saveS(); var vid = zoomLayer.querySelector("video"); if (vid) vid.loop = !(autoEnabled || S.autoNextVid); })));
        b.appendChild(setRow("Interval Auto", "Jeda antar post", seg([[2, "2s"], [3, "3s"], [5, "5s"], [8, "8s"], [12, "12s"], [20, "20s"]], S.interval, function (v) { S.interval = v; saveS(); if (autoEnabled && !isVideo()) resetAutoTimer(); })));
        b.appendChild(setRow("Lewati post kosong", "Loncat otomatis ID yang tidak ada", seg(onoff, S.skipMissing, function (v) { S.skipMissing = v; saveS(); })));
        b.appendChild(setRow("Hemat data", "Pakai gambar kecil dulu", seg(onoff, S.saver, function (v) { S.saver = v; saveS(); invalidateCache(); })));
        b.appendChild(setRow("Pertahankan zoom", "Level zoom tetap saat pindah post", seg(onoff, S.keepZoom, function (v) { S.keepZoom = v; saveS(); })));
        b.appendChild(setRow("Tampilan", "Muat utuh / penuhi layar", seg([["contain", "Muat"], ["cover", "Penuh"]], S.fit, function (v) { S.fit = v; saveS(); applyFit(); })));
        b.appendChild(setRow("Suara video", "Default saat video dibuka", seg([[true, "Mati"], [false, "Hidup"]], S.muted, function (v) { S.muted = v; saveS(); var vd = zoomLayer.querySelector("video"); if (vd) vd.muted = v; })));
        b.appendChild(setRow("Kecepatan video", "Playback rate", seg([[0.5, "0.5×"], [1, "1×"], [1.5, "1.5×"], [2, "2×"]], S.speed, function (v) { S.speed = v; saveS(); var vd = zoomLayer.querySelector("video"); if (vd) { vd.defaultPlaybackRate = v; vd.playbackRate = v; } })));
        var row = el("div", "arow"); row.style.marginTop = "12px";
        row.appendChild(ipill("link", "Salin URL", "", copyURL));
        row.appendChild(ipill("share", "Bagikan", "", shareURL));
        b.appendChild(row);

        var allTagBox = el("div", "storage-card");
        allTagBox.appendChild(el("div", "storage-title", "Direktori & Semua Tag"));
        var atStats = el("div", "storage-stats");
        atStats.innerHTML = "<div>Jelajahi seluruh koleksi tag Rule34 berdasarkan abjad (A–Z) dan kategori (Artist, Karakter, Seri).</div>";
        allTagBox.appendChild(atStats);
        var atActs = el("div", "arow");
        atActs.style.marginTop = "6px";
        atActs.appendChild(ipill("tag", "Buka Semua Tag", "pri", function () {
          tagView = "list";
          tagCatFilter = null;
          tagAlphaActive = null;
          openSheet("tags");
        }));
        allTagBox.appendChild(atActs);
        b.appendChild(allTagBox);

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
        sActs.appendChild(ipill("trash", "Kosongkan Riwayat", "", function () {
          hist = [];
          jset("pe_hist", hist);
          toast("Riwayat dikosongkan", "ok");
          renderSettings();
        }));
        sActs.appendChild(ipill("tag", "Hapus Cache Tag", "", function () {
          alphaTagCache = {};
          lsSet("darknight_alpha_cache", "{}");
          toast("Cache tag dibersihkan", "ok");
          renderSettings();
        }));
        sBox.appendChild(sActs);
        b.appendChild(sBox);

        var gRow = el("div", "arow"); gRow.style.marginTop = "8px";
        gRow.appendChild(ipill("book", "Buka Panduan", "pri", openGuide));
        b.appendChild(gRow);
        var tip = el("div", "", "Gestur: swipe ↑ = post berikutnya · swipe ↓ = post sebelumnya · swipe → = simpan ke playlist · swipe ← = hapus dari playlist · pinch = zoom gambar · double-tap = favorit (animasi heart). Keyboard: ←↑ = sebelumnya · →↓ = berikutnya · Spasi = play/pause · A=auto · F=favorit · R=acak · P=playlist · B=kembali · Esc=tutup. Filter AI & sembunyikan tag ada di menu Filter.");
        tip.style.cssText = "font-size:11px;color:var(--text-faint);line-height:1.6;margin-top:10px";
        b.appendChild(tip);
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
          playlists = playlists.filter(function (x) { return x.id !== id; }); persist();
          if (activePlaylistId === id) exitPlaylist();
          plView = "list"; plDetailId = null; resetSel(); renderSheet(); refreshBtns(); toast("Playlist dihapus", "bad");
        });
      }
      function exportPlaylists() {
        saveBlob(new Blob([JSON.stringify({ v: 1, playlists: playlists }, null, 2)], { type: "application/json" }), "post-explorer-playlists.json");
        toast("Playlist diekspor", "ok");
      }
      $("importFile").addEventListener("change", function (e) {
        var f = e.target.files && e.target.files[0]; if (!f) return;
        var fr = new FileReader();
        fr.onload = function () {
          try {
            var d = JSON.parse(fr.result), arr = Array.isArray(d) ? d : d.playlists;
            if (!Array.isArray(arr)) throw 0;
            var added = 0;
            arr.forEach(function (p) {
              if (!p || typeof p.name !== "string" || !Array.isArray(p.postIds)) return;
              var cleanName = p.name.trim().slice(0, 40); if (!cleanName) return;
              var ids = uniq(p.postIds.map(function (v) { return typeof v === "string" && /^\d+$/.test(v) ? Number(v) : v; }).filter(validId)), ex = null;
              playlists.forEach(function (x) { if (String(x.name).toLowerCase() === cleanName.toLowerCase()) ex = x; });
              if (ex) { ids.forEach(function (i) { if (!isIn(ex, i)) { ex.postIds.push(i); added++; } }); }
              else { playlists.push({ id: genId(), name: cleanName, postIds: ids, last: null }); added += ids.length; }
            });
            persist(); renderSheet(); refreshBtns(); toast("Impor selesai: " + added + " post", "ok");
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
            get(id).then(function (r) {
              if (!r || r.miss || !r.url) throw 0;
              var ext = r.type === "mp4" ? "mp4" : "jpg";
              return fetchMedia(r.url).then(function (res) {
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
      var sbInpEl = $("numberInputSidebar");
      if (sbInpEl) {
        sbInpEl.addEventListener("keydown", function (e) {
          if (e.key === "Enter") { sbInpEl.blur(); goToSidebarInput(); }
        });
      }
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
        var gb = $("guideBackdrop");
        if (gb) gb.classList.add("open");
      }
      function closeGuide(e) {
        var gb = $("guideBackdrop");
        if (!e || e.target === gb) {
          if (gb) gb.classList.remove("open");
        }
      }

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
        if (sheet.classList.contains("open") && sheetTab === "tags" && tagView === "detail") {
          closeSheet();
          return;
        }
        // Buka grid post yang sedang aktif (tag / playlist / feed)
        if (activeTagsDetail && activeTagsDetail.length) {
          tagView = "detail";
          openSheet("tags");
          return;
        }
        if (activePlaylistId) {
          plView = "detail";
          openSheet("playlist");
          return;
        }
        // Jika sedang browsing biasa, buka feed post terbaru di grid
        tagView = "detail";
        openSheet("tags");
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
        renderFilterHub();
        filterHubBackdrop.classList.add("open");
      }

      function closeFilterHub(e) {
        if (!filterHubBackdrop) return;
        if (!e || e.target === filterHubBackdrop) {
          filterHubBackdrop.classList.remove("open");
        }
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
      function pickTags() { closeFilterHub(); openSheet("tags"); }
      function pickBlockTags() { closeFilterHub(); openSheet("tags", "block"); }

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
        closeFilterHub();
        var inDetail = sheet.classList.contains("open") && sheetTab === "tags" && tagView === "detail";
        var typed = (tagTypeFilter !== null && tagTypeFilter !== undefined);
        var needSearch = selectedTags.length > 0 || tagSortMode === "popular" || tagSortMode === "newest" || typed || blacklistTags.length > 0 || !!S.filterAi;
        if (needSearch) {
          var sortLabel = tagSortMode === "hot" ? "Hot" : (tagSortMode === "popular" || tagSortMode === "top" ? "Top Rated" : (tagSortMode === "views" ? "Most Viewed" : "Terbaru"));
          var tagLabelStr = selectedTags.length ? selectedTags.join(", ") : "Semua";
          toast("Memuat: " + tagLabelStr + " (" + sortLabel + ")…");
          await loadTagDetail(selectedTags.slice(), true);
          if (inDetail) return;
          if (tagPosts.length) {
            startTag(selectedTags.slice(), null, false);
            toast("Memutar post " + (tagSortMode === "popular" ? "terpopuler" : "terbaru") + (selectedTags.length ? ": " + selectedTags.join(", ") : ""));
          } else {
            toast("Tidak ada post yang cocok", "bad");
          }
          return;
        }
        exitPlaylist();
        if (tagSortMode === "oldest") {
          loadPost(1, 0); toast("Mulai dari post terlama (#1)", "ok");
        } else {
          toast("Mencari post paling baru…");
          var latestId = await fetchLatestPostId();
          loadPost(latestId, 0); toast("Lompat ke post terbaru (#" + latestId + ")", "ok");
        }
      }

      function overlayOpen() { return (filterHubBackdrop && filterHubBackdrop.classList.contains("open")) || sheet.classList.contains("open") || popupBackdrop.classList.contains("open") || dlgBackdrop.classList.contains("open") || infoBackdrop.classList.contains("open") || ($("guideBackdrop") && $("guideBackdrop").classList.contains("open")); }

      document.addEventListener("keydown", function (e) {
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
          persist();
          saveSession();
        }
      });
      window.addEventListener("pagehide", function () { persist(); saveSession(); });

      paintIcons();
      refreshBtns(); updateChip(); updateBack();
      
  // --- Restore session state on init ---
      (function restoreSession() {
        try {
          var sess = jget('pe_session', null);
          if (!sess) return;
          if (validId(sess.current)) current = sess.current;
          if (sess.tagSortMode !== undefined) tagSortMode = sess.tagSortMode;
          if (sess.tagTypeFilter !== undefined) tagTypeFilter = sess.tagTypeFilter;
          if (Array.isArray(sess.selectedTags) && sess.selectedTags.length) selectedTags = sess.selectedTags;
          if (sess.shuffleOn !== undefined) shuffleOn = sess.shuffleOn;
          if (sess.tagView !== undefined) tagView = sess.tagView;
          if (sess.tagCursor !== undefined) tagCursor = sess.tagCursor;
          if (sess.tagHasMore !== undefined) tagHasMore = sess.tagHasMore;
          if (Array.isArray(sess.playOrder) && sess.playOrder.length) playOrder = sess.playOrder;
          if (sess.activePlaylistId) {
            var pls = getPL ? getPL(sess.activePlaylistId) : null;
            if (pls) activePlaylistId = sess.activePlaylistId;
          }
          if (sess.activeTag && Array.isArray(sess.activeTagsDetail) && sess.activeTagsDetail.length) {
            activeTag = sess.activeTag;
            activeTagsDetail = sess.activeTagsDetail;
            if (Array.isArray(sess.tagPosts) && sess.tagPosts.length) {
              tagPosts = sess.tagPosts;
              returnId = null;
            } else {
              loadTagDetail(activeTagsDetail, false);
            }
          }
        } catch(e) { console.warn('restoreSession error', e); }
      })();

      updateChip();
      refreshBtns();
      updateBack();
      syncNavActive();

      loadPost(current, 0);
      fetchLatestPostId().then(function (id) {
        var numInp = $("numberInput");
        if (numInp) numInp.placeholder = "Nomor Post (#" + id + ")…"; var sbInp = $("numberInputSidebar"); if (sbInp) sbInp.placeholder = "#" + id + "…";
      }).catch(function () { });

      try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { }
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

      function goToSidebarInput() { var v = Number($("numberInputSidebar").value); if (validId(v)) loadPost(v, 0); else toast("ID tidak valid", "bad"); }
      return {
        goToSidebarInput: goToSidebarInput,
        prev: function () { change(-1); }, next: function () { change(1); }, back: back,
        randomPost: randomPost, toggleAuto: toggleAuto, toggleFav: toggleFav,
        togglePopup: togglePopup, closePopup: closePopup, showNewRow: showNewRow, confirmNewPl: confirmNewPl,
        openSheet: openSheet, closeSheet: closeSheet, sheetBack: sheetBack,
        download: download, toggleFs: toggleFs, toggleFit: toggleFit, openTag: openTag, openInfo: openInfo, closeInfo: closeInfo, toggleTagWant: toggleTagWant, toggleTagBlock: toggleTagBlock,
        getSelectedTags: function () { return selectedTags; }, getBlacklistTags: function () { return blacklistTags; },
        dlgYes: dlgYes, dlgNo: dlgNo, leavePlaylist: leavePlaylist, goToInput: goToInput, openGuide: openGuide, closeGuide: closeGuide,
        toggleFilterHub: toggleFilterHub, closeFilterHub: closeFilterHub, setHubSort: setHubSort, applyFilterHub: applyFilterHub, setHubType: setHubType, pickTags: pickTags, pickBlockTags: pickBlockTags, resetFilter: resetFilter, toggleHubAi: toggleHubAi,
        addHubTag: addHubTag, addHubBlockTag: addHubBlockTag,
        toggleSound: toggleSound, toggleGrid: toggleGrid
      };
    })();
