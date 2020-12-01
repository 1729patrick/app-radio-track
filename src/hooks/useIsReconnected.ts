import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

import usePrevious from './usePrevious';

const useIsReconnected = () => {
  const [isConnected, setIsConnected] = useState(true);
  const previousIsConnected = usePrevious(isConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return unsubscribe;
  }, []);

  return isConnected && !previousIsConnected;
};

export default useIsReconnected;
