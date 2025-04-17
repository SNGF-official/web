import { useState, useEffect } from 'react';
import { EventsApi, GetListEventStatusEnum } from 'generated-client/apis';
import { Event } from 'generated-client/models/Event';

const eventsApi = new EventsApi();

interface UseEventParams {
  keyword?: string;
  sort_by?: 'asc' | 'desc';
  date?: Date;
  status?: GetListEventStatusEnum;
  page?: number;
  pageSize?: number;
}

interface UseEventResult {
  events: Event[];
  loading: boolean;
  error: string | null;
}

export const useEvent = ({
                           keyword,
                           sort_by,
                           date,
                           status,
                           page,
                           pageSize,
                         }: UseEventParams = {}): UseEventResult => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await eventsApi.getListEvent({
          keyword,
          date,
          status,
          page,
          pageSize,
        });

        const sortedEvents =
          sort_by === 'asc'
            ? [...data].sort((a, b) => a.title.localeCompare(b.title))
            : sort_by === 'desc'
              ? [...data].sort((a, b) => b.title.localeCompare(a.title))
              : data;

        setEvents(sortedEvents);
      } catch (err: unknown) {
        setError(`Failed to fetch events. ${JSON.stringify(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents().then(r => { console.log(r); })
      .catch((err: unknown) =>
        { setError(`Failed to fetch events. ${JSON.stringify(err)}`)})
  }, [keyword, sort_by, date, status, page, pageSize]);

  return { events, loading, error };
};