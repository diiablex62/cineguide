import React from "react";

export default function CGV() {
  return (
    <div className="flex flex-col items-center justify-center mt-12 px-56 gap-14 text-black dark:text-white max-1100:px-32 max-md:px-16 max-sm:px-4 mb-10">
      <h2 className="font-bold text-4xl text-center">
        Conditions Générales d'Utilisation (CGV)
      </h2>
      <div className="flex flex-col gap-12 justify-center w-full">
        <div>
          <h3 className="font-bold text-2xl mb-5">Objet</h3>
          <p>
            Les présentes Conditions Générales de Vente ont pour objet de
            définir les droits et obligations des parties dans le cadre de la
            vente de services accessibles via l’application [Nom de
            l’application]. <br />
            En passant une commande, l’utilisateur accepte sans réserve les
            présentes CGV.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Services proposés</h3>
          <p>
            L’application [Nom de l’application] propose les services suivants :
          </p>
          <ul className="list-disc pl-5">
            <li>
              [Description des services, ex. : abonnement mensuel pour un accès
              premium, achats in-app, fonctionnalités supplémentaires…]
            </li>
            <li>
              [Détails sur les différents forfaits, tarifs, et options si
              applicables].
            </li>
          </ul>
          <p>
            L’utilisateur peut choisir et payer pour ces services via
            l’application en fonction de l’offre choisie.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Commande</h3>
          <p>
            La commande s’effectue en ligne via l'interface de l’application.
            <br /> L’utilisateur choisit le service, entre ses informations de
            paiement et valide la commande. La commande est considérée comme
            ferme et définitive après validation du paiement. <br />
            L’éditeur se réserve le droit de refuser toute commande en cas de
            doute sur l'identité de l'utilisateur ou en cas d'erreurs dans les
            informations fournies.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">
            Tarifs et modalités de paiement
          </h3>
          <p>
            Les prix des services sont indiqués en [devise, ex. : EUR] et sont
            soumis à la TVA applicable. Les prix peuvent être modifiés à tout
            moment, mais les tarifs en vigueur au moment de la commande seront
            appliqués. <br />
            Les paiements sont effectués par carte bancaire, PayPal, ou tout
            autre mode de paiement proposé sur l’application. <br />
            L’utilisateur garantit qu’il est habilité à utiliser le moyen de
            paiement choisi.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Facturation et abonnement</h3>
          <p>
            L’abonnement aux services payants est facturé [mensuellement /
            annuellement] et sera renouvelé automatiquement sauf en cas
            d’annulation par l’utilisateur avant la date de renouvellement.
            <br /> Les informations de facturation seront fournies à
            l'utilisateur lors de la commande, et il recevra une facture
            détaillée après chaque paiement.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Droit de rétractation</h3>
          <p>
            Conformément aux lois en vigueur, l’utilisateur bénéficie d’un droit
            de rétractation de 14 jours à compter de la date de la commande,
            sauf si l'exécution du service a commencé avec l’accord exprès de
            l'utilisateur avant la fin du délai de rétractation. <br />
            Pour exercer son droit de rétractation, l’utilisateur doit notifier
            sa décision à l’éditeur via [moyen de communication, ex. : email à
            l’adresse support@exemple.com].
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Suspension et résiliation</h3>
          <p>
            L’éditeur se réserve le droit de suspendre ou résilier l’accès aux
            services en cas de non-paiement, d’abus ou de non-respect des
            présentes CGV. <br />
            L’utilisateur peut résilier son abonnement à tout moment depuis son
            compte utilisateur. La résiliation sera effective à la fin de la
            période de facturation en cours.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Responsabilité</h3>
          <p>
            L’éditeur ne peut être tenu responsable des erreurs ou interruptions
            liées à l’utilisation des services, de la perte de données ou des
            dommages résultant d’une utilisation incorrecte des services par
            l’utilisateur. <br />
            Les services sont fournis "tels quels" et l’éditeur ne garantit pas
            que les services répondront parfaitement aux attentes ou besoins
            spécifiques de l’utilisateur.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Propriété intellectuelle</h3>
          <p>
            Les contenus et services proposés sur l’application, y compris tous
            les éléments graphiques, textes, logos, et autres, sont protégés par
            la propriété intellectuelle. <br /> Toute reproduction ou
            utilisation des contenus sans autorisation expresse est interdite.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Modification des CGV</h3>
          <p>
            Les présentes CGV peuvent être modifiées à tout moment par
            l’éditeur. En cas de modification, une version mise à jour sera
            publiée sur l’application et sera applicable immédiatement.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">
            Droit applicable et juridiction compétente
          </h3>
          <p>
            Les présentes CGV sont régies par le droit français. <br /> En cas
            de litige, et après tentative de résolution amiable, les tribunaux
            français seront compétents.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-2xl mb-5">Contact</h3>
          <p>
            Pour toute question concernant ces CGV, vous pouvez nous contacter à
            l’adresse suivante : <br /> [Adresse email de contact] <br />{" "}
            [Téléphone si nécessaire]
          </p>
        </div>
      </div>
    </div>
  );
}
