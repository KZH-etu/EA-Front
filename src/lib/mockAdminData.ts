import { subDays } from 'date-fns';
import { Entity } from '../stores/useEntitiesStore';
import { MediaVersion } from '../stores/useMediaVersionStore';
import { MediaSupport, MediaType } from '../stores/useMediaSupportStore';
import { Language, LanguageType } from '../stores/useLanguageStore';
import { Sermon } from '../stores/useSermonsStore';

export const DEFAULT_PREACHERS = [
  'William Marrion Branham',
  'Ewald Frank'
];

export const mockAdminSermons : Sermon[] = [
  {
    id: '1',
    preacher: 'Ewald Frank',
    date: subDays(new Date(), 2).toISOString(),
    type: 'audio',
    duration: '45:30',
    tags: ['1', '5'],
    availableLanguages: ['fr', 'en', 'es'],
    language: 'fr', // langue source (celle saisie manuellement)
    location: 'Centre Biblique',
    translations: [
      {
        lang: 'fr',
        title: 'La Foi Vivante',
        description: 'Un message puissant sur la foi qui transforme les vies...',
        url: 'https://example.com/sermons/fr/la-foi-vivante.mp3',
      },
      {
        lang: 'en',
        title: 'Living Faith',
        description: 'A powerful message about faith that transforms lives...',
        url: 'https://example.com/sermons/en/living-faith.mp3',
      },
      {
        lang: 'es',
        title: 'Fe Viva',
        description: 'Un mensaje poderoso sobre la fe que transforma vidas...',
        url: 'https://example.com/sermons/es/fe-viva.mp3',
      }
    ]
  },
  {
  id: '2',
  preacher: 'Ewald Frank',
  date: subDays(new Date(), 5).toISOString(),
  type: 'audio',
  duration: '38:15',
  tags: ['2', '4'],
  availableLanguages: ['fr', 'en'],
  language: 'fr',
  location: 'Centre Biblique',
  translations: [
    {
      lang: 'fr',
      title: 'La Puissance de la Prière',
      description: 'Découvrez comment la prière peut transformer votre vie spirituelle...',
      url: 'https://example.com/sermons/fr/puissance-priere.mp3',
    },
    {
      lang: 'en',
      title: 'The Power of Prayer',
      description: 'Discover how prayer can transform your spiritual life...',
      url: 'https://example.com/sermons/en/power-prayer.mp3',
    }
  ]
}
];

export const mockAdminBooks = [
  {
    id: '1',
    author: 'William Marrion Branham',
    category: 'book',
    year: 1960,
    coverUrl: "https://images.cdn-files-a.com/ready_uploads/media/172549/800_5ceaff1e37730.jpg",
    tags: ['5', '3'],
    availableLanguages: ['fr', 'en'],
    language: 'fr', // langue source
    location: 'Jeffersonville, Indiana',
    translations: [
      {
        lang: 'fr',
        title: 'L\'Âge de l\'Église d\'Éphèse',
        description: 'Une étude approfondie du premier âge de l\'église, révélant les caractéristiques et les défis de cette période cruciale.',
        downloadUrl: 'https://example.com/books/fr/age-ephese.pdf',
        readUrl: 'https://example.com/read/fr/age-ephese',
        is_auto_translated: false
      },
      {
        lang: 'en',
        title: 'The Church Age of Ephesus',
        description: 'An in-depth study of the first church age, revealing the characteristics and challenges of this crucial period.',
        downloadUrl: 'https://example.com/books/en/ephesian-church-age.pdf',
        readUrl: 'https://example.com/read/en/ephesian-church-age',
        is_auto_translated: false
      }
    ]
  },
  {
    id: '2',
    author: 'William Marrion Branham',
    category: 'book',
    year: 1963,
    coverUrl: "https://images.cdn-files-a.com/ready_uploads/media/172549/800_5ceaff1e37730.jpg",
    tags: ['1', '4'],
    availableLanguages: ['fr', 'en', 'es'],
    language: 'fr',
    location: 'Jeffersonville, Indiana',
    translations: [
      {
        lang: 'fr',
        title: 'Le Septième Sceau',
        description: 'La révélation du mystérieux septième sceau de l\'Apocalypse et sa signification pour notre temps.',
        downloadUrl: 'https://example.com/books/fr/septieme-sceau.pdf',
        readUrl: 'https://example.com/read/fr/septieme-sceau',
        is_auto_translated: false
      },
      {
        lang: 'en',
        title: 'The Seventh Seal',
        description: 'The revelation of the mysterious seventh seal of Revelation and its significance for our time.',
        downloadUrl: 'https://example.com/books/en/seventh-seal.pdf',
        readUrl: 'https://example.com/read/en/seventh-seal',
        is_auto_translated: false
      },
      {
        lang: 'es',
        title: 'El Séptimo Sello',
        description: 'La revelación del misterioso séptimo sello del Apocalipsis y su significado para nuestro tiempo.',
        downloadUrl: 'https://example.com/books/es/septimo-sello.pdf',
        readUrl: 'https://example.com/read/es/septimo-sello',
        is_auto_translated: false
      }
    ]
  }
];

