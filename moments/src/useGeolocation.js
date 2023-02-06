import React, { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [watching, setWatching] = useState(false);

  useEffect(() => {
    if (!watchId && watching) {
      //console.log('watching position')
      const newWatchId = Geolocation.watchPosition(
        position => {
          setPosition(position);
        },
        error => {
          setError(error);
        },
        { enableHighAccuracy: true, distanceFilter: 0 }
      );
      setWatchId(newWatchId);
    } else if (watchId && !watching) {
      //console.log('stop watching position')
      Geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  }, [watchId, watching]);

  return { position, error, startWatching: () => setWatching(true), stopWatching: () => setWatching(false) };
}

export default useGeolocation;
