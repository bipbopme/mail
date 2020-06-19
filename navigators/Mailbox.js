import ConversationDetail from "../components/conversation/Detail";
import ConversationList from "../components/conversation/List";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

function MailboxNavigator() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Inbox" component={ConversationList} />
      <Screen name="conversationDetail" component={ConversationDetail} />
    </Navigator>
  );
}

export default MailboxNavigator;
