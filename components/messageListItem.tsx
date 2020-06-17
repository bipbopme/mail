import React from "react";
import { Icon, ListItem, Layout, Text } from "@ui-kitten/components";
import HtmlViewer from "./htmlViewer";
import styles from "../styles";

export default class MessageListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderIcon(props) {
    return <Icon {...props} name="person" />;
  }

  getToNames() {
    return this.props.emailAddresses
      .filter((e) => e.type == "t")
      .map((e) => e.displayName)
      .join(", ");
  }

  render() {
    console.log(this.props);

    return (
      <>
        <ListItem
          title={this.props.emailAddresses[0]?.name}
          description={`To ${this.getToNames()}`}
          accessoryLeft={this.renderIcon}
        />
        <Layout style={[styles.paddedLayout]}>
          <HtmlViewer html={this.props.html} />
        </Layout>
      </>
    );
  }
}
