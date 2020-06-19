import { Platform, StatusBar } from "react-native";

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
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  },

  topNavigation: {},

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
  }
});

export default styles;
