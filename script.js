const root = document.documentElement;
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

const MOBILE_QUERY = "(max-width: 1100px)";

/* =====================================================
   NAVIGASI: menu mobile
===================================================== */
function closeMenu() {
  if (nav && toggle) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka menu");
    toggle.textContent = "☰";
  }
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  // Setiap tautan di menu menutup menu (termasuk tautan submenu pada halaman yang sama).
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const menuWasOpen = nav && nav.classList.contains("open");
  closeMenu();
  if (menuWasOpen && toggle) toggle.focus();
});

// Tutup saat mengetuk di luar menu / dropdown.
document.addEventListener("click", (event) => {
  if (nav && nav.classList.contains("open") && !event.target.closest(".site-header")) closeMenu();
});

// Reset status menu saat kembali ke tampilan desktop.
window.addEventListener("resize", () => {
  if (!window.matchMedia(MOBILE_QUERY).matches) closeMenu();
});

/* =====================================================
   PORTOFOLIO: filter galeri + lightbox
===================================================== */
(function () {
  const tiles = Array.from(document.querySelectorAll("[data-lightbox]"));
  if (!tiles.length) return;

  document.querySelectorAll(".pf-filter [data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      document.querySelectorAll(".pf-filter button").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      tiles.forEach((t) => { t.hidden = !(f === "all" || t.dataset.cat === f); });
    });
  });

  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Foto proyek");
  box.innerHTML = '<button type="button" class="lb-close" aria-label="Tutup">×</button><button type="button" class="lb-prev" aria-label="Foto sebelumnya">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-next" aria-label="Foto berikutnya">›</button>';
  document.body.appendChild(box);
  const img = box.querySelector("img");
  const cap = box.querySelector("figcaption");
  let list = [], idx = 0, lastFocus = null;

  function show(i) {
    idx = (i + list.length) % list.length;
    const t = list[idx];
    img.src = t.getAttribute("href");
    img.alt = t.querySelector("img") ? t.querySelector("img").alt : "";
    cap.textContent = (t.dataset.title || "") + "  (" + (idx + 1) + " / " + list.length + ")";
  }
  function open(t) {
    list = tiles.filter((x) => !x.hidden);
    lastFocus = t;
    show(list.indexOf(t));
    box.classList.add("open");
    document.body.style.overflow = "hidden";
    box.querySelector(".lb-close").focus();
  }
  function close() {
    box.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  tiles.forEach((t) => t.addEventListener("click", (e) => { e.preventDefault(); open(t); }));
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
  box.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
})();

/* 5 Hal Penting: tab + foto berganti */
(function () {
  document.querySelectorAll("[data-pick-tabs]").forEach((wrap) => {
    const tabs = Array.from(wrap.querySelectorAll('[role="tab"]'));
    const preload = () => wrap.querySelectorAll(".pick-panel img").forEach((img) => { img.loading = "eager"; });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { preload(); io.disconnect(); }
      }, { rootMargin: "300px 0px" });
      io.observe(wrap);
    } else { preload(); }
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        let n = null;
        if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") n = 0;
        if (e.key === "End") n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); select(tabs[n], true); }
      });
    });
  });
})();

/* Halaman Produk: filter seri */
(function () {
  const bar = document.querySelector(".series-filter");
  if (!bar) return;
  const cards = Array.from(document.querySelectorAll(".pgrid > .pcard[data-series]"));
  bar.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const want = btn.dataset.seriesFilter.split(" ");
      bar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
      cards.forEach((c) => { c.hidden = !(want[0] === "all" || want.includes(c.dataset.series)); });
    });
  });
})();

/* Halaman Artikel: cari + kategori */
(function () {
  const input = document.getElementById("cari-artikel");
  const cat = document.getElementById("kategori-artikel");
  if (!input || !cat) return;
  const items = Array.from(document.querySelectorAll(".al-item"));
  const empty = document.querySelector(".al-empty");
  const run = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    items.forEach((it) => {
      const ok = (!cat.value || it.dataset.cat === cat.value) && (!q || it.textContent.toLowerCase().includes(q));
      it.hidden = !ok; if (ok) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  };
  input.addEventListener("input", run);
  cat.addEventListener("change", run);
})();

/* =====================================================
   ANIMASI: elemen muncul saat digulir
===================================================== */
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const groups = [
    ".center-head", ".section-heading", ".pv-intro", ".pv-item",
    ".pcard", ".room-tile", ".pick-tabs", ".trail-step", ".section-more",
    ".faq-intro", ".faq-item", ".cta-photo .container > *",
    ".pf-card", ".pf-jump", ".pf-part .prose", ".pf-gallery > a",
    ".al-item", ".al-box", ".article-cover", ".prose > h3", ".company-card",
    ".pd-card", ".model-chips", ".series-filter", ".contact-card", ".contact-actions", ".map-frame"
  ];
  const els = [];
  groups.forEach((sel) => document.querySelectorAll(sel).forEach((el) => {
    if (el.hasAttribute("data-reveal") || el.closest("[data-reveal]")) return;
    el.setAttribute("data-reveal", el.matches(".room-tile, .pf-gallery > a, .map-frame, .article-cover") ? "zoom" : "");
    const sibs = Array.from(el.parentElement.children).filter((c) => c.matches(sel));
    const i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty("--d", (Math.min(i, 5) * 0.08) + "s");
    els.push(el);
  }));
  document.documentElement.classList.add("anim-ready");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("is-in");
      io.unobserve(el);
      /* lepas pengaturan animasi setelah selesai, agar efek sorot bawaan kembali normal */
      const delay = parseFloat(el.style.getPropertyValue("--d")) || 0;
      setTimeout(() => { el.removeAttribute("data-reveal"); el.classList.remove("is-in"); el.style.removeProperty("--d"); }, 800 + delay * 1000);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  els.forEach((el) => io.observe(el));
  /* kartu yang disembunyikan filter lalu ditampilkan lagi: langsung terlihat */
  document.addEventListener("click", (ev) => {
    if (!ev.target.closest(".series-filter, .pick-tablist")) return;
    setTimeout(() => document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("is-in");
    }), 30);
  });
})();
