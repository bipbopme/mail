import React from "react";
import SignIn from "../account/SignIn";
import { createStackNavigator } from "@react-navigation/stack";

function AccountNavigator({ onCredentialsUpdate }) {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Sign In" component={SignIn} initialParams={{ onCredentialsUpdate }} />
    </Navigator>
  );
}

export default AccountNavigator;
