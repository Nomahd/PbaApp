import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {CATEGORIES} from '../../constants/categories';
import ContentTitle from '../../components/ContentTitle';
import {WebView} from 'react-native-webview';
import {URLS} from '../../constants/urls';
import ContentBody from '../../components/ContentBody';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getProfile} from '../../api/api';
import COLORS from '../../constants/colors';

export default class RadioItemScreen extends Component {
  _isMounted = false;
  state = {
    data: null,
    messenger: {
      photo_link: null,
      profile: null,
    },
  };

  _getMessengerProfile = data => {
    getProfile(data.messenger, 'audio', 'messenger').then(data => {
      this.setState({messenger: data[0]});
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.onData().then(data => {
      if (this._isMounted) {
        this.setState({data: data});
        this._getMessengerProfile(data);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.state.data != null ? (
      <ScrollView style={styles.container}>
        <ContentTitle title={this.state.data.title} />
        <WebView
          style={styles.webView}
          originWhiteList={['*']}
          scrollEnabled={false}
          bounces={false}
          source={{
            html: `
                <meta name="viewport" content="initial-scale=1.0, user-scalable=no">           
                <audio style="width:100%;display:block" controls controlsList="nodownload"><source src="${URLS.pbaAudio +
                  this.state.data.filename}"></audio>`,
          }}
        />
        <View style={styles.contentView}>
          {this.state.data.bible_book || this.state.data.bible_chapter_verse ? (
            <Text style={styles.info}>
              {this.state.data.bible_book ? this.state.data.bible_book : null}{' '}
              {this.state.data.bible_chapter_verse
                ? this.state.data.bible_chapter_verse
                : null}
            </Text>
          ) : null}
          {this.state.data.description ? (
            <Text
              style={[styles.description, {fontSize: wp(this.props.fontSize)}]}>
              {this.state.data.description}
            </Text>
          ) : null}
          {this.state.data.messenger ? (
            <View style={styles.messengerView}>
              {this.state.messenger.photo_link ? (
                <Image
                  style={styles.profilePicture}
                  source={{
                    uri:
                      URLS.pbaProfilePictures + this.state.messenger.photo_link,
                  }}
                />
              ) : null}
              <View style={styles.messengerInfoView}>
                <Text style={styles.messengerName}>
                  メッセンジャー：{this.state.data.messenger}
                </Text>
                {this.state.messenger.profile ? (
                  <Text
                    style={[
                      styles.messengerProfile,
                      {fontSize: wp(this.props.fontSize)},
                    ]}>
                    {this.state.messenger.profile}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    ) : (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    width: wp(95),
    height: hp(10),
    alignSelf: 'center',
  },
  activityIndicator: {
    marginTop: hp(5),
  },
  contentView: {
    marginHorizontal: wp(2),
  },
  messengerView: {
    flexDirection: 'row',
  },
  profilePicture: {
    flex: 1,
    height: hp(30),
  },
  messengerInfoView: {
    flex: 2,
    marginLeft: wp(1),
  },
  messengerName: {
    color: COLORS.textColor,
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  messengerProfile: {
    color: COLORS.textColor,
  },
  info: {
    color: COLORS.textColor,
    fontWeight: 'bold',
    fontSize: wp(4),
    marginBottom: hp(2),
  },
  description: {
    color: COLORS.textColor,
    marginBottom: hp(2),
  },
});
