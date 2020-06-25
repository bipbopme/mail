import React, { useEffect } from "react";

function WebView({ source: { html }, style = {}, onMessage }) {
  const iframeRef = React.createRef();

  function handlePostMessage(event) {
    if (iframeRef.current && iframeRef.current.contentWindow == event.source) {
      onMessage({ nativeEvent: event });
    }
  }

  useEffect(() => {
    // It would be better for this to listen for messages on the iframe
    // content window but that was only working for one update. this fixes
    // it but means filtering through all post messages.
    window.addEventListener("message", handlePostMessage);
    return () => window.removeEventListener("message", handlePostMessage);
  });

  return (
    <iframe
      style={{ borderWidth: 0, height: style.height, opacity: style.opacity }}
      ref={iframeRef}
      srcDoc={html}
    />
  );
}

export default WebView;
