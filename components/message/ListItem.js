import { Icon, Layout, ListItem, useStyleSheet } from "@ui-kitten/components";

import HtmlViewer from "./HtmlViewer";
import React from "react";
import themedStyles from "../../styles";

function MessageListItem({ from, html, to }) {
  const styles = useStyleSheet(themedStyles);

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
        description={`to ${getToNames()}`}
        accessoryLeft={renderIcon}
      />
      <Layout style={styles.paddedLayout}>
        <HtmlViewer html={html} />
      </Layout>
    </>
  );
}

export default MessageListItem;
