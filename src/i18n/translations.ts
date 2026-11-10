export type LangCode = 'en' | 'pl' | 'ua' | 'es';

export interface LanguageMeta {
  code: LangCode;
  shortLabel: string;
  nativeName: string;
  flag: string;
  announcement: string;
}

export const LANGUAGES: LanguageMeta[] = [
  {
    code: 'en',
    shortLabel: 'EN',
    nativeName: 'English',
    flag: '🇬🇧',
    announcement: 'Language switched to English — Full legal & consultation support available.'
  },
  {
    code: 'pl',
    shortLabel: 'PL',
    nativeName: 'Polski',
    flag: '🇵🇱',
    announcement: 'Zmieniono język na Polski — Pełna obsługa prawna przed Urzędem Wojewódzkim.'
  },
  {
    code: 'ua',
    shortLabel: 'UA',
    nativeName: 'Українська',
    flag: '🇺🇦',
    announcement: 'Мову змінено на українську — Повний юридичний супровід у всіх 16 воєводствах.'
  },
  {
    code: 'es',
    shortLabel: 'ES',
    nativeName: 'Español',
    flag: '🇪🇸',
    announcement: 'Idioma cambiado a Español — Representación legal completa en toda Polonia.'
  }
];

export const VOIVODESHIP_DATA = {
  warsaw: {
    code: 'MAZ',
    statute: 'Mazowiecki Urząd Wojewódzki',
    labels: {
      en: 'Warsaw (Mazowieckie)',
      pl: 'Warszawa (Mazowieckie)',
      ua: 'Варшава (Мазовецьке)',
      es: 'Varsovia (Mazovia)'
    },
    timelines: {
      czasowy: { en: '3.5 – 4.5 Months', pl: '3,5 – 4,5 Miesiąca', ua: '3,5 – 4,5 Місяці', es: '3,5 – 4,5 Meses' },
      work: { en: '3 – 4 Weeks', pl: '3 – 4 Tygodnie', ua: '3 – 4 Тижні', es: '3 – 4 Semanas' },
      bluecard: { en: '2.5 – 3.5 Months', pl: '2,5 – 3,5 Miesiąca', ua: '2,5 – 3,5 Місяці', es: '2,5 – 3,5 Meses' },
      family: { en: '3.5 – 4.5 Months', pl: '3,5 – 4,5 Miesiąca', ua: '3,5 – 4,5 Місяці', es: '3,5 – 4,5 Meses' }
    },
    portal: 'INPOL + MOS Digital Queue',
    address: 'ul. Marszałkowska 3/5, 00-624 Warszawa'
  },
  bydgoszcz: {
    code: 'KUJ',
    statute: 'Kujawsko-Pomorski Urząd Wojewódzki',
    labels: {
      en: 'Bydgoszcz / Toruń (Kujawsko-Pomorskie)',
      pl: 'Bydgoszcz / Toruń (Kujawsko-Pomorskie)',
      ua: 'Бидгощ / Торунь (Куявсько-Поморське)',
      es: 'Bydgoszcz / Toruń (Cuyavia y Pomerania)'
    },
    timelines: {
      czasowy: { en: '3 – 4 Months', pl: '3 – 4 Miesiące', ua: '3 – 4 Місяці', es: '3 – 4 Meses' },
      work: { en: '2.5 – 3.5 Weeks', pl: '2,5 – 3,5 Tygodnia', ua: '2,5 – 3,5 Тижні', es: '2,5 – 3,5 Semanas' },
      bluecard: { en: '2 – 3 Months', pl: '2 – 3 Miesiące', ua: '2 – 3 Місяці', es: '2 – 3 Meses' },
      family: { en: '3 – 4 Months', pl: '3 – 4 Miesiące', ua: '3 – 4 Місяці', es: '3 – 4 Meses' }
    },
    portal: 'Direct Registry & Priority Slot',
    address: 'ul. Konarskiego 1-3, 85-066 Bydgoszcz'
  },
  krakow: {
    code: 'MAL',
    statute: 'Małopolski Urząd Wojewódzki',
    labels: {
      en: 'Kraków (Małopolskie)',
      pl: 'Kraków (Małopolskie)',
      ua: 'Краків (Малопольське)',
      es: 'Cracovia (Pequeña Polonia)'
    },
    timelines: {
      czasowy: { en: '3.5 – 4.5 Months', pl: '3,5 – 4,5 Miesiąca', ua: '3,5 – 4,5 Місяці', es: '3,5 – 4,5 Meses' },
      work: { en: '3 – 5 Weeks', pl: '3 – 5 Tygodni', ua: '3 – 5 Тижнів', es: '3 – 5 Semanas' },
      bluecard: { en: '2.5 – 3.5 Months', pl: '2,5 – 3,5 Miesiąca', ua: '2,5 – 3,5 Місяці', es: '2,5 – 3,5 Meses' },
      family: { en: '3.5 – 4 Months', pl: '3,5 – 4 Miesiące', ua: '3,5 – 4 Місяці', es: '3,5 – 4 Meses' }
    },
    portal: 'MOS + Małopolska Proxy Desk',
    address: 'ul. Przy Rondzie 6, 31-547 Kraków'
  },
  wroclaw: {
    code: 'DOL',
    statute: 'Dolnośląski Urząd Wojewódzki',
    labels: {
      en: 'Wrocław (Dolnośląskie)',
      pl: 'Wrocław (Dolnośląskie)',
      ua: 'Вроцлав (Нижньосілезьке)',
      es: 'Breslavia (Baja Silesia)'
    },
    timelines: {
      czasowy: { en: '4 – 5 Months', pl: '4 – 5 Miesięcy', ua: '4 – 5 Місяців', es: '4 – 5 Meses' },
      work: { en: '4 – 5 Weeks', pl: '4 – 5 Tygodni', ua: '4 – 5 Тижнів', es: '4 – 5 Semanas' },
      bluecard: { en: '3 – 4 Months', pl: '3 – 4 Miesiące', ua: '3 – 4 Місяці', es: '3 – 4 Meses' },
      family: { en: '4 – 5 Months', pl: '4 – 5 Miesięcy', ua: '4 – 5 Місяців', es: '4 – 5 Meses' }
    },
    portal: 'Przybysz Portal + Legal Proxy',
    address: 'pl. Powstańców Warszawy 1, 50-153 Wrocław'
  },
  gdansk: {
    code: 'POM',
    statute: 'Pomorski Urząd Wojewódzki',
    labels: {
      en: 'Gdańsk / Tricity (Pomorskie)',
      pl: 'Gdańsk / Trójmiasto (Pomorskie)',
      ua: 'Гданськ / Тримісто (Поморське)',
      es: 'Gdańsk / Triciudad (Pomerania)'
    },
    timelines: {
      czasowy: { en: '3 – 4 Months', pl: '3 – 4 Miesiące', ua: '3 – 4 Місяці', es: '3 – 4 Meses' },
      work: { en: '3 – 4 Weeks', pl: '3 – 4 Tygodnie', ua: '3 – 4 Тижні', es: '3 – 4 Semanas' },
      bluecard: { en: '2.5 – 3.5 Months', pl: '2,5 – 3,5 Miesiąca', ua: '2,5 – 3,5 Місяці', es: '2,5 – 3,5 Meses' },
      family: { en: '3 – 4 Months', pl: '3 – 4 Miesiące', ua: '3 – 4 Місяці', es: '3 – 4 Meses' }
    },
    portal: 'Klient PUW + Fast Audit',
    address: 'ul. Okopowa 21/27, 80-810 Gdańsk'
  },
  poznan: {
    code: 'WLK',
    statute: 'Wielkopolski Urząd Wojewódzki',
    labels: {
      en: 'Poznań (Wielkopolskie)',
      pl: 'Poznań (Wielkopolskie)',
      ua: 'Познань (Великопольське)',
      es: 'Poznań (Gran Polonia)'
    },
    timelines: {
      czasowy: { en: '3.5 – 4.5 Months', pl: '3,5 – 4,5 Miesiąca', ua: '3,5 – 4,5 Місяці', es: '3,5 – 4,5 Meses' },
      work: { en: '3 – 4 Weeks', pl: '3 – 4 Tygodnie', ua: '3 – 4 Тижні', es: '3 – 4 Semanas' },
      bluecard: { en: '2.5 – 3.5 Months', pl: '2,5 – 3,5 Miesiąca', ua: '2,5 – 3,5 Місяці', es: '2,5 – 3,5 Meses' },
      family: { en: '3.5 – 4.5 Months', pl: '3,5 – 4,5 Miesiąca', ua: '3,5 – 4,5 Місяці', es: '3,5 – 4,5 Meses' }
    },
    portal: 'Cudzoziemcy WUW + Proxy',
    address: 'pl. Wolności 17, 61-739 Poznań'
  }
} as const;

export type CityKey = keyof typeof VOIVODESHIP_DATA;
export type PermitKey = 'czasowy' | 'work' | 'bluecard' | 'family';

export const PERMIT_FEES: Record<PermitKey, Record<LangCode, string>> = {
  czasowy: {
    en: '440 PLN + 100 PLN Card',
    pl: '440 PLN + 100 PLN Karta',
    ua: '440 PLN + 100 PLN Картка',
    es: '440 PLN + 100 PLN Tarjeta'
  },
  work: {
    en: '100 PLN (Employer Fee)',
    pl: '100 PLN (Opłata pracodawcy)',
    ua: '100 PLN (Збір роботодавця)',
    es: '100 PLN (Tasa del empleador)'
  },
  bluecard: {
    en: '440 PLN + 100 PLN Card',
    pl: '440 PLN + 100 PLN Karta',
    ua: '440 PLN + 100 PLN Картка',
    es: '440 PLN + 100 PLN Tarjeta'
  },
  family: {
    en: '340 PLN + 100 PLN Card',
    pl: '340 PLN + 100 PLN Karta',
    ua: '340 PLN + 100 PLN Картка',
    es: '340 PLN + 100 PLN Tarjeta'
  }
};

