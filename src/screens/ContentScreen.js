import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Text,
  Image,
} from 'react-native';
import {CATEGORIES} from '../constants/categories';
import RadioItemScreen from './radio/RadioItemScreen';
import DevotionItemScreen from './devotion/DevotionItemScreen';
import TelevisionItemScreen from './television/TelevisionItemScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {wp, hp, getHeightInset} from '../utils/dimensions';
import {getSelect} from '../api/api';
import getModel from '../constants/models';
import COLORS from '../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';

export default class ContentScreen extends Component {
  state = {
    fontBar: false,
    fontSize: 4,
  };

  componentDidMount() {
    this._getFontSize();
  }

  _getFontSize = async () => {
    try {
      const fontSize = await AsyncStorage.getItem('@fontSize_key');
      if (fontSize !== null) {
        this.setState({fontSize: parseInt(fontSize)});
      }
    } catch (e) {
      console.error(e);
    }
  };

  _storeFontSize = async size => {
    try {
      await AsyncStorage.setItem('@fontSize_key', size.toString());
    } catch (e) {
      console.error(e);
    }
  };

  _increaseFont = () => {
    if (this.state.fontSize < 7) {
      let newFont = this.state.fontSize + 1;
      this.setState({fontSize: newFont});
      this._storeFontSize(newFont);
    }
  };

  _decreaseFont = () => {
    if (this.state.fontSize > 2) {
      let newFont = this.state.fontSize - 1;
      this.setState({fontSize: newFont});
      this._storeFontSize(newFont);
    }
  };

  _defaultFont = () => {
    this.setState({fontSize: 4});
    this._storeFontSize(4);
  };
  _getContent = async () => {
    return await getSelect(
      getModel(this.props.navigation.getParam('category')),
      this.props.navigation.getParam('id'),
    );
  };
  _renderCategory = (category, id) => {
    switch (category) {
      case CATEGORIES.radio:
        return (
          <RadioItemScreen
            id={id}
            onData={this._getContent.bind(this)}
            fontSize={this.state.fontSize}
          />
        );
      case CATEGORIES.devotion:
        return (
          <DevotionItemScreen
            id={id}
            onData={this._getContent.bind(this)}
            fontSize={this.state.fontSize}
          />
        );
      case CATEGORIES.television:
        return (
          <TelevisionItemScreen
            id={id}
            onData={this._getContent.bind(this)}
            fontSize={this.state.fontSize}
          />
        );
    }
  };

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _toggleFontBar = () => {
    this.setState({fontBar: !this.state.fontBar});
  };
  render() {
    const _renderHeader = category => {
      switch (category) {
        case CATEGORIES.radio:
          return (
            <Image
              style={styles.headerImage}
              source={require('../../res/img/logo_YNH.png')}
              resizeMode="contain"
            />
          );
        case CATEGORIES.television:
          return (
            <Image
              style={styles.headerImage}
              source={require('../../res/img/logo_LL.png')}
              resizeMode="contain"
            />
          );
        case CATEGORIES.devotion:
          return <Text style={styles.headerText}>今週のデボーション</Text>;
      }
    };

    const styles = StyleSheet.create({
      area: {
        flex: 1,
      },
      header: {
        height: hp(8),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.babyBlue,
      },
      backButton: {
        zIndex: 1,
        alignSelf: 'center',
        paddingHorizontal: wp(3),
      },
      content: {
        flex: 1,
      },
      headerText: {
        color: 'white',
        fontSize: wp(5),
        fontWeight: 'bold',
        marginRight: wp(6),
      },
      headerImageTextView: {
        flex: 1,
        alignItems: 'center',
        marginVertical: hp(1),
      },
      headerImage: {
        height: '100%',
        tintColor: 'white',
        marginRight: wp(6),
      },
      fontBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(8),
        width: '100%',
        backgroundColor: COLORS.blue,
      },
      fontButton: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: wp(3),
        paddingVertical: hp(2),
      },
      fontSmall: {
        fontSize: wp(3.5),
        color: 'white',
      },
      fontBig: {
        fontSize: wp(5),
        color: 'white',
      },
      fontDefault: {
        fontSize: wp(3),
        color: 'white',
      },
      fontBarButton: {
        marginHorizontal: wp(6),
        width: hp(5),
        height: hp(5),
        borderWidth: wp(0.5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(1),
        borderColor: 'white',
      },
    });
    return (
      <View style={styles.area}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={this._goBack.bind(this)}>
            <Icon
              name={
                Platform.OS === 'ios'
                  ? 'ios-arrow-round-back'
                  : 'md-arrow-round-back'
              }
              size={wp(10)}
              color="white"
            />
          </TouchableOpacity>
          <View style={styles.headerImageTextView}>
            {_renderHeader(this.props.navigation.getParam('category'))}
          </View>
          <TouchableOpacity
            style={styles.fontButton}
            onPress={this._toggleFontBar.bind(this)}>
            <Text style={styles.fontSmall}>あ</Text>
            <Text style={styles.fontBig}>あ</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.content}>
          {this._renderCategory(
            this.props.navigation.getParam('category'),
            this.props.navigation.getParam('id'),
          )}
        </View>
        {this.state.fontBar ? (
          <View style={styles.fontBar}>
            <TouchableOpacity
              hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
              style={styles.fontBarButton}
              onPress={this._decreaseFont.bind(this)}>
              <Text style={styles.fontSmall}>あ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
              style={styles.fontBarButton}
              onPress={this._increaseFont.bind(this)}>
              <Text style={styles.fontBig}>あ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
              style={styles.fontBarButton}
              onPress={this._defaultFont.bind(this)}>
              <Text style={styles.fontDefault}>初期</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}
