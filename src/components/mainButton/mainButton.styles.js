import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  button: {
    width: '100%',
    height: 46,
    backgroundColor: colors.mainTheme,
    marginBottom: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: fonts.weight.semiBold,
    fontSize: fonts.size.subtitle,
  },
});
