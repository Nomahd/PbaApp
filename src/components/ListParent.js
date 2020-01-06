import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {StyleSheet} from 'react-native';
import ContentList from './ContentList';
import ListScreenHeader from './ListScreenHeader';
import SearchArea from './SearchArea';

export default class ListParent extends Component {
  state = {
    search: false,
    loading: false,
    messengers: [],
    guests: [],
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

  render() {
    const styles = StyleSheet.create({
      mainStyles: {
        flex: 1,
      },
    });

    return (
      <SafeAreaView style={styles.mainStyles}>
        {this.state.search ? null : (
          <ListScreenHeader
            searchToggle={this._toggleSearch.bind(this)}
            headerText={this.props.headerText}
            headerImage={this.props.headerImage}
            search={this.state.search}
          />
        )}

        {this.state.search ? (
          <SearchArea
            category={this.props.category}
            resetSearch={this._resetSearch.bind(this)}
            setLoading={this._loading.bind(this)}
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
