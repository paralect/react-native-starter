import { StyleSheet } from 'react-native';

import colors from '../../themes/colors';
import metrics from '../../themes/metrics';

export default StyleSheet.create({
  tabBarContainer: {
    height: metrics.tabBarHeight,
    flexDirection: 'row',
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  tabIcon: {
    width: 25,
  },
  tabText: {
    fontSize: 14,
  },
});
