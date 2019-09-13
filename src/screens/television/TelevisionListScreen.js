import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {StyleSheet} from 'react-native';
import {CATEGORIES} from '../../constants/categories';
import ContentParent from '../../components/ContentParent';

export default class TelevisionListScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.mainStyles}>
        <ContentParent
          category={CATEGORIES.television}
          headerText="テレビ番組"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainStyles: {
    flex: 1,
  },
});
