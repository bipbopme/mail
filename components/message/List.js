import { List, useStyleSheet } from "@ui-kitten/components";

import MessageListItem from "./ListItem";
import React from "react";
import themedStyles from "../../styles";

function MessageList({ navigation, messages, ListHeaderComponent }) {
  const styles = useStyleSheet(themedStyles);
  const lastMessage = messages[messages.length - 1];

  function renderItem({ item }) {
    return (
      <MessageListItem {...item} navigation={navigation} lastItem={lastMessage.id === item.id} />
    );
  }

  return (
    <List
      data={messages}
      style={styles.list}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

export default MessageList;
