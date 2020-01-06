import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {StyleSheet} from 'react-native';
import {CATEGORIES} from '../../constants/categories';
import ListParent from '../../components/ListParent';

export default class RadioListScreen extends Component {
  render() {
    const styles = StyleSheet.create({
      mainStyles: {
        flex: 1,
      },
    });

    return (
      <SafeAreaView style={styles.mainStyles}>
        <ListParent
          category={CATEGORIES.radio}
          headerImage={require('../../../res/img/logo_YNH.png')}
        />
      </SafeAreaView>
    );
  }
}
