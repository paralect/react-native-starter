export default (type) => {
  switch (type) {
    case 'email': {
      return 'email-address';
    }
    case 'number': {
      return 'number-pad';
    }
    case 'phone': {
      return 'phone-pad';
    }
    case 'decimal': {
      return 'decimal-pad';
    }
    case 'numeric': {
      return 'numeric';
    }
    default: {
      return 'default';
    }
  }
};
