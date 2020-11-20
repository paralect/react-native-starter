import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 44,
  },
  title: {
    ...fonts.style.title,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    color: colors.mainTheme,
  },
  signinContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 8,
  },
});
