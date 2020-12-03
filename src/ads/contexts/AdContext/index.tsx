import React, { createContext, useContext, useEffect, useRef } from 'react';
import { BLOCKS } from '~/ads/constants';
import useReward from '~/ads/hooks/useReward';
import BackgroundTimer from 'react-native-background-timer';

type ContextProps = {
  showPlaylistAd: () => void;
  showLibraryAd: () => void;
  showPlayerAd: () => void;
};

const AdContext = createContext<ContextProps>({
  showPlaylistAd: () => {},
  showLibraryAd: () => {},
  showPlayerAd: () => {},
});

const TIME_OUT_MINUTOS = 5;
const TIME_TO_SHOW = 1000 * 60 * TIME_OUT_MINUTOS;

export const AdProvider: React.FC = ({ children }) => {
  const timeoutRef = useRef<number>(0);
  const availableRef = useRef(true);

  const playlistReward = useReward(BLOCKS.PLAYLIST);
  const libraryReward = useReward(BLOCKS.LIBRARY);
  const playerReward = useReward(BLOCKS.PLAYER);

  const resetTimeout = () => {
    availableRef.current = false;

    timeoutRef.current = BackgroundTimer.setTimeout(() => {
      availableRef.current = true;
    }, TIME_TO_SHOW);
  };

  const showAd = (fns: { showAd: () => void; loadAd: () => void }) => {
    if (availableRef.current) {
      fns.showAd();
      resetTimeout();

      BackgroundTimer.setTimeout(fns.loadAd, TIME_TO_SHOW / 2);
    }
  };

  const showPlaylistAd = () => {
    showAd(playlistReward);
  };

  const showLibraryAd = () => {
    showAd(libraryReward);
  };

  const showPlayerAd = () => {
    showAd(playerReward);
  };

  useEffect(() => {
    return () => BackgroundTimer.clearTimeout(timeoutRef.current);
  }, []);

  return (
    <AdContext.Provider value={{ showPlaylistAd, showLibraryAd, showPlayerAd }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAd = () => useContext(AdContext);
