import {
  Divider,
  ListItem,
  StyleService,
  Text,
  useStyleSheet
} from "@ui-kitten/components";
import React, { useState } from "react";

import Avatar from "../shared/Avatar";
import { DateTime } from "luxon";
import MessageDetail from "./Detail";
import { View } from "react-native";

function MessageListItem({ to, from, date, excerpt, text, html, flags, attachments, lastItem }) {
  const styles = useStyleSheet(messageListStyles);
  const [expanded, setExpanded] = useState(flags === "u" || lastItem);

  function getToNames() {
    return to.map((e) => e.displayName).join(", ");
  }

  function getNames(emailAddresses) {
    if (emailAddresses.length > 1) {
      return emailAddresses.map((e) => e.displayName).join(", ");
    } else {
      return emailAddresses[0].name || emailAddresses[0].displayName;
    }
  }

  function getAvatarName(emailAddresses) {
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

  return (
    <>
      <ListItem onPress={() => setExpanded(!expanded)}>
        <View style={styles.listItem}>
          <View>
            <Avatar name={getAvatarName(from)} />
          </View>
          <View style={styles.center}>
            <Text style={styles.names}>
              {getNames(from)} <Text style={styles.date}>{getFormattedDate()}</Text>
            </Text>
            {expanded ? (
              <Text numberOfLines={1} style={styles.excerpt}>
                to {getNames(to)}
              </Text>
            ) : (
              <Text numberOfLines={1} style={styles.excerpt}>
                {excerpt}
              </Text>
            )}
          </View>
          <View></View>
        </View>
      </ListItem>
      <MessageDetail {...{ text, html, attachments, styles, expanded }} />
      <Divider />
    </>
  );
}

const messageListStyles = StyleService.create({
  listItem: {
    flex: 1,
    flexDirection: "row"
  },

  center: {
    flex: 1,
    paddingHorizontal: 12
  },

  names: {
    color: "text-basic-color",
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
  },

  bodyHidden: {
    paddingHorizontal: 20
  },

  body: {
    paddingHorizontal: 20,
    paddingTop: 10
  }
});

export default MessageListItem;
