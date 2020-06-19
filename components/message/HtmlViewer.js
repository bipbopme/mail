import React, { useState } from "react";

import { Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import themedStyles from "../../styles";
import { useStyleSheet } from "@ui-kitten/components";

const injectedJavascript = `
  setTimeout(function() {
    var height = document.getElementById("bipbopmail").offsetHeight;
    var width = window.innerWidth;
    var data = { height: height, width: width }; 
    window.ReactNativeWebView.postMessage(JSON.stringify(data)); 
  }, 10);
  true;`;

function HtmlViewer({ html }) {
  // This is some kind of guess at the average message height
  const [height, setHeight] = useState(200);
  const [isReady, setIsReady] = useState(false);

  const styles = useStyleSheet(themedStyles);
  const injectedCss = `
  <style>
    body {
      background: ${styles.htmlViewer.backgroundColor};
      color: ${styles.htmlViewer.color};
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
      font-size: ${styles.htmlViewer.fontSize};
      margin: 0;
      padding: 0;
    }
    
    a {
      color: ${styles.htmlViewerAnchor.color};
    }
  </style>`;

  function handleWebViewMessage(event) {
    const { height, width } = JSON.parse(event.nativeEvent.data);

    // TODO: pull horizontal padding from styles
    const zoom = (Dimensions.get("window").width - 40) / width;

    setHeight(height * zoom + 20);
    setTimeout(() => { setIsReady(true) }, 10);
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
          <meta name="viewport" content="width=device-width, initial-scale=${getInitialScale(html)}" />
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
      injectedJavaScript={injectedJavascript}
      scrollEnabled={false}
      style={{
        ...styles.htmlViewer,
        flex: 0,
        height: height,
        opacity: isReady ? 1 : 0
      }}
    />
  );
}

export default HtmlViewer;
