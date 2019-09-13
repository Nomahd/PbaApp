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
import ContentList from '../../components/ContentList';
import ContentTitle from '../../components/ContentTitle';
import {WebView} from 'react-native-webview';
import {URLS} from '../../constants/urls';
import ContentBody from '../../components/ContentBody';
import Orientation from 'react-native-orientation-locker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
        <ContentTitle
          title={this.state.data.title}
          broadcast_date={this.state.data.broadcast_date}
        />
        <WebView
          style={styles.webView}
          originWhiteList={['*']}
          source={{
            html: `
                <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
                  <div id="video"></div>
                  <script src="https://player.vimeo.com/api/player.js"></script>
                  <script>var options = {
                          url: "${this.state.data.link}",
                          width: ${wp(90)}
                        };
                      var videoPlayer = new Vimeo.Player('video', options);</script>
                `,
          }}
        />
        <ContentBody
          content={this.state.data.description}
          bible_book={this.state.data.bible_book}
          bible_chapter_verse={this.state.data.bible_chapter_verse}
          guest={this.state.data.guest}
          messenger={this.state.data.messenger}
        />
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
    height: hp(40),
    width: wp(100),
  },
  activityIndicator: {
    flex: 1,
    marginTop: hp(10),
  },
});
