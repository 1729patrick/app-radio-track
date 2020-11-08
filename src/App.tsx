import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import Home from './screens/Home';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const Button = () => (
  <View style={{ borderRadius: 21, height: 42, width: 42, overflow: 'hidden' }}>
    <RectButton
      onPress={() => console.log('NotAccessibleButton')}
      style={{
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon name="heart-outline" size={25} color="#900" />
    </RectButton>
  </View>
);

// const AccessibleButton = () => (
//   <RectButton onPress={() => console.log('AccessibleButton')}>
//     <View accessible>
//       <Text>Bar</Text>
//     </View>
//   </RectButton>
// );

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
    // <SafeAreaView>
  );
};

export default App;
