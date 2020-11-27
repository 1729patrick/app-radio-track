import React from 'react';
import App from './App';
import { PlayerProvider } from './contexts/PlayerContext';
import { FavoriteProvider } from './contexts/FavoriteContext';

export default () => {
  return (
    <FavoriteProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </FavoriteProvider>
  );
};
