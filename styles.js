import { Platform } from "react-native";
import { StyleService } from "@ui-kitten/components";

const styles = StyleService.create({
  paddedLayout: {
    flex: 1,
    paddingVertical: 10, // This should match the design system
    paddingHorizontal: 20 // This should match the design system
  },

  centeredLayout: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },

  safeAreaView: {
    backgroundColor: "background-basic-color-1",
    flex: 1
  },

  list: {
    backgroundColor: "background-basic-color-1"
  },

  subjectHeading: {
    paddingLeft: 11
  },

  htmlViewer: {
    color: "text-basic-color",
    backgroundColor: "background-basic-color-1",
    ...Platform.select({
      default: {
        fontSize: "16px"
      },
      web: {
        fontSize: "15px"
      }
    })
  },

  htmlViewerAnchor: {
    color: "color-primary-default"
  },

  logo: {
    fontFamily: "Nunito-Bold",
    fontSize: 19,
    letterSpacing: -0.5
  },

  drawer: {
    borderRightColor: "background-basic-color-3",
    borderRightWidth: 1,
    width: 250
  },

  splitNavigator: {
    alignItems: "stretch",
    flexDirection: "row",
    flex: 1
  },

  splitNavigatorColumn: {
    borderColor: "background-basic-color-3",
    borderRightWidth: 1,
  }
});

export default styles;
