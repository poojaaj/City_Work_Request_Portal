import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    display: "flex",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width
  },
  map: {
    flex: 1
  },

  mapMarker: {
    fontSize: 40,
    color: "red"
  },
  spinnerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});