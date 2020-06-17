import React from "react";

export default class HtmlViewer extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.props.html }} />;
  }
}
