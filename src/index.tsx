import React from 'react';
import App from './App';
import { PlayerProvider } from './contexts/PlayerContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { PlayingProvider } from './contexts/PlayingContext';
import { AdProvider } from './ads/contexts/AdContext';
import { ModalProvider } from './contexts/ModalContext';

export default () => {
  return (
    <ModalProvider>
      <FavoriteProvider>
        <HistoryProvider>
          <PlayerProvider>
            <PlayingProvider>
              <AdProvider>
                <App />
              </AdProvider>
            </PlayingProvider>
          </PlayerProvider>
        </HistoryProvider>
      </FavoriteProvider>
    </ModalProvider>
  );
};
