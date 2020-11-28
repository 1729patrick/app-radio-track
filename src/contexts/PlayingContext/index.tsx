import React, { createContext, useCallback, useContext, useState } from 'react';

import TrackPlayer, {
  //@ts-ignore
  useTrackPlayerEvents,
  //@ts-ignore
  TrackPlayerEvents,
} from 'react-native-track-player';

type ContextProps = {
  radioId?: string;
};

const PlayingContext = createContext<ContextProps>({
  radioId: undefined,
});

const events = [TrackPlayerEvents.PLAYBACK_STATE];

export const PlayingProvider: React.FC = ({ children }) => {
  const [radioId, setRadioId] = useState<string>();

  const setPlayingRadio = useCallback(async () => {
    const id = await TrackPlayer.getCurrentTrack();

    setRadioId(id);
  }, []);

  useTrackPlayerEvents(
    events,
    ({ type, state }: { type: string; state: string }) => {
      if (type === TrackPlayerEvents.PLAYBACK_STATE) {
        const playing = state === TrackPlayer.STATE_PLAYING;

        if (playing) {
          setPlayingRadio();
        } else {
          setRadioId(undefined);
        }
      }
    },
  );

  return (
    <PlayingContext.Provider value={{ radioId }}>
      {children}
    </PlayingContext.Provider>
  );
};

export const usePlaying = () => useContext(PlayingContext);
