import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../constants/colors';

class ListScreenHeader extends Component {
  _handleSearchClick = () => {
    this.props.searchToggle();
    this.setState({showSearch: false});
  };

  render() {
    return (
      <View style={styles.headerView}>
        {this.props.headerText !== null ? (
          <Text style={styles.headerText}>{this.props.headerText}</Text>
        ) : null}
        {this.props.headerImage !== null ? (
          <Image
            style={styles.headerImage}
            source={this.props.headerImage}
            resizeMode="contain"
          />
        ) : null}
        <View style={styles.searchView}>
          {!this.props.search ? (
            <TouchableOpacity
              style={styles.searchTouchable}
              onPress={this._handleSearchClick.bind(this)}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                size={wp(7)}
                color={'#FFFFFF'}
                style={styles.searchButton}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

export default ListScreenHeader;

export const styles = StyleSheet.create({
  headerView: {
    marginTop: hp(1),
    height: hp(10),
    flexDirection: 'row',
    width: wp(90),
    alignSelf: 'center',
  },
  headerText: {
    alignSelf: 'flex-end',
    fontSize: hp(5),
    fontWeight: 'bold',
  },
  headerImage: {
    height: '100%',
    flex: 3,
  },
  searchButton: {
    alignSelf: 'center',
  },
  searchView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  searchTouchable: {
    backgroundColor: COLORS.blue,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10) / 2,
    justifyContent: 'center',
  },
});
