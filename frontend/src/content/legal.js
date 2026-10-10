// Legal texts for ARTI CONNECT (source: Mentions_legales_ARTI_CONNECT.docx, CGV_ARTI_CONNECT_LLC_COURTES.docx,
// Politique de confidentialite.rtf).
// Each section: { title, paragraphs: [string], items?: [string], after?: [string], lines?: [string] }
// — `items` renders as a bullet list, `lines` as an address-style block, `after` as paragraphs below both.

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

  privacy: {
    fr: {
      title: 'Politique de confidentialité',
      subtitle: 'Comment ARTI CONNECT recueille, utilise et protège vos renseignements personnels',
      updated: 'Dernière mise à jour : 1er octobre 2026',
      intro: {
        paragraphs: [
          "ARTI CONNECT accorde une importance particulière à la protection des renseignements personnels de ses utilisateurs, clients, prospects, artisans et partenaires. La présente politique explique quelles données nous pouvons recueillir, pourquoi nous les utilisons, avec qui elles peuvent être communiquées, combien de temps elles sont conservées et quels sont vos droits.",
          "Cette politique s'applique aux utilisateurs de nos services, notamment au Canada et au Québec, sous réserve des lois applicables selon le lieu de résidence de la personne concernée.",
        ],
      },
      sections: [
        {
          title: '1. Responsable de la protection des renseignements personnels',
          paragraphs: [
            "ARTI CONNECT est responsable de la protection des renseignements personnels qu'elle détient dans le cadre de ses activités. Pour toute question concernant la protection de vos renseignements personnels, pour exercer vos droits ou pour déposer une demande relative à vos données, vous pouvez nous contacter :",
          ],
          lines: ['E-mail : contact@reseauxartizano.com'],
          after: [
            "ARTI CONNECT peut désigner une personne responsable de la protection des renseignements personnels. Les coordonnées de cette personne peuvent être communiquées sur demande à l'adresse ci-dessus.",
          ],
        },
        {
          title: '2. Renseignements personnels recueillis',
          paragraphs: ['Selon votre utilisation de nos services, nous pouvons recueillir uniquement les renseignements nécessaires aux fins pour lesquelles ils sont collectés, notamment :'],
          items: [
            'nom et prénom ;',
            'numéro de téléphone ;',
            'adresse e-mail ;',
            'adresse ou zone géographique du projet ;',
            'informations relatives à un projet de travaux ;',
            'type de travaux souhaité ;',
            'description du projet ;',
            'budget estimatif lorsque celui-ci est communiqué ;',
            'informations relatives à une entreprise ou à une activité professionnelle ;',
            "informations nécessaires à la création et à la gestion d'un compte ;",
            'informations relatives aux demandes de devis et aux mises en relation ;',
            'informations relatives aux abonnements, commandes et factures ;',
            'informations relatives aux paiements ;',
            'données techniques nécessaires au fonctionnement et à la sécurité du site.',
          ],
          after: [
            'ARTI CONNECT ne recueille pas volontairement de renseignements personnels qui ne sont pas nécessaires aux fins déterminées.',
            'Lorsque des renseignements sensibles sont susceptibles d’être recueillis, leur traitement est effectué conformément aux exigences légales applicables et, lorsque requis, avec un consentement exprès.',
          ],
        },
        {
          title: '3. Finalités de la collecte',
          paragraphs: ['Les renseignements personnels peuvent être utilisés pour :'],
          items: [
            'traiter une demande de travaux ;',
            'comprendre les besoins du client ;',
            'rechercher et proposer des artisans ou professionnels susceptibles de répondre au projet ;',
            "transmettre les informations nécessaires à un artisan afin qu'il puisse communiquer avec le client ;",
            'permettre aux artisans de recevoir et traiter des demandes de projets ;',
            'créer et gérer les comptes utilisateurs ;',
            'gérer les abonnements et les services souscrits ;',
            'traiter les paiements et établir les factures ;',
            'communiquer avec les utilisateurs concernant leur demande ou leur compte ;',
            'assurer le suivi des projets et des mises en relation ;',
            'assurer le fonctionnement, la maintenance et la sécurité de la plateforme ;',
            'prévenir les fraudes, abus ou utilisations non autorisées ;',
            "améliorer nos services et l'expérience utilisateur ;",
            'envoyer des communications commerciales lorsque cela est permis par la réglementation applicable.',
          ],
          after: [
            "Les renseignements ne sont pas utilisés à d'autres fins incompatibles avec celles pour lesquelles ils ont été recueillis, sauf lorsque la loi l'autorise ou qu'un nouveau consentement est requis.",
          ],
        },
        {
          title: '4. Base légale du traitement',
          paragraphs: ['Selon le contexte et la juridiction applicable, le traitement des renseignements personnels peut être fondé notamment sur :'],
          items: [
            "l'exécution d'un contrat ;",
            "des mesures précontractuelles demandées par l'utilisateur ;",
            "le respect d'une obligation légale ;",
            'un intérêt légitime, lorsque celui-ci est applicable ;',
            'le consentement de la personne concernée.',
          ],
          after: [
            'Lorsque le consentement est requis, celui-ci est demandé de manière claire et compréhensible. Une personne peut retirer son consentement lorsque le traitement repose sur celui-ci, sous réserve des conséquences légales ou contractuelles pouvant découler de ce retrait.',
            'Au Québec, les règles applicables au consentement exigent notamment que celui-ci soit présenté en termes simples et clairs dans les situations où il est requis.',
          ],
        },
        {
          title: '5. Mise en relation entre clients et artisans',
          paragraphs: [
            "La fonction principale d'ARTI CONNECT est de faciliter la mise en relation entre des personnes ayant un projet de travaux et des artisans ou professionnels susceptibles de répondre à leurs besoins.",
            "Lorsqu'un utilisateur demande une mise en relation, certaines informations nécessaires à cette mise en relation peuvent être communiquées au ou aux professionnels concernés. Ces informations peuvent notamment comprendre :",
          ],
          items: [
            'le nom ;',
            'le numéro de téléphone ;',
            "l'adresse e-mail ;",
            'la localisation du projet ;',
            'le type de travaux ;',
            'la description du projet ;',
            'les informations nécessaires à la prise de contact.',
          ],
          after: ['ARTI CONNECT limite la communication des renseignements aux informations nécessaires à la réalisation de la mise en relation.'],
        },
        {
          title: '6. Communication à des fournisseurs et prestataires',
          paragraphs: ['Certaines données peuvent être traitées par des fournisseurs ou prestataires qui nous permettent d\'exploiter nos services, notamment :'],
          items: [
            'hébergement informatique ;',
            'services cloud ;',
            'messagerie électronique ;',
            'téléphonie et communications ;',
            'gestion des relations clients ;',
            'paiement ;',
            'facturation ;',
            'sécurité informatique ;',
            'maintenance ;',
            "analyse et mesure d'audience.",
          ],
          after: [
            "Ces prestataires peuvent avoir accès aux renseignements uniquement dans la mesure nécessaire à l'exécution de leurs services et sont soumis aux obligations contractuelles ou légales applicables en matière de confidentialité et de protection des renseignements.",
          ],
        },
        {
          title: "7. Transfert ou traitement des renseignements à l'extérieur du Québec",
          paragraphs: [
            "Certains de nos fournisseurs de services peuvent être situés à l'extérieur du Québec ou du Canada.",
            "Lorsque des renseignements personnels sont communiqués à l'extérieur du Québec, ARTI CONNECT prend les mesures requises par la législation applicable avant ou dans le cadre de cette communication.",
            'Lorsque cela est requis, une évaluation des facteurs relatifs à la vie privée peut notamment être réalisée afin de tenir compte des lois applicables dans le territoire où les renseignements seraient communiqués ou confiés.',
            'Les mesures contractuelles, techniques et organisationnelles appropriées sont mises en place lorsque cela est nécessaire.',
          ],
        },
        {
          title: '8. Paiements',
          paragraphs: [
            'Lorsque vous effectuez un paiement, celui-ci peut être traité par un prestataire de paiement externe.',
            'ARTI CONNECT ne conserve pas les données complètes de carte bancaire lorsque celles-ci sont directement traitées par le prestataire de paiement.',
            'Les informations nécessaires à la facturation et au suivi du paiement peuvent toutefois être conservées conformément aux obligations légales applicables.',
          ],
        },
        {
          title: '9. Conservation des renseignements',
          paragraphs: [
            'ARTI CONNECT conserve les renseignements personnels uniquement pendant la durée nécessaire aux fins pour lesquelles ils ont été recueillis ou pendant la durée imposée par les obligations légales applicables.',
            'La durée de conservation peut notamment dépendre :',
          ],
          items: [
            "de la nature de la relation avec l'utilisateur ;",
            'de la durée du compte ;',
            'de la durée du projet ou de la prestation ;',
            'des obligations comptables et fiscales ;',
            'des besoins de sécurité et de prévention de la fraude ;',
            "de l'existence éventuelle d'un litige ou d'une obligation légale.",
          ],
          after: ['Les données qui ne sont plus nécessaires sont supprimées, détruites ou anonymisées lorsque la réglementation applicable le permet.'],
        },
        {
          title: '10. Sécurité des renseignements',
          paragraphs: ['ARTI CONNECT met en place des mesures de sécurité raisonnables et appropriées afin de protéger les renseignements personnels contre :'],
          items: [
            "l'accès non autorisé ;",
            'la perte ;',
            'la destruction ;',
            "l'utilisation abusive ;",
            'la modification ;',
            'la divulgation non autorisée.',
          ],
          after: [
            "L'accès aux renseignements est limité aux personnes qui en ont besoin dans le cadre de leurs fonctions ou de la prestation des services.",
            'Malgré ces mesures, aucun système informatique ou service de transmission de données sur Internet ne peut garantir une sécurité absolue.',
          ],
        },
        {
          title: '11. Incident de confidentialité',
          paragraphs: [
            "Un incident de confidentialité peut notamment correspondre à un accès, une utilisation, une communication ou une perte de renseignements personnels qui n'est pas autorisé par la loi.",
            "ARTI CONNECT prend les mesures nécessaires lorsqu'un tel incident est porté à sa connaissance. Lorsque la législation applicable l'exige, les personnes concernées et les autorités compétentes peuvent être avisées conformément aux exigences légales.",
            'ARTI CONNECT peut également tenir un registre des incidents de confidentialité conformément aux obligations applicables.',
          ],
        },
        {
          title: '12. Vos droits au Québec',
          paragraphs: ['Sous réserve des conditions et exceptions prévues par la loi québécoise, vous pouvez notamment demander :'],
          items: [
            'de savoir si ARTI CONNECT détient des renseignements personnels vous concernant ;',
            "d'obtenir l'accès à ces renseignements ;",
            "de demander la rectification d'un renseignement inexact ou incomplet ;",
            "de demander la suppression d'un renseignement lorsque les conditions légales sont réunies ;",
            'de retirer votre consentement lorsque le traitement repose sur celui-ci ;',
            'de demander la limitation ou la cessation de certaines utilisations lorsque la loi le permet ;',
            "d'obtenir la portabilité de certains renseignements personnels dans les conditions prévues par la loi.",
          ],
          after: [
            'La législation québécoise prévoit notamment un droit à la portabilité de certains renseignements personnels, sous réserve des conditions applicables.',
            'Pour exercer vos droits, contactez : contact@reseauxartizano.com',
            "Nous pouvons demander des informations raisonnables afin de vérifier l'identité de la personne présentant une demande.",
          ],
        },
        {
          title: '13. Communications commerciales',
          paragraphs: [
            'Lorsque ARTI CONNECT utilise des renseignements personnels à des fins de prospection commerciale, nous nous identifions auprès de la personne concernée et lui indiquons les moyens disponibles pour retirer son consentement lorsque celui-ci est requis.',
            'Au Québec, la législation prévoit notamment des obligations particulières pour les entreprises qui utilisent des renseignements personnels à des fins de prospection commerciale.',
            'Vous pouvez demander à ne plus recevoir de communications commerciales en utilisant le mécanisme de désabonnement prévu dans les communications ou en nous contactant directement.',
          ],
        },
        {
          title: '14. Cookies et technologies similaires',
          paragraphs: [
            'Le site ARTI CONNECT peut utiliser des cookies et technologies similaires.',
            'Certains cookies peuvent être nécessaires au fonctionnement du site, notamment pour :',
          ],
          items: [
            'maintenir une session ;',
            'assurer la sécurité ;',
            'mémoriser certaines préférences ;',
            'permettre le fonctionnement de certaines fonctionnalités.',
          ],
          after: [
            "D'autres cookies peuvent être utilisés, selon vos choix et la réglementation applicable, notamment pour mesurer l'audience, analyser l'utilisation du site, améliorer nos services et personnaliser certaines fonctionnalités.",
            "Lorsque le consentement est requis, les cookies concernés ne sont pas activés avant l'obtention du consentement.",
          ],
        },
        {
          title: '15. Mineurs',
          paragraphs: [
            'Nos services ne sont pas destinés à recueillir volontairement des renseignements personnels auprès de personnes qui ne sont pas en mesure de consentir conformément aux lois applicables.',
            "Si vous pensez qu'un renseignement personnel concernant un mineur a été communiqué à ARTI CONNECT sans autorisation appropriée, vous pouvez nous contacter afin que nous puissions examiner la situation.",
          ],
        },
        {
          title: '16. Modifications de la présente politique',
          paragraphs: [
            "ARTI CONNECT peut modifier cette politique afin de tenir compte de l'évolution de ses services, de ses pratiques, de la réglementation ou de ses obligations légales.",
            'La date indiquée au début de la présente politique correspond à sa dernière mise à jour.',
            'En cas de modification importante, ARTI CONNECT peut prendre les mesures appropriées pour informer les utilisateurs lorsque cela est requis.',
          ],
        },
        {
          title: '17. Contact',
          paragraphs: ['Pour toute question concernant la présente politique ou le traitement de vos renseignements personnels :'],
          lines: ['ARTI CONNECT', 'E-mail : contact@reseauxartizano.com'],
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'How ARTI CONNECT collects, uses and protects your personal information',
      updated: 'Last updated: October 1, 2026',
      intro: {
        paragraphs: [
          'ARTI CONNECT places particular importance on protecting the personal information of its users, customers, prospects, tradespeople and partners. This policy explains what data we may collect, why we use it, with whom it may be shared, how long it is kept and what your rights are.',
          'This policy applies to users of our services, including in Canada and Québec, subject to the laws applicable where the individual concerned resides.',
        ],
      },
      sections: [
        {
          title: '1. Person responsible for the protection of personal information',
          paragraphs: [
            'ARTI CONNECT is responsible for protecting the personal information it holds in the course of its activities. For any question about the protection of your personal information, to exercise your rights or to submit a request about your data, you can contact us:',
          ],
          lines: ['Email: contact@reseauxartizano.com'],
          after: [
            'ARTI CONNECT may designate a person responsible for the protection of personal information. That person’s contact details can be provided on request at the address above.',
          ],
        },
        {
          title: '2. Personal information collected',
          paragraphs: ['Depending on how you use our services, we may collect only the information necessary for the purposes for which it is collected, including:'],
          items: [
            'first and last name;',
            'phone number;',
            'email address;',
            'address or geographic area of the project;',
            'information about a renovation or construction project;',
            'type of work requested;',
            'project description;',
            'estimated budget, when provided;',
            'information about a business or professional activity;',
            'information needed to create and manage an account;',
            'information about quote requests and introductions;',
            'information about subscriptions, orders and invoices;',
            'payment information;',
            'technical data needed for the operation and security of the website.',
          ],
          after: [
            'ARTI CONNECT does not knowingly collect personal information that is not necessary for the stated purposes.',
            'Where sensitive information may be collected, it is processed in accordance with applicable legal requirements and, where required, with express consent.',
          ],
        },
        {
          title: '3. Purposes of collection',
          paragraphs: ['Personal information may be used to:'],
          items: [
            'process a work request;',
            'understand the customer’s needs;',
            'find and suggest tradespeople or professionals who may be able to handle the project;',
            'send a tradesperson the information needed to contact the customer;',
            'allow tradespeople to receive and handle project requests;',
            'create and manage user accounts;',
            'manage subscriptions and purchased services;',
            'process payments and issue invoices;',
            'communicate with users about their request or account;',
            'follow up on projects and introductions;',
            'ensure the operation, maintenance and security of the platform;',
            'prevent fraud, abuse or unauthorized use;',
            'improve our services and the user experience;',
            'send marketing communications where permitted by applicable regulations.',
          ],
          after: [
            'Information is not used for other purposes incompatible with those for which it was collected, unless permitted by law or new consent is obtained where required.',
          ],
        },
        {
          title: '4. Legal basis for processing',
          paragraphs: ['Depending on the context and the applicable jurisdiction, the processing of personal information may be based on:'],
          items: [
            'the performance of a contract;',
            'pre-contractual steps requested by the user;',
            'compliance with a legal obligation;',
            'a legitimate interest, where applicable;',
            'the consent of the individual concerned.',
          ],
          after: [
            'Where consent is required, it is requested in a clear and understandable way. An individual may withdraw consent where processing is based on it, subject to any legal or contractual consequences of that withdrawal.',
            'In Québec, the applicable rules on consent require, among other things, that it be requested in simple and clear terms where it is required.',
          ],
        },
        {
          title: '5. Introductions between customers and tradespeople',
          paragraphs: [
            'The main purpose of ARTI CONNECT is to connect people who have a renovation or construction project with tradespeople or professionals who may be able to meet their needs.',
            'When a user requests an introduction, certain information needed for that introduction may be shared with the professional or professionals concerned. This information may include:',
          ],
          items: [
            'name;',
            'phone number;',
            'email address;',
            'project location;',
            'type of work;',
            'project description;',
            'information needed to get in touch.',
          ],
          after: ['ARTI CONNECT limits the information shared to what is necessary to make the introduction.'],
        },
        {
          title: '6. Sharing with suppliers and service providers',
          paragraphs: ['Some data may be processed by suppliers or service providers that help us operate our services, including:'],
          items: [
            'web hosting;',
            'cloud services;',
            'email;',
            'telephony and communications;',
            'customer relationship management;',
            'payment;',
            'invoicing;',
            'IT security;',
            'maintenance;',
            'audience measurement and analytics.',
          ],
          after: [
            'These providers may access information only to the extent necessary to perform their services and are bound by the applicable contractual or legal obligations regarding confidentiality and the protection of information.',
          ],
        },
        {
          title: '7. Transfer or processing of information outside Québec',
          paragraphs: [
            'Some of our service providers may be located outside Québec or Canada.',
            'When personal information is communicated outside Québec, ARTI CONNECT takes the steps required by applicable law before or as part of that communication.',
            'Where required, a privacy impact assessment may be carried out to take into account the laws applicable in the jurisdiction where the information would be communicated or entrusted.',
            'Appropriate contractual, technical and organizational measures are put in place where necessary.',
          ],
        },
        {
          title: '8. Payments',
          paragraphs: [
            'When you make a payment, it may be processed by an external payment provider.',
            'ARTI CONNECT does not store full credit card details when they are processed directly by the payment provider.',
            'Information needed for invoicing and payment follow-up may, however, be retained in accordance with applicable legal obligations.',
          ],
        },
        {
          title: '9. Retention of information',
          paragraphs: [
            'ARTI CONNECT keeps personal information only for as long as necessary for the purposes for which it was collected, or for the period required by applicable legal obligations.',
            'The retention period may depend on:',
          ],
          items: [
            'the nature of the relationship with the user;',
            'how long the account exists;',
            'the duration of the project or service;',
            'accounting and tax obligations;',
            'security and fraud-prevention needs;',
            'any dispute or legal obligation.',
          ],
          after: ['Data that is no longer needed is deleted, destroyed or anonymized where applicable regulations permit.'],
        },
        {
          title: '10. Security of information',
          paragraphs: ['ARTI CONNECT implements reasonable and appropriate security measures to protect personal information against:'],
          items: [
            'unauthorized access;',
            'loss;',
            'destruction;',
            'misuse;',
            'alteration;',
            'unauthorized disclosure.',
          ],
          after: [
            'Access to information is limited to people who need it to perform their duties or provide the services.',
            'Despite these measures, no computer system or internet data transmission can guarantee absolute security.',
          ],
        },
        {
          title: '11. Confidentiality incidents',
          paragraphs: [
            'A confidentiality incident may include any access to, use, communication or loss of personal information that is not authorized by law.',
            'ARTI CONNECT takes the necessary steps when such an incident comes to its attention. Where required by applicable law, the individuals concerned and the competent authorities may be notified in accordance with legal requirements.',
            'ARTI CONNECT may also keep a register of confidentiality incidents in accordance with applicable obligations.',
          ],
        },
        {
          title: '12. Your rights in Québec',
          paragraphs: ['Subject to the conditions and exceptions provided by Québec law, you may in particular request:'],
          items: [
            'to know whether ARTI CONNECT holds personal information about you;',
            'access to that information;',
            'correction of inaccurate or incomplete information;',
            'deletion of information where the legal conditions are met;',
            'to withdraw your consent where processing is based on it;',
            'that certain uses be limited or stopped where the law permits;',
            'portability of certain personal information under the conditions provided by law.',
          ],
          after: [
            'Québec law provides, among other things, a right to the portability of certain personal information, subject to the applicable conditions.',
            'To exercise your rights, contact: contact@reseauxartizano.com',
            'We may ask for reasonable information to verify the identity of the person making a request.',
          ],
        },
        {
          title: '13. Marketing communications',
          paragraphs: [
            'When ARTI CONNECT uses personal information for marketing purposes, we identify ourselves to the individual concerned and tell them how to withdraw their consent where consent is required.',
            'In Québec, the law sets specific obligations for businesses that use personal information for marketing purposes.',
            'You can ask to stop receiving marketing communications by using the unsubscribe link included in those communications or by contacting us directly.',
          ],
        },
        {
          title: '14. Cookies and similar technologies',
          paragraphs: [
            'The ARTI CONNECT website may use cookies and similar technologies.',
            'Some cookies may be necessary for the website to work, in particular to:',
          ],
          items: [
            'maintain a session;',
            'ensure security;',
            'remember certain preferences;',
            'enable certain features.',
          ],
          after: [
            'Other cookies may be used, depending on your choices and applicable regulations, in particular to measure audience, analyze website use, improve our services and personalize certain features.',
            'Where consent is required, the cookies concerned are not activated until consent has been obtained.',
          ],
        },
        {
          title: '15. Minors',
          paragraphs: [
            'Our services are not intended to knowingly collect personal information from people who are unable to consent under applicable law.',
            'If you believe that personal information about a minor has been provided to ARTI CONNECT without proper authorization, you can contact us so that we can look into the situation.',
          ],
        },
        {
          title: '16. Changes to this policy',
          paragraphs: [
            'ARTI CONNECT may change this policy to reflect changes in its services, practices, regulations or legal obligations.',
            'The date shown at the top of this policy is the date of its last update.',
            'In the event of a significant change, ARTI CONNECT may take appropriate steps to inform users where required.',
          ],
        },
        {
          title: '17. Contact',
          paragraphs: ['For any question about this policy or the processing of your personal information:'],
          lines: ['ARTI CONNECT', 'Email: contact@reseauxartizano.com'],
        },
      ],
    },
  },
};
