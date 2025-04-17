import { useEffect, useRef, useState } from 'react';
import { PdfViewer } from '@/components/file/pdfViewer';
import { useFileApi } from '@/hooks/useFileReader';
import { useBlog } from '@/hooks/useBlog';
import { FileInfo } from 'generated-client';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const BOOK_MODE_WIDTH = '800px';
const SIDEBAR_WIDTH = '300px';

export const ViewFile = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const viewFileRef = useRef<HTMLDivElement>(null);
  const [fileData, setFileData] = useState<FileInfo | null>(null);
  const { getFileById, loading: loadFile } = useFileApi();
  const { blogs, loading: loadingBlogs, error: errorBlogs } = useBlog({ pageSize: 100 });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pagesRead, setPagesRead] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (fileId) {
      setPagesRead(1);
      getFileById(fileId)
        .then((fileInfo) => {
          if (fileInfo?.fileToUpload) {
            setFileData(fileInfo);
          }
        })
        .catch((error: unknown) => {
          console.error('Error fetching file info:', error);
        });
    }
  }, [fileId, getFileById]);

  const handlePageChange = (current: number) => {
    setPagesRead(current);
  };

  const handleNumPages = (total: number) => {
    setTotalPages(total);
  };

  const progress = totalPages > 1 ? Math.round((pagesRead / totalPages) * 100) : 0;

  const currentBlogIndex = blogs.length > 0 ? blogs.findIndex((blog) => blog.fileId === fileId) : -1;
  const nextBlog = currentBlogIndex !== -1 ? blogs[currentBlogIndex + 1] : undefined;
  const previousBlog = currentBlogIndex > 0 ? blogs[currentBlogIndex - 1] : undefined;
  const otherBlogs = blogs.filter((blog) => blog.fileId !== fileId) || [];

  return (
    <div className="flex h-screen bg-gray-100 relative font-serif" ref={viewFileRef}>
      {/* Sidebar */}
      <aside
        className={`bg-white border-r overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarOpen ? `w-[${SIDEBAR_WIDTH}] p-6` : 'w-0 p-0 overflow-hidden'
        } shadow-md`}
      >
        {sidebarOpen && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-green-700">Autres Lectures</h2>
              <button
                onClick={() => { setSidebarOpen(false); }}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            {loadingBlogs ? (
              <p className="text-gray-600 italic">Chargement des articles...</p>
            ) : errorBlogs ? (
              <p className="text-red-500">Erreur: Impossible de charger les articles.</p>
            ) : otherBlogs.length > 0 ? (
              <ul className="space-y-4">
                {otherBlogs.map((blog) => (
                  <li key={blog.id} className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 border">
                    <Link
                      to={`/blog/viewfile/${blog.fileId}`}
                      className="block text-blue-700 font-medium text-md"
                    >
                      {blog.title}
                    </Link>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{blog.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">Aucun autre article à afficher.</p>
            )}
          </>
        )}
      </aside>

      {/* Button to reopen sidebar */}
      {!sidebarOpen && (
        <button
          onClick={() => { setSidebarOpen(true); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-green-500 text-white rounded-r px-2 py-2 hover:bg-green-600 focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center overflow-y-auto p-8">
        <div
          className="bg-white rounded-lg shadow-xl overflow-y-auto border border-gray-300"
          style={{ width: BOOK_MODE_WIDTH }}
        >
          <div className="p-12">
            <div className="mb-4">
              <div className="text-right text-xs text-gray-500 mt-1">
                <Progress value={progress}/>
              </div>
            </div>
            <PdfViewer
              isPending={loadFile}
              url={fileData?.fileToUpload}
              filename={fileData?.name ?? 'Document'}
              onPageChange={handlePageChange}
              onNumPages={handleNumPages}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 w-full max-w-screen-md">
          {previousBlog && (
            <Link
              to={`/blog/viewfile/${previousBlog.fileId}`}
              className="bg-green-200 text-green-700 px-4 py-2 rounded-md hover:bg-green-300 focus:outline-none"
            >
              <ChevronLeft size={20} className="inline-block mr-2" /> Précédent
            </Link>
          )}
          <div></div>
          {nextBlog && (
            <Link
              to={`/blog/viewfile/${nextBlog.fileId}`}
              className="bg-green-200 text-green-700 px-4 py-2 rounded-md hover:bg-green-300 focus:outline-none"
            >
              Suivant <ChevronRight size={20} className="inline-block ml-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};