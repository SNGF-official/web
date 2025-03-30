import React from 'react';
import QGImage from '@/assets/batiment.png';
import Tree from '@/assets/tree.jpg';
import Seed from '@/assets/seed.jpg';

const posts = [
  {
    image: QGImage,
    date: 'Mar 16, 2020',
    category: 'Marketing',
    title: 'Boost your conversion rate',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo.',
    author: 'Michael Foster',
    role: 'Co-Founder / CTO',
  },
  {
    image: Tree,
    date: 'Mar 10, 2020',
    category: 'Sales',
    title: 'How to use search engine optimization to drive sales',
    description:
      'Optio cum necessitatibus dolor voluptatem provident commodi et. Qui aperiam fugiat nemo cumque.',
    author: 'Lindsay Walton',
    role: 'Front-end Developer',
  },
  {
    image: Seed,
    date: 'Feb 12, 2020',
    category: 'Business',
    title: 'Improve your customer experience',
    description:
      'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas libero adipisci rem et corporis.',
    author: 'Tom Cook',
    role: 'Director of Product',
  },
];

const About: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[var(--base-green)] py-24 sm:py-32 px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-white sm:text-5xl">
          SNGF, C'est Quoi?
        </h2>
        <p className="mt-4 text-lg text-white">
          Vous trouverez ici ce que vous recherchez en matière de graine et
          d'arbre de n'importe quel espèce
        </p>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg object-fill overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-60 max-h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {post.title}
              </h3>
              <p className="mt-2 text-gray-700">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { About };
