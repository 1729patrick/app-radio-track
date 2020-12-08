import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
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
    showAd(playlistReward);
  }, [playlistReward, showAd]);

  const showLibraryAd = useCallback(() => {
    showAd(libraryReward);
  }, [libraryReward, showAd]);

  const showPlayerAd = useCallback(() => {
    showAd(playerReward);
  }, [playerReward, showAd]);

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
