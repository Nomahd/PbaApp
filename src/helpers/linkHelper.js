import {Linking} from 'react-native';

export async function openLink(link) {
  try {
    await Linking.openURL(link);
  } catch (error) {
    console.error(error);
  }
}
