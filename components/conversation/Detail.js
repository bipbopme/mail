import { Divider, Icon, ListItem, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { SafeAreaView, Text } from "react-native";

import MessageList from "../message/List";
import React from "react";
import { createZimbraClient } from "../../utils";
import useSWR from "swr";

function ConversationDetail({ navigation, route }) {
  async function fetcher(_key, id) {
    return (await createZimbraClient()).getConversation({
      id,
      fetch: "all",
      html: true
    });
  }

  const { data, error } = useSWR(["getConversation", route.params.id], fetcher);

  function handleBackActionPress() {
    navigation.goBack();
  }

  function BackIcon(props) {
    return <Icon {...props} name="arrow-back" />;
  }

  function renderBackButton() {
    return <TopNavigationAction icon={BackIcon} onPress={handleBackActionPress} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <TopNavigation accessoryLeft={renderBackButton} />
      <Divider />
      <ListItem title={route.params.subject} />
      { data ? (
        <MessageList messages={data.messages} />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}

export default ConversationDetail;
