/**
 * MobilWork Poland — Interactive Application Logic
 * Handles Mobile Slide-Over Drawer, Hero Dual-Action Permit Finder,
 * 4-Step Process Stepper, Dynamic Voivodeship Timelines, Multi-Step
 * Eligibility Checker, Testimonials Carousel, FAQ Accordion, and Newsletter.
 */

(function () {
  'use strict';

  /* ==========================================================================
     Voivodeship & Permit Data Matrix
     ========================================================================== */
  const VOIVODESHIP_DATA = {
    warsaw: {
      label: 'Warsaw (Mazowieckie)',
      timelines: {
        czasowy: '3.5 – 4.5 Months',
        work: '3 – 4 Weeks',
        bluecard: '2.5 – 3.5 Months',
        family: '3.5 – 4.5 Months'
      }
    },
    bydgoszcz: {
      label: 'Bydgoszcz (Kujawsko-Pomorskie)',
      timelines: {
        czasowy: '3 – 4 Months',
        work: '2.5 – 3.5 Weeks',
        bluecard: '2 – 3 Months',
        family: '3 – 4 Months'
      }
    },
    krakow: {
      label: 'Kraków (Małopolskie)',
      timelines: {
        czasowy: '3.5 – 4.5 Months',
        work: '3 – 5 Weeks',
        bluecard: '2.5 – 3.5 Months',
        family: '3.5 – 4 Months'
      }
    },
    wroclaw: {
      label: 'Wrocław (Dolnośląskie)',
      timelines: {
        czasowy: '4 – 5 Months',
        work: '4 – 5 Weeks',
        bluecard: '3 – 4 Months',
        family: '4 – 5 Months'
      }
    },
    gdansk: {
      label: 'Gdańsk (Pomorskie)',
      timelines: {
        czasowy: '3 – 4 Months',
        work: '3 – 4 Weeks',
        bluecard: '2.5 – 3.5 Months',
        family: '3 – 4 Months'
      }
    },
    poznan: {
      label: 'Poznań (Wielkopolskie)',
      timelines: {
        czasowy: '3.5 – 4.5 Months',
        work: '3 – 4 Weeks',
        bluecard: '2.5 – 3.5 Months',
        family: '3.5 – 4.5 Months'
      }
    }
  };

  const PERMIT_FEES = {
    czasowy: '440 PLN + 100 PLN Card',
    work: '100 PLN (Employer Fee)',
    bluecard: '440 PLN + 100 PLN Card',
    family: '340 PLN + 100 PLN Card'
  };

  const STEPPER_CONTENT = {
    1: {
      badge: 'STEP 1 OF 4 • ZERO COST • 20 MINUTES',
      title: '1. Free Initial Consultation & Legal Stay Audit',
      summary:
        'Speak with a dedicated immigration specialist in Bydgoszcz, Warsaw, or online. We calculate your remaining legal Schengen/visa days and map out a zero-gap timeline so your employment and residence remain 100% uninterrupted.',
      checklist: [
        'Visa, Visa-Free & Schengen day-count verification',
        'Contract review (Umowa o pracę, Zlecenie, or B2B)',
        'Selection between Single Permit vs. EU Blue Card',
        'Transparent fixed-fee written quote with no surprises'
      ],
      guaranteeTitle: 'MobilWork Peace-of-Mind Guarantee',
      guaranteeText:
        'Even if your current visa expires in 5 days, submitting a properly audited application through our legal proxy immediately grants you 100% legal stay in Poland until the final decision is issued.',
      nextLabel: 'View Next Step (Step 2)'
    },
    2: {
      badge: 'STEP 2 OF 4 • DAYS 2–5 • EMPLOYER LIAISON',
      title: '2. Document Preparation & Legal Audit',
      summary:
        'You never have to translate complex Polish legal forms alone. Our case officers contact your HR department directly to prepare Załącznik nr 1, verify salary thresholds, and arrange sworn Polish translations.',
      checklist: [
        'Direct liaison with your Polish employer on Annex No. 1',
        'Verification of ZUS ZUA / ZUS RCA health insurance proofs',
        'Starosta Labor Market Test (Informacja Starosty) or exemption audit',
        'Sworn translations of diplomas, marriage & birth certificates'
      ],
      guaranteeTitle: 'Zero Missing-Document Delays',
      guaranteeText:
        'Every file undergoes a 24-point legal audit before submission so your Voivodeship inspector has zero reason to pause your case with formal defect notices (Wezwanie do usunięcia braków).',
      nextLabel: 'View Next Step (Step 3)'
    },
    3: {
      badge: 'STEP 3 OF 4 • WEEK 2 • URZĄD SUBMISSION',
      title: '3. Official Voivodeship Submission & Biometrics',
      summary:
        'We secure your appointment via INPOL / MOS portals, register our official Power of Attorney (Pełnomocnictwo), and accompany you in person to the Urząd Wojewódzki for fingerprint collection.',
      checklist: [
        'Priority booking in INPOL / Voivodeship reservation queues',
        'In-person coordinator assistance during fingerprint submission',
        'Immediate official red/yellow legal stay stamp in your passport',
        'All future Urząd letters routed directly to our legal registry'
      ],
      guaranteeTitle: '100% Legal Stay Stamp on Day of Filing',
      guaranteeText:
        'Once your fingerprints are captured and stamped, your stay in Poland is legally protected under Art. 108 of the Act on Foreigners while the Voivodeship processes your decision.',
      nextLabel: 'View Next Step (Step 4)'
    },
    4: {
      badge: 'STEP 4 OF 4 • DECISION & PLASTIC CARD PICKUP',
      title: '4. Receive Your Karta Pobytu Residence Card',
      summary:
        'While you focus on your career and life in Poland, we monitor your case weekly, answer inspector updates, verify your positive decision (Decyzja Pozytywna), and book your plastic card collection.',
      checklist: [
        'Proactive status monitoring & monthly employer ZUS updates',
        'Verification of personal data on your printed Karta Pobytu',
        'Assistance with 100 PLN plastic card printing fee & PESEL check',
        'Reminder calendar set for your future 5-Year EU Resident card'
      ],
      guaranteeTitle: 'Full Support Until the Card Is in Your Hand',
      guaranteeText:
        'Our contract only ends when you hold your physical Karta Pobytu or Work Permit decision and we have verified every detail on the card.',
      nextLabel: 'Back to Step 1'
    }
  };

  /* ==========================================================================
     Toast Notification Helper
     ========================================================================== */
  let toastTimeout = null;
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('is-visible');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 4200);
  }

  /* ==========================================================================
     1. Sticky Header & Mobile Slide-Over Drawer
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const mobileOpenBtn = document.getElementById('mobile-menu-open-btn');
  const mobileCloseBtn = document.getElementById('mobile-menu-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    if (window.scrollY > 12) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  }, { passive: true });

  function openMobileDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.add('is-open');
    drawerBackdrop.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileOpenBtn) mobileOpenBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  }

  function closeMobileDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.remove('is-open');
    drawerBackdrop.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileOpenBtn) mobileOpenBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  }

  if (mobileOpenBtn) mobileOpenBtn.addEventListener('click', openMobileDrawer);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileDrawer);

  document.querySelectorAll('.mobile-drawer__link, #drawer-cta-eligibility').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeMobileDrawer();
    }
  });

  // Language consultation badge switcher
  const langBtn = document.getElementById('language-switcher-btn');
  const langLabel = document.getElementById('current-lang-label');
  const langModes = [
    { code: 'EN / PL / UA', note: 'Consultations available in English, Polish & Ukrainian' },
    { code: 'ES / HI / EN', note: 'Hablamos Español & Hindi consultations available in Bydgoszcz & Warsaw' },
    { code: 'PL / EN / RU', note: 'Pełna obsługa prawna w języku polskim, angielskim i ukraińskim' }
  ];
  let langIdx = 0;
  if (langBtn && langLabel) {
    langBtn.addEventListener('click', () => {
      langIdx = (langIdx + 1) % langModes.length;
      langLabel.textContent = langModes[langIdx].code;
      showToast(langModes[langIdx].note);
    });
  }

  /* ==========================================================================
     2. Hero Dual-Action Search/Filter Widget & Dynamic Voivodeship Timelines
     ========================================================================== */
  const heroPermitSelect = document.getElementById('hero-permit-select');
  const heroCitySelect = document.getElementById('hero-city-select');
  const heroPreviewText = document.getElementById('hero-preview-text');
  const heroPreviewFee = document.getElementById('hero-preview-fee');
  const heroExploreBtn = document.getElementById('hero-explore-permit-btn');
  const heroStartCheckBtn = document.getElementById('hero-start-check-btn');
  const servicesCitySelect = document.getElementById('services-city-estimator');

  function updateHeroPreview() {
    if (!heroPermitSelect || !heroCitySelect) return;
    const permitKey = heroPermitSelect.value;
    const cityKey = heroCitySelect.value;
    const cityObj = VOIVODESHIP_DATA[cityKey] || VOIVODESHIP_DATA.warsaw;
    const timeStr = cityObj.timelines[permitKey] || '3 – 4 Months';
    const feeStr = PERMIT_FEES[permitKey] || '440 PLN';

    if (heroPreviewText) {
      heroPreviewText.innerHTML = 'Est. Decision in ' + cityObj.label + ': <strong>' + timeStr + '</strong>';
    }
    if (heroPreviewFee) {
      heroPreviewFee.innerHTML = 'Official Stamp Fee: <strong>' + feeStr + '</strong>';
    }
  }

  function updateServiceCardsTimelines(cityKey) {
    const cityObj = VOIVODESHIP_DATA[cityKey] || VOIVODESHIP_DATA.warsaw;
    document.querySelectorAll('[data-timeline-target]').forEach((el) => {
      const key = el.getAttribute('data-timeline-target');
      if (cityObj.timelines[key]) {
        el.textContent = cityObj.timelines[key];
      }
    });
  }

  if (heroPermitSelect) heroPermitSelect.addEventListener('change', updateHeroPreview);
  if (heroCitySelect) {
    heroCitySelect.addEventListener('change', () => {
      updateHeroPreview();
      if (servicesCitySelect) {
        servicesCitySelect.value = heroCitySelect.value;
        updateServiceCardsTimelines(heroCitySelect.value);
      }
    });
  }

  if (servicesCitySelect) {
    servicesCitySelect.addEventListener('change', () => {
      const selectedCity = servicesCitySelect.value;
      updateServiceCardsTimelines(selectedCity);
      if (heroCitySelect) {
        heroCitySelect.value = selectedCity;
        updateHeroPreview();
      }
      const cityLabel = (VOIVODESHIP_DATA[selectedCity] || VOIVODESHIP_DATA.warsaw).label;
      showToast('Updated processing timelines for ' + cityLabel);
    });
  }

  // Filter Services Grid by Category
  const filterTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  function filterServiceCards(category) {
    filterTabs.forEach((tab) => {
      const isMatch = tab.getAttribute('data-category') === category;
      tab.classList.toggle('is-active', isMatch);
    });

    serviceCards.forEach((card) => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category') || 'all';
      filterServiceCards(category);
    });
  });

  // Connect Nav & Footer Permit Filter Links
  document.querySelectorAll('[data-filter-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const targetCat = link.getAttribute('data-filter-link') || 'all';
      filterServiceCards(targetCat);
    });
  });

  // Hero Primary CTA: "Match My Permit & Timeline"
  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', () => {
      const permitKey = heroPermitSelect ? heroPermitSelect.value : 'czasowy';
      const cityKey = heroCitySelect ? heroCitySelect.value : 'warsaw';

      // Show all cards & sync city timelines
      filterServiceCards('all');
      if (servicesCitySelect) servicesCitySelect.value = cityKey;
      updateServiceCardsTimelines(cityKey);

      // Highlight the matching service card & open its checklist
      serviceCards.forEach((card) => {
        const isTarget = card.getAttribute('data-permit-key') === permitKey;
        card.classList.toggle('is-highlighted', isTarget);
        const drawer = card.querySelector('.service-drawer');
        const toggleBtn = card.querySelector('.js-toggle-checklist');
        if (isTarget && drawer) {
          drawer.classList.add('is-open');
          if (toggleBtn) toggleBtn.textContent = 'Hide Document Checklist';
        }
      });

      const targetCard = document.getElementById('service-card-' + permitKey);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Hero Secondary CTA: "Check Eligibility Form"
  if (heroStartCheckBtn) {
    heroStartCheckBtn.addEventListener('click', () => {
      const permitKey = heroPermitSelect ? heroPermitSelect.value : 'czasowy';
      preselectEligibilityPermit(permitKey);
      const eligSec = document.getElementById('eligibility-section');
      if (eligSec) eligSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     3. Step-by-Step Permit Stepper (4-Step Interactive Timeline)
     ========================================================================== */
  let currentProcessStep = 1;
  const stepTabs = document.querySelectorAll('.step-card');
  const stepPanelBadge = document.getElementById('step-panel-badge');
  const stepPanelTitle = document.getElementById('step-panel-title');
  const stepPanelSummary = document.getElementById('step-panel-summary');
  const stepPanelChecklist = document.getElementById('step-panel-checklist');
  const stepGuaranteeTitle = document.getElementById('step-guarantee-title');
  const stepGuaranteeText = document.getElementById('step-guarantee-text');
  const stepNextBtn = document.getElementById('step-next-btn');

  function setProcessStep(stepNumber) {
    currentProcessStep = stepNumber;
    const data = STEPPER_CONTENT[stepNumber] || STEPPER_CONTENT[1];

    stepTabs.forEach((tab) => {
      const tabNum = parseInt(tab.getAttribute('data-step'), 10);
      const isSelected = tabNum === stepNumber;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    if (stepPanelBadge) stepPanelBadge.textContent = data.badge;
    if (stepPanelTitle) stepPanelTitle.textContent = data.title;
    if (stepPanelSummary) stepPanelSummary.textContent = data.summary;
    if (stepGuaranteeTitle) stepGuaranteeTitle.textContent = data.guaranteeTitle;
    if (stepGuaranteeText) stepGuaranteeText.textContent = data.guaranteeText;
    if (stepNextBtn) {
      stepNextBtn.innerHTML = '<span>' + data.nextLabel + '</span> <span aria-hidden="true">&rarr;</span>';
    }

    if (stepPanelChecklist) {
      stepPanelChecklist.innerHTML = data.checklist
        .map(
          (item) =>
            '<div class="step-checklist__item">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>' +
            '<span>' + item + '</span>' +
            '</div>'
        )
        .join('');
    }
  }

  stepTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const stepNum = parseInt(tab.getAttribute('data-step'), 10) || 1;
      setProcessStep(stepNum);
    });
  });

  if (stepNextBtn) {
    stepNextBtn.addEventListener('click', () => {
      const nextStep = currentProcessStep >= 4 ? 1 : currentProcessStep + 1;
      setProcessStep(nextStep);
    });
  }

  /* ==========================================================================
     4. Services Grid Checklists & Permit Selection
     ========================================================================== */
  document.querySelectorAll('.js-toggle-checklist').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      if (!drawer) return;
      const isOpen = drawer.classList.toggle('is-open');
      btn.textContent = isOpen ? 'Hide Document Checklist' : 'View Document Checklist';
    });
  });

  function preselectEligibilityPermit(permitKey) {
    const empMap = {
      czasowy: 'standard-contract',
      work: 'employer-sponsor',
      bluecard: 'high-skill',
      family: 'family-join'
    };
    const mappedEmp = empMap[permitKey] || 'standard-contract';
    wizardState.employmentStatus = mappedEmp;

    document.querySelectorAll('[data-group="employmentStatus"]').forEach((btn) => {
      btn.classList.toggle('is-selected', btn.getAttribute('data-value') === mappedEmp);
    });
  }

  document.querySelectorAll('.js-select-permit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const permitKey = btn.getAttribute('data-permit') || 'czasowy';
      preselectEligibilityPermit(permitKey);
      const eligSec = document.getElementById('eligibility-section');
      if (eligSec) eligSec.scrollIntoView({ behavior: 'smooth' });
      showToast('Pre-selected permit category in Eligibility Checker below.');
    });
  });

  /* ==========================================================================
     5. Interactive Multi-Step Eligibility Checker
     ========================================================================== */
  const wizardState = {
    step: 1,
    citizenship: 'India',
    stayStatus: 'in-poland-visa',
    targetCity: 'Warsaw (Mazowieckie)',
    targetMonths: '3.5 – 4.5 Months',
    employmentStatus: 'standard-contract'
  };

  const wizPanes = {
    1: document.getElementById('wizard-step-1'),
    2: document.getElementById('wizard-step-2'),
    3: document.getElementById('wizard-step-3'),
    4: document.getElementById('wizard-step-result')
  };

  const wizPills = {
    1: document.getElementById('wiz-pill-1'),
    2: document.getElementById('wiz-pill-2'),
    3: document.getElementById('wiz-pill-3')
  };

  const wizBarFill = document.getElementById('wizard-bar-fill');

  function goToWizardStep(stepNum) {
    wizardState.step = stepNum;
    Object.keys(wizPanes).forEach((k) => {
      const pane = wizPanes[k];
      if (pane) pane.classList.toggle('is-active', parseInt(k, 10) === stepNum);
    });

    [1, 2, 3].forEach((idx) => {
      const pill = wizPills[idx];
      if (!pill) return;
      pill.classList.remove('is-active', 'is-complete');
      if (stepNum === idx) {
        pill.classList.add('is-active');
      } else if (stepNum > idx) {
        pill.classList.add('is-complete');
      }
    });

    if (wizBarFill) {
      const pct = stepNum === 1 ? '33.33%' : stepNum === 2 ? '66.66%' : '100%';
      wizBarFill.style.width = pct;
    }

    if (stepNum === 4) {
      renderEligibilityResult();
    }
  }

  // Option Card Selection across Step 1, 2, 3
  document.querySelectorAll('.option-card').forEach((card) => {
    card.addEventListener('click', () => {
      const group = card.getAttribute('data-group');
      const val = card.getAttribute('data-value');
      if (!group || !val) return;

      document.querySelectorAll('.option-card[data-group="' + group + '"]').forEach((sibling) => {
        sibling.classList.remove('is-selected');
      });
      card.classList.add('is-selected');
      wizardState[group] = val;

      if (group === 'targetCity') {
        wizardState.targetMonths = card.getAttribute('data-months') || '3.5 – 4.5 Months';
      }
    });
  });

  const citSelect = document.getElementById('wiz-citizenship');
  if (citSelect) {
    citSelect.addEventListener('change', () => {
      wizardState.citizenship = citSelect.value;
    });
  }

  const wizNext1 = document.getElementById('wiz-next-1');
  const wizPrev2 = document.getElementById('wiz-prev-2');
  const wizNext2 = document.getElementById('wiz-next-2');
  const wizPrev3 = document.getElementById('wiz-prev-3');
  const wizCalcBtn = document.getElementById('wiz-calculate-btn');
  const wizResetBtn = document.getElementById('wiz-reset-btn');
  const eligForm = document.getElementById('eligibility-form');

  if (wizNext1) wizNext1.addEventListener('click', () => goToWizardStep(2));
  if (wizPrev2) wizPrev2.addEventListener('click', () => goToWizardStep(1));
  if (wizNext2) wizNext2.addEventListener('click', () => goToWizardStep(3));
  if (wizPrev3) wizPrev3.addEventListener('click', () => goToWizardStep(2));
  if (wizCalcBtn) wizCalcBtn.addEventListener('click', () => goToWizardStep(4));
  if (wizResetBtn) wizResetBtn.addEventListener('click', () => goToWizardStep(1));

  function renderEligibilityResult() {
    const titleEl = document.getElementById('result-permit-title');
    const summaryEl = document.getElementById('result-permit-summary');
    const statCity = document.getElementById('result-stat-city');
    const statTime = document.getElementById('result-stat-time');
    const statFee = document.getElementById('result-stat-fee');

    let recTitle = 'Recommended: Temporary Residence & Work Permit (Karta Pobytu Czasowego)';
    let recFee = '440 PLN + 100 PLN';
    let recTime = wizardState.targetMonths;
    let recSummary =
      'As a citizen of ' +
      wizardState.citizenship +
      ' relocating to ' +
      wizardState.targetCity +
      ', you qualify for the combined Single Permit (Art. 114) with an immediate legal stay stamp upon submission.';

    if (wizardState.employmentStatus === 'high-skill') {
      recTitle = 'Recommended: EU Blue Card (Niebieska Karta UE — Art. 127)';
      recFee = '440 PLN + 100 PLN';
      recTime = '2.5 – 3.5 Months';
      recSummary =
        'Your high-skill profile in ' +
        wizardState.targetCity +
        ' qualifies for a 3-year EU Blue Card with full labor market mobility and immediate open work access for family members.';
    } else if (wizardState.employmentStatus === 'employer-sponsor' || wizardState.stayStatus === 'abroad') {
      recTitle = 'Recommended: Voivodeship Work Permit (Zezwolenie na Pracę Typ A)';
      recFee = '100 PLN Official Fee';
      recTime = '3 – 4 Weeks';
      recSummary =
        'We will digitally file your Typ A Work Permit in ' +
        wizardState.targetCity +
        ' so you can obtain your National D-Visa or begin legal employment without delay.';
    } else if (wizardState.employmentStatus === 'family-join') {
      recTitle = 'Recommended: Family Reunification Residence Card (Art. 159)';
      recFee = '340 PLN + 100 PLN';
      recTime = '3 – 4 Months';
      recSummary =
        'We will handle Polish Civil Registry (USC) certificate transcription, ZUS health insurance registration, and your dependent Karta Pobytu in ' +
        wizardState.targetCity +
        '.';
    }

    if (titleEl) titleEl.textContent = recTitle;
    if (summaryEl) summaryEl.textContent = recSummary;
    if (statCity) statCity.textContent = wizardState.targetCity;
    if (statTime) statTime.textContent = recTime;
    if (statFee) statFee.textContent = recFee;
  }

  if (eligForm) {
    eligForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('lead-name');
      const contactInput = document.getElementById('lead-contact');
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const contactVal = contactInput ? contactInput.value.trim() : '';

      if (!nameVal || !contactVal) {
        showToast('Please enter your name and phone/email so our case officer can send your checklist.');
        if (nameInput && !nameVal) nameInput.focus();
        else if (contactInput) contactInput.focus();
        return;
      }

      const submitBtn = document.getElementById('wiz-submit-booking-btn');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Consultation Confirmed &check;</span>';
      }
      showToast(
        'Thank you, ' +
          nameVal +
          '! Our ' +
          wizardState.targetCity.split(' ')[0] +
          ' specialist will contact you within 2 business hours.'
      );
    });
  }

  /* ==========================================================================
     6. Testimonials Carousel (Responsive Sliding Track + Dots + Buttons)
     ========================================================================== */
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;

  function getMaxSlide() {
    return window.innerWidth <= 900 ? 3 : 2;
  }

  function updateCarousel() {
    if (!track) return;
    const maxSlide = getMaxSlide();
    if (currentSlide > maxSlide) currentSlide = 0;
    if (currentSlide < 0) currentSlide = maxSlide;

    const cards = track.querySelectorAll('.testimonial-card');
    if (!cards.length) return;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    const offset = currentSlide * (cardWidth + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';

    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide -= 1;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide += 1;
      updateCarousel();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      currentSlide = parseInt(dot.getAttribute('data-slide'), 10) || 0;
      updateCarousel();
    });
  });

  window.addEventListener('resize', updateCarousel);

  /* ==========================================================================
     7. FAQ Accordion & Footer Newsletter Signup
     ========================================================================== */
  document.querySelectorAll('.faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.faq-item');
      if (!parent) return;
      const isOpen = parent.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailVal = newsletterEmail ? newsletterEmail.value.trim() : '';
      if (!emailVal || !emailVal.includes('@')) {
        if (newsletterFeedback) {
          newsletterFeedback.style.color = '#FCD34D';
          newsletterFeedback.textContent = 'Please enter a valid email address.';
        }
        return;
      }
      if (newsletterFeedback) {
        newsletterFeedback.style.color = '#5EEAD4';
        newsletterFeedback.textContent = '✓ Subscribed to monthly Polish Immigration Law briefings.';
      }
      if (newsletterEmail) newsletterEmail.value = '';
      showToast('Subscribed to Polish Immigration Law & Urząd alerts!');
    });
  }
})();
