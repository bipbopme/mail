import React from "react";
import { Dimensions } from "react-native";
import { WebView } from "react-native-webview";

export default class HtmlViewer extends React.Component {
  state = {
    height: 1000 // Higher starting height seems to lead to better height/width calculations
  };
  
  constructor(props) {
    super(props);
  }

  handleWebViewMessage(event) {
    if (event.nativeEvent.data) {
      const { height, width } = JSON.parse(event.nativeEvent.data);

      // TODO: pull horizontal padding from styles
      const zoom = (Dimensions.get("window").width - 40) / width;

      this.setState({ height: (height * zoom) + 20 });
    }
  }

  isComplexHtml(html) {
    return html.indexOf("<table") >= 0;
  }

  getInitialScale(html) {
    // TODO: This scale should take device screen size into account
    return this.isComplexHtml(html) ? 0.5 : 1;
  }

  prepHtml() {
    const html = this.props.html;

    return `
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=${this.getInitialScale(html)}" />
          ${injectedCss}
        </head>
        <body><div id="bipbopmail">${html}</div></body>
      </html>`;
  }

  render() {
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