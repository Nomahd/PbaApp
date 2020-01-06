import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import {connect} from 'react-redux';
import {JAPANESE} from '../../constants/japanese';
import {openLink} from '../../helpers/linkHelper';
import {URLS} from '../../constants/urls';
import ScheduleBlock from '../../components/ScheduleBlock';
import COLORS from '../../constants/colors';
import {mapStateToProps} from '../../helpers/mapStateToProps';
import {hp, wp} from '../../utils/dimensions';

class RadioStationListScreen extends Component {
  _openPage = () => {
    openLink(URLS.ynhLink);
  };
  render() {
    let schedule1 = this.props.contentState.schedule.filter(
      element => element.category === 'ラジオ' && element.program === '世の光',
    );
    let schedule2 = this.props.contentState.schedule.filter(
      element =>
        element.category === 'ラジオ' && element.program === 'さわやか世の光',
    );
    let schedule3 = this.props.contentState.schedule.filter(
      element =>
        element.category === 'ラジオ' &&
        element.program === '世の光いきいきタイム',
    );
    const styles = StyleSheet.create({
      scrollArea: {
        flex: 1,
      },
      scrollContent: {
        alignItems: 'center',
      },
      button: {
        borderRadius: wp(3),
        borderWidth: wp(0.25),
        marginTop: hp(2),
        width: wp(60),
        height: hp(15),
        paddingVertical: hp(2),
        alignItems: 'center',
      },
      logo: {
        flex: 1,
        resizeMode: 'contain',
        width: '90%',
      },
      warningText: {
        fontSize: wp(2.5),
        marginTop: hp(0.5),
        color: COLORS.textColor,
      },
      color: {
        backgroundColor: COLORS.yonohikariGreen,
        borderColor: COLORS.yonohikariGreen,
      },
    });
    return (
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        keyExtractor={(item, index) => index.toString()}>
        <TouchableOpacity
          style={[
            styles.button,
            {borderColor: COLORS.yonohikariGreen},
          ]}
          onPress={this._openPage.bind(this)}>
          <Image
            style={styles.logo}
            source={require('../../../res/img/logo_YNH.png')}
          />
        </TouchableOpacity>
        <Text style={styles.warningText}>
          {JAPANESE.warningExternal}
        </Text>
        {schedule1.length === 0 ? null : (
          <ScheduleBlock colorStyle={styles.color} rows={schedule1} />
        )}
        {schedule2.length === 0 ? null : (
          <ScheduleBlock colorStyle={styles.color} rows={schedule2} />
        )}
        {schedule3.length === 0 ? null : (
          <ScheduleBlock colorStyle={styles.color} rows={schedule3} />
        )}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(RadioStationListScreen);
