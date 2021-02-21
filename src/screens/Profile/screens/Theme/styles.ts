import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';

export default StyleSheet.create({
  container: { paddingTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT },
});
