import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FaDownload, FaEye } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { useNetworkStatus } from '@/hooks/useNetworkStatus.ts';

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  published_at: string | null;
  image_url: string | null;
  status: 'ACTIVE' | 'INACTIVE';
}

const blogsPerPage = 6;

const fakeFetch = (): Promise<Blog[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'La reforestation durable à Madagascar',
          description: 'Un aperçu des stratégies durables utilisées par le SNGF pour restaurer les forêts.',
          content: 'Lorem ipsum...',
          author: 'Dr. R. Andriamanisa',
          published_at: '2025-03-01T10:00:00Z',
          image_url: 'https://source.unsplash.com/800x450/?forest',
          status: 'ACTIVE',
        },
        {
          id: '2',
          title: 'Sélection des semences forestières',
          description: 'Critères et méthodes pour garantir une bonne qualité de semences.',
          content: 'Lorem ipsum...',
          author: 'Ing. B. Rabe',
          published_at: '2025-04-01T12:30:00Z',
          image_url: 'https://source.unsplash.com/800x450/?seeds',
          status: 'ACTIVE',
        },
      ]);
    }, 1000);
  });

const AnimatedBlogCard = ({ blog }: { blog: Blog }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200"
    >
      <img
        src={blog.image_url ?? 'https://via.placeholder.com/300x180'}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4 text-left">
        <h3 className="font-bold text-xl text-green-700 mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.description}</p>
        <div className="text-xs text-gray-500 mb-3">
          Par <span className="font-medium">{blog.author}</span> — {blog.published_at ?? 'Non publié'}
        </div>
        <div className="flex justify-between">
          <button className="cursor-pointer text-green-700 hover:text-green-900 flex items-center gap-1 text-sm">
            <FaEye /> Voir
          </button>
          <button className="cursor-pointer text-green-700 hover:text-green-900 flex items-center gap-1 text-sm">
            <FaDownload /> Télécharger
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(blogsPerPage);
  const isOnline = useNetworkStatus();
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + blogsPerPage);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fakeFetch();
        setBlogs(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase());
    const matchesAuthor = authorFilter ? b.author === authorFilter : true;
    const matchesStatus = statusFilter ? b.status === statusFilter : true;
    return matchesSearch && matchesAuthor && matchesStatus;
  });

  const uniqueAuthors = [...new Set(blogs.map((b) => b.author))];

  return (
    <>
      {!isOnline && (
        <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-md mb-4 text-center">
          Vous êtes hors ligne. Les données affichées sont issues du cache.
        </div>
      )}
      <div className="flex min-h-screen w-screen bg-gradient-to-r from-green-50 to-green-100">
        {/* Sidebar desktop */}
        <div className="hidden md:flex flex-col w-1/6 p-4">
          <Input value={search} onChange={(e) => { setSearch(e.target.value); }} placeholder="🔍 Rechercher..." />
          <select value={authorFilter} onChange={(e) => { setAuthorFilter(e.target.value); }} className="mt-4">
            <option value="">Tous les auteurs</option>
            {uniqueAuthors.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); }} className="mt-2">
            <option value="">Tous les statuts</option>
            <option value="ACTIVE">Actif</option>
            <option value="INACTIVE">Inactif</option>
          </select>
        </div>

        {/* Content */}
        <div className="w-full md:w-5/6 h-screen overflow-y-auto p-4">
          {/* Mobile filters */}
          <div className="md:hidden flex flex-col gap-4 mb-4">
            <Input value={search} onChange={(e) => { setSearch(e.target.value); }} placeholder="🔍 Rechercher..." />
            <select value={authorFilter} onChange={(e) => { setAuthorFilter(e.target.value); }}>
              <option value="">Tous les auteurs</option>
              {uniqueAuthors.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); }}>
              <option value="">Tous les statuts</option>
              <option value="ACTIVE">Actif</option>
              <option value="INACTIVE">Inactif</option>
            </select>
          </div>

          {/* Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-full bg-white p-4 rounded-2xl shadow-md animate-pulse">
                  <Skeleton className="w-full h-48 mb-4 rounded-xl" />
                  <Skeleton className="w-3/4 h-5 mb-2 rounded" />
                  <Skeleton className="w-1/2 h-5 rounded" />
                  <Skeleton className="w-full h-4 mt-2 rounded" />
                </div>
              ))
              : filteredBlogs.slice(0, visibleCount).map((blog) => <AnimatedBlogCard key={blog.id} blog={blog} />)}
          </div>
          {visibleCount < filteredBlogs.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
              >
                Charger plus
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { Blog };