import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'fr' | 'es' | 'ru' | 'zh' | 'ja' | 'de' | 'it' | 'pt' | 'sq';

interface AppContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Translations object
const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.letsTalk': "Let's Talk",

    // Hero Section
    'hero.subtitle': 'Creative Solutions',
    'hero.greeting': 'Hello, I am',
    'hero.title1': 'Theo Blondel',
    'hero.title2': 'Creative',
    'hero.title3': 'Mediamatician',
    'hero.description': 'Swiss-based mediamatician combining artistic creativity with technical expertise to create authentic visual experiences.',
    'hero.contactMe': 'Contact Me',
    'hero.watchDemo': 'Watch Demo',
    'hero.yearsExperience': 'Years\nExperience',
    'hero.projectsDelivered': 'Projects\nDelivered',
    'hero.clientSatisfaction': 'Client\nSatisfaction',
    'hero.clientsWorldwide': 'Clients\nWorldwide',
    'hero.service1.title': 'Brand Identity',
    'hero.service1.desc': 'Unique visual identities that tell your story',
    'hero.service2.title': 'UI/UX Design',
    'hero.service2.desc': 'Intuitive interfaces for exceptional experiences',
    'hero.service3.title': 'Web Development',
    'hero.service3.desc': 'Modern websites that perform and convert',
    'hero.service4.title': 'Creative Direction',
    'hero.service4.desc': 'Strategic vision for your creative projects',

    // About Section
    'about.subtitle': 'About Me',
    'about.title1': 'Creative Solutions',
    'about.title2': 'Versatile',
    'about.description1': 'Swiss-based mediamatician, I combine artistic creativity with technical expertise to create authentic visual experiences. My holistic approach to design allows me to develop creative solutions that tell your story uniquely.',
    'about.description2': 'Specialized in brand identity and interface design, I support my clients in creating memorable experiences that leave a lasting impression and generate concrete results.',
    'about.skill1.title': 'Creative Design',
    'about.skill1.desc': 'Visual identity, branding, and creative direction',
    'about.skill2.title': 'UI/UX Design',
    'about.skill2.desc': 'User interfaces and exceptional experiences',
    'about.skill3.title': 'Development',
    'about.skill3.desc': 'Modern websites and web applications',
    'about.skill4.title': 'Strategy',
    'about.skill4.desc': 'Creative consulting and project management',
    'about.learnMore': 'Learn More',
    'about.whatAmIFor': 'What am I for?',

    // Portfolio Section
    'portfolio.subtitle': 'My Work',
    'portfolio.title1': 'Selected',
    'portfolio.title2': 'Projects',
    'portfolio.description': 'Discover a selection of my recent projects, each telling a unique story through thoughtful design and strategic thinking.',
    'portfolio.viewAllBehance': 'View All on Behance',

    // Services Section
    'services.subtitle': 'Services',
    'services.title': 'What I Do',
    'services.description': 'I offer comprehensive creative solutions tailored to your specific needs and objectives.',
    'services.startProject': 'Start a Project',
    
    'services.brandIdentity.title': 'Brand Identity',
    'services.brandIdentity.desc': 'Complete visual identity systems that reflect your brand values and connect with your audience.',
    'services.brandIdentity.feature1': 'Logo Design & Brand Guidelines',
    'services.brandIdentity.feature2': 'Color Palettes & Typography',
    'services.brandIdentity.feature3': 'Brand Strategy & Positioning',
    'services.brandIdentity.feature4': 'Print & Digital Applications',

    'services.uiux.title': 'UI/UX Design',
    'services.uiux.desc': 'User-centered design solutions that create intuitive and engaging digital experiences.',
    'services.uiux.feature1': 'User Research & Analysis',
    'services.uiux.feature2': 'Wireframing & Prototyping',
    'services.uiux.feature3': 'Interface Design & Testing',
    'services.uiux.feature4': 'Design Systems & Guidelines',

    'services.webDev.title': 'Web Development',
    'services.webDev.desc': 'Modern, responsive websites built with the latest technologies for optimal performance.',
    'services.webDev.feature1': 'Responsive Web Design',
    'services.webDev.feature2': 'Frontend Development',
    'services.webDev.feature3': 'CMS Integration',
    'services.webDev.feature4': 'Performance Optimization',

    'services.mobile.title': 'Mobile Design',
    'services.mobile.desc': 'Native and cross-platform mobile applications designed for exceptional user experiences.',
    'services.mobile.feature1': 'iOS & Android Design',
    'services.mobile.feature2': 'App Store Optimization',
    'services.mobile.feature3': 'User Flow Design',
    'services.mobile.feature4': 'Mobile-First Approach',

    'services.creative.title': 'Creative Direction',
    'services.creative.desc': 'Strategic creative leadership for campaigns, projects, and brand initiatives.',
    'services.creative.feature1': 'Creative Strategy',
    'services.creative.feature2': 'Art Direction',
    'services.creative.feature3': 'Campaign Development',
    'services.creative.feature4': 'Team Leadership',

    'services.motion.title': 'Motion Graphics',
    'services.motion.desc': 'Dynamic visual content that brings your brand to life through animation and motion.',
    'services.motion.feature1': 'Animation Design',
    'services.motion.feature2': 'Video Production',
    'services.motion.feature3': 'Interactive Media',
    'services.motion.feature4': 'Brand Animation',

    // Process Section
    'process.subtitle': 'Process',
    'process.title': 'How I Work',
    'process.step1.title': 'Discovery',
    'process.step1.desc': 'Understanding your needs, goals, and target audience',
    'process.step2.title': 'Research',
    'process.step2.desc': 'Market analysis and competitive research',
    'process.step3.title': 'Design',
    'process.step3.desc': 'Creating concepts and visual solutions',
    'process.step4.title': 'Development',
    'process.step4.desc': 'Bringing designs to life with code',
    'process.step5.title': 'Testing',
    'process.step5.desc': 'Quality assurance and user testing',
    'process.step6.title': 'Launch',
    'process.step6.desc': 'Deployment and ongoing support',

    // Concrete Example
    'concrete.label': 'Concrete Example',
    'concrete.title': 'Real Client Communication',
    'concrete.description': 'Here\'s how a typical project conversation unfolds with one of my clients.',
    'concrete.method': 'My collaborative approach ensures clear communication and exceptional results at every step.',

    // CTA
    'cta.title': 'Ready to Start Your Project?',
    'cta.subtitle': 'Let\'s discuss how I can help bring your vision to life.',
    'cta.startProject': 'Start Project',
    'cta.viewProjects': 'View Projects',

    // Fake Chat
    'fakeChat.clientName': 'Sarah Chen',
    'fakeChat.onlineStatus': 'Online now',
    'fakeChat.typingIndicator': 'typing...',
    'fakeChat.message1': 'Hi Theo! I saw your portfolio and I\'m really impressed. We need a complete rebrand for our tech startup.',
    'fakeChat.timestamp1': '10:30 AM',
    'fakeChat.message2': 'Thank you Sarah! I\'d love to help. Can you tell me more about your company and what you\'re looking to achieve with the rebrand?',
    'fakeChat.timestamp2': '10:32 AM',
    'fakeChat.message3': 'We\'re a fintech company focused on sustainable investing. We want something modern but trustworthy, appealing to millennials.',
    'fakeChat.timestamp3': '10:35 AM',
    'fakeChat.message4': 'Perfect! That sounds like an exciting project. I have experience with fintech branding. Let me show you some relevant work and we can discuss your timeline.',
    'fakeChat.timestamp4': '10:37 AM',
    'fakeChat.message5': 'That would be great! Here\'s our current brand guidelines document. As you can see, it needs a complete overhaul.',
    'fakeChat.timestamp5': '10:40 AM',
    'fakeChat.attachmentName1': 'Current_Brand_Guidelines.pdf',
    'fakeChat.attachmentLabel': 'PDF Document',
    'fakeChat.downloadButton': 'Download',
    'fakeChat.message6': 'Thanks for sharing! I\'ll review this and prepare a proposal. I\'ll also send you some initial concepts based on what you\'ve described.',
    'fakeChat.timestamp6': '10:45 AM',
    'fakeChat.message7': 'Here are some initial mood boards and concepts I\'ve prepared. This should give you an idea of the direction we could take.',
    'fakeChat.timestamp7': '10:50 AM',
    'fakeChat.attachmentName2': 'Initial_Concepts_v1.zip',
    'fakeChat.message8': 'Wow, these look amazing! I love the direction. When can we schedule a call to discuss the next steps?',
    'fakeChat.timestamp8': '11:15 AM',

    // Testimonials
    'testimonials.subtitle': 'Testimonials',
    'testimonials.title': 'What Clients Say',
    'testimonials.description': 'Discover what my clients think about working with me and the results we\'ve achieved together.',
    'testimonials.trustedBy': 'Trusted by Leading Companies',
    'testimonials.trustedByDesc': 'I\'ve had the privilege of working with innovative companies across various industries.',
    'testimonials.googleReviewTitle': 'Leave a Google Review',
    'testimonials.googleReviewDescription': 'If you\'ve worked with me, I\'d appreciate your feedback on Google to help other potential clients.',
    'testimonials.googleReviewButton': 'Write a Review',
    'testimonials.googleReviewFooter': '4.9/5 based on 50+ reviews',

    // Individual Testimonials
    'testimonial1.name': 'Sarah Chen',
    'testimonial1.role': 'CEO',
    'testimonial1.company': 'TechFlow Solutions',
    'testimonial1.project': 'Complete Brand Redesign',
    'testimonial1.date': 'March 2024',
    'testimonial1.content': 'Theo transformed our entire brand identity. His attention to detail and creative vision exceeded our expectations. The new design perfectly captures our company values.',

    'testimonial2.name': 'Marcus Weber',
    'testimonial2.role': 'Marketing Director',
    'testimonial2.company': 'SwissInnovate',
    'testimonial2.project': 'Website Redesign',
    'testimonial2.date': 'February 2024',
    'testimonial2.content': 'Working with Theo was a game-changer. He delivered a stunning website that not only looks amazing but also performs exceptionally well. Our conversion rate increased by 40%.',

    'testimonial3.name': 'Elena Rodriguez',
    'testimonial3.role': 'Founder',
    'testimonial3.company': 'GreenTech Startup',
    'testimonial3.project': 'Brand Identity & App Design',
    'testimonial3.date': 'January 2024',
    'testimonial3.content': 'Theo\'s holistic approach to design is remarkable. He understood our vision immediately and created a cohesive brand experience across all touchpoints.',

    'testimonial4.name': 'David Kim',
    'testimonial4.role': 'Product Manager',
    'testimonial4.company': 'FinanceFlow',
    'testimonial4.project': 'UI/UX Redesign',
    'testimonial4.date': 'December 2023',
    'testimonial4.content': 'The user experience improvements Theo implemented resulted in a 50% increase in user engagement. His design thinking process is truly exceptional.',

    'testimonial5.name': 'Anna Müller',
    'testimonial5.role': 'Creative Director',
    'testimonial5.company': 'Design Studio Zurich',
    'testimonial5.project': 'Brand Strategy Consultation',
    'testimonial5.date': 'November 2023',
    'testimonial5.content': 'Theo\'s strategic insights helped us refine our brand positioning. His expertise in both design and business strategy is invaluable.',

    'testimonial6.name': 'James Thompson',
    'testimonial6.role': 'Startup Founder',
    'testimonial6.company': 'InnovateLab',
    'testimonial6.project': 'Complete Digital Presence',
    'testimonial6.date': 'October 2023',
    'testimonial6.content': 'From logo to website to marketing materials, Theo created a consistent and powerful brand presence that helped us secure our Series A funding.',

    'testimonial7.name': 'Lisa Zhang',
    'testimonial7.role': 'E-commerce Director',
    'testimonial7.company': 'RetailTech Solutions',
    'testimonial7.project': 'E-commerce Platform Design',
    'testimonial7.date': 'September 2023',
    'testimonial7.content': 'Theo\'s e-commerce design expertise is outstanding. The new platform design increased our sales by 35% within the first month of launch.',

    // Contact Section
    'contact.subtitle': 'Contact',
    'contact.title1': 'Let\'s Create',
    'contact.title2': 'Something Amazing',
    'contact.description': 'Ready to bring your vision to life? Let\'s discuss your project and explore how we can work together.',
    'contact.getInTouch': 'Get in Touch',
    'contact.getInTouchDesc': 'I\'m always excited to discuss new projects and creative challenges. Reach out and let\'s start the conversation.',
    'contact.email': 'Email',
    'contact.emailDesc': 'Drop me a line anytime',
    'contact.location': 'Location',
    'contact.locationValue': 'Vevey, Switzerland',
    'contact.locationDesc': 'Based in beautiful Switzerland',
    'contact.followMe': 'Follow Me',
    'contact.sendMessage': 'Send a Message',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your name',
    'contact.emailPlaceholder': 'your.email@example.com',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'Project inquiry',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell me about your project...',
    'contact.sendBtn': 'Send Message',

    // Footer
    'footer.madeWith': 'Made with',
    'footer.inSwitzerland': 'in Switzerland',
    'footer.backToTop': 'Back to top',

    // Error Messages
    'error.title': 'Oops! Something went wrong',
    'error.description': 'An unexpected error occurred. Please try refreshing the page or contact me if the problem persists.',
    'error.reload': 'Reload Page',
    'error.backHome': 'Back to Home',
  },
  fr: {
    // Navigation
    'nav.about': 'À Propos',
    'nav.work': 'Travaux',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.letsTalk': 'Discutons',

    // Hero Section
    'hero.subtitle': 'Solutions Créatives',
    'hero.greeting': 'Bonjour, je suis',
    'hero.title1': 'Theo Blondel',
    'hero.title2': 'Créatif',
    'hero.title3': 'Médiamaticien',
    'hero.description': 'Médiamaticien basé en Suisse, je combine créativité artistique et expertise technique pour créer des expériences visuelles authentiques.',
    'hero.contactMe': 'Me Contacter',
    'hero.watchDemo': 'Voir la Démo',
    'hero.yearsExperience': 'Années\nd\'Expérience',
    'hero.projectsDelivered': 'Projets\nRéalisés',
    'hero.clientSatisfaction': 'Satisfaction\nClient',
    'hero.clientsWorldwide': 'Clients\nMondiale',
    'hero.service1.title': 'Identité de Marque',
    'hero.service1.desc': 'Identités visuelles uniques qui racontent votre histoire',
    'hero.service2.title': 'Design UI/UX',
    'hero.service2.desc': 'Interfaces intuitives pour des expériences exceptionnelles',
    'hero.service3.title': 'Développement Web',
    'hero.service3.desc': 'Sites web modernes qui performent et convertissent',
    'hero.service4.title': 'Direction Créative',
    'hero.service4.desc': 'Vision stratégique pour vos projets créatifs',

    // About Section
    'about.subtitle': 'À Propos',
    'about.title1': 'Solutions Créatives',
    'about.title2': 'Polyvalente',
    'about.description1': 'Médiamaticien basé en Suisse, je combine créativité artistique et expertise technique pour créer des expériences visuelles authentiques. Mon approche holistique du design me permet de développer des solutions créatives qui racontent votre histoire de manière unique.',
    'about.description2': 'Spécialisé en identité de marque et design d\'interface, j\'accompagne mes clients dans la création d\'expériences mémorables qui marquent les esprits et génèrent des résultats concrets.',
    'about.skill1.title': 'Design Créatif',
    'about.skill1.desc': 'Identité visuelle, branding et direction créative',
    'about.skill2.title': 'Design UI/UX',
    'about.skill2.desc': 'Interfaces utilisateur et expériences exceptionnelles',
    'about.skill3.title': 'Développement',
    'about.skill3.desc': 'Sites web modernes et applications web',
    'about.skill4.title': 'Stratégie',
    'about.skill4.desc': 'Conseil créatif et gestion de projet',
    'about.learnMore': 'En Savoir Plus',
    'about.whatAmIFor': 'À quoi je sers ?',

    // Portfolio Section
    'portfolio.subtitle': 'Mes Travaux',
    'portfolio.title1': 'Projets',
    'portfolio.title2': 'Sélectionnés',
    'portfolio.description': 'Découvrez une sélection de mes projets récents, chacun racontant une histoire unique à travers un design réfléchi et une réflexion stratégique.',
    'portfolio.viewAllBehance': 'Voir Tout sur Behance',

    // Services Section
    'services.subtitle': 'Services',
    'services.title': 'Ce Que Je Fais',
    'services.description': 'J\'offre des solutions créatives complètes adaptées à vos besoins et objectifs spécifiques.',
    'services.startProject': 'Démarrer un Projet',
    
    'services.brandIdentity.title': 'Identité de Marque',
    'services.brandIdentity.desc': 'Systèmes d\'identité visuelle complets qui reflètent les valeurs de votre marque et connectent avec votre audience.',
    'services.brandIdentity.feature1': 'Design de Logo & Guidelines',
    'services.brandIdentity.feature2': 'Palettes de Couleurs & Typographie',
    'services.brandIdentity.feature3': 'Stratégie & Positionnement',
    'services.brandIdentity.feature4': 'Applications Print & Digitales',

    'services.uiux.title': 'Design UI/UX',
    'services.uiux.desc': 'Solutions de design centrées sur l\'utilisateur qui créent des expériences digitales intuitives et engageantes.',
    'services.uiux.feature1': 'Recherche & Analyse Utilisateur',
    'services.uiux.feature2': 'Wireframing & Prototypage',
    'services.uiux.feature3': 'Design d\'Interface & Tests',
    'services.uiux.feature4': 'Design Systems & Guidelines',

    'services.webDev.title': 'Développement Web',
    'services.webDev.desc': 'Sites web modernes et responsives construits avec les dernières technologies pour une performance optimale.',
    'services.webDev.feature1': 'Design Web Responsive',
    'services.webDev.feature2': 'Développement Frontend',
    'services.webDev.feature3': 'Intégration CMS',
    'services.webDev.feature4': 'Optimisation Performance',

    'services.mobile.title': 'Design Mobile',
    'services.mobile.desc': 'Applications mobiles natives et cross-platform conçues pour des expériences utilisateur exceptionnelles.',
    'services.mobile.feature1': 'Design iOS & Android',
    'services.mobile.feature2': 'Optimisation App Store',
    'services.mobile.feature3': 'Design de Flux Utilisateur',
    'services.mobile.feature4': 'Approche Mobile-First',

    'services.creative.title': 'Direction Créative',
    'services.creative.desc': 'Leadership créatif stratégique pour campagnes, projets et initiatives de marque.',
    'services.creative.feature1': 'Stratégie Créative',
    'services.creative.feature2': 'Direction Artistique',
    'services.creative.feature3': 'Développement de Campagne',
    'services.creative.feature4': 'Leadership d\'Équipe',

    'services.motion.title': 'Motion Graphics',
    'services.motion.desc': 'Contenu visuel dynamique qui donne vie à votre marque à travers l\'animation et le mouvement.',
    'services.motion.feature1': 'Design d\'Animation',
    'services.motion.feature2': 'Production Vidéo',
    'services.motion.feature3': 'Médias Interactifs',
    'services.motion.feature4': 'Animation de Marque',

    // Process Section
    'process.subtitle': 'Processus',
    'process.title': 'Comment Je Travaille',
    'process.step1.title': 'Découverte',
    'process.step1.desc': 'Comprendre vos besoins, objectifs et audience cible',
    'process.step2.title': 'Recherche',
    'process.step2.desc': 'Analyse de marché et recherche concurrentielle',
    'process.step3.title': 'Design',
    'process.step3.desc': 'Création de concepts et solutions visuelles',
    'process.step4.title': 'Développement',
    'process.step4.desc': 'Donner vie aux designs avec du code',
    'process.step5.title': 'Tests',
    'process.step5.desc': 'Assurance qualité et tests utilisateur',
    'process.step6.title': 'Lancement',
    'process.step6.desc': 'Déploiement et support continu',

    // Concrete Example
    'concrete.label': 'Exemple Concret',
    'concrete.title': 'Communication Client Réelle',
    'concrete.description': 'Voici comment se déroule une conversation de projet typique avec l\'un de mes clients.',
    'concrete.method': 'Mon approche collaborative assure une communication claire et des résultats exceptionnels à chaque étape.',

    // CTA
    'cta.title': 'Prêt à Démarrer Votre Projet ?',
    'cta.subtitle': 'Discutons de la façon dont je peux vous aider à donner vie à votre vision.',
    'cta.startProject': 'Démarrer un Projet',
    'cta.viewProjects': 'Voir les Projets',

    // Fake Chat
    'fakeChat.clientName': 'Sarah Chen',
    'fakeChat.onlineStatus': 'En ligne maintenant',
    'fakeChat.typingIndicator': 'tape...',
    'fakeChat.message1': 'Salut Theo ! J\'ai vu ton portfolio et je suis vraiment impressionnée. Nous avons besoin d\'un rebranding complet pour notre startup tech.',
    'fakeChat.timestamp1': '10:30',
    'fakeChat.message2': 'Merci Sarah ! J\'adorerais t\'aider. Peux-tu me parler davantage de ton entreprise et de ce que tu cherches à accomplir avec le rebranding ?',
    'fakeChat.timestamp2': '10:32',
    'fakeChat.message3': 'Nous sommes une entreprise fintech axée sur l\'investissement durable. Nous voulons quelque chose de moderne mais digne de confiance, qui plaît aux millennials.',
    'fakeChat.timestamp3': '10:35',
    'fakeChat.message4': 'Parfait ! Ça sonne comme un projet passionnant. J\'ai de l\'expérience avec le branding fintech. Laisse-moi te montrer quelques travaux pertinents et nous pourrons discuter de ton calendrier.',
    'fakeChat.timestamp4': '10:37',
    'fakeChat.message5': 'Ce serait génial ! Voici notre document de guidelines de marque actuel. Comme tu peux le voir, il a besoin d\'une refonte complète.',
    'fakeChat.timestamp5': '10:40',
    'fakeChat.attachmentName1': 'Guidelines_Marque_Actuelles.pdf',
    'fakeChat.attachmentLabel': 'Document PDF',
    'fakeChat.downloadButton': 'Télécharger',
    'fakeChat.message6': 'Merci de partager ! Je vais examiner ceci et préparer une proposition. Je t\'enverrai aussi quelques concepts initiaux basés sur ce que tu as décrit.',
    'fakeChat.timestamp6': '10:45',
    'fakeChat.message7': 'Voici quelques mood boards et concepts initiaux que j\'ai préparés. Cela devrait te donner une idée de la direction que nous pourrions prendre.',
    'fakeChat.timestamp7': '10:50',
    'fakeChat.attachmentName2': 'Concepts_Initiaux_v1.zip',
    'fakeChat.message8': 'Wow, ils sont magnifiques ! J\'adore la direction. Quand pouvons-nous programmer un appel pour discuter des prochaines étapes ?',
    'fakeChat.timestamp8': '11:15',

    // Testimonials
    'testimonials.subtitle': 'Témoignages',
    'testimonials.title': 'Ce Que Disent les Clients',
    'testimonials.description': 'Découvrez ce que mes clients pensent de travailler avec moi et les résultats que nous avons obtenus ensemble.',
    'testimonials.trustedBy': 'Fait Confiance par des Entreprises Leaders',
    'testimonials.trustedByDesc': 'J\'ai eu le privilège de travailler avec des entreprises innovantes dans diverses industries.',
    'testimonials.googleReviewTitle': 'Laisser un Avis Google',
    'testimonials.googleReviewDescription': 'Si vous avez travaillé avec moi, j\'apprécierais vos commentaires sur Google pour aider d\'autres clients potentiels.',
    'testimonials.googleReviewButton': 'Écrire un Avis',
    'testimonials.googleReviewFooter': '4,9/5 basé sur 50+ avis',

    // Individual Testimonials
    'testimonial1.name': 'Sarah Chen',
    'testimonial1.role': 'PDG',
    'testimonial1.company': 'TechFlow Solutions',
    'testimonial1.project': 'Refonte Complète de Marque',
    'testimonial1.date': 'Mars 2024',
    'testimonial1.content': 'Theo a transformé toute notre identité de marque. Son attention aux détails et sa vision créative ont dépassé nos attentes. Le nouveau design capture parfaitement les valeurs de notre entreprise.',

    'testimonial2.name': 'Marcus Weber',
    'testimonial2.role': 'Directeur Marketing',
    'testimonial2.company': 'SwissInnovate',
    'testimonial2.project': 'Refonte de Site Web',
    'testimonial2.date': 'Février 2024',
    'testimonial2.content': 'Travailler avec Theo a été un game-changer. Il a livré un site web magnifique qui non seulement a l\'air incroyable mais performe aussi exceptionnellement bien. Notre taux de conversion a augmenté de 40%.',

    'testimonial3.name': 'Elena Rodriguez',
    'testimonial3.role': 'Fondatrice',
    'testimonial3.company': 'GreenTech Startup',
    'testimonial3.project': 'Identité de Marque & Design d\'App',
    'testimonial3.date': 'Janvier 2024',
    'testimonial3.content': 'L\'approche holistique de Theo pour le design est remarquable. Il a compris notre vision immédiatement et a créé une expérience de marque cohérente sur tous les points de contact.',

    'testimonial4.name': 'David Kim',
    'testimonial4.role': 'Chef de Produit',
    'testimonial4.company': 'FinanceFlow',
    'testimonial4.project': 'Refonte UI/UX',
    'testimonial4.date': 'Décembre 2023',
    'testimonial4.content': 'Les améliorations d\'expérience utilisateur que Theo a implémentées ont résulté en une augmentation de 50% de l\'engagement utilisateur. Son processus de design thinking est vraiment exceptionnel.',

    'testimonial5.name': 'Anna Müller',
    'testimonial5.role': 'Directrice Créative',
    'testimonial5.company': 'Design Studio Zurich',
    'testimonial5.project': 'Consultation Stratégie de Marque',
    'testimonial5.date': 'Novembre 2023',
    'testimonial5.content': 'Les insights stratégiques de Theo nous ont aidés à affiner notre positionnement de marque. Son expertise en design et stratégie business est inestimable.',

    'testimonial6.name': 'James Thompson',
    'testimonial6.role': 'Fondateur de Startup',
    'testimonial6.company': 'InnovateLab',
    'testimonial6.project': 'Présence Digitale Complète',
    'testimonial6.date': 'Octobre 2023',
    'testimonial6.content': 'Du logo au site web aux matériaux marketing, Theo a créé une présence de marque cohérente et puissante qui nous a aidés à sécuriser notre financement Série A.',

    'testimonial7.name': 'Lisa Zhang',
    'testimonial7.role': 'Directrice E-commerce',
    'testimonial7.company': 'RetailTech Solutions',
    'testimonial7.project': 'Design de Plateforme E-commerce',
    'testimonial7.date': 'Septembre 2023',
    'testimonial7.content': 'L\'expertise de Theo en design e-commerce est exceptionnelle. Le nouveau design de plateforme a augmenté nos ventes de 35% dans le premier mois de lancement.',

    // Contact Section
    'contact.subtitle': 'Contact',
    'contact.title1': 'Créons',
    'contact.title2': 'Quelque Chose d\'Incroyable',
    'contact.description': 'Prêt à donner vie à votre vision ? Discutons de votre projet et explorons comment nous pouvons travailler ensemble.',
    'contact.getInTouch': 'Entrer en Contact',
    'contact.getInTouchDesc': 'Je suis toujours excité de discuter de nouveaux projets et défis créatifs. Contactez-moi et commençons la conversation.',
    'contact.email': 'Email',
    'contact.emailDesc': 'Écrivez-moi à tout moment',
    'contact.location': 'Localisation',
    'contact.locationValue': 'Vevey, Suisse',
    'contact.locationDesc': 'Basé dans la belle Suisse',
    'contact.followMe': 'Suivez-Moi',
    'contact.sendMessage': 'Envoyer un Message',
    'contact.name': 'Nom',
    'contact.namePlaceholder': 'Votre nom',
    'contact.emailPlaceholder': 'votre.email@exemple.com',
    'contact.subject': 'Sujet',
    'contact.subjectPlaceholder': 'Demande de projet',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Parlez-moi de votre projet...',
    'contact.sendBtn': 'Envoyer le Message',

    // Footer
    'footer.madeWith': 'Fait avec',
    'footer.inSwitzerland': 'en Suisse',
    'footer.backToTop': 'Retour en haut',

    // Error Messages
    'error.title': 'Oups ! Quelque chose s\'est mal passé',
    'error.description': 'Une erreur inattendue s\'est produite. Veuillez essayer de rafraîchir la page ou me contacter si le problème persiste.',
    'error.reload': 'Recharger la Page',
    'error.backHome': 'Retour à l\'Accueil',
  },
  // Add other languages as needed...
  es: {
    'nav.about': 'Acerca de',
    'nav.work': 'Trabajo',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'nav.letsTalk': 'Hablemos',
    // Add more Spanish translations...
  },
  ru: {
    'nav.about': 'О нас',
    'nav.work': 'Работы',
    'nav.services': 'Услуги',
    'nav.contact': 'Контакт',
    'nav.letsTalk': 'Поговорим',
    // Add more Russian translations...
  },
  zh: {
    'nav.about': '关于',
    'nav.work': '作品',
    'nav.services': '服务',
    'nav.contact': '联系',
    'nav.letsTalk': '让我们谈谈',
    // Add more Chinese translations...
  },
  ja: {
    'nav.about': '私について',
    'nav.work': '作品',
    'nav.services': 'サービス',
    'nav.contact': 'お問い合わせ',
    'nav.letsTalk': 'お話ししましょう',
    // Add more Japanese translations...
  },
  de: {
    'nav.about': 'Über mich',
    'nav.work': 'Arbeiten',
    'nav.services': 'Dienstleistungen',
    'nav.contact': 'Kontakt',
    'nav.letsTalk': 'Lass uns reden',
    // Add more German translations...
  },
  it: {
    'nav.about': 'Chi sono',
    'nav.work': 'Lavori',
    'nav.services': 'Servizi',
    'nav.contact': 'Contatto',
    'nav.letsTalk': 'Parliamo',
    // Add more Italian translations...
  },
  pt: {
    'nav.about': 'Sobre',
    'nav.work': 'Trabalhos',
    'nav.services': 'Serviços',
    'nav.contact': 'Contato',
    'nav.letsTalk': 'Vamos conversar',
    // Add more Portuguese translations...
  },
  sq: {
    'nav.about': 'Rreth meje',
    'nav.work': 'Punët',
    'nav.services': 'Shërbimet',
    'nav.contact': 'Kontakti',
    'nav.letsTalk': 'Le të flasim',
    // Add more Albanian translations...
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Set default theme to 'light' and default language to 'en'
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return (saved as Theme) || 'light'; // Default to light
    }
    return 'light'; // Default to light
  });

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved as Language) || 'en'; // Default to English
    }
    return 'en'; // Default to English
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value: AppContextType = {
    theme,
    language,
    toggleTheme,
    setLanguage,
    t
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}