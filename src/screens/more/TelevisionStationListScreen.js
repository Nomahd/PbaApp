import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import listScreenStyles from '../../styles/stationListScreenStyles';
import {JAPANESE} from '../../constants/japanese';
import {openLink} from '../../helpers/linkHelper';
import {URLS} from '../../constants/urls';
import ScheduleBlock from '../../components/ScheduleBlock';
import COLORS from '../../constants/colors';
import {connect} from 'react-redux';
import {mapStateToProps} from '../../helpers/mapStateToProps';

class TelevisionStationListScreen extends Component {
  _openPage = () => {
    openLink(URLS.llLink);
  };
  render() {
    let schedule = this.props.contentState.schedule.filter(
      element => element.category === 'テレビ',
    );
    return (
      <ScrollView
        style={listScreenStyles.scrollArea}
        contentContainerStyle={listScreenStyles.scrollContent}>
        <TouchableOpacity
          style={[listScreenStyles.button, {borderColor: COLORS.lifelineBlue}]}
          onPress={this._openPage.bind(this)}>
          <Image
            style={listScreenStyles.logo}
            source={require('../../../res/img/logo_LL.png')}
          />
        </TouchableOpacity>
        <Text style={listScreenStyles.warningText}>
          {JAPANESE.warningExternal}
        </Text>
        {schedule.length === 0 ? null : (
          <ScheduleBlock colorStyle={style.color} rows={schedule} />
        )}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(TelevisionStationListScreen);

const style = StyleSheet.create({
  color: {
    backgroundColor: COLORS.lifelineBlue,
    borderColor: COLORS.lifelineBlue,
  },
});
