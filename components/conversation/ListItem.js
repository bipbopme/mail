import { Icon, Layout, ListItem } from "@ui-kitten/components";

import React from "react";
import UserAvatar from "react-native-user-avatar";

function ConversationListItem({ navigation, id, subject, emailAddresses }) {
  function navigateToConversation() {
    navigation.navigate("conversationDetail", { id: id, subject: subject });
  }

  const PersonIcon = (props) => <Icon {...props} name="person" />;

  const AvatarWrapper = () => (
    <UserAvatar size={42} style={{ height: 40, width: 40 }} name={emailAddresses[0].name} />
  );

  return (
    <ListItem
      title={emailAddresses[0].name}
      description={subject}
      accessoryLeft={AvatarWrapper}
      onPress={navigateToConversation}
    />
  );
}

export default ConversationListItem;
