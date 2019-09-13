import React, {Component} from 'react';
import JAPANESE from '../../constants/japanese';
import {SafeAreaView} from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ContentList from '../../components/ContentList';
import ContentTitle from '../../components/ContentTitle';
import {WebView} from 'react-native-webview';
import {URLS} from '../../constants/urls';
import ContentBody from '../../components/ContentBody';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class DevotionItemScreen extends Component {
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
        <ContentBody
          content={this.state.data.body}
          bible_book={this.state.data.bible_book}
          bible_chapter_verse={this.state.data.bible_chapter_verse}
          messenger={this.state.data.messenger}
        />
      </ScrollView>
    ) : (
      <ActivityIndicator size="large" style={styles.activityIndicator}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    marginTop: hp(5),
  },
});
