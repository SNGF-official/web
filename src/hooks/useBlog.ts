import { useEffect, useState } from 'react';
import { BlogsApi } from 'generated-client/apis';
import { Blog } from 'generated-client/models/Blog';

const blogsApi = new BlogsApi();

interface UseBlogParams {
  keyword?: string;
  page?: number;
  pageSize?: number;
  sort_by?: 'asc' | 'desc';
}

interface UseBlogResult {
  blogs: Blog[];
  loading: boolean;
  error: string;
}

export const useBlog = ({
                          keyword,
                          page,
                          pageSize,
                          sort_by,
                        }: UseBlogParams): UseBlogResult => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await blogsApi.getListBlog({
          keyword,
          page,
          pageSize,
        });

        const sortedBlogs =
          sort_by === 'asc'
            ? [...data].sort((a, b) => a.title.localeCompare(b.title))
            : sort_by === 'desc'
              ? [...data].sort((a, b) => b.title.localeCompare(a.title))
              : data;

        setBlogs(sortedBlogs);
      } catch (err) {
        setError(`Erreur lors du chargement des blogs : ${String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs().then(r => { console.log(r); }).catch((e: unknown) => {console.log(e)});
  }, [keyword, page, pageSize, sort_by]);

  return { blogs, loading, error };
};
