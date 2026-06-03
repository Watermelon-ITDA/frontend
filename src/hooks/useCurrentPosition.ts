import { useEffect, useState } from 'react';

const DEFAULT_POSITION = {
  lat: 35.8779,
  lng: 128.6286,
};

export const useCurrentPosition = () => {
  const [currentPosition, setCurrentPosition] = useState(DEFAULT_POSITION);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentLocation = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    currentPosition,
    setCurrentPosition,
    getCurrentLocation,
    isLoading,
  };
};
