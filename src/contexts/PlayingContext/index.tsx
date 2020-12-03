import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

type ContextProps = {
  radioId?: string;
  removePlayingRadio: () => void;
};

const PlayingContext = createContext<ContextProps>({
  radioId: undefined,
  removePlayingRadio: () => {},
});

const events = [TrackPlayerEvents.PLAYBACK_STATE];

export const PlayingProvider: React.FC = ({ children }) => {
  const { onExpandPlayer } = usePlayer();
  const [radioId, setRadioId] = useState<string | undefined>(undefined);
  const { getItem, setItem, removeItem } = useAsyncStorage('@radio:playing');

  const setPlayingRadio = useCallback(
    async ({ playing }: { playing: boolean }) => {
      if (!playing) {
        setRadioId(undefined);
      } else if (playing) {
        const id = await TrackPlayer.getCurrentTrack();

        const radios = await TrackPlayer.getQueue();

        const radiosFormatted = radios.map((track) => {
          return {
            id: track.id,
            streams: [{ url: track.url }],
            name: track.title,
            slogan: track.artist,
            img: track.artwork,
            type: undefined,
          };
        });

        const radioIndex = radiosFormatted.findIndex(
          (radio) => radio.id === id,
        );

        setItem(JSON.stringify({ radios: radiosFormatted, radioIndex }));
        setRadioId(id);
      }
    },
    [setItem],
  );

  const removePlayingRadio = useCallback(() => {
    removeItem();
  }, [removeItem]);

  useTrackPlayerEvents(
    events,
    ({ type, state }: { type: string; state: string }) => {
      if (type === TrackPlayerEvents.PLAYBACK_STATE) {
        const playing = state === TrackPlayer.STATE_PLAYING;

        setPlayingRadio({ playing });
      }
    },
  );

  const readRadioFromStorage = useCallback(async () => {
    const radioPlayingFromStorage = await getItem();

    if (radioPlayingFromStorage) {
      const { radios, radioIndex } = JSON.parse(radioPlayingFromStorage);

      if (!radios || !radios[radioIndex]) {
        console.warn('Invalid playing stored on device');
        return;
      }

      onExpandPlayer({
        radios,
        radioIndex,
        title: '',
        size: 'compact',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    readRadioFromStorage();
  }, [readRadioFromStorage]);

  return (
    <PlayingContext.Provider value={{ radioId, removePlayingRadio }}>
      {children}
    </PlayingContext.Provider>
  );
};

export const usePlaying = () => useContext(PlayingContext);
