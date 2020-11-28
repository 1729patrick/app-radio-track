import React from 'react';
import App from './App';
import { PlayerProvider } from './contexts/PlayerContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { PlayingProvider } from './contexts/PlayingContext';

export default () => {
  return (
    <FavoriteProvider>
      <HistoryProvider>
        <PlayerProvider>
          <PlayingProvider>
            <App />
          </PlayingProvider>
        </PlayerProvider>
      </HistoryProvider>
    </FavoriteProvider>
  );
};
