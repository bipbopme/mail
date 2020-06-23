import * as eva from "@eva-design/eva";
import * as themes from "../../themes";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { StatusBar } from "react-native";
import { useColorScheme } from "react-native-appearance";

function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();
  const isLight = colorScheme !== "dark";
  const theme = themes[isLight ? "light": "dark"];

  return (
    <ApplicationProvider {...eva} theme={theme} customMapping={themes.mapping}>
      {/* TODO: Replace these with theme color variables */}
      <StatusBar
        backgroundColor={isLight ? "#ffffff" : "#222b45"}
        barStyle={isLight ? "dark-content" : "light-content"}
      />
      <IconRegistry icons={EvaIconsPack} />
      {children}
    </ApplicationProvider>
  )
}

export default ThemeProvider;
