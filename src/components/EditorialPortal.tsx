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
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1]
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
  const [selectedCity, setSelectedCity] = useState<CityKey>('warsaw');
  const [serviceFilter, setServiceFilter] = useState<'all' | 'residence' | 'work' | 'family'>('all');
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({ czasowy: true });
  const [highlightedPermit, setHighlightedPermit] = useState<PermitKey | null>(null);

  // 3. 4-Stage Process Stepper State
  const [activeStep, setActiveStep] = useState<number>(0);

  // 4. Multi-Step Eligibility Wizard State
  const [wizStep, setWizStep] = useState<1 | 2 | 3 | 4>(1);
  const [citizenship, setCitizenship] = useState<string>('India');
  const [stayStatus, setStayStatus] = useState<string>('in-poland-visa');
  const [wizCity, setWizCity] = useState<CityKey>('warsaw');
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
    // Restore saved language or URL ?lang= parameter
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

    // Initialize Lenis Smooth Scrolling
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
      lenisRef.current.scrollTo(el, { offset: -88 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = TRANSLATIONS[lang];
  const currentCityObj = VOIVODESHIP_DATA[selectedCity];
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

  // Reusable Section Renderers
  const renderProcessSection = () => {
    const stepData = t.process.steps[activeStep] || t.process.steps[0];
    return (
      <section className="editorial-section editorial-section--ivory" id="process-section">
        <div className="container">
          <motion.div
            className="section-header-split"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
          >
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
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: 'var(--accent-prussian)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    {t.process.fullPageLink}
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* 4-Stage Interactive Stepper Grid */}
          <div className="stepper-grid" role="tablist" aria-label="4-Stage Permit Protocol">
            {t.process.steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <motion.button
                  key={step.num}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`step-card ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18 }}
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
                </motion.button>
              );
            })}
          </div>

          {/* Animated Step Detail Dossier */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-step-${activeStep}`}
              className="step-detail-box"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      textTransform: 'uppercase',
                      color: 'var(--accent-emerald)',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '6px'
                    }}
                  >
                    KPA ART. 32 • STATUTORY PROTECTION
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
          <motion.div
            className="section-header-split"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
          >
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
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent-prussian)',
                      textTransform: 'uppercase'
                    }}
                  >
                    {t.services.exploreResidencePage}
                  </a>
                  <a
                    href={`/work-permits?lang=${lang}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent-prussian)',
                      textTransform: 'uppercase'
                    }}
                  >
                    {t.services.exploreWorkPage}
                  </a>
                </div>
              )}
            </div>
          </motion.div>

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

          {/* Animated Services Grid */}
          <motion.div layout className="services-grid" id="services-grid">
            <AnimatePresence mode="popLayout">
              {filteredCards.map((card) => {
                const isOpen = !!openDrawers[card.key];
                const isHighlighted = highlightedPermit === card.key;
                const cityTimeline = VOIVODESHIP_DATA[selectedCity].timelines[card.key][lang];

                return (
                  <motion.article
                    layout
                    key={card.key}
                    id={`service-card-${card.key}`}
                    className={`service-card ${isHighlighted ? 'is-highlighted' : ''}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.32 }}
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
                            <span className="service-features__bullet">—</span>
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
                            transition={{ duration: 0.25 }}
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
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
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
                    transition={{ duration: 0.24 }}
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
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
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
                    transition={{ duration: 0.24 }}
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
                    transition={{ duration: 0.24 }}
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
                    transition={{ duration: 0.25 }}
                  >
                    <div className="result-dossier">
                      <span className="result-dossier__badge">{t.eligibility.resultBadge}</span>
                      <h4 id="result-permit-title">{rec.title}</h4>
                      <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)' }}>
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
        <motion.div
          className="section-header-split"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
        >
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
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--accent-prussian)',
                    textTransform: 'uppercase'
                  }}
                >
                  {t.stories.viewAllBtn}
                </a>
              </div>
            )}
          </div>
        </motion.div>

        <div className="stories-grid">
          {t.stories.items.map((story, idx) => (
            <motion.article
              key={story.name}
              className="story-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={idx * 0.08}
              variants={fadeUpVariant}
            >
              <div>
                <div className="story-card__top">
                  <div className="candidate-profile">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="candidate-avatar"
                      width={56}
                      height={56}
                    />
                    <div className="candidate-meta">
                      <h3>
                        {story.name}{' '}
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
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
                      padding: '12px',
                      backgroundColor: 'var(--bg-paper)',
                      border: '1px solid var(--hairline)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--ink-secondary)'
                    }}
                  >
                    <strong>CASE CHALLENGE:</strong> {story.challenge}
                  </div>
                )}
              </div>

              <div className="story-card__footer">
                <span>
                  {t.stories.permitPrefix} <strong>{story.permit}</strong>
                </span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  ✓ {t.stories.verifiedDecision}
                </span>
              </div>
            </motion.article>
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
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
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

      {/* Editorial Archival Topbar */}
      <div className="editorial-topbar">
        <div className="container editorial-topbar__inner">
          <span>{t.meta.issueTag}</span>
          <span className="editorial-topbar__status">
            <span className="status-dot" />
            <span>{t.meta.lenisStatus}</span>
            <span>• BYDGOSZCZ & WARSAW</span>
          </span>
        </div>
      </div>

      {/* Sticky Editorial Navigation Header */}
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} id="site-header">
        <div className="container nav-container">
          <a href={`/?lang=${lang}`} className="brand-logo" id="nav-brand-logo">
            <span className="brand-logo__mark" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span className="brand-logo__text">
              <span className="brand-logo__title">
                Mobil<span className="brand-logo__accent">Work</span>
              </span>
              <span className="brand-logo__tag">{t.meta.brandTagline}</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary Editorial Navigation">
            {navItems.map((item) => {
              const isActive = page === item.route;
              return (
                <a
                  key={item.route}
                  href={`${item.href}?lang=${lang}`}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                  id={`nav-link-${item.route}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="editorial-nav-underline"
                      className="nav-link__underline"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="nav-actions">
            {/* Working 4-Language Switcher (EN / PL / UA / ES) */}
            <div
              className="lang-switcher"
              id="language-switcher-btn"
              role="group"
              aria-label="Select Interface Language"
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  id={`lang-btn-${l.code}`}
                  className={`lang-option-btn ${lang === l.code ? 'is-active' : ''}`}
                  onClick={() => switchLanguage(l.code)}
                  title={l.nativeName}
                >
                  {l.shortLabel}
                </button>
              ))}
            </div>

            <a
              href={`/eligibility?lang=${lang}`}
              className="btn btn--primary btn--sm"
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer with Framer Motion */}
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
                  <span className="brand-logo__title">
                    Mobil<span className="brand-logo__accent">Work</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    style={{ padding: '6px', fontFamily: 'var(--font-mono)' }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ marginTop: '14px', display: 'flex', gap: '6px' }}>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      className={`lang-option-btn ${lang === l.code ? 'is-active' : ''}`}
                      style={{ border: '1px solid var(--hairline-strong)', flex: 1 }}
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
                    padding: '14px',
                    backgroundColor: 'var(--bg-stone)',
                    border: '1px solid var(--hairline-strong)',
                    fontSize: '0.8rem',
                    marginBottom: '12px'
                  }}
                >
                  <strong style={{ display: 'block', marginBottom: '4px' }}>
                    {t.nav.mobileOfficeTitle}
                  </strong>
                  {t.nav.mobileOfficeDesc}
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
         MAIN ROUTE CONTENT
         ==================================================================== */}
      <main id="main-content">
        {/* ROUTE 1: HOME OVERVIEW */}
        {page === 'home' && (
          <>
            <section className="hero-section" id="top">
              <div className="container hero-grid">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariant}
                >
                  <div className="hero-kicker">
                    <span className="hero-kicker__badge">{t.hero.eyebrow}</span>
                    <span className="hero-kicker__text">{t.hero.eyebrowSub}</span>
                  </div>

                  <h1 className="hero-title">
                    {t.hero.titleStart} <em>{t.hero.titleItalic}</em> {t.hero.titleEnd}
                  </h1>

                  <p className="hero-subtitle">{t.hero.subtitle}</p>

                  {/* Dual-Action Permit & Voivodeship Ledger Widget */}
                  <div className="hero-ledger-widget" role="search">
                    <div className="hero-ledger-widget__top">
                      <span className="hero-ledger-widget__title">{t.hero.widgetTitle}</span>
                      <span className="hero-ledger-widget__stamp">{t.hero.widgetBadge}</span>
                    </div>

                    <div className="hero-ledger-controls">
                      <div className="ledger-field">
                        <label htmlFor="hero-permit-select">{t.hero.fieldPermit}</label>
                        <select
                          id="hero-permit-select"
                          className="ledger-select"
                          value={selectedPermit}
                          onChange={(e) => setSelectedPermit(e.target.value as PermitKey)}
                        >
                          <option value="czasowy">{t.hero.permitOptions.czasowy}</option>
                          <option value="work">{t.hero.permitOptions.work}</option>
                          <option value="bluecard">{t.hero.permitOptions.bluecard}</option>
                          <option value="family">{t.hero.permitOptions.family}</option>
                        </select>
                      </div>

                      <div className="ledger-field">
                        <label htmlFor="hero-city-select">{t.hero.fieldCity}</label>
                        <select
                          id="hero-city-select"
                          className="ledger-select"
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value as CityKey)}
                        >
                          {(Object.keys(VOIVODESHIP_DATA) as CityKey[]).map((ck) => (
                            <option key={ck} value={ck}>
                              {VOIVODESHIP_DATA[ck].labels[lang]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="hero-ledger-actions">
                      <button
                        type="button"
                        className="btn btn--primary"
                        id="hero-explore-permit-btn"
                        onClick={handleHeroMatch}
                      >
                        <span>{t.hero.exploreBtn}</span>
                        <span aria-hidden="true">→</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn--secondary"
                        id="hero-start-check-btn"
                        onClick={() => handlePreselectEligibility(selectedPermit)}
                      >
                        <span>{t.hero.checkBtn}</span>
                      </button>
                    </div>

                    <div className="hero-ledger-preview" aria-live="polite">
                      <span id="hero-preview-text">
                        {t.hero.estDecisionPrefix} {currentCityObj.labels[lang]}:{' '}
                        <strong>{currentTimeline}</strong>
                      </span>
                      <span id="hero-preview-fee">
                        {t.hero.stampFeePrefix} <strong>{currentFee}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="hero-reassurance-row">
                    <span className="hero-reassurance-item">
                      <span className="hero-reassurance-item__dot" />
                      {t.hero.reassurance1}
                    </span>
                    <span className="hero-reassurance-item">
                      <span className="hero-reassurance-item__dot" />
                      {t.hero.reassurance2}
                    </span>
                    <span className="hero-reassurance-item">
                      <span className="hero-reassurance-item__dot" />
                      {t.hero.reassurance3}
                    </span>
                  </div>
                </motion.div>

                {/* Right Column: Editorial Photography Composition */}
                <motion.div
                  className="hero-editorial-gallery"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12 }}
                >
                  <div className="editorial-stamp-badge">
                    <span>ARCHIVE RECORD // URZĄD WOJEWÓDZKI</span>
                    <strong>
                      {t.hero.collageIssued} • {t.hero.collageVerified}
                    </strong>
                  </div>

                  <figure className="editorial-frame editorial-frame--main">
                    <img
                      src="/assets/images/hero-warsaw.jpg"
                      alt={t.hero.collageMainTitle}
                      width={640}
                      height={480}
                    />
                    <figcaption className="editorial-caption">
                      <div>
                        <strong>{t.hero.collageMainTitle}</strong>
                        <span>{t.hero.collageMainSub}</span>
                      </div>
                      <span className="editorial-caption__tag">{t.hero.collageMainTag}</span>
                    </figcaption>
                  </figure>

                  <figure className="editorial-frame editorial-frame--sub">
                    <img
                      src="/assets/images/candidate-krakow.jpg"
                      alt={t.hero.collageLeftTitle}
                      width={320}
                      height={320}
                    />
                    <figcaption className="editorial-caption">
                      <div>
                        <strong>{t.hero.collageLeftTitle}</strong>
                        <span>{t.hero.collageLeftSub}</span>
                      </div>
                      <span className="editorial-caption__tag">{t.hero.collageLeftTag}</span>
                    </figcaption>
                  </figure>

                  <figure className="editorial-frame editorial-frame--sub">
                    <img
                      src="/assets/images/candidate-gdansk.jpg"
                      alt={t.hero.collageRightTitle}
                      width={320}
                      height={320}
                    />
                    <figcaption className="editorial-caption">
                      <div>
                        <strong>{t.hero.collageRightTitle}</strong>
                        <span>{t.hero.collageRightSub}</span>
                      </div>
                      <span className="editorial-caption__tag">{t.hero.collageRightTag}</span>
                    </figcaption>
                  </figure>
                </motion.div>
              </div>
            </section>

            {/* 4-Column Hairline Metrics Strip */}
            <section className="metrics-strip" aria-label="Key Practice Metrics">
              <div className="container">
                <div className="metrics-grid">
                  {t.metrics.map((m) => (
                    <div className="metric-cell" key={m.index}>
                      <span className="metric-cell__index">METRIC // {m.index}</span>
                      <div className="metric-cell__value">{m.value}</div>
                      <div className="metric-cell__label">{m.label}</div>
                    </div>
                  ))}
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

        {/* ROUTE 2: DEDICATED RESIDENCE PERMITS PAGE (/residence-permits) */}
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
                                  ? { fontWeight: 700 }
                                  : cIdx === 1
                                  ? { fontFamily: 'var(--font-mono)', color: 'var(--accent-prussian)' }
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

        {/* ROUTE 3: DEDICATED WORK PERMITS PAGE (/work-permits) */}
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
                        border: '1px solid var(--ink-primary)',
                        backgroundColor: 'var(--bg-paper)',
                        padding: '28px'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          backgroundColor: 'var(--bg-ink)',
                          color: 'var(--ink-on-dark)',
                          display: 'inline-block',
                          marginBottom: '14px'
                        }}
                      >
                        {item.code}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.65rem',
                          fontWeight: 400,
                          marginBottom: '6px'
                        }}
                      >
                        {item.title}
                      </h3>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--accent-prussian)',
                          marginBottom: '12px'
                        }}
                      >
                        {item.statute}
                      </div>
                      <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)' }}>
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

        {/* ROUTE 4: DEDICATED 4-STAGE PROCESS & VOIVODESHIP REGISTRY PAGE (/process) */}
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
                            <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                              {v.code}
                            </td>
                            <td>
                              <strong>{v.labels[lang]}</strong>
                              <div style={{ fontSize: '0.76rem', color: 'var(--ink-muted)' }}>
                                {v.address}
                              </div>
                            </td>
                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
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

        {/* ROUTE 5: DEDICATED CASE STUDIES & STORIES PAGE (/stories) */}
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

        {/* ROUTE 6: DEDICATED ELIGIBILITY & OFFICES PAGE (/eligibility) */}
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

        {/* ROUTE 7: DEDICATED LEGAL, RODO & PROXY TERMS PAGE (/legal) */}
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
                      border: '1px solid var(--ink-primary)',
                      backgroundColor: 'var(--bg-paper)',
                      marginBottom: '24px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--accent-prussian)',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: '8px'
                      }}
                    >
                      {sec.code}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 400,
                        fontSize: '1.85rem',
                        marginBottom: '12px'
                      }}
                    >
                      {sec.title}
                    </h2>
                    <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.75 }}>{sec.body}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* ====================================================================
         EDITORIAL FOOTER
         ==================================================================== */}
      <footer className="site-footer" id="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href={`/?lang=${lang}`} className="brand-logo" style={{ marginBottom: '16px' }}>
                <span
                  className="brand-logo__mark"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  MW
                </span>
                <span className="brand-logo__text">
                  <span className="brand-logo__title" style={{ color: '#F7F5F0' }}>
                    Mobil<span className="brand-logo__accent" style={{ color: '#93C5FD' }}>Work</span>
                  </span>
                  <span className="brand-logo__tag">{t.meta.brandTagline}</span>
                </span>
              </a>
              <p
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--ink-on-dark-muted)',
                  marginBottom: '16px',
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
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem'
                }}
              >
                <span style={{ border: '1px solid var(--hairline-light)', padding: '4px 8px' }}>
                  KRS: 0000894120
                </span>
                <span style={{ border: '1px solid var(--hairline-light)', padding: '4px 8px' }}>
                  NIP: 5542981042
                </span>
                <span style={{ border: '1px solid var(--hairline-light)', padding: '4px 8px' }}>
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
                <strong>{t.footer.bydgoszczTitle}</strong>
                ul. Gdańska 47, 3rd Floor, 85-005 Bydgoszcz
                <br />
                +48 52 511 84 20 • bydgoszcz@mobilwork.pl
              </div>
              <div className="office-card">
                <strong>{t.footer.warsawTitle}</strong>
                ul. Złota 59 (Skylight, 14th Fl), 00-120 Warszawa
                <br />
                +48 22 690 41 10 • warsaw@mobilwork.pl
              </div>
            </div>

            <div className="footer-col">
              <h3>{t.footer.newsletterTitle}</h3>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--ink-on-dark-muted)',
                  marginBottom: '12px'
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
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderColor: 'var(--hairline-light)',
                    color: '#F7F5F0',
                    marginBottom: '8px'
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
                  style={{
                    width: '100%',
                    backgroundColor: '#F7F5F0',
                    color: '#111317'
                  }}
                >
                  {t.footer.newsletterBtn}
                </button>
                {newsletterStatus && (
                  <div
                    style={{
                      marginTop: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#6EE7B7'
                    }}
                  >
                    {newsletterStatus}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="footer-disclaimer">
            <strong style={{ color: '#F7F5F0' }}>{t.footer.disclaimerTitle}</strong>{' '}
            {t.footer.disclaimerText}
          </div>

          <div className="footer-bottom">
            <span>{t.footer.copyright}</span>
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
            <span style={{ color: '#34D399' }}>●</span>
            <span id="toast-message">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
