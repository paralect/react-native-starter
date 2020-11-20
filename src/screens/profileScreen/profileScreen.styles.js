import { StyleSheet } from 'react-native';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
  },
  text: {
    ...fonts.style.title,
    marginBottom: 16,
  },
});
