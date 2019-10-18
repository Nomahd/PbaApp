import React from 'react';
import {Image, StyleSheet, ScrollView, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScheduleBlock = props => {
  const _generateList = (row, index) => {
    return (
      <View key={index}>
        <View style={styles.row}>
          <Text style={styles.station}>{row.station}</Text>
          <View style={styles.dateView}>
            <Text style={styles.date}>({row.start_day})</Text>
            {row.end_day ? (
              <Text style={styles.date}>~</Text>
            ) : (
              <Text style={styles.date}>{''}</Text>
            )}
            {row.end_day ? (
              <Text style={styles.date}>({row.end_day})</Text>
            ) : (
              <Text style={styles.date}>{''}</Text>
            )}
          </View>
          <Text style={styles.time}>{row.time}</Text>
        </View>
        {row.extra_day_start ? (
          <View style={styles.row}>
            <Text style={styles.station}>{''}</Text>
            <View style={styles.dateView}>
              <Text style={styles.date}>({row.extra_day_start})</Text>
              {row.extra_day_end ? (
                <Text style={styles.date}>~</Text>
              ) : (
                <Text style={styles.date}>{''}</Text>
              )}
              {row.extra_day_end ? (
                <Text style={styles.date}>({row.extra_day_end})</Text>
              ) : (
                <Text style={styles.date}>{''}</Text>
              )}
            </View>
            <Text style={styles.time}>{row.extra_time}</Text>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={[styles.box, props.colorStyle]}>
      {props.rows.map((row, index) => _generateList(row, index))}
    </View>
  );
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
    flex: 2,
    flexDirection: 'row',
    marginTop: hp(2),
  },
  rowExtra: {
    flex: 2,
    flexDirection: 'row',
  },
  dateView: {
    flexDirection: 'row',
    flex: 2,
  },
  station: {
    flexWrap: 'nowrap',
    flex: 3,
    fontSize: wp(2.75),
    color: 'white',
    fontWeight: 'bold',
  },
  date: {
    textAlign: 'center',
    flex: 1,
    fontSize: wp(2.75),
    color: 'white',
  },
  time: {
    flex: 1,
    fontSize: wp(2.75),
    color: 'white',
    textAlign: 'right',
  },
});
