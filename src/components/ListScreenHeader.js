import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class ListScreenHeader extends Component {
  _handleSearchClick = () => {
    this.props.searchToggle();
  };

  render() {
    return (
      <View style={styles.headerStyles}>
        <Text style={styles.headerTextStyles}>{this.props.headerText}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={this._handleSearchClick.bind(this)}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
              size={wp(7)}
              color={'#FFFFFF'}
              style={styles.searchButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ListScreenHeader;

export const styles = StyleSheet.create({
  headerStyles: {
    marginTop: hp(2),
    height: hp(8),
    flexDirection: 'row',
    width: wp(90),
    alignSelf: 'center',
  },
  headerTextStyles: {
    alignSelf: 'flex-end',
    fontSize: hp(5),
    fontWeight: 'bold',
  },
  searchButton: {
    alignSelf: 'center',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  touchable: {
    backgroundColor: '#5584EE',
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10) / 2,
    justifyContent: 'center',
  },
  highlight: {},
});
