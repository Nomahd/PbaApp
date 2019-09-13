import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContentBody = props => (
  <View style={styles.view}>
    <Text style={styles.bible}>
      {props.bible_book} {props.bible_chapter_verse}
    </Text>
    <Text style={styles.content}>{props.content}</Text>
    {props.messenger !== '' ? (
      <Text style={styles.messenger}>メッセンジャー: {props.messenger}</Text>
    ) : null}
    {props.guest !== '' ? (
      <Text style={styles.messenger}>ゲスト: {props.guest}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  view: {
    marginHorizontal: wp(2),
  },
  bible: {
    fontSize: wp(5),
    color: '#FEA600',
    fontWeight: 'bold',
  },
  content: {
    fontSize: wp(5),
    marginVertical: hp(2),
  },
  messenger: {
    fontSize: wp(5),
    marginVertical: hp(1),
    fontWeight: 'bold',
    color: '#FEA600',
  },
});
export default ContentBody;
