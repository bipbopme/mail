import React from "react";

function HtmlViewer({ html }) {
  return (
    <div
      style={{ fontFamily: "helvetica, arial, sans-serif", fontSize: "14px" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default HtmlViewer;
