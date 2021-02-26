import Toast from 'react-native-toast-message';

export const success = () => {
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: 'Hello',
    text2: 'This is some something 👋',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    onShow: () => {},
    onHide: () => {},
    onPress: () => {},
  });
};
