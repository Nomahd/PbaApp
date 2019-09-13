import React, {Component} from 'react';
import {Image, TouchableOpacity, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import listScreenStyles from '../../styles/stationListScreenStyles';
import {JAPANESE} from '../../constants/japanese';
import {openLink} from '../../helpers/linkHelper';
import {URLS} from '../../constants/urls';
import {
  ynh10radioSchedule,
  ynh15radioSchedule,
  ynh5radioSchedule,
} from '../../constants/schedules';
import ScheduleBlock from '../../components/ScheduleBlock';

export default class RadioStationListScreen extends Component {
  _openPage = () => {
    openLink(URLS.ynhLink);
  };
  render() {
    return (
      <ScrollView
        style={listScreenStyles.scrollArea}
        contentContainerStyle={listScreenStyles.scrollContent}
        keyExtractor={(item, index) => index.toString()}>
        <TouchableOpacity
          style={listScreenStyles.button}
          onPress={this._openPage.bind(this)}>
          <Image
            style={listScreenStyles.logo}
            source={require('../../../res/img/logo_YNH.png')}
          />
        </TouchableOpacity>
        <Text style={listScreenStyles.warningText}>
          {JAPANESE.warningExternal}
        </Text>
        <ScheduleBlock colorStyle={style.color} list={ynh5radioSchedule} />
        <ScheduleBlock colorStyle={style.color} list={ynh10radioSchedule} />
        <ScheduleBlock colorStyle={style.color} list={ynh15radioSchedule} />
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  color: {
    backgroundColor: '#00B436',
    borderColor: '#00B436',
  },
});
