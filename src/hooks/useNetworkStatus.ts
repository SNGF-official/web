import { useEffect, useState } from 'react';
import { isOnline, listenToNetworkChanges } from '@/lib/network.ts';

export const useNetworkStatus = () => {
  const [online, setOnline] = useState(isOnline());

  useEffect(() => {
    return listenToNetworkChanges(
      () => {
        setOnline(true);
      },
      () => {
        setOnline(false);
      }
    );
  }, []);

  return online;
};
