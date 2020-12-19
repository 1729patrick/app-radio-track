import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const CARDS_PER_VIEW = 2;
export const CARD_SIZE = width / (CARDS_PER_VIEW + 0.3);
console.log({ CARD_SIZE });
