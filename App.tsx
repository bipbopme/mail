import React from "react";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./components/account/signIn";
import Mailbox from "./components/mailbox";
import Message from "./components/message";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AsyncStorage } from "react-native";

const { Navigator, Screen } = createStackNavigator();

interface AppState {
  isReady: boolean;
  authToken: string | null;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    // Load authToken from disk

    this.state = {
      isReady: false,
      authToken: null
    };
  }

  async componentDidMount() {
    const authToken = await AsyncStorage.getItem("authToken");

    this.setState({ authToken, isReady: true });
  }

  handleAuthTokenUpdate(authToken: string) {
    AsyncStorage.setItem("authToken", authToken);
    
    this.setState({ authToken });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Navigator>
              {this.state.authToken ? (
                <Screen name="Inbox" component={Mailbox} initialParams={{ authToken: this.state.authToken }} />
              ) : (
                <>
                  <Screen name="Sign In" component={SignIn} initialParams={{ onAuthTokenUpdate: this.handleAuthTokenUpdate.bind(this) }} />
                  <Screen name="Message" component={Message} />
                </>
              )}
            </Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
}
