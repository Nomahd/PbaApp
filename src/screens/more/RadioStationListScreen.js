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
import listScreenStyles from '../../styles/stationListScreenStyles';
import {JAPANESE} from '../../constants/japanese';
import {openLink} from '../../helpers/linkHelper';
import {URLS} from '../../constants/urls';
import ScheduleBlock from '../../components/ScheduleBlock';
import COLORS from '../../constants/colors';
import {mapStateToProps} from '../../helpers/mapStateToProps';

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

    return (
      <ScrollView
        style={listScreenStyles.scrollArea}
        contentContainerStyle={listScreenStyles.scrollContent}
        keyExtractor={(item, index) => index.toString()}>
        <TouchableOpacity
          style={[
            listScreenStyles.button,
            {borderColor: COLORS.yonohikariGreen},
          ]}
          onPress={this._openPage.bind(this)}>
          <Image
            style={listScreenStyles.logo}
            source={require('../../../res/img/logo_YNH.png')}
          />
        </TouchableOpacity>
        <Text style={listScreenStyles.warningText}>
          {JAPANESE.warningExternal}
        </Text>
        {schedule1.length === 0 ? null : (
          <ScheduleBlock colorStyle={style.color} rows={schedule1} />
        )}
        {schedule2.length === 0 ? null : (
          <ScheduleBlock colorStyle={style.color} rows={schedule2} />
        )}
        {schedule3.length === 0 ? null : (
          <ScheduleBlock colorStyle={style.color} rows={schedule3} />
        )}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(RadioStationListScreen);
const style = StyleSheet.create({
  color: {
    backgroundColor: COLORS.yonohikariGreen,
    borderColor: COLORS.yonohikariGreen,
  },
});
