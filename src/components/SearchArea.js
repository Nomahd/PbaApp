import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {changeBatchState} from '../redux/actions/actions';
import RNPickerSelect from 'react-native-picker-select';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getBatch, getSearch} from '../api/api';
import getModel from '../constants/models';

class SearchArea extends Component {
  state = {
    searchMonth: this.props.month,
    searchYear: this.props.year,
    searchText: this.props.text,
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
    this.props.setSearchState();
    this._getData();
  };
  async _getData() {
    this.props.setLoading(true);
    const data = await getBatch(getModel(this.props.category));
    this.props.setLoading(false);
    console.log(data);
    this.props.changeBatchState(data, this.props.category);
  }
  _onPressSearch = () => {
    this._getSearch();
  };
  async _getSearch() {
    if (
      this.state.searchMonth !== null ||
      this.state.searchYear !== null ||
      this.state.searchText !== ''
    ) {
      this.props.setLoading(true);
      const data = await getSearch(
        getModel(this.props.category),
        this.state.searchMonth,
        this.state.searchYear,
        this.state.searchText,
      );
      this.props.setLoading(false);
      this.props.changeBatchState(data, this.props.category);
    }
  }
  render() {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.datesContainer}>
          <TouchableOpacity
            style={styles.buttonReset}
            onPress={this._onPressReset.bind(this)}>
            <Text style={styles.buttonText}>リセット</Text>
          </TouchableOpacity>
          <View style={styles.dateSelectorMonth}>
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={value => {
                this.props.setSearchState(value);
                this.setState({searchMonth: value});
              }}
              placeholder={{label: '月をご選択', value: null}}
              items={this._generateMonthPicker()}
              useNativeAndroidPickerStyle={false}
              value={this.state.searchMonth}
            />
          </View>

          <View style={styles.dateSelectorYear}>
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={value => {
                this.props.setSearchState(value);
                this.setState({searchYear: value});
              }}
              placeholder={{label: '年をご選択', value: null}}
              items={this._generateYearPicker()}
              useNativeAndroidPickerStyle={false}
              value={this.state.searchYear}
            />
          </View>
        </View>
        <View style={styles.bottomRowContainer}>
          <TextInput
            style={styles.textInput}
            placeHolder="タイトルやタッグ"
            onChangeText={text => {
              this.props.setSearchState(text);
              this.setState({searchText: text});
            }}
            value={this.state.searchText}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonSearch}
              onPress={this._onPressSearch.bind(this)}>
              <Text style={styles.buttonText}>探索</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  {changeBatchState},
)(SearchArea);

const styles = StyleSheet.create({
  searchContainer: {
    alignSelf: 'center',
    height: hp(17),
    width: wp(90),
  },
  datesContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp(2),
  },
  dateSelectorMonth: {
    flex: 2,
    marginHorizontal: wp(2),
  },
  dateSelectorYear: {
    flex: 2,
    marginLeft: wp(2),
  },
  bottomRowContainer: {
    marginTop: hp(2),
    flexDirection: 'row',
    flex: 1,
  },
  textInput: {
    flex: 5,
    marginRight: wp(2),
    fontSize: hp(3),
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
  buttonText: {
    fontSize: wp(4),
    color: '#1C208C',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: hp(3),
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: hp(3),
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
