import {Dimensions, PixelRatio} from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let heightInset = 0;
const setDimensions = () => {
  screenWidth = Dimensions.get('window').width;
  screenHeight = Dimensions.get('window').height - heightInset;
};

const setHeightInset = inset => {
  heightInset = inset;
};

const getHeightInset = () => {
  return heightInset;
};

const widthPercentageToDP = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const heightPercentageWithoutInset = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel(
    ((screenHeight - heightInset) * elemHeight) / 100,
  );
};
export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageWithoutInset as hhp,
  setDimensions,
  setHeightInset,
  getHeightInset,
};
