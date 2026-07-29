// Runtime behaviour for the ported Premium homepage.
// The motion code is ported verbatim from the export's dc-script
// (Spotts Website.dc.html); the hover + mobile-menu logic replicates
// what the dc runtime did for `style-hover` and the {{ menu }} bindings.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Cleanup = () => void;

function setupHover(root: HTMLElement, cleanups: Cleanup[]) {
  root.querySelectorAll<HTMLElement>("[style-hover]").forEach((el) => {
    const decls = (el.getAttribute("style-hover") || "")
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => {
        const i = d.indexOf(":");
        return [d.slice(0, i).trim(), d.slice(i + 1).trim()] as const;
      });
    if (!decls.length) return;
    const saved = new Map<string, string>();
    const onEnter = () => {
      decls.forEach(([prop, value]) => {
        saved.set(prop, el.style.getPropertyValue(prop));
        el.style.setProperty(prop, value);
      });
    };
    const onLeave = () => {
      decls.forEach(([prop]) => {
        const prev = saved.get(prop) || "";
        if (prev) el.style.setProperty(prop, prev);
        else el.style.removeProperty(prop);
      });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    });
  });
}

function setupFocus(root: HTMLElement, cleanups: Cleanup[]) {
  root.querySelectorAll<HTMLElement>("[style-focus]").forEach((el) => {
    const decls = (el.getAttribute("style-focus") || "")
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => {
        const i = d.indexOf(":");
        return [d.slice(0, i).trim(), d.slice(i + 1).trim()] as const;
      });
    if (!decls.length) return;
    const saved = new Map<string, string>();
    const onFocus = () => {
      decls.forEach(([prop, value]) => {
        saved.set(prop, el.style.getPropertyValue(prop));
        el.style.setProperty(prop, value);
      });
    };
    const onBlur = () => {
      decls.forEach(([prop]) => {
        const prev = saved.get(prop) || "";
        if (prev) el.style.setProperty(prop, prev);
        else el.style.removeProperty(prop);
      });
    };
    el.addEventListener("focus", onFocus);
    el.addEventListener("blur", onBlur);
    cleanups.push(() => {
      el.removeEventListener("focus", onFocus);
      el.removeEventListener("blur", onBlur);
    });
  });
}

function setupMenu(root: HTMLElement, cleanups: Cleanup[]) {
  const nav = root.querySelector<HTMLElement>('[data-mm="nav"]');
  const cta = root.querySelector<HTMLElement>('[data-mm="cta"]'); // optional — not every page has a separate CTA button
  const burger = root.querySelector<HTMLElement>('[data-mm="burger"]');
  const panel = root.querySelector<HTMLElement>('[data-mm="panel"]');
  if (!nav || !burger || !panel) return;

  let menuOpen = false;
  const sync = () => {
    const mob = window.innerWidth <= 940;
    if (!mob) menuOpen = false;
    nav.style.display = mob ? "none" : "flex";
    if (cta) cta.style.display = mob ? "none" : "flex";
    burger.style.display = mob ? "inline-flex" : "none";
    panel.style.display = mob && menuOpen ? "block" : "none";
    burger.textContent = menuOpen ? "✕" : "☰";
  };
  const toggle = () => {
    menuOpen = !menuOpen;
    sync();
  };
  const close = () => {
    menuOpen = false;
    sync();
  };

  sync();
  window.addEventListener("resize", sync);
  burger.addEventListener("click", toggle);
  const closers = Array.from(root.querySelectorAll<HTMLElement>("[data-mm-close]"));
  closers.forEach((el) => el.addEventListener("click", close));
  cleanups.push(() => {
    window.removeEventListener("resize", sync);
    burger.removeEventListener("click", toggle);
    closers.forEach((el) => el.removeEventListener("click", close));
  });
}

