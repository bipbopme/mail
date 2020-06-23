import ConversationNavigator from "./Conversation";
import ConversationSplitNavigator from "./ConversationSplit";
import FolderList from "../folder/List";
import LoadingScreen from "../shared/LoadingScreen";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import sortBy from "lodash/sortBy";
import themedStyles from "../../styles";
import { useDimensions } from "@react-native-community/hooks";
import useSWR from "swr";
import { useStyleSheet } from "@ui-kitten/components";
import { useZimbra } from "../providers/Auth";

function FolderNavigator() {
  const { Navigator, Screen } = createDrawerNavigator();
  const dimensions = useDimensions();
  const styles = useStyleSheet(themedStyles);
  const zimbra = useZimbra();

  async function fetcher(key, path) {
    return zimbra(key, { folder: { path }, view: "message" });
  }

  const { data, error } = useSWR(["getFolder", "/"], fetcher);

  if (!data) {
    return <LoadingScreen error={error} />;
  } else {
    let folders = data?.folders?.[0]?.folders;
    folders = folders.filter((f) => f.absFolderPath !== "/Chats");
    folders = sortBy(folders, "id");

    return (
      <Navigator
        drawerContent={(props) => <FolderList {...props} folders={folders} />}
        drawerType={dimensions.window.width >= 1024 ? "permanent" : "front"}
        drawerStyle={styles.drawer}
      >
        {folders.map((folder) => (
          <Screen
            key={folder.name}
            name={folder.name}
            component={dimensions.window.width >= 768 ? ConversationSplitNavigator : ConversationNavigator}
            initialParams={{ name: folder.name }}
          />
        ))}
      </Navigator>
    );
  }
}

export default FolderNavigator;
