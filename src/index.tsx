import React from 'react';
import App from './App';
import { PlayerProvider } from './contexts/PlayerContext';

export default () => {
  return (
    <PlayerProvider>
      <App />
    </PlayerProvider>
  );
};
