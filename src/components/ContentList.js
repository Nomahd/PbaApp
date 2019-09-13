import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {getBatch} from '../api/api';
import getModel from '../constants/models';
import {APP_STATES} from '../redux/actions/actions';
import {connect} from 'react-redux';
import {mapStateToProps} from '../helpers/mapStateToProps';
import {withNavigation} from 'react-navigation';
import {CATEGORIES} from '../constants/categories';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NAV} from '../navigators/Nav';

class ContentList extends Component {
  _toContent = item => {
    this.props.navigation.navigate(NAV.Content, {
      category: this.props.category,
      id: item.id,
    });
  };
  render() {
    let data = null;
    if (this.props.category === CATEGORIES.radio) {
      data = this.props.contentState.batch.audio;
    }
    if (this.props.category === CATEGORIES.television) {
      data = this.props.contentState.batch.video;
    }
    if (this.props.category === CATEGORIES.devotion) {
      data = this.props.contentState.batch.devotion;
    }
    return !this.props.loading ? (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemView}
              onPress={this._toContent.bind(this, item)}>
              <Text style={styles.itemTextTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.itemTextDate}>{item.broadcast_date}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    ) : (
      <ActivityIndicator size="large" style={styles.activityIndicator} />
    );
  }
}
export default withNavigation(connect(mapStateToProps)(ContentList));

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
    borderTopWidth: 1,
    borderTopColor: '#737373',
    marginBottom: hp(10),
  },
  list: {
    width: wp(95),
    alignSelf: 'flex-end',
  },
  itemView: {
    width: wp(90),
    marginTop: hp(1),
    borderBottomWidth: 0.5,
    borderBottomColor: '#999999',
  },
  itemTextTitle: {
    fontSize: hp(3),
  },
  itemTextDate: {
    fontSize: hp(2),
    color: '#1C208C',
    marginBottom: hp(0.5),
  },
  activityIndicator: {
    marginTop: hp(5),
  },
});
