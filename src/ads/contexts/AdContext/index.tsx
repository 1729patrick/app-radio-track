import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { BLOCKS } from '~/ads/constants';
import useInterstitial from '~/ads/hooks/useInterstitial';
import { useIAP } from '~/contexts/IAPContext';

type ContextProps = {
  showPlaylistAd: () => void;
  showLibraryAd: () => void;
  showPlayerAd: () => void;
  showRelationalAd: () => void;
};

const AdContext = createContext<ContextProps>({
  showPlaylistAd: () => {},
  showLibraryAd: () => {},
  showPlayerAd: () => {},
  showRelationalAd: () => {},
});

export const AdProvider: React.FC = ({ children }) => {
  const { isPremium } = useIAP();
  const playlistInterstitial = useInterstitial(BLOCKS.PLAYLIST);
  const libraryInterstitial = useInterstitial(BLOCKS.LIBRARY);
  const playerInterstitial = useInterstitial(BLOCKS.PLAYER);
  const relationalInterstitial = useInterstitial(BLOCKS.RELATIONAL);

  const showAdRef = useRef(true);

  const show = useCallback(({ showAd }: { showAd: () => void }) => {
    // return;
    if (!showAdRef.current) {
      return;
    }

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

  const showRelationalAd = useCallback(() => {
    show(relationalInterstitial);
  }, [relationalInterstitial, show]);

  useEffect(() => {
    showAdRef.current = !isPremium;
  }, [isPremium]);

  return (
    <AdContext.Provider
      value={{ showPlaylistAd, showLibraryAd, showPlayerAd, showRelationalAd }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAd = () => useContext(AdContext);
