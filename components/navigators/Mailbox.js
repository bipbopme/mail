import ConversationList from "../conversation/List";
import FolderList from "../folder/List";
import LoadingScreen from "../shared/LoadingScreen";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import sortBy from "lodash/sortBy";
import useSWR from "swr";
import { useZimbra } from "../providers/Auth";

function MailboxNavigator() {
  const { Navigator, Screen } = createDrawerNavigator();
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
