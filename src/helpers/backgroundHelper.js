const defaultBackgrounds = [
  require('../../res/img/bg_default_1.png'),
  require('../../res/img/bg_default_2.png'),
  require('../../res/img/bg_default_3.png'),
  require('../../res/img/bg_default_4.png'),
];

export function getBackground(background) {
  return defaultBackgrounds[background];
}
