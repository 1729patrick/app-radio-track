import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { BLOCKS } from '~/ads/constants';
import useInterstitial from '~/ads/hooks/useInterstitial';
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

const TIME_OUT_MINUTOS = 2;
const TIME_TO_SHOW = 1000 * 60 * TIME_OUT_MINUTOS;

export const AdProvider: React.FC = ({ children }) => {
  const timeoutRef = useRef<number>(0);
  const availableRef = useRef(true);

  const playlistInterstitial = useInterstitial(BLOCKS.PLAYLIST);
  const libraryInterstitial = useInterstitial(BLOCKS.LIBRARY);
  const playerInterstitial = useInterstitial(BLOCKS.PLAYER);

  const resetTimeout = useCallback(() => {
    availableRef.current = false;

    timeoutRef.current = BackgroundTimer.setTimeout(() => {
      availableRef.current = true;
    }, TIME_TO_SHOW);
  }, []);

  const showAd = useCallback(
    (fns: { showAd: () => void; loadAd: () => void }) => {
      if (availableRef.current) {
        fns.showAd();
        resetTimeout();

        BackgroundTimer.setTimeout(fns.loadAd, TIME_TO_SHOW / 2);
      }
    },
    [resetTimeout],
  );

  const showPlaylistAd = useCallback(() => {
    showAd(playlistInterstitial);
  }, [playlistInterstitial, showAd]);

  const showLibraryAd = useCallback(() => {
    showAd(libraryInterstitial);
  }, [libraryInterstitial, showAd]);

  const showPlayerAd = useCallback(() => {
    showAd(playerInterstitial);
  }, [playerInterstitial, showAd]);

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
