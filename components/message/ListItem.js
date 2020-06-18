import { Icon, Layout, ListItem, Text } from "@ui-kitten/components";

import HtmlViewer from "./HtmlViewer";
import React from "react";
import styles from "../../styles";

function MessageListItem({ from, html, to }) {
  function getToNames() {
    return to.map((e) => e.displayName).join(", ");
  }

  function renderIcon(props) {
    return <Icon {...props} name="person" />;
  }

  return (
    <>
      <ListItem
        title={from[0].name}
        description={`To ${getToNames()}`}
        accessoryLeft={renderIcon}
      />
      <Layout style={[styles.paddedLayout]}>
        <HtmlViewer html={html} />
      </Layout>
    </>
  );
}

export default MessageListItem;
