document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  /* ---------------- SMOOTH SCROLL (LENIS) ---------------- */
  let lenis;
  if (typeof Lenis !== 'undefined' && !reduceMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  } else {
    if (window.gsap) gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------------- HEADER ---------------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------- MOBILE NAV ---------------- */
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavClose = document.querySelector(".mobile-nav-close");

  const closeMobileNav = () => {
    if (!mobileNav) return;
    mobileNav.classList.remove("is-open");
    if (hamburger) {
      hamburger.classList.remove("is-open");
      hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
    document.body.style.overflow = "";
  };

  const toggleMobileNav = () => {
    if (!mobileNav) return;
    const open = mobileNav.classList.toggle("is-open");
    if (hamburger) {
      hamburger.classList.toggle("is-open", open);
      hamburger.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    }
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (hamburger) hamburger.addEventListener("click", toggleMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener("click", closeMobileNav);

  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobileNav));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav && mobileNav.classList.contains("is-open")) {
      closeMobileNav();
    }
  });

  /* ---------------- BRAND SLIDER (Official Partners Swiper) ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".brand-slider6")) {
    new Swiper(".brand-slider6", {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      breakpoints: {
        480: { slidesPerView: 3, spaceBetween: 24 },
        768: { slidesPerView: 4, spaceBetween: 30 },
        1024: { slidesPerView: 5, spaceBetween: 36 },
        1280: { slidesPerView: 6, spaceBetween: 40 },
      },
    });
  }

  /* ---------------- SERVICES SWIPER ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".services-swiper")) {
    new Swiper(".services-swiper", {
      slidesPerView: 1.1,
      spaceBetween: 24,
      loop: true,
      navigation: {
        nextEl: ".services-swiper-next",
        prevEl: ".services-swiper-prev",
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 36 },
        1400: { slidesPerView: 4, spaceBetween: 36 }
      },
    });
  }

  /* ---------------- INDUSTRIES SWIPER ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".industries-swiper")) {
    new Swiper(".industries-swiper", {
      slidesPerView: 1.1,
      spaceBetween: 24,
      loop: true,
      navigation: {
        nextEl: ".industries-swiper-next",
        prevEl: ".industries-swiper-prev",
      },
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 36 },
        1400: { slidesPerView: 4, spaceBetween: 36 }
      },
    });
  }

  /* ---------------- CASE STUDY SWIPER (4 Desktop, 3 Tablet, 1.2 Mobile) ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".case-study-swiper")) {
    new Swiper(".case-study-swiper", {
      slidesPerView: 1.2,
      spaceBetween: 18,
      loop: false,
      navigation: {
        nextEl: ".case-study-swiper-next",
        prevEl: ".case-study-swiper-prev",
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      breakpoints: {
        768: { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 24 }
      },
    });
  }

  /* ---------------- CLIENTS DUAL-ROW SWIPER (Mobile < 768px) ---------------- */
  if (typeof Swiper !== "undefined" && document.querySelector(".clients-swiper-row1")) {
    new Swiper(".clients-swiper-row1", {
      slidesPerView: "auto",
      spaceBetween: 12,
      loop: false,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      speed: 3500,
      allowTouchMove: true,
    });
  }

  if (typeof Swiper !== "undefined" && document.querySelector(".clients-swiper-row2")) {
    new Swiper(".clients-swiper-row2", {
      slidesPerView: "auto",
      spaceBetween: 12,
      loop: false,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      speed: 3500,
      allowTouchMove: true,
    });
  }

  document.querySelectorAll("video[data-pexels-video]").forEach(async (vidEl) => {
    const query = vidEl.getAttribute("data-pexels-video");
    const quality = vidEl.getAttribute("data-pexels-quality") || "hd";
    if (!query) return;
    try {
      const videoData = await window.PexelsAPI.fetchPexelsVideos(query, quality);
      if (videoData) {
        if (videoData.posterUrl && !vidEl.poster) vidEl.poster = videoData.posterUrl;
        
        // Start playing the lightweight preview immediately
        const startUrl = videoData.previewVideoUrl || videoData.videoUrl;
        vidEl.src = startUrl;
        vidEl.load();
        vidEl.play().catch(() => {});

        // If high-definition 1080p is available and different from initial preview, upgrade seamlessly
        if (videoData.videoUrl && videoData.videoUrl !== startUrl) {
          const upgradeVid = document.createElement("video");
          upgradeVid.src = videoData.videoUrl;
          upgradeVid.preload = "auto";
          upgradeVid.oncanplay = () => {
            const currentTime = vidEl.currentTime;
            vidEl.src = videoData.videoUrl;
            vidEl.currentTime = currentTime;
            vidEl.play().catch(() => {});
          };
        }
      }
    } catch (e) {
      console.warn("Could not load Pexels video:", e);
    }
  });

  /* ---------------- GENERIC PEXELS IMAGE LOADER & JSON DATA LOADER ---------------- */
  if (window.PexelsAPI && window.PexelsAPI.initPexelsJsonData) {
    window.PexelsAPI.initPexelsJsonData();
  }

  document.querySelectorAll("[data-pexels-query]:not([data-pexels-key])").forEach((el) => {
    const query = el.getAttribute("data-pexels-query");
    if (el.tagName === "IMG") {
      window.PexelsAPI.applyImageToElement(el, query);
    }
  });

  /* ---------------- SERVICE DIRECTORY ---------------- */
  const serviceRows = document.querySelectorAll(".service-row");
  const previewImgs = document.querySelectorAll(".service-preview img");
  function activateService(index) {
    serviceRows.forEach((r, i) => r.classList.toggle("is-active", i === index));
    previewImgs.forEach((img, i) => img.classList.toggle("is-visible", i === index));
  }
  serviceRows.forEach((row, i) => {
    row.addEventListener("mouseenter", () => activateService(i));
    row.addEventListener("click", () => activateService(i));
    const query = row.getAttribute("data-pexels-query");
    const img = previewImgs[i];
    if (img && query) window.PexelsAPI.applyImageToElement(img, query);
  });
  if (serviceRows.length) activateService(0);

  /* ---------------- FLOATING LABEL "HAS VALUE" TOGGLE (select) ---------------- */
  document.querySelectorAll(".form-group select").forEach((sel) => {
    const group = sel.closest(".form-group");
    const sync = () => group.classList.toggle("has-value", !!sel.value);
    sel.addEventListener("change", sync);
    sync();
  });

  /* ---------------- FORM VALIDATION (Inquiry + Hero Form) ---------------- */
  const attachFormHandler = (formId) => {
    const f = document.getElementById(formId);
    if (!f) return;
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!f.checkValidity()) {
        f.classList.add("was-validated");
        return;
      }
      f.classList.add("was-validated");
      const submitBtn = f.querySelector(".btn-arrow span") || f.querySelector("button[type='submit']");
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Thank you — we'll be in touch!";
        setTimeout(() => {
          submitBtn.textContent = originalText;
        }, 5000);
      }
      f.reset();
      f.querySelectorAll(".form-group").forEach((grp) => grp.classList.remove("has-value"));
      setTimeout(() => f.classList.remove("was-validated"), 100);
    });
  };
  attachFormHandler("inquiryForm");
  attachFormHandler("heroContactForm");
  attachFormHandler("mobileBottomSheetForm");

  /* ---------------- CASE STUDY MODAL INTERACTION ---------------- */
  const caseStudyData = {
    "malabar-jewellery": {
      badge: "Jewellery & Luxury Retail",
      title: "Malabar Jewellery: Turning Festive Buzz Into Sales: How Malabar Jewellery Scaled Sales Across Every Channel",
      image: "assets/malabar-jewellery.png",
      statVal1: "+340%",
      statLbl1: "High-Intent Consultation Leads",
      statVal2: "4.8x",
      statLbl2: "Blended Festive Campaign ROAS",
      overview: "Malabar Gold & Diamonds partnered with Adomantra to scale footfall across 300+ showrooms and accelerate high-ticket bridal jewellery inquiries nationwide.",
      challenge: "High regional competition during peak bridal and festive seasons, along with the complexity of tracking digital media impressions to verified offline showroom visits.",
      strategy: "Deployed localized programmatic geo-fencing around competing jewellery hubs, dynamic rich video creatives featuring real-time gold rates, and hyper-targeted Google search intent campaigns.",
      impact: "Delivered +340% uplift in high-intent bridal consultation leads, achieved a 4.8x blended ROAS during festive seasons, and boosted regional store walk-ins by 42%.",
      url: "https://www.adomantra.com/case-study-detail/malabar-jewellery"
    },
    "food-delivery": {
      badge: "FoodTech & Quick Commerce",
      title: "Food Delivery App: From Unknown to Unmissable: Scaling a Food Delivery App to 2.4M+ Installs",
      image: "assets/food-delivery.png",
      statVal1: "2.4M+",
      statLbl1: "Verified App Installations",
      statVal2: "-38%",
      statLbl2: "First-Order CAC Reduction",
      overview: "A top-tier on-demand food delivery app engaged Adomantra to engineer explosive user acquisition, drive meal-time app orders, and increase active user retention.",
      challenge: "Saturated metropolitan food delivery landscape, soaring app acquisition costs (CAC), and user churn after first installation.",
      strategy: "Executed real-time meal-time contextual push advertising, dynamic video banners tailored to current weather and food craving triggers, paired with automated programmatic CPI/CPA bidding algorithms.",
      impact: "Generated over 2.4 Million verified app installations, decreased first-order CAC by 38%, and elevated 30-day user re-order rates by 2.6x.",
      url: "https://www.adomantra.com/case-study-detail/food-delivery"
    },
    "ola-app-amp-play": {
      badge: "Mobility & Ride Hailing",
      title: "Ola App & Play: Driving Millions of Riders to Engage, Not Just Install",
      image: "assets/ola-app-play.png",
      statVal1: "5.8M+",
      statLbl1: "Active In-Transit Riders Reached",
      statVal2: "+192%",
      statLbl2: "Play Screen Interaction Surge",
      overview: "Adomantra conceptualized and rolled out a high-impact synchronized digital media strategy across Ola's in-cab interactive screen ecosystem (Ola Play) and mobile app network.",
      challenge: "Capturing commuter attention during rides and converting passive screen impressions into verified ecosystem app installations and brand actions.",
      strategy: "Engineered interactive micro-game display units, contextual city-guide video campaigns, and frictionless 1-tap ecosystem app installation incentives directly on in-vehicle tablets.",
      impact: "Engaged 5.8M+ active riders across 12 major metropolitan areas, achieving a 192% surge in screen engagement and driving over 850k cross-app ecosystem downloads.",
      url: "https://www.adomantra.com/case-study-detail/ola-app-amp-play"
    },
    "real-estate": {
      badge: "Luxury Real Estate",
      title: "Real Estate (Luxury): How We Turned HNI Interest Into Verified Site Visits",
      image: "assets/real-estate.png",
      statVal1: "₹65Cr+",
      statLbl1: "Closed Property Inventory",
      statVal2: "+410%",
      statLbl2: "Verified HNI Site Visits",
      overview: "A luxury property conglomerate partnered with Adomantra to capture high-net-worth investor demand and accelerate sales of ultra-luxury residential towers.",
      challenge: "Generic real estate lead generation generated low-intent inquiries, overburdened sales teams, and resulted in prolonged deal closing cycles.",
      strategy: "Implemented interactive 3D virtual tour video units, Google search high-intent keyword exclusivity, and multi-tier algorithmic lead qualification prior to sales escalation.",
      impact: "Directly facilitated ₹65Cr+ in verified residential property sales, increased qualified HNI physical site tours by 410%, and reduced cost-per-booking by 44%.",
      url: "https://www.adomantra.com/case-study-detail/real-estate"
    }
  };

  const csModalEl = document.getElementById("caseStudyDetailModal");
  let csBsModal = null;
  if (csModalEl && typeof bootstrap !== "undefined" && bootstrap.Modal) {
    csBsModal = new bootstrap.Modal(csModalEl);
  }

  document.querySelectorAll("[data-cs-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-cs-key");
      const data = caseStudyData[key];
      if (!data) return;

      document.getElementById("csModalBadge").textContent = data.badge;
      document.getElementById("csModalTitle").textContent = data.title;
      document.getElementById("csModalImg").src = data.image;
      document.getElementById("csModalStatVal1").textContent = data.statVal1;
      document.getElementById("csModalStatLbl1").textContent = data.statLbl1;
      document.getElementById("csModalStatVal2").textContent = data.statVal2;
      document.getElementById("csModalStatLbl2").textContent = data.statLbl2;
      document.getElementById("csModalOverview").textContent = data.overview;
      document.getElementById("csModalChallenge").textContent = data.challenge;
      document.getElementById("csModalStrategy").textContent = data.strategy;
      document.getElementById("csModalImpact").textContent = data.impact;
      
      const liveLink = document.getElementById("csModalLiveUrl");
      if (liveLink) liveLink.href = data.url;

      if (csBsModal) {
        csBsModal.show();
      }
    });
  });

  /* ---------------- BACKGROUND IMAGES (data-pexels-bg) ---------------- */
  document.querySelectorAll("[data-pexels-bg]").forEach(async (el) => {
    const query = el.getAttribute("data-pexels-bg");
    const quality = el.getAttribute("data-pexels-quality") || "medium";
    const results = await window.PexelsAPI.fetchPexelsImages(query, 1, quality);
    if (results[0]) el.style.backgroundImage = `url('${results[0].url}')`;
  });

  if (reduceMotion || !window.gsap) return;



  /* Metrics bar with Odometer Count Animation */
  if (document.querySelector(".metrics-bar")) {
    let metricsAnimated = false;
    ScrollTrigger.create({
      trigger: ".metrics-bar",
      start: "top 85%",
      onEnter: () => {
        if (metricsAnimated) return;
        metricsAnimated = true;

        document.querySelectorAll(".odometer-counter").forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target")) || 0;
          const prefix = counter.getAttribute("data-prefix") || "";
          const suffix = counter.getAttribute("data-suffix") || "";
          const decimals = parseInt(counter.getAttribute("data-decimals"), 10) || 0;
          const obj = { val: 0 };

          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => {
              counter.textContent = prefix + obj.val.toFixed(decimals) + suffix;
            },
          });
        });
      },
    });

    gsap.from(".metrics-row .m-item", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: ".metrics-bar", start: "top 88%" },
    });
  }

  /* ---------------- WHY US - STICKY SCROLLING PROBLEM LIST ---------------- */
  if (document.querySelector("#why-us") && window.ScrollTrigger) {
    const whyUsSection = document.querySelector("#why-us");
    const problemList = document.querySelector(".problem-list");
    const problemWrap = document.querySelector(".problem-list-wrap");
    
    if (problemList && problemWrap) {
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        // Calculate the total distance to scroll so all pills move up into view
        const getScrollDistance = () => {
          return problemList.scrollHeight - problemWrap.clientHeight + 16;
        };

        gsap.to(problemList, {
          y: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: whyUsSection,
            start: "top 12%",
            end: () => `+=${Math.max(600, getScrollDistance() * 2)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });
      });
    }
  }

  /* ---------------- SPLIT MEDIA PINNED FULLSCREEN SHOWCASE (Think Section - >768px only) ---------------- */
  if (document.querySelector(".think-section") && window.ScrollTrigger) {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const thinkTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".think-section",
          start: "top top",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          onEnter: () => {
            header.classList.add("is-hidden");
          },
          onLeave: () => {
            header.classList.remove("is-hidden");
          },
          onEnterBack: () => {
            header.classList.add("is-hidden");
          },
          onLeaveBack: () => {
            header.classList.remove("is-hidden");
          },
        },
      });

      thinkTl
        // Curtains slide left & right to reveal full showcase
        .fromTo(".think-split-left", { xPercent: 0 }, { xPercent: -102, ease: "power2.inOut" }, 0)
        .fromTo(".think-split-right", { xPercent: 0 }, { xPercent: 102, ease: "power2.inOut" }, 0)
        // Card expands from slightly compact to full-scale screen filling presence
        .fromTo(
          ".think-cta-card",
          { scale: 0.9, opacity: 0.3, y: 30 },
          { scale: 1, opacity: 1, y: 0, ease: "power2.out" },
          0
        )
        // Stagger pillar items into view
        .fromTo(
          ".think-pillars-grid .tp-card",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: "power2.out" },
          0.2
        );
    });
  }

  /* Final CTA */
  gsap.from(".final-cta h2, .final-cta .btn-arrow", {
    opacity: 0, y: 24, duration: 0.9, stagger: 0.15, ease: "power3.out",
    scrollTrigger: { trigger: ".final-cta", start: "top 80%" },
  });

  /* ---------------- FOOTER ACCORDION (Mobile < 768px) ---------------- */
  document.querySelectorAll(".footer-col h4").forEach((heading) => {
    heading.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        const col = heading.closest(".footer-col");
        col.classList.toggle("is-open");
      }
    });
  });

  /* ---------------- MOBILE SLIDE-UP BOTTOM SHEET MODAL (< 768px) ---------------- */
  const mobileSheet = document.getElementById("mobileBottomSheet");
  const openSheetBtn = document.getElementById("openMobileModalBtn");
  const closeSheetBtn = document.getElementById("closeMobileModalBtn");
  const sheetBackdrop = document.getElementById("mbsBackdrop");

  function openMobileSheet() {
    if (!mobileSheet) return;
    mobileSheet.classList.add("is-active");
    mobileSheet.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMobileSheet() {
    if (!mobileSheet) return;
    mobileSheet.classList.remove("is-active");
    mobileSheet.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (openSheetBtn) openSheetBtn.addEventListener("click", openMobileSheet);
  if (closeSheetBtn) closeSheetBtn.addEventListener("click", closeMobileSheet);
  if (sheetBackdrop) sheetBackdrop.addEventListener("click", closeMobileSheet);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileSheet && mobileSheet.classList.contains("is-active")) {
      closeMobileSheet();
    }
  });

  const mbsForm = document.getElementById("mobileBottomSheetForm");
  if (mbsForm) {
    mbsForm.addEventListener("submit", () => {
      if (mbsForm.checkValidity()) {
        setTimeout(closeMobileSheet, 1200);
      }
    });
  }

  /* ---------------- HIDE/SHOW MOBILE ENQUIRE BTN BASED ON SCROLL POSITION ---------------- */
  if (openSheetBtn) {
    const updateEnquireBtnVisibility = () => {
      if (window.innerWidth >= 768) return;

      const heroEl = document.querySelector(".hero");
      const footerEl = document.querySelector(".site-footer");
      const scrollY = window.scrollY || window.pageYOffset;
      const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight - 120 : 450;

      let nearFooter = false;
      if (footerEl) {
        const footerTop = footerEl.getBoundingClientRect().top;
        if (footerTop < window.innerHeight + 80) {
          nearFooter = true;
        }
      }

      // Hide if near hero/header OR near footer
      if (scrollY > heroBottom && !nearFooter) {
        openSheetBtn.classList.add("is-visible");
      } else {
        openSheetBtn.classList.remove("is-visible");
      }
    };

    window.addEventListener("scroll", updateEnquireBtnVisibility, { passive: true });
    window.addEventListener("resize", updateEnquireBtnVisibility, { passive: true });
    updateEnquireBtnVisibility();
  }
});