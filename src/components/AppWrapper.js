import {AppState} from 'react-native';
import {connect} from 'react-redux';
import {
  changeAppState,
  APP_STATES,
  changeContentState,
} from '../redux/actions/actions';
import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {SplashNavigator} from '../navigators/Nav';
import {getTodayAll} from '../api/api';

const AppContainer = createAppContainer(SplashNavigator);

class AppWrapper extends Component {
  state = {
    appState: AppState.currentState,
  };
  handleAppStateChange = appState => {
    this.props.changeAppState(appState);
  };
  handleDataGet = async () => {
    const data = await getTodayAll();
    this.props.changeContentState(data);
  };
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.handleDataGet();
      this.handleAppStateChange(APP_STATES.ACTIVE);
    } else if (
      this.state.appState.match(/active|inactive/) &&
      nextAppState === 'background'
    ) {
      this.handleAppStateChange(APP_STATES.INACTIVE);
    }
    this.setState({appState: nextAppState});
  };
  render() {
    return <AppContainer />;
  }
}

export default connect(
  null,
  {changeAppState, changeContentState},
)(AppWrapper);
