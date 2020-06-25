import { WebView as NativeWebView } from "react-native-webview";
import React from "react";

function WebView(props) {
  return <NativeWebView {...props} />;
}

export default WebView;
