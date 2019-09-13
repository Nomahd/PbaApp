import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StyleSheet,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import {mapStateToProps} from '../helpers/mapStateToProps';
import {DATES} from '../constants/dates';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {NAV} from '../navigators/Nav';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CATEGORIES} from '../constants/categories';
import Orientation from 'react-native-orientation-locker';

class HomeScreen extends Component {
  focusSub;
  state = {
    date: new Date(),
  };
  componentDidMount() {
    Orientation.lockToPortrait();
    this.focusSub = this.props.navigation.addListener('didFocus', () => {
      const newDate = new Date();
      this.setState({date: newDate});
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    return false;
  };
  componentWillUnmount() {
    this.focusSub.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _openTodayTelevision = () => {
    if (this.props.contentState.today.video.id != null) {
      this.props.navigation.navigate(NAV.Content, {
        category: CATEGORIES.television,
        id: this.props.contentState.today.video.id,
      });
    }
  };

  _openTodayDevotion = () => {
    if (this.props.contentState.today.devotion.id != null) {
      this.props.navigation.navigate(NAV.Content, {
        category: CATEGORIES.devotion,
        id: this.props.contentState.today.devotion.id,
      });
    }
  };

  _openTodayRadio = () => {
    if (this.props.contentState.today.audio.id != null) {
      this.props.navigation.navigate(NAV.Content, {
        category: CATEGORIES.radio,
        id: this.props.contentState.today.audio.id,
      });
    }
  };

  render() {
    const videoTitle = this.props.contentState.today.video.title;
    const audioTitle = this.props.contentState.today.audio.title;
    const devotionTitle = this.props.contentState.today.devotion.title;
    return (
      <SafeAreaView
        style={
          Platform.OS === 'ios'
            ? styles.iosViewStyles
            : styles.androidViewStyles
        }>
        <View style={styles.dateViewStyles}>
          <Text style={styles.dateStyles}>
            {DATES[this.state.date.getDay()]} {this.state.date.getMonth()}月
            {this.state.date.getDate()}日
          </Text>
          <Text style={styles.todayStyles}>今日のメディア</Text>
        </View>
        <TouchableOpacity
          style={styles.touchableImage}
          onPress={this._openTodayTelevision.bind(this)}>
          <ImageBackground
            style={styles.imageBackgroundStyles}
            imageStyle={{borderRadius: wp(3)}}
            source={require('../../res/img/main-bg-2.jpg')}>
            <View style={styles.imageOverlayStyles}>
              <Text style={styles.imageOverlayTextStyles}>今日のテレビ</Text>
              <Text style={styles.imageOverlayTitleStyles} numberOfLines={1}>
                {videoTitle !== null ? (
                  videoTitle
                ) : (
                  <ActivityIndicator
                    size="large"
                    style={styles.activityIndicator}
                  />
                )}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.bottomViewStyles}>
          <TouchableOpacity
            style={styles.bottomContentStyles}
            onPress={this._openTodayDevotion.bind(this)}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
              size={hp(8)}
              color={'white'}
              style={styles.bottomIconStyles}
            />
            <View style={styles.bottomContentInsideViewStyles}>
              <Text style={styles.bottomContentTextStyles}>
                日々デボーション
              </Text>
              <Text
                style={[styles.bottomContentTitleStyles, {fontWeight: 'bold'}]}
                numberOfLines={1}>
                {devotionTitle !== null ? (
                  devotionTitle
                ) : (
                  <ActivityIndicator
                    size="large"
                    style={styles.activityIndicator}
                  />
                )}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomContentStyles, {backgroundColor: '#FF9000'}]}
            onPress={this._openTodayRadio.bind(this)}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-headset' : 'md-headset'}
              size={hp(8)}
              color={'white'}
              style={styles.bottomIconStyles}
            />

            <View style={styles.bottomContentInsideViewStyles}>
              <Text style={styles.bottomContentTextStyles}>今日のラジオ</Text>
              <Text
                style={[styles.bottomContentTitleStyles, {fontWeight: 'bold'}]}
                numberOfLines={1}>
                {audioTitle !== null ? (
                  audioTitle
                ) : (
                  <ActivityIndicator
                    size="large"
                    style={styles.activityIndicator}
                  />
                )}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  iosViewStyles: {
    flex: 1,
    marginTop: hp(5),
    alignSelf: 'center',
    width: wp(90),
  },
  androidViewStyles: {
    flex: 1,
    marginTop: hp(2),
    alignSelf: 'center',
    width: wp(90),
  },
  touchableImage: {
    height: hp(40),
    marginBottom: hp(3),
  },
  imageBackgroundStyles: {
    height: hp(40),
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.50)',
    borderRadius: wp(3),
    marginBottom: hp(3),
  },
  dateViewStyles: {
    marginBottom: hp(1),
  },
  dateStyles: {
    fontSize: hp(2.5),
    marginBottom: hp(0.5),
    color: 'grey',
  },
  todayStyles: {
    fontSize: hp(6),
    fontWeight: 'bold',
  },
  imageOverlayStyles: {
    height: '30%',
    width: '100%',
    marginBottom: hp(3),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.50)',
  },
  imageOverlayTextStyles: {
    color: 'white',
    fontSize: wp(4),
    alignSelf: 'center',
  },
  imageOverlayTitleStyles: {
    marginTop: hp(2),
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(6),
    alignSelf: 'center',
    marginLeft: wp(2),
    marginRight: wp(2),
  },
  bottomViewStyles: {
    flex: 1,
  },
  bottomContentStyles: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: hp(3),
    borderRadius: wp(3),
    backgroundColor: '#1C208C',
  },
  bottomIconStyles: {
    marginLeft: wp(5),
    alignSelf: 'center',
  },
  bottomContentTextStyles: {
    color: 'white',
    fontSize: wp(4),
  },
  bottomContentInsideViewStyles: {
    flex: 1,
    marginTop: hp(3),
    marginLeft: wp(5),
    flexDirection: 'column',
  },
  bottomContentTitleStyles: {
    marginRight: wp(2),
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(5),
  },
  activityIndicator: {
    marginTop: 10,
  },
});
