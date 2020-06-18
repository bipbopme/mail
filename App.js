import * as eva from "@eva-design/eva";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import { AppLoading } from "expo";
import { AsyncStorage } from "react-native";
import ConversationDetail from "./components/conversation/Detail";
import ConversationList from "./components/conversation/List";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SignIn from "./components/account/SignIn";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authToken: null,
      isReady: false
    };
  }

  async componentDidMount() {
    const authToken = await AsyncStorage.getItem("authToken");

    this.setState({ authToken, isReady: true });
  }

  handleAuthTokenUpdate(authToken) {
    AsyncStorage.setItem("authToken", authToken);

    this.setState({ authToken });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer>
          <Navigator headerMode="none">
            {this.state.authToken ? (
              <>
                <Screen
                  name="Inbox"
                  component={ConversationList}
                  initialParams={{ authToken: this.state.authToken }}
                />
                <Screen
                  name="conversationDetail"
                  component={ConversationDetail}
                  options={({ route }) => ({ title: route.params.subject })}
                />
              </>
            ) : (
              <Screen
                name="Sign In"
                component={SignIn}
                initialParams={{ onAuthTokenUpdate: this.handleAuthTokenUpdate.bind(this) }}
              />
            )}
          </Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    );
  }
}

export default App;
