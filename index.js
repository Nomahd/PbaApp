/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Nav from './src/navigators/Nav';
import App from './src/listScreenStyles';
import {name as appName} from './app.json';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['ViewPagerAndroid']);
AppRegistry.registerComponent(appName, () => App);
