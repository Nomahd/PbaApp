import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ContentScreen from '../screens/ContentScreen';
import RadioStationListScreen from '../screens/more/RadioStationListScreen';
import TelevisionStationListScreen from '../screens/more/TelevisionStationListScreen';
import DonateScreen from '../screens/more/DonateScreen';
import SafeAreaMaterialTopTabBar from '../components/SafeMaterialTopTab';
import React from 'react';
import {JAPANESE} from '../constants/japanese';
import RadioListScreen from '../screens/radio/RadioListScreen';
import TelevisionListScreen from '../screens/television/TelevisionListScreen';
import DevotionListScreen from '../screens/devotion/DevotionListScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
export const NAV = {
  Home: 'Home',
  Radio: 'Radio',
  Devotion: 'Devotion',
  Television: 'Television',
  More: 'More',
  Tab: 'Tab',
  Content: 'Content',
  Main: 'Main',
};
const OtherNavigator = createMaterialTopTabNavigator(
  {
    RadioStation: {
      screen: RadioStationListScreen,
      navigationOptions: {
        tabBarLabel: JAPANESE.tabRadio,
      },
    },
    TelevisionStation: {
      screen: TelevisionStationListScreen,
      navigationOptions: {
        tabBarLabel: JAPANESE.tabTelevision,
      },
    },
    Donate: {
      screen: DonateScreen,
      navigationOptions: {
        tabBarLabel: JAPANESE.tabDonation,
      },
    },
  },
  {
    tabBarComponent: props => <SafeAreaMaterialTopTabBar {...props} />,
    tabBarOptions: {
      activeTintColor: '#feba00',
      indicatorStyle: {backgroundColor: '#FEBA00'},
      style: {
        backgroundColor: '#5584EE',
        height: hp(8),
        justifyContent: 'center',
      },
      labelStyle: {fontSize: hp(2)},
    },
  },
);

const BottomTabNav = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: JAPANESE.navHome,
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          let iconName = 'home';
          return (
            <Icon
              name={
                Platform.OS === 'ios' ? 'ios-' + iconName : 'md-' + iconName
              }
              size={hp('4%')}
              color={tintColor}
            />
          );
        },
      },
    },
    Television: {
      screen: TelevisionListScreen,
      navigationOptions: {
        tabBarLabel: JAPANESE.navTelevision,
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          let iconName = 'tv';
          return (
            <Icon
              name={
                Platform.OS === 'ios' ? 'ios-' + iconName : 'md-' + iconName
              }
              size={hp('4%')}
              color={tintColor}
            />
          );
        },
      },
    },
    Radio: {
      screen: RadioListScreen,
      navigationOptions: {
        tabBarLabel: JAPANESE.navRadio,
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          let iconName = 'microphone';
          return (
            <Icon
              name={
                Platform.OS === 'ios' ? 'ios-' + iconName : 'md-' + iconName
              }
              size={hp('4%')}
              color={tintColor}
            />
          );
        },
      },
    },
    Devotion: {
      screen: DevotionListScreen,
      navigationOptions: {
        tabBarLabel: JAPANESE.navDevotion,
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          let iconName = 'book';
          return (
            <Icon
              name={
                Platform.OS === 'ios' ? 'ios-' + iconName : 'md-' + iconName
              }
              size={hp('4%')}
              color={tintColor}
            />
          );
        },
      },
    },
    More: {
      screen: OtherNavigator,
      navigationOptions: {
        tabBarLabel: JAPANESE.navMore,
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          let iconName = 'more';
          return (
            <Icon
              name={
                Platform.OS === 'ios' ? 'ios-' + iconName : 'md-' + iconName
              }
              size={hp('4%')}
              color={tintColor}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      adaptive: false,
      activeTintColor: '#FEBA00',
      inactiveTintColor: '#1C208C',
      style: {
        height: hp(7.5),
      },
      labelStyle: {
        fontSize: hp(1.5),
        fontWeight: 'bold',
      },
    },
  },
);

const MainNav = createStackNavigator(
  {
    Tab: BottomTabNav,
    Content: ContentScreen,
  },
  {
    headerMode: 'none',
  },
);

export const SplashNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Main: MainNav,
});

export default createAppContainer(SplashNavigator);
