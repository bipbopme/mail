import { Dimensions, Text } from "react-native";
import React, { useState } from "react";

import { WebView } from "react-native-webview";

const injectedJavascript = `
  setTimeout(function() {
    var height = document.getElementById("bipbopmail").offsetHeight;
    var width = window.innerWidth;
    var data = { height: height, width: width }; 
    window.ReactNativeWebView.postMessage(JSON.stringify(data)); 
  }, 10);
  true;`;

const injectedCss = `
  <style>
    #bipbopmail {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 
      font-size: 16px;
      max-width: 100%;
    }
  </style>`;

function HtmlViewer({ html }) {
  // Higher starting height seems to lead to better height/width calculations
  const [height, setHeight] = useState(1000);

  function handleWebViewMessage(event) {
    const { height, width } = JSON.parse(event.nativeEvent.data);

    // TODO: pull horizontal padding from styles
    const zoom = (Dimensions.get("window").width - 40) / width;

    setHeight(height * zoom + 20);
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
      style={{ flex: 0, height: height }}
    />
  );
}

export default HtmlViewer;
