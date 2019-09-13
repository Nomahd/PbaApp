const MODELS = {
  radio: 'Audio',
  devotion: 'Devotion',
  television: 'Video',
};

export default function getModel(category) {
  return MODELS[category];
}
