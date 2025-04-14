import { useState, useEffect } from 'react';
import { EventsApi } from 'generated-client/apis';
import { Event } from 'generated-client/models/Event';

const eventsApi = new EventsApi();

interface UseEventParams {
  title?: string;
  sort_by?: string;
  date?: Date;
  status?: 'ACTIVE' | 'INACTIVE';
  operatorId?: number;
  page?: number;
  pageSize?: number;
}

interface UseEventResult {
  events: Event[];
  loading: boolean;
  error: string;
}

export const useEvent = ({
                           title,
                           sort_by,
                           date,
                           status,
                           operatorId,
                           page,
                           pageSize,
                         }: UseEventParams): UseEventResult => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await eventsApi.getListEvent({
          keyword: title,
          date,
          status,
          operatorId,
          page,
          pageSize,
        });

        const sortedData =
          sort_by && sort_by === 'asc'
            ? [...data].sort((a, b) => a.title.localeCompare(b.title))
            : sort_by && sort_by === 'desc'
              ? [...data].sort((a, b) => b.title.localeCompare(a.title))
              : data;

        setEvents(sortedData);
      } catch (err) {
        setError(`Failed to fetch events: ${String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents()
      .then(r => { console.log(r); })
      .catch((res: unknown) => { console.log(res); });
  }, [title, sort_by, date, status, operatorId, page, pageSize]);

  return { events, loading, error };
};
