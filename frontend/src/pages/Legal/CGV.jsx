import React from "react";

const CGV_CONTENT = {
  fr: [
    {
      titre: "Conditions Générales de Vente (CGV)",
      contenu: `Les présentes Conditions Générales de Vente ont pour objet de définir les droits et obligations des parties dans le cadre de la vente de services accessibles via l’application [Nom de l’application]. En passant une commande, l’utilisateur accepte sans réserve les présentes CGV.`,
    },
    {
      titre: "Services proposés",
      contenu: `L’application [Nom de l’application] propose les services suivants : [Description des services, ex. : abonnement mensuel pour un accès premium, achats in-app, fonctionnalités supplémentaires…] [Détails sur les différents forfaits, tarifs, et options si applicables]. L’utilisateur peut choisir et payer pour ces services via l’application en fonction de l’offre choisie.`,
    },
    {
      titre: "Commande",
      contenu: `La commande s’effectue en ligne via l'interface de l’application. L’utilisateur choisit le service, entre ses informations de paiement et valide la commande. La commande est considérée comme ferme et définitive après validation du paiement. L’éditeur se réserve le droit de refuser toute commande en cas de doute sur l'identité de l'utilisateur ou en cas d'erreurs dans les informations fournies.`,
    },
    {
      titre: "Tarifs et modalités de paiement",
      contenu: `Les prix des services sont indiqués en [devise, ex. : EUR] et sont soumis à la TVA applicable. Les prix peuvent être modifiés à tout moment, mais les tarifs en vigueur au moment de la commande seront appliqués. Les paiements sont effectués par carte bancaire, PayPal, ou tout autre mode de paiement proposé sur l’application. L’utilisateur garantit qu’il est habilité à utiliser le moyen de paiement choisi.`,
    },
    {
      titre: "Facturation et abonnement",
      contenu: `L’abonnement aux services payants est facturé [mensuellement / annuellement] et sera renouvelé automatiquement sauf en cas d’annulation par l’utilisateur avant la date de renouvellement. Les informations de facturation seront fournies à l'utilisateur lors de la commande, et il recevra une facture détaillée après chaque paiement.`,
    },
    {
      titre: "Droit de rétractation",
      contenu: `Conformément aux lois en vigueur, l’utilisateur bénéficie d’un droit de rétractation de 14 jours à compter de la date de la commande, sauf si l'exécution du service a commencé avec l’accord exprès de l'utilisateur avant la fin du délai de rétractation. Pour exercer son droit de rétractation, l’utilisateur doit notifier sa décision à l’éditeur via [moyen de communication, ex. : email à l’adresse support@exemple.com].`,
    },
    {
      titre: "Suspension et résiliation",
      contenu: `L’éditeur se réserve le droit de suspendre ou résilier l’accès aux services en cas de non-paiement, d’abus ou de non-respect des présentes CGV. L’utilisateur peut résilier son abonnement à tout moment depuis son compte utilisateur. La résiliation sera effective à la fin de la période de facturation en cours.`,
    },
    {
      titre: "Responsabilité",
      contenu: `L’éditeur ne peut être tenu responsable des erreurs ou interruptions liées à l’utilisation des services, de la perte de données ou des dommages résultant d’une utilisation incorrecte des services par l’utilisateur. Les services sont fournis "tels quels" et l’éditeur ne garantit pas que les services répondront parfaitement aux attentes ou besoins spécifiques de l’utilisateur.`,
    },
    {
      titre: "Propriété intellectuelle",
      contenu: `Les contenus et services proposés sur l’application, y compris tous les éléments graphiques, textes, logos, et autres, sont protégés par la propriété intellectuelle. Toute reproduction ou utilisation des contenus sans autorisation expresse est interdite.`,
    },
    {
      titre: "Modification des CGV",
      contenu: `Les présentes CGV peuvent être modifiées à tout moment par l’éditeur. En cas de modification, une version mise à jour sera publiée sur l’application et sera applicable immédiatement.`,
    },
    {
      titre: "Droit applicable et juridiction compétente",
      contenu: `Les présentes CGV sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront compétents.`,
    },
    {
      titre: "Contact",
      contenu: `Pour toute question concernant ces CGV, vous pouvez nous contacter à l’adresse suivante : [Adresse email de contact] [Téléphone si nécessaire]`,
    },
  ],
};

export default function CGV() {
  const sections = CGV_CONTENT["fr"]; // Utilisation directe de "fr"

  return (
    <div className='flex flex-col items-center justify-center mt-12 px-56 gap-14 text-black dark:text-white bg-white dark:bg-black max-1100:px-32 max-md:px-16 max-sm:px-4 mb-10'>
      <h2 className='font-bold text-4xl text-center'>
        {sections[0]?.titre || "CGV"}
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
