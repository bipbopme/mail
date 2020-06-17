import React from "react";
import { SafeAreaView } from "react-native";
import { Layout, List, Input, TopNavigation, Divider } from "@ui-kitten/components";
import styles from "../styles";
import { ZimbraBatchClient, types } from "@zimbra/api-client";
import ConversationListItem from "./conversationListItem";
import { createZimbraClient } from "../lib/utils";

interface IMailboxProps {
  route: {
    params: {
      authToken: string;
    };
  };
}

interface IMailboxState {
  converations: [];
}

export default class ConversationList extends React.Component<IMailboxProps, IMailboxState> {
  zimbra: ZimbraBatchClient | undefined;

  constructor(props: IMailboxProps) {
    super(props);

    this.state = {
      converations: []
    };

    this.fetchConversations();
  }

  async fetchConversations() {
    if (!this.zimbra) {
      this.zimbra = await createZimbraClient();
    }

    const response = await this.zimbra.search({ query: "in:inbox" });

    this.setState({ conversations: response.conversations });
  }

  renderItem({ item }) {
    return <ConversationListItem {...item} navigation={this.props.navigation} />;
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <TopNavigation title="Inbox" alignment="center" />
        <Divider />
        <List
          style={{ flex: 1 }}
          data={this.state.conversations}
          renderItem={this.renderItem.bind(this)}
        />
      </SafeAreaView>
    );
  }
}
