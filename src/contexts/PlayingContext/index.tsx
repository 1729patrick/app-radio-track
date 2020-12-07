import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import TrackPlayer, {
  //@ts-ignore
  useTrackPlayerEvents,
  //@ts-ignore
  TrackPlayerEvents,
} from 'react-native-track-player';
import { RadioType } from '~/types/Station';
import { usePlayer } from '../PlayerContext';

type MetadataArgs = { radios: RadioType[]; title: string };

type ContextProps = {
  playingRadioId?: string;
  removePlayingRadio: () => void;
  setMetaData: (
    args: MetadataArgs & { id?: string; radioIndex?: number },
  ) => void;
};

const PlayingContext = createContext<ContextProps>({
  playingRadioId: undefined,
  removePlayingRadio: () => {},
  setMetaData: () => {},
});

const events = [TrackPlayerEvents.PLAYBACK_STATE];

export const PlayingProvider: React.FC = ({ children }) => {
  const { onExpandPlayer } = usePlayer();
  const metadataRef = useRef<MetadataArgs & { radioIndex?: number }>({
    radios: [],
    title: '',
  });
  const [playingRadioId, setPlayingRadioId] = useState<string | undefined>(
    undefined,
  );
  const { getItem, setItem, removeItem } = useAsyncStorage('@radio:playing');

  const setMetaData = useCallback(
    (args: MetadataArgs & { id?: string; radioIndex?: number }) => {
      const radioIndex =
        args.radioIndex ||
        args.radios.findIndex((radio) => radio.id === args.id);

      metadataRef.current = { ...args, radioIndex };

      if (radioIndex < 0) {
        return;
      }

      setItem(JSON.stringify(metadataRef.current));
    },
    [setItem],
  );

  const setPlayingRadio = useCallback(async () => {
    const id = await TrackPlayer.getCurrentTrack();

    const { radios, title } = metadataRef.current;
    setMetaData({ radios, title, id });

    setPlayingRadioId(id);
  }, [setMetaData]);

  const removePlayingRadio = useCallback(() => {
    removeItem();
  }, [removeItem]);

  useTrackPlayerEvents(
    events,
    ({ type, state }: { type: string; state: string }) => {
      if (type === TrackPlayerEvents.PLAYBACK_STATE) {
        const playing = state === TrackPlayer.STATE_PLAYING;

        if (playing) {
          setPlayingRadio();
        } else {
          setPlayingRadioId(undefined);
        }
      }
    },
  );

  const readRadioFromStorage = useCallback(async () => {
    const radioPlayingFromStorage = await getItem();

    if (radioPlayingFromStorage) {
      const { radios, radioIndex, title } = JSON.parse(radioPlayingFromStorage);

      if (!radios || !radios[radioIndex]) {
        console.warn('Invalid playing stored on device');
        return;
      }

      metadataRef.current = { radios, radioIndex, title };

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
      value={{ playingRadioId, removePlayingRadio, setMetaData }}>
      {children}
    </PlayingContext.Provider>
  );
};

export const usePlaying = () => useContext(PlayingContext);
