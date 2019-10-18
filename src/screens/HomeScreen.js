import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
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
import {getBackground} from '../helpers/backgroundHelper';
import COLORS from '../constants/colors';

class HomeScreen extends Component {
  focusSub;
  blurSub;
  state = {
    date: new Date(),
    currentBackground: Math.floor(Math.random() * 4),
    backgroundImageCount: 4,
  };
  componentDidMount() {
    Orientation.lockToPortrait();
    this.focusSub = this.props.navigation.addListener('didFocus', () => {
      const newDate = new Date();
      this.setState({date: newDate});
    });
    this.blurSub = this.props.navigation.addListener('willBlur', () => {
      let nextBackground = this.state.currentBackground + 1;
      if (nextBackground < this.state.backgroundImageCount) {
        this.setState({currentBackground: nextBackground});
      } else {
        this.setState({currentBackground: 0});
      }
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    return false;
  };
  componentWillUnmount() {
    this.blurSub.remove();
    this.focusSub.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _openTodayTelevision = () => {
    if (this.props.contentState.today.video.id) {
      this.props.navigation.navigate(NAV.Content, {
        category: CATEGORIES.television,
        id: this.props.contentState.today.video.id,
      });
    }
  };

  _openTodayDevotion = () => {
    if (this.props.contentState.today.devotion.id) {
      this.props.navigation.navigate(NAV.Content, {
        category: CATEGORIES.devotion,
        id: this.props.contentState.today.devotion.id,
      });
    }
  };

  _openTodayRadio = () => {
    if (this.props.contentState.today.audio.id) {
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
    let backgroundImage = getBackground(
      this.state.currentBackground,
      this.state.backgroundImageCount,
    );
    return (
      <SafeAreaView style={styles.mainView}>
        <TouchableOpacity
          style={styles.videoImageTouchable}
          onPress={this._openTodayTelevision.bind(this)}>
          <ImageBackground
            style={styles.videoImageBackground}
            source={backgroundImage}
            imageStyle={styles.videoImage}>
            <View style={styles.videoImageOverlay}>
              <Text style={styles.videoImageOverlayHeader}>
                今週の「ライフ・ライン」
              </Text>
              {videoTitle !== null ? (
                <Text
                  style={[styles.videoImageOverlayTitle, {fontWeight: 'bold'}]}
                  numberOfLines={2}>
                  {videoTitle}
                </Text>
              ) : (
                <ActivityIndicator
                  size="large"
                  style={styles.activityIndicatorTop}
                />
              )}
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.subView}>
          <TouchableOpacity
            style={styles.bottomContentTouchables}
            onPress={this._openTodayDevotion.bind(this)}>
            <View style={styles.bottomIconWrapper}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
                size={hp(8)}
                color={'white'}
                style={styles.bottomIcons}
              />
            </View>
            <View style={styles.bottomTextViews}>
              <Text style={styles.bottomHeaders}>
                {this.state.date.getMonth()}月{this.state.date.getDate()}日 (
                {DATES[this.state.date.getDay()]}) 日デボーション
              </Text>
              {devotionTitle !== null ? (
                <Text
                  style={[
                    styles.bottomTitles,
                    {fontWeight: 'bold'},
                  ]}
                  numberOfLines={1}>
                  {devotionTitle}
                </Text>
              ) : (
                <ActivityIndicator
                  size="large"
                  style={styles.activityIndicator}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomContentTouchables}
            onPress={this._openTodayRadio.bind(this)}>
            <View style={styles.bottomIconWrapper}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-headset' : 'md-headset'}
                size={hp(8)}
                color={'white'}
                style={styles.bottomIcons}
              />
            </View>
            <View style={styles.bottomTextViews}>
              <Text style={styles.bottomHeaders}>今日のラジオ</Text>
              {audioTitle !== null ? (
                <Text
                  style={[styles.bottomTitles, {fontWeight: 'bold'}]}
                  numberOfLines={1}>
                  {audioTitle}
                </Text>
              ) : (
                <ActivityIndicator
                  size="large"
                  style={styles.activityIndicator}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
  videoImageTouchable: {
    height: hp(65),
    justifyContent: 'flex-end',
  },
  videoImageBackground: {
    height: '100%',
    backgroundColor: 'grey',
    justifyContent: 'flex-end',
  },
  videoImage: {
    resizeMode: 'stretch',
    alignSelf: 'flex-start',
  },
  videoImageOverlay: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBlack,
  },
  videoImageOverlayHeader: {
    color: 'white',
    fontSize: wp(6),
    alignSelf: 'center',
  },
  videoImageOverlayTitle: {
    marginTop: hp(2),
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(6),
    alignSelf: 'center',
    marginHorizontal: wp(2),
  },
  subView: {
    flex: 1,
  },
  bottomContentTouchables: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomIconWrapper: {
    marginLeft: wp(5),
    alignSelf: 'center',
    justifyContent: 'center',
    height: '80%',
    aspectRatio: 1,
    borderRadius: hp(1),
    backgroundColor: COLORS.babyBlue,
  },
  bottomIcons: {
    alignSelf: 'center',
  },
  bottomTextViews: {
    flex: 1,
    marginTop: hp(1),
    marginLeft: wp(5),
    flexDirection: 'column',
  },
  bottomHeaders: {
    fontSize: wp(4),
    color: COLORS.textColor,
  },
  bottomTitles: {
    marginRight: wp(2),
    fontWeight: 'bold',
    fontSize: wp(5),
    marginTop: hp(1),
    color: COLORS.textColor,
  },
  activityIndicator: {
    alignSelf: 'flex-start',
  },
  activityIndicatorTop: {
    alignSelf: 'center',
  },
});
