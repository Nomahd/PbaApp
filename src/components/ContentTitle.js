import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {wp, hp} from '../utils/dimensions';
import COLORS from '../constants/colors';

const ContentTitle = props => {
  const styles = StyleSheet.create({
    view: {
      marginHorizontal: wp(2),
    },
    title: {
      fontSize: wp(7),
      color: COLORS.blue,
      marginVertical: hp(1.5),
    },
  });

  return (
    <View style={styles.view}>
      <Text numberOfLines={1} style={styles.title}>
        {props.title}
      </Text>
    </View>
  );
};

export default ContentTitle;