export const mockAdminEvents = [
  {
    id: '1',
    language: 'fr',
    date: '2024-03-15T09:00:00.000Z',
    location: 'Assemblée d\'Abidjan',
    translations: [
      {
        lang: 'fr',
        title: 'Convention Annuelle',
        description: 'Notre convention annuelle avec des orateurs internationaux.',
        is_auto_translated: false
      },
      {
        lang: 'en',
        title: 'Annual Convention',
        description: 'Our annual convention with international speakers.',
        is_auto_translated: false
      },
      {
        lang: 'es',
        title: 'Convención Anual',
        description: 'Nuestra convención anual con oradores internacionales.',
        is_auto_translated: false
      }
    ]
  },
  {
    id: '2',
    language: 'fr',
    date: '2024-03-07T14:00:00.000Z',
    location: 'Salle de Conférence',
    translations: [
      {
        lang: 'fr',
        title: 'Séminaire sur la Foi',
        description: 'Un séminaire approfondi sur les fondements de la foi.',
        is_auto_translated: false
      },
      {
        lang: 'en',
        title: 'Faith Seminar',
        description: 'An in-depth seminar on the foundations of faith.',
        is_auto_translated: false
      },
      {
        lang: 'es',
        title: 'Seminario sobre la Fe',
        description: 'Un seminario profundo sobre los fundamentos de la fe.',
        is_auto_translated: false
      }
    ]
  }
];

export const mockAdminTags = [
  {
    id: '1',
    language: 'fr',
    translations: [
      { lang: 'fr', title: 'foi' },
      { lang: 'en', title: 'faith' },
      { lang: 'es', title: 'fe' }
    ]
  },
  {
    id: '2',
    language: 'fr',
    translations: [
      { lang: 'fr', title: 'prière' },
      { lang: 'en', title: 'prayer' },
      { lang: 'es', title: 'oración' }
    ]
  },
  {
    id: '3',
    language: 'fr',
    translations: [
      { lang: 'fr', title: 'doctrine' },
      { lang: 'en', title: 'doctrine' },
      { lang: 'es', title: 'doctrina' }
    ]
  },
  {
    id: '4',
    language: 'fr',
    translations: [
      { lang: 'fr', title: 'prophétie' },
      { lang: 'en', title: 'prophecy' },
      { lang: 'es', title: 'profecía' }
    ]
  },
  {
    id: '5',
    language: 'fr',
    translations: [
      { lang: 'fr', title: 'église' },
      { lang: 'en', title: 'church' },
      { lang: 'es', title: 'iglesia' }
    ]
  }
];

export const mockAdminSubscribers = [
  {
    id: '1',
    email: 'john.doe@example.com',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    createdAt: new Date('2024-01-20')
  }
];

export const mockAdminStats = {
  sermons: 156,
  books: 42,
  events: 8,
  subscribers: 1250,
  webradioListeners: 127,
  webtvViewers: 45,
  bandwidth: '1.2 TB',
  streamingTime: '168h'
};

