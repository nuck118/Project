import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import {
  LANGUAGES,
  TRANSLATIONS,
  VOIVODESHIP_DATA,
  PERMIT_FEES,
  type LangCode,
  type CityKey,
  type PermitKey
} from '../i18n/translations';

export type PageRoute =
  | 'home'
  | 'residence'
  | 'work'
  | 'process'
  | 'stories'
  | 'eligibility'
  | 'legal';

interface EditorialPortalProps {
  page: PageRoute;
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay,
      ease: 'easeOut'
    }
  })
};

export default function EditorialPortal({ page }: EditorialPortalProps) {
  // 1. Multi-Language State (EN / PL / UA / ES) persisted in localStorage & URL
  const [lang, setLang] = useState<LangCode>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // 2. Hero & Services Interactive State
  const [selectedPermit, setSelectedPermit] = useState<PermitKey>('czasowy');
  const [selectedCity, setSelectedCity] = useState<CityKey>('bydgoszcz');
  const [serviceFilter, setServiceFilter] = useState<'all' | 'residence' | 'work' | 'family'>('all');
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({ czasowy: true });
  const [highlightedPermit, setHighlightedPermit] = useState<PermitKey | null>(null);

  // 3. 4-Stage Process Stepper State
  const [activeStep, setActiveStep] = useState<number>(0);

  // 4. Multi-Step Eligibility Wizard State
  const [wizStep, setWizStep] = useState<1 | 2 | 3 | 4>(1);
  const [citizenship, setCitizenship] = useState<string>('India');
  const [stayStatus, setStayStatus] = useState<string>('in-poland-visa');
  const [wizCity, setWizCity] = useState<CityKey>('bydgoszcz');
  const [empStatus, setEmpStatus] = useState<string>('standard-contract');
  const [leadName, setLeadName] = useState<string>('');
  const [leadContact, setLeadContact] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // 5. FAQ Accordion & Newsletter State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const lenisRef = useRef<Lenis | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMsg(null);
    }, 4200);
  };

  // Initialize Lenis Smooth Scroll + Language Restoration
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toLowerCase() as LangCode | null;
      const savedLang = window.localStorage.getItem('mobilwork_lang') as LangCode | null;
      const validCodes: LangCode[] = ['en', 'pl', 'ua', 'es'];
      if (urlLang && validCodes.includes(urlLang)) {
        setLang(urlLang);
        document.documentElement.lang = urlLang === 'ua' ? 'uk' : urlLang;
      } else if (savedLang && validCodes.includes(savedLang)) {
        setLang(savedLang);
        document.documentElement.lang = savedLang === 'ua' ? 'uk' : savedLang;
      }
    } catch {
      // ignore storage errors
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenisRef.current = lenis;
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 14);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const switchLanguage = (newLang: LangCode) => {
    setLang(newLang);
    document.documentElement.lang = newLang === 'ua' ? 'uk' : newLang;
    try {
      window.localStorage.setItem('mobilwork_lang', newLang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
    const meta = LANGUAGES.find((l) => l.code === newLang);
    if (meta) showToast(meta.announcement);
  };

  const smoothScrollTo = (selector: string) => {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -90 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = TRANSLATIONS[lang];
  const flyerHero = (t as unknown as { flyerHero?: typeof TRANSLATIONS.en.flyerHero }).flyerHero || TRANSLATIONS.en.flyerHero;
  const currentCityObj = VOIVODESHIP_DATA[selectedCity] || VOIVODESHIP_DATA.bydgoszcz;
  const currentTimeline = currentCityObj.timelines[selectedPermit][lang];
  const currentFee = PERMIT_FEES[selectedPermit][lang];

  const handleHeroMatch = () => {
    setServiceFilter('all');
    setHighlightedPermit(selectedPermit);
    setOpenDrawers((prev) => ({ ...prev, [selectedPermit]: true }));
    const targetEl = document.getElementById(`service-card-${selectedPermit}`);
    if (targetEl) {
      smoothScrollTo(`#service-card-${selectedPermit}`);
    } else {
      window.location.href = `/residence-permits?lang=${lang}`;
    }
  };

  const handlePreselectEligibility = (permitKey: PermitKey) => {
    const empMap: Record<PermitKey, string> = {
      czasowy: 'standard-contract',
      work: 'employer-sponsor',
      bluecard: 'high-skill',
      family: 'family-join'
    };
    setEmpStatus(empMap[permitKey]);
    setWizCity(selectedCity);
    const eligEl = document.getElementById('eligibility-section');
    if (eligEl) {
      smoothScrollTo('#eligibility-section');
    } else {
      window.location.href = `/eligibility?lang=${lang}`;
    }
  };

  const getWizardRecommendation = () => {
    const cityLabel = VOIVODESHIP_DATA[wizCity].labels[lang];
    if (empStatus === 'high-skill') {
      return {
        title: t.eligibility.results.bluecardTitle,
        fee: PERMIT_FEES.bluecard[lang],
        time: VOIVODESHIP_DATA[wizCity].timelines.bluecard[lang],
        city: cityLabel
      };
    }
    if (empStatus === 'employer-sponsor' || stayStatus === 'abroad') {
      return {
        title: t.eligibility.results.workTitle,
        fee: PERMIT_FEES.work[lang],
        time: VOIVODESHIP_DATA[wizCity].timelines.work[lang],
        city: cityLabel
      };
    }
    if (empStatus === 'family-join') {
      return {
        title: t.eligibility.results.familyTitle,
        fee: PERMIT_FEES.family[lang],
        time: VOIVODESHIP_DATA[wizCity].timelines.family[lang],
        city: cityLabel
      };
    }
    return {
      title: t.eligibility.results.czasowyTitle,
      fee: PERMIT_FEES.czasowy[lang],
      time: VOIVODESHIP_DATA[wizCity].timelines.czasowy[lang],
      city: cityLabel
    };
  };

  const handleEligibilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadContact.trim()) {
      showToast('Please enter your name and phone/email.');
      return;
    }
    setBookingConfirmed(true);
    showToast(`${leadName.trim()} — ${t.eligibility.submittedBtn}`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    setNewsletterStatus(t.footer.newsletterSuccess);
    setNewsletterEmail('');
    showToast(t.footer.newsletterSuccess);
  };

  const navItems: { route: PageRoute; href: string; label: string }[] = [
    { route: 'home', href: '/', label: t.nav.home },
    { route: 'residence', href: '/residence-permits', label: t.nav.residence },
    { route: 'work', href: '/work-permits', label: t.nav.work },
    { route: 'process', href: '/process', label: t.nav.process },
    { route: 'stories', href: '/stories', label: t.nav.stories },
    { route: 'eligibility', href: '/eligibility', label: t.nav.eligibility },
    { route: 'legal', href: '/legal', label: t.nav.legal }
  ];

  // Desktop Primary Navigation (Unclustered: 4 clean links with ample breathing space)
  const desktopNavItems = [
    {
      id: 'services',
      href: page === 'home' ? '#services-section' : `/residence-permits?lang=${lang}`,
      label: t.nav.residence,
      isAnchor: page === 'home'
    },
    {
      id: 'process',
      href: page === 'home' ? '#process-section' : `/process?lang=${lang}`,
      label: t.nav.process,
      isAnchor: page === 'home'
    },
    {
      id: 'stories',
      href: page === 'home' ? '#stories-section' : `/stories?lang=${lang}`,
      label: t.nav.stories,
      isAnchor: page === 'home'
    },
    {
      id: 'faq',
      href: page === 'home' ? '#faq-section' : `/residence-permits?lang=${lang}#faq-section`,
      label: 'FAQ',
      isAnchor: page === 'home'
    }
  ];

  // Reusable Section Renderers
  const renderProcessSection = () => {
    const stepData = t.process.steps[activeStep] || t.process.steps[0];
    return (
      <section className="editorial-section editorial-section--ivory" id="process-section">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-eyebrow">{t.process.eyebrow}</span>
              <h2 className="section-title">{t.process.title}</h2>
            </div>
            <div>
              <p className="section-subtitle">{t.process.subtitle}</p>
              {page === 'home' && (
                <div style={{ marginTop: '14px' }}>
                  <a
                    href={`/process?lang=${lang}`}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      color: 'var(--brand-blue)',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {t.process.fullPageLink}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* 4-Stage Interactive Stepper Grid */}
          <div className="stepper-grid" role="tablist" aria-label="4-Stage Permit Protocol">
            {t.process.steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`step-card ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  id={`step-tab-${idx + 1}`}
                >
                  <div>
                    <div className="step-card__top">
                      <span className="step-card__num">{step.num}</span>
                      <span className="step-card__duration">{step.duration}</span>
                    </div>
                    <h3 className="step-card__title">{step.shortTitle}</h3>
                    <p className="step-card__desc">{step.shortDesc}</p>
                  </div>
                  <span className="step-card__cta">
                    <span>{t.process.inspectCta}</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step Detail Dossier */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-step-${activeStep}`}
              className="step-detail-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              id="step-detail-panel"
            >
              <div>
                <span className="step-detail-box__badge">{stepData.badge}</span>
                <h3 className="step-detail-box__title">{stepData.title}</h3>
                <p className="step-detail-box__summary">{stepData.summary}</p>
                <div className="step-checklist">
                  {stepData.checklist.map((item, i) => (
                    <div className="step-checklist__item" key={i}>
                      <span className="step-checklist__mark">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="step-guarantee-card">
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.74rem',
                      textTransform: 'uppercase',
                      color: 'var(--brand-blue)',
                      fontWeight: 800,
                      display: 'block',
                      marginBottom: '6px'
                    }}
                  >
                    KPA ART. 32 • LEGAL PROXY PROTECTION
                  </span>
                  <h4>{stepData.guaranteeTitle}</h4>
                  <p style={{ marginTop: '8px' }}>{stepData.guaranteeText}</p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    id="step-next-btn"
                    onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
                  >
                    <span>
                      {t.process.nextBtnPrefix} 0{((activeStep + 1) % 4) + 1}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <a href={`/eligibility?lang=${lang}`} className="btn btn--secondary btn--sm">
                    {t.process.bookBtn}
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    );
  };

  const renderServicesSection = (defaultCategory?: 'all' | 'residence' | 'work' | 'family') => {
    const effectiveFilter = defaultCategory || serviceFilter;
    const filteredCards = t.services.cards.filter(
      (c) => effectiveFilter === 'all' || c.category === effectiveFilter
    );

    return (
      <section className="editorial-section editorial-section--stone" id="services-section">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-eyebrow">{t.services.eyebrow}</span>
              <h2 className="section-title">{t.services.title}</h2>
            </div>
            <div>
              <p className="section-subtitle">{t.services.subtitle}</p>
              {page === 'home' && (
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '14px' }}>
                  <a
                    href={`/residence-permits?lang=${lang}`}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      color: 'var(--brand-blue)'
                    }}
                  >
                    {t.services.exploreResidencePage}
                  </a>
                  <a
                    href={`/work-permits?lang=${lang}`}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      color: 'var(--brand-blue)'
                    }}
                  >
                    {t.services.exploreWorkPage}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Filter Tabs & Voivodeship Selector */}
          <div className="services-toolbar">
            <div className="filter-tabs" role="tablist" aria-label="Permit Categories">
              {(
                [
                  { id: 'all', label: t.services.filterAll },
                  { id: 'residence', label: t.services.filterResidence },
                  { id: 'work', label: t.services.filterWork },
                  { id: 'family', label: t.services.filterFamily }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  id={`filter-tab-${tab.id}`}
                  className={`filter-tab ${serviceFilter === tab.id ? 'is-active' : ''}`}
                  onClick={() => setServiceFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="city-estimator-bar">
              <label htmlFor="services-city-estimator">{t.services.citySelectorLabel}</label>
              <select
                id="services-city-estimator"
                value={selectedCity}
                onChange={(e) => {
                  const newCity = e.target.value as CityKey;
                  setSelectedCity(newCity);
                  showToast(`${VOIVODESHIP_DATA[newCity].labels[lang]}`);
                }}
              >
                {(Object.keys(VOIVODESHIP_DATA) as CityKey[]).map((cityKey) => (
                  <option key={cityKey} value={cityKey}>
                    {VOIVODESHIP_DATA[cityKey].labels[lang]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid" id="services-grid">
            {filteredCards.map((card) => {
              const isOpen = !!openDrawers[card.key];
              const isHighlighted = highlightedPermit === card.key;
              const cityTimeline = VOIVODESHIP_DATA[selectedCity].timelines[card.key][lang];

              return (
                <article
                  key={card.key}
                  id={`service-card-${card.key}`}
                  className={`service-card ${isHighlighted ? 'is-highlighted' : ''}`}
                >
                  <div>
                    <div className="service-card__top">
                      <span className="service-card__index">INDEX // {card.index}</span>
                      <div className="service-timeline-badge">
                        <span>{t.services.estProcessingLabel}:</span>
                        <strong>{cityTimeline}</strong>
                      </div>
                    </div>

                    <span className="service-card__statute">{card.statute}</span>
                    <h3 className="service-card__title">{card.title}</h3>
                    <p className="service-card__desc">{card.desc}</p>

                    <ul className="service-features">
                      {card.features.map((feat, i) => (
                        <li key={i}>
                          <span className="service-features__bullet">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="service-drawer"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                        >
                          <h5>{card.checklistTitle}</h5>
                          <ul>
                            {card.checklistItems.map((ci, idx) => (
                              <li key={idx}>• {ci}</li>
                            ))}
                          </ul>
                          <div className="service-drawer__fee">{card.feeNote}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="service-card__actions">
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      id={`btn-checklist-${card.key}`}
                      onClick={() =>
                        setOpenDrawers((prev) => ({ ...prev, [card.key]: !prev[card.key] }))
                      }
                    >
                      {isOpen ? t.services.hideChecklistBtn : t.services.showChecklistBtn}
                    </button>
                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      id={`btn-apply-${card.key}`}
                      onClick={() => handlePreselectEligibility(card.key)}
                    >
                      {t.services.applyBtn}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  const renderEligibilitySection = () => {
    const rec = getWizardRecommendation();
    const progressPct =
      wizStep === 1 ? '33.33%' : wizStep === 2 ? '66.66%' : '100%';

    return (
      <section className="editorial-section editorial-section--ivory" id="eligibility-section">
        <div className="container eligibility-layout">
          <div>
            <span className="section-eyebrow">{t.eligibility.eyebrow}</span>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>
              {t.eligibility.title}
            </h2>
            <p className="section-subtitle">{t.eligibility.subtitle}</p>

            <div className="eligibility-benefits">
              <div className="benefit-row">
                <span className="benefit-row__num">01 //</span>
                <div>
                  <h4>{t.eligibility.benefit1Title}</h4>
                  <p>{t.eligibility.benefit1Desc}</p>
                </div>
              </div>
              <div className="benefit-row">
                <span className="benefit-row__num">02 //</span>
                <div>
                  <h4>{t.eligibility.benefit2Title}</h4>
                  <p>{t.eligibility.benefit2Desc}</p>
                </div>
              </div>
              <div className="benefit-row">
                <span className="benefit-row__num">03 //</span>
                <div>
                  <h4>{t.eligibility.benefit3Title}</h4>
                  <p>{t.eligibility.benefit3Desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Step Interactive Eligibility Wizard */}
          <div className="wizard-card" id="eligibility-widget">
            <div className="wizard-header">
              <div className="wizard-pills">
                {t.eligibility.pills.map((pillLabel, idx) => {
                  const stepIdx = idx + 1;
                  const isActive = wizStep === stepIdx;
                  const isComplete = wizStep > stepIdx;
                  return (
                    <div
                      key={pillLabel}
                      className={`wizard-pill ${isActive ? 'is-active' : ''} ${
                        isComplete ? 'is-complete' : ''
                      }`}
                    >
                      {pillLabel}
                    </div>
                  );
                })}
              </div>
              <div className="wizard-progress-track">
                <div className="wizard-progress-fill" style={{ width: progressPct }} />
              </div>
            </div>

            <form className="wizard-body" id="eligibility-form" onSubmit={handleEligibilitySubmit} noValidate>
              <AnimatePresence mode="wait">
                {wizStep === 1 && (
                  <motion.div
                    key="wiz-1"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h3 className="wizard-title">{t.eligibility.step1Title}</h3>
                    <p className="wizard-sub">{t.eligibility.step1Sub}</p>

                    <div className="form-group">
                      <label className="form-label" htmlFor="wiz-citizenship">
                        {t.eligibility.citizenshipLabel}
                      </label>
                      <select
                        id="wiz-citizenship"
                        className="form-select"
                        value={citizenship}
                        onChange={(e) => setCitizenship(e.target.value)}
                      >
                        <option value="India">India (IN)</option>
                        <option value="Ukraine">Ukraine (UA)</option>
                        <option value="Colombia">Colombia (CO)</option>
                        <option value="Philippines">Philippines (PH)</option>
                        <option value="Vietnam">Vietnam (VN)</option>
                        <option value="Brazil">Brazil (BR)</option>
                        <option value="Turkey">Turkey (TR)</option>
                        <option value="United States / UK / Canada">United States / UK / Canada</option>
                        <option value="Georgia / Armenia / Moldova">Georgia / Armenia / Moldova</option>
                        <option value="Other Non-EU Country">Other Non-EU / EEA Country</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <span className="form-label">{t.eligibility.locationLabel}</span>
                      <div className="option-grid">
                        {t.eligibility.locations.map((loc) => (
                          <button
                            key={loc.value}
                            type="button"
                            className={`option-card ${stayStatus === loc.value ? 'is-selected' : ''}`}
                            onClick={() => setStayStatus(loc.value)}
                          >
                            <span className="option-card__title">{loc.title}</span>
                            <span className="option-card__meta">{loc.meta}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="wizard-footer">
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-blue)' }}>
                        01 / 03
                      </span>
                      <button
                        type="button"
                        className="btn btn--primary"
                        id="wiz-next-1"
                        onClick={() => setWizStep(2)}
                      >
                        {t.eligibility.nextToCityBtn}
                      </button>
                    </div>
                  </motion.div>
                )}

                {wizStep === 2 && (
                  <motion.div
                    key="wiz-2"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h3 className="wizard-title">{t.eligibility.step2Title}</h3>
                    <p className="wizard-sub">{t.eligibility.step2Sub}</p>

                    <div className="option-grid" style={{ marginBottom: '20px' }}>
                      {(Object.keys(VOIVODESHIP_DATA) as CityKey[]).map((cityKey) => {
                        const cObj = VOIVODESHIP_DATA[cityKey];
                        return (
                          <button
                            key={cityKey}
                            type="button"
                            className={`option-card ${wizCity === cityKey ? 'is-selected' : ''}`}
                            onClick={() => setWizCity(cityKey)}
                          >
                            <span className="option-card__title">{cObj.labels[lang]}</span>
                            <span className="option-card__meta">
                              {cObj.statute} • {cObj.timelines.czasowy[lang]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="wizard-footer">
                      <button
                        type="button"
                        className="btn btn--secondary"
                        id="wiz-prev-2"
                        onClick={() => setWizStep(1)}
                      >
                        {t.eligibility.backBtn}
                      </button>
                      <button
                        type="button"
                        className="btn btn--primary"
                        id="wiz-next-2"
                        onClick={() => setWizStep(3)}
                      >
                        {t.eligibility.nextToEmpBtn}
                      </button>
                    </div>
                  </motion.div>
                )}

                {wizStep === 3 && (
                  <motion.div
                    key="wiz-3"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h3 className="wizard-title">{t.eligibility.step3Title}</h3>
                    <p className="wizard-sub">{t.eligibility.step3Sub}</p>

                    <div className="option-grid" style={{ marginBottom: '20px' }}>
                      {t.eligibility.employments.map((emp) => (
                        <button
                          key={emp.value}
                          type="button"
                          className={`option-card ${empStatus === emp.value ? 'is-selected' : ''}`}
                          onClick={() => setEmpStatus(emp.value)}
                        >
                          <span className="option-card__title">{emp.title}</span>
                          <span className="option-card__meta">{emp.meta}</span>
                        </button>
                      ))}
                    </div>

                    <div className="wizard-footer">
                      <button
                        type="button"
                        className="btn btn--secondary"
                        id="wiz-prev-3"
                        onClick={() => setWizStep(2)}
                      >
                        {t.eligibility.backBtn}
                      </button>
                      <button
                        type="button"
                        className="btn btn--primary"
                        id="wiz-calculate-btn"
                        onClick={() => setWizStep(4)}
                      >
                        {t.eligibility.calcBtn}
                      </button>
                    </div>
                  </motion.div>
                )}

                {wizStep === 4 && (
                  <motion.div
                    key="wiz-4"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="result-dossier">
                      <span className="result-dossier__badge">{t.eligibility.resultBadge}</span>
                      <h4 id="result-permit-title">{rec.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {citizenship} → {rec.city} ({VOIVODESHIP_DATA[wizCity].portal})
                      </p>

                      <div className="result-stats-grid">
                        <div className="result-stat">
                          <span>{t.eligibility.statOffice}</span>
                          <strong>{rec.city}</strong>
                        </div>
                        <div className="result-stat">
                          <span>{t.eligibility.statTime}</span>
                          <strong>{rec.time}</strong>
                        </div>
                        <div className="result-stat">
                          <span>{t.eligibility.statFee}</span>
                          <strong>{rec.fee}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="option-grid" style={{ marginBottom: '18px' }}>
                      <div>
                        <label className="form-label" htmlFor="lead-name">
                          {t.eligibility.nameLabel}
                        </label>
                        <input
                          type="text"
                          id="lead-name"
                          className="form-input"
                          placeholder={t.eligibility.namePlaceholder}
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="lead-contact">
                          {t.eligibility.contactLabel}
                        </label>
                        <input
                          type="text"
                          id="lead-contact"
                          className="form-input"
                          placeholder={t.eligibility.contactPlaceholder}
                          value={leadContact}
                          onChange={(e) => setLeadContact(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="wizard-footer">
                      <button
                        type="button"
                        className="btn btn--secondary"
                        id="wiz-reset-btn"
                        onClick={() => {
                          setBookingConfirmed(false);
                          setWizStep(1);
                        }}
                      >
                        {t.eligibility.resetBtn}
                      </button>
                      <button
                        type="submit"
                        className="btn btn--primary"
                        id="wiz-submit-booking-btn"
                      >
                        {bookingConfirmed ? t.eligibility.submittedBtn : t.eligibility.submitBtn}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>
    );
  };

  const renderStoriesSection = () => (
    <section className="editorial-section editorial-section--stone" id="stories-section">
      <div className="container">
        <div className="section-header-split">
          <div>
            <span className="section-eyebrow">{t.stories.eyebrow}</span>
            <h2 className="section-title">{t.stories.title}</h2>
          </div>
          <div>
            <p className="section-subtitle">{t.stories.subtitle}</p>
            {page === 'home' && (
              <div style={{ marginTop: '14px' }}>
                <a
                  href={`/stories?lang=${lang}`}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    color: 'var(--brand-blue)'
                  }}
                >
                  {t.stories.viewAllBtn}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="stories-grid">
          {t.stories.items.map((story) => (
            <article key={story.name} className="story-card">
              <div>
                <div className="story-card__top">
                  <div className="candidate-profile">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="candidate-avatar"
                      width={58}
                      height={58}
                    />
                    <div className="candidate-meta">
                      <h3>
                        {story.name}{' '}
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                          [{story.flag}]
                        </span>
                      </h3>
                      <p>{story.role}</p>
                    </div>
                  </div>
                  <span className="duration-tag">{story.duration}</span>
                </div>

                <blockquote className="story-quote" style={{ marginTop: '18px' }}>
                  “{story.quote}”
                </blockquote>

                {page === 'stories' && (
                  <div
                    style={{
                      marginTop: '16px',
                      padding: '12px 16px',
                      backgroundColor: 'var(--bg-soft)',
                      borderRadius: '12px',
                      fontSize: '0.84rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <strong style={{ color: 'var(--brand-navy)' }}>CASE CHALLENGE:</strong> {story.challenge}
                  </div>
                )}
              </div>

              <div className="story-card__footer">
                <span>
                  {t.stories.permitPrefix} <strong>{story.permit}</strong>
                </span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>
                  ✓ {t.stories.verifiedDecision}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFaqSection = () => (
    <section className="editorial-section editorial-section--ivory" id="faq-section">
      <div className="container">
        <div className="section-header-split">
          <div>
            <span className="section-eyebrow">{t.faq.eyebrow}</span>
            <h2 className="section-title">{t.faq.title}</h2>
          </div>
          <p className="section-subtitle">{t.faq.subtitle}</p>
        </div>

        <div className="faq-list">
          {t.faq.items.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div className="faq-item" key={idx}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx + 1}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span>
                    <span className="faq-trigger__index">0{idx + 1} //</span>
                    {item.q}
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--brand-blue)' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="faq-answer">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header: Clean, Unclustered & Spacious */}
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} id="site-header">
        <div className="container nav-container">
          <a href={`/?lang=${lang}`} className="brand-logo-wrap" id="nav-brand-logo">
            <img
              src="/assets/images/mobilwork-logo.png"
              alt="MobilWork — Residence & Work in Poland"
              className="brand-logo-img"
              width={190}
              height={38}
            />
          </a>

          <nav className="nav-links" aria-label="Primary Navigation">
            {desktopNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="nav-link"
                id={`nav-link-${item.id}`}
                onClick={(e) => {
                  if (item.isAnchor && item.href.startsWith('#')) {
                    e.preventDefault();
                    smoothScrollTo(item.href);
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-right-meta">
            <div className="lang-pill-selector" role="group" aria-label="Select Language">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  id={`lang-btn-${l.code}`}
                  className={`lang-pill-btn ${lang === l.code ? 'is-active' : ''}`}
                  onClick={() => switchLanguage(l.code)}
                  title={l.nativeName}
                >
                  {l.shortLabel}
                </button>
              ))}
            </div>

            <a
              href={`/eligibility?lang=${lang}`}
              className="btn btn--primary btn--sm nav-cta-btn"
              id="nav-cta-eligibility"
            >
              <span>{t.nav.cta}</span>
              <span aria-hidden="true">→</span>
            </a>

            <button
              type="button"
              className="mobile-menu-btn"
              id="mobile-menu-open-btn"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div>
                <div className="mobile-drawer__header">
                  <img
                    src="/assets/images/mobilwork-logo.png"
                    alt="MobilWork"
                    style={{ height: '32px', width: 'auto' }}
                  />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    style={{ fontSize: '1.25rem', padding: '6px', color: 'var(--brand-navy)' }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      className={`btn btn--secondary btn--sm ${lang === l.code ? 'is-active' : ''}`}
                      style={{
                        flex: 1,
                        backgroundColor: lang === l.code ? 'var(--brand-blue)' : '#FFFFFF',
                        color: lang === l.code ? '#FFFFFF' : 'var(--brand-blue)'
                      }}
                      onClick={() => switchLanguage(l.code)}
                    >
                      {l.flag} {l.shortLabel}
                    </button>
                  ))}
                </div>

                <nav className="mobile-drawer__nav">
                  {navItems.map((item) => (
                    <a
                      key={item.route}
                      href={`${item.href}?lang=${lang}`}
                      className={`mobile-drawer__link ${page === item.route ? 'is-active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      <span>→</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--brand-blue-light)',
                    borderRadius: '16px',
                    fontSize: '0.84rem',
                    marginBottom: '14px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <strong style={{ display: 'block', color: 'var(--brand-navy)', marginBottom: '4px' }}>
                    Bydgoszcz Headquarters
                  </strong>
                  ul. Dworcowa 106-108, 85-010 Bydgoszcz
                  <br />
                  +48 571 436 605 • +48 609 162 266
                </div>
                <a
                  href={`/eligibility?lang=${lang}`}
                  className="btn btn--primary"
                  style={{ width: '100%' }}
                >
                  {t.nav.cta} →
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ====================================================================
         MAIN CONTENT
         ==================================================================== */}
      <main id="main-content">
        {/* ROUTE 1: HOME (Exact 1:1 Flyer Match + Full Portal Power) */}
        {page === 'home' && (
          <>
            <section className="hero-flyer-section" id="top">
              <div className="container hero-flyer-grid">
                {/* Left Column: Headline, Blue Bar, 3 Flyer Pillars, CTAs */}
                <motion.div
                  className="hero-flyer-left"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariant}
                >
                  <h1 className="hero-flyer-title">
                    {flyerHero.headline1}<br />
                    {flyerHero.headline2}
                  </h1>
                  <div className="hero-blue-bar" aria-hidden="true" />

                  {/* 3 Core Pillar Feature Blocks matching image.png */}
                  <div className="flyer-pillars">
                    {/* 1. Residence & Address Registration */}
                    <div className="flyer-pillar-card">
                      <div className="flyer-pillar-icon" aria-hidden="true">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <circle cx="8" cy="11.5" r="2.5" />
                          <line x1="14" y1="9" x2="19" y2="9" />
                          <line x1="14" y1="13" x2="19" y2="13" />
                          <line x1="6" y1="16" x2="18" y2="16" />
                        </svg>
                      </div>
                      <div className="flyer-pillar-content">
                        <h3>{flyerHero.pillars[0].title}</h3>
                        <p>{flyerHero.pillars[0].desc}</p>
                      </div>
                    </div>

                    {/* 2. Temporary Employment Agency */}
                    <div className="flyer-pillar-card">
                      <div className="flyer-pillar-icon" aria-hidden="true">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div className="flyer-pillar-content">
                        <h3>{flyerHero.pillars[1].title}</h3>
                        <p>{flyerHero.pillars[1].desc}</p>
                      </div>
                    </div>

                    {/* 3. Vehicle Services */}
                    <div className="flyer-pillar-card">
                      <div className="flyer-pillar-icon" aria-hidden="true">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2" />
                          <circle cx="7" cy="17" r="2" />
                          <circle cx="17" cy="17" r="2" />
                        </svg>
                      </div>
                      <div className="flyer-pillar-content">
                        <h3>{flyerHero.pillars[2].title}</h3>
                        <p>{flyerHero.pillars[2].desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (Unclustered & Crisp) */}
                  <div className="hero-cta-row">
                    <a href={`/eligibility?lang=${lang}`} className="btn btn--primary">
                      <span>{t.nav.cta}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={() => smoothScrollTo('#services-section')}
                    >
                      <span>{t.hero.exploreBtn}</span>
                    </button>
                  </div>
                </motion.div>

                {/* Right Column: Iconic Blue Curved Shape from image.png */}
                <motion.div
                  className="hero-flyer-right"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <div className="flyer-curved-banner">
                    {/* Poland map with Bydgoszcz pin */}
                    <div className="curved-map-wrap">
                      <img
                        src="/assets/images/poland-map-transparent.png"
                        alt="Map of Poland with Bydgoszcz office location"
                        className="curved-poland-map"
                        width={140}
                        height={124}
                      />
                    </div>

                    {/* Slogan: Work / Live / Be legal / in Poland */}
                    <div className="curved-slogan-wrap">
                      <div className="curved-slogan">
                        {flyerHero.slogan.line1}<br />
                        {flyerHero.slogan.line2}<br />
                        {flyerHero.slogan.line3}<br />
                        {flyerHero.slogan.line4}
                      </div>
                      <div className="curved-white-bar" aria-hidden="true" />
                    </div>

                    {/* Historic Bydgoszcz Granaries (Spichrze nad Brdą) - Prominent, Large & Crisp */}
                    <div className="curved-granary-wrap">
                      <img
                        src="/assets/images/spichrze-bydgoszcz-hd.png"
                        alt="Historic half-timbered granaries of Bydgoszcz (Spichrze nad Brdą)"
                        className="curved-granary-img"
                        width={510}
                        height={542}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Full-Bleed Contact Banner (Direct Match with Bottom of image.png) */}
              <div className="flyer-contact-bar">
                <div className="container">
                  {/* 3 Dedicated Phone Lines */}
                  <div className="flyer-phone-grid">
                    <div className="flyer-phone-col">
                      <div className="flyer-phone-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <div className="flyer-phone-meta">
                        <a href="tel:+48571436605">+48 571 436 605</a>
                        <span>{flyerHero.contactBar.englishLabel}</span>
                      </div>
                    </div>

                    <div className="flyer-phone-col">
                      <div className="flyer-phone-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <div className="flyer-phone-meta">
                        <a href="tel:+48609162266">+48 609 162 266</a>
                        <span>{flyerHero.contactBar.polishLabel}</span>
                      </div>
                    </div>

                    <div className="flyer-phone-col">
                      <div className="flyer-phone-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <div className="flyer-phone-meta">
                        <a href="tel:+48786443903">+48 786 443 903</a>
                        <span>{flyerHero.contactBar.russianLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Email, Address, Registration */}
                  <div className="flyer-contact-details">
                    <div className="flyer-details-left">
                      <span className="contact-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <a href="mailto:biuro.mobilwork@gmail.com">biuro.mobilwork@gmail.com</a>
                        <span style={{ opacity: 0.4 }}>|</span>
                        <a href="mailto:trc.mobilwork@gmail.com">trc.mobilwork@gmail.com</a>
                      </span>
                      <span className="contact-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <strong>MobilWork</strong> ul. Dworcowa 106-108, 85-010 Bydgoszcz
                      </span>
                    </div>
                    <div className="flyer-details-right">
                      <span>KRAZ: 34972</span>
                      <span style={{ margin: '0 8px', opacity: 0.5 }}>||</span>
                      <span>NIP: 4660297787</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {renderProcessSection()}
            {renderServicesSection()}
            {renderEligibilitySection()}
            {renderStoriesSection()}
            {renderFaqSection()}
          </>
        )}

        {/* ROUTE 2: DEDICATED RESIDENCE PERMITS PAGE */}
        {page === 'residence' && (
          <>
            <section className="page-hero">
              <div className="container">
                <span className="page-hero__kicker">{t.pages.residence.kicker}</span>
                <h1 className="page-hero__title">{t.pages.residence.title}</h1>
                <p className="page-hero__lead">{t.pages.residence.lead}</p>
              </div>
            </section>

            {renderServicesSection('residence')}

            <section className="editorial-section editorial-section--ivory">
              <div className="container">
                <h2 className="section-title" style={{ marginBottom: '28px' }}>
                  {t.pages.residence.comparisonTitle}
                </h2>
                <div className="editorial-table-wrap">
                  <table className="editorial-table">
                    <thead>
                      <tr>
                        {t.pages.residence.comparisonHeaders.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.pages.residence.comparisonRows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              style={
                                cIdx === 0
                                  ? { fontWeight: 800, color: 'var(--brand-navy)' }
                                  : cIdx === 1
                                  ? { fontFamily: 'var(--font-heading)', color: 'var(--brand-blue)', fontWeight: 700 }
                                  : undefined
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {renderEligibilitySection()}
            {renderFaqSection()}
          </>
        )}

        {/* ROUTE 3: DEDICATED WORK PERMITS PAGE */}
        {page === 'work' && (
          <>
            <section className="page-hero">
              <div className="container">
                <span className="page-hero__kicker">{t.pages.work.kicker}</span>
                <h1 className="page-hero__title">{t.pages.work.title}</h1>
                <p className="page-hero__lead">{t.pages.work.lead}</p>
              </div>
            </section>

            <section className="editorial-section editorial-section--ivory">
              <div className="container">
                <h2 className="section-title" style={{ marginBottom: '32px' }}>
                  {t.pages.work.typesTitle}
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px'
                  }}
                >
                  {t.pages.work.types.map((item) => (
                    <div
                      key={item.code}
                      style={{
                        border: '1.5px solid var(--border-medium)',
                        borderRadius: '20px',
                        backgroundColor: '#FFFFFF',
                        padding: '30px',
                        boxShadow: 'var(--shadow-card)'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          padding: '4px 12px',
                          borderRadius: '20px',
                          backgroundColor: 'var(--brand-blue)',
                          color: '#FFFFFF',
                          display: 'inline-block',
                          marginBottom: '14px'
                        }}
                      >
                        {item.code}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.45rem',
                          fontWeight: 800,
                          color: 'var(--brand-navy)',
                          marginBottom: '6px'
                        }}
                      >
                        {item.title}
                      </h3>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--brand-blue)',
                          marginBottom: '12px'
                        }}
                      >
                        {item.statute}
                      </div>
                      <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {renderServicesSection('work')}
            {renderEligibilitySection()}
          </>
        )}

        {/* ROUTE 4: DEDICATED 4-STAGE PROCESS PAGE */}
        {page === 'process' && (
          <>
            <section className="page-hero">
              <div className="container">
                <span className="page-hero__kicker">{t.process.eyebrow}</span>
                <h1 className="page-hero__title">{t.process.title}</h1>
                <p className="page-hero__lead">{t.process.subtitle}</p>
              </div>
            </section>

            {renderProcessSection()}

            <section className="editorial-section editorial-section--stone">
              <div className="container">
                <h2 className="section-title" style={{ marginBottom: '28px' }}>
                  Voivodeship Jurisdiction & Portal Directory (2026)
                </h2>
                <div className="editorial-table-wrap">
                  <table className="editorial-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Voivodeship Authority</th>
                        <th>Portal & Filing System</th>
                        <th>Single Permit (Art. 114)</th>
                        <th>EU Blue Card (Art. 127)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Object.keys(VOIVODESHIP_DATA) as CityKey[]).map((ck) => {
                        const v = VOIVODESHIP_DATA[ck];
                        return (
                          <tr key={ck}>
                            <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--brand-blue)' }}>
                              {v.code}
                            </td>
                            <td>
                              <strong>{v.labels[lang]}</strong>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {v.address}
                              </div>
                            </td>
                            <td style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                              {v.portal}
                            </td>
                            <td>{v.timelines.czasowy[lang]}</td>
                            <td>{v.timelines.bluecard[lang]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {renderEligibilitySection()}
          </>
        )}

        {/* ROUTE 5: DEDICATED CASE STUDIES PAGE */}
        {page === 'stories' && (
          <>
            <section className="page-hero">
              <div className="container">
                <span className="page-hero__kicker">{t.stories.eyebrow}</span>
                <h1 className="page-hero__title">{t.stories.title}</h1>
                <p className="page-hero__lead">{t.stories.subtitle}</p>
              </div>
            </section>

            {renderStoriesSection()}
            {renderEligibilitySection()}
          </>
        )}

        {/* ROUTE 6: DEDICATED ELIGIBILITY PAGE */}
        {page === 'eligibility' && (
          <>
            <section className="page-hero">
              <div className="container">
                <span className="page-hero__kicker">{t.eligibility.eyebrow}</span>
                <h1 className="page-hero__title">{t.eligibility.title}</h1>
                <p className="page-hero__lead">{t.eligibility.subtitle}</p>
              </div>
            </section>

            {renderEligibilitySection()}
            {renderFaqSection()}
          </>
        )}

        {/* ROUTE 7: DEDICATED LEGAL & RODO PAGE */}
        {page === 'legal' && (
          <>
            <section className="page-hero">
              <div className="container">
                <span className="page-hero__kicker">{t.pages.legal.kicker}</span>
                <h1 className="page-hero__title">{t.pages.legal.title}</h1>
                <p className="page-hero__lead">{t.pages.legal.lead}</p>
              </div>
            </section>

            <section className="editorial-section editorial-section--ivory">
              <div className="container" style={{ maxWidth: '940px' }}>
                {t.pages.legal.sections.map((sec) => (
                  <article
                    key={sec.id}
                    id={sec.id}
                    style={{
                      padding: '32px',
                      borderRadius: '20px',
                      border: '1.5px solid var(--border-medium)',
                      backgroundColor: '#FFFFFF',
                      marginBottom: '24px',
                      boxShadow: 'var(--shadow-card)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78rem',
                        color: 'var(--brand-blue)',
                        fontWeight: 800,
                        display: 'block',
                        marginBottom: '8px'
                      }}
                    >
                      {sec.code}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '1.65rem',
                        color: 'var(--brand-navy)',
                        marginBottom: '12px'
                      }}
                    >
                      {sec.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.98rem' }}>
                      {sec.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* ====================================================================
         FOOTER
         ==================================================================== */}
      <footer className="site-footer" id="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href={`/?lang=${lang}`} className="brand-logo-wrap" style={{ marginBottom: '18px', display: 'inline-block' }}>
                <img
                  src="/assets/images/mobilwork-logo.png"
                  alt="MobilWork"
                  style={{ height: '36px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
              </a>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-on-dark-muted)',
                  marginBottom: '18px',
                  lineHeight: 1.65
                }}
              >
                {t.footer.brandDesc}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                <span style={{ border: '1px solid var(--border-dark-bar)', padding: '5px 10px', borderRadius: '6px' }}>
                  KRAZ: 34972
                </span>
                <span style={{ border: '1px solid var(--border-dark-bar)', padding: '5px 10px', borderRadius: '6px' }}>
                  NIP: 4660297787
                </span>
                <span style={{ border: '1px solid var(--border-dark-bar)', padding: '5px 10px', borderRadius: '6px' }}>
                  RODO / GDPR
                </span>
              </div>
            </div>

            <div className="footer-col">
              <h3>{t.footer.navTitle}</h3>
              <ul className="footer-links">
                {navItems.map((item) => (
                  <li key={item.route}>
                    <a href={`${item.href}?lang=${lang}`}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h3>{t.footer.officesTitle}</h3>
              <div className="office-card">
                <strong>Bydgoszcz Headquarters</strong>
                ul. Dworcowa 106-108, 85-010 Bydgoszcz
                <br />
                +48 571 436 605 • +48 609 162 266
                <br />
                biuro.mobilwork@gmail.com
              </div>
              <div className="office-card">
                <strong>Warsaw Branch Office</strong>
                ul. Złota 59 (Skylight Building, 14th Fl), 00-120 Warszawa
                <br />
                +48 22 690 41 10 • warsaw@mobilwork.pl
              </div>
            </div>

            <div className="footer-col">
              <h3>{t.footer.newsletterTitle}</h3>
              <p
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--text-on-dark-muted)',
                  marginBottom: '14px',
                  lineHeight: 1.5
                }}
              >
                {t.footer.newsletterDesc}
              </p>
              <form onSubmit={handleNewsletterSubmit} id="newsletter-form">
                <input
                  type="email"
                  id="newsletter-email"
                  className="form-input"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    borderColor: 'var(--border-dark-bar)',
                    color: '#FFFFFF',
                    marginBottom: '10px'
                  }}
                  placeholder={t.footer.newsletterPlaceholder}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn--primary btn--sm"
                  id="newsletter-submit-btn"
                  style={{ width: '100%' }}
                >
                  {t.footer.newsletterBtn}
                </button>
                {newsletterStatus && (
                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '0.8rem',
                      color: '#6EE7B7',
                      fontWeight: 700
                    }}
                  >
                    {newsletterStatus}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="footer-disclaimer">
            <strong style={{ color: '#FFFFFF' }}>{t.footer.disclaimerTitle}</strong>{' '}
            {t.footer.disclaimerText}
          </div>

          <div className="footer-bottom">
            <span>© 2026 MobilWork Sp. z o.o. Bydgoszcz, Poland. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href={`/legal?lang=${lang}#rodo`}>{t.footer.privacyLink}</a>
              <a href={`/legal?lang=${lang}#proxy`}>{t.footer.termsLink}</a>
              <a href={`/legal?lang=${lang}#cookies`}>{t.footer.cookiesLink}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Animated Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            className="toast-notification"
            id="toast-notification"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span style={{ color: '#34D399', fontSize: '1.1rem' }}>●</span>
            <span id="toast-message">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
