import React, { createContext, useCallback, useContext, useRef } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { PlayerHandler, PlayerState } from '~/components/Player';

import { SNAP_POINTS } from '~/components/Player/constants';
type ContextProps = {
  onExpandPlayer: (args: PlayerState & { radioIndex: number }) => void;
  playerRef: any;
  translateY: Animated.SharedValue<number> | { value: 0 };
};

const PlayerContext = createContext<ContextProps>({
  onExpandPlayer: () => {},
  playerRef: null,
  translateY: { value: 0 },
});

export const PlayerProvider: React.FC = ({ children }) => {
  const translateY = useSharedValue(SNAP_POINTS[2]);
  const playerRef = useRef<PlayerHandler>(null);

  const onExpandPlayer = useCallback(
    (args: PlayerState & { radioIndex: number }) => {
      playerRef.current?.onExpandPlayer(args);
    },
    [],
  );

  return (
    <PlayerContext.Provider value={{ onExpandPlayer, playerRef, translateY }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
