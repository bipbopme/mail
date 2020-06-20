import Avatar from "../shared/Avatar";
import { ListItem } from "@ui-kitten/components";
import React from "react";

function ConversationListItem({ navigation, id, subject, emailAddresses }) {
  function navigateToConversation() {
    navigation.navigate("conversationDetail", { id: id, subject: subject });
  }

  return (
    <ListItem
      title={emailAddresses[0].name}
      description={subject}
      accessoryLeft={() => <Avatar name={emailAddresses[0].name} />}
      onPress={navigateToConversation}
    />
  );
}

export default ConversationListItem;
