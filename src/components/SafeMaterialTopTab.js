import React from 'react';
import {SafeAreaView} from 'react-navigation';
import {MaterialTopTabBar} from 'react-navigation-tabs';

const SafeAreaMaterialTopTabBar = ({...props}) => (
  <SafeAreaView>
    <MaterialTopTabBar {...props} />
  </SafeAreaView>
)

export default SafeAreaMaterialTopTabBar;
