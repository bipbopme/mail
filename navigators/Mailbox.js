import ConversationList from "../components/conversation/List";
import FolderList from "../components/folder/List";
import LoadingScreen from "../components/shared/LoadingScreen";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createZimbraClient } from "../utils";
import sortBy from "lodash/sortBy";
import useSWR from "swr";

function MailboxNavigator() {
  const { Navigator, Screen } = createDrawerNavigator();

  async function fetcher(_key, path) {
    return (await createZimbraClient()).getFolder({ folder: { path }, view: "message" });
  }

  const { data, error } = useSWR(["getFolder", "/"], fetcher);

  if (!data) {
    return <LoadingScreen error={error} />;
  } else {
    let folders = data?.folders?.[0]?.folders;
    folders = folders.filter((f) => f.absFolderPath !== "/Chats");
    folders = sortBy(folders, "id");

    return (
      <Navigator drawerContent={(props) => <FolderList {...props} folders={folders} />}>
        {folders.map((folder) => (
          <Screen
            key={folder.name}
            name={folder.name}
            component={ConversationList}
            initialParams={{ name: folder.name }}
          />
        ))}
      </Navigator>
    );
  }
}

export default MailboxNavigator;
