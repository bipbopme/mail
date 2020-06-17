import React from "react";
import { SafeAreaView } from "react-native";
import { Layout, List, Input, TopNavigation } from "@ui-kitten/components";
import styles from "../styles";
import { ZimbraBatchClient, types } from "@zimbra/api-client";
import MessageListItem from "./messageListItem";
import { createZimbraClient } from "../lib/utils";


export default class MessageList extends React.Component {

  constructor(props) {
    super(props);
  }

  renderHeader() {
    return (
      <Layout />
    );
  }

  renderItem({ item }) {
    return <MessageListItem {...item} navigation={this.props.navigation} />;
  }

  render() {
    return (
      <List
        style={{ flex: 1 }}
        data={this.props.messages}
        renderItem={this.renderItem.bind(this)}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}
