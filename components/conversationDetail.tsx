import React from "react";
import { Text, View } from "react-native";
import { ZimbraBatchClient, types } from "@zimbra/api-client";
import { createZimbraClient } from "../lib/utils";
import MessageList from "./messageList";

export default class ConversationDetail extends React.Component {
  zimbra: ZimbraBatchClient | undefined;

  constructor(props) {
    super(props);

    this.state = {
      conversation: undefined
    };

    this.fetchConversations();
  }

  async fetchConversations() {
    if (!this.zimbra) {
      this.zimbra = await createZimbraClient();
    }
    
    const conversation = await this.zimbra.getConversation({ id: this.props.route.params.id, fetch: "all", html: true });

    this.setState({ conversation });
  }
  render() {
    return (
      <>
        { this.state.conversation ? (
          <MessageList messages={this.state.conversation.messages} />
        ) : (
          <Text>Loading...</Text>
        )}
      </>
    );
  }
}
