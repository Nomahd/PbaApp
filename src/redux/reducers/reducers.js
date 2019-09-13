import {combineReducers} from 'redux';
import appState from './appState';
import contentState from './contentState';

export default combineReducers({
  appState,
  contentState,
});
