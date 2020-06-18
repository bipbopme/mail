import { Icon, ListItem } from "@ui-kitten/components";

import React from "react";

function ConversationListItem({ navigation, id, subject, emailAddresses }) {
  function navigateToConversation() {
    navigation.navigate("conversationDetail", { id: id, subject: subject });
  }

  function renderIcon(props) {
    return <Icon {...props} name="person" />;
  }

  return (
    <ListItem
      title={emailAddresses[0].name}
      description={subject}
      accessoryLeft={renderIcon}
      onPress={navigateToConversation}
    />
  );
}

export default ConversationListItem;
