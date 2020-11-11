import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
    overflow: 'hidden',
    flex: 1,
  },
  button: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  playBackground: {
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  loader: {
    width: 182,
    height: 182,
    position: 'absolute',
  },
});
