import React from 'react';
import App from './App';
import { PlayerProvider } from './contexts/PlayerContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { PlayingProvider } from './contexts/PlayingContext';
import { AdProvider } from './ads/contexts/AdContext';
import { ReviewProvider } from './contexts/ReviewContext';
// import { IapProvider } from './contexts/IapContext';

export default () => {
  return (
    <FavoriteProvider>
      <HistoryProvider>
        <PlayerProvider>
          <PlayingProvider>
            <ReviewProvider>
              <AdProvider>
                {/* <IapProvider> */}
                <App />
                {/* </IapProvider> */}
              </AdProvider>
            </ReviewProvider>
          </PlayingProvider>
        </PlayerProvider>
      </HistoryProvider>
    </FavoriteProvider>
  );
};
