import { Divider, List, TopNavigation } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";

import ConversationListItem from "./ListItem";
import { SafeAreaView } from "react-native";
import { createZimbraClient } from "../../utils";

function ConversationList({ navigation }) {
  const [conversations, setConversations] = useState([]);

  async function fetchConversations() {
    const zimbra = await createZimbraClient();
    const response = await zimbra.search({ query: "in:inbox" });

    setConversations(response.conversations);
  }
  
  useEffect(() => {
    fetchConversations();
  }, []);

  function renderItem({ item }) {
    return <ConversationListItem {...item} navigation={navigation} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <TopNavigation title="Inbox" alignment="center" />
      <Divider />
      <List
        style={{ flex: 1 }}
        data={conversations}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </SafeAreaView>
  );
}

export default ConversationList;
