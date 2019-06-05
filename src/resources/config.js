import { Platform } from 'react-native';
import Config from 'react-native-config';

const getApiUrl = () => {
  if (Config.MODE !== 'DEV') {
    return Config.API_URL;
  }
  return Platform.OS === 'android' ? Config.ANDROID_API_URL : Config.IOS_API_URL;
};

export default {
  apiUrl: getApiUrl(),
  applicationId: 'app',
};
