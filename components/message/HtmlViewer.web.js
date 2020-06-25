import React from "react";
import themedStyles from "../../styles";
import { useStyleSheet } from "@ui-kitten/components";

function HtmlViewer({ setIsReady, html }) {
  const styles = useStyleSheet(themedStyles);

  setIsReady(true);
  
  return (
    <div
      style={{
        ...styles.htmlViewer,
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif"
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default HtmlViewer;
