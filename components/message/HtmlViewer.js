import React, { useState } from "react";
import { getInjectedCss, injectedJavaScript } from "./injectedContent";

import { Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import themedStyles from "../../styles";
import { useStyleSheet } from "@ui-kitten/components";

function calculateHeight(contentHeight, contentWidth) {
  // TODO: pull horizontal padding from styles
  let zoom = 1;

  // Sometimes we get 0 for the content width
  if (contentWidth > 0) {
    zoom = (Dimensions.get("window").width - 40) / contentWidth;
  }

  // Add extra padding to the bottom so it's not cutoff
  return contentHeight * zoom + 20;
}

function HtmlViewer({ html, hidden = false }) {
  const [height, setHeight] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const styles = useStyleSheet(themedStyles);
  const injectedCss = getInjectedCss(styles);

  function handleWebViewMessage(event) {
    const { height, width } = JSON.parse(event.nativeEvent.data);

    setHeight(calculateHeight(height, width));

    // We're ready now but wait a beat to prevent flicker
    setTimeout(() => setIsReady(true), 10);
  }

  function isComplexHtml() {
    return html.indexOf("<table") >= 0;
  }

  function getInitialScale() {
    // TODO: This scale should take device screen size into account
    return isComplexHtml(html) ? 0.5 : 1;
  }

  function prepHtml() {
    return `
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=${getInitialScale(
            html
          )}" />
          ${injectedCss}
        </head>
        <body><div id="bipbopmail">${html}</div></body>
      </html>`;
  }

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: prepHtml() }}
      onMessage={handleWebViewMessage}
      injectedJavaScript={injectedJavaScript}
      scrollEnabled={false}
      style={{
        ...styles.htmlViewer,
        flex: 0,
        height: hidden ? 0 : height,
        opacity: isReady ? 1 : 0
      }}
    />
  );
}

export default HtmlViewer;
