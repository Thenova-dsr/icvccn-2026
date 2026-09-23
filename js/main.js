/* ICVCCN 2026 — site interactions */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("primary-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.innerHTML = open ? "&#10005;" : "&#9776;";
      });
    }
    // On touch/small screens the first tap opens a dropdown instead of navigating.
    document.querySelectorAll(".nav .has-sub > a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth > 860) return;
        var li = link.parentElement;
        if (!li.classList.contains("sub-open")) {
          e.preventDefault();
          document.querySelectorAll(".nav li.sub-open").forEach(function (o) {
            if (o !== li) o.classList.remove("sub-open");
          });
          li.classList.add("sub-open");
        }
      });
    });
  }

  /* ---------- Hero carousel ---------- */
  function initHero() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var slides = hero.querySelectorAll(".slide");
    var dotWrap = hero.querySelector(".dots");
    if (slides.length < 2) return;
    var i = 0, timer = null;

    slides.forEach(function (_, n) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Go to slide " + (n + 1));
      if (n === 0) b.className = "on";
      b.addEventListener("click", function () { go(n); restart(); });
      dotWrap.appendChild(b);
    });
    var dots = dotWrap.querySelectorAll("button");

    function go(n) {
      slides[i].classList.remove("on");
      dots[i].classList.remove("on");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("on");
      dots[i].classList.add("on");
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 5500); }
    restart();
    hero.addEventListener("mouseenter", function () { clearInterval(timer); });
    hero.addEventListener("mouseleave", restart);
  }

  /* ---------- Countdown ---------- */
  function initCountdown() {
    var box = document.getElementById("countdown");
    if (!box) return;
    var target = new Date(box.dataset.date).getTime();
    if (isNaN(target)) return;
    var out = {
      d: box.querySelector('[data-cd="d"]'),
      h: box.querySelector('[data-cd="h"]'),
      m: box.querySelector('[data-cd="m"]'),
      s: box.querySelector('[data-cd="s"]')
    };
    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    function tick() {
      var gap = target - Date.now();
      if (gap <= 0) {
        out.d.textContent = out.h.textContent = out.m.textContent = out.s.textContent = "00";
        clearInterval(t);
        return;
      }
      var s = Math.floor(gap / 1000);
      out.d.textContent = pad(Math.floor(s / 86400));
      out.h.textContent = pad(Math.floor(s / 3600) % 24);
      out.m.textContent = pad(Math.floor(s / 60) % 60);
      out.s.textContent = pad(s % 60);
    }
    tick();
    var t = setInterval(tick, 1000);
  }

  /* ---------- Accordions ---------- */
  function initAccordions() {
    document.querySelectorAll(".acc-h").forEach(function (h) {
      h.addEventListener("click", function () {
        var acc = h.parentElement;
        var open = acc.classList.toggle("open");
        h.setAttribute("aria-expanded", open ? "true" : "false");
        var pm = h.querySelector(".pm");
        if (pm) pm.textContent = open ? "−" : "+";
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".rv");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Back to top ---------- */
  function initToTop() {
    var btn = document.getElementById("toTop");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("on", window.scrollY > 420);
    });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Mark the current page in the nav ---------- */
  function initActive() {
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      if (href === here) {
        var li = a.closest("li");
        li.classList.add("active");
        var parent = li.parentElement.closest("li");
        if (parent) parent.classList.add("active");
      }
    });
  }

  /* ---------- Contact form (front-end only) ---------- */
  function initForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("formNote");
      note.hidden = false;
      note.textContent =
        "Thank you, " + (form.name.value || "there") +
        ". This demo form is not yet wired to a server — please email icvccn@amcgroup.edu.in directly.";
      form.reset();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav(); initHero(); initCountdown(); initAccordions();
    initReveal(); initToTop(); initActive(); initForm();
  });
})();
