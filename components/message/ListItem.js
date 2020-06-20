import { Layout, ListItem, useStyleSheet } from "@ui-kitten/components";

import Avatar from "../shared/Avatar";
import HtmlViewer from "./HtmlViewer";
import React from "react";
import themedStyles from "../../styles";

function MessageListItem({ from, html, to }) {
  const styles = useStyleSheet(themedStyles);

  function getToNames() {
    return to.map((e) => e.displayName).join(", ");
  }
  
  return (
    <>
      <ListItem
        title={from[0].name}
        description={`to ${getToNames()}`}
        accessoryLeft={() => <Avatar name={from[0].name} />}
        style={{ paddingHorizontal: 20 }}
      />
      <Layout style={styles.paddedLayout}>
        <HtmlViewer html={html} />
      </Layout>
    </>
  );
}

export default MessageListItem;
