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
import { AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from './contexts/ThemeContext';
import { IAPProvider } from './contexts/IAPContext';
import { CountryProvider } from './contexts/CountryContext';

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
                      <RegionProvider>
                        <SearchHistoryProvider>
                          <CountryProvider>
                            <App />
                          </CountryProvider>
                        </SearchHistoryProvider>
                      </RegionProvider>
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
