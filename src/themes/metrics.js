import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  screenHeight: width < height ? height : width,
  screenWidth: width < height ? width : height,
  headerHeight: 64,
  tabBarHeight: 70,
};

export default metrics;
