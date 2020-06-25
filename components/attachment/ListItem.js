import * as WebBrowser from "expo-web-browser";

import { Button, Icon } from "@ui-kitten/components";

import React from "react";

const FileIcon = (props) => <Icon {...props} name="file-outline" />;
const FilmIcon = (props) => <Icon {...props} name="film-outline" />;
const ImageIcon = (props) => <Icon {...props} name="image-outline" />;

function getIcon(contentType) {
  if (!contentType) return FileIcon;

  if (contentType.match(/^video/i)) {
    return FilmIcon;
  } else if (contentType.match(/^image/i)) {
    return ImageIcon;
  } else {
    return FileIcon;
  }
}

function AttachmentListItem({ filename, contentType, url }) {
  function openUrl() {
    const fixedUrl = url.replace("auth=jwt&", "").replace("zjwt=", "zauthtoken=");

    WebBrowser.openBrowserAsync(fixedUrl);
  }

  return (
    <Button
      size="small"
      appearance="outline"
      status="info"
      style={{ marginBottom: 8, marginRight: 8 }}
      accessoryLeft={getIcon(contentType)}
      onPress={openUrl}
    >
      {filename}
    </Button>
  );
}

export default AttachmentListItem;
