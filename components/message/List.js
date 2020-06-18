import { List } from "@ui-kitten/components";
import MessageListItem from "./ListItem";
import React from "react";

function MessageList({ navigation, messages }) {
  function renderItem({ item }) {
    return <MessageListItem {...item} navigation={navigation} />;
  }
  
  return <List style={{ flex: 1 }} data={messages} renderItem={renderItem} />;
}

export default MessageList;