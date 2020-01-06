import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {JAPANESE} from '../../constants/japanese';
import {openLink} from '../../helpers/linkHelper';
import {URLS} from '../../constants/urls';
import ScheduleBlock from '../../components/ScheduleBlock';
import COLORS from '../../constants/colors';
import {connect} from 'react-redux';
import {mapStateToProps} from '../../helpers/mapStateToProps';
import {hp, wp} from '../../utils/dimensions';

class TelevisionStationListScreen extends Component {
  _openPage = () => {
    openLink(URLS.llLink);
  };
  render() {
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
        paddingVertical: hp(3),
        paddingHorizontal: wp(4),
        alignItems: 'center',
      },
      logo: {
        flex: 1,
        resizeMode: 'contain',
      },
      warningText: {
        fontSize: wp(2.5),
        marginTop: hp(0.5),
        color: COLORS.textColor,
      },
      color: {
        backgroundColor: COLORS.lifelineBlue,
        borderColor: COLORS.lifelineBlue,
      },
    });
    let schedule = this.props.contentState.schedule.filter(
      element => element.category === 'テレビ',
    );
    return (
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[styles.button, {borderColor: COLORS.lifelineBlue}]}
          onPress={this._openPage.bind(this)}>
          <Image
            style={styles.logo}
            source={require('../../../res/img/logo_LL.png')}
          />
        </TouchableOpacity>
        <Text style={styles.warningText}>
          {JAPANESE.warningExternal}
        </Text>
        {schedule.length === 0 ? null : (
          <ScheduleBlock colorStyle={styles.color} rows={schedule} />
        )}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(TelevisionStationListScreen);
