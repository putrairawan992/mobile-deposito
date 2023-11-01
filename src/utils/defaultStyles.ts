import {StyleSheet} from 'react-native';

const defaultStyles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  shadow1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadow2: {
    shadowColor: '#18274b',
    shadowOffset: {
      width: 0,
      height: 3.62,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3.62,
    elevation: 2,
  },
  shadow3: {
    shadowColor: '#18274b',
    shadowOffset: {
      width: 0,
      height: 3.62,
    },
    shadowOpacity: 0.08,
    shadowRadius: 7.25,
    elevation: 3,
  },
  shadow4: {
    shadowColor: '#18274b',
    shadowOffset: {
      width: 0,
      height: 3.62,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10.87,
    elevation: 4,
  },
});

export default defaultStyles;
