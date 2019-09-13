import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ContentList from '../../components/ContentList';
import {getSelect} from '../../api/api';
import getModel from '../../constants/models';
import {CATEGORIES} from '../../constants/categories';
import ContentTitle from '../../components/ContentTitle';
import {WebView} from 'react-native-webview';
import {URLS} from '../../constants/urls';
import ContentBody from '../../components/ContentBody';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class RadioItemScreen extends Component {
  _isMounted = false;
  state = {
    data: null,
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.onData().then(data => {
      if (this._isMounted) {
        this.setState({data: data});
      }
    });
  }

  componentWillUnmount() {
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
                <audio style="width:100%" controls controlsList="nodownload"><source src="${URLS.pbaMedia +
                  this.state.data.filename}"></audio>`,
          }}
        />
        <ContentBody
          content={this.state.data.description}
          bible_book={this.state.data.bible_book}
          bible_chapter_verse={this.state.data.bible_chapter_verse}
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
    width: wp(100),
    height: hp(10),
  },
  activityIndicator: {
    marginTop: hp(5),
  },
});
