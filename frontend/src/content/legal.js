// Legal texts for ARTI CONNECT (source: Mentions_legales_ARTI_CONNECT.docx, CGV_ARTI_CONNECT_LLC_COURTES.docx).
// Each section: { title, paragraphs: [string], lines?: [string] } — `lines` renders as an address-style block.

const COMPANY_LINES = {
  fr: [
    'ARTI CONNECT',
    "Société à responsabilité limitée constituée dans l'État du Wyoming, États-Unis d'Amérique",
    'EIN : 98-1944648',
    'Siège : 30 N Gould St Ste R, Sheridan, WY 82801, USA',
    'Site internet : reseauxartizano.com',
    'E-mail : contact@reseauxartizano.com',
  ],
  en: [
    'ARTI CONNECT',
    'Limited liability company organized in the State of Wyoming, United States of America',
    'EIN: 98-1944648',
    'Registered office: 30 N Gould St Ste R, Sheridan, WY 82801, USA',
    'Website: reseauxartizano.com',
    'Email: contact@reseauxartizano.com',
  ],
};

export const LEGAL_CONTENT = {
  mentions: {
    fr: {
      title: 'Mentions légales',
      subtitle: 'Informations sur l’éditeur et l’hébergeur du site reseauxartizano.com',
      sections: [
        {
          title: 'Éditeur du site',
          paragraphs: ['Le site reseauxartizano.com est édité et exploité par :'],
          lines: COMPANY_LINES.fr,
        },
        {
          title: 'Directeur de la publication',
          paragraphs: ['Le directeur de la publication est le représentant légal de ARTI CONNECT.'],
        },
        {
          title: 'Hébergeur du site',
          paragraphs: ['Le site est hébergé par :'],
          lines: [
            'Web Hosting Canada (WHC)',
            '7250 Rue Clark, bureau 301',
            'Montréal, Québec H2R 2Y3, Canada',
            'Téléphone : +1 514 228-1832',
            'Site internet : whc.ca',
          ],
        },
        {
          title: 'Contact',
          paragraphs: ['Pour toute question concernant le site ou les services proposés par ARTI CONNECT :'],
          lines: [
            'Adresse : 221 Rue Milton, Montréal (Québec) H2X 1V5, Canada',
            'Téléphone : +1 438 819 2725',
            'E-mail : contact@reseauxartizano.com',
          ],
        },
        {
          title: 'Droit applicable',
          paragraphs: [
            "Le site et ses services sont exploités par ARTI CONNECT, société constituée dans l'État du Wyoming, États-Unis.",
            "Les conditions d'utilisation et les services sont soumis aux lois applicables de l'État du Wyoming et aux lois fédérales américaines, sous réserve des dispositions impératives pouvant s'appliquer aux utilisateurs situés dans d'autres juridictions.",
          ],
        },
      ],
    },
    en: {
      title: 'Legal Notice',
      subtitle: 'Information about the publisher and host of reseauxartizano.com',
      sections: [
        {
          title: 'Website publisher',
          paragraphs: ['The website reseauxartizano.com is published and operated by:'],
          lines: COMPANY_LINES.en,
        },
        {
          title: 'Publication director',
          paragraphs: ['The publication director is the legal representative of ARTI CONNECT.'],
        },
        {
          title: 'Website host',
          paragraphs: ['The website is hosted by:'],
          lines: [
            'Web Hosting Canada (WHC)',
            '7250 Rue Clark, Suite 301',
            'Montréal, Québec H2R 2Y3, Canada',
            'Phone: +1 514 228-1832',
            'Website: whc.ca',
          ],
        },
        {
          title: 'Contact',
          paragraphs: ['For any question about the website or the services offered by ARTI CONNECT:'],
          lines: [
            'Address: 221 Rue Milton, Montréal (Québec) H2X 1V5, Canada',
            'Phone: +1 438 819 2725',
            'Email: contact@reseauxartizano.com',
          ],
        },
        {
          title: 'Governing law',
          paragraphs: [
            'The website and its services are operated by ARTI CONNECT, a company organized in the State of Wyoming, United States.',
            'The terms of use and the services are governed by the applicable laws of the State of Wyoming and United States federal law, subject to any mandatory provisions that may apply to users located in other jurisdictions.',
          ],
        },
      ],
    },
  },

  cgv: {
    fr: {
      title: 'Conditions générales de vente',
      subtitle: 'Conditions applicables aux services de mise en relation ARTI CONNECT',
      intro: {
        lines: COMPANY_LINES.fr.filter((l) => !l.startsWith('Société à')),
      },
      sections: [
        {
          title: '1. Objet',
          paragraphs: ['Les présentes CGV définissent les conditions d’utilisation des services de mise en relation proposés par ARTI CONNECT aux professionnels du bâtiment via reseauxartizano.com.'],
        },
        {
          title: '2. Services',
          paragraphs: ['ARTI CONNECT propose des Packs et services permettant notamment de recevoir des demandes de travaux et d’être mis en relation avec des particuliers ou professionnels. Une mise en relation ne garantit pas la signature d’un chantier.'],
        },
        {
          title: '3. Tarifs et paiement',
          paragraphs: ['Les tarifs sont ceux indiqués lors de la commande. Le paiement peut être effectué par carte, virement ou tout autre moyen accepté. En cas d’impayé, ARTI CONNECT peut suspendre les services.'],
        },
        {
          title: '4. Projets',
          paragraphs: ['Les projets inclus ou payants sont transmis selon les conditions du Pack choisi. Sauf condition contraire, un projet transmis est considéré comme consommé et n’est pas automatiquement remboursable en cas d’absence de réponse du demandeur ou de non-conclusion du chantier.'],
        },
        {
          title: '5. Obligations du professionnel',
          paragraphs: ['Le Professionnel doit fournir des informations exactes, respecter les lois applicables, contacter rapidement les demandeurs et utiliser leurs coordonnées uniquement dans le cadre autorisé.'],
        },
        {
          title: '6. Responsabilité',
          paragraphs: ['ARTI CONNECT agit comme intermédiaire et n’est pas partie au contrat de travaux entre le Professionnel et le demandeur. Le Professionnel reste responsable de ses devis, travaux, assurances, licences et obligations professionnelles.'],
        },
        {
          title: '7. Suspension / résiliation',
          paragraphs: ['ARTI CONNECT peut suspendre ou résilier un compte en cas d’impayé, fraude, informations fausses, utilisation abusive ou violation des présentes CGV. Les sommes déjà dues restent exigibles.'],
        },
        {
          title: '8. Données personnelles',
          paragraphs: ['Les données sont traitées conformément à la Politique de confidentialité d’ARTI CONNECT et aux lois applicables. Les clients canadiens restent soumis aux règles canadiennes impératives applicables.'],
        },
        {
          title: '9. Droit applicable',
          paragraphs: ['Les présentes CGV sont régies par les lois de l’État du Wyoming et les lois fédérales américaines applicables, sous réserve des dispositions impératives applicables dans la juridiction du client.'],
        },
        {
          title: '10. Litiges',
          paragraphs: ['Les parties tenteront d’abord de résoudre tout différend à l’amiable. Sous réserve des règles impératives applicables, les juridictions compétentes du Wyoming pourront être saisies.'],
        },
        {
          title: '11. Acceptation',
          paragraphs: ['La souscription à un Pack, le paiement ou l’utilisation des services vaut acceptation des présentes CGV.'],
        },
      ],
    },
    en: {
      title: 'Terms and Conditions of Sale',
      subtitle: 'Terms applicable to ARTI CONNECT matchmaking services',
      intro: {
        lines: COMPANY_LINES.en.filter((l) => !l.startsWith('Limited liability')),
      },
      sections: [
        {
          title: '1. Purpose',
          paragraphs: ['These Terms define the conditions of use of the matchmaking services offered by ARTI CONNECT to construction professionals through reseauxartizano.com.'],
        },
        {
          title: '2. Services',
          paragraphs: ['ARTI CONNECT offers Packs and services that allow professionals, among other things, to receive work requests and to be put in contact with individuals or businesses. Being put in contact does not guarantee that a job will be signed.'],
        },
        {
          title: '3. Prices and payment',
          paragraphs: ['Prices are those shown at the time of order. Payment may be made by card, bank transfer or any other accepted method. In the event of non-payment, ARTI CONNECT may suspend the services.'],
        },
        {
          title: '4. Projects',
          paragraphs: ['Included or paid projects are delivered according to the terms of the chosen Pack. Unless otherwise stated, a delivered project is considered used and is not automatically refundable if the requester does not respond or the job is not concluded.'],
        },
        {
          title: '5. Professional’s obligations',
          paragraphs: ['The Professional must provide accurate information, comply with applicable laws, contact requesters promptly and use their contact details only within the authorized scope.'],
        },
        {
          title: '6. Liability',
          paragraphs: ['ARTI CONNECT acts as an intermediary and is not a party to the work contract between the Professional and the requester. The Professional remains responsible for their quotes, work, insurance, licenses and professional obligations.'],
        },
        {
          title: '7. Suspension / termination',
          paragraphs: ['ARTI CONNECT may suspend or terminate an account in the event of non-payment, fraud, false information, abusive use or breach of these Terms. Amounts already due remain payable.'],
        },
        {
          title: '8. Personal data',
          paragraphs: ['Data is processed in accordance with ARTI CONNECT’s Privacy Policy and applicable laws. Canadian customers remain subject to the applicable mandatory Canadian rules.'],
        },
        {
          title: '9. Governing law',
          paragraphs: ['These Terms are governed by the laws of the State of Wyoming and applicable United States federal law, subject to the mandatory provisions applicable in the customer’s jurisdiction.'],
        },
        {
          title: '10. Disputes',
          paragraphs: ['The parties will first attempt to resolve any dispute amicably. Subject to applicable mandatory rules, the competent courts of Wyoming may hear the matter.'],
        },
        {
          title: '11. Acceptance',
          paragraphs: ['Subscribing to a Pack, making a payment or using the services constitutes acceptance of these Terms.'],
        },
      ],
    },
  },
};
