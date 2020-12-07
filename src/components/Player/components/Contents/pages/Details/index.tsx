import isEqual from 'lodash.isequal';
import React, { memo } from 'react';
import { Linking, Text } from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import StyleGuide from '~/utils/StyleGuide';
import Programming from './components/Programming';
import styles from './styles';

const Details = ({ routeProps }) => {
  const { description, address, programming, web } = routeProps?.radio || {};

  const openSite = async () => {
    const supported = await Linking.canOpenURL(web);

    if (supported) {
      await Linking.openURL(web);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      {!!description && (
        <>
          <Text style={[styles.title, { paddingTop: StyleGuide.spacing * 2 }]}>
            Sobre a rádio
          </Text>
          <Text style={styles.description}>{description}</Text>
        </>
      )}

      {!!programming && (
        <>
          <Text style={styles.title}>Programação</Text>
          <Programming programming={programming} />
        </>
      )}

      {!!address && (
        <>
          <Text style={styles.title}>Endereço</Text>
          <Text style={styles.description}>{address}</Text>
        </>
      )}

      {!!web && (
        <>
          <Text style={styles.title}>Site</Text>
          <TouchableWithoutFeedback onPress={openSite}>
            <Text style={[styles.description, styles.link]}>{web}</Text>
          </TouchableWithoutFeedback>
        </>
      )}
    </ScrollView>
  );
};

export default memo(Details, isEqual);

//description
//generos
//frecuencies
//address
//email
//cidade, estado, pais
//programming
//web
