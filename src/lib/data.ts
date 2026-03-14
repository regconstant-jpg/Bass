export const BRANDS = [
  { name: 'CUPRA', color: '#C8A96E', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Cupra_logo.svg/2560px-Cupra_logo.svg.png', tagline: 'Né pour provoquer' },
  { name: 'SEAT', color: '#F20000', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/SEAT_logo_2012.svg/2560px-SEAT_logo_2012.svg.png', tagline: "L'esprit de la route" },
  { name: 'ŠKODA', color: '#4BA82E', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Skoda_logo_2016.svg/2560px-Skoda_logo_2016.svg.png', tagline: 'Simply clever' },
  { name: 'MAZDA', color: '#FFFFFF', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Mazda_logo_with_emblem.svg/2560px-Mazda_logo_with_emblem.svg.png', tagline: 'Feel alive' },
  { name: 'HYUNDAI', color: '#002C5F', logoText: 'HYUNDAI', tagline: 'New thinking, new possibilities' },
]

export const CONCESSIONS = [
  { city: 'Avignon', address: '130 Route de Marseille, 84000 Avignon', phone: '04 90 03 65 15', brands: ['CUPRA', 'SEAT', 'ŠKODA'] },
  { city: 'Aix-en-Provence', address: 'Route de Marseille, 13100 Aix-en-Provence', phone: '04 42 38 13 13', brands: ['CUPRA', 'SEAT', 'ŠKODA', 'MAZDA'] },
  { city: 'Marignane', address: 'ZAC Athélia, 13700 Marignane', phone: '04 13 96 11 71', brands: ['HYUNDAI'] },
  { city: 'Marseille', address: 'Marseille', phone: '04 65 40 65 00', brands: ['CUPRA', 'SEAT'] },
  { city: 'Saint-Victoret', address: 'Saint-Victoret', phone: '04 84 32 01 50', brands: ['ŠKODA'] },
  { city: 'Salon-de-Provence', address: 'Salon-de-Provence', phone: '04 42 52 92 29', brands: ['MAZDA', 'HYUNDAI'] },
]

export const STATS = [
  { value: 6, label: 'Concessions', suffix: '' },
  { value: 5, label: 'Marques', suffix: '' },
  { value: 30, label: "Ans d'expérience", suffix: '+' },
  { value: 50000, label: 'Clients satisfaits', suffix: '+' },
]

export const HERO_PHRASES = [
  "Nous réinventons l'expérience automobile.",
  'Du showroom à la route.',
  '5 marques, 6 concessions, une seule passion.',
  "Votre prochaine voiture commence ici.",
  "L'automobile autrement.",
]

export const BENEFITS = [
  {
    number: '01',
    title: "L'émotion de conduire",
    titleBold: "L'émotion",
    description: "Nos 5 marques couvrent tous les univers : du SUV familial au coupé électrique sportif. Chaque véhicule est sélectionné pour vous offrir une expérience de conduite incomparable, qu'il soit neuf ou d'occasion.",
    youtubeId: 'hGXFBPCGMNc',
    cta: 'Voir nos véhicules',
  },
  {
    number: '02',
    title: 'Un accompagnement sur-mesure',
    titleBold: 'sur-mesure',
    description: "De l'essai au financement, de la reprise à la livraison, nos équipes vous accompagnent à chaque étape. Nos conseillers sont experts de chaque marque et à l'écoute de vos besoins.",
    youtubeId: 'KgDCEpGnZI4',
    cta: 'Prendre rendez-vous',
  },
  {
    number: '03',
    title: 'Service & confiance',
    titleBold: 'confiance',
    description: "Nos ateliers multimarques assurent l'entretien, la réparation et la carrosserie de votre véhicule avec des techniciens certifiés. Votre voiture est entre de bonnes mains.",
    youtubeId: 'Ugc_OVkGfxs',
    cta: 'Prendre un RDV atelier',
  },
]

export const TESTIMONIALS = [
  { text: "Passage chez CUPRA au top du top. Un service digne d'une vraie marque de luxe. Des commerciaux à l'écoute et réactifs qui prennent le temps de vous livrer la voiture.", author: 'Thomas R.', brand: 'CUPRA' },
  { text: "J'ai récemment acheté ma voiture chez Škoda et l'expérience a été excellente du début à la fin. L'atelier de réparation est très bien équipé.", author: 'Marie L.', brand: 'ŠKODA' },
  { text: "Tout a été parfait. L'accueil, le suivi des travaux, les explications. Une équipe professionnelle et humaine.", author: 'Jean-Pierre M.', brand: 'HYUNDAI' },
]
