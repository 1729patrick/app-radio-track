import React, { createContext, useCallback, useContext } from 'react';
import { BLOCKS } from '~/ads/constants';
import useInterstitial from '~/ads/hooks/useInterstitial';

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

export const AdProvider: React.FC = ({ children }) => {
  const playlistInterstitial = useInterstitial(BLOCKS.PLAYLIST);
  const libraryInterstitial = useInterstitial(BLOCKS.LIBRARY);
  const playerInterstitial = useInterstitial(BLOCKS.PLAYER);

  const show = useCallback(({ showAd }: { showAd: () => void }) => {
    showAd();
  }, []);

  const showPlaylistAd = useCallback(() => {
    show(playlistInterstitial);
  }, [playlistInterstitial, show]);

  const showLibraryAd = useCallback(() => {
    show(libraryInterstitial);
  }, [libraryInterstitial, show]);

  const showPlayerAd = useCallback(() => {
    show(playerInterstitial);
  }, [playerInterstitial, show]);

  return (
    <AdContext.Provider value={{ showPlaylistAd, showLibraryAd, showPlayerAd }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAd = () => useContext(AdContext);