export const mockAdminAboutSections = [
  {
    id: '1',
    entity: 'assemblee',
    mainImage: 'https://images.pexels.com/photos/1974627/pexels-photo-1974627.jpeg',
    order: 0,
    isIntro: true,
    translations: [
      {
        lang: 'fr',
        title: 'Qui sommes-nous ?',
        description: [`Nous ne sommes ni une dénomination, ni une organisation.`,`Nous sommes un peuple appelé par Dieu, venu de divers horizons. Nous remercions Dieu de nous permettre de voir l\’histoire du salut s\’accomplir sous nos yeux.`,`Nous regardons en arrière pour voir ce que Dieu a fait à l’époque des apôtres et des prophètes bibliques. Nous regardons également en avant, pour découvrir ce que Dieu fera dans les temps à venir. Mais surtout, en tant que vrais croyants vivant dans la présence constante de Dieu, nous reconnaissons que notre époque fait partie de l\’histoire du salut. Cette histoire s\’accomplit selon les promesses de Sa Parole. Et nous ne faisons pas que la reconnaître : nous y participons pleinement.`,`Nous avons entendu l\’appel à sortir. Nous sommes sortis. Nous attendons maintenant le retour de notre Maître et Seigneur, Jésus-Christ. Nous nous y préparons avec le plus grand sérieux.`,`C\’est pourquoi nous annonçons cette bonne nouvelle aux autres : « L\’Époux vient, sortez à Sa rencontre. »` ]
      },
      {
        lang: 'en',
        title: 'Who are we?',
        description: ["We are neither a denomination nor an organization.","We are a people called by God, coming from diverse backgrounds. We are thankful to God that we can witness the fulfillment of the history of salvation before our eyes. While we look back to see what God did in the time of the apostles and prophets of the Bible, we also look forward to know what God will do in the times to come. Yet, as true believers constantly living in God's presence, we recognize that the era we live in is part of the history of salvation being fulfilled according to the promises given in His Word. And not only do we recognize it, but we also take part in it...","We have heard the call to come out, we have indeed come out, and we await the return of our Master and Lord Jesus Christ, taking our preparation with the utmost seriousness. Therefore, we proclaim this good news to others in these words: “The Bridegroom is coming; go out to meet Him.”"]
      },
      {
        lang: 'es',
        title: '¿Quiénes somos?',
        description: ["No somos una denominación ni una organización.","Somos un pueblo llamado por Dios, proveniente de diversos orígenes. Estamos agradecidos con Dios porque podemos ver el cumplimiento de la historia de la salvación ante nuestros ojos. Aunque miramos hacia atrás para ver lo que Dios hizo en tiempos de los apóstoles y profetas de la Biblia, también miramos hacia adelante para conocer lo que Dios hará en los tiempos venideros. Pero, como verdaderos creyentes que viven constantemente en la presencia de Dios, reconocemos que la época en la que vivimos es parte de la historia de la salvación que se cumple según las promesas dadas en Su Palabra. Y no solo la reconocemos, sino que también participamos en ella...","Hemos oído el llamado a salir, de hecho hemos salido, y esperamos el regreso de nuestro Maestro y Señor Jesucristo, tomando nuestra preparación con la mayor seriedad. Por eso, anunciamos esta buena noticia a otros con estas palabras: «El Esposo viene, salid a su encuentro»."]
      }
    ]
  },
  {
    id: '2',
    entity: 'frank',
    mainImage: 'https://images.pexels.com/photos/26152609/pexels-photo-26152609.jpeg',
    order: 1,
    isIntro: true,
    translations: [
      {
        lang: 'fr',
        title: 'Ewald Frank',
        description: [`Le 2 avril 1962, au lever du jour, le révérend Frank vécut une expérience exceptionnelle. Comme pour Paul, Dieu donna directement une commission à Son serviteur. Dans sa langue maternelle, l'allemand, la Voix toute-puissante, transperçante et pleine d'autorité du Seigneur ressuscité, lui dit: « Mon serviteur, ton temps pour cette ville est bientôt passé. Je t'enverrai dans d'autres villes pour publier Ma Parole ». `,`Sans force, il s'effondrait et tombait sur la gauche, le visage tourné vers le sol. L'instant d'après, il se trouvait hors de son corps et, de cette autre dimension, il se vit dire ces mots: «Seigneur ils ne m'écouteront point. Ils ont tout à profusion et vivent dans la débauche». Cependant, le Seigneur répondit: «Mon serviteur, le temps vient où ils t'écouteront. Rassemble de la nourriture et des vivres, car une grande famine arrive. Alors tu te tiendras au milieu du peuple et tu distribueras la nourriture!».`]
      },
      {
        lang: 'en',
        title: 'Ewald Frank',
        description: [`On April 2, 1962, at dawn, Reverend Frank had an exceptional experience. As with Paul, God gave a commission directly to His servant. In his mother tongue, German, the all-powerful, piercing, and authoritative Voice of the risen Lord said to him: "My servant, your time for this city will soon be past. I will send you to other cities to publish My Word."`,`Without strength, he collapsed and fell to the left, his face turned toward the ground. The next moment, he found himself outside his body and, from this other dimension, he heard himself say these words: "Lord, they will not listen to me. They have everything in abundance and live in debauchery." However, the Lord replied: "My servant, the time is coming when they will listen to you. Gather food and provisions, for a great famine is coming. Then you will stand among the people and distribute the food!"`]
      },
      {
        lang: 'es',
        title: 'Ewald Frank',
        description: [`El 2 de abril de 1962, al amanecer, el reverendo Frank tuvo una experiencia excepcional. Como con Pablo, Dios dio una comisión directamente a Su siervo. En su lengua materna, el alemán, la Voz todopoderosa, penetrante y llena de autoridad del Señor resucitado le dijo: "Mi siervo, tu tiempo para esta ciudad pronto pasará. Te enviaré a otras ciudades para publicar Mi Palabra."`,`Sin fuerzas, se desplomó y cayó hacia la izquierda, con el rostro vuelto hacia el suelo. Al momento siguiente, se encontró fuera de su cuerpo y, desde esta otra dimensión, se oyó decir estas palabras: "Señor, no me escucharán. Lo tienen todo en abundancia y viven en el desenfreno." Sin embargo, el Señor respondió: "Mi siervo, viene el tiempo en que te escucharán. Reúne alimentos y provisiones, porque viene una gran hambruna. ¡Entonces te pararás en medio del pueblo y distribuirás la comida!"`]
      }
    ]
  },
  {
    id: '3',
    entity: 'branham',
    mainImage: 'https://images.pexels.com/photos/15382618/pexels-photo-15382618.jpeg',
    order: 2,
    isIntro: true,
    translations: [
      {
        lang: 'fr',
        title: 'William Marrion Branham',
        description: [`Le 11 juin 1933 aux environs de quatorze heures en présence d'à peu près 4.000 personnes, la lumière surnaturelle traversa les nuages et descendit sur le jeune prédicateur William Branham. En cet instant-là, il était sur le point de baptiser la dix-septième personne dans la rivière Ohio et, la voix venant de cette lumière lui parla « Comme Jean-Baptiste fut envoyé comme précurseur lors de la première venue de Christ, le message qui t'est donné sera un précurseur de la seconde venue de Christ». Pendant les réunions de Pâques 1966 au Branham Tabernacle, le révérend Ewald Frank avait vu au moins douze personnes qui ont rendu témoignage sur cet événement. Dans le ministère de William Branham, nous avons affaire à une commission divine, l'accomplissement du ministère d'Élie. `,`William Branham se référait également à l'expérience qu'il avait eue le 7 Mai 1946, quand la lumière surnaturelle illumina la pièce où il était et l'Ange du Seigneur qu'il décrivit avec précision se tint devant lui, en lui disant «Ne crains pas, je suis envoyé de la présence de Dieu pour te parler de ta commission…» Tout comme a été chaque appel que nous trouvons dans la Bible, celui-ci est aussi vrai parce qu'il est un accomplissement direct de la promesse que Dieu a faite.`]
      },
      {
        lang: 'en',
        title: 'William Marrion Branham',
        description: [`On June 11, 1933, around two o'clock in the presence of about 4,000 people, the supernatural light broke through the clouds and descended upon the young preacher William Branham. At that moment, he was about to baptize the seventeenth person in the Ohio River, and the voice coming from this light spoke to him, "As John the Baptist was sent as a forerunner of the first coming of Christ, the message given to you will be a forerunner of the second coming of Christ." During the Easter meetings of 1966 at the Branham Tabernacle, Reverend Ewald Frank had seen at least twelve people who testified about this event. In William Branham's ministry, we are dealing with a divine commission, the fulfillment of Elijah's ministry.`,`William Branham also referred to the experience he had on May 7, 1946, when the supernatural light illuminated the room where he was, and the Angel of the Lord, whom he described precisely, stood before him, saying, "Fear not, I am sent from the presence of God to tell you about your commission..." Just as was every call we find in the Bible, this one is also true because it is a direct fulfillment of the promise that God made.`]
      },
      {
        lang: 'es',
        title: 'William Marrion Branham',
        description: [`El 11 de junio de 1933, alrededor de las dos de la tarde en presencia de unas 4.000 personas, la luz sobrenatural atravesó las nubes y descendió sobre el joven predicador William Branham. En ese momento, estaba a punto de bautizar a la decimoséptima persona en el río Ohio, y la voz que venía de esta luz le habló: "Como Juan el Bautista fue enviado como precursor de la primera venida de Cristo, el mensaje que se te ha dado será un precursor de la segunda venida de Cristo." Durante las reuniones de Pascua de 1966 en el Tabernáculo Branham, el reverendo Ewald Frank había visto al menos doce personas que testificaron sobre este evento. En el ministerio de William Branham, estamos tratando con una comisión divina, el cumplimiento del ministerio de Elías.`,`William Branham también se refirió a la experiencia que tuvo el 7 de mayo de 1946, cuando la luz sobrenatural iluminó la habitación donde estaba, y el Ángel del Señor, a quien describió con precisión, se paró ante él, diciendo: "No temas, soy enviado de la presencia de Dios para hablarte de tu comisión..." Así como fue cada llamado que encontramos en la Biblia, este también es verdadero porque es un cumplimiento directo de la promesa que Dios hizo.`]
      }
    ]
  },
  {
    id: '4',
    entity: 'assemblee',
    mainImage: 'https://images.pexels.com/photos/1974627/pexels-photo-1974627.jpeg',
    order: 0,
    isIntro: false,
    translations: [
      {
        lang: 'fr',
        title: '',
        description: [
          "Nous vous saluons dans le précieux Nom de notre Seigneur Jésus-Christ.",
          "Nous ne sommes ni une dénomination ni une organisation, mais un peuple appelé par Dieu, rassemblé principalement à Abidjan. Nous croyons que le plan de salut de Dieu s'accomplit aujourd'hui, selon les promesses de Sa Parole. Les véritables croyants reconnaissent leur époque dans l'histoire du salut, y participent activement et se préparent au retour du Seigneur.",
          "Nous avons entendu l'appel, nous sommes sortis, et annonçons à notre tour : « L'Époux vient, sortez à Sa rencontre. » Conduits par le Saint-Esprit, nous vivons sobrement, tout en étant prêts chaque jour pour Son retour.",
          "Nous croyons que la promesse de Malachie 4 s'accomplit dans notre génération. Le ministère de Frère William Marrion Branham a été prédestiné comme précurseur du retour du Christ. Par ce message, et par le service fidèle du ministère actuel, nous sommes revenus à la Parole, et suivons uniquement le Seigneur Jésus-Christ.",
          "« Viens, Seigneur Jésus ! »"
        ]
      },
      {
        lang: 'en',
        title: '',
        description: [
          "We greet you in the precious Name of our Lord Jesus Christ.",
          "We are neither a denomination nor an organization, but a people called by God, gathered mainly in Abidjan. We believe that God's plan of salvation is being fulfilled today, according to the promises of His Word. True believers recognize their time in salvation history, actively participate in it, and prepare for the Lord's return.",
          "We have heard the call, we have come out, and we in turn announce: \"The Bridegroom is coming, go out to meet Him.\" Led by the Holy Spirit, we live soberly, while being ready every day for His return.",
          "We believe that the promise of Malachi 4 is being fulfilled in our generation. The ministry of Brother William Marrion Branham was predestined as a forerunner of Christ's return. Through this message, and through the faithful service of the current ministry, we have returned to the Word, and follow only the Lord Jesus Christ.",
          "\"Come, Lord Jesus!\""
        ]
      },
      {
        lang: 'es',
        title: '',
        description: [
          "Os saludamos en el precioso Nombre de nuestro Señor Jesucristo.",
          "No somos ni una denominación ni una organización, sino un pueblo llamado por Dios, reunido principalmente en Abiyán. Creemos que el plan de salvación de Dios se está cumpliendo hoy, según las promesas de Su Palabra. Los verdaderos creyentes reconocen su tiempo en la historia de la salvación, participan activamente en ella y se preparan para el regreso del Señor.",
          "Hemos oído el llamado, hemos salido y anunciamos a su vez: \"El Esposo viene, salid a recibirle.\" Guiados por el Espíritu Santo, vivimos sobriamente, mientras estamos listos cada día para Su regreso.",
          "Creemos que la promesa de Malaquías 4 se está cumpliendo en nuestra generación. El ministerio del Hermano William Marrion Branham fue predestinado como precursor del regreso de Cristo. A través de este mensaje, y a través del servicio fiel del ministerio actual, hemos vuelto a la Palabra y seguimos solo al Señor Jesucristo.",
          "\"¡Ven, Señor Jesús!\""
        ]
      }
    ],
    links: [
      {
        text: 'Contactez nous?',
        url: '../contact'
      },
      {
        text: 'Nos messages',
        url: '../books'
      }
    ]
  },
  {
    id: '5',
    entity: 'frank',
    translations: [
      {
        lang: 'fr',
        title: 'Enfance et premières étapes de la foi',
        description: [`Frère Ewald Frank est né le 24 décembre 1933, dans la région de la Prusse occidentale (aujourd'hui dans le nord de la Pologne). Il était le cinquième d'une famille de six enfants et a grandi dans un foyer profondément croyant. Vers la fin de la Seconde Guerre mondiale, la famille a dû fuir vers le nord de l'Allemagne, guidée par la volonté divine. Cette fuite a conduit la famille en l'Allemagne de l’Ouest, juste avant que les frontières ne soient fermées, ce qui marque déjà, dès son enfance, l’intervention de Dieu dans sa vie.`]
      },
      {
        lang: 'en',
        description: [""]
      },
      {
        lang: 'es',
        description: [""]
      }
    ],
    order: 1,
    isIntro: false,
    content: '',
    links: []
  },
  {
    id: '6',
    entity: 'frank',
    translations: [
      {
        lang: 'fr',
        title: 'Conversion et rencontre avec William Branham',
        description: [`À partir de 1947, frère Frank a participé activement à des évangélisations, notamment à Hambourg, où il a vécu sa conversion et a été baptisé en 1948. Il a également reçu le baptême du Saint-Esprit en 1949. En 1949, il a entendu parler pour la première fois de l'évangéliste William Branham et a été intrigué par les miracles et les guérisons rapportés lors de ses réunions. Ce désir de rencontrer William Branham s'est concrétisé en août 1955, lorsqu’il a assisté à des réunions à Karlsruhe, où il a été témoin de nombreux miracles, comme des aveugles guéris et des paralysés guéris sur le champ.`]
      },
      {
        lang: 'en',
        description: [""]
      },
      {
        lang: 'es',
        description: [""]
      }
    ],
    order: 2,
    isIntro: false,
    content: '',
    links: []
  },
  {
    id: '7',
    entity: 'frank',
    translations: [
      {
        lang: 'fr',
        title: 'Expérience spirituelle et appel divin',
        description: [`Frère Frank a eu une rencontre personnelle avec William Branham qui l’a profondément marqué. Ce dernier lui a révélé des détails personnels concernant sa vocation en tant que prédicateur de l’Évangile et a prophétisé qu’il retournerait en Allemagne avec un message spécial. À la suite de cette rencontre, frère Frank s’est réinstallé en Allemagne et a commencé à diffuser les sermons de Branham. Il a reçu son appel direct le 2 avril 1962, lorsqu’il a entendu une voix puissante lui annoncer que son temps dans sa ville était bientôt terminé, et qu'il allait être envoyé dans d’autres villes pour proclamer la parole de Dieu.`]
      },
      {
        lang: 'en',
        description: [""]
      },
      {
        lang: 'es',
        description: [""]
      }
    ],
    order: 3,
    isIntro: false,
    content: '',
    links: []
  },
  {
    id: '8',
    entity: 'frank',
    translations: [
      {
        lang: 'fr',
        title: "Confirmation de l'appel et expansion du ministère",
        description: [`Frère Frank a vu son appel divin se confirmer plusieurs fois, notamment lorsqu'il a entendu une voix audible du Seigneur lui donner des instructions précises. En 1976, il a reçu un message de Dieu le plaçant dans un rôle particulier, celui de distribuer la nourriture spirituelle, une mission en accord avec Matthieu 24:45-47. Après la disparition de frère Branham, frère Frank a commencé à tenir des réunions dans d'autres pays d’Europe et a rapidement étendu son ministère à plus de 170 pays à travers le monde.`]
      },
      {
        lang: 'en',
        description: [""]
      },
      {
        lang: 'es',
        description: [""]
      }
    ],
    order: 4,
    isIntro: false,
    content: '',
    links: []
  },
  {
    id: '9',
    entity: 'frank',
    translations: [
      {
        lang: 'fr',
        title: 'Engagement pour la Parole de Dieu et les années à Zürich',
        description: [`Frère Frank a toujours accordé une importance particulière à ses sermons mensuels à la maison Volkshaus de Zürich, un moment qu’il considérait comme essentiel pour nourrir spirituellement ses auditeurs. Parallèlement, il a traduit les sermons de Branham en allemand, écrit des lettres et des brochures bibliques, et s’est consacré entièrement à la diffusion de la parole de Dieu. Sa vie entière a été marquée par cette dévotion, avec la parole de Dieu occupant la première place dans ses priorités.`]
      },
      {
        lang: 'en',
        description: [""]
      },
      {
        lang: 'es',
        description: [""]
      }
    ],
    order: 5,
    isIntro: false,
    content: '',
    links: []
  },
  {
    id: '10',
    entity: 'frank',
    translations: [
      {
        lang: 'fr',
        title: "Derniers moments et départ vers l'éternité",
        description: [`Frère Frank avait espéré être témoin de l’accomplissement de l'Église et de l'achèvement de l'œuvre de Dieu, mais le Seigneur en a décidé autrement. Avant son départ le 23 mai 2024, il a partagé un témoignage avec des frères en visite, expliquant qu'il avait ressenti un grand soulagement après avoir entendu une parole rassurante du Seigneur : « Mon serviteur, ne t’inquiète pas, j’ai commencé mon œuvre et je la finirai victorieusement ». Ce fut la dernière expérience spirituelle significative de sa vie, une promesse de la victoire finale de l’œuvre de Dieu.`]
      },
      {
        lang: 'en',
        description: [""]
      },
      {
        lang: 'es',
        description: [""]
      }
    ],
    order: 6,
    isIntro: false,
    content: '',
    links: []
  },
  {
    id: '11',
    entity: 'frank',
    translations: [
      {
        lang: 'fr',
        title: 'Conclusion : Une vie consacrée à Dieu',
        description: [`Frère Frank est maintenant « rentré en paix », comme il l'a souhaité, et peut maintenant voir de ses propres yeux ce qu'il a cru pendant toute sa vie. Il a consacré son existence entière au service de Dieu et à la diffusion de son message. Son héritage spirituel continue à travers les nombreux croyants qu'il a touchés et le message qu'il a fidèlement transmis.`]
      },
      {
        lang: 'en',
        description: [""]
      },
      {
        lang: 'es',
        description: [""]
      }
    ],
    order: 7,
    isIntro: false,
    content: '',
    links: [
      {
        text: 'Qui sommes nous?',
        url: '../about/assemblee'
      },
      {
        text: 'Qui est William Marion Branham?',
        url: '../about/branham'
      }
    ]
  },
  {
    id: '2',
    entity: 'branham',
    mainImage: 'https://images.pexels.com/photos/15382618/pexels-photo-15382618.jpeg',
    order: 2,
    isIntro: false,
    translations: [
      {
        lang: 'fr',
        title: '',
        description: [
          "Le Nouveau Testament commence et se terminera avec l’accomplissement des prophéties bibliques, notamment la venue d’un messager précurseur comme Jean-Baptiste, qui a préparé le chemin du Christ. La promesse d’un second Élie, annoncée dans Malachie 4, reste encore à s’accomplir pleinement avant le « grand et redoutable jour du Seigneur ».",
          "Cette promesse s’est manifestée dans notre temps à travers le ministère de William Branham, reconnu comme un accomplissement du ministère d’Élie. Des événements surnaturels ont confirmé sa commission divine, notamment une lumière céleste visible en 1933 et 1950, attestée par des témoins et des experts.",
          "Face aux divisions et aux nombreuses confusions dans les églises modernes, ce ministère appelle à un retour aux enseignements originaux des apôtres et des prophètes, centrés sur Jésus-Christ, pierre angulaire de l’Église. La nourriture spirituelle est aujourd’hui distribuée fidèlement selon le temps fixé par Dieu.",
          "Nous vivons la dernière phase du plan du salut, où seuls les vrais croyants et élus reconnaissent la Parole de Dieu et son œuvre. Comme autrefois, les dirigeants religieux peuvent rejeter ces vérités, mais Dieu accomplit toujours ses promesses selon sa Parole."
        ]
      },
      {
        lang: 'en',
        title: '',
        description: [
          "The New Testament begins and will conclude with the fulfillment of biblical prophecies, notably the coming of a forerunner messenger like John the Baptist, who prepared the way for Christ. The promise of a second Elijah, foretold in Malachi 4, is yet to be fully fulfilled before the 'great and dreadful day of the Lord.'",
          "This promise was manifested in our time through the ministry of William Branham, recognized as a fulfillment of Elijah’s ministry. Supernatural events confirmed his divine commission, including a visible heavenly light in 1933 and 1950, witnessed and verified by experts and observers.",
          "In the face of divisions and great confusion in modern churches, this ministry calls for a return to the original teachings of the apostles and prophets, centered on Jesus Christ, the cornerstone of the Church. Spiritual food is now being faithfully distributed according to God’s appointed time.",
          "We are living in the final phase of the plan of salvation, where only true believers and the elect recognize the Word of God and His work. As in times past, religious leaders may reject these truths, but God always fulfills His promises according to His Word."
        ]
      },
      {
        lang: 'es',
        title: '',
        description: [
          "El Nuevo Testamento comienza y terminará con el cumplimiento de las profecías bíblicas, especialmente con la venida de un mensajero precursor como Juan el Bautista, quien preparó el camino del Cristo. La promesa de un segundo Elías, anunciada en Malaquías 4, aún debe cumplirse plenamente antes del «gran y terrible día del Señor».",
          "Esa promesa se manifestó en nuestro tiempo a través del ministerio de William Branham, reconocido como un cumplimiento del ministerio de Elías. Eventos sobrenaturales confirmaron su comisión divina, incluida una luz celestial visible en 1933 y 1950, atestiguada por testigos y expertos.",
          "Ante las divisiones y confusiones en muchas iglesias modernas, este ministerio llama a un regreso a las enseñanzas originales de los apóstoles y profetas, centradas en Jesucristo, la piedra angular de la Iglesia. El alimento espiritual está siendo distribuido fielmente hoy conforme al tiempo establecido por Dios.",
          "Estamos viviendo la última fase del plan de salvación, en la cual solo los verdaderos creyentes y escogidos reconocen la Palabra de Dios y Su obra. Como en tiempos antiguos, los líderes religiosos pueden rechazar estas verdades, pero Dios siempre cumple Sus promesas conforme a Su Palabra."
        ]
      }
    ],
    links: [
      { text: 'Qui sommes nous?', url: '../about/assemblee' },
      { text: 'Qui est Edward Frank?', url: '../about/frank' }
    ]
  },
];

