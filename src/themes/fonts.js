import colors from './colors';

const type = {
  base: 'Avenir',
};

const size = {
  header: 28,
  title: 21,
  subtitle: 16,
  regular: 14,
  medium: 13,
  small: 12,
  tiny: 10,
};

const weight = {
  regular: '400',
  madium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

const style = {
  header: {
    fontSize: size.header,
    fontWeight: weight.bold,
    color: colors.headerFont,
  },
  title: {
    fontSize: size.title,
    fontWeight: weight.semiBold,
    color: colors.fontTitle,
  },
  subtitle: {
    fontSize: size.subtitle,
    fontWeight: weight.semiBold,
  },
  text: {
    fontSize: size.regular,
    fontWeight: weight.regular,
  },
  error: {
    fontSize: size.tiny,
    color: colors.error,
  },
};

export default {
  type,
  size,
  weight,
  style,
};
