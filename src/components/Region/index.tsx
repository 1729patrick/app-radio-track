import React from 'react';
import { Image, View, Text } from 'react-native';
import { RegionType } from '~/screens/Explore/components/Regions';
import Icon from 'react-native-vector-icons/AntDesign';
import getStyles from './styles';

import { RectButton } from 'react-native-gesture-handler';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';

type RegionProps = RegionType & {
  checked: boolean;
  onPress: (id: string) => void;
};

const Region: React.FC<RegionProps> = ({
  image,
  title,
  checked,
  id,
  onPress,
}) => {
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  return (
    <RectButton
      onPress={() => onPress(id)}
      rippleColor={palette.secondary}
      style={[styles.container]}>
      <View style={styles.info}>
        <Image source={image} style={styles.image} />
        <Text
          style={[
            styles.title,
            {
              color: checked ? palette.app : palette.primary,
            },
          ]}>
          {title}
        </Text>
      </View>
      {checked && <Icon name="check" size={28} color={palette.app} />}
    </RectButton>
  );
};

export default Region;
