import React from "react";

const CGU_CONTENT = {
  fr: [
    {
      titre: "Condition General d'Utilisation (CGU)",
      contenu: `Les présentes Conditions Générales d’Utilisation ont pour objet de définir les modalités et conditions d’accès et d’utilisation de l’application [Nom de l’application] par les utilisateurs. En accédant et/ou en utilisant l'application, vous acceptez sans réserve les présentes CGU.`,
    },
    {
      titre: "Accès au service",
      contenu: `L’accès à l'application est possible via un navigateur web à l’adresse suivante : [URL de l'application]. Le service est accessible gratuitement à tout utilisateur disposant d’un accès à Internet. Certains services peuvent nécessiter la création d’un compte utilisateur.`,
    },
    {
      titre: "Création du compte",
      contenu: `L’utilisateur peut être amené à créer un compte personnel pour accéder à certaines fonctionnalités. L’utilisateur s’engage à fournir des informations exactes lors de son inscription, à maintenir la confidentialité de ses identifiants, et à ne pas usurper l’identité d’un tiers. L’éditeur se réserve le droit de suspendre ou supprimer tout compte en cas de non-respect des présentes CGU.`,
    },
    {
      titre: "Utilisation du service",
      contenu: (
        <>
          L’utilisateur s’engage à utiliser l’application de manière conforme
          aux lois en vigueur et à ne pas porter atteinte à l’ordre public, aux
          bonnes mœurs ou aux droits de tiers. <br /> Il est interdit notamment
          :
          <ul className='list-disc pl-5'>
            <li>
              de diffuser tout contenu illégal, injurieux, diffamatoire, ou
              incitant à la haine ;
            </li>
            <li>d'usurper l'identité d'une autre personne ;</li>
            <li>
              d’altérer ou perturber le bon fonctionnement de l'application.
            </li>
          </ul>
        </>
      ),
    },
    {
      titre: "Propriété intellectuelle",
      contenu: `Tous les éléments présents sur l’application, qu’ils soient visuels ou sonores, sont protégés par les lois sur la propriété intellectuelle. Sauf autorisation écrite, toute reproduction, modification ou diffusion est interdite.`,
    },
    {
      titre: "Données personnelles",
      contenu: `L'application est susceptible de collecter certaines données personnelles des utilisateurs (ex. : email, préférences, cookies). Ces données sont traitées conformément au RGPD. Pour plus d’informations, veuillez consulter notre Politique de confidentialité.`,
    },
    {
      titre: "Responsabilité",
      contenu: `L’éditeur met tout en œuvre pour assurer le bon fonctionnement de l'application, mais ne peut garantir une disponibilité constante ou l'absence de bugs. L’utilisateur utilise l’application à ses propres risques. L’éditeur ne peut être tenu responsable en cas de dommages directs ou indirects liés à l’utilisation ou à l’impossibilité d’utiliser l’application.`,
    },
    {
      titre: "Modification des CGU",
      contenu: `L’éditeur se réserve le droit de modifier les présentes CGU à tout moment. En cas de modification, les nouvelles CGU seront publiées sur l’application et applicables dès leur mise en ligne.`,
    },
    {
      titre: "Droit applicable et juridiction compétente",
      contenu: `Les présentes CGU sont soumises au droit français. En cas de litige, et à défaut de solution amiable, les tribunaux français seront compétents.`,
    },
  ],
};

export default function CGU() {
  const sections = CGU_CONTENT["fr"]; 

  return (
    <div className='flex flex-col items-center justify-center mt-12 px-56 gap-14 text-black dark:text-white bg-white dark:bg-black max-1100:px-32 max-md:px-16 max-sm:px-4 mb-10'>
      <h2 className='font-bold text-4xl text-center'>
        {sections[0]?.titre || "CGU"}
      </h2>
      <div className='flex flex-col gap-12 justify-center w-full'>
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className='font-bold text-2xl mb-5'>{section.titre}</h3>
            <p>{section.contenu}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
