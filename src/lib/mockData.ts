import { subDays, addDays } from 'date-fns';

export const DEFAULT_PREACHERS = [
  'William Marrion Branham',
  'Ewald Frank'
];

export const mockSermons = [
  {
    id: '1',
    title: 'La Foi Vivante',
    preacher: 'Pasteur Jean',
    date: subDays(new Date(), 2).toISOString(),
    views: 156,
    type: 'audio',
    mediaUrl: 'https://example.com/sermons/la-foi-vivante.mp3',
    duration: '45:30',
    description: 'Un message puissant sur la foi qui transforme les vies...',
    tags: ['foi', 'enseignement']
  },
  {
    id: '2',
    title: 'La Puissance de la Prière',
    preacher: 'Pasteur Pierre',
    date: subDays(new Date(), 5).toISOString(),
    views: 243,
    type: 'audio',
    mediaUrl: 'https://example.com/sermons/puissance-priere.mp3',
    duration: '38:15',
    description: 'Découvrez comment la prière peut transformer votre vie spirituelle...',
    tags: ['prière', 'spiritualité']
  },
  {
    id: '3',
    title: 'Le Message du Temps de la Fin',
    preacher: 'Pasteur Paul',
    date: subDays(new Date(), 7).toISOString(),
    views: 189,
    type: 'audio',
    mediaUrl: 'https://example.com/sermons/message-temps-fin.mp3',
    duration: '52:20',
    description: 'Une révélation profonde sur les temps dans lesquels nous vivons...',
    tags: ['prophétie', 'temps-de-la-fin']
  },
  {
    id: '4',
    title: 'L\'Amour Divin',
    preacher: 'Pasteur Marc',
    date: subDays(new Date(), 10).toISOString(),
    views: 167,
    type: 'audio',
    mediaUrl: 'https://example.com/sermons/amour-divin.mp3',
    duration: '41:45',
    description: 'Un message touchant sur l\'amour de Dieu pour Son peuple...',
    tags: ['amour', 'grâce']
  },
  {
    id: '5',
    title: 'Les Dons du Saint-Esprit',
    preacher: 'Pasteur Jean',
    date: subDays(new Date(), 12).toISOString(),
    views: 198,
    type: 'audio',
    mediaUrl: 'https://example.com/sermons/dons-saint-esprit.mp3',
    duration: '47:10',
    description: 'Une étude approfondie des dons spirituels...',
    tags: ['saint-esprit', 'dons']
  },
  {
    id: '7',
    title: 'Le Retour de Christ',
    preacher: 'Pasteur David',
    date: subDays(new Date(), 1).toISOString(),
    views: 412,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=abc123',
    duration: '1:15:30',
    description: 'Les signes prophétiques du retour imminent de notre Seigneur',
    tags: ['prophétie', 'temps-de-la-fin'],
    language: 'fr',
    location: 'Assemblée d\'Abidjan'
  },
  {
    id: '8',
    title: 'Le Baptême du Saint-Esprit',
    preacher: 'Pasteur Thomas',
    date: subDays(new Date(), 3).toISOString(),
    views: 378,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=def456',
    duration: '1:02:45',
    description: 'Comment recevoir le baptême du Saint-Esprit',
    tags: ['saint-esprit', 'baptême'],
    language: 'fr',
    location: 'Centre Biblique'
  },
  {
    id: '9',
    title: 'Les Sept Sceaux',
    preacher: 'Pasteur Michel',
    date: subDays(new Date(), 4).toISOString(),
    views: 523,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=ghi789',
    duration: '1:45:20',
    description: 'Révélation des sept sceaux de l\'Apocalypse',
    tags: ['apocalypse', 'révélation'],
    language: 'fr',
    location: 'Assemblée d\'Abidjan'
  },
  {
    id: '10',
    title: 'La Restauration de l\'Église',
    preacher: 'Pasteur Philippe',
    date: subDays(new Date(), 6).toISOString(),
    views: 289,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=jkl012',
    duration: '58:15',
    description: 'Le plan divin pour la restauration de l\'Église',
    tags: ['église', 'restauration'],
    language: 'fr',
    location: 'Salle de Conférence'
  },
  {
    id: '11',
    title: 'Le Message de l\'Heure',
    preacher: 'Pasteur Samuel',
    date: subDays(new Date(), 8).toISOString(),
    views: 445,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=mno345',
    duration: '1:23:40',
    description: 'La Parole révélée pour notre temps',
    tags: ['message', 'révélation'],
    language: 'fr',
    location: 'Assemblée d\'Abidjan'
  },
  {
    id: '12',
    title: 'La Préparation de l\'Épouse',
    preacher: 'Pasteur David',
    date: subDays(new Date(), 9).toISOString(),
    views: 367,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=pqr678',
    duration: '1:12:55',
    description: 'Comment l\'Épouse se prépare pour l\'Enlèvement',
    tags: ['épouse', 'enlèvement'],
    language: 'fr',
    location: 'Centre Biblique'
  },
  {
    id: '13',
    title: 'Les Âges de l\'Église',
    preacher: 'Pasteur Thomas',
    date: subDays(new Date(), 11).toISOString(),
    views: 534,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=stu901',
    duration: '1:34:20',
    description: 'Les sept âges de l\'église expliqués',
    tags: ['église', 'doctrine'],
    language: 'fr',
    location: 'Assemblée d\'Abidjan'
  },
  {
    id: '14',
    title: 'La Divinité Suprême',
    preacher: 'Pasteur Michel',
    date: subDays(new Date(), 13).toISOString(),
    views: 412,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=vwx234',
    duration: '1:28:15',
    description: 'La révélation de la divinité de Jésus-Christ',
    tags: ['divinité', 'doctrine'],
    language: 'fr',
    location: 'Salle de Conférence'
  },
  {
    id: '15',
    title: 'Le Combat de la Foi',
    preacher: 'Pasteur Philippe',
    date: subDays(new Date(), 14).toISOString(),
    views: 298,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=yz789',
    duration: '1:05:40',
    description: 'Comment persévérer dans le combat de la foi',
    tags: ['foi', 'combat'],
    language: 'fr',
    location: 'Centre Biblique'
  },
  {
    id: '16',
    title: 'La Nouvelle Naissance',
    preacher: 'Pasteur Samuel',
    date: subDays(new Date(), 15).toISOString(),
    views: 467,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=abc890',
    duration: '1:18:25',
    description: 'L\'expérience de la nouvelle naissance',
    tags: ['salut', 'régénération'],
    language: 'fr',
    location: 'Assemblée d\'Abidjan'
  },
  {
    id: '17',
    title: 'Le Mariage Chrétien',
    preacher: 'Pasteur David',
    date: subDays(new Date(), 16).toISOString(),
    views: 389,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=def123',
    duration: '1:42:30',
    description: 'Les principes bibliques du mariage',
    tags: ['mariage', 'famille'],
    language: 'fr',
    location: 'Salle de Conférence'
  },
  {
    id: '18',
    title: 'L\'Adoption Spirituelle',
    preacher: 'Pasteur Thomas',
    date: subDays(new Date(), 17).toISOString(),
    views: 445,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=ghi456',
    duration: '1:25:15',
    description: 'La position des fils de Dieu',
    tags: ['adoption', 'maturité'],
    language: 'fr',
    location: 'Centre Biblique'
  },
  {
    id: '19',
    title: 'Le Ministère des Anges',
    preacher: 'Pasteur Michel',
    date: subDays(new Date(), 18).toISOString(),
    views: 356,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=jkl789',
    duration: '1:15:45',
    description: 'Le rôle des anges dans la vie des croyants',
    tags: ['anges', 'spiritualité'],
    language: 'fr',
    location: 'Assemblée d\'Abidjan'
  },
  {
    id: '20',
    title: 'La Guérison Divine',
    preacher: 'Pasteur Philippe',
    date: subDays(new Date(), 19).toISOString(),
    views: 478,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=mno012',
    duration: '1:31:20',
    description: 'La puissance de Dieu pour la guérison',
    tags: ['guérison', 'miracle'],
    language: 'fr',
    location: 'Salle de Conférence'
  },
  {
    id: '21',
    title: 'Le Don de Prophétie',
    preacher: 'Pasteur Samuel',
    date: subDays(new Date(), 20).toISOString(),
    views: 412,
    type: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=pqr345',
    duration: '1:28:50',
    description: 'L\'exercice du don de prophétie dans l\'église',
    tags: ['prophétie', 'dons'],
    language: 'fr',
    location: 'Centre Biblique'
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'Convention Annuelle',
    date: addDays(new Date(), 15).toISOString(),
    location: 'Salle des Congrès, Paris',
    description: 'Notre convention annuelle rassemblant les croyants du Message...',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    type: 'convention'
  },
  {
    id: '2',
    title: 'Réunion de Prière',
    date: addDays(new Date(), 2).toISOString(),
    location: 'Église du Message, Lyon',
    description: 'Une soirée spéciale de prière et d\'intercession...',
    imageUrl: 'https://images.pexels.com/photos/1839671/pexels-photo-1839671.jpeg',
    type: 'prayer'
  },
  {
    id: '3',
    title: 'Séminaire Biblique',
    date: addDays(new Date(), 30).toISOString(),
    location: 'Centre d\'études bibliques, Marseille',
    description: 'Une formation approfondie sur les vérités bibliques...',
    imageUrl: 'https://images.pexels.com/photos/159621/open-book-library-education-read-159621.jpeg',
    type: 'seminar'
  }
];

