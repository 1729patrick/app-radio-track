import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import Player from './screens/Player';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Player />
    </>
  );

  // <SafeAreaView>
};

export default App;
