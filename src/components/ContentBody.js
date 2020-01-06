import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {wp, hp} from '../utils/dimensions';
import COLORS from '../constants/colors';

const ContentBody = props => {
  const styles = StyleSheet.create({
    view: {
      marginHorizontal: wp(2),
      backgroundColor: 'red',
    },
    bible: {
      fontSize: wp(5),
      color: COLORS.textColor,
      fontWeight: 'bold',
      backgroundColor: 'green',
    },
    content: {
      fontSize: wp(3),
      marginVertical: hp(2),
      backgroundColor: 'orange',
    },
    messenger: {
      fontSize: wp(5),
      marginVertical: hp(1),
      fontWeight: 'bold',
      color: '#FEA600',
      backgroundColor: 'yellow',
    },
  });

  return (
    <View style={styles.view}>
      {props.bible_book ? (
        <Text style={styles.bible}>
          {props.bible_book} {props.bible_chapter_verse}
        </Text>
      ) : null}
      <Text style={styles.content}>{props.content}</Text>
      {props.messenger !== '' ? (
        <Text style={styles.messenger}>メッセンジャー: {props.messenger}</Text>
      ) : null}
      {props.guest !== '' ? (
        <Text style={styles.messenger}>ゲスト: {props.guest}</Text>
      ) : null}
    </View>
  );
};

export default ContentBody;
