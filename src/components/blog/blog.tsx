import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FaDownload, FaEye } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { useNetworkStatus } from '@/hooks/useNetworkStatus.ts';
import { useBlog } from '@/hooks/useBlog';
import { Blog as BlogType } from 'generated-client/models/Blog';
import { Link } from 'react-router-dom';
import { FileInfo } from '../../../generated-client';
import { useFileApi } from '@/hooks/useFileReader.ts';

const blogsPerPage = 6;

interface AnimatedBlogCardProps {
  blog: BlogType;
}

const AnimatedBlogCard: React.FC<AnimatedBlogCardProps> = ({ blog }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10% 0px' });
  const [fileData, setFileData] = useState<FileInfo | null>(null);
  const { getFileById } = useFileApi();

  useEffect(() => {
    if (blog.fileId) {
      getFileById(blog.fileId)
        .then((fileInfo) => {
          if (fileInfo?.fileToUpload) {
            setFileData(fileInfo);
          }
        })
        .catch((error: unknown) => {
          console.error('Error fetching file info:', error);
        });
    }
  }, [blog.fileId, getFileById]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200"
    >
      <img
        src={blog.imageUrl ?? 'https://via.placeholder.com/300x180'}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4 text-left">
        <h3 className="font-bold text-xl text-green-700 mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.description}</p>
        <div className="flex justify-between">
          <Link
            to={`/blog/viewfile/${blog.fileId}`}
            className="cursor-pointer text-green-700 hover:text-green-900 flex items-center gap-1 text-sm"
          >
            <FaEye /> Voir
          </Link>
          <a
            href={fileData?.fileToUpload}
            target="_blank"
            rel="noreferrer"
            download={`${fileData?.name}.pdf`}
            data-testid="download-link"
            className="cursor-pointer text-green-700 hover:text-green-900 flex items-center gap-1 text-sm"
          >
            <FaDownload /> Télécharger
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Blog: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(blogsPerPage);
  const isOnline = useNetworkStatus();

  const { blogs, loading, error } = useBlog({
    keyword: search,
    page: page,
    pageSize: blogsPerPage,
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage(1);
    setVisibleCount(blogsPerPage);
  }, [search, authorFilter]);

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.description?.toLowerCase().includes(search.toLowerCase());
    const matchesAuthor = authorFilter ? b.author === authorFilter : true;
    return matchesSearch && matchesAuthor ;
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
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="🔍 Rechercher..."
          />
          <select
            value={authorFilter}
            onChange={(e) => {
              setAuthorFilter(e.target.value);
            }}
            className="mt-4"
          >
            <option value="">Tous les auteurs</option>
            {uniqueAuthors.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div className="w-full md:w-5/6 h-screen overflow-y-auto p-4">
          {/* Mobile filters */}
          <div className="md:hidden flex flex-col gap-4 mb-4">
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="🔍 Rechercher..."
            />
          </div>

          {/* Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(blogsPerPage)].map((_, i) => (
                  <Skeleton key={i} className="h-[250px] w-full rounded-xl" />
                ))}
              </div>
            )}

            {!loading &&
              filteredBlogs.slice(0, visibleCount).map((blog) => (
                <AnimatedBlogCard key={blog.id} blog={blog} />
              ))}

            {error && <p className="text-red-500">{error}</p>}
            {!loading && filteredBlogs.length === 0 && !error && (
              <p>Aucun blog trouvé correspondant à vos critères.</p>
            )}
          </div>

          {filteredBlogs.length > visibleCount && !loading && (
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