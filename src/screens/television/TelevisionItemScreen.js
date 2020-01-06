import React, {Component} from 'react';
import {
  ActivityIndicator, Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ContentTitle from '../../components/ContentTitle';
import {WebView} from 'react-native-webview';
import ContentBody from '../../components/ContentBody';
import Orientation from 'react-native-orientation-locker';
import {wp, hp, setDimensions} from '../../utils/dimensions';
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
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      activityIndicator: {
        flex: 1,
        marginTop: hp(10),
      },
      contentView: {
        marginHorizontal: wp(2),
        marginVertical: hp(2),
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
      webview: {
        width: wp(95),
        height: wp(55),
      },
      webviewContainer: {
        alignItems: 'center',
      },
    });
    return this.state.data != null ? (
      <ScrollView style={styles.container}>
        <ContentTitle title={this.state.data.title} />
        {this.state.data.guest ? (
          <View style={styles.contentView}>
            <Text style={styles.info}>{this.state.data.guest}</Text>
          </View>
        ) : null}

        <View style={styles.webviewContainer}>
          <WebView
            style={styles.webview}
            scrollEnabled={false}
            bounces={false}
            mediaPlaybackRequiresUserAction={false}
            originWhiteList={['*']}
            allowsFullscreenVideo={true}
            source={{
              html: `
                <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
               <div id="video"></div>
                  <script src="https://player.vimeo.com/api/player.js"></script>
                  <script>
                  var iframe = document.querySelector('#video');
                  let options = {
                          url: "${this.state.data.link}",
                          width: ${wp(95)},
                          byline: false,
                          title: false,
                          portrait: false,
                        };
                      let videoPlayer = new Vimeo.Player(iframe, options);</script>
                `,
            }}
          />
        </View>
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
