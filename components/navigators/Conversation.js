import ConversationDetail from "../conversation/Detail";
import ConversationList from "../conversation/List";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

function ConversationNavigator({ route }) {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="conversationList" component={ConversationList} initialParams={route.params} />
      <Screen name="conversationDetail" component={ConversationDetail} />
    </Navigator>
  );
}

export default ConversationNavigator;