export const TRANSLATIONS = {
  en: {
    meta: {
      issueTag: 'LEGAL PRACTICE • ACT ON FOREIGNERS (DZ.U. 2026) • ALL 16 VOIVODESHIPS',
      brandTagline: 'Karta Pobytu & Work Permits',
      lenisStatus: 'Lenis Smooth Scroll Active'
    },
    nav: {
      home: 'Overview',
      residence: 'Residence Permits',
      work: 'Work Permits',
      process: 'The Process',
      stories: 'Case Studies',
      eligibility: 'Eligibility',
      legal: 'Legal & RODO',
      cta: 'Check Eligibility',
      mobileOfficeTitle: 'Bydgoszcz & Warsaw Desks',
      mobileOfficeDesc: 'Licensed administrative proxies (Pełnomocnicy) across all 16 Polish Voivodeships. Mon–Fri 08:30–18:00 CET.'
    },
    hero: {
      eyebrow: '98.4% FIRST-FILING APPROVAL RATE',
      eyebrowSub: 'Licensed Administrative Representatives in All 16 Polish Voivodeships',
      titleStart: 'Your Path to Living & Working in',
      titleItalic: 'Poland,',
      titleEnd: 'Distilled to Precision.',
      subtitle:
        'Skip confusing Polish bureaucracy, long Urząd queues, and formal defect delays. Our bilingual legal proxies prepare, audit, and represent your Karta Pobytu or Work Permit from day one until the plastic card is in your hands.',
      widgetTitle: 'Instant Permit & Voivodeship Ledger',
      widgetBadge: 'Art. 108 Legal Stay Stamp on Day 1',
      fieldPermit: '01 / Select Permit Type',
      fieldCity: '02 / Select Voivodeship Jurisdiction',
      permitOptions: {
        czasowy: 'Temporary Residence (Karta Pobytu Czasowego)',
        work: 'Work Permit (Zezwolenie Typ A / B)',
        bluecard: 'EU Blue Card (High-Skill IT & Engineering)',
        family: 'Family Reunification (Spouse & Children)'
      },
      exploreBtn: 'Match My Permit & Timeline',
      checkBtn: 'Open 60s Eligibility Audit',
      estDecisionPrefix: 'Est. Decision in',
      stampFeePrefix: 'Statutory Stamp Fee:',
      reassurance1: 'Fixed Written Contract — Zero Hidden Fees',
      reassurance2: 'Sworn Polish Translators Included',
      reassurance3: 'In-Person Urząd Biometrics Accompaniment',
      collageIssued: '4,280+ Cards Issued',
      collageVerified: 'Verified Urząd Wojewódzki Decisions',
      collageMainTitle: 'Warsaw • Mazowiecki Urząd',
      collageMainSub: 'Single Permit & EU Blue Card Cohort',
      collageMainTag: '14 Weeks',
      collageLeftTitle: 'Kraków • IT Specialist',
      collageLeftSub: 'EU Blue Card (Art. 127)',
      collageLeftTag: '3-Yr Card',
      collageRightTitle: 'Gdańsk • Family Permit',
      collageRightSub: 'Spouse & Open Work Access',
      collageRightTag: 'Approved'
    },
    metrics: [
      {
        index: '01',
        value: '98.4%',
        label: 'First-Submission Positive Voivodeship Decisions'
      },
      {
        index: '02',
        value: '48 Hours',
        label: 'Complete Document Audit & Employer Annex No. 1 Prep'
      },
      {
        index: '03',
        value: '65+ Nations',
        label: 'Advised in English, Polish, Ukrainian & Spanish'
      },
      {
        index: '04',
        value: '16 / 16',
        label: 'Polish Voivodeships Covered via Official KPA Proxy'
      }
    ],
    process: {
      eyebrow: 'SECTION 01 — PROCEDURAL ARCHITECTURE',
      title: 'How We Secure Your Polish Residence & Work Permit',
      subtitle:
        'We replace administrative guesswork with a disciplined, four-stage legal protocol. Select any stage below to inspect the exact deliverables handled by your case officer.',
      inspectCta: 'Inspect Protocol',
      nextBtnPrefix: 'Advance to Stage',
      bookBtn: 'Start Free Assessment',
      fullPageLink: 'Read Full Procedural Dossier →',
      steps: [
        {
          num: '01',
          duration: 'Day 1 • Gratis',
          shortTitle: 'Initial Legal Stay Audit',
          shortDesc: 'We audit your passport stamps, Schengen day-count, and employment contract to lock in the fastest statutory basis.',
          badge: 'STAGE 01 OF 04 • ZERO COST • 20 MINUTES',
          title: '01. Free Initial Consultation & Legal Stay Audit',
          summary:
            'Speak with a dedicated immigration specialist in Bydgoszcz, Warsaw, or online. We calculate your remaining legal Schengen/visa days and map out a zero-gap timeline so your employment and residence remain 100% uninterrupted.',
          checklist: [
            'Visa, Visa-Free & Schengen day-count verification',
            'Contract review (Umowa o pracę, Zlecenie, or B2B)',
            'Statutory selection: Single Permit (Art. 114) vs. EU Blue Card (Art. 127)',
            'Transparent fixed-fee written quote with zero hidden surcharges'
          ],
          guaranteeTitle: 'MobilWork Statutory Stay Guarantee',
          guaranteeText:
            'Even if your current visa expires in 5 days, submitting a properly audited application through our legal proxy immediately grants you 100% legal stay in Poland under Art. 108 until the final decision is issued.'
        },
        {
          num: '02',
          duration: 'Days 2–5',
          shortTitle: 'Employer & Document Audit',
          shortDesc: 'We coordinate directly with your HR department on Załącznik nr 1, ZUS insurance proofs, and sworn translations.',
          badge: 'STAGE 02 OF 04 • DAYS 2–5 • EMPLOYER LIAISON',
          title: '02. Document Preparation & 24-Point Legal Audit',
          summary:
            'You never have to decipher complex Polish administrative forms alone. Our case officers contact your HR department directly to draft Załącznik nr 1, verify salary thresholds, and arrange sworn Polish translations.',
          checklist: [
            'Direct liaison with your Polish employer on Annex No. 1 (Załącznik nr 1)',
            'Verification of ZUS ZUA / ZUS RCA health insurance declarations',
            'Starosta Labor Market Test (Informacja Starosty) or statutory exemption audit',
            'Sworn translations (Tłumacz Przysięgły) of diplomas & civil certificates'
          ],
          guaranteeTitle: 'Zero Missing-Document Delays',
          guaranteeText:
            'Every dossier undergoes a 24-point legal audit before filing so your Voivodeship inspector has zero grounds to pause your case with formal defect notices (Wezwanie do usunięcia braków).'
        },
        {
          num: '03',
          duration: 'Week 2',
          shortTitle: 'Voivodeship Filing & Stamp',
          shortDesc: 'We book your priority Urząd appointment, accompany you for biometrics, and secure your red legal stay stamp.',
          badge: 'STAGE 03 OF 04 • WEEK 2 • URZĄD SUBMISSION',
          title: '03. Official Voivodeship Submission & Biometrics',
          summary:
            'We secure your appointment via INPOL / MOS portals, register our official Power of Attorney (Pełnomocnictwo), and accompany you in person to the Urząd Wojewódzki for fingerprint collection.',
          checklist: [
            'Priority booking in INPOL / Voivodeship reservation queues',
            'In-person coordinator assistance during fingerprint submission',
            'Immediate official legal stay stamp placed in your passport',
            'All official Urząd correspondence routed directly to our legal registry'
          ],
          guaranteeTitle: '100% Legal Stay Stamp on Day of Filing',
          guaranteeText:
            'Once your fingerprints are captured and stamped, your stay in Poland is legally protected under Art. 108 of the Act on Foreigners while the Voivodeship processes your decision.'
        },
        {
          num: '04',
          duration: 'Decision & Card',
          shortTitle: 'Decision & Plastic Card',
          shortDesc: 'We answer all inspector letters on your behalf, verify your positive decision, and schedule plastic card pickup.',
          badge: 'STAGE 04 OF 04 • DECISION & PLASTIC CARD PICKUP',
          title: '04. Receive Your Karta Pobytu Residence Card',
          summary:
            'While you focus on your career and life in Poland, we monitor your case weekly, answer inspector requests, verify your positive decision (Decyzja Pozytywna), and book your plastic card collection.',
          checklist: [
            'Proactive status monitoring & monthly employer ZUS updates',
            'Verification of personal data on your printed Karta Pobytu',
            'Assistance with 100 PLN plastic card printing fee & PESEL check',
            'Long-term roadmap set for your future 5-Year EU Resident card'
          ],
          guaranteeTitle: 'Full Support Until the Card Is in Your Hand',
          guaranteeText:
            'Our mandate only concludes when you hold your physical Karta Pobytu or Work Permit decision and we have verified every datum on the card.'
        }
      ]
    },
    services: {
      eyebrow: 'SECTION 02 — STATUTORY PRACTICE AREAS',
      title: 'Permits Tailored to Your Career & Family in Poland',
      subtitle:
        'Every mandate includes official Power of Attorney (Pełnomocnictwo), direct employer HR coordination, and real-time case tracking in the INPOL & MOS portals.',
      filterAll: 'All Permits (04)',
      filterResidence: 'Residence Cards (Karta Pobytu)',
      filterWork: 'Employer Work Permits',
      filterFamily: 'Family & Dependents',
      citySelectorLabel: 'Voivodeship Jurisdiction:',
      estProcessingLabel: 'Est. Processing',
      showChecklistBtn: 'Inspect Required Documents',
      hideChecklistBtn: 'Close Document Dossier',
      applyBtn: 'Select & Check Eligibility →',
      exploreResidencePage: 'Explore Residence Permits Dossier →',
      exploreWorkPage: 'Explore Work Permits Dossier →',
      cards: [
        {
          key: 'czasowy' as PermitKey,
          category: 'residence',
          index: '01',
          statute: 'Karta Pobytu Czasowego • Art. 114 / Art. 187',
          title: 'Temporary Residence (Czasowy)',
          desc: 'The combined Single Permit for living and working legally in Poland for up to 3 years, with visa-free travel across all 29 Schengen states.',
          features: [
            'Complete Załącznik nr 1 preparation with your Polish HR department',
            'Starosta labor market test (Informacja Starosty) or exemption audit',
            'Passport stamp securing 100% legal stay while awaiting card issuance'
          ],
          checklistTitle: 'Required Core Documents & Statutory Fees:',
          checklistItems: [
            'Valid passport + 4 biometric photographs (35×45mm)',
            'Signed Employment Contract + Employer Annex No. 1',
            'ZUS ZUA / ZUS RCA insurance confirmation & residential lease'
          ],
          feeNote: 'Statutory Stamp Duty: 440 PLN + 100 PLN Plastic Card Fee'
        },
        {
          key: 'work' as PermitKey,
          category: 'work',
          index: '02',
          statute: 'Zezwolenie na Pracę Typ A / B & Oświadczenie',
          title: 'Work Permits (Typ A / B)',
          desc: 'Fast-track Voivodeship Work Permits for candidates applying for a Polish National D-Visa abroad or onboarding with a Polish company or board.',
          features: [
            'Typ A: Standard employees hired by a Polish entity (1–3 years)',
            'Typ B: Management board members (Członek Zarządu Sp. z o.o.)',
            '100% digital filing via praca.gov.pl & international courier dispatch'
          ],
          checklistTitle: 'Required Core Documents & Statutory Fees:',
          checklistItems: [
            'Full scan of candidate passport (all stamped pages)',
            'Company KRS / CEIDG extract & clean tax/ZUS declaration',
            'Job description & qualification certificates (if regulated)'
          ],
          feeNote: 'Statutory Voivodeship Fee: 100 PLN (50 PLN under 3 months)'
        },
        {
          key: 'bluecard' as PermitKey,
          category: 'residence',
          index: '03',
          statute: 'Niebieska Karta UE • Art. 127 High-Skill Mobility',
          title: 'EU Blue Card (Niebieska Karta)',
          desc: 'Premier 3-year EU residence permit for software engineers, data scientists, finance specialists, and executives with higher education or 5+ years of experience.',
          features: [
            'Full labor market flexibility after 12 months — switch employers easily',
            'Accumulates across EU member states toward 5-Year Long-Term EU Resident status',
            'Immediate unrestricted work access for accompanying spouse'
          ],
          checklistTitle: 'Required Core Documents & Statutory Fees:',
          checklistItems: [
            '1-year+ contract meeting the statutory gross salary threshold',
            'University diploma (apostilled + sworn Polish translation) or 5-yr IT portfolio',
            'ZUS health insurance & Polish residential lease agreement'
          ],
          feeNote: 'Statutory Stamp Duty: 440 PLN + 100 PLN Plastic Card Fee'
        },
        {
          key: 'family' as PermitKey,
          category: 'family',
          index: '04',
          statute: 'Połączenie z Rodziną • Art. 159 / Art. 187',
          title: 'Family Reunification',
          desc: 'Bring your spouse, partner, and children to Poland with full NFZ healthcare access, schooling rights, and unrestricted labor market access.',
          features: [
            'Marriage & birth certificate transcription (Umiejscowienie aktu USC)',
            'Household net per-capita income calculation & ZUS ZCNA registration',
            'Simultaneous filing for main sponsor and dependents in one appointment'
          ],
          checklistTitle: 'Required Core Documents & Statutory Fees:',
          checklistItems: [
            'Apostilled/legalized marriage or birth certificate + sworn translation',
            'Main sponsor employment contract, PIT tax return & ZUS ZCNA',
            'Family apartment lease agreement covering all household members'
          ],
          feeNote: 'Statutory Stamp Duty: 340 PLN + 100 PLN Card Fee (50 PLN minors)'
        }
      ]
    },
    eligibility: {
      eyebrow: 'SECTION 03 — ALGORITHMIC ELIGIBILITY AUDIT',
      title: 'Check Your Polish Permit Eligibility in 60 Seconds',
      subtitle:
        'Complete three structured parameters regarding your citizenship, Voivodeship jurisdiction, and employment basis. Receive an immediate statutory permit match, processing window, and document checklist.',
      benefit1Title: 'Calibrated to 2026 Polish Immigration Law',
      benefit1Desc: 'Updated for current statutory salary thresholds, EU Blue Card mobility rules, and live Urząd Wojewódzki queue speeds.',
      benefit2Title: '100% Confidential & RODO Protected',
      benefit2Desc: 'Your parameters are processed strictly to generate your bespoke immigration dossier. Zero unsolicited marketing.',
      benefit3Title: 'Urgent Visa Expiry Desk',
      benefit3Desc: 'Direct Bydgoszcz & Warsaw legal proxy line: +48 52 511 84 20 (Mon–Fri 08:30–18:00 CET).',
      pills: ['01 Citizenship', '02 Voivodeship', '03 Employment'],
      step1Title: 'Parameter 01: Citizenship & Current Location',
      step1Sub: 'Determines whether you qualify for simplified Oświadczenie or visa-free filing rules.',
      citizenshipLabel: 'Select Country of Citizenship',
      locationLabel: 'Current Legal Location Status',
      locations: [
        { value: 'in-poland-visa', title: 'Already in Poland (Visa / Stamp)', meta: 'National D-Visa, C-Visa, or pending stamp' },
        { value: 'in-poland-card', title: 'In Poland (Karta Pobytu Renewal)', meta: 'Renewing card or changing employer' },
        { value: 'in-poland-visafree', title: 'In Poland (90-Day Visa-Free)', meta: 'Biometric passport Schengen entry' },
        { value: 'abroad', title: 'Currently Outside Poland', meta: 'Need Work Permit for embassy visa' }
      ],
      step2Title: 'Parameter 02: Target Voivodeship in Poland',
      step2Sub: 'Your residential address determines which Voivodeship Office (Urząd Wojewódzki) adjudicates your permit.',
      step3Title: 'Parameter 03: Employment or Family Basis',
      step3Sub: 'Select the category that best reflects your contract or family situation in Poland.',
      employments: [
        { value: 'standard-contract', title: 'Employed / Job Offer in Poland', meta: 'Umowa o pracę or Umowa zlecenie' },
        { value: 'high-skill', title: 'High-Skill Specialist / IT / Eng.', meta: 'University degree or 5+ yrs experience' },
        { value: 'employer-sponsor', title: 'Need Work Permit for Visa', meta: 'Employer ready to sign Zezwolenie Typ A' },
        { value: 'family-join', title: 'Joining Spouse / Family Member', meta: 'Family reunification & open work access' }
      ],
      backBtn: '← Previous',
      nextToCityBtn: 'Continue to Voivodeship →',
      nextToEmpBtn: 'Continue to Employment →',
      calcBtn: 'Generate Statutory Match →',
      resultBadge: '98.4% Approval Track • Verified Statutory Match',
      statOffice: 'Jurisdiction',
      statTime: 'Est. Window',
      statFee: 'Stamp Duty',
      nameLabel: 'Your Full Name',
      namePlaceholder: 'e.g. Elena Kovalenko',
      contactLabel: 'Phone / WhatsApp or Email',
      contactPlaceholder: '+48 500 000 000 or email',
      resetBtn: 'Reset Parameters',
      submitBtn: 'Book Free 20-Min Case Review',
      submittedBtn: 'Consultation Confirmed ✓',
      results: {
        czasowyTitle: 'Recommended: Temporary Residence & Work Permit (Art. 114)',
        bluecardTitle: 'Recommended: EU Blue Card (Niebieska Karta UE — Art. 127)',
        workTitle: 'Recommended: Voivodeship Work Permit (Zezwolenie Typ A)',
        familyTitle: 'Recommended: Family Reunification Residence Card (Art. 159)'
      }
    },
    stories: {
      eyebrow: 'SECTION 04 — VERIFIED CASE ARCHIVE',
      title: 'International Professionals Living & Working Across Poland',
      subtitle:
        'Documented case timelines and verified decisions from specialists and families who entrusted MobilWork with their Voivodeship representation.',
      verifiedDecision: 'Verified Decision',
      permitPrefix: 'Statute:',
      viewAllBtn: 'Read Full Case Studies Archive →',
      items: [
        {
          name: 'Maya Singh',
          role: 'Senior Cloud Engineer • Kraków',
          flag: '🇮🇳 IN',
          duration: 'Approved in 11 Weeks',
          permit: 'EU Blue Card (Art. 127)',
          image: '/assets/images/candidate-krakow.jpg',
          quote:
            'I was anxious about losing my legal status when switching jobs in Kraków. MobilWork audited my new contract in 24 hours, translated my engineering degree, and accompanied me to the Małopolskie Urząd. I received my 3-year EU Blue Card without a single formal defect notice.',
          challenge: 'Job change mid-residency + Indian diploma apostille verification under revised Art. 127 rules.'
        },
        {
          name: 'Mateo Herrera',
          role: 'Supply Chain Coordinator • Bydgoszcz',
          flag: '🇨🇴 CO',
          duration: 'Approved in 3.2 Months',
          permit: 'Karta Pobytu Czasowego (Art. 114)',
          image: '/assets/images/candidate-bydgoszcz.jpg',
          quote:
            'Arriving from Colombia on visa-free days gave me a tight window. MobilWork’s Bydgoszcz team coordinated directly with my logistics employer to complete Załącznik nr 1 and booked my fingerprints at Kujawsko-Pomorski Urząd before my 90 days expired.',
          challenge: '90-day Schengen visa-free countdown requiring urgent Starosta test & immediate biometric slot.'
        },
        {
          name: 'Linh Nguyen',
          role: 'FinTech Data Analyst • Warsaw',
          flag: '🇻🇳 VN',
          duration: 'Approved in 14 Weeks',
          permit: 'Single Work & Residence Permit',
          image: '/assets/images/candidate-warsaw-cafe.jpg',
          quote:
            'Securing an INPOL appointment slot in Warsaw felt impossible on my own. MobilWork acted as my official Pełnomocnik, handled the Mazowieckie submission, and sent me updates every time the inspector touched my file.',
          challenge: 'High-volume Mazowieckie INPOL queue navigation and multi-employer ZUS RCA reconciliation.'
        },
        {
          name: 'Lucas & Sofia Mendes',
          role: 'Product Designer & Spouse • Gdańsk',
          flag: '🇧🇷 BR',
          duration: 'Approved in 3.5 Months',
          permit: 'Family Reunification (Art. 159)',
          image: '/assets/images/candidate-gdansk.jpg',
          quote:
            'MobilWork submitted both my work residence card and my wife’s Family Reunification application together in Gdańsk. They transcribed our Brazilian marriage certificate at the Polish Civil Registry and got our cards issued on the exact same day.',
          challenge: 'Simultaneous main sponsor + dependent filing with foreign civil registry (USC) transcription.'
        }
      ]
    },
    faq: {
      eyebrow: 'SECTION 05 — STATUTORY CLARIFICATIONS',
      title: 'Frequently Asked Questions on Polish Immigration Law',
      subtitle: 'Clear, legally rigorous answers regarding Article 108 stay stamps, changing employers, and official government stamp duties.',
      items: [
        {
          q: 'Can I legally stay and work in Poland while waiting for my Karta Pobytu decision?',
          a: 'Yes, 100%. As soon as your complete application is submitted before your current visa or visa-free period expires, the Voivodeship Office places an official stamp (stempel w paszporcie) in your passport. Under Article 108 of the Polish Act on Foreigners, your stay in Poland remains completely legal until a final decision is issued—even if your original visa expires months earlier.'
        },
        {
          q: 'What is the difference between a Work Permit (Zezwolenie Typ A) and a Karta Pobytu?',
          a: 'A Work Permit (Zezwolenie na Pracę Typ A) authorizes you to work for a specific Polish employer, and is typically used to obtain a National D-Visa at a Polish Embassy abroad or to start work while holding another valid visa. A Karta Pobytu Czasowego (Single Permit) combines both your right to reside in Poland and your right to work into a single biometric residence card valid for up to 3 years, allowing visa-free travel across the 29 Schengen countries.'
        },
        {
          q: 'What are the official Polish government fees for a Residence Permit?',
          a: 'Official Polish government fees are paid directly to the local municipal/Voivodeship tax account: 440 PLN stamp duty for a Temporary Residence & Work Permit (or EU Blue Card), 340 PLN for Family Reunification or Study/Business residence, plus 100 PLN for printing the biometric plastic Karta Pobytu card once approved. Power of Attorney (Pełnomocnictwo) statutory tax duty is 17 PLN.'
        },
        {
          q: 'Can MobilWork represent me if I live outside Bydgoszcz or Warsaw?',
          a: 'Yes. Through written Power of Attorney (Pełnomocnictwo under KPA Art. 32–33), all official correspondence from any of the 16 Voivodeship Offices in Poland (including Kraków, Wrocław, Gdańsk, Poznań, Katowice, and Łódź) is delivered directly to our legal registry. You only attend the Voivodeship Office once in person to give fingerprints.'
        }
      ]
    },
    footer: {
      brandDesc:
        'Licensed Polish administrative proxy agency assisting international professionals, families, and corporate HR teams with Karta Pobytu residence cards, EU Blue Cards, and Voivodeship work permits.',
      navTitle: 'Practice Architecture',
      officesTitle: 'Polish Chambers & Desks',
      bydgoszczTitle: 'Bydgoszcz Headquarters',
      warsawTitle: 'Warsaw Branch Chamber',
      newsletterTitle: 'Statutory Briefings',
      newsletterDesc:
        'Receive monthly digests on Ustawa o cudzoziemcach amendments, minimum salary threshold adjustments, and Voivodeship queue alerts.',
      newsletterPlaceholder: 'name@company.com',
      newsletterBtn: 'Subscribe to Legal Briefings',
      newsletterSuccess: '✓ Subscribed to monthly Polish Immigration Law briefings.',
      disclaimerTitle: 'Legal Representation & Administrative Proxy Disclaimer:',
      disclaimerText:
        'MobilWork Sp. z o.o. provides specialized immigration consulting, document auditing, and administrative representation before Polish Voivodeship Offices (Urzędy Wojewódzkie) and County Labor Offices (Powiatowe Urzędy Pracy) acting as an authorized proxy (Pełnomocnik) pursuant to Articles 32–33 of the Polish Code of Administrative Procedure (KPA). MobilWork is an independent private agency and is not affiliated with any government ministry.',
      copyright: '© 2026 MobilWork Sp. z o.o. All rights reserved. Bydgoszcz & Warsaw, Poland.',
      privacyLink: 'Privacy Policy (RODO)',
      termsLink: 'Terms of Administrative Proxy',
      cookiesLink: 'Cookie Preferences'
    },
    pages: {
      residence: {
        kicker: 'PRACTICE AREA 01 • RESIDENCE PERMITS (KARTA POBYTU)',
        title: 'Biometric Residence Permits & Long-Term Stay in Poland',
        lead: 'Comprehensive administrative representation under the Polish Act on Foreigners (Ustawa o cudzoziemcach) for professionals, engineers, executives, and accompanying family members across all 16 Voivodeships.',
        comparisonTitle: 'Statutory Comparison of Polish Residence Titles',
        comparisonHeaders: ['Permit Type', 'Legal Basis', 'Max Validity', 'Stamp Duty', 'Schengen Mobility'],
        comparisonRows: [
          ['Temporary Residence & Work (Single Permit)', 'Art. 114', 'Up to 3 Years', '440 PLN + 100 PLN', '90 / 180 Days Visa-Free'],
          ['EU Blue Card (High-Skill Professionals)', 'Art. 127', 'Up to 3 Years', '440 PLN + 100 PLN', '90 / 180 Days + EU Accumulation'],
          ['Family Reunification (Spouse & Minors)', 'Art. 159 / 187', 'Up to 3 Years', '340 PLN + 100 PLN', '90 / 180 Days + Open Work Access'],
          ['Long-Term EU Resident Card', 'Art. 211', 'Permanent (5-Yr Card)', '640 PLN + 100 PLN', 'Full EU Mobility Rights']
        ]
      },
      work: {
        kicker: 'PRACTICE AREA 02 • CORPORATE & CANDIDATE WORK AUTHORIZATION',
        title: 'Voivodeship Work Permits (Typ A / B) & Corporate HR Compliance',
        lead: 'Turnkey work authorization filings via praca.gov.pl for Polish employers, international recruitment cohorts, and management board members—eliminating labor office bottlenecks.',
        typesTitle: 'Work Authorization Instruments in Poland',
        types: [
          {
            code: 'TYP A',
            title: 'Standard Voivodeship Work Permit',
            statute: 'Art. 88 pkt 1 • 1 to 3 Years Validity',
            desc: 'Required for non-EU nationals employed by a Polish entity under an employment or civil contract. Enables National D-Visa issuance at any Polish Consulate worldwide.'
          },
          {
            code: 'TYP B',
            title: 'Management Board & Proxy Permit',
            statute: 'Art. 88 pkt 2 • Corporate Executives',
            desc: 'Designed for Management Board Members (Członek Zarządu), Commercial Proxies (Prokurent), and General Partners residing in Poland for over 6 months within any 12-month period.'
          },
          {
            code: 'OŚWIADCZENIE',
            title: 'Fast-Track County Labor Office Declaration',
            statute: 'PUP Simplified Track • 24 Months Validity',
            desc: 'Expedited 7-day registration for citizens of Ukraine, Belarus, Georgia, Armenia, and Moldova, granting immediate legal employment without a Starosta labor test.'
          }
        ]
      },
      legal: {
        kicker: 'REGULATORY COMPLIANCE • RODO & KPA MANDATE',
        title: 'Privacy Policy (RODO), Terms of Administrative Proxy & Cookies',
        lead: 'Transparency, statutory compliance, and strict client data confidentiality form the foundation of MobilWork Sp. z o.o. operations in Bydgoszcz and Warsaw.',
        sections: [
          {
            id: 'rodo',
            code: '01 / RODO',
            title: 'Personal Data Protection (GDPR / RODO Compliance)',
            body: 'MobilWork Sp. z o.o. (KRS: 0000894120, NIP: 5542981042), headquartered at ul. Gdańska 47, 85-005 Bydgoszcz, acts as the Data Controller under Regulation (EU) 2016/679 (GDPR / RODO). Client passport records, PESEL numbers, employment contracts, and ZUS declarations are processed strictly for the purpose of preparing and submitting administrative filings before Polish Voivodeship Offices (Urzędy Wojewódzkie) and County Labor Offices.'
          },
          {
            id: 'proxy',
            code: '02 / KPA ART. 32–33',
            title: 'Terms of Administrative Proxy (Pełnomocnictwo)',
            body: 'Representation before Voivodeship Offices is conducted via a signed written Power of Attorney (Pełnomocnictwo) subject to a statutory 17 PLN municipal stamp duty. Our fee schedule is fixed in writing prior to mandate commencement. Government stamp duties (440 PLN / 340 PLN / 100 PLN) are paid directly to the respective municipal revenue authority.'
          },
          {
            id: 'cookies',
            code: '03 / COOKIES & STORAGE',
            title: 'Cookie & Local Preference Architecture',
            body: 'This portal utilizes strictly necessary local storage keys (such as your selected interface language EN/PL/UA/ES and eligibility wizard state) to preserve your reading experience across pages. No third-party behavioral advertising trackers are deployed.'
          }
        ]
      }
    }
  },

  pl: {
    meta: {
      issueTag: 'PRAKTYKA PRAWNA • USTAWA O CUDZOZIEMCACH (DZ.U. 2026) • WSZYSTKIE 16 WOJEWÓDZTW',
      brandTagline: 'Karta Pobytu i Zezwolenia na Pracę',
      lenisStatus: 'Płynne przewijanie Lenis aktywne'
    },
    nav: {
      home: 'Przegląd',
      residence: 'Karty Pobytu',
      work: 'Zezwolenia na Pracę',
      process: 'Procedura',
      stories: 'Studia Przypadków',
      eligibility: 'Kwalifikacja',
      legal: 'RODO i Regulamin',
      cta: 'Sprawdź Kwalifikację',
      mobileOfficeTitle: 'Biura w Bydgoszczy i Warszawie',
      mobileOfficeDesc: 'Licencjonowani pełnomocnicy administracyjni we wszystkich 16 województwach. Pon–Pt 08:30–18:00 CET.'
    },
    hero: {
      eyebrow: '98,4% POZYTYWNYCH DECYZJI W I INSTANCJI',
      eyebrowSub: 'Licencjonowani Pełnomocnicy we Wszystkich 16 Urzędach Wojewódzkich',
      titleStart: 'Twoja Droga do Legalnego Życia i Pracy w',
      titleItalic: 'Polsce,',
      titleEnd: 'Zredukowana do Precyzji.',
      subtitle:
        'Omiń skomplikowaną biurokrację, kolejki w Urzędzie Wojewódzkim i wezwania do uzupełnienia braków. Nasi dwujęzyczni pełnomocnicy przygotowują, audytują i prowadzą Twoją sprawę o Kartę Pobytu lub Zezwolenie na Pracę aż do odbioru plastiku.',
      widgetTitle: 'Kalkulator Zezwoleń i Czasu Oczekiwania',
      widgetBadge: 'Stempel Legalnego Pobytu (Art. 108) w 1 Dniu',
      fieldPermit: '01 / Wybierz Rodzaj Zezwolenia',
      fieldCity: '02 / Wybierz Urząd Wojewódzki',
      permitOptions: {
        czasowy: 'Karta Pobytu Czasowego i Pracy (Jednolite)',
        work: 'Zezwolenie na Pracę (Typ A / B)',
        bluecard: 'Niebieska Karta UE (IT i Inżynieria)',
        family: 'Połączenie z Rodziną (Małżonek i Dzieci)'
      },
      exploreBtn: 'Dopasuj Zezwolenie i Czas',
      checkBtn: 'Test Kwalifikacji w 60 Sekund',
      estDecisionPrefix: 'Szacowany czas decyzji —',
      stampFeePrefix: 'Opłata skarbowa:',
      reassurance1: 'Stała Umowa — Zero Ukrytych Kosztów',
      reassurance2: 'Tłumaczenia Przysięgłe w Pakiecie',
      reassurance3: 'Osobista Asysta przy Odciskach Palców',
      collageIssued: '4 280+ Wydanych Kart',
      collageVerified: 'Zweryfikowane Decyzje Wojewodów',
      collageMainTitle: 'Warszawa • Mazowiecki Urząd',
      collageMainSub: 'Zezwolenia Jednolite i Niebieska Karta UE',
      collageMainTag: '14 Tygodni',
      collageLeftTitle: 'Kraków • Specjalista IT',
      collageLeftSub: 'Niebieska Karta UE (Art. 127)',
      collageLeftTag: 'Karta 3-letnia',
      collageRightTitle: 'Gdańsk • Pobyt Rodzinny',
      collageRightSub: 'Małżonek z Dostępem do Rynku Pracy',
      collageRightTag: 'Zatwierdzono'
    },
    metrics: [
      {
        index: '01',
        value: '98,4%',
        label: 'Pozytywnych Decyzji przy Pierwszym Złożeniu Wniosku'
      },
      {
        index: '02',
        value: '48 Godzin',
        label: 'Pełny Audyt Dokumentów i Przygotowanie Załącznika nr 1'
      },
      {
        index: '03',
        value: '65+ Krajów',
        label: 'Obsługa po Polsku, Angielsku, Ukraińsku i Hiszpańsku'
      },
      {
        index: '04',
        value: '16 / 16',
        label: 'Województw Obsługiwanych przez Pełnomocników KPA'
      }
    ],
    process: {
      eyebrow: 'SEKCJA 01 — ARCHITEKTURA PROCEDURALNA',
      title: 'Jak Uzyskujemy Twoją Kartę Pobytu i Zezwolenie na Pracę',
      subtitle:
        'Zastępujemy domysły sprawdzonym, czteroetapowym protokołem administracyjnym. Kliknij dowolny etap, aby zobaczyć dokładny zakres działań Twojego opiekuna prawnego.',
      inspectCta: 'Zobacz Protokół',
      nextBtnPrefix: 'Przejdź do Etapu',
      bookBtn: 'Bezpłatna Analiza Sprawy',
      fullPageLink: 'Pełny Przewodnik po Procedurze →',
      steps: [
        {
          num: '01',
          duration: 'Dzień 1 • 0 PLN',
          shortTitle: 'Audyt Legalności Pobytu',
          shortDesc: 'Weryfikujemy Twój paszport, dni ruchu bezwizowego/wizy oraz umowę, dobierając najszybszą podstawę prawną.',
          badge: 'ETAP 01 Z 04 • BEZPŁATNIE • 20 MINUT',
          title: '01. Bezpłatna Konsultacja i Audyt Legalności Pobytu',
          summary:
            'Porozmawiaj z dedykowanym specjalistą ds. legalizacji w Bydgoszczy, Warszawie lub online. Obliczamy pozostałe dni legalnego pobytu i tworzymy harmonogram bez ani jednego dnia przerwy w zatrudnieniu.',
          checklist: [
            'Weryfikacja dni wizowych, ruchu bezwizowego i Schengen',
            'Analiza umowy (Umowa o pracę, Umowa zlecenie lub B2B)',
            'Wybór trybu: Zezwolenie Jednolite (Art. 114) vs. Niebieska Karta UE (Art. 127)',
            'Przejrzysta wycena ryczałtowa na piśmie bez ukrytych dopłat'
          ],
          guaranteeTitle: 'Gwarancja Legalnego Pobytu MobilWork',
          guaranteeText:
            'Nawet jeśli Twoja wiza wygasa za 5 dni, złożenie kompletnie zaudytowanego wniosku przez naszego pełnomocnika natychmiast gwarantuje 100% legalny pobyt w Polsce na mocy Art. 108 aż do wydania decyzji.'
        },
        {
          num: '02',
          duration: 'Dni 2–5',
          shortTitle: 'Kompletowanie i Audyt HR',
          shortDesc: 'Kontaktujemy się bezpośrednio z działem HR Twojego pracodawcy w sprawie Załącznika nr 1, ZUS i tłumaczeń.',
          badge: 'ETAP 02 Z 04 • DNI 2–5 • KOORDYNACJA Z HR',
          title: '02. Przygotowanie Dokumentacji i 24-Punktowy Audyt',
          summary:
            'Nie musisz samodzielnie wypełniać skomplikowanych formularzy urzędowych. Nasi specjaliści kontaktują się bezpośrednio z działem kadr pracodawcy, przygotowują Załącznik nr 1 i organizują tłumaczenia przysięgłe.',
          checklist: [
            'Bezpośredni kontakt z pracodawcą w celu wypełnienia Załącznika nr 1',
            'Weryfikacja deklaracji ZUS ZUA / ZUS RCA i ubezpieczenia zdrowotnego',
            'Informacja Starosty (test rynku pracy) lub audyt zwolnienia ustawowego',
            'Tłumaczenia przysięgłe dyplomów oraz aktów stanu cywilnego'
          ],
          guaranteeTitle: 'Zero Opóźnień z Powodu Braków Formalnych',
          guaranteeText:
            'Każda teczka przechodzi 24-punktowy audyt prawny przed złożeniem, dzięki czemu inspektor wojewódzki nie ma podstaw do wysyłania wezwań do usunięcia braków formalnych.'
        },
        {
          num: '03',
          duration: 'Tydzień 2',
          shortTitle: 'Złożenie w Urzędzie i Biometria',
          shortDesc: 'Rezerwujemy priorytetowy termin w Urzędzie Wojewódzkim, asystujemy przy odciskach palców i uzyskujemy stempel.',
          badge: 'ETAP 03 Z 04 • TYDZIEŃ 2 • ZŁOŻENIE WNIOSKU',
          title: '03. Oficjalne Złożenie w Urzędzie Wojewódzkim i Biometria',
          summary:
            'Rezerwujemy termin w portalach INPOL / MOS, rejestrujemy oficjalne Pełnomocnictwo (Art. 32 KPA) i osobiście towarzyszymy Ci w Urzędzie Wojewódzkim podczas pobierania odcisków palców.',
          checklist: [
            'Priorytetowa rezerwacja terminu w systemach INPOL / kolejkach urzędowych',
            'Osobista asysta koordynatora podczas składania odcisków linii papilarnych',
            'Natychmiastowy stempel w paszporcie potwierdzający legalny pobyt',
            'Wszystkie pisma z Urzędu kierowane bezpośrednio do naszej kancelarii'
          ],
          guaranteeTitle: 'Stempel Legalnego Pobytu w Dniu Złożenia',
          guaranteeText:
            'Z chwilą pobrania odcisków palców i wbicia stempla Twój pobyt w Polsce jest w pełni chroniony prawnie na mocy Art. 108 Ustawy o cudzoziemcach.'
        },
        {
          num: '04',
          duration: 'Decyzja i Karta',
          shortTitle: 'Odbiór Karty Pobytu',
          shortDesc: 'Odpowiadamy na pisma inspektora, weryfikujemy decyzję pozytywną i umawiamy odbiór plastikowej karty.',
          badge: 'ETAP 04 Z 04 • DECYZJA I ODBIÓR KARTY',
          title: '04. Odbiór Plastikowej Karty Pobytu',
          summary:
            'Ty skupiasz się na pracy i życiu w Polsce, a my co tydzień monitorujemy status sprawy, odpowiadamy na zapytania inspektora, weryfikujemy Decyzję Pozytywną i rezerwujemy odbiór karty.',
          checklist: [
            'Proaktywny monitoring statusu sprawy i comiesięczne aktualizacje ZUS',
            'Weryfikacja poprawności danych osobowych na wydrukowanej Karcie Pobytu',
            'Pomoc w opłaceniu 100 PLN za wydruk karty oraz weryfikacji numeru PESEL',
            'Harmonogram dalszej ścieżki do 5-letniej Karty Rezydenta Długoterminowego UE'
          ],
          guaranteeTitle: 'Pełne Wsparcie aż do Odbioru Karty',
          guaranteeText:
            'Nasza umowa kończy się dopiero wtedy, gdy trzymasz w ręku fizyczną Kartę Pobytu lub decyzję o zezwoleniu na pracę.'
        }
      ]
    },
    services: {
      eyebrow: 'SEKCJA 02 — OBSZARY PRAKTYKI',
      title: 'Zezwolenia Dopasowane do Twojej Kariery i Rodziny w Polsce',
      subtitle:
        'Każda sprawa obejmuje oficjalne Pełnomocnictwo (KPA), bezpośrednią współpracę z działem HR pracodawcy oraz bieżący monitoring w systemach INPOL i MOS.',
      filterAll: 'Wszystkie (04)',
      filterResidence: 'Karty Pobytu',
      filterWork: 'Zezwolenia na Pracę',
      filterFamily: 'Rodzina i Bliscy',
      citySelectorLabel: 'Właściwy Urząd Wojewódzki:',
      estProcessingLabel: 'Szacowany Czas',
      showChecklistBtn: 'Sprawdź Wymagane Dokumenty',
      hideChecklistBtn: 'Ukryj Listę Dokumentów',
      applyBtn: 'Wybierz i Sprawdź Kwalifikację →',
      exploreResidencePage: 'Pełny Dossier Kart Pobytu →',
      exploreWorkPage: 'Pełny Dossier Zezwoleń na Pracę →',
      cards: [
        {
          key: 'czasowy' as PermitKey,
          category: 'residence',
          index: '01',
          statute: 'Karta Pobytu Czasowego • Art. 114 / Art. 187',
          title: 'Pobyt Czasowy i Praca (Jednolite)',
          desc: 'Zezwolenie jednolite uprawniające do legalnego zamieszkania i pracy w Polsce do 3 lat oraz podróżowania bez wiz po 29 krajach strefy Schengen.',
          features: [
            'Kompleksowe przygotowanie Załącznika nr 1 z działem HR pracodawcy',
            'Uzyskanie Informacji Starosty lub weryfikacja zwolnienia z testu rynku pracy',
            'Stempel w paszporcie gwarantujący 100% legalny pobyt w trakcie procedury'
          ],
          checklistTitle: 'Wymagane Dokumenty Podstawowe i Opłaty:',
          checklistItems: [
            'Ważny paszport + 4 zdjęcia biometryczne (35×45mm)',
            'Podpisana umowa z pracodawcą + Załącznik nr 1',
            'Potwierdzenie zgłoszenia ZUS ZUA / ZUS RCA oraz umowa najmu mieszkania'
          ],
          feeNote: 'Opłata skarbowa: 440 PLN + 100 PLN za wydruk plastikowej karty'
        },
        {
          key: 'work' as PermitKey,
          category: 'work',
          index: '02',
          statute: 'Zezwolenie na Pracę Typ A / B oraz Oświadczenie',
          title: 'Zezwolenia na Pracę (Typ A / B)',
          desc: 'Szybkie wojewódzkie zezwolenia na pracę dla kandydatów ubiegających się o wizę krajową D lub rozpoczynających pracę w polskiej spółce.',
          features: [
            'Typ A: Pracownicy zatrudnieni przez polski podmiot (na okres 1–3 lat)',
            'Typ B: Członkowie Zarządu spółek kapitałowych (Sp. z o.o. / S.A.)',
            'W 100% cyfrowe złożenie przez praca.gov.pl i wysyłka kurierska oryginału'
          ],
          checklistTitle: 'Wymagane Dokumenty Podstawowe i Opłaty:',
          checklistItems: [
            'Pełny skan paszportu kandydata (wszystkie zapisane strony)',
            'Aktualny odpis KRS / CEIDG spółki oraz oświadczenie o niekaralności',
            'Zakres obowiązków oraz dokumenty potwierdzające kwalifikacje'
          ],
          feeNote: 'Opłata wojewódzka: 100 PLN (50 PLN poniżej 3 miesięcy)'
        },
        {
          key: 'bluecard' as PermitKey,
          category: 'residence',
          index: '03',
          statute: 'Niebieska Karta UE • Art. 127 Wysokie Kwalifikacje',
          title: 'Niebieska Karta UE (EU Blue Card)',
          desc: 'Prestiżowe 3-letnie zezwolenie dla inżynierów oprogramowania, analityków danych, finansistów i kadry zarządzającej z dyplomem uczelni lub 5-letnim doświadczeniem.',
          features: [
            'Pełna swoboda zmiany pracodawcy po 12 miesiącach pobytu',
            'Zaliczenie okresów pobytu w innych krajach UE do 5-letniej Karty Rezydenta UE',
            'Natychmiastowy wolny dostęp do rynku pracy dla współmałżonka'
          ],
          checklistTitle: 'Wymagane Dokumenty Podstawowe i Opłaty:',
          checklistItems: [
            'Umowa na min. 1 rok spełniająca ustawowy próg wynagrodzenia brutto',
            'Dyplom ukończenia studiów (z apostille i tłumaczeniem) lub 5 lat doświadczenia w IT',
            'Ubezpieczenie zdrowotne ZUS oraz polska umowa najmu lokalu'
          ],
          feeNote: 'Opłata skarbowa: 440 PLN + 100 PLN za wydruk plastikowej karty'
        },
        {
          key: 'family' as PermitKey,
          category: 'family',
          index: '04',
          statute: 'Połączenie z Rodziną • Art. 159 / Art. 187',
          title: 'Pobyt dla Członków Rodziny',
          desc: 'Sprowadź współmałżonka, partnera oraz dzieci do Polski z pełnym dostępem do opieki zdrowotnej NFZ, edukacji oraz rynku pracy.',
          features: [
            'Transkrypcja zagranicznych aktów małżeństwa i urodzenia w polskim USC',
            'Kalkulacja dochodu netto na członka rodziny i zgłoszenie ZUS ZCNA',
            'Jednoczesne złożenie wniosków dla głównego aplikanta i rodziny'
          ],
          checklistTitle: 'Wymagane Dokumenty Podstawowe i Opłaty:',
          checklistItems: [
            'Akt małżeństwa lub urodzenia z apostille + tłumaczenie przysięgłe',
            'Umowa o pracę głównego żywiciela, rozliczenie PIT oraz ZUS ZCNA',
            'Umowa najmu mieszkania obejmująca wszystkich członków rodziny'
          ],
          feeNote: 'Opłata skarbowa: 340 PLN + 100 PLN karta (50 PLN dla dzieci)'
        }
      ]
    },
    eligibility: {
      eyebrow: 'SEKCJA 03 — ALGORYTMICZNY AUDYT KWALIFIKACJI',
      title: 'Sprawdź Kwalifikację do Zezwolenia w 60 Sekund',
      subtitle:
        'Wybierz trzy parametry dotyczące obywatelstwa, docelowego miasta w Polsce oraz statusu zatrudnienia. Otrzymasz natychmiastową rekomendację trybu prawnego, czas oczekiwania i listę dokumentów.',
      benefit1Title: 'Zgodność z Nowelizacją Ustawy 2026',
      benefit1Desc: 'Uwzględnia aktualne progi wynagrodzeń, znowelizowane przepisy o Niebieskiej Karcie UE oraz kolejki w Urzędach Wojewódzkich.',
      benefit2Title: '100% Poufności i Ochrona RODO',
      benefit2Desc: 'Twoje odpowiedzi służą wyłącznie do przygotowania spersonalizowanej listy kontrolnej dokumentów. Zero spamu.',
      benefit3Title: 'Pilna Pomoc przed Końcem Wizy',
      benefit3Desc: 'Bezpośredni dyżur pełnomocników w Bydgoszczy i Warszawie: +48 52 511 84 20 (Pon–Pt 08:30–18:00).',
      pills: ['01 Obywatelstwo', '02 Województwo', '03 Zatrudnienie'],
      step1Title: 'Parametr 01: Obywatelstwo i Aktualne Miejsce Pobytu',
      step1Sub: 'Pozwala określić, czy kwalifikujesz się do uproszczonej procedury Oświadczenia lub ruchu bezwizowego.',
      citizenshipLabel: 'Wybierz Kraj Obywatelstwa',
      locationLabel: 'Gdzie obecnie przebywasz?',
      locations: [
        { value: 'in-poland-visa', title: 'W Polsce (Wiza / Stempel)', meta: 'Wiza krajowa D, Schengen C lub stempel' },
        { value: 'in-poland-card', title: 'W Polsce (Przedłużenie Karty)', meta: 'Kolejna Karta Pobytu lub zmiana pracy' },
        { value: 'in-poland-visafree', title: 'W Polsce (90 dni bezwizowo)', meta: 'Wjazd na paszporcie biometrycznym' },
        { value: 'abroad', title: 'Obecnie poza Polską', meta: 'Potrzebne Zezwolenie Typ A do wizy' }
      ],
      step2Title: 'Parametr 02: Docelowe Miasto w Polsce',
      step2Sub: 'Twój adres zamieszkania decyduje o tym, który Urząd Wojewódzki rozpatruje Twój wniosek.',
      step3Title: 'Parametr 03: Podstawa Zatrudnienia lub Pobytu',
      step3Sub: 'Wybierz opcję najlepiej opisującą Twoją umowę lub sytuację rodzinną w Polsce.',
      employments: [
        { value: 'standard-contract', title: 'Praca / Oferta Pracy w Polsce', meta: 'Umowa o pracę lub Umowa zlecenie' },
        { value: 'high-skill', title: 'Specjalista Wysokich Kwalifikacji / IT', meta: 'Dyplom wyższej uczelni lub 5+ lat doświadczenia' },
        { value: 'employer-sponsor', title: 'Zezwolenie na Pracę do Wizy', meta: 'Pracodawca gotowy złożyć Zezwolenie Typ A' },
        { value: 'family-join', title: 'Dołączenie do Małżonka / Rodziny', meta: 'Łączenie rodzin i dostęp do rynku pracy' }
      ],
      backBtn: '← Wstecz',
      nextToCityBtn: 'Dalej: Wybór Miasta →',
      nextToEmpBtn: 'Dalej: Zatrudnienie →',
      calcBtn: 'Pokaż Wynik Kwalifikacji →',
      resultBadge: 'Ścieżka 98,4% Skuteczności • Zweryfikowane Dopasowanie',
      statOffice: 'Właściwy Urząd',
      statTime: 'Szacowany Czas',
      statFee: 'Opłata Skarbowa',
      nameLabel: 'Imię i Nazwisko',
      namePlaceholder: 'np. Olena Kovalenko',
      contactLabel: 'Telefon / WhatsApp lub E-mail',
      contactPlaceholder: '+48 500 000 000 lub e-mail',
      resetBtn: 'Zacznij od Nowa',
      submitBtn: 'Umów Bezpłatną 20-Min Konsultację',
      submittedBtn: 'Konsultacja Potwierdzona ✓',
      results: {
        czasowyTitle: 'Rekomendacja: Karta Pobytu Czasowego i Pracy (Art. 114)',
        bluecardTitle: 'Rekomendacja: Niebieska Karta UE (Art. 127)',
        workTitle: 'Rekomendacja: Wojewódzkie Zezwolenie na Pracę (Typ A)',
        familyTitle: 'Rekomendacja: Karta Pobytu — Połączenie z Rodziną (Art. 159)'
      }
    },
    stories: {
      eyebrow: 'SEKCJA 04 — ZWERYFIKOWANE ARCHIWUM SPRAW',
      title: 'Profesjonaliści Pracujący i Mieszkający w Całej Polsce',
      subtitle:
        'Udokumentowane harmonogramy spraw oraz zweryfikowane decyzje specjalistów, którzy powierzyli MobilWork reprezentację przed Urzędem Wojewódzkim.',
      verifiedDecision: 'Zweryfikowana Decyzja',
      permitPrefix: 'Tryb:',
      viewAllBtn: 'Zobacz Pełne Archiwum Spraw →',
      items: [
        {
          name: 'Maya Singh',
          role: 'Senior Cloud Engineer • Kraków',
          flag: '🇮🇳 IN',
          duration: 'Decyzja w 11 Tygodni',
          permit: 'Niebieska Karta UE (Art. 127)',
          image: '/assets/images/candidate-krakow.jpg',
          quote:
            'Obawiałam się utraty legalnego pobytu przy zmianie pracy w Krakowie. MobilWork w 24 godziny zaudytował moją nową umowę, przetłumaczył dyplom inżynierski i towarzyszył mi w Małopolskim Urzędzie Wojewódzkim. Otrzymałam 3-letnią Niebieską Kartę UE bez ani jednego wezwania.',
          challenge: 'Zmiana pracodawcy w trakcie pobytu + weryfikacja apostille dyplomu według znowelizowanego Art. 127.'
        },
        {
          name: 'Mateo Herrera',
          role: 'Koordynator Łańcucha Dostaw • Bydgoszcz',
          flag: '🇨🇴 CO',
          duration: 'Decyzja w 3,2 Miesiąca',
          permit: 'Karta Pobytu Czasowego (Art. 114)',
          image: '/assets/images/candidate-bydgoszcz.jpg',
          quote:
            'Przyjazd z Kolumbii w ruchu bezwizowym dawał mi bardzo mało czasu. Zespół MobilWork w Bydgoszczy skoordynował bezpośrednio z moim pracodawcą Załącznik nr 1 i umówił odciski palców w Kujawsko-Pomorskim Urzędzie przed upływem 90 dni.',
          challenge: 'Limit 90 dni ruchu bezwizowego wymagający ekspresowej Informacji Starosty i pilnej rezerwacji biometrii.'
        },
        {
          name: 'Linh Nguyen',
          role: 'Analityk Danych FinTech • Warszawa',
          flag: '🇻🇳 VN',
          duration: 'Decyzja w 14 Tygodni',
          permit: 'Zezwolenie Jednolite — Pobyt i Praca',
          image: '/assets/images/candidate-warsaw-cafe.jpg',
          quote:
            'Samodzielne zdobycie terminu w systemie INPOL w Warszawie graniczyło z cudem. MobilWork działał jako mój oficjalny Pełnomocnik, złożył kompletny wniosek w Mazowieckim Urzędzie i informował mnie o każdym kroku inspektora.',
          challenge: 'Rezerwacja terminu w obciążonym systemie INPOL w Warszawie oraz uzgodnienie składek ZUS RCA.'
        },
        {
          name: 'Lucas i Sofia Mendes',
          role: 'Product Designer z Małżonką • Gdańsk',
          flag: '🇧🇷 BR',
          duration: 'Decyzja w 3,5 Miesiąca',
          permit: 'Połączenie z Rodziną (Art. 159)',
          image: '/assets/images/candidate-gdansk.jpg',
          quote:
            'MobilWork złożył jednocześnie mój wniosek pracowniczy oraz wniosek żony o Połączenie z Rodziną w Gdańsku. Przeprowadzili transkrypcję naszego brazylijskiego aktu małżeństwa w USC i odebraliśmy karty tego samego dnia!',
          challenge: 'Jednoczesne złożenie wniosków dla głównego aplikanta i małżonki wraz z transkrypcją aktu małżeństwa w USC.'
        }
      ]
    },
    faq: {
      eyebrow: 'SEKCJA 05 — WYJAŚNIENIA USTAWOWE',
      title: 'Najczęściej Zadawane Pytania o Legalizację Pobytu',
      subtitle: 'Konkretne odpowiedzi prawne dotyczące stempla z Art. 108, zmiany pracodawcy oraz wysokości opłat skarbowych.',
      items: [
        {
          q: 'Czy mogę legalnie przebywać i pracować w Polsce czekając na decyzję o Karcie Pobytu?',
          a: 'Tak, w 100%. Z chwilą złożenia kompletnego wniosku przed upływem ważności wizy lub ruchu bezwizowego, Urząd Wojewódzki umieszcza w paszporcie oficjalny stempel. Zgodnie z Art. 108 Ustawy o cudzoziemcach Twój pobyt w Polsce pozostaje w pełni legalny aż do dnia wydania ostatecznej decyzji.'
        },
        {
          q: 'Czym różni się Zezwolenie na Pracę (Typ A) od Karty Pobytu Czasowego?',
          a: 'Zezwolenie na Pracę Typ A uprawnia do wykonywania pracy na rzecz konkretnego pracodawcy i służy najczęściej do uzyskania wizy krajowej D w polskim konsulacie. Karta Pobytu Czasowego i Pracy (Zezwolenie Jednolite) łączy prawo pobytu i prawo do pracy w jednej biometrycznej karcie ważnej do 3 lat, umożliwiając również podróże po strefie Schengen.'
        },
        {
          q: 'Jakie są oficjalne opłaty urzędowe za wydanie Karty Pobytu?',
          a: 'Opłaty skarbowe wnoszone bezpośrednio na konto właściwego urzędu wynoszą: 440 PLN za zezwolenie na pobyt czasowy i pracę (lub Niebieską Kartę UE), 340 PLN za pobyt w celu połączenia z rodziną lub studia, oraz 100 PLN za wydruk plastikowej karty po uzyskaniu decyzji. Opłata skarbowa od Pełnomocnictwa wynosi 17 PLN.'
        },
        {
          q: 'Czy MobilWork może mnie reprezentować, jeśli mieszkam poza Bydgoszczą lub Warszawą?',
          a: 'Tak. Działając na podstawie pisemnego Pełnomocnictwa (Art. 32–33 KPA), reprezentujemy klientów przed wszystkimi 16 Urzędami Wojewódzkimi w Polsce (w tym w Krakowie, Wrocławiu, Gdańsku, Poznaniu, Katowicach i Łodzi). W urzędzie pojawiasz się osobiście tylko raz w celu złożenia odcisków palców.'
        }
      ]
    },
    footer: {
      brandDesc:
        'Licencjonowana polska agencja pełnomocników administracyjnych wspierająca międzynarodowych specjalistów, rodziny oraz działy HR w uzyskiwaniu Kart Pobytu, Niebieskich Kart UE i zezwoleń na pracę.',
      navTitle: 'Architektura Serwisu',
      officesTitle: 'Kancelarie w Polsce',
      bydgoszczTitle: 'Centrala w Bydgoszczy',
      warsawTitle: 'Oddział w Warszawie',
      newsletterTitle: 'Biuletyn Prawny',
      newsletterDesc:
        'Otrzymuj comiesięczne podsumowania zmian w Ustawie o cudzoziemcach, progach wynagrodzeń i terminach w Urzędach Wojewódzkich.',
      newsletterPlaceholder: 'imie@firma.pl',
      newsletterBtn: 'Zapisz się do Biuletynu',
      newsletterSuccess: '✓ Zapisano do comiesięcznego biuletynu prawa imigracyjnego.',
      disclaimerTitle: 'Nota Prawna Dotycząca Pełnomocnictwa Administracyjnego:',
      disclaimerText:
        'MobilWork Sp. z o.o. świadczy wyspecjalizowane doradztwo imigracyjne, audyt dokumentacji oraz reprezentację administracyjną przed Urzędami Wojewódzkimi i Powiatowymi Urzędami Pracy jako ustanowiony Pełnomocnik zgodnie z Art. 32–33 Kodeksu postępowania administracyjnego (KPA). MobilWork jest niezależnym podmiotem prywatnym.',
      copyright: '© 2026 MobilWork Sp. z o.o. Wszelkie prawa zastrzeżone. Bydgoszcz i Warszawa.',
      privacyLink: 'Polityka Prywatności (RODO)',
      termsLink: 'Warunki Pełnomocnictwa KPA',
      cookiesLink: 'Ustawienia Plików Cookie'
    },
    pages: {
      residence: {
        kicker: 'OBSZAR PRAKTYKI 01 • KARTY POBYTU (POBYT CZASOWY I STAŁY)',
        title: 'Biometryczne Karty Pobytu i Długoterminowa Legalizacja w Polsce',
        lead: 'Kompleksowe zastępstwo procesowe i administracyjne na podstawie Ustawy o cudzoziemcach dla specjalistów, inżynierów, kadry zarządzającej oraz ich rodzin we wszystkich 16 województwach.',
        comparisonTitle: 'Zestawienie Ustawowych Tytułów Pobytowych w Polsce',
        comparisonHeaders: ['Rodzaj Zezwolenia', 'Podstawa Prawna', 'Maks. Ważność', 'Opłata Skarbowa', 'Mobilność Schengen'],
        comparisonRows: [
          ['Pobyt Czasowy i Praca (Jednolite)', 'Art. 114', 'Do 3 Lat', '440 PLN + 100 PLN', '90 / 180 Dni Bezwizowo'],
          ['Niebieska Karta UE (Wysokie Kwalifikacje)', 'Art. 127', 'Do 3 Lat', '440 PLN + 100 PLN', '90 / 180 Dni + Kumulacja w UE'],
          ['Połączenie z Rodziną (Małżonek i Dzieci)', 'Art. 159 / 187', 'Do 3 Lat', '340 PLN + 100 PLN', '90 / 180 Dni + Dostęp do Pracy'],
          ['Rezydent Długoterminowy UE', 'Art. 211', 'Bezterminowo (Karta 5 lat)', '640 PLN + 100 PLN', 'Pełna Mobilność w Unii Europejskiej']
        ]
      },
      work: {
        kicker: 'OBSZAR PRAKTYKI 02 • ZEZWOLENIA NA PRACĘ I OBSŁUGA HR',
        title: 'Wojewódzkie Zezwolenia na Pracę (Typ A / B) i Compliance Pracodawców',
        lead: 'Kompleksowa obsługa wniosków o zezwolenia na pracę przez portal praca.gov.pl dla polskich pracodawców, międzynarodowych zespołów oraz członków zarządu.',
        typesTitle: 'Instrumenty Legalizacji Pracy Cudzoziemców',
        types: [
          {
            code: 'TYP A',
            title: 'Standardowe Wojewódzkie Zezwolenie na Pracę',
            statute: 'Art. 88 pkt 1 • Ważność od 1 do 3 Lat',
            desc: 'Wymagane dla cudzoziemców spoza UE zatrudnianych przez polski podmiot na podstawie umowy o pracę lub zlecenia. Stanowi podstawę wydania wizy krajowej D.'
          },
          {
            code: 'TYP B',
            title: 'Zezwolenie dla Członków Zarządu i Prokurentów',
            statute: 'Art. 88 pkt 2 • Kadra Zarządzająca Sp. z o.o.',
            desc: 'Przeznaczone dla Członków Zarządu, Prokurentów oraz Komplementariuszy przebywających w Polsce powyżej 6 miesięcy w ciągu kolejnych 12 miesięcy.'
          },
          {
            code: 'OŚWIADCZENIE',
            title: 'Oświadczenie o Powierzeniu Wykonywania Pracy',
            statute: 'Tryb Uproszczony PUP • Ważność 24 Miesiące',
            desc: 'Ekspresowa 7-dniowa rejestracja w Powiatowym Urzędzie Pracy dla obywateli Ukrainy, Białorusi, Gruzji, Armenii i Mołdawii bez testu rynku pracy.'
          }
        ]
      },
      legal: {
        kicker: 'ZGODNOŚĆ REGULACYJNA • RODO ORAZ MANDAT KPA',
        title: 'Polityka Prywatności (RODO), Warunki Pełnomocnictwa i Pliki Cookie',
        lead: 'Przejrzystość procedur, zgodność z przepisami prawa administracyjnego oraz ścisła ochrona danych osobowych stanowią fundament działalności MobilWork Sp. z o.o.',
        sections: [
          {
            id: 'rodo',
            code: '01 / RODO',
            title: 'Ochrona Danych Osobowych (RODO / GDPR)',
            body: 'MobilWork Sp. z o.o. (KRS: 0000894120, NIP: 5542981042) z siedzibą przy ul. Gdańskiej 47, 85-005 Bydgoszcz, działa jako Administrator Danych Osobowych zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO). Dane paszportowe, numery PESEL, umowy o pracę oraz deklaracje ZUS przetwarzane są wyłącznie w celu prowadzenia postępowań administracyjnych przed Urzędami Wojewódzkimi.'
          },
          {
            id: 'proxy',
            code: '02 / KPA ART. 32–33',
            title: 'Warunki Zastępstwa przez Pełnomocnika Administracyjnego',
            body: 'Reprezentacja przed Wojewodą odbywa się na podstawie pisemnego Pełnomocnictwa podlegającego opłacie skarbowej 17 PLN. Wynagrodzenie kancelarii jest ustalane ryczałtowo w pisemnej umowie przed rozpoczęciem prac. Opłaty skarbowe (440 PLN / 340 PLN / 100 PLN) wnoszone są bezpośrednio na rachunek właściwego organu podatkowego.'
          },
          {
            id: 'cookies',
            code: '03 / PLIKI COOKIE',
            title: 'Architektura Pamięci Lokalnej i Plików Cookie',
            body: 'Serwis wykorzystuje wyłącznie niezbędne klucze pamięci przeglądarki (takie jak wybrany język interfejsu EN/PL/UA/ES oraz stan kalkulatora kwalifikacji) w celu zapewnienia spójnego działania między podstronami. Nie stosujemy zewnętrznych skryptów śledzących ani reklamowych.'
          }
        ]
      }
    }
  },

  ua: {
    meta: {
      issueTag: 'ЮРИДИЧНА ПРАКТИКА • ЗАКОН ПРО ІНОЗЕМЦІВ (DZ.U. 2026) • УСІ 16 ВОЄВОДСТВ',
      brandTagline: 'Карта Побиту та Дозволи на Роботу',
      lenisStatus: 'Плавна прокрутка Lenis активна'
    },
    nav: {
      home: 'Огляд',
      residence: 'Карти Побиту',
      work: 'Дозволи на Роботу',
      process: 'Процедура',
      stories: 'Історії Клієнтів',
      eligibility: 'Перевірка',
      legal: 'RODO та Умови',
      cta: 'Перевірити Шанси',
      mobileOfficeTitle: 'Офіси у Бидгощі та Варшаві',
      mobileOfficeDesc: 'Ліцензовані адміністративні представники (Pełnomocnicy) у всіх 16 воєводствах Польщі. Пн–Пт 08:30–18:00 CET.'
    },
    hero: {
      eyebrow: '98,4% ПОЗИТИВНИХ РІШЕНЬ З ПЕРШОЇ ПОДАЧІ',
      eyebrowSub: 'Офіційні Представники у Всіх 16 Воєводських Управліннях Польщі',
      titleStart: 'Ваш Шлях до Легального Життя та Роботи в',
      titleItalic: 'Польщі,',
      titleEnd: 'Вивірений до Дрібниць.',
      subtitle:
        'Омініть складну польську бюрократію, черги в Ужонді та затримки через брак документів. Наші двомовні юристи готують, перевіряють і супроводжують вашу справу на Карту Побиту або Дозвіл на Роботу до моменту отримання пластикової картки.',
      widgetTitle: 'Миттєвий Підбір Дозволу та Термінів у Воєводстві',
      widgetBadge: 'Штамп Легального Перебування (Ст. 108) з 1-го Дня',
      fieldPermit: '01 / Оберіть Тип Дозволу',
      fieldCity: '02 / Оберіть Воєводство (Місто)',
      permitOptions: {
        czasowy: 'Карта Тимчасового Побиту (Karta Pobytu Czasowego)',
        work: 'Дозвіл на Роботу (Zezwolenie Typ A / B)',
        bluecard: 'Блакитна Карта ЄС (IT та Інженерія)',
        family: 'Возз’єднання Сім’ї (Чоловік/Дружина та Діти)'
      },
      exploreBtn: 'Розрахувати Терміни та Дозвіл',
      checkBtn: 'Аудит Права на Побит за 60с',
      estDecisionPrefix: 'Орієнтовний термін рішення —',
      stampFeePrefix: 'Державне мито:',
      reassurance1: 'Фіксований Договір — Жодних Прихованих Доплат',
      reassurance2: 'Присяжні Переклади Польською Включено',
      reassurance3: 'Особистий Супровід на Відбитки Пальців',
      collageIssued: '4 280+ Виданих Карток',
      collageVerified: 'Підтверджені Рішення Воєводських Управлінь',
      collageMainTitle: 'Варшава • Мазовецький Ужонд',
      collageMainSub: 'Єдиний Дозвіл та Блакитна Карта ЄС',
      collageMainTag: '14 Тижнів',
      collageLeftTitle: 'Краків • IT-Спеціаліст',
      collageLeftSub: 'Блакитна Карта ЄС (Ст. 127)',
      collageLeftTag: 'Картка на 3 Роки',
      collageRightTitle: 'Гданськ • Сімейний Побит',
      collageRightSub: 'Подружжя з Доступом до Ринку Праці',
      collageRightTag: 'Схвалено'
    },
    metrics: [
      {
        index: '01',
        value: '98,4%',
        label: 'Позитивних Рішень Воєводи з Першої Подачі'
      },
      {
        index: '02',
        value: '48 Годин',
        label: 'Повний Аудит Документів та Підготовка Додатка №1 (Załącznik nr 1)'
      },
      {
        index: '03',
        value: '65+ Країн',
        label: 'Супровід Українською, Польською, Англійською та Іспанською'
      },
      {
        index: '04',
        value: '16 / 16',
        label: 'Воєводств Польщі Охоплено через Офіційне Доручення KPA'
      }
    ],
    process: {
      eyebrow: 'РОЗДІЛ 01 — ПРОЦЕДУРНА АРХІТЕКТУРА',
      title: 'Як Ми Оформлюємо Вашу Карту Побиту та Дозвіл на Роботу',
      subtitle:
        'Ми замінюємо здогадки чітким чотириетапним юридичним протоколом. Натисніть на будь-який етап нижче, щоб побачити, що саме виконує ваш персональний спеціаліст.',
      inspectCta: 'Деталі Етапу',
      nextBtnPrefix: 'Перейти до Етапу',
      bookBtn: 'Почати Безкоштовну Оцінку',
      fullPageLink: 'Читати Повний Опис Процедури →',
      steps: [
        {
          num: '01',
          duration: 'День 1 • Безкоштовно',
          shortTitle: 'Аудит Легальності Перебування',
          shortDesc: 'Перевіряємо ваш паспорт, дні безвізу/візи чи статус UKR та трудовий договір, обираючи найшвидшу правову підставу.',
          badge: 'ЕТАП 01 З 04 • БЕЗКОШТОВНО • 20 ХВИЛИН',
          title: '01. Безкоштовна Консультація та Аудит Легального Перебування',
          summary:
            'Поговоріть із профільним міграційним юристом у Бидгощі, Варшаві або онлайн. Ми підраховуємо залишок легальних днів перебування і будуємо графік подачі без жодного дня перерви у роботі.',
          checklist: [
            'Перевірка днів за візою, безвізом, статусом UKR та Шенгеном',
            'Аналіз трудового договору (Umowa o pracę, Zlecenie або B2B)',
            'Вибір оптимальної підстави: Єдиний Дозвіл (Ст. 114) чи Блакитна Карта ЄС (Ст. 127)',
            'Прозорий письмовий кошторис із фіксованою ціною без сюрпризів'
          ],
          guaranteeTitle: 'Гарантія Безперервного Легального Перебування',
          guaranteeText:
            'Навіть якщо ваша віза чи безвіз закінчується через 5 днів, подача перевіреної заяви через нашого представника миттєво гарантує 100% легальне перебування в Польщі за Ст. 108 до винесення рішення.'
        },
        {
          num: '02',
          duration: 'Дні 2–5',
          shortTitle: 'Підготовка Документів і Робота з HR',
          shortDesc: 'Ми напряму контактуємо з вашим роботодавцем щодо Załącznik nr 1, звітів ZUS та присяжних перекладів.',
          badge: 'ЕТАП 02 З 04 • ДНІ 2–5 • РОБОТА З РОБОТОДАВЦЕМ',
          title: '02. Підготовка Досьє та Юридичний Аудит за 24 Пунктами',
          summary:
            'Вам не доведеться самостійно розбиратися зі складними польськими бланками. Наші спеціалісти напряму зв’язуються з відділом кадрів (HR) вашої компанії для оформлення Додатка №1 та організовують присяжні переклади.',
          checklist: [
            'Пряма координація з польським роботодавцем щодо Załącznik nr 1',
            'Перевірка декларацій ZUS ZUA / ZUS RCA про медичне страхування',
            'Тест ринку праці (Informacja Starosty) або підтвердження звільнення від нього',
            'Присяжні переклади дипломів, свідоцтв про шлюб та народження'
          ],
          guaranteeTitle: 'Нуль Затримок через Формальні Недоліки',
          guaranteeText:
            'Кожна справа проходить 24-пунктовий юридичний аудит перед подачею, щоб інспектор Ужонду не мав підстав зупиняти розгляд вимогою донести документи.'
        },
        {
          num: '03',
          duration: 'Тиждень 2',
          shortTitle: 'Подача в Ужонд і Біометрія',
          shortDesc: 'Бронюємо пріоритетний візит в Ужонд, супроводжуємо вас на здачу відбитків пальців і ставимо штамп у паспорт.',
          badge: 'ЕТАП 03 З 04 • ТИЖДЕНЬ 2 • ПОДАЧА В УЖОНД',
          title: '03. Офіційна Подача у Воєводське Управління та Відбитки Пальців',
          summary:
            'Ми бронюємо дату через портали INPOL / MOS, реєструємо офіційну Довіреність (Pełnomocnictwo) та особисто супроводжуємо вас до Ужонду Воєвудського для здачі відбитків пальців.',
          checklist: [
            'Пріоритетний запис у системі INPOL та чергах воєводських управлінь',
            'Особистий супровід координатора під час здачі біометрії',
            'Миттєвий офіційний штамп у паспорті про легальне перебування',
            'Уся кореспонденція з Ужонду надходить напряму до нашого юридичного реєстру'
          ],
          guaranteeTitle: 'Штамп Легального Перебування в День Подачі',
          guaranteeText:
            'Щойно ваші відбитки пальців прийнято та поставлено штамп, ваше перебування в Польщі повністю захищене законом згідно зі Ст. 108 Закону про іноземців.'
        },
        {
          num: '04',
          duration: 'Рішення і Картка',
          shortTitle: 'Отримання Карти Побиту',
          shortDesc: 'Відповідаємо на всі листи інспектора від вашого імені, перевіряємо позитивне рішення та записуємо на отримання пластику.',
          badge: 'ЕТАП 04 З 04 • РІШЕННЯ ТА ОТРИМАННЯ КАРТКИ',
          title: '04. Отримання Пластикової Карти Побиту',
          summary:
            'Поки ви займаєтеся кар’єрою та життям у Польщі, ми щотижня моніторимо статус справи, відповідаємо на запити інспектора, перевіряємо Позитивне Рішення (Decyzja Pozytywna) та бронюємо отримання картки.',
          checklist: [
            'Проактивний моніторинг справи та щомісячне оновлення даних ZUS',
            'Перевірка правильності персональних даних на надрукованій Карті Побиту',
            'Допомога з оплатою 100 PLN за пластик та перевіркою PESEL',
            'Планування подальшого переходу на 5-річну Карту Резидента ЄС'
          ],
          guaranteeTitle: 'Повна Підтримка до Отримання Картки на Руки',
          guaranteeText:
            'Наш договір завершується лише тоді, коли ви тримаєте в руках фізичну Карту Побиту або рішення про дозвіл на роботу.'
        }
      ]
    },
    services: {
      eyebrow: 'РОЗДІЛ 02 — НАПРЯМКИ ЮРИДИЧНОЇ ПРАКТИКИ',
      title: 'Дозволи для Вашої Кар’єри та Родини у Польщі',
      subtitle:
        'Кожен пакет включає офіційну Довіреність (Pełnomocnictwo), пряму взаємодію з HR-відділом роботодавця та моніторинг справи у системах INPOL і MOS.',
      filterAll: 'Усі Дозволи (04)',
      filterResidence: 'Карти Побиту',
      filterWork: 'Дозволи на Роботу',
      filterFamily: 'Сім’я та Діти',
      citySelectorLabel: 'Юрисдикція Воєводства:',
      estProcessingLabel: 'Орієнтовний Термін',
      showChecklistBtn: 'Переглянути Список Документів',
      hideChecklistBtn: 'Приховати Список Документів',
      applyBtn: 'Обрати та Перевірити Шанси →',
      exploreResidencePage: 'Детальніше про Карти Побиту →',
      exploreWorkPage: 'Детальніше про Дозволи на Роботу →',
      cards: [
        {
          key: 'czasowy' as PermitKey,
          category: 'residence',
          index: '01',
          statute: 'Karta Pobytu Czasowego • Ст. 114 / Ст. 187',
          title: 'Тимчасовий Побит і Робота (Czasowy)',
          desc: 'Єдиний дозвіл на легальне проживання та роботу в Польщі терміном до 3 років із правом безвізових подорожей 29 країнами Шенгенської зони.',
          features: [
            'Повна підготовка Załącznik nr 1 разом із відділом кадрів вашого роботодавця',
            'Тест ринку праці (Informacja Starosty) або перевірка звільнення від нього',
            'Штамп у паспорті, що гарантує 100% легальне перебування під час розгляду'
          ],
          checklistTitle: 'Основні Документи та Державні Збори:',
          checklistItems: [
            'Дійсний закордонний паспорт + 4 біометричні фото (35×45мм)',
            'Підписаний трудовий договір + Додаток №1 від роботодавця',
            'Підтвердження страхування ZUS ZUA / ZUS RCA та договір оренди житла'
          ],
          feeNote: 'Державне мито: 440 PLN + 100 PLN за пластикову картку'
        },
        {
          key: 'work' as PermitKey,
          category: 'work',
          index: '02',
          statute: 'Zezwolenie na Pracę Typ A / B та Oświadczenie',
          title: 'Дозволи на Роботу (Typ A / B)',
          desc: 'Прискорене оформлення воєводських дозволів на роботу для відкриття національної візи D або легального працевлаштування у польській компанії.',
          features: [
            'Typ A: Стандартні працівники польських компаній (від 1 до 3 років)',
            'Typ B: Члени правління товариств (Członek Zarządu Sp. z o.o.)',
            '100% цифрова подача через praca.gov.pl та кур’єрська доставка оригіналу'
          ],
          checklistTitle: 'Основні Документи та Державні Збори:',
          checklistItems: [
            'Повний скан паспорта кандидата (усі сторінки з відмітками)',
            'Витяг KRS / CEIDG компанії та декларація про відсутність боргів ZUS',
            'Опис посадових обов’язків та сертифікати кваліфікації'
          ],
          feeNote: 'Воєводський збір: 100 PLN (50 PLN до 3 місяців)'
        },
        {
          key: 'bluecard' as PermitKey,
          category: 'residence',
          index: '03',
          statute: 'Niebieska Karta UE • Ст. 127 Висока Кваліфікація',
          title: 'Блакитна Карта ЄС (EU Blue Card)',
          desc: 'Преміальна 3-річна карта побиту для IT-інженерів, аналітиків даних, фінансистів та керівників із вищою освітою або 5+ роками досвіду.',
          features: [
            'Повна свобода зміни роботодавця після 12 місяців роботи',
            'Сумування стажу проживання в різних країнах ЄС для 5-річного Резидента ЄС',
            'Миттєвий вільний доступ до ринку праці для чоловіка/дружини'
          ],
          checklistTitle: 'Основні Документи та Державні Збори:',
          checklistItems: [
            'Контракт від 1 року із зарплатою, не нижчою за законодавчий поріг брутто',
            'Диплом ВНЗ (з апостилем і присяжним перекладом) або 5 років досвіду в IT',
            'Страхування ZUS та договір оренди житла в Польщі'
          ],
          feeNote: 'Державне мито: 440 PLN + 100 PLN за пластикову картку'
        },
        {
          key: 'family' as PermitKey,
          category: 'family',
          index: '04',
          statute: 'Połączenie z Rodziną • Ст. 159 / Ст. 187',
          title: 'Возз’єднання Сім’ї',
          desc: 'Перевезіть чоловіка/дружину, партнера та дітей до Польщі з повним доступом до медицини NFZ, шкільної освіти та вільним доступом до праці.',
          features: [
            'Транскрипція свідоцтв про шлюб і народження у польському РАЦС (USC)',
            'Розрахунок чистого доходу на члена сім’ї та реєстрація ZUS ZCNA',
            'Одночасна подача заяв для основного заявника та членів родини'
          ],
          checklistTitle: 'Основні Документи та Державні Збори:',
          checklistItems: [
            'Свідоцтво про шлюб або народження з апостилем + присяжний переклад',
            'Трудовий договір спонсора, декларація PIT та реєстрація ZUS ZCNA',
            'Договір оренди житла, що охоплює всіх членів домогосподарства'
          ],
          feeNote: 'Державне мито: 340 PLN + 100 PLN картка (50 PLN для дітей)'
        }
      ]
    },
    eligibility: {
      eyebrow: 'РОЗДІЛ 03 — АЛГОРИТМІЧНИЙ АУДИТ ПРАВА НА ПОБИТ',
      title: 'Перевірте Право на Отримання Карти Побиту за 60 Секунд',
      subtitle:
        'Вкажіть три параметри щодо вашого громадянства, міста в Польщі та статусу зайнятості. Ви миттєво отримаєте рекомендацію типу дозволу, терміни розгляду у воєводстві та перелік документів.',
      benefit1Title: 'Перевірено за Законодавством Польщі 2026',
      benefit1Desc: 'Враховує актуальні пороги мінімальної зарплати, оновлені правила Блакитної Карти ЄС та реальні черги в Ужондах.',
      benefit2Title: '100% Конфіденційно та Захищено RODO',
      benefit2Desc: 'Ваші відповіді використовуються виключно для формування вашого персонального чек-листа документів.',
      benefit3Title: 'Термінова Лінія до Закінчення Візи',
      benefit3Desc: 'Прямий зв’язок з офісами у Бидгощі та Варшаві: +48 52 511 84 20 (Пн–Пт 08:30–18:00).',
      pills: ['01 Громадянство', '02 Воєводство', '03 Зайнятість'],
      step1Title: 'Параметр 01: Громадянство та Поточне Місцезнаходження',
      step1Sub: 'Допомагає визначити, чи підпадаєте ви під спрощені правила ринку праці.',
      citizenshipLabel: 'Оберіть Країну Громадянства',
      locationLabel: 'Де ви зараз перебуваєте?',
      locations: [
        { value: 'in-poland-visa', title: 'Вже у Польщі (Віза / Штамп / UKR)', meta: 'Національна віза D, статус UKR або штамп' },
        { value: 'in-poland-card', title: 'У Польщі (Продовження Карти)', meta: 'Оновлення карти або зміна роботодавця' },
        { value: 'in-poland-visafree', title: 'У Польщі (90 Днів Безвізу)', meta: 'В’їзд за біометричним паспортом' },
        { value: 'abroad', title: 'Зараз Поза Межами Польщі', meta: 'Потрібен Дозвіл на Роботу для візи' }
      ],
      step2Title: 'Параметр 02: Цільове Місто у Польщі',
      step2Sub: 'Ваша адреса проживання визначає, яке Воєводське Управління розглядатиме вашу заяву.',
      step3Title: 'Параметр 03: Поточний Статус Зайнятості',
      step3Sub: 'Оберіть варіант, який найкраще описує ваш трудовий договір або сімейну ситуацію в Польщі.',
      employments: [
        { value: 'standard-contract', title: 'Працюю / Маю Офер у Польщі', meta: 'Umowa o pracę або Umowa zlecenie' },
        { value: 'high-skill', title: 'Висококваліфікований Спеціаліст / IT', meta: 'Вища освіта або 5+ років досвіду' },
        { value: 'employer-sponsor', title: 'Потрібен Дозвіл на Роботу для Візи', meta: 'Роботодавець готовий оформити Zezwolenie Typ A' },
        { value: 'family-join', title: 'Приєднання до Чоловіка / Дружини', meta: 'Возз’єднання сім’ї та доступ до ринку праці' }
      ],
      backBtn: '← Назад',
      nextToCityBtn: 'Далі: Вибір Міста →',
      nextToEmpBtn: 'Далі: Зайнятість →',
      calcBtn: 'Показати Мій Результат →',
      resultBadge: '98,4% Шанс Схвалення • Підтверджена Відповідність',
      statOffice: 'Цільовий Ужонд',
      statTime: 'Орієнтовний Термін',
      statFee: 'Держмито',
      nameLabel: 'Ваше Повне Ім’я',
      namePlaceholder: 'напр. Олена Коваленко',
      contactLabel: 'Телефон / WhatsApp або Email',
      contactPlaceholder: '+48 500 000 000 або email',
      resetBtn: 'Почати Спочатку',
      submitBtn: 'Записатися на Безкоштовний Розбір (20 хв)',
      submittedBtn: 'Консультацію Підтверджено ✓',
      results: {
        czasowyTitle: 'Рекомендовано: Карта Тимчасового Побиту та Роботи (Ст. 114)',
        bluecardTitle: 'Рекомендовано: Блакитна Карта ЄС (Niebieska Karta UE — Ст. 127)',
        workTitle: 'Рекомендовано: Воєводський Дозвіл на Роботу (Zezwolenie Typ A)',
        familyTitle: 'Рекомендовано: Карта Побиту — Возз’єднання Сім’ї (Ст. 159)'
      }
    },
    stories: {
      eyebrow: 'РОЗДІЛ 04 — ПІДТВЕРДЖЕНІ КЕЙСИ КЛІЄНТІВ',
      title: 'Фахівці, Які Легально Живуть та Працюють по Всій Польщі',
      subtitle:
        'Реальні терміни розгляду та підтверджені рішення міжнародних спеціалістів, які довірили MobilWork супровід своїх справ у Воєводських Управліннях.',
      verifiedDecision: 'Підтверджене Рішення',
      permitPrefix: 'Стаття:',
      viewAllBtn: 'Переглянути Всі Історії Клієнтів →',
      items: [
        {
          name: 'Майя Сінгх',
          role: 'Senior Cloud Engineer • Краків',
          flag: '🇮🇳 IN',
          duration: 'Схвалено за 11 Тижнів',
          permit: 'Блакитна Карта ЄС (Ст. 127)',
          image: '/assets/images/candidate-krakow.jpg',
          quote:
            'Я дуже хвилювалася через зміну роботи у Кракові. MobilWork за 24 години перевірив мій новий контракт, переклав інженерний диплом і супроводив мене до Малопольського Ужонду. Я отримала 3-річну Блакитну Карту ЄС без жодного запиту про донесення документів.',
          challenge: 'Зміна роботодавця під час побиту + апостиль диплома за оновленими вимогами Ст. 127.'
        },
        {
          name: 'Матео Еррера',
          role: 'Координатор Логістики • Бидгощ',
          flag: '🇨🇴 CO',
          duration: 'Схвалено за 3,2 Місяці',
          permit: 'Карта Тимчасового Побиту (Ст. 114)',
          image: '/assets/images/candidate-bydgoszcz.jpg',
          quote:
            'Приїзд із Колумбії по безвізу залишав мені обмаль часу. Команда MobilWork у Бидгощі напряму узгодила з моїм роботодавцем Załącznik nr 1 і записала мене на відбитки пальців у Куявсько-Поморському Ужонді до закінчення 90 днів.',
          challenge: 'Ліміт 90 днів безвізу, що вимагав термінового тесту ринку праці та швидкого запису на біометрію.'
        },
        {
          name: 'Лінь Нгуєн',
          role: 'FinTech Аналітик Даних • Варшава',
          flag: '🇻🇳 VN',
          duration: 'Схвалено за 14 Тижнів',
          permit: 'Єдиний Дозвіл на Побит і Роботу',
          image: '/assets/images/candidate-warsaw-cafe.jpg',
          quote:
            'Самостійно зловити слот в INPOL у Варшаві було нереально. MobilWork виступив моїм офіційним представником (Pełnomocnik), подав документи в Мазовецький Ужонд і надсилав мені повідомлення у WhatsApp при кожному оновленні справи.',
          challenge: 'Бронювання черги в перевантаженій системі INPOL у Варшаві та звірка внесків ZUS RCA.'
        },
        {
          name: 'Лукас і Софія Мендес',
          role: 'Product Designer з Дружиною • Гданськ',
          flag: '🇧🇷 BR',
          duration: 'Схвалено за 3,5 Місяці',
          permit: 'Возз’єднання Сім’ї (Ст. 159)',
          image: '/assets/images/candidate-gdansk.jpg',
          quote:
            'MobilWork подав мою робочу карту побиту та заяву дружини на возз’єднання сім’ї одночасно у Гданську. Вони провели транскрипцію нашого свідоцтва про шлюб у польському РАЦС (USC), і ми отримали картки в один день!',
          challenge: 'Одночасна подача основного заявника та дружини із транскрипцією іноземного свідоцтва про шлюб.'
        }
      ]
    },
    faq: {
      eyebrow: 'РОЗДІЛ 05 — ЮРИДИЧНІ РОЗ’ЯСНЕННЯ',
      title: 'Часті Запитання про Польські Дозволи та Карти Побиту',
      subtitle: 'Чіткі відповіді без складного жаргону про штамп легального перебування (Ст. 108), зміну роботодавця та державні збори.',
      items: [
        {
          q: 'Чи можу я легально перебувати і працювати в Польщі під час очікування рішення по Карті Побиту?',
          a: 'Так, на 100%. Щойно повну заяву подано до закінчення вашої поточної візи чи безвізового періоду, Воєводське Управління ставить офіційний штамп у паспорті. Згідно зі Статтею 108 Закону про іноземців, ваше перебування в Польщі залишається повністю легальним до винесення остаточного рішення.'
        },
        {
          q: 'У чому різниця між Дозволом на Роботу (Zezwolenie Typ A) та Картою Побиту?',
          a: 'Дозвіл на Роботу (Typ A) дає право працювати на конкретного польського роботодавця і зазвичай використовується для відкриття національної візи D у консульстві. Карта Тимчасового Побиту (Single Permit) поєднує право на проживання в Польщі та право на роботу в одній біометричній картці терміном до 3 років і дозволяє подорожувати країнами Шенгену без віз.'
        },
        {
          q: 'Які офіційні державні збори в Польщі за оформлення Карти Побиту?',
          a: 'Офіційні платежі сплачуються напряму на податковий рахунок міста/воєводства: 440 PLN гербового збору за Тимчасовий Побит і Роботу (або Блакитну Карту ЄС), 340 PLN за Возз’єднання Сім’ї або Навчання, плюс 100 PLN за друк пластикової картки після схвалення. Державне мито за Довіреність (Pełnomocnictwo) становить 17 PLN.'
        },
        {
          q: 'Чи може MobilWork представляти мене, якщо я живу не в Бидгощі чи Варшаві?',
          a: 'Так. Завдяки письмовій Довіреності (Pełnomocnictwo за Ст. 32–33 KPA) уся офіційна кореспонденція з будь-якого з 16 Воєводських Управлінь Польщі (включаючи Краків, Вроцлав, Гданськ, Познань, Катовіце та Лодзь) надходить напряму до нашого юридичного офісу. Вам потрібно лише один раз особисто здати відбитки пальців.'
        }
      ]
    },
    footer: {
      brandDesc:
        'Надійна польська агенція адміністративних представників, що допомагає міжнародним фахівцям, сім’ям та роботодавцям з оформленням Карт Побиту, Блакитних Карт ЄС та дозволів на роботу.',
      navTitle: 'Навігація Порталом',
      officesTitle: 'Наші Офіси у Польщі',
      bydgoszczTitle: 'Головний Офіс у Бидгощі',
      warsawTitle: 'Філія у Варшаві',
      newsletterTitle: 'Оновлення Міграційного Права',
      newsletterDesc:
        'Отримуйте щомісячні огляди змін до Закону про іноземців, порогів мінімальної зарплати та сповіщення про черги в Ужондах.',
      newsletterPlaceholder: 'name@company.com',
      newsletterBtn: 'Підписатися на Дайджест',
      newsletterSuccess: '✓ Ви підписалися на щомісячні огляди міграційного права Польщі.',
      disclaimerTitle: 'Юридичне Застереження щодо Адміністративного Представництва:',
      disclaimerText:
        'MobilWork Sp. z o.o. надає спеціалізовані міграційні консультації, аудит документів та адміністративне представництво перед Воєводськими Управліннями (Urzędy Wojewódzkie) та Повітовими Управліннями Праці як уповноважений представник (Pełnomocnik) згідно зі Статтями 32–33 Адміністративно-процесуального кодексу Польщі (KPA).',
      copyright: '© 2026 MobilWork Sp. z o.o. Усі права захищено. Бидгощ і Варшава, Польща.',
      privacyLink: 'Політика Конфіденційності (RODO)',
      termsLink: 'Умови Представництва KPA',
      cookiesLink: 'Налаштування Cookie'
    },
    pages: {
      residence: {
        kicker: 'НАПРЯМОК ПРАКТИКИ 01 • КАРТИ ПОБИТУ (KARTA POBYTU)',
        title: 'Біометричні Карти Побиту та Довгострокове Проживання в Польщі',
        lead: 'Комплексне адміністративне представництво згідно із Законом про іноземців для спеціалістів, інженерів, керівників та членів їхніх родин у всіх 16 воєводствах.',
        comparisonTitle: 'Порівняння Основних Типів Карт Побиту в Польщі',
        comparisonHeaders: ['Тип Дозволу', 'Правова Підстава', 'Макс. Термін', 'Держмито', 'Шенгенська Мобільність'],
        comparisonRows: [
          ['Тимчасовий Побит і Робота (Єдиний Дозвіл)', 'Ст. 114', 'До 3 Років', '440 PLN + 100 PLN', '90 / 180 Днів Безвізу'],
          ['Блакитна Карта ЄС (Висока Кваліфікація)', 'Ст. 127', 'До 3 Років', '440 PLN + 100 PLN', '90 / 180 Днів + Накопичення в ЄС'],
          ['Возз’єднання Сім’ї (Подружжя та Діти)', 'Ст. 159 / 187', 'До 3 Років', '340 PLN + 100 PLN', '90 / 180 Днів + Вільний Доступ до Праці'],
          ['Довгостроковий Резидент ЄС', 'Ст. 211', 'Безстроково (Картка 5 р.)', '640 PLN + 100 PLN', 'Повна Мобільність у ЄС']
        ]
      },
      work: {
        kicker: 'НАПРЯМОК ПРАКТИКИ 02 • ДОЗВОЛИ НА РОБОТУ ТА HR-СУПРОВІД',
        title: 'Воєводські Дозволи на Роботу (Typ A / B) та Корпоративний Комплаєнс',
        lead: 'Оформлення дозволів на роботу під ключ через портал praca.gov.pl для польських роботодавців, рекрутингових команд та членів правління компаній.',
        typesTitle: 'Інструменти Легалізації Праці в Польщі',
        types: [
          {
            code: 'TYP A',
            title: 'Стандартний Воєводський Дозвіл на Роботу',
            statute: 'Ст. 88 п. 1 • Термін дії від 1 до 3 Років',
            desc: 'Необхідний для громадян країн поза ЄС, які працевлаштовуються у польську компанію. Дозволяє отримати національну візу D у консульстві Польщі.'
          },
          {
            code: 'TYP B',
            title: 'Дозвіл для Членів Правління (Sp. z o.o.)',
            statute: 'Ст. 88 п. 2 • Керівники Компаній',
            desc: 'Призначений для Членів Правління (Członek Zarządu) та Прокуристів, які перебувають у Польщі понад 6 місяців протягом будь-яких 12 місяців.'
          },
          {
            code: 'OŚWIADCZENIE',
            title: 'Освядчення (Прискорена Декларація PUP)',
            statute: 'Спрощений Трек • Термін дії 24 Місяці',
            desc: 'Прискорена 7-денна реєстрація у Повітовому Управлінні Праці для громадян України, Білорусі, Грузії, Вірменії та Молдови без тесту ринку праці.'
          }
        ]
      },
      legal: {
        kicker: 'РЕГУЛЯТОРНА ВІДПОВІДНІСТЬ • RODO ТА МАНДАТ KPA',
        title: 'Політика Конфіденційності (RODO), Умови Представництва та Cookie',
        lead: 'Прозорість, дотримання норм адміністративного права та сувора конфіденційність клієнтських даних є основою роботи MobilWork Sp. z o.o. у Бидгощі та Варшаві.',
        sections: [
          {
            id: 'rodo',
            code: '01 / RODO',
            title: 'Захист Персональних Даних (GDPR / RODO)',
            body: 'MobilWork Sp. z o.o. (KRS: 0000894120, NIP: 5542981042), головний офіс: ul. Gdańska 47, 85-005 Bydgoszcz, виступає Адміністратором Персональних Даних згідно з Регламентом (ЄС) 2016/679 (RODO). Паспортні дані, номери PESEL, трудові договори та звіти ZUS обробляються виключно з метою підготовки та подачі заяв до Воєводських Управлінь.'
          },
          {
            id: 'proxy',
            code: '02 / KPA СТ. 32–33',
            title: 'Умови Адміністративного Представництва (Pełnomocnictwo)',
            body: 'Представництво перед Воєводськими Управліннями здійснюється на підставі письмової Довіреності (Pełnomocnictwo), що підлягає державному миту 17 PLN. Вартість послуг фіксується у письмовому договорі до початку роботи. Державні збори (440 PLN / 340 PLN / 100 PLN) сплачуються напряму на рахунок відповідного органу влади.'
          },
          {
            id: 'cookies',
            code: '03 / COOKIES',
            title: 'Налаштування Файлів Cookie та Локального Сховища',
            body: 'Цей портал використовує виключно необхідні ключі локального сховища (такі як обрана мова інтерфейсу EN/PL/UA/ES та параметри калькулятора) для збереження ваших налаштувань між сторінками. Сторонні рекламні трекери не використовуються.'
          }
        ]
      }
    }
  },

  es: {
    meta: {
      issueTag: 'PRÁCTICA LEGAL • LEY DE EXTRANJERÍA (DZ.U. 2026) • LAS 16 VOIVODÍAS',
      brandTagline: 'Karta Pobytu y Permisos de Trabajo',
      lenisStatus: 'Desplazamiento suave Lenis activo'
    },
    nav: {
      home: 'Resumen',
      residence: 'Permisos de Residencia',
      work: 'Permisos de Trabajo',
      process: 'El Proceso',
      stories: 'Casos de Éxito',
      eligibility: 'Elegibilidad',
      legal: 'Legal y RGPD',
      cta: 'Evaluar Elegibilidad',
      mobileOfficeTitle: 'Oficinas en Bydgoszcz y Varsovia',
      mobileOfficeDesc: 'Representantes administrativos autorizados (Pełnomocnicy) en las 16 voivodías de Polonia. Lun–Vie 08:30–18:00 CET.'
    },
    hero: {
      eyebrow: '98,4% DE APROBACIÓN EN PRIMERA INSTANCIA',
      eyebrowSub: 'Representantes Administrativos Autorizados en las 16 Voivodías Polacas',
      titleStart: 'Su Camino para Vivir y Trabajar en',
      titleItalic: 'Polonia,',
      titleEnd: 'con Precisión Jurídica.',
      subtitle:
        'Evite la compleja burocracia polaca, las largas filas en el Urząd y los retrasos por falta de documentos. Nuestros apoderados bilingües preparan, auditan y representan su Karta Pobytu o Permiso de Trabajo desde el primer día hasta que reciba su tarjeta física.',
      widgetTitle: 'Buscador Instantáneo de Permisos y Plazos por Voivodía',
      widgetBadge: 'Sello de Estancia Legal (Art. 108) el Día 1',
      fieldPermit: '01 / Seleccione el Tipo de Permiso',
      fieldCity: '02 / Seleccione su Ciudad / Voivodía',
      permitOptions: {
        czasowy: 'Residencia Temporal y Trabajo (Karta Pobytu Czasowego)',
        work: 'Permiso de Trabajo (Zezwolenie Tipo A / B)',
        bluecard: 'Tarjeta Azul UE (TI e Ingeniería de Alta Cualificación)',
        family: 'Reunificación Familiar (Cónyuge e Hijos)'
      },
      exploreBtn: 'Ver Permiso y Plazo Estimado',
      checkBtn: 'Test de Elegibilidad en 60s',
      estDecisionPrefix: 'Decisión estimada en',
      stampFeePrefix: 'Tasa gubernamental:',
      reassurance1: 'Contrato de Tarifa Fija — Sin Costos Ocultos',
      reassurance2: 'Traductores Jurados de Polaco Incluidos',
      reassurance3: 'Acompañamiento Presencial en Huellas Dactilares',
      collageIssued: '4.280+ Tarjetas Emitidas',
      collageVerified: 'Decisiones Verificadas del Urząd Wojewódzki',
      collageMainTitle: 'Varsovia • Mazowiecki Urząd',
      collageMainSub: 'Permiso Único y Tarjeta Azul UE',
      collageMainTag: '14 Semanas',
      collageLeftTitle: 'Cracovia • Especialista TI',
      collageLeftSub: 'Tarjeta Azul UE (Art. 127)',
      collageLeftTag: 'Tarjeta 3 Años',
      collageRightTitle: 'Gdańsk • Permiso Familiar',
      collageRightSub: 'Cónyuge y Libre Acceso Laboral',
      collageRightTag: 'Aprobado'
    },
    metrics: [
      {
        index: '01',
        value: '98,4%',
        label: 'Decisiones Positivas en la Primera Presentación'
      },
      {
        index: '02',
        value: '48 Horas',
        label: 'Auditoría Documental Completa y Anexo Nº 1 del Empleador'
      },
      {
        index: '03',
        value: '65+ Países',
        label: 'Asesoría en Español, Inglés, Polaco y Ucraniano'
      },
      {
        index: '04',
        value: '16 / 16',
        label: 'Voivodías Polacas Cubiertas mediante Poder Legal KPA'
      }
    ],
    process: {
      eyebrow: 'SECCIÓN 01 — ARQUITECTURA PROCEDIMENTAL',
      title: 'Cómo Aseguramos su Permiso de Residencia y Trabajo en Polonia',
      subtitle:
        'Reemplazamos la incertidumbre burocrática por un protocolo jurídico estructurado en cuatro etapas. Seleccione cualquier etapa para inspeccionar el trabajo exacto de nuestros especialistas.',
      inspectCta: 'Inspeccionar Etapa',
      nextBtnPrefix: 'Avanzar a la Etapa',
      bookBtn: 'Iniciar Evaluación Gratuita',
      fullPageLink: 'Leer el Dossier Completo del Proceso →',
      steps: [
        {
          num: '01',
          duration: 'Día 1 • Gratis',
          shortTitle: 'Auditoría de Estancia Legal',
          shortDesc: 'Revisamos su pasaporte, días Schengen/visa disponibles y contrato laboral para elegir la vía legal más rápida.',
          badge: 'ETAPA 01 DE 04 • SIN COSTO • 20 MINUTOS',
          title: '01. Consulta Inicial Gratuita y Auditoría de Estancia Legal',
          summary:
            'Hable con un especialista en inmigración en Bydgoszcz, Varsovia o en línea. Calculamos sus días legales restantes de visa o exención Schengen y trazamos un cronograma sin interrupciones laborales.',
          checklist: [
            'Verificación exacta de días de visa y estancia Schengen sin visa (90 días)',
            'Revisión de contrato laboral (Umowa o pracę, Zlecenie o B2B)',
            'Elección entre Permiso Único (Art. 114) vs. Tarjeta Azul UE (Art. 127)',
            'Presupuesto cerrado por escrito con tarifa fija y sin sorpresas'
          ],
          guaranteeTitle: 'Garantía de Estancia Legal MobilWork',
          guaranteeText:
            'Incluso si su visa o estancia de 90 días vence en 5 días, presentar una solicitud auditada a través de nuestro apoderado legal le otorga inmediatamente estancia 100% legal en Polonia bajo el Art. 108.'
        },
        {
          num: '02',
          duration: 'Días 2–5',
          shortTitle: 'Auditoría Documental y RR.HH.',
          shortDesc: 'Coordinamos directamente con su empleador el Załącznik nr 1, seguros ZUS y traducciones juradas al polaco.',
          badge: 'ETAPA 02 DE 04 • DÍAS 2–5 • ENLACE CON EL EMPLEADOR',
          title: '02. Preparación de Documentos y Auditoría Legal de 24 Puntos',
          summary:
            'Nunca tendrá que descifrar formularios polacos por su cuenta. Nuestros especialistas contactan directamente con el departamento de RR.HH. de su empresa para redactar el Załącznik nr 1 y gestionar traducciones juradas.',
          checklist: [
            'Coordinación directa con su empleador polaco para el Anexo Nº 1',
            'Verificación de declaraciones de seguro médico ZUS ZUA / ZUS RCA',
            'Test de mercado laboral (Informacja Starosty) o auditoría de exención',
            'Traducciones juradas al polaco de diplomas y actas de matrimonio o nacimiento'
          ],
          guaranteeTitle: 'Cero Retrasos por Documentos Faltantes',
          guaranteeText:
            'Cada expediente pasa por una auditoría legal de 24 puntos antes de su presentación para evitar requerimientos formales (Wezwanie do usunięcia braków).'
        },
        {
          num: '03',
          duration: 'Semana 2',
          shortTitle: 'Presentación en Urząd y Biometría',
          shortDesc: 'Reservamos su cita prioritaria en el Urząd, le acompañamos a las huellas dactilares y obtenemos su sello legal.',
          badge: 'ETAPA 03 DE 04 • SEMANA 2 • PRESENTACIÓN OFICIAL',
          title: '03. Presentación Oficial en la Voivodía y Toma de Huellas',
          summary:
            'Aseguramos su cita en los portales INPOL / MOS, registramos nuestro Poder Legal (Pełnomocnictwo) y le acompañamos personalmente al Urząd Wojewódzki para la captura de huellas dactilares.',
          checklist: [
            'Reserva prioritaria en los sistemas INPOL y colas de la Voivodía',
            'Asistencia presencial de un coordinador durante la toma de huellas',
            'Sello oficial inmediato de estancia legal en su pasaporte',
            'Toda la correspondencia del Urząd se recibe directamente en nuestro despacho'
          ],
          guaranteeTitle: 'Sello de Estancia 100% Legal el Día de Presentación',
          guaranteeText:
            'Una vez tomadas sus huellas y estampado su pasaporte, su estancia en Polonia queda legalmente protegida por el Art. 108 de la Ley de Extranjería.'
        },
        {
          num: '04',
          duration: 'Decisión y Tarjeta',
          shortTitle: 'Recepción de su Karta Pobytu',
          shortDesc: 'Respondemos a todas las cartas del inspector, verificamos su decisión positiva y agendamos la recogida del plástico.',
          badge: 'ETAPA 04 DE 04 • DECISIÓN Y RECOGIDA DE TARJETA',
          title: '04. Reciba su Tarjeta de Residencia Karta Pobytu',
          summary:
            'Mientras usted se enfoca en su trabajo y vida en Polonia, supervisamos su expediente semanalmente, respondemos al inspector, verificamos su Decisión Positiva y programamos la entrega de la tarjeta.',
          checklist: [
            'Monitoreo proactivo del expediente y actualizaciones mensuales de ZUS',
            'Verificación de todos sus datos personales en la Karta Pobytu impresa',
            'Asistencia con el pago de 100 PLN de impresión de tarjeta y registro PESEL',
            'Hoja de ruta programada hacia su futura Tarjeta de Residente de Larga Duración UE'
          ],
          guaranteeTitle: 'Soporte Completo Hasta Tener la Tarjeta en su Mano',
          guaranteeText:
            'Nuestro contrato solo finaliza cuando usted tiene en sus manos su Karta Pobytu física o su resolución de permiso de trabajo.'
        }
      ]
    },
    services: {
      eyebrow: 'SECCIÓN 02 — ÁREAS DE PRÁCTICA LEGAL',
      title: 'Permisos Adaptados a su Carrera y Familia en Polonia',
      subtitle:
        'Cada expediente incluye Poder Legal oficial (Pełnomocnictwo), coordinación directa con RR.HH. de su empleador y seguimiento en tiempo real en los portales INPOL y MOS.',
      filterAll: 'Todos los Permisos (04)',
      filterResidence: 'Tarjetas de Residencia (Karta Pobytu)',
      filterWork: 'Permisos de Trabajo',
      filterFamily: 'Familia y Dependientes',
      citySelectorLabel: 'Jurisdicción de Voivodía:',
      estProcessingLabel: 'Plazo Estimado',
      showChecklistBtn: 'Ver Lista de Documentos',
      hideChecklistBtn: 'Ocultar Lista de Documentos',
      applyBtn: 'Seleccionar y Evaluar Elegibilidad →',
      exploreResidencePage: 'Explorar Dossier de Residencia →',
      exploreWorkPage: 'Explorar Dossier de Trabajo →',
      cards: [
        {
          key: 'czasowy' as PermitKey,
          category: 'residence',
          index: '01',
          statute: 'Karta Pobytu Czasowego • Art. 114 / Art. 187',
          title: 'Residencia Temporal (Czasowy)',
          desc: 'El Permiso Único combinado para vivir y trabajar legalmente en Polonia hasta por 3 años, con viajes sin visa por los 29 países del espacio Schengen.',
          features: [
            'Preparación completa del Załącznik nr 1 con el departamento de RR.HH.',
            'Test de mercado laboral (Informacja Starosty) o auditoría de exención',
            'Sello en el pasaporte que garantiza estancia 100% legal mientras espera la tarjeta'
          ],
          checklistTitle: 'Documentos Principales Requeridos y Tasas Oficiales:',
          checklistItems: [
            'Pasaporte vigente + 4 fotografías biométricas (35×45mm)',
            'Contrato de trabajo firmado + Anexo Nº 1 del empleador',
            'Confirmación de seguro ZUS ZUA / ZUS RCA y contrato de arrendamiento'
          ],
          feeNote: 'Tasa Oficial: 440 PLN + 100 PLN de emisión de tarjeta plástica'
        },
        {
          key: 'work' as PermitKey,
          category: 'work',
          index: '02',
          statute: 'Zezwolenie na Pracę Tipo A / B y Oświadczenie',
          title: 'Permisos de Trabajo (Tipo A / B)',
          desc: 'Permisos de trabajo rápidos ante la Voivodía para candidatos que solicitan una Visa Nacional D en el extranjero o se incorporan a una empresa polaca.',
          features: [
            'Tipo A: Empleados estándar contratados por una entidad polaca (1–3 años)',
            'Tipo B: Miembros del consejo de administración (Członek Zarządu Sp. z o.o.)',
            'Presentación 100% digital vía praca.gov.pl y envío por mensajería internacional'
          ],
          checklistTitle: 'Documentos Principales Requeridos y Tasas Oficiales:',
          checklistItems: [
            'Escaneo completo del pasaporte del candidato (todas las páginas selladas)',
            'Extracto KRS / CEIDG de la empresa y declaración de solvencia ZUS',
            'Descripción del puesto y certificados de cualificación profesional'
          ],
          feeNote: 'Tasa Oficial de Voivodía: 100 PLN (50 PLN por menos de 3 meses)'
        },
        {
          key: 'bluecard' as PermitKey,
          category: 'residence',
          index: '03',
          statute: 'Niebieska Karta UE • Art. 127 Alta Cualificación',
          title: 'Tarjeta Azul UE (EU Blue Card)',
          desc: 'Permiso de residencia europeo premium de 3 años para ingenieros de software, científicos de datos, especialistas financieros y ejecutivos con título universitario o 5+ años de experiencia.',
          features: [
            'Plena flexibilidad laboral tras 12 meses — cambie de empleador fácilmente',
            'Acumula antigüedad en países de la UE para la Residencia de Larga Duración (5 años)',
            'Acceso inmediato y sin restricciones al mercado laboral para el cónyuge'
          ],
          checklistTitle: 'Documentos Principales Requeridos y Tasas Oficiales:',
          checklistItems: [
            'Contrato de 1+ año que cumpla el umbral salarial bruto legal',
            'Título universitario (apostillado + traducción jurada) o portafolio TI de 5 años',
            'Seguro médico ZUS y contrato de alquiler residencial en Polonia'
          ],
          feeNote: 'Tasa Oficial: 440 PLN + 100 PLN de emisión de tarjeta plástica'
        },
        {
          key: 'family' as PermitKey,
          category: 'family',
          index: '04',
          statute: 'Połączenie z Rodziną • Art. 159 / Art. 187',
          title: 'Reunificación Familiar',
          desc: 'Traiga a su cónyuge, pareja e hijos a Polonia con acceso completo a la sanidad pública NFZ, escolarización y libre acceso al mercado laboral.',
          features: [
            'Transcripción de actas de matrimonio y nacimiento en el Registro Civil (USC)',
            'Cálculo de ingresos netos per cápita del hogar y alta en ZUS ZCNA',
            'Presentación simultánea para el titular principal y sus dependientes'
          ],
          checklistTitle: 'Documentos Principales Requeridos y Tasas Oficiales:',
          checklistItems: [
            'Acta de matrimonio o nacimiento apostillada + traducción jurada al polaco',
            'Contrato laboral del patrocinador, declaración PIT y alta ZUS ZCNA',
            'Contrato de arrendamiento familiar que incluya a todos los miembros'
          ],
          feeNote: 'Tasa Oficial: 340 PLN + 100 PLN tarjeta (50 PLN para menores)'
        }
      ]
    },
    eligibility: {
      eyebrow: 'SECCIÓN 03 — AUDITORÍA ALGORÍTMICA DE ELEGIBILIDAD',
      title: 'Evalúe su Elegibilidad para Permisos Polacos en 60 Segundos',
      subtitle:
        'Complete tres parámetros sobre su ciudadanía, ciudad de destino en Polonia y situación laboral. Recibirá al instante una recomendación legal, el plazo estimado en su Voivodía y los requisitos.',
      benefit1Title: 'Actualizado a la Ley de Extranjería Polaca 2026',
      benefit1Desc: 'Calibrado con los umbrales salariales vigentes, normas de Tarjeta Azul UE y tiempos reales de espera en cada Urząd Wojewódzki.',
      benefit2Title: '100% Confidencial y Protegido por RGPD / RODO',
      benefit2Desc: 'Sus respuestas se utilizan exclusivamente para preparar su lista personalizada de documentos de inmigración.',
      benefit3Title: 'Mesa de Urgencias antes del Vencimiento de Visa',
      benefit3Desc: 'Línea directa con nuestros despachos en Bydgoszcz y Varsovia: +48 52 511 84 20 (Lun–Vie 08:30–18:00).',
      pills: ['01 Ciudadanía', '02 Voivodía', '03 Empleo'],
      step1Title: 'Parámetro 01: Ciudadanía y Ubicación Actual',
      step1Sub: 'Nos ayuda a determinar si califica para exenciones del mercado laboral o presentación dentro de los 90 días sin visa.',
      citizenshipLabel: 'Seleccione su País de Ciudadanía',
      locationLabel: '¿Dónde se encuentra actualmente?',
      locations: [
        { value: 'in-poland-visa', title: 'Ya en Polonia (Visa / Sello)', meta: 'Visa Nacional D, Visa C o sello en trámite' },
        { value: 'in-poland-card', title: 'En Polonia (Renovación de Tarjeta)', meta: 'Renovando Karta Pobytu o cambiando de empleo' },
        { value: 'in-poland-visafree', title: 'En Polonia (90 Días Sin Visa)', meta: 'Entrada Schengen con pasaporte biométrico' },
        { value: 'abroad', title: 'Actualmente Fuera de Polonia', meta: 'Necesita Permiso de Trabajo para visa consular' }
      ],
      step2Title: 'Parámetro 02: Ciudad de Destino en Polonia',
      step2Sub: 'Su dirección de residencia determina qué Oficina de Voivodía (Urząd Wojewódzki) procesará su permiso.',
      step3Title: 'Parámetro 03: Situación Laboral o Familiar',
      step3Sub: 'Seleccione la opción que mejor describa su contrato de trabajo o situación familiar en Polonia.',
      employments: [
        { value: 'standard-contract', title: 'Empleado / Oferta Laboral en Polonia', meta: 'Umowa o pracę o Umowa zlecenie' },
        { value: 'high-skill', title: 'Especialista Alta Cualificación / TI', meta: 'Título universitario o 5+ años de experiencia' },
        { value: 'employer-sponsor', title: 'Necesita Permiso para Visa Consular', meta: 'Empleador listo para firmar Zezwolenie Tipo A' },
        { value: 'family-join', title: 'Reunificación con Cónyuge / Familia', meta: 'Residencia familiar y acceso abierto al trabajo' }
      ],
      backBtn: '← Anterior',
      nextToCityBtn: 'Continuar a Ciudad →',
      nextToEmpBtn: 'Continuar a Empleo →',
      calcBtn: 'Ver Resultado de Elegibilidad →',
      resultBadge: 'Vía de Aprobación del 98,4% • Coincidencia Legal Verificada',
      statOffice: 'Oficina Destino',
      statTime: 'Plazo Estimado',
      statFee: 'Tasa Oficial',
      nameLabel: 'Su Nombre Completo',
      namePlaceholder: 'ej. Mateo Herrera',
      contactLabel: 'Teléfono / WhatsApp o Email',
      contactPlaceholder: '+48 500 000 000 o email',
      resetBtn: 'Reiniciar Test',
      submitBtn: 'Agendar Revisión Gratuita de 20 Min',
      submittedBtn: 'Consulta Confirmada ✓',
      results: {
        czasowyTitle: 'Recomendado: Residencia Temporal y Trabajo (Karta Pobytu — Art. 114)',
        bluecardTitle: 'Recomendado: Tarjeta Azul UE (Niebieska Karta UE — Art. 127)',
        workTitle: 'Recomendado: Permiso de Trabajo de Voivodía (Zezwolenie Tipo A)',
        familyTitle: 'Recomendado: Tarjeta de Residencia por Reunificación Familiar (Art. 159)'
      }
    },
    stories: {
      eyebrow: 'SECCIÓN 04 — ARCHIVO DE CASOS VERIFICADOS',
      title: 'Profesionales Internacionales Viviendo y Trabajando en Polonia',
      subtitle:
        'Plazos reales y resoluciones verificadas de especialistas internacionales que confiaron su representación ante la Voivodía a MobilWork.',
      verifiedDecision: 'Resolución Verificada',
      permitPrefix: 'Estatuto:',
      viewAllBtn: 'Leer Todos los Casos de Éxito →',
      items: [
        {
          name: 'Maya Singh',
          role: 'Senior Cloud Engineer • Cracovia',
          flag: '🇮🇳 IN',
          duration: 'Aprobado en 11 Semanas',
          permit: 'Tarjeta Azul UE (Art. 127)',
          image: '/assets/images/candidate-krakow.jpg',
          quote:
            'Tenía miedo de perder mi estatus legal al cambiar de trabajo en Cracovia. MobilWork auditó mi nuevo contrato en 24 horas, tradujo mi título de ingeniería y me acompañó al Urząd de Małopolska. Recibí mi Tarjeta Azul UE por 3 años sin un solo requerimiento adicional.',
          challenge: 'Cambio de empleador durante la residencia + verificación de apostilla bajo el Art. 127.'
        },
        {
          name: 'Mateo Herrera',
          role: 'Coordinador de Cadena de Suministro • Bydgoszcz',
          flag: '🇨🇴 CO',
          duration: 'Aprobado en 3,2 Meses',
          permit: 'Karta Pobytu Czasowego (Art. 114)',
          image: '/assets/images/candidate-bydgoszcz.jpg',
          quote:
            'Llegar desde Colombia con los 90 días sin visa me daba muy poco margen. El equipo de MobilWork en Bydgoszcz coordinó directamente con mi empresa logística el Załącznik nr 1 y reservó mis huellas en el Urząd antes de que vencieran mis 90 días.',
          challenge: 'Cuenta regresiva de 90 días Schengen que requería test laboral rápido y cita biométrica urgente.'
        },
        {
          name: 'Linh Nguyen',
          role: 'Analista de Datos FinTech • Varsovia',
          flag: '🇻🇳 VN',
          duration: 'Aprobado en 14 Semanas',
          permit: 'Permiso Único de Residencia y Trabajo',
          image: '/assets/images/candidate-warsaw-cafe.jpg',
          quote:
            'Conseguir una cita en INPOL en Varsovia parecía imposible por mi cuenta. MobilWork actuó como mi apoderado oficial (Pełnomocnik), gestionó la entrega en Mazovia y me envió actualizaciones por WhatsApp en cada avance.',
          challenge: 'Gestión de cita en el saturado portal INPOL de Varsovia y conciliación de seguros ZUS RCA.'
        },
        {
          name: 'Lucas y Sofia Mendes',
          role: 'Product Designer y Cónyuge • Gdańsk',
          flag: '🇧🇷 BR',
          duration: 'Aprobado en 3,5 Meses',
          permit: 'Reunificación Familiar (Art. 159)',
          image: '/assets/images/candidate-gdansk.jpg',
          quote:
            'MobilWork presentó mi tarjeta de residencia laboral y la solicitud de Reunificación Familiar de mi esposa juntas en Gdańsk. Transcribieron nuestra acta de matrimonio brasileña en el Registro Civil polaco y nuestras tarjetas salieron el mismo día.',
          challenge: 'Presentación conjunta de titular y cónyuge con transcripción previa de matrimonio en el USC.'
        }
      ]
    },
    faq: {
      eyebrow: 'SECCIÓN 05 — ACLARACIONES LEGALES',
      title: 'Preguntas Frecuentes sobre Permisos de Residencia en Polonia',
      subtitle: 'Respuestas claras y rigurosas sobre el sello de estancia legal del Artículo 108, cambio de empleador y tasas oficiales.',
      items: [
        {
          q: '¿Puedo permanecer y trabajar legalmente en Polonia mientras espero la decisión de mi Karta Pobytu?',
          a: 'Sí, al 100%. Tan pronto como se presenta su solicitud completa antes de que venza su visa actual o su período de 90 días sin visa, la Oficina de la Voivodía coloca un sello oficial en su pasaporte. Bajo el Artículo 108 de la Ley de Extranjería polaca, su estancia sigue siendo totalmente legal hasta que se emita la decisión final.'
        },
        {
          q: '¿Cuál es la diferencia entre un Permiso de Trabajo (Tipo A) y una Karta Pobytu?',
          a: 'Un Permiso de Trabajo (Zezwolenie Tipo A) autoriza a trabajar para un empleador polaco específico y suele utilizarse para solicitar una Visa Nacional D en un consulado. Una Karta Pobytu Czasowego (Permiso Único) combina el derecho a residir y a trabajar en Polonia en una sola tarjeta biométrica válida hasta por 3 años, permitiendo además viajar sin visa por los 29 países Schengen.'
        },
        {
          q: '¿Cuáles son las tasas oficiales del gobierno polaco para un Permiso de Residencia?',
          a: 'Las tasas oficiales se abonan directamente en la cuenta fiscal municipal/voivodal: 440 PLN por el Permiso Único de Residencia y Trabajo (o Tarjeta Azul UE), 340 PLN por Reunificación Familiar o Estudios, más 100 PLN por la impresión de la tarjeta plástica una vez aprobada. El impuesto de timbre por Poder Legal (Pełnomocnictwo) es de 17 PLN.'
        },
        {
          q: '¿Puede MobilWork representarme si vivo fuera de Bydgoszcz o Varsovia?',
          a: 'Sí. Mediante Poder Legal escrito (Pełnomocnictwo bajo los Arts. 32–33 del KPA), toda la correspondencia oficial de cualquiera de las 16 Oficinas de Voivodía de Polonia (incluyendo Cracovia, Breslavia, Gdańsk, Poznań, Katowice y Łódź) llega directamente a nuestro registro legal. Usted solo acude una vez en persona para dar sus huellas.'
        }
      ]
    },
    footer: {
      brandDesc:
        'Agencia polaca de representación administrativa que asiste a profesionales internacionales, familias y empresas con tarjetas de residencia Karta Pobytu, Tarjetas Azules UE y permisos de trabajo.',
      navTitle: 'Navegación Rápida',
      officesTitle: 'Nuestras Oficinas en Polonia',
      bydgoszczTitle: 'Sede Central en Bydgoszcz',
      warsawTitle: 'Oficina en Varsovia',
      newsletterTitle: 'Actualizaciones de Ley Migratoria',
      newsletterDesc:
        'Reciba boletines mensuales sobre reformas a la Ustawa o cudzoziemcach, cambios en salarios mínimos y alertas de citas en el Urząd.',
      newsletterPlaceholder: 'nombre@empresa.com',
      newsletterBtn: 'Suscribirse al Boletín Legal',
      newsletterSuccess: '✓ Suscrito a los informes mensuales de Ley de Extranjería Polaca.',
      disclaimerTitle: 'Aviso Legal sobre Representación Administrativa:',
      disclaimerText:
        'MobilWork Sp. z o.o. proporciona consultoría migratoria especializada, auditoría documental y representación administrativa ante las Oficinas de Voivodía (Urzędy Wojewódzkie) y Oficinas Laborales (PUP) actuando como apoderado autorizado (Pełnomocnik) conforme a los Artículos 32–33 del Código de Procedimiento Administrativo polaco (KPA).',
      copyright: '© 2026 MobilWork Sp. z o.o. Todos los derechos reservados. Bydgoszcz y Varsovia, Polonia.',
      privacyLink: 'Política de Privacidad (RODO)',
      termsLink: 'Términos de Poder Administrativo',
      cookiesLink: 'Preferencias de Cookies'
    },
    pages: {
      residence: {
        kicker: 'ÁREA DE PRÁCTICA 01 • PERMISOS DE RESIDENCIA (KARTA POBYTU)',
        title: 'Tarjetas de Residencia Biométricas y Estancia de Larga Duración en Polonia',
        lead: 'Representación administrativa integral bajo la Ley de Extranjería polaca para profesionales, ingenieros, directivos y familiares acompañantes en las 16 voivodías.',
        comparisonTitle: 'Comparativa Legal de Títulos de Residencia en Polonia',
        comparisonHeaders: ['Tipo de Permiso', 'Base Legal', 'Validez Máx.', 'Tasa Oficial', 'Movilidad Schengen'],
        comparisonRows: [
          ['Residencia Temporal y Trabajo (Permiso Único)', 'Art. 114', 'Hasta 3 Años', '440 PLN + 100 PLN', '90 / 180 Días Sin Visa'],
          ['Tarjeta Azul UE (Profesionales Alta Cualificación)', 'Art. 127', 'Hasta 3 Años', '440 PLN + 100 PLN', '90 / 180 Días + Acumulación UE'],
          ['Reunificación Familiar (Cónyuge e Hijos)', 'Art. 159 / 187', 'Hasta 3 Años', '340 PLN + 100 PLN', '90 / 180 Días + Acceso Laboral'],
          ['Residente de Larga Duración UE', 'Art. 211', 'Permanente (Tarjeta 5 años)', '640 PLN + 100 PLN', 'Derechos de Movilidad en la UE']
        ]
      },
      work: {
        kicker: 'ÁREA DE PRÁCTICA 02 • AUTORIZACIÓN LABORAL Y CUMPLIMIENTO RR.HH.',
        title: 'Permisos de Trabajo de Voivodía (Tipo A / B) y Cumplimiento Corporativo',
        lead: 'Gestión integral de autorizaciones de trabajo vía praca.gov.pl para empleadores polacos, cohortes de contratación internacional y miembros de consejos de administración.',
        typesTitle: 'Instrumentos de Autorización Laboral en Polonia',
        types: [
          {
            code: 'TIPO A',
            title: 'Permiso de Trabajo Estándar de Voivodía',
            statute: 'Art. 88 pkt 1 • Validez de 1 a 3 Años',
            desc: 'Requerido para ciudadanos extracomunitarios contratados por una entidad polaca. Permite tramitar la Visa Nacional D en cualquier consulado polaco.'
          },
          {
            code: 'TIPO B',
            title: 'Permiso para Miembros del Consejo de Administración',
            statute: 'Art. 88 pkt 2 • Directivos Sp. z o.o.',
            desc: 'Diseñado para Miembros de Junta Directiva (Członek Zarządu) y Apoderados Mercantiles que residan en Polonia más de 6 meses en un período de 12 meses.'
          },
          {
            code: 'OŚWIADCZENIE',
            title: 'Declaración Simplificada ante la Oficina de Empleo',
            statute: 'Vía Rápida PUP • Validez de 24 Meses',
            desc: 'Registro acelerado en 7 días para ciudadanos de Ucrania, Bielorrusia, Georgia, Armenia y Moldavia sin necesidad de test de mercado laboral.'
          }
        ]
      },
      legal: {
        kicker: 'CUMPLIMIENTO NORMATIVO • RODO Y MANDATO KPA',
        title: 'Política de Privacidad (RODO), Términos de Poder Administrativo y Cookies',
        lead: 'La transparencia, el cumplimiento estatutario y la estricta confidencialidad de los datos constituyen la base de las operaciones de MobilWork Sp. z o.o. en Bydgoszcz y Varsovia.',
        sections: [
          {
            id: 'rodo',
            code: '01 / RODO',
            title: 'Protección de Datos Personales (Cumplimiento RGPD / RODO)',
            body: 'MobilWork Sp. z o.o. (KRS: 0000894120, NIP: 5542981042), con sede en ul. Gdańska 47, 85-005 Bydgoszcz, actúa como Responsable del Tratamiento bajo el Reglamento (UE) 2016/679 (RGPD / RODO). Los datos de pasaporte, números PESEL, contratos laborales y declaraciones ZUS se procesan exclusivamente para tramitar expedientes ante las Oficinas de Voivodía.'
          },
          {
            id: 'proxy',
            code: '02 / KPA ART. 32–33',
            title: 'Términos del Poder Administrativo (Pełnomocnictwo)',
            body: 'La representación ante las Oficinas de Voivodía se realiza mediante Poder Legal escrito (Pełnomocnictwo) sujeto a un timbre fiscal municipal de 17 PLN. Nuestros honorarios se fijan por escrito antes de iniciar el expediente. Las tasas gubernamentales (440 PLN / 340 PLN / 100 PLN) se abonan directamente a la autoridad fiscal correspondiente.'
          },
          {
            id: 'cookies',
            code: '03 / COOKIES',
            title: 'Arquitectura de Cookies y Preferencias Locales',
            body: 'Este portal utiliza únicamente claves de almacenamiento local estrictamente necesarias (como el idioma seleccionado EN/PL/UA/ES y el estado del asistente de elegibilidad) para mantener su experiencia entre páginas. No se utilizan rastreadores publicitarios de terceros.'
          }
        ]
      }
    }
  }
} as const;
