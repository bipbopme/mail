import { Icon, ListItem } from "@ui-kitten/components";

import React from "react";

function ConversationListItem({ navigation, id, subject, emailAddresses }) {
  function navigateToConversation() {
    navigation.navigate("conversationDetail", { id: id, subject: subject });
  }

  const PersonIcon = (props) => <Icon {...props} name="person" />;

  return (
    <ListItem
      title={emailAddresses[0].name}
      description={subject}
      accessoryLeft={PersonIcon}
      onPress={navigateToConversation}
    />
  );
}

export default ConversationListItem;
