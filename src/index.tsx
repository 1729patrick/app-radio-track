import React from 'react';
import App from './App';
import { PlayerProvider } from './contexts/PlayerContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { PlayingProvider } from './contexts/PlayingContext';
import { AdProvider } from './ads/contexts/AdContext';
import { ReviewProvider } from './contexts/ReviewContext';
import { SearchHistoryProvider } from './contexts/SearchHistoryContext';
import { AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from './contexts/ThemeContext';
import { IAPProvider } from './contexts/IAPContext';
import { LocationProvider } from './contexts/LocationContext';

export default () => {
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <IAPProvider>
          <FavoriteProvider>
            <HistoryProvider>
              <PlayerProvider>
                <PlayingProvider>
                  <ReviewProvider>
                    <AdProvider>
                      <LocationProvider>
                        <SearchHistoryProvider>
                          <App />
                        </SearchHistoryProvider>
                      </LocationProvider>
                    </AdProvider>
                  </ReviewProvider>
                </PlayingProvider>
              </PlayerProvider>
            </HistoryProvider>
          </FavoriteProvider>
        </IAPProvider>
      </ThemeProvider>
    </AppearanceProvider>
  );
};
