import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Home from './screens/Home';

import Player from './screens/Player';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Home />
    </>
  );

  // <SafeAreaView>
};

export default App;
