import { List, useStyleSheet } from "@ui-kitten/components";

import MessageListItem from "./ListItem";
import React from "react";
import themedStyles from "../../styles";

function MessageList({ navigation, messages, ListHeaderComponent }) {
  const styles = useStyleSheet(themedStyles);

  function renderItem({ item }) {
    return <MessageListItem {...item} navigation={navigation} />;
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
