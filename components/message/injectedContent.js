export function getInjectedJavaScript(collapseQuote = false) {
  return `
    const TEXT_REGEX = /(On [\\s\\S]+ wrote:)/i;

    function getDividerNode() {
      const walker = document.createTreeWalker(
        document.documentElement,
        NodeFilter.SHOW_ALL,
        {
          acceptNode: function(node) {
            if (node.nodeName == "#text") {
              if (!["SCRIPT", "STYLE"].includes(node.parentNode.nodeName)) {
                return NodeFilter.FILTER_ACCEPT;
              }
            } else if (['DIV', 'BLOCKQUOTE', 'HR'].includes(node.nodeName)) {
              return NodeFilter.FILTER_ACCEPT;
            } else {
              return NodeFilter.FILTER_SKIP;
            }
          }
        }
      );

      let node, dividerNode;

      while(node = walker.nextNode()) {
        if (node.nodeName === "#text") {
          if (node.nodeValue.match(TEXT_REGEX)) {
            dividerNode = node.parentNode.parentNode;
          }
        } else if (node.nodeName === "HR") {
          if (node.id === "zwchr" || (node.size === "2" && node.width === "100%" && node.align === "center")) {
            dividerNode = node;
          }
        } else if (node.nodeName === "DIV") {
          if (node.className === "OutlookMessageHeader" || node.className === "gmail_quote") {
            dividerNode = node;
          }
        }

        if (dividerNode) break;
      }

      return dividerNode;
    }

    function prune(node) {
      let parent = node.parentNode;

      while (parent.lastChild !== node) {
        parent.removeChild(parent.lastChild);
      }

      parent.removeChild(node);
    }

    const collapseQuote = ${collapseQuote};
    let dividerNode;

    if (collapseQuote) {
      dividerNode = getDividerNode();

      if (dividerNode) {
        prune(dividerNode);
      }
    }

    let height = document.getElementById("bipbopmail").offsetHeight;
    let width = window.innerWidth;

    let data = { height: height, width: width, collapsedQuote: !!dividerNode }; 
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
    true;`
}

export function getInjectedCss(styles) {
  return `
  <style>
    body {
      background: ${styles.htmlViewer.backgroundColor};
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
      font-size: ${styles.htmlViewer.fontSize};
      margin: 0;
      padding: 0;
    }

    * {
      color: ${styles.htmlViewer.color} !important;
    }
    
    a {
      color: ${styles.htmlViewerAnchor.color} !important;
    }
  </style>`;
}
