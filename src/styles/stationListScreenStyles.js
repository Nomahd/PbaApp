import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    borderColor: '#1C208C',
    paddingVertical: hp(3),
    paddingHorizontal: wp(4),
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
  },
  warningText: {
    fontSize: wp(2),
    marginTop: hp(0.5),
  },
});

export default listScreenStyles;
