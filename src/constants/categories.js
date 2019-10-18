export const CATEGORIES = {
  radio: 'radio',
  devotion: 'devotion',
  television: 'television',
};

const CONTEXT = {
  radio: 'audio',
  television: 'video',
  devotion: 'devotion',
};

export function getContext(category) {
  console.log(CONTEXT[category]);
  return CONTEXT[category];
}
