import { ListItem, StyleService, Text, useStyleSheet } from "@ui-kitten/components";

import Avatar from "../shared/Avatar";
import { DateTime } from "luxon";
import React from "react";
import { View } from "react-native";

function ConversationListItem({
  navigation,
  id,
  date,
  subject,
  excerpt,
  emailAddresses,
  numMessages,
  unread
}) {
  const styles = useStyleSheet(conversationListStyles);

  function navigateToConversation() {
    navigation.navigate("conversationDetail", { id: id, subject: subject });
  }

  function getName(emailAddress) {
    return emailAddress ? emailAddress.displayName : "";
  }

  function getNames() {
    if (emailAddresses.length > 1) {
      return emailAddresses.map((e) => e.displayName).join(", ");
    } else {
      return emailAddresses[0].name || emailAddresses[0].displayName;
    }
  }

  function getAvatarName() {
    return emailAddresses[0].name || emailAddresses[0].displayName?.slice(0, 2)?.toUpperCase();
  }

  function getFormattedDate() {
    const dateTime = DateTime.fromMillis(date);
    const now = DateTime.local();

    if (dateTime.toISODate() === now.toISODate()) {
      return dateTime.toFormat("t");
    } else {
      return dateTime.toFormat("MMM d");
    }
  }

  const namesStyle = unread ? [styles.names, styles.unread] : styles.names;
  const subjectStyle = unread ? [styles.subject, styles.unread] : styles.subject;
  const dateStyle = unread ? [styles.date, styles.unread] : styles.date;

  return (
    <ListItem onPress={navigateToConversation}>
      <View style={styles.listItem}>
        <View>
          <Avatar name={getAvatarName()} />
        </View>
        <View style={styles.center}>
          <Text style={namesStyle}>
            {getNames()} {numMessages > 1 && <Text style={styles.count}>{numMessages}</Text>}
          </Text>
          <Text style={subjectStyle}>{subject}</Text>
          <Text numberOfLines={1} style={styles.excerpt}>
            {excerpt}
          </Text>
        </View>
        <View>
          <Text style={dateStyle}>{getFormattedDate()}</Text>
        </View>
      </View>
    </ListItem>
  );
}

const conversationListStyles = StyleService.create({
  listItem: {
    flex: 1,
    flexDirection: "row"
  },

  center: {
    flex: 1,
    paddingHorizontal: 12
  },

  names: {
    color: "text-hint-color",
    fontSize: 15
  },

  subject: {
    color: "text-hint-color",
    fontSize: 14,
    paddingTop: 2
  },

  count: {
    color: "text-hint-color",
    fontSize: 12
  },

  excerpt: {
    color: "text-hint-color",
    fontSize: 14,
    paddingTop: 2
  },

  date: {
    color: "text-hint-color",
    fontSize: 13
  },

  unread: {
    color: "text-basic-color",
    fontWeight: "600"
  }
});

export default ConversationListItem;
