import React from "react";
import { Icon, ListItem } from "@ui-kitten/components";

export default class MailboxItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderIcon(props) {
    return <Icon {...props} name="person" />
  }

  render() {
    return <ListItem title={this.props.emailAddresses[0]?.name} description={this.props.subject} accessoryLeft={this.renderIcon}  />;
  }
}
