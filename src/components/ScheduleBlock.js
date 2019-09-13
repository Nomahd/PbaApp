import React from 'react';
import {Image, StyleSheet, ScrollView, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScheduleBlock = props => {
  let textReturn = [];
  const _generateList = list => {
    list.forEach((value, index) => {
      if (value.date2 === null) {
        textReturn.push(
          <View key={index} style={styles.row}>
            <Text style={styles.station}>{value.station}</Text>
            <Text style={styles.date}>{value.date1}</Text>
            <Text style={styles.time}>{value.time1}</Text>
          </View>,
        );
      } else {
        textReturn.push(
          <View key={index} style={styles.row}>
            <Text style={styles.station}>{value.station}</Text>
            <Text style={styles.date}>{value.date1}</Text>
            <Text style={styles.time}>{value.time1}</Text>
          </View>,
          <View key={index + 'x'} style={styles.rowExtra}>
            <Text style={styles.station}>{null}</Text>
            <Text style={styles.date}>{value.date2}</Text>
            <Text style={styles.time}>{value.time2}</Text>
          </View>,
        );
      }
    });
    return textReturn;
  };
  return <View style={[styles.box, props.colorStyle]}>{_generateList(props.list)}</View>;
};

export default ScheduleBlock;

const styles = StyleSheet.create({
  box: {
    marginTop: hp(2),
    width: wp(80),
    flex: 1,
    borderRadius: wp(3),
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp(2),
  },
  rowExtra: {
    flex: 1,
    flexDirection: 'row',
  },
  station: {
    flex: 3,
    fontSize: wp(2.75),
    color: 'white',
    fontWeight: 'bold',
  },
  date: {
    flex: 2,
    fontSize: wp(2.75),
    color: 'white',
  },
  time: {
    flex: 1,
    fontSize: wp(2.75),
    color: 'white',
  },
});
