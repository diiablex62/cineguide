import React, { useState, useEffect } from "react";

export default function ActualiteDetail() {
  const [likes, setLikes] = useState(null); 

  useEffect(() => {
    const storedLikes = localStorage.getItem("j'aime");
    if (storedLikes) {
      setLikes(parseInt(storedLikes, 10)); 
    } else {
      setLikes(0); 
    }
  }, []);

  const handleLike = () => {
    const newLikes = (likes || 0) + 1; 
    setLikes(newLikes);
    localStorage.setItem("j'aime", newLikes); 
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-white dark:bg-black'>
      <div className='w-full md:w-[50%] p-6'>
        <p className='text-sm text-[var(--color-fuchsia)] font-bold uppercase mb-2'>
          FILMS
        </p>
        <h2 className='text-2xl font-bold text-black mb-4 dark:text-gray-200'>
          Avengers Doomsday : fausse bonne nouvelle pour le retour de ce X-Men ?
        </h2>
        <img
          src='https://www.geoado.com/wp-content/uploads/2016/05/x-men-apocalypse-x-men-apocalypse-955886.jpg'
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
        <div className='mt-8'>
          <div className='flex gap-4 mb-6'>
            <button className='px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm'>
              Avengers
            </button>
            <button className='px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm'>
              Marvel
            </button>
            <button className='px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm'>
              Marvel Studios
            </button>
            <button className='px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm'>
              X-men
            </button>
          </div>
          <div className='flex gap-4 mb-6'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded text-sm'>
              Sur Twitter
            </button>
            <button className='px-4 py-2 bg-blue-700 text-white rounded text-sm'>
              Sur Facebook
            </button>
            <button className='px-4 py-2 bg-pink-500 text-white rounded text-sm'>
              Commenter
            </button>
          </div>
          <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200 mb-4'>
            Vous aimerez aussi
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='relative'>
              <img
                src='https://leclaireur.fnac.com/wp-content/uploads/2024/06/avengers-film.jpg'
                alt='Avengers 5'
                className='w-full h-auto rounded-lg'
              />

              <p className='text-sm font-bold text-gray-800 dark:text-white mt-2'>
                Avengers 5 : Kevin Feige en dit plus sur l'histoire et les ...
              </p>
            </div>
            <div className='relative'>
              <img
                src='https://ozzak.fr/media/cache/lcp_image_ext/uploads/va_HQD_6_Dmq0ty_Q6k2r_Co_Ic_Q1s_Hmu_37d6f3c5c4.webp'
                alt='Spider-Man 4'
                className='w-full h-auto rounded-lg'
              />

              <p className='text-sm font-bold text-gray-800 dark:text-white mt-2'>
                Spider-Man 4 dévoile son titre et ça donne déjà des indices sur
                le ...
              </p>
            </div>
            <div className='relative'>
              <img
                src='https://www.numerama.com/wp-content/uploads/2024/07/gtjafg-agaa2bpd.jpeg'
                alt='Avengers Doomsday'
                className='w-full h-auto rounded-lg'
              />

              <p className='text-sm font-bold text-gray-800 dark:text-white mt-2'>
                Avengers Doomsday : le rôle secret de Loki, qui pourrait
                redéfinir le ...
              </p>
            </div>
          </div>
          <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200 mt-8'>
            Commentaires
          </h3>
          <div className='w-16 h-1 bg-[var(--color-fuchsia)] mb-4'></div>{" "}
          <div className='mt-4'>
            <div className='flex items-start gap-4'>
              <img
                src='https://images.pexels.com/photos/15260634/pexels-photo-15260634/free-photo-of-sable-desert-animal-chameau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                alt='User avatar'
                className='w-12 h-12 rounded-full'
              />
              <div className='flex-1'>
                <p className='text-sm font-bold text-gray-800 dark:text-white'>
                  Roger
                  <span className='text-xs text-gray-500 ml-2'>
                    il y a 5 minutes
                  </span>
                </p>
                <p className='text-sm text-gray-800 dark:text-gray-200'>
                  Vu le casting, je mise sur un budget pharaonique,
                  essentiellement destiné aux salaires, et des économies de
                  bouts de chandelles sur les costumes et FX...
                </p>
              </div>
            </div>
            <div className='flex justify-end mt-2'>
              <div className='flex items-center gap-2'>
                <button
                  onClick={handleLike} 
                  className='flex items-center justify-center w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 122.88 104.19'
                    className='w-4 h-4 text-[var(--color-fuchsia)]'
                    fill='currentColor'>
                    <path d='M62.63,6.25c0.56-2.85,2.03-4.68,4.04-5.61c1.63-0.76,3.54-0.83,5.52-0.31c1.72,0.45,3.53,1.37,5.26,2.69 c4.69,3.57,9.08,10.3,9.64,18.71c0.17,2.59,0.12,5.35-0.12,8.29c-0.16,1.94-0.41,3.98-0.75,6.1h19.95l0.09,0.01 c3.24,0.13,6.38,0.92,9.03,2.3c2.29,1.2,4.22,2.84,5.56,4.88c1.38,2.1,2.13,4.6,2.02,7.46c-0.08,2.12-0.65,4.42-1.81,6.87 c0.66,2.76,0.97,5.72,0.54,8.32c-0.36,2.21-1.22,4.17-2.76,5.63c0.08,3.65-0.41,6.71-1.39,9.36c-1.01,2.72-2.52,4.98-4.46,6.98 c-0.17,1.75-0.45,3.42-0.89,4.98c-0.55,1.96-1.36,3.76-2.49,5.35l0,0c-3.4,4.8-6.12,4.69-10.43,4.51c-0.6-0.02-1.24-0.05-2.24-0.05 l-39.03,0c-3.51,0-6.27-0.51-8.79-1.77c-2.49-1.25-4.62-3.17-6.89-6.01l-0.58-1.66V47.78l1.98-0.53 c5.03-1.36,8.99-5.66,12.07-10.81c3.16-5.3,5.38-11.5,6.9-16.51V6.76L62.63,6.25L62.63,6.25L62.63,6.25z M4,43.02h29.08 c2.2,0,4,1.8,4,4v53.17c0,2.2-1.8,4-4,4l-29.08,0c-2.2,0-4-1.8-4-4V47.02C0,44.82,1.8,43.02,4,43.02L4,43.02L4,43.02z M68.9,5.48 c-0.43,0.2-0.78,0.7-0.99,1.56V20.3l-0.12,0.76c-1.61,5.37-4.01,12.17-7.55,18.1c-3.33,5.57-7.65,10.36-13.27,12.57v40.61 c1.54,1.83,2.96,3.07,4.52,3.85c1.72,0.86,3.74,1.2,6.42,1.2l39.03,0c0.7,0,1.6,0.04,2.45,0.07c2.56,0.1,4.17,0.17,5.9-2.27v-0.01 c0.75-1.06,1.3-2.31,1.69-3.71c0.42-1.49,0.67-3.15,0.79-4.92l0.82-1.75c1.72-1.63,3.03-3.46,3.87-5.71 c0.86-2.32,1.23-5.11,1.02-8.61l-0.09-1.58l1.34-0.83c0.92-0.57,1.42-1.65,1.63-2.97c0.34-2.1-0.02-4.67-0.67-7.06l0.21-1.93 c1.08-2.07,1.6-3.92,1.67-5.54c0.06-1.68-0.37-3.14-1.17-4.35c-0.84-1.27-2.07-2.31-3.56-3.09c-1.92-1.01-4.24-1.59-6.66-1.69v0.01 l-26.32,0l0.59-3.15c0.57-3.05,0.98-5.96,1.22-8.72c0.23-2.7,0.27-5.21,0.12-7.49c-0.45-6.72-3.89-12.04-7.56-14.83 c-1.17-0.89-2.33-1.5-3.38-1.77C70.04,5.27,69.38,5.26,68.9,5.48L68.9,5.48L68.9,5.48z' />
                  </svg>
                </button>
                {likes !== null && ( 
                  <span className='text-sm text-gray-800 dark:text-gray-200'>
                    {likes}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
