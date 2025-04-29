import React from "react";

export default function MentionsLegales() {
  return (
    <div className="flex flex-col items-center justify-center mt-12 px-56 gap-14 text-black dark:text-white max-1100:px-32 max-md:px-16 max-sm:px-4">
      <h2 className="font-bold text-4xl">Mentions Légales</h2>
      <div className="flex flex-col gap-12 justify-center w-full">
        <div>
          <h3 className="font-bold text-2xl mb-5">Éditeur du site</h3>
          <p>
            <span className="font-bold">Nom de l'application : </span>Cineguide
          </p>
          <p>
            <span className="font-bold">Éditeur : </span>[Nom de la personne
            physique ou de la société]
          </p>
          <p>
            <span className="font-bold">Forme juridique : </span>[ex : SAS,
            SARL, Auto-entrepreneur…]
          </p>
          <p>
            <span className="font-bold">Capital social : </span>[le cas échéant]
          </p>
          <p>
            <span className="font-bold">Adresse du siège social : </span>
            [Adresse complète]
          </p>
          <p>
            <span className="font-bold">SIRET : </span>[Numéro SIRET ou RCS]
          </p>
          <p>
            <span className="font-bold">Responsable de la publication : </span>
            [Nom et prénom, ou fonction]
          </p>
          <p>
            <span className="font-bold">Contact : </span>[Adresse email de
            contact]
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Hébergement</h3>
          <p>
            <span className="font-bold">Hébergeur : </span>[Nom de l'hébergeur
            (ex : OVH, Gandi, AWS…)]
          </p>
          <p>
            <span className="font-bold">Adresse : </span>[Adresse de
            l’hébergeur]
          </p>
          <p>
            <span className="font-bold">Téléphone : </span>[Numéro de téléphone
            de l’hébergeur]
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Propriété intellectuelle</h3>
          <p>
            Tous les contenus présents sur le site [Nom de votre application]
            (textes, images, logos, icônes, vidéos, sons, logiciels, etc.) sont
            protégés par les lois en vigueur sur la propriété intellectuelle et
            sont la propriété exclusive de [Nom de la société ou du
            propriétaire], sauf mentions contraires. <br /> Toute reproduction,
            représentation, modification, publication, adaptation, totale ou
            partielle des éléments du site, quel que soit le moyen ou le procédé
            utilisé, est interdite, sauf autorisation écrite préalable de
            l’éditeur.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Responsabilité</h3>
          <p>
            L’éditeur du site ne peut être tenu responsable des dommages directs
            ou indirects causés au matériel de l’utilisateur lors de l’accès à
            l’application, ni des éventuelles interruptions ou bugs du service.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">
            Protection des données personnelles
          </h3>
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d’un droit d’accès, de rectification, de
            suppression et d’opposition concernant vos données personnelles.
            Pour exercer ces droits, vous pouvez contacter : [email de contact
            RGPD]. Des cookies peuvent être déposés pour le bon fonctionnement
            du site ou à des fins de statistiques. Vous pouvez à tout moment
            modifier vos préférences via le gestionnaire de cookies.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Droit applicable</h3>
          <p>
            Les présentes mentions légales sont régies par le droit français. En
            cas de litige, et après échec de toute tentative de recherche d’une
            solution amiable, les tribunaux français seront seuls compétents.
          </p>
        </div>
      </div>
    </div>
  );
}
