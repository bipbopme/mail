import React from "react";
import { WebView } from 'react-native-webview'

const injectedJavascript =
  "setTimeout(function() { window.ReactNativeWebView.postMessage(document.documentElement.offsetHeight) }, 10);true;";
const injectedCss =
  "<style>body { font-family: sans-serif; font-size: 16px; }</style>";

export default class HtmlViewer extends React.Component {
  state = {
    height: 0
  }
  constructor(props) {
    super(props);
  }

  handleWebViewMessage(event) {
    if (event.nativeEvent.data) {
      this.setState({ height: parseInt(event.nativeEvent.data) / 2 });
    }
  }

  prepHtml() {
    return `<html><head><meta key="viewport" name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=1" />${injectedCss}</head><body>${this.props.html}</body></html>`;
  }

  render() {
    console.log(this.prepHtml());
    return (
      <WebView
        originWhitelist={["*"]}
        source={{ html: this.prepHtml() }}
        onMessage={this.handleWebViewMessage.bind(this)}
        injectedJavaScript={injectedJavascript}
        scrollEnabled={false}
        style={{ flex: 0, height: this.state.height }}
      />
    );
  }
}
