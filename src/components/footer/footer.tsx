import React from 'react';
import FooterLogoImage from '@/assets/logo.png';

const footerSections = [
  {
    title: 'Produits',
    links: ['Plantes rares', 'Graines bio', 'Accessoires'],
  },
  {
    title: 'À propos',
    links: ['Notre histoire', 'Équipe', 'FAQ'],
  },
  {
    title: 'Services',
    links: ['Conseils jardinage', 'Abonnement plantes', 'Livraison Express'],
  },
];

const Footer: React.FC = () => {
  return (
    <section className="left-20 px-5 relative w-full flex items-center justify-center sm:pb-16 lg:pb-20 xl:pb-40 overflow-hidden">
      <div className="px-4 mx-auto  sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="top-2.5  md:col-span-1 flex flex-col items-start">
            <img
              className="w-full **w-1/2** h-auto"
              src={FooterLogoImage}
              alt="Logo"
            />
          </div>

          {/* Right: Sections + Contact + Map */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Dynamic Sections */}
            {footerSections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-900 transition"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Form */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Contactez-nous
              </h3>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                />
                <textarea
                  placeholder="Votre message"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Envoyer
                </button>
              </form>
            </div>

            {/* Google Map & Address */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Notre adresse
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Lot 123 ABC, Antananarivo, Madagascar
              </p>
              <div className="w-full h-40 rounded overflow-hidden">
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126841.73842935425!2d47.4784018!3d-18.8791904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07b9e77b04e63%3A0xb2cf8828ef8b5df0!2sAntananarivo!5e0!3m2!1sfr!2smg!4v1613581712722!5m2!1sfr!2smg"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Footer };
