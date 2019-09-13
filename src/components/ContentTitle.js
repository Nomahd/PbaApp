import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContentTitle = props => (
  <View style={styles.view}>
    <Text style={styles.title}>
      {props.title}
    </Text>
    <Text style={styles.date}>{props.broadcast_date}</Text>
  </View>
);

const styles = StyleSheet.create({
  view: {
    marginHorizontal: wp(2),
  },
  title: {
    fontSize: wp(8),
    color: '#1C208C',
    marginVertical: hp(2),
  },
  date: {
    fontSize: wp(5),
    marginBottom: hp(1),
  },
});
export default ContentTitle;
