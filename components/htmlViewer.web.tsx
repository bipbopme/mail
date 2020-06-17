import React from "react";

export default class HtmlViewer extends React.Component {
  render() {
    return (
      <div
        style={{ fontFamily: "helvetica, arial, sans-serif", fontSize: "14px" }}
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
    );
  }
}
