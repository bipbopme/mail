import { Layout, ListItem, Text, useStyleSheet } from "@ui-kitten/components";

import Avatar from "../shared/Avatar";
import HtmlViewer from "./HtmlViewer";
import React from "react";
import themedStyles from "../../styles";

function MessageListItem({ to, from, text, html }) {
  const styles = useStyleSheet(themedStyles);
  const isHtml = (!text || text.length === 0) && (html && html.length > 0)

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
        {isHtml ? <HtmlViewer html={html} /> : <Text>{text}</Text>}
      </Layout>
    </>
  );
}

export default MessageListItem;
