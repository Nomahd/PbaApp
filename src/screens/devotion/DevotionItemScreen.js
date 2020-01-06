import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ContentTitle from '../../components/ContentTitle';
import {wp, hp} from '../../utils/dimensions';
import COLORS from '../../constants/colors';

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
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      activityIndicator: {
        marginTop: hp(5),
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
      body: {
        color: COLORS.textColor,
      },
    });
    return this.state.data != null ? (
      <ScrollView style={styles.container}>
        <ContentTitle title={this.state.data.title} />
        <View style={styles.contentView}>
          {this.state.data.messenger ? (
            <Text style={styles.info}>{this.state.data.messenger}</Text>
          ) : null}
          {this.state.data.bible_book || this.state.data.bible_chapter_verse ? (
            <Text style={styles.info}>
              {this.state.data.bible_book ? this.state.data.bible_book : null}{' '}
              {this.state.data.bible_chapter_verse
                ? this.state.data.bible_chapter_verse
                : null}
            </Text>
          ) : null}
          <Text style={[styles.body, {fontSize: wp(this.props.fontSize)}]}>
            {this.state.data.body}
          </Text>
        </View>
      </ScrollView>
    ) : (
      <ActivityIndicator size="large" style={styles.activityIndicator} />
    );
  }
}
