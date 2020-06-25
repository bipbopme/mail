import { Button, Layout } from "@ui-kitten/components";

import AttachmentListItem from "./ListItem";
import React from "react";

function AttachmentList({ attachments }) {
  return (
    <Layout style={{ paddingBottom: 8, alignItems: "flex-start", flexDirection: "row", flexWrap: "wrap" }}>
      {attachments.map((a) => (
        <AttachmentListItem key={a.part} {...a} />
      ))}
    </Layout>
  );
}

export default AttachmentList;