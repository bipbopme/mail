import { Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";

import AttachmentList from "../attachment/List";
import HtmlViewer from "./HtmlViewer";
import { StyleSheet } from "react-native";
import { randomBetween } from "../../utils";

function MessageDetail({ html, text, expanded, attachments }) {
  const isHtml = (!text || text.length === 0) && html && html.length > 0;
  // Delay loading of hidden HtmlViewer to improve performance
  const [delayed, setDelayed] = useState(!expanded);
  const [isReady, setIsReady] = useState(!isHtml);

  useEffect(() => {
    if (delayed) {
      // Randomize loading to reduce simultaneous loading of HtmlViewers
      setTimeout(() => setDelayed(false), randomBetween(250, 500));
    }
  });

  if (delayed) {
    return null;
  }

  if (expanded && isReady) {
    return (
      <Layout style={styles.detail}>
        {isHtml ? <HtmlViewer {...{ isReady, setIsReady, html }} hidden={false} /> : <Text>{text}</Text>}
        {attachments && <AttachmentList attachments={attachments} />}
      </Layout>
    );
  } else {
    return (
      <Layout style={styles.detailHidden}>
        {isHtml && <HtmlViewer {...{ isReady, setIsReady, html }} hidden={true} />}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  detailHidden: {
    paddingHorizontal: 20
  },

  detail: {
    paddingHorizontal: 20,
    paddingTop: 10
  }
});

export default MessageDetail;
