import React from 'react';
import { StatusBar } from 'react-native';
import { useRegion } from './contexts/RegionContext';
import Routes from './routes';

const App = () => {
  const { regionId, STATES } = useRegion();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Routes />
    </>
  );
};

export default App;
