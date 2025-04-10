import { useState, useEffect } from 'react';
import { EventsApi } from 'generated-client/apis';
import { Event } from 'generated-client/models/Event';

const eventsApi = new EventsApi();

const useEvents = (filters?: never) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(async () => {
    const fetchEvents = async () => {
      try {
        const eventsData = await eventsApi.getListEvent(filters);
        setEvents(eventsData);
      } catch (err) {
        setError(`Failed to fetch events ${err}`);
      } finally {
        setLoading(false);
      }
    };

    await fetchEvents().then(r => {
      console.log(r);
    });
  }, [filters]);

  return { events, loading, error };
};

export { useEvents };
