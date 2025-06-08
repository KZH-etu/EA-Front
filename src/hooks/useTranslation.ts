import { useLanguageStore } from '../stores/useFrontEndLanguageStore';

interface NavTranslation {
  home: string,
  about: string,
  sermons: string,
  audioSermons: string,
  videoSermons: string,
  books: string,
  events: string,
  contact: string,
  webradio: string,
  webtv: string
}

interface TranslationInformation {

}

interface TabsTranslation {
  nav: NavTranslation,
  home: TranslationInformation,
  footer: TranslationInformation,
  about: TranslationInformation,
  events: TranslationInformation,
  common: TranslationInformation,
  books: TranslationInformation,
  sermons: TranslationInformation,
  contact: TranslationInformation,
  webradio: TranslationInformation,
  webtv: TranslationInformation
}

interface TranslationInterface {
  fr: TabsTranslation,
  en: TabsTranslation,
  es: TabsTranslation,
}

const translations : TranslationInterface = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      sermons: 'Sermons',
      audioSermons: 'Sermons Audio',
      videoSermons: 'Sermons Vidéo',
      books: 'Livres',
      events: 'Événements',
      contact: 'Contact',
      webradio: 'WebRadio',
      webtv: 'WebTV'
    },
    home: {
      hero: {
        title: "Celles qui étaient prêtes entrèrent avec Lui dans la salle des noces",
        subtitle: 'Et la porte fut fermée.',
        discoverSermons: 'Découvrir Nos Sermons'
      },
      mission: {
        title: 'Notre Mission',
        description1: 'L\'Assemblée d\'Abidjan est dédiée à la proclamation fidèle de la Parole de Dieu. Notre mission est d\'édifier les croyants dans la foi, de partager le message du salut et d\'être une lumière dans ce monde en perdition.',
        description2: 'Nous croyons en l\'enseignement authentique des Écritures et nous nous efforçons de vivre selon les principes bibliques de foi, d\'amour, en attendant patiemment le retour du Seigneur Jésus-Christ.',
        discoverHistory: 'Découvrir Notre Histoire',
        imageAlt: 'Assemblée d\'Abidjan',
        quote: '"La foi vient de ce qu\'on entend, et ce qu\'on entend vient de la parole de Dieu."',
        quoteRef: 'Romains 10:17'
      },
      videoSermons: {
        title: 'Nos Derniers Sermons Vidéo',
        subtitle: 'Regardez nos derniers messages vidéo et soyez édifiés par la Parole de Dieu.',
        seeAll: 'Voir Tous Les Sermons Vidéo'
      },
      audioSermons: {
        title: 'Nos Derniers Sermons Audio',
        subtitle: 'Écoutez nos derniers messages audio et soyez édifiés par la Parole de Dieu.',
        seeAll: 'Voir Tous Les Sermons Audio'
      },
      events: {
        title: 'Événements à Venir',
        subtitle: 'Rejoignez-nous pour nos prochains événements et activités.',
        seeAll: 'Voir Tous Les Événements'
      },
      media: {
        title: 'Nos Médias',
        subtitle: 'Accédez à nos ressources médias pour nourrir votre foi.',
        webradioDescription: 'Écoutez notre radio en direct avec des enseignements spirituels 24h/24.',
        webtvDescription: 'Regardez nos diffusions vidéo en direct et nos émissions spéciales.',
        booksTitle: 'Livres & Brochures',
        booksDescription: 'Téléchargez gratuitement nos publications spirituelles.',
        listenNow: 'Écouter Maintenant',
        watchNow: 'Regarder Maintenant',
        download: 'Télécharger'
      },
      newsletter: {
        title: 'Restez Informé',
        subtitle: 'Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles et mises à jour.',
        emailPlaceholder: 'Votre adresse email',
        subscribe: 'S\'abonner',
        privacyNotice: 'Nous respectons votre vie privée. Vous pouvez vous désabonner à tout moment.'
      }
    },
    footer: {
      about: 'L\'Eglise d\'Abidjan est une assemblée locale dédiée à la proclamation de la Parole de Dieu et à l\'édification spirituelle des saints.',
      quickLinks: 'Liens Rapides',
      contact: 'Contact',
      newsletter: 'Newsletter',
      subscribeNewsletter: 'Abonnez-vous pour recevoir nos dernières nouvelles et mises à jour.',
      emailPlaceholder: 'Votre adresse email',
      subscribe: 'S\'abonner',
      allRightsReserved: 'Tous droits réservés'
    },
    about: {
      subtitle: 'Découvrez notre histoire et notre héritage spirituel',
      listenMessages: 'Écouter Ses Messages',
      discoverMessage: 'Découvrir Son Message'
    },
    events: {
      subtitle: 'Rejoignez-nous pour nos prochains événements'
    },
    common: {
      preacher: 'Prédicateur',
      readMore: 'En Savoir Plus',
      download: 'Télécharger',
      readOnline: 'Lire en ligne',
      listen: 'Écouter',
      watch: 'Regarder',
      seeAll: 'Voir tout',
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      search: 'Rechercher',
      filters: 'Filtres',
      language: 'Langue',
      categories: 'Catégories',
      tags: 'Tags',
      date: 'Date',
      author: 'Auteur',
      location: 'Lieu',
      sectionImage: 'Image de la section'
    },
    books: {
      subtitle: 'Découvrez notre collection de livres et brochures',
      backToLibrary: 'Retour à la bibliothèque',
      description: 'Description',
      availableLanguages: 'Langues disponibles',
      otherBooksByAuthor: 'Autres livres de',
      booksWithTag: 'Livres sur le thème',
      notFound: 'Livre non trouvé',
      allCategories: 'Toutes les catégories',
      books: 'Livres',
      brochures: 'Brochures',
      sermonTranscripts: 'Retranscriptions de Sermons',
      allAuthors: 'Tous les auteurs',
      allLanguages: 'Toutes les langues',
      allLocations: 'Tous les lieux',
      fromYear: 'Depuis...',
      toYear: 'Jusqu\'à...',
      selectTags: 'Sélectionner des tags',
      foundResults: 'livre(s) trouvé(s)',
      noResults: 'Aucun livre ne correspond à vos critères de recherche.',
      itemsPerPage: 'Afficher par page :',
      categories: {
        book: 'Livre',
        brochure: 'Brochure',
        sermon: 'Sermon'
      }
    },
    sermons: {
      audio: {
        title: 'Sermons Audio',
        subtitle: 'Écoutez et téléchargez nos messages pour votre édification spirituelle',
        allPreachers: 'Tous les prédicateurs',
        allLanguages: 'Toutes les langues',
        allLocations: 'Tous les lieux',
        fromYear: 'Depuis...',
        toYear: 'Jusqu\'à...',
        selectTags: 'Sélectionner des tags',
        foundResults: 'sermon(s) trouvé(s)',
        noResults: 'Aucun sermon ne correspond à vos critères de recherche.'
      },
      video: {
        title: 'Sermons Vidéo',
        subtitle: 'Regardez nos messages vidéo pour votre édification spirituelle',
        views: 'vues'
      },
      allPreachers: 'Tous les prédicateurs',
      allLanguages: 'Toutes les langues',
      allLocations: 'Tous les lieux',
      fromYear: 'Depuis...',
      toYear: 'Jusqu\'à...',
      selectTags: 'Sélectionner des tags',
      foundResults: 'sermon(s) trouvé(s)',
      noResults: 'Aucun sermon ne correspond à vos critères de recherche.'
    },
    contact: {
      subtitle: 'Contactez-nous pour toute question ou assistance',
      getInTouch: 'Contactez-nous',
      description: 'Nous serions ravis d\'avoir de vos nouvelles. N\'hésitez pas à nous contacter en utilisant l\'une des méthodes ci-dessous ou en remplissant le formulaire de contact.',
      form: {
        name: 'Nom',
        email: 'Email',
        subject: 'Sujet',
        message: 'Message',
        send: 'Envoyer le message'
      }
    },
    webradio: {
      subtitle: "Écoutez notre radio en direct 24h/24",
      titleCard: "Radio en Direct",
      descriptionCard: "Diffusion de messages spirituels, musiques d'adoration et enseignements bibliques",
      schedule: {
        title: "Programme de la Semaine",
        scheduleInfo: [
          { day: 'Lundi', content: 'Messages d\'enseignement (10h-12h) • Musique d\'adoration (14h-16h)' },
          { day: 'Mardi', content: 'Étude biblique en direct (19h-21h) • Rediffusion des sermons (14h-16h)' },
          { day: 'Mercredi', content: 'Prière et intercession (18h-20h) • Messages choisis (14h-16h)' },
          { day: 'Jeudi', content: 'Témoignages et partages (15h-17h) • Musique d\'adoration (19h-21h)' },
          { day: 'Vendredi', content: 'Messages prophétiques (10h-12h) • Étude biblique (19h-21h)' },
          { day: 'Samedi', content: 'Programme jeunesse (14h-16h) • Messages d\'édification (18h-20h)' },
          { day: 'Dimanche', content: 'Culte en direct (9h30-12h) • Rediffusion (15h-17h30)' },
        ]
      }
    },
    webtv: {
      subtitle: "Regardez nos diffusions en direct et nos émissions",
      titleCard: "Diffusion en Direct",
      descriptionCard: "Suivez nos cultes, enseignements et événements spéciaux en direct",
      statusLiveNull: "Vérification du live en cours...",
      statusLiveFalse: "Le live n'est pas encore commencé.",
      schedule: {
        title: "Programme des Diffusions",
        scheduleInfo: [
          { day: 'Lundi', content: 'Messages d\'enseignement (10h-12h) • Musique d\'adoration (14h-16h)' },
          { day: 'Mardi', content: 'Étude biblique en direct (19h-21h) • Rediffusion des sermons (14h-16h)' },
          { day: 'Mercredi', content: 'Prière et intercession (18h-20h) • Messages choisis (14h-16h)' },
          { day: 'Jeudi', content: 'Témoignages et partages (15h-17h) • Musique d\'adoration (19h-21h)' },
          { day: 'Vendredi', content: 'Messages prophétiques (10h-12h) • Étude biblique (19h-21h)' },
          { day: 'Samedi', content: 'Programme jeunesse (14h-16h) • Messages d\'édification (18h-20h)' },
          { day: 'Dimanche', content: 'Culte en direct (9h30-12h) • Rediffusion (15h-17h30)' },
        ]
      },
      specialEvent: {
        title: 'Prochaines Émissions Spéciales'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      sermons: 'Sermons',
      audioSermons: 'Audio Sermons',
      videoSermons: 'Video Sermons',
      books: 'Books',
      events: 'Events',
      contact: 'Contact',
      webradio: 'WebRadio',
      webtv: 'WebTV'
    },
    home: {
      hero: {
        title: 'The virgins who were ready went in with him to the wedding banquet.',
        subtitle: 'and the door was shut.',
        discoverSermons: 'Discover Our Sermons'
      },
      mission: {
        title: 'Our Mission',
        description1: 'The Assembly of Abidjan is dedicated to the faithful proclamation of God\'s Word. Our mission is to edify believers in faith, share the message of salvation, and be a light in our community.',
        description2: 'We believe in the authentic teaching of Scripture and strive to live according to biblical principles of faith, love, and service.',
        discoverHistory: 'Discover Our History',
        imageAlt: 'Assembly of Abidjan',
        quote: '"Faith comes by hearing, and hearing by the word of God."',
        quoteRef: 'Romans 10:17'
      },
      videoSermons: {
        title: 'Our Latest Video Sermons',
        subtitle: 'Watch our latest video messages and be edified by God\'s Word.',
        seeAll: 'See All Video Sermons'
      },
      audioSermons: {
        title: 'Our Latest Audio Sermons',
        subtitle: 'Listen to our latest audio messages and be edified by God\'s Word.',
        seeAll: 'See All Audio Sermons'
      },
      events: {
        title: 'Upcoming Events',
        subtitle: 'Join us for our upcoming events and activities.',
        seeAll: 'See All Events'
      },
      media: {
        title: 'Our Media',
        subtitle: 'Access our media resources to nourish your faith.',
        webradioDescription: 'Listen to our live radio with spiritual teachings 24/7.',
        webtvDescription: 'Watch our live broadcasts and special programs.',
        booksTitle: 'Books & Brochures',
        booksDescription: 'Download our spiritual publications for free.',
        listenNow: 'Listen Now',
        watchNow: 'Watch Now',
        download: 'Download'
      },
      newsletter: {
        title: 'Stay Informed',
        subtitle: 'Subscribe to our newsletter to receive the latest news and updates.',
        emailPlaceholder: 'Your email address',
        subscribe: 'Subscribe',
        privacyNotice: 'We respect your privacy. You can unsubscribe at any time.'
      }
    },
    footer: {
      about: 'The Assembly of Abidjan is a church dedicated to proclaiming God\'s Word and spiritual edification of its members.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      newsletter: 'Newsletter',
      subscribeNewsletter: 'Subscribe to receive our latest news and updates.',
      emailPlaceholder: 'Your email address',
      subscribe: 'Subscribe',
      allRightsReserved: 'All rights reserved'
    },
    about: {
      subtitle: 'Discover our history and spiritual heritage',
      listenMessages: 'Listen to His Messages',
      discoverMessage: 'Discover His Message'
    },
    events: {
      subtitle: 'Join us for our upcoming events'
    },
    common: {
      preacher: 'Preacher',
      readMore: 'Read More',
      download: 'Download',
      readOnline: 'Read online',
      listen: 'Listen',
      watch: 'Watch',
      seeAll: 'See all',
      loading: 'Loading...',
      error: 'An error occurred',
      search: 'Search',
      filters: 'Filters',
      language: 'Language',
      categories: 'Categories',
      tags: 'Tags',
      date: 'Date',
      author: 'Author',
      location: 'Location',
      sectionImage: 'Section image'
    },
    books: {
      subtitle: 'Discover our collection of books and brochures',
      backToLibrary: 'Back to library',
      description: 'Description',
      availableLanguages: 'Available languages',
      otherBooksByAuthor: 'Other books by',
      booksWithTag: 'Books about',
      notFound: 'Book not found',
      allCategories: 'All categories',
      books: 'Books',
      brochures: 'Brochures',
      sermonTranscripts: 'Sermon Transcripts',
      allAuthors: 'All authors',
      allLanguages: 'All languages',
      allLocations: 'All locations',
      fromYear: 'From...',
      toYear: 'To...',
      selectTags: 'Select tags',
      foundResults: 'book(s) found',
      noResults: 'No books match your search criteria.',
      itemsPerPage: 'Items per page:',
      categories: {
        book: 'Book',
        brochure: 'Brochure',
        sermon: 'Sermon'
      }
    },
    sermons: {
      audio: {
        title: 'Audio Sermons',
        subtitle: 'Listen and download our messages for your spiritual edification',
        allPreachers: 'All preachers',
        allLanguages: 'All languages',
        allLocations: 'All locations',
        fromYear: 'From...',
        toYear: 'To...',
        selectTags: 'Select tags',
        foundResults: 'sermon(s) found',
        noResults: 'No sermons match your search criteria.'
      },
      video: {
        title: 'Video Sermons',
        subtitle: 'Watch our video messages for your spiritual edification',
        Views: 'views'
      },
      allPreachers: 'All preachers',
      allLanguages: 'All languages',
      allLocations: 'All locations',
      fromYear: 'From...',
      toYear: 'To...',
      selectTags: 'Select tags',
      foundResults: 'sermon(s) found',
      noResults: 'No sermons match your search criteria.'
    },
    contact: {
      subtitle: 'Contact us for any inquiries or assistance',
      getInTouch: 'Get in Touch',
      description: 'We\'d love to hear from you. Please feel free to contact us using any of the methods below or fill out the contact form.',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message'
      }
    },
    webradio: {
      subtitle: "Listen to our live radio 24/7",
      titleCard: "Live Radio",
      descriptionCard: "Broadcasting spiritual messages, worship music, and biblical teachings",
      schedule: {
        title: "Weekly Program",
        scheduleInfo: [
          { day: 'Monday', content: 'Teaching messages (10am-12pm) • Worship music (2pm-4pm)' },
          { day: 'Tuesday', content: 'Live Bible study (7pm-9pm) • Sermon replays (2pm-4pm)' },
          { day: 'Wednesday', content: 'Prayer and intercession (6pm-8pm) • Selected messages (2pm-4pm)' },
          { day: 'Thursday', content: 'Testimonies and sharing (3pm-5pm) • Worship music (7pm-9pm)' },
          { day: 'Friday', content: 'Prophetic messages (10am-12pm) • Bible study (7pm-9pm)' },
          { day: 'Saturday', content: 'Youth program (2pm-4pm) • Edifying messages (6pm-8pm)' },
          { day: 'Sunday', content: 'Live service (9:30am-12pm) • Replay (3pm-5:30pm)' },
        ]
      }
    },
    webtv: {
      subtitle: "Écoutez notre radio en direct 24h/24",
      titleCard: "Radio en Direct",
      descriptionCard: "Diffusion de messages spirituels, musiques d'adoration et enseignements bibliques",
      schedule: {
        title: "Programme de la Semaine",
        scheduleInfo: [
          { day: 'Lundi', content: 'Messages d\'enseignement (10h-12h) • Musique d\'adoration (14h-16h)' },
          { day: 'Mardi', content: 'Étude biblique en direct (19h-21h) • Rediffusion des sermons (14h-16h)' },
          { day: 'Mercredi', content: 'Prière et intercession (18h-20h) • Messages choisis (14h-16h)' },
          { day: 'Jeudi', content: 'Témoignages et partages (15h-17h) • Musique d\'adoration (19h-21h)' },
          { day: 'Vendredi', content: 'Messages prophétiques (10h-12h) • Étude biblique (19h-21h)' },
          { day: 'Samedi', content: 'Programme jeunesse (14h-16h) • Messages d\'édification (18h-20h)' },
          { day: 'Dimanche', content: 'Culte en direct (9h30-12h) • Rediffusion (15h-17h30)' },
        ]
      }
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      sermons: 'Sermones',
      audioSermons: 'Sermones de Audio',
      videoSermons: 'Sermones en Video',
      books: 'Libros',
      events: 'Eventos',
      contact: 'Contacto',
      webradio: 'WebRadio',
      webtv: 'WebTV'
    },
    home: {
      hero: {
        title: 'Y las que estaban preparadas entraron con él a las bodas,',
        subtitle: 'Y se cerró la puerta.',
        discoverSermons: 'Descubre Nuestros Sermones'
      },
      mission: {
        title: 'Nuestra Misión',
        description1: 'La Asamblea de Abiyán está dedicada a la proclamación fiel de la Palabra de Dios. Nuestra misión es edificar a los creyentes en la fe, compartir el mensaje de salvación y ser una luz en nuestra comunidad.',
        description2: 'Creemos en la enseñanza auténtica de las Escrituras y nos esforzamos por vivir según los principios bíblicos de fe, amor y servicio.',
        discoverHistory: 'Descubre Nuestra Historia',
        imageAlt: 'Asamblea de Abiyán',
        quote: '"La fe viene por el oír, y el oír por la palabra de Dios."',
        quoteRef: 'Romanos 10:17'
      },
      videoSermons: {
        title: 'Nuestros Últimos Sermones en Video',
        subtitle: 'Mira nuestros últimos mensajes en video y sé edificado por la Palabra de Dios.',
        seeAll: 'Ver Todos los Sermones en Video'
      },
      audioSermons: {
        title: 'Nuestros Últimos Sermones de Audio',
        subtitle: 'Escucha nuestros últimos mensajes de audio y sé edificado por la Palabra de Dios.',
        seeAll: 'Ver Todos los Sermones de Audio'
      },
      events: {
        title: 'Próximos Eventos',
        subtitle: 'Únete a nosotros en nuestros próximos eventos y actividades.',
        seeAll: 'Ver Todos los Eventos'
      },
      media: {
        title: 'Nuestros Medios',
        subtitle: 'Accede a nuestros recursos multimedia para nutrir tu fe.',
        webradioDescription: 'Escucha nuestra radio en vivo con enseñanzas espirituales 24/7.',
        webtvDescription: 'Mira nuestras transmisiones en vivo y programas especiales.',
        booksTitle: 'Libros y Folletos',
        booksDescription: 'Descarga nuestras publicaciones espirituales gratis.',
        listenNow: 'Escuchar Ahora',
        watchNow: 'Ver Ahora',
        download: 'Descargar'
      },
      newsletter: {
        title: 'Mantente Informado',
        subtitle: 'Suscríbete a nuestro boletín para recibir las últimas noticias y actualizaciones.',
        emailPlaceholder: 'Tu dirección de correo electrónico',
        subscribe: 'Suscribirse',
        privacyNotice: 'Respetamos tu privacidad. Puedes darte de baja en cualquier momento.'
      }
    },
    footer: {
      about: 'La Asamblea de Abiyán es una iglesia dedicada a la proclamación de la Palabra de Dios y la edificación espiritual de sus miembros.',
      quickLinks: 'Enlaces Rápidos',
      contact: 'Contacto',
      newsletter: 'Boletín',
      subscribeNewsletter: 'Suscríbase para recibir nuestras últimas noticias y actualizaciones.',
      emailPlaceholder: 'Su dirección de correo electrónico',
      subscribe: 'Suscribirse',
      allRightsReserved: 'Todos los derechos reservados'
    },
    about: {
      subtitle: 'Descubra nuestra historia y herencia espiritual',
      listenMessages: 'Escuchar Sus Mensajes',
      discoverMessage: 'Descubrir Su Mensaje'
    },
    events: {
      subtitle: 'Únase a nosotros en nuestros próximos eventos'
    },
    common: {
      preacher: 'Predicador',
      readMore: 'Leer Más',
      download: 'Descargar',
      readOnline: 'Leer en línea',
      listen: 'Escuchar',
      watch: 'Ver',
      seeAll: 'Ver todo',
      loading: 'Cargando...',
      error: 'Se produjo un error',
      search: 'Buscar',
      filters: 'Filtros',
      language: 'Idioma',
      categories: 'Categorías',
      tags: 'Etiquetas',
      date: 'Fecha',
      author: 'Autor',
      location: 'Ubicación',
      sectionImage: 'Imagen de la sección'
    },
    books: {
      subtitle: 'Descubra nuestra colección de libros y folletos',
      backToLibrary: 'Volver a la biblioteca',
      description: 'Descripción',
      availableLanguages: 'Idiomas disponibles',
      otherBooksByAuthor: 'Otros libros de',
      booksWithTag: 'Libros sobre',
      notFound: 'Libro no encontrado',
      allCategories: 'Todas las categorías',
      books: 'Libros',
      brochures: 'Folletos',
      sermonTranscripts: 'Transcripciones de Sermones',
      allAuthors: 'Todos los autores',
      allLanguages: 'Todos los idiomas',
      allLocations: 'Todas las ubicaciones',
      fromYear: 'Desde...',
      toYear: 'Hasta...',
      selectTags: 'Seleccionar etiquetas',
      foundResults: 'libro(s) encontrado(s)',
      noResults: 'Ningún libro coincide con sus criterios de búsqueda.',
      itemsPerPage: 'Elementos por página:',
      categories: {
        book: 'Libro',
        brochure: 'Folleto',
        sermon: 'Sermón'
      }
    },
    sermons: {
      audio: {
        title: 'Sermones de Audio',
        subtitle: 'Escuche y descargue nuestros mensajes para su edificación espiritual',
        allPreachers: 'Todos los predicadores',
        allLanguages: 'Todos los idiomas',
        allLocations: 'Todas las ubicaciones',
        fromYear: 'Desde...',
        toYear: 'Hasta...',
        selectTags: 'Seleccionar etiquetas',
        foundResults: 'sermón(es) encontrado(s)',
        noResults: 'Ningún sermón coincide con sus criterios de búsqueda.'
      },
      video: {
        title: 'Sermones en Video',
        subtitle: 'Vea nuestros mensajes en video para su edificación espiritual',
        views: 'vistas'
      },
      allPreachers: 'Todos los predicadores',
      allLanguages: 'Todos los idiomas',
      allLocations: 'Todas las ubicaciones',
      fromYear: 'Desde...',
      toYear: 'Hasta...',
      selectTags: 'Seleccionar etiquetas',
      foundResults: 'sermón(es) encontrado(s)',
      noResults: 'Ningún sermón coincide con sus criterios de búsqueda.'
    },
    contact: {
      subtitle: 'Contáctenos para cualquier consulta o asistencia',
      getInTouch: 'Póngase en Contacto',
      description: 'Nos encantaría saber de usted. No dude en contactarnos utilizando cualquiera de los métodos a continuación o completando el formulario de contacto.',
      form: {
        name: 'Nombre',
        email: 'Correo electrónico',
        subject: 'Asunto',
        message: 'Mensaje',
        send: 'Enviar Mensaje'
      }
    },
    webradio: {
      subtitle: "Escucha nuestra radio en vivo las 24 horas del día",
      titleCard: "Radio en Vivo",
      descriptionCard: "Transmisión de mensajes espirituales, música de adoración y enseñanzas bíblicas",
      schedule: {
        title: "Programa Semanal",
        scheduleInfo: [
          { day: 'Lunes', content: 'Mensajes de enseñanza (10h-12h) • Música de adoración (14h-16h)' },
          { day: 'Martes', content: 'Estudio bíblico en vivo (19h-21h) • Repetición de sermones (14h-16h)' },
          { day: 'Miércoles', content: 'Oración e intercesión (18h-20h) • Mensajes seleccionados (14h-16h)' },
          { day: 'Jueves', content: 'Testimonios y compartires (15h-17h) • Música de adoración (19h-21h)' },
          { day: 'Viernes', content: 'Mensajes proféticos (10h-12h) • Estudio bíblico (19h-21h)' },
          { day: 'Sábado', content: 'Programa juvenil (14h-16h) • Mensajes edificantes (18h-20h)' },
          { day: 'Domingo', content: 'Culto en vivo (9:30h-12h) • Repetición (15h-17:30h)' },
        ]
      }
    },
    webtv: {
      subtitle: "Écoutez notre radio en direct 24h/24",
      titleCard: "Radio en Direct",
      descriptionCard: "Diffusion de messages spirituels, musiques d'adoration et enseignements bibliques",
      schedule: {
        title: "Programme de la Semaine",
        scheduleInfo: [
          { day: 'Lundi', content: 'Messages d\'enseignement (10h-12h) • Musique d\'adoration (14h-16h)' },
          { day: 'Mardi', content: 'Étude biblique en direct (19h-21h) • Rediffusion des sermons (14h-16h)' },
          { day: 'Mercredi', content: 'Prière et intercession (18h-20h) • Messages choisis (14h-16h)' },
          { day: 'Jeudi', content: 'Témoignages et partages (15h-17h) • Musique d\'adoration (19h-21h)' },
          { day: 'Vendredi', content: 'Messages prophétiques (10h-12h) • Étude biblique (19h-21h)' },
          { day: 'Samedi', content: 'Programme jeunesse (14h-16h) • Messages d\'édification (18h-20h)' },
          { day: 'Dimanche', content: 'Culte en direct (9h30-12h) • Rediffusion (15h-17h30)' },
        ]
      }
    }
  }
};

export const useTranslation = () => {
  const { currentLanguage } = useLanguageStore();

  const t = (key: string) => {
    const keys = key.split('.');
    
    // Try to get translation from current language
    let value = translations[currentLanguage];
    for (const k of keys) {
      if (!value || typeof value !== 'object') {
        break;
      }
      value = value[k];
    }

    // If translation not found in current language, try French fallback
    if (value === undefined || typeof value === 'object') {
      value = translations.fr;
      for (const k of keys) {
        if (!value || typeof value !== 'object') {
          break;
        }
        value = value[k];
      }
    }

    // If still not found or is an object, return the key
    if (value === undefined || typeof value === 'object') {
      return key;
    }

    return value;
  };

  return { t };
};