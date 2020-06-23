import ConversationDetail from "../conversation/Detail";
import ConversationList from "../conversation/List";
import React from "react";
import { createSplitNavigator } from "./Split";

function ConversationSplitNavigator({ route }) {
  const { Navigator, Screen } = createSplitNavigator();

  return (
    <Navigator headerMode="none">
      <Screen
        name="conversationList"
        component={ConversationList}
        initialParams={{ ...route.params, width: 350 }}
      />
      <Screen name="conversationDetail" component={ConversationDetail} />
    </Navigator>
  );
}

export default ConversationSplitNavigator;
