export const CHANGE_APP_STATE_TYPE = 'CHANGE_APP_STATE';
export const CHANGE_CONTENT_STATE_TYPE = 'CHANGE_CONTENT_STATE';
export const CHANGE_BATCH_STATE_TYPE = 'CHANGE_BATCH_STATE';
export const APP_STATES = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};
export const changeAppState = appState => ({
  type: CHANGE_APP_STATE_TYPE,
  appState,
});

export const changeContentState = (data, schedule) => ({
  type: CHANGE_CONTENT_STATE_TYPE,
  today: {
    audio: data.today.audio,
    devotion: data.today.devotion,
    video: data.today.video,
  },
  batch: {
    audio: data.batch.audio,
    devotion: data.batch.devotion,
    video: data.batch.video,
  },
  schedule: schedule,
});

export const changeBatchState = (data, category) => ({
  type: CHANGE_BATCH_STATE_TYPE,
  data,
  category,
});
