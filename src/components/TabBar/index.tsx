import React from 'react';
import { Text, View } from 'react-native';
import { usePlayer } from '~/contexts/PlayerContext';
import Player from '../Player';

const TabBar = () => {
  const { playerRef } = usePlayer();

  return (
    <>
      <Player ref={playerRef} />
      <View
        style={{
          height: 55,
          backgroundColor: 'blue',
          right: 0,
          left: 0,
          zIndex: 60,
          elevation: 60,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </>
  );
};

export default TabBar;
