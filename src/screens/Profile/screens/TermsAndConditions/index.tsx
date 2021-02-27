import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '~/components/Header';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import useStyles from '~/hooks/useStyles';

import getStyles from './styles';

const TermsAndConditions = () => {
  const { palette } = useTheme();
  const { translateY } = useAnimatedHeader();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={'Terms and Conditions'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showSearch={false}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        </Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          lobortis risus at pellentesque molestie. Vestibulum rhoncus eleifend
          lectus. Morbi placerat eget purus in mollis. Proin scelerisque dui
          vitae facilisis consectetur. Vivamus et mattis turpis. Maecenas
          scelerisque sodales metus, a mattis metus interdum et. Cras vel
          efficitur mi. Nullam eu sapien velit. Suspendisse vel ante nibh. Nunc
          id elit id turpis finibus condimentum. Sed scelerisque venenatis
          ipsum, ac consequat metus iaculis ut. Nulla euismod massa in lorem
          accumsan fermentum. Nullam in ullamcorper lacus, malesuada malesuada
          elit. Etiam ut dui nunc. Nam mollis non mauris ac luctus. Pellentesque
          vel nisi rutrum, posuere mi eget, viverra enim. Sed sed dui blandit,
          rutrum mi quis, finibus ante. Mauris maximus, lorem id semper
          facilisis, ligula augue ornare odio, non efficitur velit risus et
          urna. Sed cursus luctus orci eu tempus. Duis consectetur gravida
          ullamcorper. Integer sed felis porttitor risus scelerisque convallis
          ac in enim. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Aliquam volutpat posuere metus
          vestibulum volutpat. Phasellus consectetur lorem ligula, quis lacinia
          tortor lacinia vitae. Nunc vel purus nec erat congue rhoncus in in
          elit. Cras condimentum nisi orci. Mauris iaculis neque in dui
          venenatis sagittis. Sed a justo mi. Suspendisse ultricies porta
          lectus. Proin id vestibulum magna, id interdum orci. Fusce neque arcu,
          pellentesque vitae nisi id, semper interdum erat. Donec id enim nec
          libero viverra sollicitudin. Aenean quis rutrum augue, sed dignissim
          purus. Donec a est faucibus, rhoncus enim et, consectetur lacus.
          Pellentesque porta augue sit amet tortor maximus dictum. Duis ut
          consectetur tellus. Sed luctus finibus mi, nec facilisis augue feugiat
          sed. Donec tempor, arcu porttitor rutrum finibus, risus nibh porta
          enim, id convallis lorem nisl rutrum purus. Sed at magna et ex
          lobortis malesuada. Curabitur sagittis consequat ornare. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Aenean feugiat, risus sit amet bibendum accumsan, nulla eros
          placerat arcu, nec luctus lacus ex et diam. Etiam sagittis nibh a
          egestas consectetur. Donec sodales tempus neque ut eleifend. In at
          arcu erat. Proin vitae nisi ornare, ullamcorper lorem in, ultrices
          leo. Fusce porta ligula id euismod feugiat. Vivamus mattis aliquam
          augue quis interdum. Suspendisse erat tellus, porttitor ac diam eget,
          cursus ullamcorper velit. Donec quis nibh lacus. Phasellus efficitur,
          arcu eget ornare finibus, erat purus venenatis sapien, et placerat
          ipsum nulla non felis. Morbi ligula dui, aliquet ut vehicula in,
          laoreet eget sem. Proin tortor quam, suscipit in pellentesque
          consectetur, sollicitudin ac ipsum. Vivamus aliquam convallis orci at
          pulvinar. Nunc commodo malesuada iaculis. In hac habitasse platea
          dictumst. Sed augue quam, consectetur at ultricies ac, congue quis
          elit. Cras accumsan porta eros, sed sollicitudin orci sodales nec.
          Donec dictum ac nibh at rutrum. Nam cursus gravida arcu. Phasellus eu
          iaculis ante. Sed ornare nunc in posuere tincidunt. Sed non erat
          lacinia, luctus nibh nec, feugiat erat. Nunc mattis dolor sit amet
          finibus hendrerit. Praesent fringilla mauris mattis, commodo odio in,
          malesuada ante. Sed maximus nibh ut suscipit cursus. Phasellus
          lobortis malesuada vestibulum. Sed efficitur pretium quam ornare
          rutrum. Morbi mollis porta blandit. Phasellus laoreet purus mauris, et
          vulputate arcu pulvinar pharetra. Curabitur posuere tortor diam, a
          euismod lacus sodales at. Nulla facilisi. Integer ut gravida erat.
          Integer eu fringilla nulla, ut tincidunt ligula. Nulla mauris enim,
          porta nec libero id, porta rhoncus felis. Suspendisse potenti. Quisque
          commodo urna quis dolor tempus maximus. Aenean a lobortis purus, sit
          amet fermentum ligula. Aenean a aliquet nulla. In consequat eros in
          arcu congue, a volutpat metus sagittis. Suspendisse vulputate mi et
          magna rhoncus, vel elementum elit porttitor. Aenean sit amet
          ullamcorper dui, id tempus sem. Praesent ullamcorper pretium massa in
          tempor. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Morbi posuere fringilla velit varius laoreet. Nullam ac lacinia dolor,
          et tincidunt augue. Proin accumsan, ligula sed ultricies gravida,
          risus justo aliquam justo, sed tristique lacus nunc eu turpis.
          Maecenas eleifend orci et eros ullamcorper, vitae consequat ligula
          congue. Cras lectus magna, varius in porttitor ac, lacinia et libero.
          Aliquam vestibulum ornare nibh, sed cursus tellus pretium ut. Integer
          a lectus et enim placerat tincidunt. Vivamus in nisl enim.
          Pellentesque vitae justo mattis, ultricies justo convallis, vestibulum
          elit. Cras eget massa sagittis erat congue venenatis ac id est.
          Aliquam ac nulla eu purus scelerisque vulputate. Aliquam ante nibh,
          molestie vel elementum sed, hendrerit convallis libero. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Ut dolor ex, maximus
          et libero eget, pellentesque iaculis magna. Nulla vulputate eget ex
          vitae scelerisque. Sed et venenatis eros. Aenean odio dui, molestie
          sed lacus id, feugiat placerat enim. Quisque ipsum ante, pretium
          consectetur ultricies eget, dictum in felis. Integer suscipit
          fringilla libero a consectetur. Mauris quis eros dolor. Duis vitae mi
          diam. Nulla vestibulum lacus nulla, nec hendrerit orci finibus id.
          Aliquam venenatis, lorem sit amet ornare rutrum, sem purus malesuada
          lacus, eget viverra leo ligula nec erat. Nunc id aliquam erat. Integer
          commodo lorem ut scelerisque maximus. Vestibulum eget tempus sem, eu
          efficitur purus. Ut fermentum luctus dictum. Mauris ut volutpat diam.
          Maecenas elementum odio sit amet porta cursus. Aliquam dictum
          ultricies urna, ac suscipit orci dignissim vitae. Suspendisse vel
          mollis sem. Praesent pharetra sodales vehicula. Nulla eget turpis
          faucibus, accumsan felis a, semper nibh. Maecenas arcu tortor, laoreet
          et sapien ut, interdum convallis mi. Praesent odio magna, fringilla at
          tellus aliquam, scelerisque sodales tortor. Praesent vehicula est quis
          elit vestibulum, vitae lobortis eros ornare. Integer cursus lectus
          quis mi pharetra, et blandit tellus scelerisque. Maecenas sit amet
          auctor turpis. Curabitur semper justo ligula, nec viverra purus congue
          ac. Etiam viverra malesuada purus, id dictum libero aliquam nec. Nulla
          orci turpis, eleifend ut cursus in, lacinia quis dolor.
        </Text>
      </ScrollView>
    </View>
  );
};

export default memo(TermsAndConditions);
