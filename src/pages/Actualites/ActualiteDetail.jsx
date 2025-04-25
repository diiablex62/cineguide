import React from "react";

export default function ActualiteDetail() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-white dark:bg-black'>
      <div className='w-full md:w-[50%] p-6'>
        <p className='text-sm text-[var(--color-fuchsia)] font-bold uppercase mb-2'>
          FILMS
        </p>
        <h2 className='text-2xl font-bold text-black mb-4 dark:text-gray-200 mb-4'>
          Avengers Doomsday : fausse bonne nouvelle pour le retour de ce X-Men ?
        </h2>
        <img
          src='https://www.ecranlarge.com/content/uploads/2025/04/avengers-doomsday-fausse-bonne-nouvelle-pour-le-retour-de-ce-x-men--1260x708.jpg.webp'
          alt='Avengers Doomsday'
          className='w-full h-auto rounded-lg mb-4'
        />
        <p className='text-sm text-gray-500 mb-4'>
          Marvel fait miroiter un retour aux sources pour ses mutants avec leur
          arrivée dans <strong>Avengers : Doomsday</strong>, mais leur arrivée
          pose de nombreuses questions.
        </p>
        <p className='text-base text-gray-800 dark:text-gray-200 mb-4'>
          Avec <strong>Avengers Doomsday</strong>, Marvel Studios ouvrira un peu
          plus les portes du Multivers avec les mutants les plus célèbres du
          grand écran : les X-Men. Un mariage attendu depuis l'acquisition de la
          Fox par Disney, qui se concrétise enfin après des années de promesses
          molles et de rendez-vous creux. Un retour en bonne et due forme des
          icônes de la Fox sur l'échiquier Marvel révélé lors de l'annonce d'une
          grande partie du casting d'<strong>Avengers : Doomsday</strong>.
        </p>
        <p className='text-base text-gray-800 dark:text-gray-200 mb-4'>
          Cette rencontre, présentée comme l'apothéose d'une phase
          brinquebalante, que l'on espère être le premier pas vers un crossover
          mythique de Marvel, a pour mission de ranimer la flamme vacillante
          d'un Multivers à bout de souffle. À travers une poignée de personnages
          soigneusement choisis, Marvel espère raviver la mémoire affective de
          son public, comme si une réédition de VHS usée pour raviver un peu de
          magie.
        </p>
        <p className='text-base text-gray-800 dark:text-gray-200 mb-4'>
          Mais entre ambition industrielle et recyclage émotionnel, on craint
          que certains personnages ne pâtissent de décisions artistiques
          douteuses, à commencer par l'un des personnages qui fait partie des
          plus aimés des fans des X-Men : Diablo (ou Nightcrawler pour les
          puristes anglophones).
        </p>
        <div className='bg-[var(--color-fuchsia)] text-white text-sm font-bold uppercase px-4 py-2 rounded mb-4'>
          À lire aussi
        </div>
        <a
          href='#'
          className='text-[var(--color-fuchsia)] text-lg font-bold hover:underline mb-4 block'>
          Avengers 5 : pourquoi la relation entre ces deux super-héros pourrait
          tout changer pour Marvel ?
        </a>

        <p className='text-sm text-gray-500 italic mb-4'>
          Un plan qui semble tout droit sorti du Dracula de Coppola
        </p>
        <h3 className='text-xl font-bold text-gray-800 dark:text-gray-200 mb-4'>
          Avengers Doomsday : Le Diablo dans les détails
        </h3>
        <p className='text-base text-gray-800 dark:text-gray-200 mb-4'>
          Invité sur le plateau de l'émission{" "}
          <strong>Today with Jenna & Friends</strong>, Alan Cumming a confirmé
          qu'il reprendrait bien le rôle de Kurt à Diablo Wagner dans{" "}
          <strong>Avengers Doomsday</strong>. L'acteur a précisé que Diablo ne
          sera pas recréé par des équipes numériques, mais par un maquillage
          artisanal, dans la veine de celui qui avait valu à l'équipe maquillage
          de <strong>X-Men 2</strong> des migraines carabinées. Cumming
          retrouvera les affres de la pose de prothèses, des heures de patience
          et d'immobilité, pour redonner vie au mutant :
        </p>
        <blockquote className='border-l-4 border-[var(--color-fuchsia)] pl-4 italic text-gray-800 dark:text-gray-200 mb-4'>
          « J'avais déjà fait des essais de maquillage. En fait, ce qui est
          génial, c'est que c'était quatre heures et demie à cinq heures avant,
          et maintenant c'est 90 minutes. Avant, tous les tatouages étaient
          faits à la main parce qu'ils n'avaient pas décidé avant le début du
          tournage et maintenant il y a toutes ces petites choses que si
          seulement ça change la donne. »
        </blockquote>
      </div>
    </div>
  );
}
