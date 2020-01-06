import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {StyleSheet} from 'react-native';
import {CATEGORIES} from '../../constants/categories';
import ListParent from '../../components/ListParent';

export default class TelevisionListScreen extends Component {
  render() {
    const styles = StyleSheet.create({
      mainStyles: {
        flex: 1,
      },
    });
    return (
      <SafeAreaView style={styles.mainStyles}>
        <ListParent
          category={CATEGORIES.television}
          headerImage={require('../../../res/img/logo_LL.png')}
        />
      </SafeAreaView>
    );
  }
}
