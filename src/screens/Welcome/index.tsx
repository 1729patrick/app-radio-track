import React, { memo, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import LottieView from 'lottie-react-native';
import Svg, { Path } from 'react-native-svg';
import RectButton from '~/components/Buttons/RectButton';
import WithoutFeedbackButton from '~/components/Buttons/WithoutFeedback';
import Regions, { RegionHandler } from './components/Regions';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useRegion } from '~/contexts/RegionContext';

const Welcome = () => {
  const regionsRef = useRef<RegionHandler>(null);
  const { pop } = useNavigation<StackNavigationProp<any>>();
  const { setRegionId, STATES } = useRegion();
  const radioIdRef = useRef('');

  const openRegions = () => {
    regionsRef.current?.show();
  };

  const onContinue = (regionId: string) => {
    pop();
    radioIdRef.current = regionId;
  };

  const onSkip = () => {
    pop();
    radioIdRef.current = STATES.REQUEST_LATER;
  };

  useEffect(() => {
    return () => {
      setRegionId(radioIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.title}>Bem-vindo (a)</Text>
        <Text style={styles.description}>
          Leve milhares de estações de rádio no seu bolso
        </Text>
        <LottieView
          source={require('~/assets/robot.json')}
          style={styles.robot}
          speed={1}
          autoPlay
        />
      </View>

      <View style={styles.containerBottom}>
        <RectButton
          title="Escolha o seu estado"
          onPress={openRegions}
          containerStyle={styles.containerButtonChoose}
        />

        <WithoutFeedbackButton
          title={'DEIXAR PARA DEPOIS'}
          onPress={onSkip}
          titleStyle={styles.titleButtonSkip}
        />
      </View>

      <Svg style={styles.waves} viewBox="0 0 1440 320">
        <Path
          d="M0,256L12.6,245.3C25.3,235,51,213,76,181.3C101.1,149,126,107,152,106.7C176.8,107,202,149,227,144C252.6,139,278,85,303,74.7C328.4,64,354,96,379,133.3C404.2,171,429,213,455,208C480,203,505,149,531,154.7C555.8,160,581,224,606,245.3C631.6,267,657,245,682,224C707.4,203,733,181,758,176C783.2,171,808,181,834,176C858.9,171,884,149,909,122.7C934.7,96,960,64,985,69.3C1010.5,75,1036,117,1061,122.7C1086.3,128,1112,96,1137,112C1162.1,128,1187,192,1213,202.7C1237.9,213,1263,171,1288,149.3C1313.7,128,1339,128,1364,149.3C1389.5,171,1415,213,1427,234.7L1440,256L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z"
          fill="#1d1e21"
        />
      </Svg>

      <Regions ref={regionsRef} onContinue={onContinue} />
    </View>
  );
};

export default memo(Welcome);
