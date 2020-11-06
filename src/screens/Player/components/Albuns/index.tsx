import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';

const { width, height } = Dimensions.get('window');

const Albuns = () => {
  //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
  //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
  let dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  const _layoutProvider = new LayoutProvider(
    (index) => 0,
    (type, dim) => {
      dim.width = width;
      dim.height = 250;
    },
  );

  //Given type and data return the view component
  const _rowRenderer = (type, data) => {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Text>Radio: {data}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ height: 250, width }}>
      <RecyclerListView
        layoutProvider={_layoutProvider}
        showsHorizontalScrollIndicator={false}
        dataProvider={dataProvider.cloneWithRows([
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
        ])}
        rowRenderer={_rowRenderer}
        isHorizontal
        snapToInterval={width}
        disableIntervalMomentum
      />
    </View>
  );
};

const styles = {
  container: {
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    width: width * 0.8,
    borderRadius: 4,
    backgroundColor: '#ffbb00',
  },
};

export default Albuns;
