import {
  CHANGE_BATCH_STATE_TYPE,
  CHANGE_CONTENT_STATE_TYPE,
} from '../actions/actions';
import {CATEGORIES} from '../../constants/categories';

const initialState = {
  today: {
    audio: {id: null, title: null, broadcast_date: null},
    devotion: {id: null, title: null, broadcast_date: null},
    video: {id: null, title: null, broadcast_date: null},
  },
  batch: {
    audio: [],
    devotion: [],
    video: [],
  },
};

const nullContent = {id: null, title: null, broadcast_date: null};

export default function contentState(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CONTENT_STATE_TYPE:
      const audioToday = action.today.audio;
      const devotionToday = action.today.devotion;
      const videoToday = action.today.video;
      const audioList = action.batch.audio;
      const devotionList = action.batch.devotion;
      const videoList = action.batch.video;
      return {
        today: {
          audio: audioToday !== null ? audioToday : nullContent,
          devotion: devotionToday !== null ? devotionToday : nullContent,
          video: videoToday !== null ? videoToday : nullContent,
        },
        batch: {
          audio: audioList !== null ? audioList : [],
          devotion: devotionList !== null ? devotionList : [],
          video: videoList !== null ? videoList : [],
        },
      };
    case CHANGE_BATCH_STATE_TYPE:
      const data = action.data;
      const newState = state;
      switch (action.category) {
        case CATEGORIES.television:
          newState.batch.video = data;
          break;
        case CATEGORIES.devotion:
          newState.batch.devotion = data;
          break;
        case CATEGORIES.radio:
          newState.batch.audio = data;
          break;
      }
      return newState;
    default:
      return state;
  }
}
