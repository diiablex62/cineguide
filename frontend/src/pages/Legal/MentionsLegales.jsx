import React from "react";
import { useTranslation } from "react-i18next";

const ML_CONTENT = {
  fr: [
    {
      titre: "Éditeur du site",
      contenu: (
        <>
          <p>
            <b>Nom de l'application :</b> Cineguide
          </p>
          <p>
            <b>Éditeur :</b> [Nom de la personne physique ou de la société]
          </p>
          <p>
            <b>Forme juridique :</b> [ex : SAS, SARL, Auto-entrepreneur…]
          </p>
          <p>
            <b>Capital social :</b> [le cas échéant]
          </p>
          <p>
            <b>Adresse du siège social :</b> [Adresse complète]
          </p>
          <p>
            <b>SIRET :</b> [Numéro SIRET ou RCS]
          </p>
          <p>
            <b>Responsable de la publication :</b> [Nom et prénom, ou fonction]
          </p>
          <p>
            <b>Contact :</b> [Adresse email de contact]
          </p>
        </>
      ),
    },
    {
      titre: "Hébergement",
      contenu: (
        <>
          <p>
            <b>Hébergeur :</b> [Nom de l'hébergeur (ex : OVH, Gandi, AWS…)]
          </p>
          <p>
            <b>Adresse :</b> [Adresse de l’hébergeur]
          </p>
          <p>
            <b>Téléphone :</b> [Numéro de téléphone de l’hébergeur]
          </p>
        </>
      ),
    },
    {
      titre: "Propriété intellectuelle",
      contenu: `Tous les contenus présents sur ce site (textes, images, logos, etc.) sont protégés par le droit d’auteur et la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation expresse, est interdite.`,
    },
    {
      titre: "Responsabilité",
      contenu: `L’éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l’accès ou de l’utilisation du site.`,
    },
    {
      titre: "Protection des données personnelles",
      contenu: `Les informations recueillies font l’objet d’un traitement informatique destiné à [finalité]. Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression des données vous concernant.`,
    },
    {
      titre: "Droit applicable",
      contenu: `Le présent site est soumis au droit français.`,
    },
  ],
  en: [
    {
      titre: "Site Publisher",
      contenu: (
        <>
          <p>
            <b>Application name:</b> Cineguide
          </p>
          <p>
            <b>Publisher:</b> [Name of the individual or company]
          </p>
          <p>
            <b>Legal form:</b> [e.g.: SAS, SARL, Sole proprietorship...]
          </p>
          <p>
            <b>Share capital:</b> [if applicable]
          </p>
          <p>
            <b>Head office address:</b> [Full address]
          </p>
          <p>
            <b>SIRET:</b> [SIRET or RCS number]
          </p>
          <p>
            <b>Publication manager:</b> [Name and surname, or position]
          </p>
          <p>
            <b>Contact:</b> [Contact email address]
          </p>
        </>
      ),
    },
    {
      titre: "Hosting",
      contenu: (
        <>
          <p>
            <b>Host:</b> [Name of the host (e.g.: OVH, Gandi, AWS...)]
          </p>
          <p>
            <b>Address:</b> [Host address]
          </p>
          <p>
            <b>Phone:</b> [Host phone number]
          </p>
        </>
      ),
    },
    {
      titre: "Intellectual property",
      contenu: `All content on this site (texts, images, logos, etc.) is protected by copyright and intellectual property rights. Any reproduction or representation, in whole or in part, without express permission, is prohibited.`,
    },
    {
      titre: "Liability",
      contenu: `The publisher cannot be held liable for any direct or indirect damage resulting from access to or use of the site.`,
    },
    {
      titre: "Personal data protection",
      contenu: `The information collected is processed electronically for [purpose]. In accordance with the "Informatique et Libertés" law and the GDPR, you have the right to access, rectify and delete your personal data.`,
    },
    {
      titre: "Applicable law",
      contenu: `This site is subject to French law.`,
    },
  ],
  es: [
    {
      titre: "Editor del sitio",
      contenu: (
        <>
          <p>
            <b>Nombre de la aplicación:</b> Cineguide
          </p>
          <p>
            <b>Editor:</b> [Nombre de la persona física o de la empresa]
          </p>
          <p>
            <b>Forma jurídica:</b> [ej: SAS, SARL, Autónomo...]
          </p>
          <p>
            <b>Capital social:</b> [si procede]
          </p>
          <p>
            <b>Dirección de la sede:</b> [Dirección completa]
          </p>
          <p>
            <b>SIRET:</b> [Número SIRET o RCS]
          </p>
          <p>
            <b>Responsable de la publicación:</b> [Nombre y apellidos, o
            función]
          </p>
          <p>
            <b>Contacto:</b> [Correo electrónico de contacto]
          </p>
        </>
      ),
    },
    {
      titre: "Alojamiento",
      contenu: (
        <>
          <p>
            <b>Alojador:</b> [Nombre del alojador (ej: OVH, Gandi, AWS...)]
          </p>
          <p>
            <b>Dirección:</b> [Dirección del alojador]
          </p>
          <p>
            <b>Teléfono:</b> [Número de teléfono del alojador]
          </p>
        </>
      ),
    },
    {
      titre: "Propiedad intelectual",
      contenu: `Todos los contenidos de este sitio (textos, imágenes, logotipos, etc.) están protegidos por derechos de autor y propiedad intelectual. Queda prohibida cualquier reproducción o representación, total o parcial, sin autorización expresa.`,
    },
    {
      titre: "Responsabilidad",
      contenu: `El editor no se hace responsable de los daños directos o indirectos derivados del acceso o uso del sitio.`,
    },
    {
      titre: "Protección de datos personales",
      contenu: `La información recogida se procesa electrónicamente para [finalidad]. De conformidad con la ley "Informatique et Libertés" y el RGPD, usted tiene derecho a acceder, rectificar y suprimir sus datos personales.`,
    },
    {
      titre: "Ley aplicable",
      contenu: `Este sitio está sujeto a la legislación francesa.`,
    },
  ],
  de: [
    {
      titre: "Seitenbetreiber",
      contenu: (
        <>
          <p>
            <b>Name der Anwendung:</b> Cineguide
          </p>
          <p>
            <b>Herausgeber:</b> [Name der natürlichen oder juristischen Person]
          </p>
          <p>
            <b>Rechtsform:</b> [z.B.: SAS, GmbH, Einzelunternehmen...]
          </p>
          <p>
            <b>Stammkapital:</b> [falls zutreffend]
          </p>
          <p>
            <b>Adresse des Firmensitzes:</b> [Vollständige Adresse]
          </p>
          <p>
            <b>SIRET:</b> [SIRET- oder Handelsregisternummer]
          </p>
          <p>
            <b>Verantwortlicher für die Veröffentlichung:</b> [Name und Vorname
            oder Funktion]
          </p>
          <p>
            <b>Kontakt:</b> [Kontakt-E-Mail-Adresse]
          </p>
        </>
      ),
    },
    {
      titre: "Hosting",
      contenu: (
        <>
          <p>
            <b>Hoster:</b> [Name des Hosters (z.B.: OVH, Gandi, AWS...)]
          </p>
          <p>
            <b>Adresse:</b> [Adresse des Hosters]
          </p>
          <p>
            <b>Telefon:</b> [Telefonnummer des Hosters]
          </p>
        </>
      ),
    },
    {
      titre: "Geistiges Eigentum",
      contenu: `Alle Inhalte dieser Website (Texte, Bilder, Logos usw.) sind durch Urheberrechte und geistige Eigentumsrechte geschützt. Jede vollständige oder teilweise Vervielfältigung oder Darstellung ohne ausdrückliche Genehmigung ist untersagt.`,
    },
    {
      titre: "Haftung",
      contenu: `Der Herausgeber haftet nicht für direkte oder indirekte Schäden, die sich aus dem Zugriff auf oder der Nutzung der Website ergeben.`,
    },
    {
      titre: "Schutz personenbezogener Daten",
      contenu: `Die erhobenen Informationen werden elektronisch zum Zweck [Zweck] verarbeitet. Gemäß dem Gesetz "Informatique et Libertés" und der DSGVO haben Sie das Recht auf Zugang, Berichtigung und Löschung Ihrer personenbezogenen Daten.`,
    },
    {
      titre: "Anwendbares Recht",
      contenu: `Diese Website unterliegt französischem Recht.`,
    },
  ],
};

export default function MentionsLegales() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0] || "fr";
  const sections = ML_CONTENT[lang] || ML_CONTENT.fr;

  return (
    <div className='flex flex-col items-center justify-center mt-12 px-56 gap-14 text-black dark:text-white bg-white dark:bg-black max-1100:px-32 max-md:px-16 max-sm:px-4 mb-10'>
      <h2 className='font-bold text-4xl'>
        {sections[0]?.titre || "Mentions Légales"}
      </h2>
      <div className='flex flex-col gap-12 justify-center w-full'>
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className='font-bold text-2xl mb-5'>{section.titre}</h3>
            <div>{section.contenu}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
