import { useEffect, useState } from 'react';
import { Keyboard, Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');

export const useKeyboard = () => {
  const [viewHeight, setViewHeight] = useState(height);

  function onKeyboardDidShow({
    endCoordinates,
  }: {
    endCoordinates: { height: number };
  }) {
    setViewHeight(height - endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setViewHeight(height);
  }

  useEffect(() => {
    const showListener = Platform.select({
      ios: 'keyboardWillShow',
      android: 'keyboardDidShow',
    });
    const hideListener = Platform.select({
      ios: 'keyboardWillHide',
      android: 'keyboardDidHide',
    });

    Keyboard.addListener(showListener, onKeyboardDidShow);
    Keyboard.addListener(hideListener, onKeyboardDidHide);

    return () => {
      Keyboard.removeListener(showListener, onKeyboardDidShow);
      Keyboard.removeListener(hideListener, onKeyboardDidHide);
    };
  }, []);

  const hiddenKeyboard = () => {
    Keyboard.dismiss();
  };

  return {
    height: viewHeight,
    keyboardOpen: viewHeight !== height,
    hiddenKeyboard,
  };
};
