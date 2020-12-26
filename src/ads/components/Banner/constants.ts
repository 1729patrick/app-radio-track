import { Dimensions } from 'react-native';
import StyleGuide from '~/utils/StyleGuide';

const { width } = Dimensions.get('window');
export const MEDIA_WIDTH = width - StyleGuide.spacing * 2;
