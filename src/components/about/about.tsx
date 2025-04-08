import React from 'react';
import QGImage from '@/assets/batiment.png';
import Tree from '@/assets/tree.jpg';
import Seed from '@/assets/seed.jpg';

const posts = [
  {
    image: QGImage,
    title: 'Une mission enracinée dans l’histoire',
    description:
      'Créé en 2004, le Silo National des Graines Forestières (SNGF) a pour objectif de préserver les ressources génétiques forestières de Madagascar. Sous la présidence de Madame Sahondra RAZANAMAHASOA, le SNGF œuvre au service de l’environnement et du développement durable.',
  },
  {
    image: Seed,
    title: 'Des semences et plants de qualité',
    description:
      'Le SNGF met à disposition du public des graines forestières certifiées, adaptées aux différentes régions climatiques de Madagascar. Des jeunes plants d’espèces natives et exotiques sont également disponibles pour les particuliers, les ONG et les projets de reboisement.',
  },
  {
    image: Tree,
    title: 'Une diversité d’activités au cœur de la forêt',
    description:
      'Outre la conservation des semences, le SNGF mène des recherches scientifiques, appuie les campagnes de reboisement, forme les acteurs du secteur et sensibilise à la gestion durable des ressources forestières.',
  },
];

const About: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white py-24 sm:py-32 px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-[var(--base-green)] sm:text-5xl">
          SNGF, C'est Quoi?
        </h2>
        <p className="mt-4 text-lg text-[var(--base-green)]">
          Découvrez le rôle essentiel du Silo National des Graines Forestières dans la préservation, la valorisation et la diffusion des semences forestières à Madagascar.
        </p>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {post.title}
              </h3>
              <p className="mt-2 text-gray-700">
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { About };
