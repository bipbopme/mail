import { Divider, Icon, ListItem, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";

import MessageList from "../message/List";
import { createZimbraClient } from "../../utils";

function ConversationDetail({ navigation, route }) {
  const [conversation, setConversation] = useState(null);
  
  async function fetchConversations() {
    const zimbra = await createZimbraClient();
    const conversation = await zimbra.getConversation({
      id: route.params.id,
      fetch: "all",
      html: true
    });

    setConversation(conversation);
  }

  useEffect(() => {
    fetchConversations();
  }, []);

  function handleBackActionPress() {
    navigation.goBack();
  }

  function BackIcon(props) {
    return <Icon {...props} name="arrow-back" />;
  }

  function renderBackButton() {
    return (
      <TopNavigationAction
        icon={BackIcon}
        onPress={handleBackActionPress}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <TopNavigation accessoryLeft={renderBackButton} />
      <Divider />
      <ListItem title={route.params.subject} />
      {conversation ? <MessageList messages={conversation.messages} /> : <Text>Loading...</Text>}
    </SafeAreaView>
  );
}

export default ConversationDetail;