export const mockAdminAboutDetails = [
  {
    id: '1',
    sectionId: '1',
    translations: [
      {
        lang: 'fr',
        title: 'Nos Débuts',
        description: 'L\'histoire de notre assemblée commence avec la vision de Dieu pour Son peuple, un peuple appelé à sortir et à se rassembler dans la vérité de Sa Parole.'
      },
      {
        lang: 'en',
        title: 'Our Beginnings',
        description: 'The history of our assembly begins with God\'s vision for His people, a people called to come out and gather in the truth of His Word.'
      },
      {
        lang: 'es',
        title: 'Nuestros Comienzos',
        description: 'La historia de nuestra asamblea comienza con la visión de Dios para Su pueblo, un pueblo llamado a salir y reunirse en la verdad de Su Palabra.'
      }
    ],
    order: 0
  },
  {
    id: '2',
    sectionId: '1',
    translations: [
      {
        lang: 'fr',
        title: 'Notre Mission',
        description: 'Notre mission est de proclamer l\'Évangile de Jésus-Christ, de préparer le chemin pour Son retour et de nourrir spirituellement les croyants.'
      },
      {
        lang: 'en',
        title: 'Our Mission',
        description: 'Our mission is to proclaim the Gospel of Jesus Christ, prepare the way for His return, and spiritually nourish believers.'
      },
      {
        lang: 'es',
        title: 'Nuestra Misión',
        description: 'Nuestra misión es proclamar el Evangelio de Jesucristo, preparar el camino para Su regreso y nutrir espiritualmente a los creyentes.'
      }
    ],
    order: 1
  }
];

