import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {StyleSheet, View, TouchableOpacity, Platform, Text} from 'react-native';
import {CATEGORIES} from '../constants/categories';
import RadioItemScreen from './radio/RadioItemScreen';
import DevotionItemScreen from './devotion/DevotionItemScreen';
import TelevisionItemScreen from './television/TelevisionItemScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getSelect} from '../api/api';
import getModel from '../constants/models';

export default class ContentScreen extends Component {
  _getContent = async () => {
    return await getSelect(
      getModel(this.props.navigation.getParam('category')),
      this.props.navigation.getParam('id'),
    );
  };
  _renderCategory = (category, id) => {
    switch (category) {
      case CATEGORIES.radio:
        return <RadioItemScreen id={id} onData={this._getContent.bind(this)} />;
      case CATEGORIES.devotion:
        return <DevotionItemScreen id={id} onData={this._getContent.bind(this)} />;
      case CATEGORIES.television:
        return <TelevisionItemScreen id={id} onData={this._getContent.bind(this)} />;
    }
  };

  _renderHeader = category => {
    switch (category) {
      case CATEGORIES.radio:
        return <Text style={styles.headerText}>今日のラジオ</Text>;
      case CATEGORIES.television:
        return <Text style={styles.headerText}>今日のテレビ</Text>;
      case CATEGORIES.devotion:
        return <Text style={styles.headerText}>日々デボーション</Text>;
    }
  };

  _goBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <SafeAreaView style={styles.area}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={this._goBack.bind(this)}
            hitSlop={{right: 20}}>
            <Icon
              name={
                Platform.OS === 'ios'
                  ? 'ios-arrow-round-back'
                  : 'md-arrow-round-back'
              }
              size={wp(10)}
              color="white"
            />
          </TouchableOpacity>
          <View style={styles.headerTextView}>
            {this._renderHeader(this.props.navigation.getParam('category'))}
          </View>
        </View>
        <View style={styles.content}>
          {this._renderCategory(
            this.props.navigation.getParam('category'),
            this.props.navigation.getParam('id'),
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  header: {
    height: hp(8),
    backgroundColor: '#5584EE',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'center',
    paddingHorizontal: wp(3),
  },
  content: {
    flex: 1,
  },
  headerText: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: 'bold',
    marginRight: wp(10),
  },
  headerTextView: {
    flex: 1,
    alignItems: 'center',
  },
});
