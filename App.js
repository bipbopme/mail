import * as eva from "@eva-design/eva";

import { Appearance, AppearanceProvider } from "react-native-appearance";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { AsyncStorage, StatusBar } from "react-native";

import { AppLoading } from "expo";
import AuthNavigator from "./navigators/Auth";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import MainNavigator from "./navigators/Main"
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authToken: null,
      isReady: false,
      systemColorScheme: Appearance.getColorScheme() == "dark" ? "dark" : "light"
    };
  }

  async componentDidMount() {
    const authToken = await AsyncStorage.getItem("authToken");
    this.setState({ authToken, isReady: true });

    this.appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ systemColorScheme: colorScheme });
    });
  }

  componentWillUnmount() {
    if (this.appearanceListener) {
      this.appearanceListener.remove();
    }
  }

  handleAuthTokenUpdate(authToken) {
    AsyncStorage.setItem("authToken", authToken);

    this.setState({ authToken });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    const colorScheme = this.state.systemColorScheme;
    const isLight = colorScheme === "light"

    return (
      <ApplicationProvider {...eva} theme={eva[colorScheme]}>
        {/* TODO: Replace these with theme color variables */}
        <StatusBar backgroundColor={isLight ? "#ffffff" : "#222b45"} barStyle={isLight ? "dark-content" : "light-content"} />
        <AppearanceProvider>
          <IconRegistry icons={EvaIconsPack} />
          <NavigationContainer>
            {this.state.authToken ? (
              <MainNavigator />
            ) : (
              <AuthNavigator onAuthTokenUpdate={this.handleAuthTokenUpdate.bind(this)} />
            )}
          </NavigationContainer>
        </AppearanceProvider>
      </ApplicationProvider>
    );
  }
}

export default App;