export const mockBooks = [
  {
    id: '1',
    title: 'L\'Âge de l\'Église d\'Éphèse',
    author: 'William Marrion Branham',
    description: 'Une étude approfondie du premier âge de l\'église, révélant les caractéristiques et les défis de cette période cruciale.',
    category: 'book',
    year: 1960,
    language: 'fr',
    tags: ['âges-de-l\'église', 'doctrine'],
    location: 'Jeffersonville, Indiana'
  },
  {
    id: '2',
    title: 'Le Septième Sceau',
    author: 'William Marrion Branham',
    description: 'La révélation du mystérieux septième sceau de l\'Apocalypse et sa signification pour notre temps.',
    category: 'book',
    year: 1963,
    language: 'fr',
    tags: ['sceaux', 'prophétie'],
    location: 'Jeffersonville, Indiana'
  },
  {
    id: '3',
    title: 'La Stature d\'un Homme Parfait',
    author: 'William Marrion Branham',
    description: 'Un enseignement profond sur les sept vertus de la foi chrétienne et le développement spirituel.',
    category: 'book',
    year: 1962,
    language: 'fr',
    tags: ['foi', 'sanctification'],
    location: 'Jeffersonville, Indiana'
  },
  {
    id: '4',
    title: 'Le Message du Temps de la Fin',
    author: 'Ewald Frank',
    description: 'Une présentation claire et biblique du message prophétique pour notre génération.',
    category: 'book',
    year: 1985,
    language: 'fr',
    tags: ['prophétie', 'temps-de-la-fin'],
    location: 'Krefeld, Allemagne'
  },
  {
    id: '5',
    title: 'Le Mariage et le Divorce',
    author: 'William Marrion Branham',
    description: 'Une exposition biblique sur le sujet du mariage, du divorce et du remariage.',
    category: 'book',
    year: 1965,
    language: 'fr',
    tags: ['mariage', 'doctrine'],
    location: 'Jeffersonville, Indiana'
  },
  {
    id: '6',
    title: 'Les Soixante-dix Semaines de Daniel',
    author: 'William Marrion Branham',
    description: 'Une étude détaillée de la prophétie de Daniel concernant les soixante-dix semaines.',
    category: 'book',
    year: 1961,
    language: 'fr',
    tags: ['prophétie', 'daniel'],
    location: 'Jeffersonville, Indiana'
  },
  {
    id: '7',
    title: 'Questions et Réponses sur les Sceaux',
    author: 'William Marrion Branham',
    description: 'Réponses aux questions concernant la révélation des Sept Sceaux.',
    category: 'book',
    year: 1963,
    language: 'fr',
    tags: ['sceaux', 'questions-réponses'],
    location: 'Jeffersonville, Indiana'
  },
  {
    id: '8',
    title: 'L\'Église et sa Condition',
    author: 'William Marrion Branham',
    description: 'Un message sur l\'état spirituel de l\'église et son besoin de réveil.',
    category: 'brochure',
    year: 1956,
    language: 'fr',
    tags: ['église', 'réveil'],
    location: 'Jeffersonville, Indiana'
  },
  {
    id: '9',
    title: 'Le Temps de la Moisson',
    author: 'Ewald Frank',
    description: 'Une perspective biblique sur le temps de la moisson spirituelle dans les derniers jours.',
    category: 'brochure',
    year: 1990,
    language: 'fr',
    tags: ['moisson', 'temps-de-la-fin'],
    location: 'Krefeld, Allemagne'
  },
  {
    id: '10',
    title: 'La Semence n\'Hérite pas avec la Balle',
    author: 'William Marrion Branham',
    description: 'Un message sur la maturation de la véritable Semence-Parole.',
    category: 'sermon',
    year: 1965,
    language: 'fr',
    tags: ['semence', 'maturation'],
    location: 'Los Angeles, Californie'
  },
  {
    id: '11',
    title: 'Le Signe',
    author: 'William Marrion Branham',
    description: 'L\'importance du Signe de la vie de Christ dans le croyant.',
    category: 'book',
    year: 1963,
    language: 'fr',
    tags: ['saint-esprit', 'doctrine'],
    location: 'Jeffersonville, Indiana'
  },
  {
    id: '12',
    title: 'Le Dieu de cet Âge Mauvais',
    author: 'William Marrion Branham',
    description: 'Un avertissement concernant les séductions de Satan dans les derniers jours.',
    category: 'sermon',
    year: 1965,
    language: 'fr',
    tags: ['avertissement', 'temps-de-la-fin'],
    location: 'Jeffersonville, Indiana'
  },
  {
    id: '13',
    title: 'Les Événements Modernes Rendus Clairs par la Prophétie',
    author: 'William Marrion Branham',
    description: 'Comment les événements actuels s\'alignent avec la prophétie biblique.',
    category: 'book',
    year: 1965,
    language: 'fr',
    tags: ['prophétie', 'actualité'],
    location: 'San Bernardino, Californie'
  },
  {
    id: '14',
    title: 'L\'Enlèvement',
    author: 'William Marrion Branham',
    description: 'La révélation de l\'enlèvement de l\'Église et sa préparation.',
    category: 'book',
    year: 1965,
    language: 'fr',
    tags: ['enlèvement', 'prophétie'],
    location: 'Yuma, Arizona'
  },
  {
    id: '15',
    title: 'Christ est le Mystère de Dieu Révélé',
    author: 'William Marrion Branham',
    description: 'Une révélation profonde de Christ comme le mystère central de Dieu.',
    category: 'book',
    year: 1963,
    language: 'fr',
    tags: ['christ', 'révélation'],
    location: 'Jeffersonville, Indiana'
  }
];

