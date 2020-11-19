import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  input: {
    height: 46,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
  label: {},
  error: {
    ...fonts.style.error,
    position: 'absolute',
    bottom: -14,
    left: 8,
  },
});
