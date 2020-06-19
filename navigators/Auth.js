import React from "react";
import SignIn from "../components/account/SignIn";
import { createStackNavigator } from "@react-navigation/stack";

function AuthNavigator({ onAuthTokenUpdate }) {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen
        name="Sign In"
        component={SignIn}
        initialParams={{ onAuthTokenUpdate }}
      />
    </Navigator>
  );
}

export default AuthNavigator;
