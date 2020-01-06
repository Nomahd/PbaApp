import React, {Component} from 'react';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {JAPANESE} from '../../constants/japanese';
import {openLink} from '../../helpers/linkHelper';
import {URLS} from '../../constants/urls';
import {wp, hp} from '../../utils/dimensions';
import COLORS from '../../constants/colors';

export default class DonateScreen extends Component {
  _onPress() {
    openLink(URLS.pbaDonation);
  }

  render() {
    const styles = StyleSheet.create({
      area: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      touchable: {
        width: wp(80),
        height: hp(60),
        borderWidth: wp(0.5),
        borderColor: COLORS.blue,
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        height: hp(50),
        width: wp(70),
        resizeMode: 'cover',
      },
      donateText: {
        color: COLORS.darkOrange,
        fontSize: wp(5.5),
        fontWeight: 'bold',
        marginBottom: hp(2),
      },
      warningText: {
        fontSize: wp(3),
        marginTop: hp(1),
      },
    });
    return (
      <SafeAreaView style={styles.area}>
        <Text style={styles.donateText}>{JAPANESE.messageDonation}</Text>
        <TouchableOpacity
          style={styles.touchable}
          onPress={this._onPress.bind(this)}>
          <Image
            style={styles.image}
            source={require('../../../res/img/webpage.png')}
          />
        </TouchableOpacity>
        <Text style={styles.warningText}>{JAPANESE.warningExternal}</Text>
      </SafeAreaView>
    );
  }
}
