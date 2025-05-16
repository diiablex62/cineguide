import React from "react";
import { useTranslation } from "react-i18next";

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
  en: [
    {
      titre: "Purpose",
      contenu: `These Terms of Use define the terms and conditions of access and use of the [Application Name] application by users. By accessing and/or using the application, you unreservedly accept these Terms of Use.`,
    },
    {
      titre: "Access to the service",
      contenu: `Access to the application is possible via a web browser at the following address: [Application URL]. The service is accessible free of charge to any user with Internet access. Some services may require the creation of a user account.`,
    },
    {
      titre: "Account creation",
      contenu: `The user may be required to create a personal account to access certain features. The user undertakes to provide accurate information when registering, to keep their credentials confidential, and not to impersonate a third party. The publisher reserves the right to suspend or delete any account in the event of non-compliance with these Terms of Use.`,
    },
    {
      titre: "Use of the service",
      contenu: (
        <>
          The user undertakes to use the application in accordance with the laws
          in force and not to infringe public order, morality or the rights of
          third parties. <br /> In particular, it is forbidden to:
          <ul className='list-disc pl-5'>
            <li>
              distribute any illegal, abusive, defamatory or hateful content;
            </li>
            <li>impersonate another person;</li>
            <li>alter or disrupt the proper functioning of the application.</li>
          </ul>
        </>
      ),
    },
    {
      titre: "Intellectual property",
      contenu: `All elements present on the application, whether visual or audio, are protected by intellectual property laws. Unless written permission is given, any reproduction, modification or distribution is prohibited.`,
    },
    {
      titre: "Personal data",
      contenu: `The application may collect certain personal data from users (e.g. email, preferences, cookies). This data is processed in accordance with the GDPR. For more information, please consult our Privacy Policy.`,
    },
    {
      titre: "Liability",
      contenu: `The publisher makes every effort to ensure the proper functioning of the application, but cannot guarantee constant availability or the absence of bugs. The user uses the application at their own risk. The publisher cannot be held liable for any direct or indirect damage related to the use or inability to use the application.`,
    },
    {
      titre: "Modification of the Terms of Use",
      contenu: `The publisher reserves the right to modify these Terms of Use at any time. In the event of modification, the new Terms of Use will be published on the application and will apply as soon as they are put online.`,
    },
    {
      titre: "Applicable law and jurisdiction",
      contenu: `These Terms of Use are governed by French law. In the event of a dispute, and in the absence of an amicable solution, the French courts shall have jurisdiction.`,
    },
  ],
  es: [
    {
      titre: "Propósito",
      contenu: `Estas Condiciones Generales de Uso tienen por objeto definir las modalidades y condiciones de acceso y uso de la aplicación [Nombre de la aplicación] por parte de los usuarios. Al acceder y/o utilizar la aplicación, usted acepta sin reservas estas CGU.`,
    },
    {
      titre: "Acceso al servicio",
      contenu: `El acceso a la aplicación es posible a través de un navegador web en la siguiente dirección: [URL de la aplicación]. El servicio es accesible gratuitamente para cualquier usuario con acceso a Internet. Algunos servicios pueden requerir la creación de una cuenta de usuario.`,
    },
    {
      titre: "Creación de la cuenta",
      contenu: `El usuario puede verse obligado a crear una cuenta personal para acceder a determinadas funciones. El usuario se compromete a facilitar información exacta al registrarse, a mantener la confidencialidad de sus credenciales y a no suplantar la identidad de terceros. El editor se reserva el derecho de suspender o eliminar cualquier cuenta en caso de incumplimiento de estas CGU.`,
    },
    {
      titre: "Uso del servicio",
      contenu: (
        <>
          El usuario se compromete a utilizar la aplicación de conformidad con
          la legislación vigente y a no atentar contra el orden público, la
          moral o los derechos de terceros. <br /> En particular, está
          prohibido:
          <ul className='list-disc pl-5'>
            <li>
              difundir cualquier contenido ilegal, abusivo, difamatorio o que
              incite al odio;
            </li>
            <li>suplantar la identidad de otra persona;</li>
            <li>
              alterar o perturbar el buen funcionamiento de la aplicación.
            </li>
          </ul>
        </>
      ),
    },
    {
      titre: "Propiedad intelectual",
      contenu: `Todos los elementos presentes en la aplicación, ya sean visuales o sonoros, están protegidos por las leyes de propiedad intelectual. Salvo autorización escrita, queda prohibida toda reproducción, modificación o difusión.`,
    },
    {
      titre: "Datos personales",
      contenu: `La aplicación puede recopilar determinados datos personales de los usuarios (por ejemplo, correo electrónico, preferencias, cookies). Estos datos se tratan de conformidad con el RGPD. Para más información, consulte nuestra Política de Privacidad.`,
    },
    {
      titre: "Responsabilidad",
      contenu: `El editor hace todo lo posible para garantizar el correcto funcionamiento de la aplicación, pero no puede garantizar una disponibilidad constante ni la ausencia de errores. El usuario utiliza la aplicación bajo su propia responsabilidad. El editor no se hace responsable de los daños directos o indirectos relacionados con el uso o la imposibilidad de uso de la aplicación.`,
    },
    {
      titre: "Modificación de las CGU",
      contenu: `El editor se reserva el derecho de modificar estas CGU en cualquier momento. En caso de modificación, las nuevas CGU se publicarán en la aplicación y serán aplicables desde su puesta en línea.`,
    },
    {
      titre: "Ley aplicable y jurisdicción competente",
      contenu: `Estas CGU se rigen por la legislación francesa. En caso de litigio, y a falta de solución amistosa, los tribunales franceses serán competentes.`,
    },
  ],
  de: [
    {
      titre: "Nutzungsbedingungen",
      contenu: `Diese Allgemeinen Nutzungsbedingungen regeln die Zugangs- und Nutzungsbedingungen der Anwendung [Name der Anwendung] durch die Nutzer. Durch den Zugriff auf und/oder die Nutzung der Anwendung akzeptieren Sie diese AGB uneingeschränkt.`,
    },
    {
      titre: "Zugang zum Dienst",
      contenu: `Der Zugang zur Anwendung ist über einen Webbrowser unter folgender Adresse möglich: [URL der Anwendung]. Der Dienst ist für jeden Nutzer mit Internetzugang kostenlos zugänglich. Einige Dienste können die Erstellung eines Benutzerkontos erfordern.`,
    },
    {
      titre: "Kontoerstellung",
      contenu: `Der Nutzer kann aufgefordert werden, ein persönliches Konto zu erstellen, um auf bestimmte Funktionen zugreifen zu können. Der Nutzer verpflichtet sich, bei der Registrierung genaue Angaben zu machen, seine Zugangsdaten vertraulich zu behandeln und sich nicht als Dritter auszugeben. Der Herausgeber behält sich das Recht vor, jedes Konto bei Nichteinhaltung dieser AGB zu sperren oder zu löschen.`,
    },
    {
      titre: "Nutzung des Dienstes",
      contenu: (
        <>
          Der Nutzer verpflichtet sich, die Anwendung in Übereinstimmung mit den
          geltenden Gesetzen zu nutzen und nicht gegen die öffentliche Ordnung,
          die guten Sitten oder die Rechte Dritter zu verstoßen. <br />{" "}
          Insbesondere ist es verboten:
          <ul className='list-disc pl-5'>
            <li>
              illegale, beleidigende, verleumderische oder zu Hass aufrufende
              Inhalte zu verbreiten;
            </li>
            <li>sich als eine andere Person auszugeben;</li>
            <li>
              den ordnungsgemäßen Betrieb der Anwendung zu beeinträchtigen oder
              zu stören.
            </li>
          </ul>
        </>
      ),
    },
    {
      titre: "Geistiges Eigentum",
      contenu: `Alle auf der Anwendung vorhandenen Elemente, ob visuell oder akustisch, sind durch das Urheberrecht geschützt. Ohne schriftliche Genehmigung ist jede Vervielfältigung, Änderung oder Verbreitung untersagt.`,
    },
    {
      titre: "Personenbezogene Daten",
      contenu: `Die Anwendung kann bestimmte personenbezogene Daten der Nutzer erheben (z. B. E-Mail, Präferenzen, Cookies). Diese Daten werden gemäß der DSGVO verarbeitet. Weitere Informationen finden Sie in unserer Datenschutzrichtlinie.`,
    },
    {
      titre: "Haftung",
      contenu: `Der Herausgeber bemüht sich, den ordnungsgemäßen Betrieb der Anwendung sicherzustellen, kann jedoch keine ständige Verfügbarkeit oder Fehlerfreiheit garantieren. Die Nutzung der Anwendung erfolgt auf eigenes Risiko des Nutzers. Der Herausgeber haftet nicht für direkte oder indirekte Schäden im Zusammenhang mit der Nutzung oder der Unmöglichkeit der Nutzung der Anwendung.`,
    },
    {
      titre: "Änderung der AGB",
      contenu: `Der Herausgeber behält sich das Recht vor, diese AGB jederzeit zu ändern. Im Falle einer Änderung werden die neuen AGB auf der Anwendung veröffentlicht und gelten ab ihrer Online-Stellung.`,
    },
    {
      titre: "Anwendbares Recht und Gerichtsstand",
      contenu: `Diese AGB unterliegen französischem Recht. Im Falle von Streitigkeiten und mangels gütlicher Einigung sind die französischen Gerichte zuständig.`,
    },
  ],
};

export default function CGU() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0] || "fr";
  const sections = CGU_CONTENT[lang] || CGU_CONTENT.fr;

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
