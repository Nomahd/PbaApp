import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import listScreenStyles from '../../styles/stationListScreenStyles';
import {JAPANESE} from '../../constants/japanese';
import {openLink} from '../../helpers/linkHelper';
import {URLS} from '../../constants/urls';
import ScheduleBlock from '../../components/ScheduleBlock';
import {llTvSchedule} from '../../constants/schedules';

export default class TelevisionStationListScreen extends Component {
  _openPage = () => {
    openLink(URLS.llLink);
  };
  render() {
    return (
      <ScrollView
        style={listScreenStyles.scrollArea}
        contentContainerStyle={listScreenStyles.scrollContent}>
        <TouchableOpacity
          style={listScreenStyles.button}
          onPress={this._openPage.bind(this)}>
          <Image
            style={listScreenStyles.logo}
            source={require('../../../res/img/logo_LL.png')}
          />
        </TouchableOpacity>
        <Text style={listScreenStyles.warningText}>{JAPANESE.warningExternal}</Text>
        <ScheduleBlock colorStyle={style.color} list={llTvSchedule} />
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  color: {
    backgroundColor: '#0088D5',
    borderColor: '#0088D5',
  },
});


