import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { RadioType } from '~/types/Station';
import { usePlayer } from '../PlayerContext';

type SetPlayingRadioArgs = {
  radioIndex: number;
  title: string;
  radios: RadioType[];
};

type ContextProps = {
  playingRadioId?: string;
  removePlayingRadio: () => void;
  setPlayingRadio: (args?: SetPlayingRadioArgs) => void;
};

const PlayingContext = createContext<ContextProps>({
  playingRadioId: undefined,
  removePlayingRadio: () => {},
  setPlayingRadio: () => {},
});

export const PlayingProvider: React.FC = ({ children }) => {
  const { onExpandPlayer } = usePlayer();
  const [playingRadioId, setPlayingRadioId] = useState<string | undefined>(
    undefined,
  );
  const { getItem, setItem, removeItem } = useAsyncStorage('@radio:playing');

  const setPlayingRadio = useCallback(
    async (args?: SetPlayingRadioArgs) => {
      if (!args) {
        setPlayingRadioId(undefined);
        return;
      }

      setItem(JSON.stringify(args));
      setPlayingRadioId(args.radios[args.radioIndex].id);
    },
    [setItem],
  );

  const removePlayingRadio = useCallback(() => {
    removeItem();
  }, [removeItem]);

  const readRadioFromStorage = useCallback(async () => {
    const radioPlayingFromStorage = await getItem();

    if (radioPlayingFromStorage) {
      const { radios, radioIndex, title } = JSON.parse(radioPlayingFromStorage);

      if (!radios || !radios[radioIndex]) {
        console.warn('Invalid playing stored on device');
        return;
      }

      onExpandPlayer({
        radios,
        radioIndex,
        title,
        size: 'compact',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    readRadioFromStorage();
  }, [readRadioFromStorage]);

  return (
    <PlayingContext.Provider
      value={{ playingRadioId, removePlayingRadio, setPlayingRadio }}>
      {children}
    </PlayingContext.Provider>
  );
};

export const usePlaying = () => useContext(PlayingContext);
