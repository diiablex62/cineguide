import React from "react";
import { useTranslation } from "react-i18next";

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
  en: [
    {
      titre: "General Terms and Conditions of Sale (GTC)",
      contenu: `These General Terms and Conditions of Sale define the rights and obligations of the parties in the context of the sale of services accessible via the [Application Name] application. By placing an order, the user unreservedly accepts these Terms and Conditions.`,
    },
    {
      titre: "Services offered",
      contenu: `The [Application Name] application offers the following services: [Description of services, e.g. monthly subscription for premium access, in-app purchases, additional features...] [Details of the different packages, prices, and options if applicable]. The user can choose and pay for these services via the application according to the chosen offer.`,
    },
    {
      titre: "Order",
      contenu: `Orders are placed online via the application's interface. The user selects the service, enters payment information and confirms the order. The order is considered firm and final after payment has been validated. The publisher reserves the right to refuse any order if there is doubt about the user's identity or errors in the information provided.`,
    },
    {
      titre: "Prices and payment methods",
      contenu: `Service prices are quoted in [currency, e.g. EUR] and are subject to applicable VAT. Prices may be changed at any time, but the rates in force at the time of the order will apply. Payments are made by credit card, PayPal, or any other payment method offered on the application. The user guarantees that he/she is authorized to use the chosen means of payment.`,
    },
    {
      titre: "Billing and subscription",
      contenu: `Subscriptions to paid services are billed [monthly / annually] and will be renewed automatically unless cancelled by the user before the renewal date. Billing information will be provided to the user at the time of order, and a detailed invoice will be sent after each payment.`,
    },
    {
      titre: "Right of withdrawal",
      contenu: `In accordance with current legislation, the user has a right of withdrawal of 14 days from the date of the order, unless the service has begun with the user's express consent before the end of the withdrawal period. To exercise the right of withdrawal, the user must notify the publisher via [means of communication, e.g. email to support@example.com].`,
    },
    {
      titre: "Suspension and termination",
      contenu: `The publisher reserves the right to suspend or terminate access to the services in the event of non-payment, abuse or non-compliance with these Terms and Conditions. The user may terminate his/her subscription at any time from his/her user account. Termination will take effect at the end of the current billing period.`,
    },
    {
      titre: "Liability",
      contenu: `The publisher cannot be held liable for errors or interruptions related to the use of the services, loss of data or damage resulting from incorrect use of the services by the user. The services are provided "as is" and the publisher does not guarantee that the services will fully meet the user's expectations or specific needs.`,
    },
    {
      titre: "Intellectual property",
      contenu: `The content and services offered on the application, including all graphics, texts, logos and others, are protected by intellectual property rights. Any reproduction or use of the content without express authorization is prohibited.`,
    },
    {
      titre: "Modification of the Terms and Conditions",
      contenu: `These Terms and Conditions may be modified at any time by the publisher. In the event of modification, an updated version will be published on the application and will apply immediately.`,
    },
    {
      titre: "Applicable law and jurisdiction",
      contenu: `These Terms and Conditions are governed by French law. In the event of a dispute, and after an attempt at amicable resolution, the French courts shall have jurisdiction.`,
    },
    {
      titre: "Contact",
      contenu: `For any questions regarding these Terms and Conditions, you can contact us at: [Contact email address] [Phone number if necessary]`,
    },
  ],
  es: [
    {
      titre: "Condiciones Generales de Venta (CGV)",
      contenu: `Estas Condiciones Generales de Venta tienen por objeto definir los derechos y obligaciones de las partes en el marco de la venta de servicios accesibles a través de la aplicación [Nombre de la aplicación]. Al realizar un pedido, el usuario acepta sin reservas estas CGV.`,
    },
    {
      titre: "Servicios ofrecidos",
      contenu: `La aplicación [Nombre de la aplicación] ofrece los siguientes servicios: [Descripción de los servicios, por ejemplo: suscripción mensual para acceso premium, compras in-app, funciones adicionales...] [Detalles sobre los diferentes paquetes, tarifas y opciones si corresponde]. El usuario puede elegir y pagar estos servicios a través de la aplicación según la oferta elegida.`,
    },
    {
      titre: "Pedido",
      contenu: `El pedido se realiza en línea a través de la interfaz de la aplicación. El usuario elige el servicio, introduce la información de pago y valida el pedido. El pedido se considera firme y definitivo tras la validación del pago. El editor se reserva el derecho de rechazar cualquier pedido en caso de duda sobre la identidad del usuario o en caso de errores en la información proporcionada.`,
    },
    {
      titre: "Precios y métodos de pago",
      contenu: `Los precios de los servicios se indican en [moneda, por ejemplo: EUR] y están sujetos al IVA aplicable. Los precios pueden modificarse en cualquier momento, pero se aplicarán las tarifas vigentes en el momento del pedido. Los pagos se realizan mediante tarjeta bancaria, PayPal u otro método de pago ofrecido en la aplicación. El usuario garantiza que está autorizado a utilizar el medio de pago elegido.`,
    },
    {
      titre: "Facturación y suscripción",
      contenu: `La suscripción a los servicios de pago se factura [mensualmente / anualmente] y se renovará automáticamente salvo cancelación por parte del usuario antes de la fecha de renovación. La información de facturación se proporcionará al usuario en el momento del pedido y recibirá una factura detallada después de cada pago.`,
    },
    {
      titre: "Derecho de desistimiento",
      contenu: `De acuerdo con la legislación vigente, el usuario dispone de un derecho de desistimiento de 14 días a partir de la fecha del pedido, salvo que la ejecución del servicio haya comenzado con el consentimiento expreso del usuario antes de que finalice el plazo de desistimiento. Para ejercer su derecho de desistimiento, el usuario debe notificar su decisión al editor a través de [medio de comunicación, por ejemplo: correo electrónico a support@ejemplo.com].`,
    },
    {
      titre: "Suspensión y rescisión",
      contenu: `El editor se reserva el derecho de suspender o rescindir el acceso a los servicios en caso de impago, abuso o incumplimiento de estas CGV. El usuario puede cancelar su suscripción en cualquier momento desde su cuenta de usuario. La rescisión será efectiva al final del período de facturación en curso.`,
    },
    {
      titre: "Responsabilidad",
      contenido: `El editor no se hace responsable de los errores o interrupciones relacionados con el uso de los servicios, la pérdida de datos o los daños resultantes de un uso incorrecto de los servicios por parte del usuario. Los servicios se proporcionan "tal cual" y el editor no garantiza que los servicios satisfagan perfectamente las expectativas o necesidades específicas del usuario.`,
    },
    {
      titre: "Propiedad intelectual",
      contenido: `Los contenidos y servicios ofrecidos en la aplicación, incluidos todos los elementos gráficos, textos, logotipos y otros, están protegidos por la propiedad intelectual. Cualquier reproducción o uso de los contenidos sin autorización expresa está prohibido.`,
    },
    {
      titre: "Modificación de las CGV",
      contenido: `Estas CGV pueden ser modificadas en cualquier momento por el editor. En caso de modificación, se publicará una versión actualizada en la aplicación y será aplicable inmediatamente.`,
    },
    {
      titre: "Ley aplicable y jurisdicción competente",
      contenido: `Estas CGV se rigen por la legislación francesa. En caso de litigio, y tras un intento de resolución amistosa, los tribunales franceses serán competentes.`,
    },
    {
      titre: "Contacto",
      contenido: `Para cualquier pregunta sobre estas CGV, puede ponerse en contacto con nosotros en: [Dirección de correo electrónico de contacto] [Teléfono si es necesario]`,
    },
  ],
  de: [
    {
      titre: " Allgemeine Verkaufsbedingungen (AGB)",
      contenu: `Diese Allgemeinen Verkaufsbedingungen regeln die Rechte und Pflichten der Parteien im Rahmen des Verkaufs von über die Anwendung [Name der Anwendung] zugänglichen Dienstleistungen. Mit der Aufgabe einer Bestellung akzeptiert der Nutzer diese AGB vorbehaltlos.`,
    },
    {
      titre: "Angebotene Dienstleistungen",
      contenu: `Die Anwendung [Name der Anwendung] bietet folgende Dienstleistungen an: [Beschreibung der Dienstleistungen, z. B. monatliches Abonnement für Premium-Zugang, In-App-Käufe, zusätzliche Funktionen...] [Details zu den verschiedenen Paketen, Tarifen und Optionen, falls zutreffend]. Der Nutzer kann diese Dienstleistungen über die Anwendung entsprechend dem gewählten Angebot auswählen und bezahlen.`,
    },
    {
      titre: "Bestellung",
      contenu: `Die Bestellung erfolgt online über die Benutzeroberfläche der Anwendung. Der Nutzer wählt die Dienstleistung aus, gibt seine Zahlungsinformationen ein und bestätigt die Bestellung. Die Bestellung gilt nach Bestätigung der Zahlung als verbindlich und endgültig. Der Herausgeber behält sich das Recht vor, jede Bestellung abzulehnen, wenn Zweifel an der Identität des Nutzers bestehen oder Fehler in den angegebenen Informationen vorliegen.`,
    },
    {
      titre: "Preise und Zahlungsmodalitäten",
      contenu: `Die Preise für die Dienstleistungen werden in [Währung, z. B. EUR] angegeben und unterliegen der geltenden Mehrwertsteuer. Die Preise können jederzeit geändert werden, aber die zum Zeitpunkt der Bestellung gültigen Tarife werden angewendet. Die Zahlungen erfolgen per Kreditkarte, PayPal oder einer anderen auf der Anwendung angebotenen Zahlungsmethode. Der Nutzer garantiert, dass er berechtigt ist, das gewählte Zahlungsmittel zu verwenden.`,
    },
    {
      titre: "Abrechnung und Abonnement",
      contenu: `Das Abonnement für kostenpflichtige Dienstleistungen wird [monatlich / jährlich] abgerechnet und verlängert sich automatisch, sofern der Nutzer nicht vor dem Verlängerungsdatum kündigt. Die Abrechnungsinformationen werden dem Nutzer bei der Bestellung mitgeteilt, und er erhält nach jeder Zahlung eine detaillierte Rechnung.`,
    },
    {
      titre: "Widerrufsrecht",
      contenu: `Gemäß den geltenden Gesetzen hat der Nutzer ein Widerrufsrecht von 14 Tagen ab dem Datum der Bestellung, es sei denn, die Ausführung der Dienstleistung hat mit ausdrücklicher Zustimmung des Nutzers vor Ablauf der Widerrufsfrist begonnen. Um das Widerrufsrecht auszuüben, muss der Nutzer seine Entscheidung dem Herausgeber über [Kommunikationsmittel, z. B. E-Mail an support@beispiel.com] mitteilen.`,
    },
    {
      titre: "Sperrung und Kündigung",
      contenu: `Der Herausgeber behält sich das Recht vor, den Zugang zu den Dienstleistungen im Falle von Nichtzahlung, Missbrauch oder Nichteinhaltung dieser AGB zu sperren oder zu kündigen. Der Nutzer kann sein Abonnement jederzeit über sein Benutzerkonto kündigen. Die Kündigung wird am Ende des laufenden Abrechnungszeitraums wirksam.`,
    },
    {
      titre: "Haftung",
      contenu: `Der Herausgeber haftet nicht für Fehler oder Unterbrechungen im Zusammenhang mit der Nutzung der Dienstleistungen, für Datenverluste oder für Schäden, die durch unsachgemäße Nutzung der Dienstleistungen durch den Nutzer entstehen. Die Dienstleistungen werden "wie besehen" bereitgestellt, und der Herausgeber übernimmt keine Garantie dafür, dass die Dienstleistungen den Erwartungen oder spezifischen Bedürfnissen des Nutzers vollständig entsprechen.`,
    },
    {
      titre: "Geistiges Eigentum",
      contenu: `Die auf der Anwendung angebotenen Inhalte und Dienstleistungen, einschließlich aller Grafiken, Texte, Logos und anderer Elemente, sind durch geistige Eigentumsrechte geschützt. Jede Vervielfältigung oder Nutzung der Inhalte ohne ausdrückliche Genehmigung ist untersagt.`,
    },
    {
      titre: "Änderung der AGB",
      contenu: `Diese AGB können vom Herausgeber jederzeit geändert werden. Im Falle einer Änderung wird eine aktualisierte Version auf der Anwendung veröffentlicht und gilt sofort.`,
    },
    {
      titre: "Anwendbares Recht und Gerichtsstand",
      contenu: `Diese AGB unterliegen französischem Recht. Im Falle von Streitigkeiten und nach dem Versuch einer gütlichen Einigung sind die französischen Gerichte zuständig.`,
    },
    {
      titre: "Kontakt",
      contenu: `Für Fragen zu diesen AGB können Sie uns unter folgender Adresse kontaktieren: [Kontakt-E-Mail-Adresse] [Telefonnummer falls erforderlich]`,
    },
  ],
};

export default function CGV() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0] || "fr";
  const sections = CGV_CONTENT[lang] || CGV_CONTENT.fr;

  return (
    <div className='flex flex-col items-center justify-center mt-12 px-56 gap-14 text-black dark:text-white max-1100:px-32 max-md:px-16 max-sm:px-4 mb-10'>
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
