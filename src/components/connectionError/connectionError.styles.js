import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  connectionErrorView: {
    position: 'absolute',
    height: 60,
    flex: 1,
    backgroundColor: '#eb4b5f',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionErrorText: {
    color: '#ffffff',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 25,
    lineHeight: 25,
  },
  closeButton: {
    padding: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
