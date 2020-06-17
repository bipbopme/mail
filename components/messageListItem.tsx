import React from "react";
import { Icon, ListItem, Layout, Text } from "@ui-kitten/components";
import HtmlViewer from "./htmlViewer";
import styles from "../styles";

export default class MessageListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout style={[styles.paddedLayout]}>
        <HtmlViewer html={this.props.html} />
      </Layout>
    );
  }
}
