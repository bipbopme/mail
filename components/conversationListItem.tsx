import React from "react";
import { Icon, ListItem } from "@ui-kitten/components";

export default class ConversationListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  navigateToMessage() {
    this.props.navigation.navigate("conversationDetail", {
      id: this.props.id,
      subject: this.props.subject
    });
  }

  renderIcon(props) {
    return <Icon {...props} name="person" />;
  }

  render() {
    return (
      <ListItem
        title={this.props.emailAddresses[0]?.name}
        description={this.props.subject}
        accessoryLeft={this.renderIcon}
        onPress={this.navigateToMessage.bind(this)}
      />
    );
  }
}
