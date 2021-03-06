import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {changeBatchState} from '../redux/actions/actions';
import RNPickerSelect from 'react-native-picker-select';
import {wp, hp} from '../utils/dimensions';
import {getBatch, getSearch} from '../api/api';
import getModel from '../constants/models';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';
import {CATEGORIES, getContext} from '../constants/categories';
import {mapStateToProps} from '../helpers/mapStateToProps';

class SearchArea extends Component {
  state = {
    searchMonth: null,
    searchYear: null,
    searchText: null,
    searchMessenger: null,
    searchGuest: null,
  };

  _generateMonthPicker = () => {
    let picker = [];
    for (let i = 0; i < 12; i++) {
      picker.push({label: i + 1 + '月', value: i + 1});
    }
    return picker;
  };
  _generateYearPicker = () => {
    let picker = [];
    let currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      picker.push({label: currentYear - i + '年', value: currentYear - i});
    }
    return picker;
  };
  _onPressReset = () => {
    this.props.resetSearch();
    this._getData();
  };
  async _getData() {
    this.props.setLoading(true);
    const data = await getBatch(getModel(this.props.category));
    this.props.setLoading(false);
    this.props.changeBatchState(data, this.props.category);
  }
  _onPressSearch = () => {
    this._getSearch().then(data => {
      this.props.setLoading(false);
      this.props.changeBatchState(data, this.props.category);
    });
  };
  async _getSearch() {
    if (
      this.state.searchMonth !== null ||
      this.state.searchYear !== null ||
      this.state.searchText !== ''
    ) {
      this.props.setLoading(true);
      return await getSearch(
        getModel(this.props.category),
        this.state.searchMonth,
        this.state.searchYear,
        this.state.searchText,
        this.state.searchMessenger,
        this.state.searchGuest,
      );
    }
  }
  render() {
    const styles = StyleSheet.create({
      searchContainer: {
        alignSelf: 'center',
        height: hp(25),
        width: wp(90),
      },
      rowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: hp(2),
      },
      leftPicker: {
        flex: 2,
        marginRight: wp(1),
      },
      rightPicker: {
        flex: 2,
        marginLeft: wp(2),
      },
      keywordInput: {
        flex: 5,
        paddingLeft: wp(2),
        marginRight: wp(2),
        fontSize: wp(4),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
      },
      guestInput: {
        flex: 2,
        paddingLeft: wp(2),
        marginLeft: wp(2),
        fontSize: wp(4),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: wp(2),
      },
      buttonSearch: {
        flex: 1,
        margin: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonReset: {
        flex: 1,
        margin: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
      },
      resetButtonText: {
        fontSize: wp(4),
        color: COLORS.red,
      },
      searchTouchable: {
        flex: 1,
        marginLeft: wp(1),
        width: '80%',
        height: '100%',
        justifyContent: 'center',
      },
      searchButton: {
        alignSelf: 'center',
      },
      placeHolder: {
        flex: 2,
      },
    });

    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        height: '100%',
        fontSize: wp(4),
        paddingLeft: wp(1),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: COLORS.textColor,
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: hp(2),
        paddingLeft: wp(1),
        height: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: COLORS.textColor,
        paddingRight: 30, // to ensure the text is never behind the icon
      },
    });
    return (
      <View style={styles.searchContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.leftPicker}>
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={value => {
                this.setState({searchMonth: value});
              }}
              placeholder={{label: '月をご選択', value: null}}
              items={this._generateMonthPicker()}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <View style={styles.rightPicker}>
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={value => {
                this.setState({searchYear: value});
              }}
              placeholder={{label: '年をご選択', value: null}}
              items={this._generateYearPicker()}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <TouchableOpacity
            style={styles.searchTouchable}
            onPress={this._onPressSearch.bind(this)}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
              size={wp(7)}
              color={COLORS.blue}
              style={styles.searchButton}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TextInput
            style={styles.keywordInput}
            placeholder="キーワード"
            onChangeText={text => {
              this.setState({searchText: text});
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonSearch}
              onPress={this._onPressReset.bind(this)}>
              <Text style={styles.resetButtonText}>中止</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.props.contentState.people.length ? (
          <View style={styles.rowContainer}>
            {this.props.contentState.people.filter(
              value =>
                value.context === getContext(this.props.category) &&
                value.category === 'messenger',
            ).length ? (
              <View style={styles.leftPicker}>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  onValueChange={value => {
                    this.setState({searchMessenger: value});
                  }}
                  placeholder={{label: 'メッセンジャー', value: null}}
                  items={this.props.contentState.people
                    .filter(
                      value =>
                        value.context === getContext(this.props.category) &&
                        value.category === 'messenger',
                    )
                    .map(person => ({label: person.name, value: person.name}))}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
            ) : null}
            {this.props.category === CATEGORIES.television ? (
              <TextInput
                style={styles.guestInput}
                placeholder="ゲスト"
                onChangeText={text => {
                  this.setState({searchGuest: text});
                }}
              />
            ) : (
              <View style={styles.placeHolder} />
            )}
          </View>
        ) : null}
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  {changeBatchState},
)(SearchArea);
