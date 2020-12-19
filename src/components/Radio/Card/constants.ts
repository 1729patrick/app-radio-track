import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const CARD_SIZE = width / 3.3;
console.log({ CARD_SIZE });
