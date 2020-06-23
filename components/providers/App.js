import * as Font from "expo-font";

import React, { useEffect, useState } from "react";

import { AppLoading } from "expo";
import { AppearanceProvider } from "react-native-appearance";
import { AuthProvider } from "./Auth";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import ThemeProvider from "./Theme";

function AppProviders({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(async () => {
    await Font.loadAsync({
      "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf")
    });

    setIsReady(true);
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <AppearanceProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>{children}</NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </AppearanceProvider>
  );
}

export default AppProviders;