export const mockAdminEntities : Entity[] = [
  {
    id: "f1012f1e-a09e-49d7-a2d1-90be962a1a1c",
    globalTitle: "Marcher dans la lumière",
    categories: ["Sermon"],
    tagIds: ["1", "4"],
    sermonMetadata: {
      id: "f1012f1e-a09e-49d7-a2d1-90be962a1a1c",
      preacher: "Pasteur Léa Dubois",
      preachedAt: new Date("2025-04-14T10:00:00Z"),
      location: "Église Lumière de Paris"
    }
  },
  {
    id: "7c3eec26-0c02-4a8b-86a3-61f9bca37062",
    globalTitle: "Réveil spirituel 2025",
    categories: ["Événement", "Livre"],
    tagIds: ["3", "2"],
    bookMetadata: {
      id: "7c3eec26-0c02-4a8b-86a3-61f9bca37062",
      author: "Marie Giraud",
      publishAt: new Date("2025-10-14T10:00:00Z"),
    },
    eventMetadata: {
      id: "7c3eec26-0c02-4a8b-86a3-61f9bca37062",
      type: "CONFERENCE",
      startTime: new Date("2025-08-20T18:00:00Z"),
      endTime: new Date("2025-08-23T20:00:00Z"),
      location: "Palais des Congrès, Lyon"
    }
  },
  {
    id: "a4b2c6dd-5e2e-4f13-9e34-6c4d14f5b77b",
    globalTitle: "Les paraboles de Jésus expliquées",
    categories: ["Livre"],
    tagIds: ["5", "2"],
    bookMetadata: {
      id: "a4b2c6dd-5e2e-4f13-9e34-6c4d14f5b77b",
      author: "David N'Guessan",
      publishAt: new Date("2025-02-14T10:00:00Z")
    }
  }
];

