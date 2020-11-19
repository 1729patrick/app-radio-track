import React, { createContext, useContext, useRef } from 'react';
import Player, { PlayerHandler, PlayerState } from '~/components/Player';

type ContextProps = {
  onOpenPlayer: (args: PlayerState & { radioIndex: number }) => void;
  playerRef: any;
};

const PlayerContext = createContext<ContextProps>({
  onOpenPlayer: () => {},
  playerRef: null,
});

export const PlayerProvider = ({ children }) => {
  const playerRef = useRef<PlayerHandler>(null);

  const onOpenPlayer = (args: PlayerState & { radioIndex: number }) => {
    playerRef.current?.onExpandPlayer(args);
  };

  return (
    <PlayerContext.Provider value={{ onOpenPlayer, playerRef }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
