import React from "react";
import { Text, SafeAreaView } from "react-native";
import { ZimbraBatchClient, types } from "@zimbra/api-client";
import { createZimbraClient } from "../lib/utils";
import MessageList from "./messageList";
import { Layout, List, Input, TopNavigation, Divider, TopNavigationAction, Icon, ListItem } from "@ui-kitten/components";

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

  handleBackActionPress() {
    this.props.navigation.goBack();
  }

  renderBackIcon(props) {
    return <Icon {...props} name="arrow-back" />;
  }

  renderAccessoryLeft() {
    return <TopNavigationAction icon={this.renderBackIcon} onPress={this.handleBackActionPress.bind(this)} />;
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <TopNavigation accessoryLeft={this.renderAccessoryLeft.bind(this)} />
        <Divider />
        <ListItem title={this.props.route.params.subject} />
        {this.state.conversation ? (
          <MessageList messages={this.state.conversation.messages} />
        ) : (
          <Text>Loading...</Text>
        )}
      </SafeAreaView>
    );
  }
}