// --- Ported verbatim from the export's initMotion() ---
function initMotion(cleanups: Cleanup[]) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  // --- Split headline reveals ---
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    const words = (el.textContent || "").split(" ");
    el.textContent = "";
    words.forEach((w, i) => {
      const outer = document.createElement("span");
      outer.style.cssText =
        "display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.12em;margin-bottom:-0.12em;";
      const inner = document.createElement("span");
      inner.style.cssText = "display:inline-block;transform:translateY(110%);will-change:transform;";
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
    gsap.to(el.querySelectorAll("span > span"), {
      y: 0, duration: 0.7, ease: "power3.out", stagger: 0.05,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // --- Generic reveals ---
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    gsap.fromTo(el, { y: 24, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.65, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  // --- Hero chat sequence ---
  const heroMsgs = gsap.utils.toArray<HTMLElement>("[data-hmsg]");
  if (heroMsgs.length) {
    gsap.set(heroMsgs, { opacity: 0, y: 14, scale: 0.96 });
    const tl = gsap.timeline({ delay: 0.5 });
    heroMsgs.forEach((m, i) => {
      const isTyping = m.hasAttribute("data-htyping");
      tl.to(m, { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: "back.out(1.6)" }, i === 0 ? 0 : "+=" + (isTyping ? 0.25 : 0.55));
      if (isTyping) tl.to(m, { opacity: 0, height: 0, marginTop: -9, paddingTop: 0, paddingBottom: 0, duration: 0.25 }, "+=0.9");
    });
  }

  // --- Customer bot: sticky phone, step-synced messages ---
  const botMsgs = gsap.utils.toArray<HTMLElement>("[data-bot-msg]");
  gsap.set(botMsgs, { opacity: 0, y: 16, scale: 0.96 });
  [0, 1, 2].forEach((step) => {
    const stepEl = document.querySelector('[data-bot-step="' + step + '"]');
    const msgs = botMsgs.filter((m) => m.getAttribute("data-bot-msg") === String(step));
    if (!stepEl || !msgs.length) return;
    gsap.to(msgs, {
      opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)", stagger: 0.45,
      scrollTrigger: { trigger: stepEl, start: "top 65%", once: true },
    });
    gsap.fromTo(stepEl, { opacity: 0.25 }, {
      opacity: 1, duration: 0.4,
      scrollTrigger: { trigger: stepEl, start: "top 70%", end: "bottom 40%", toggleActions: "play reverse play reverse" },
    });
  });

  // --- Counters ---
  document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
    const target = parseFloat(el.getAttribute("data-count-to") || "0");
    const comma = el.hasAttribute("data-count-comma");
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.4, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        const n = Math.round(obj.v);
        el.textContent = comma ? n.toLocaleString("en-US") : String(n);
      },
    });
  });

  // --- Bars / fills ---
  document.querySelectorAll("[data-bar]").forEach((el, i) => {
    gsap.to(el, { scaleY: 1, duration: 0.8, ease: "power3.out", delay: i * 0.08,
      scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });
  document.querySelectorAll("[data-grow-bar]").forEach((el) => {
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true } });
  });
  document.querySelectorAll("[data-refund-fill]").forEach((el, i) => {
    gsap.to(el, { scaleX: 1, duration: 0.7, ease: "power2.inOut", delay: 0.3 + i * 0.5,
      scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });

  // --- Journey line + steps ---
  const jLine = document.querySelector("[data-journey-line]");
  if (jLine) {
    gsap.to(jLine, { scaleX: 1, duration: 1.6, ease: "power2.inOut",
      scrollTrigger: { trigger: jLine, start: "top 80%", once: true } });
  }
  gsap.utils.toArray<HTMLElement>("[data-journey-step]").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: i * 0.18,
      scrollTrigger: { trigger: el.parentElement, start: "top 82%", once: true } });
  });

  // --- Calendar blocks ---
  gsap.utils.toArray<HTMLElement>("[data-cal-block]").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)", delay: i * 0.09,
      scrollTrigger: { trigger: el.closest("[data-reveal]") || el, start: "top 80%", once: true } });
  });

  // --- Venue team chat ---
  const vMsgs = gsap.utils.toArray<HTMLElement>("[data-vmsg]");
  if (vMsgs.length) {
    gsap.set(vMsgs, { opacity: 0, y: 16 });
    gsap.to(vMsgs, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.35,
      scrollTrigger: { trigger: vMsgs[0], start: "top 82%", once: true } });
  }

  // --- Recurring pulse ---
  const recur = document.querySelector("[data-recur-dot]");
  if (recur) {
    gsap.fromTo(recur, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)",
      scrollTrigger: { trigger: recur, start: "top 88%", once: true } });
  }

  // --- Magnetic buttons (desktop pointers only) ---
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const strength = 8;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: "power2.out" });
      };
      const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, .5)" });
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });
  }

  // --- Hero phone parallax ---
  const phone = document.querySelector("[data-hero-phone]");
  if (phone) {
    gsap.to(phone, { y: -34, ease: "none",
      scrollTrigger: { trigger: phone, start: "top 80%", end: "bottom top", scrub: 0.6 } });
  }
}

// Generic setup for any ported premium page: hover states (style-hover),
// the mobile nav menu (if present on the page), and the export's GSAP
// scroll motion (if the page has any data-reveal/data-split/etc elements).
export function setupPremiumPage(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  setupHover(root, cleanups);
  setupFocus(root, cleanups);
  setupMenu(root, cleanups);
  const raf = requestAnimationFrame(() => initMotion(cleanups));
  return () => {
    cancelAnimationFrame(raf);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    cleanups.forEach((fn) => fn());
  };
}
