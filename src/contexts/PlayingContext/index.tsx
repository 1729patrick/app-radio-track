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
import { usePlayer } from '../PlayerContext';

type ContextProps = {
  radioId?: string;
};

const PlayingContext = createContext<ContextProps>({
  radioId: undefined,
});

const events = [TrackPlayerEvents.PLAYBACK_STATE];

export const PlayingProvider: React.FC = ({ children }) => {
  const { onExpandPlayer } = usePlayer();
  const [radioId, setRadioId] = useState<string>();
  const { getItem, setItem, removeItem } = useAsyncStorage('@radio:playing');

  const setPlayingRadio = useCallback(
    async ({ playing }: { playing: boolean }) => {
      if (!playing && radioId) {
        setRadioId(undefined);
        removeItem();
        return;
      } else if (playing) {
        const id = await TrackPlayer.getCurrentTrack();
        const track = await TrackPlayer.getTrack(id);

        const trackFormatted = {
          id: track.id,
          streams: [{ url: track.url }],
          name: track.title,
          slogan: track.artist,
          img: track.artwork,
          type: undefined,
        };

        setItem(JSON.stringify(trackFormatted));
        setRadioId(id);
      }
    },
    [radioId, removeItem, setItem],
  );

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
      const radio = JSON.parse(radioPlayingFromStorage);
      onExpandPlayer({
        radios: [radio],
        radioIndex: 0,
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
    <PlayingContext.Provider value={{ radioId }}>
      {children}
    </PlayingContext.Provider>
  );
};

export const usePlaying = () => useContext(PlayingContext);
