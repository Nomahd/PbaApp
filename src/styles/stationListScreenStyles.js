import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../constants/colors';

const listScreenStyles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  button: {
    borderRadius: wp(3),
    borderWidth: wp(0.25),
    marginTop: hp(2),
    width: wp(60),
    height: hp(15),
    paddingVertical: hp(3),
    paddingHorizontal: wp(4),
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
  },
  warningText: {
    fontSize: wp(2.5),
    marginTop: hp(0.5),
    color: COLORS.textColor,
  },
});

export default listScreenStyles;
