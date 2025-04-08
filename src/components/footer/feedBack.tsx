import React from 'react';

const feedbackData = [
  {
    name: "Camille D.",
    message: "Une superbe boutique ! Les graines ont germé très vite et le service client est au top.",
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Julien M.",
    message: "J’ai trouvé des plantes que je ne voyais nulle part ailleurs. Expédition rapide et soignée.",
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Léa P.",
    message: "Très satisfaite de ma commande. Je recommande fortement !",
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Thomas G.",
    message: "Excellente qualité et service très réactif.",
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Sophie L.",
    message: "Une vraie découverte ! Livraison rapide et produits bien emballés.",
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Adrien F.",
    message: "Le site est clair, les produits sont top et les conseils utiles.",
    image: "https://via.placeholder.com/80"
  }
];

const FeedbackSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-medium text-yellow-500 font-pj">+2000 clients satisfaits</p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            Ce qu'ils pensent de nous
          </h2>
        </div>

        <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {feedbackData.map((feedback, index) => (
            <div
              key={index}
              className="bg-gray-500rounded-2xl p-6 shadow-md hover:shadow-yellow-500 hover:cursor-help flex flex-col items-start justify-between h-full"
            >
              <blockquote className="text-lg leading-relaxed mb-4">
                <span className="text-4xl text-green-500 font-serif">“</span>
                  {feedback.message}
                <span className="text-4xl text-green-500 font-serif">”</span>
              </blockquote>
              <div className="mt-4">
                <p className="text-xl font-bold">{feedback.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-block text-base font-semibold text-gray-900 border-b-2 border-gray-900 hover:border-gray-600 transition"
          >
            Voir tous les avis
          </a>
        </div>
      </div>
    </section>
  );
};

export { FeedbackSection };
