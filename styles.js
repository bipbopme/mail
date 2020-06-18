import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  paddedLayout: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20
  },

  centeredLayout: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

export default styles;
