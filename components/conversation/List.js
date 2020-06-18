import { Divider, List, Text, TopNavigation } from "@ui-kitten/components";

import ConversationListItem from "./ListItem";
import React from "react";
import { SafeAreaView } from "react-native";
import { createZimbraClient } from "../../utils";
import useSWR from "swr";

const REFRESH_INTERVAL_SECONDS = 60 * 1000;

function ConversationList({ navigation }) {
  async function fetcher(_key, query) {
    return (await createZimbraClient()).search({ query });
  }

  const { data, error } = useSWR(["search", "in:inbox"], fetcher, { refreshInterval: REFRESH_INTERVAL_SECONDS });

  function renderItem({ item }) {
    return <ConversationListItem {...item} navigation={navigation} />;
  }

  if (error) {
    console.error(error);

    return <Text>Error</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <TopNavigation title="Inbox" alignment="center" />
      <Divider />
      {data ? (
        <List
          style={{ flex: 1 }}
          data={data.conversations}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}

export default ConversationList;