export const mockTags = [
  { id: '1', name: 'foi' },
  { id: '2', name: 'prière' },
  { id: '3', name: 'prophétie' },
  { id: '4', name: 'temps-de-la-fin' },
  { id: '5', name: 'saint-esprit' },
  { id: '6', name: 'amour' },
  { id: '7', name: 'grâce' },
  { id: '8', name: 'combat' },
  { id: '9', name: 'sceaux' },
  { id: '10', name: 'doctrine' },
  { id: '11', name: 'église' },
  { id: '12', name: 'révélation' },
  { id: '13', name: 'enlèvement' },
  { id: '14', name: 'christ' },
  { id: '15', name: 'mariage' }
];

export const mockStats = {
  totalSermons: 245,
  totalBooks: 52,
  totalEvents: 12,
  activeUsers: 1250
};

export const mockAboutSections = [
  {
    id: '1',
    entity: 'assemblee',
    title: 'Qui sommes nous?',
    shortDescription: [`Nous ne sommes ni une dénomination, ni une organisation.`,`Nous sommes un peuple appelé par Dieu, issu de divers horizons. Nous sommes reconnaissants à Dieu de ce que nous pouvons voir l\'histoire du salut s\'accomplir devant nos yeux. Bien que nous regardons à la fois en arrière pour voir ce que Dieu a fait du temps des apôtres et des prophètes de la Bible, mais aussi en avant pour connaitre ce que Dieu va faire dans les temps à venir, mais, en tant que vrais croyants vivant constamment dans la présence de Dieu, nous reconnaissons dans l\'époque dans laquelle nous vivons, la partie de l\'histoire du salut qui s\'accomplit selon les promesses données dans Sa Parole. Et non seulement, nous la reconnaissonn mais aussi, nous y prenons part...`,`Nous avons entendu l'appel à sortir, nous sommes effectivement sortis et nous attendons le retour de notre Maitre et Seigneur Jésus-Christ en prenant notre préparation avec le plus grand sérieux. Aussi, annonçons nous cette bonne nouvelle aux autres en ces termes : « l'Epoux vient, sortez à Sa rencontre ». `],
    mainImage: 'https://images.pexels.com/photos/1974627/pexels-photo-1974627.jpeg',
    order: 0,
    isIntro: true
  },
  {
    id: '2',
    entity: 'frank',
    title: 'Ewald Frank',
    shortDescription: [`Le 2 avril 1962, au lever du jour, le révérend Frank vécut une expérience exceptionnelle. Comme pour Paul, Dieu donna directement une commission à Son serviteur. Dans sa langue maternelle, l'allemand, la Voix toute-puissante, transperçante et pleine d'autorité du Seigneur ressuscité, lui dit: « Mon serviteur, ton temps pour cette ville est bientôt passé. Je t'enverrai dans d'autres villes pour publier Ma Parole ». `,`Sans force, il s'effondrait et tombait sur la gauche, le visage tourné vers le sol. L'instant d'après, il se trouvait hors de son corps et, de cette autre dimension, il se vit dire ces mots: «Seigneur ils ne m'écouteront point. Ils ont tout à profusion et vivent dans la débauche». Cependant, le Seigneur répondit: «Mon serviteur, le temps vient où ils t'écouteront. Rassemble de la nourriture et des vivres, car une grande famine arrive. Alors tu te tiendras au milieu du peuple et tu distribueras la nourriture!».`],
    mainImage: 'https://images.pexels.com/photos/26152609/pexels-photo-26152609.jpeg',
    order: 1,
    isIntro: true
  },
  {
    id: '3',
    entity: 'branham',
    title: 'William Marrion Branham',
    shortDescription: ['le 11 juin 1933 aux environs de quatorze heures en présence d\'à peu près 4.000 personnes, la lumière surnaturelle traversa les nuages et descendit sur le jeune prédicateur William Branham. En cet instant-là, il était sur le point de baptiser la dix-septième personne dans la rivière Ohio et, la voix venant de cette lumière lui parla « Comme Jean-Baptiste fut envoyé comme précurseur lors de la première venue de Christ, le message qui t\'est donné sera un précurseur de la seconde venue de Christ». Pendant les réunions de Pâques 1966 au Branham Tabernacle, le révérend Ewald Frank avait vu au moins douze personnes qui ont rendu témoignage sur cet événement. Dans le ministère de William Branham, nous avons affaire à une commission divine, l\'accomplissement du ministère d\'Élie. ','William Branham se référait également à l\'expérience qu\'il avait eue le 7 Mai 1946, quand la lumière surnaturelle illumina la pièce où il était et l\'Ange du Seigneur qu\'il décrivit avec précision se tint devant lui, en lui disant «Ne crains pas, je suis envoyé de la présence de Dieu pour te parler de ta commission…» Tout comme a été chaque appel que nous trouvons dans la Bible, celui-ci est aussi vrai parce qu\'il est un accomplissement direct de la promesse que Dieu a faite.'],
    mainImage: 'https://images.pexels.com/photos/15382618/pexels-photo-15382618.jpeg',
    order: 2,
    isIntro: true
  }
];

export const mockAboutDetails = {
  branham: {
    title: 'William Marrion Branham',
    content: 'Un aperçu de la vie et du ministère du prophète du temps de la fin...',
    imageUrl: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg'
  },
  frank: {
    title: 'Ewald Frank',
    content: 'Le ministère international du frère Frank...',
    imageUrl: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg'
  },
  assemblee: {
    title: 'Notre Assemblée',
    content: 'L\'histoire et la vision de notre assemblée locale...',
    imageUrl: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg'
  }
};