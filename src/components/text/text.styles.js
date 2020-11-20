import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  text: {
    ...fonts.style.text,
    fontFamily: fonts.type.base,
    color: colors.fontText,
    letterSpacing: 0.8,
  },
});
