import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {getTodayAll} from '../api/api';
import {NAV} from '../navigators/Nav';
import {connect} from 'react-redux';
import {changeContentState} from '../redux/actions/actions';

class SplashScreen extends Component {
  timedOut = false;
  async componentDidMount() {
    let timeout = this.startTimeout();
    const data = await getTodayAll();
    this.props.changeContentState(data);
    if (!this.timedOut) {
      clearTimeout(timeout);
      this.props.navigation.navigate(NAV.Home);
    }
  }

  startTimeout() {
    return setTimeout(() => {
      this.props.navigation.navigate(NAV.Home);
    }, 3000);
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={styles.imageStyles}
          source={require('../../res/img/logo_PBA.png')}
          resizeMode="contain"
        />
      </View>
    );
  }
}

export default connect(
  null,
  {changeContentState},
)(SplashScreen);

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageStyles: {
    width: '50%',
    marginLeft: '10%',
    flex: 1,
  },
});
