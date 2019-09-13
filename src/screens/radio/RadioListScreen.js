import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {StyleSheet} from 'react-native';
import {CATEGORIES} from '../../constants/categories';
import ContentParent from '../../components/ContentParent';

export default class RadioListScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.mainStyles}>
        <ContentParent category={CATEGORIES.radio} headerText="ラジオ番組" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainStyles: {
    flex: 1,
  },
});
