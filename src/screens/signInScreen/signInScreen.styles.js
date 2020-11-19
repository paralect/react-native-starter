import { StyleSheet } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
  },
  logo: {
    marginBottom: 8,
  },
  logoText: {
    marginBottom: 60,
    color: colors.fontLogo,
    fontSize: 18,
    fontWeight: '500',
  },
  title: {
    ...fonts.style.title,
    textAlign: 'center',
    marginBottom: 24,
  },
  link: {
    color: colors.mainTheme,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 8,
  },
});
