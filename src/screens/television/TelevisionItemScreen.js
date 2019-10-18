import React, {Component} from 'react';
import JAPANESE from '../../constants/japanese';
import {SafeAreaView} from 'react-navigation';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ContentTitle from '../../components/ContentTitle';
import {WebView} from 'react-native-webview';
import ContentBody from '../../components/ContentBody';
import Orientation from 'react-native-orientation-locker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CATEGORIES} from '../../constants/categories';
import COLORS from '../../constants/colors';

export default class TelevisionItemScreen extends Component {
  _isMounted = false;
  state = {
    data: null,
  };

  componentDidMount() {
    Orientation.unlockAllOrientations();
    this._isMounted = true;
    this.props.onData().then(data => {
      if (this._isMounted) {
        this.setState({data: data});
      }
    });
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    this._isMounted = false;
  }

  render() {
    return this.state.data != null ? (
      <ScrollView style={styles.container}>
        <ContentTitle title={this.state.data.title} />
        {this.state.data.guest ? (
          <View style={styles.contentView}>
            <Text style={styles.info}>{this.state.data.guest}</Text>
          </View>
        ) : null}

        <WebView
          style={styles.webView}
          scrollEnabled={false}
          bounces={false}
          mediaPlaybackRequiresUserAction={false}
          originWhiteList={['*']}
          allowsFullscreenVideo={true}
          source={{
            html: `
                <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
                  <div id="video" style="text-align:center;"></div>
                  <script src="https://player.vimeo.com/api/player.js"></script>
                  <script>let options = {
                          url: "${this.state.data.link}",
                          width: ${wp(95)},
                          title: false,
                          portrait: false,
                          playsinline: false,
                        };
                      let videoPlayer = new Vimeo.Player('video', options);</script>
                `,
          }}
        />
        <View style={styles.contentView}>
          {this.state.data.messenger ? (
            <Text style={styles.info}>
              メッセンジャー：{this.state.data.messenger}
            </Text>
          ) : null}
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
    height: wp(55),
    width: wp(100),
  },
  activityIndicator: {
    flex: 1,
    marginTop: hp(10),
  },
  contentView: {
    marginHorizontal: wp(2),
  },
  info: {
    color: COLORS.textColor,
    fontWeight: 'bold',
    fontSize: wp(4),
    marginBottom: hp(2),
  },
  description: {
    color: COLORS.textColor,
  },
});
