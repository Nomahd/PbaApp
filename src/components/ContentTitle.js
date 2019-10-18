import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../constants/colors';

const ContentTitle = props => (
  <View style={styles.view}>
    <Text numberOfLines={1} style={styles.title}>
      {props.title}
    </Text>
  </View>
);

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
export default ContentTitle;
