import { Layout, Spinner, Text, useStyleSheet } from "@ui-kitten/components";

import React from "react";
import themedStyles from "../../styles";

function LoadingScreen({ level, error }) {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.centeredLayout} level={level || "1"}>
      {error ? <Text status="info">Sorry, failed to load.</Text> : <Spinner />}
    </Layout>
  );
}

export default LoadingScreen;
