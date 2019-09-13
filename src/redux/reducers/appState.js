import {APP_STATES, CHANGE_APP_STATE_TYPE} from '../actions/actions';

export default function appState(state = APP_STATES.ACTIVE, action) {
  switch (action.type) {
    case CHANGE_APP_STATE_TYPE:
      return action.appState;
    default:
      return state;
  }
}
