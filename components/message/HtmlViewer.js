import { Button, Icon, useStyleSheet } from "@ui-kitten/components";
import React, { useState } from "react";
import { getInjectedCss, getInjectedJavaScript } from "./injectedContent";

import { Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import themedStyles from "../../styles";

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

function isComplexHtml(html) {
  return html.indexOf("<table") >= 0;
}

function getInitialScale(html) {
  // TODO: This scale should take device screen size into account
  return isComplexHtml(html) ? 0.5 : 1;
}

const MoreIcon = (props) => <Icon {...props} name="more-horizontal-outline" />;

function HtmlViewer({ isReady, setIsReady, html, hidden = false }) {
  const [height, setHeight] = useState(0);
  const [collapseQuote, setCollapseQuote] = useState(true);
  const [hasCollapsedQuote, setHasCollapsedQuote] = useState(false);

  const styles = useStyleSheet(themedStyles);
  const injectedCss = getInjectedCss(styles);
  const injectedJavaScript = getInjectedJavaScript(collapseQuote);

  function handleWebViewMessage(event) {
    const { height, width, collapsedQuote } = JSON.parse(event.nativeEvent.data);

    setHeight(calculateHeight(height, width));
    setHasCollapsedQuote(collapsedQuote);

    // We're ready now but wait a beat to prevent flicker
    setTimeout(() => setIsReady(true), 10);
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
        <body><div id="bipbopmail">${html}</div><script>${injectedJavaScript}</script></body>
      </html>`;
  }

  return (
    <>
      <WebView
        originWhitelist={["*"]}
        source={{ html: prepHtml() }}
        onMessage={handleWebViewMessage}
        scrollEnabled={false}
        style={{
          ...styles.htmlViewer,
          flex: 0,
          height: hidden ? 0 : height,
          opacity: isReady ? 1 : 0
        }}
      />
      {!hidden && hasCollapsedQuote && (
        <Button
          appearance="ghost"
          status="basic"
          size="small"
          style={{ width: 20, padding: 0, marginLeft: -5 }}
          accessoryLeft={MoreIcon}
          onPress={() => setCollapseQuote(false)}
        />
      )}
    </>
  );
}

export default HtmlViewer;
