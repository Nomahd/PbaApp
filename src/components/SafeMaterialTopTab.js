import React from 'react';
import {SafeAreaView, MaterialTopTabBar} from 'react-navigation';

const SafeAreaMaterialTopTabBar = ({...props}) => (
  <SafeAreaView>
    <MaterialTopTabBar {...props} />
  </SafeAreaView>
)

export default SafeAreaMaterialTopTabBar;
