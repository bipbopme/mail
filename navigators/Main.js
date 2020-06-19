import ConversationDetail from "../components/conversation/Detail";
import MailboxNavigator from "./Mailbox";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

function MainNavigator() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="MailBoxes" component={MailboxNavigator} />
      <Screen name="conversationDetail" component={ConversationDetail} />
    </Navigator>
  );
}

export default MainNavigator;