export const mockAdminMediaVersions: MediaVersion[] = [
  {
    id: "mv-001-fr",
    documentId: "f1012f1e-a09e-49d7-a2d1-90be962a1a1c",
    languageId: "fr",
    title: "Marcher dans la lumière",
    description: "Un sermon inspirant sur la foi et la marche quotidienne avec Dieu.",
    publishedAt: new Date("2025-04-15T09:00:00Z")
  },
    {
    id: "mv-002-en",
    documentId: "a4b2c6dd-5e2e-4f13-9e34-6c4d14f5b77b",
    languageId: "en",
    title: "The Parables of Jesus Explained",
    description: "A clear and insightful look at the parables and their relevance today.",
    publishedAt: new Date("2025-05-10T12:30:00Z")
  },
  {
    id: "mv-003-es",
    documentId: "7c3eec26-0c02-4a8b-86a3-61f9bca37062",
    languageId: "es",
    title: "Despertar espiritual 2025",
    description: "Una conferencia transformadora para toda la comunidad de fe.",
    publishedAt: new Date("2025-06-01T14:00:00Z")
  },
  {
    id: "mv-004-de",
    documentId: "f1012f1e-a09e-49d7-a2d1-90be962a1a1c",
    languageId: "de",
    title: "Im Licht wandeln",
    description: "Eine Predigt über das Leben im Licht Gottes und die tägliche Nachfolge.",
    publishedAt: new Date("2025-04-18T10:00:00Z")
  },
  {
    id: "mv-005-pt",
    documentId: "a4b2c6dd-5e2e-4f13-9e34-6c4d14f5b77b",
    languageId: "pt",
    title: "As Parábolas de Jesus Explicadas",
    description: "Uma abordagem acessível às parábolas bíblicas e seu significado espiritual.",
    publishedAt: new Date("2025-05-15T16:00:00Z")
  }
]

export const mockAdminMediaSupport: MediaSupport[] = [
  {
    id: '1',
    documentVersionId: "mv-001-fr",
    mediaType: MediaType.TEXT,
    url: "",
    title: "Texte en français"
  },
  {
    id: '2',
    documentVersionId: "mv-002-en",
    mediaType: MediaType.AUDIO,
    url: "",
    title: "Lecture audio"
  },
  {
    id: '3',
    documentVersionId: "mv-002-en",
    mediaType: MediaType.VIDEO,
    url: "https://www.youtube.com/embed/4y3n3IdH0rY?si=81PKWo467a9L84Hd",
    title: "Vidéo YouTube"
  }
]

export const mockAdminLanguages: Language[] = [
  {
    id: "fr",
    title: "Français",
    type: LanguageType.INTERNATIONAL,
  },
  {
    id: "en",
    title: "English",
    type: LanguageType.INTERNATIONAL,
  },
  {
    id: "es",
    title: "Español",
    type: LanguageType.INTERNATIONAL,
  },
  {
    id: "pt",
    title: "Português",
    type: LanguageType.INTERNATIONAL,
  },
]















