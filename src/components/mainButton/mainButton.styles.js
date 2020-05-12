import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    backgroundColor: colors.purple,
    marginVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
