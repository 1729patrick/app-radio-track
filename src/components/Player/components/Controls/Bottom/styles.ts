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
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  playBackground: {
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  loader: {
    width: 170,
    height: 170,
    position: 'absolute',
  },
});
