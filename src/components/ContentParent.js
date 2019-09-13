import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {StyleSheet} from 'react-native';
import ContentList from './ContentList';
import ListScreenHeader from './ListScreenHeader';
import SearchArea from './SearchArea';

export default class ContentParent extends Component {
  state = {
    search: false,
    loading: false,
    searchMonth: null,
    searchYear: null,
    searchText: '',
  };

  _toggleSearch() {
    this.setState({search: !this.state.search});
  }
  _resetSearch() {
    this.setState({search: false});
  }
  _loading(state) {
    this.setState({loading: state});
  }
  _setSearchState(month = null, year = null, text = '') {
    this.setState({searchMonth: month});
    this.setState({searchYear: year});
    this.setState({searchText: text});
  }
  render() {
    return (
      <SafeAreaView style={styles.mainStyles}>
        <ListScreenHeader
          searchToggle={this._toggleSearch.bind(this)}
          headerText={this.props.headerText}
        />
        {this.state.search ? (
          <SearchArea
            category={this.props.category}
            resetSearch={this._resetSearch.bind(this)}
            setLoading={this._loading.bind(this)}
            setSearchState={this._setSearchState.bind(this)}
            month={this.state.searchMonth}
            year={this.state.searchYear}
            text={this.state.searchText}
          />
        ) : null}
        <ContentList
          loading={this.state.loading}
          category={this.props.category}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainStyles: {
    flex: 1,
  },
});
