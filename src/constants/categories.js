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
  return CONTEXT[category];
}
