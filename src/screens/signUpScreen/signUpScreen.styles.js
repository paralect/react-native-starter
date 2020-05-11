import { StyleSheet } from 'react-native';

import colors from '../../themes/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    color: '#72787c',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    color: colors.darkPurple,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
