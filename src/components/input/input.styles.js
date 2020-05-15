import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.font,
    borderRadius: 4,
  },
  label: {},
  error: {
    position: 'absolute',
    bottom: -14,
    left: 8,
    color: colors.error,
    fontSize: 10,
  },
});
