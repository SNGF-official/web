export const isOnline = (): boolean => {
  return navigator.onLine;
};

export const listenToNetworkChanges = (
  onOnline: () => void,
  onOffline: () => void
): (() => void) => {
  const updateOnlineStatus = () => {
    if (navigator.onLine) {
      onOnline();
    } else {
      onOffline();
    }
  };

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  updateOnlineStatus();

  return () => {
    window.removeEventListener("online", updateOnlineStatus);
    window.removeEventListener("offline", updateOnlineStatus);
  };
};
