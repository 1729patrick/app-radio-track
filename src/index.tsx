import React from 'react';
import App from './App';
import { PlayerProvider } from './contexts/PlayerContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { PlayingProvider } from './contexts/PlayingContext';
import { AdProvider } from './ads/contexts/AdContext';
import { ReviewProvider } from './contexts/ReviewContext';
import { RegionProvider } from './contexts/RegionContext';
import { SearchHistoryProvider } from './contexts/SearchHistoryContext';

export default () => {
  return (
    <FavoriteProvider>
      <HistoryProvider>
        <PlayerProvider>
          <PlayingProvider>
            <ReviewProvider>
              <AdProvider>
                <RegionProvider>
                  <SearchHistoryProvider>
                    <App />
                  </SearchHistoryProvider>
                </RegionProvider>
              </AdProvider>
            </ReviewProvider>
          </PlayingProvider>
        </PlayerProvider>
      </HistoryProvider>
    </FavoriteProvider>
  );
};
