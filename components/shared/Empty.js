import { Layout, Text, useStyleSheet } from "@ui-kitten/components";

import React from "react";
import themedStyles from "../../styles";

function Empty() {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={[styles.centeredLayout, styles.paddedLayout]}>
    </Layout>
  );
}

export default Empty;
