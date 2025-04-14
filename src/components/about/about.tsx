import { FaHistory, FaSeedling, FaBullseye } from 'react-icons/fa';
import QGImage from '@/assets/batiment.png';
import Seed from '@/assets/seed.jpg';
import { motion } from 'framer-motion';
import Tree from '@/assets/tree.jpg';

const posts = [
  {
    image: QGImage,
    title: 'Une mission enracinée dans l’histoire',
    icon: <FaHistory className="text-green-700 text-3xl" />,
    description:
      'Créé en 2004, le Silo National des Graines Forestières (SNGF) a pour objectif de préserver les ressources génétiques forestières de Madagascar. Sous la présidence de Madame Sahondra RAZANAMAHASOA, le SNGF œuvre au service de l’environnement et du développement durable.',
  },
  {
    image: Seed,
    title: 'Des semences et plants de qualité',
    icon: <FaSeedling className="text-green-700 text-3xl" />,
    description:
      'Le SNGF met à disposition du public des graines forestières certifiées, adaptées aux différentes régions écologiques de Madagascar, favorisant ainsi la reforestation durable.',
  },
  {
    image: Tree,
    title: 'Objectif principal',
    icon: <FaBullseye className="text-green-700 text-3xl" />,
    description:
      'Promouvoir la gestion durable des ressources forestières en fournissant des semences de haute qualité, issues de sources identifiées et contrôlées.',
  },
];

const OrgChart = () => (
  <div className="mt-12">
    <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Organigramme du SNGF</h2>
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <div className="bg-green-100 p-4 rounded-xl shadow-md">
          <p className="text-lg font-bold">Présidente</p>
          <p>Madame Sahondra RAZANAMAHASOA</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="bg-green-50 p-4 rounded-xl shadow-md text-center w-64">
          <p className="font-semibold">Directeur Général</p>
          <p>Nom à définir</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl shadow-md text-center w-64">
          <p className="font-semibold">Services Techniques</p>
          <p>Collecte, traitement, certification des semences...</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl shadow-md text-center w-64">
          <p className="font-semibold">Services Administratifs</p>
          <p>Ressources humaines, finances, logistique...</p>
        </div>
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="max-w-screen mt-16 h-screen mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-800">Qui sommes-nous ?</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              {post.icon}
              <h3 className="text-xl font-semibold text-green-800">{post.title}</h3>
            </div>
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-xl mb-4" />
            <p className="text-gray-700 text-sm">{post.description}</p>
          </motion.div>
        ))}
      </div>
      <OrgChart />
    </div>
  );
};

export { About };
