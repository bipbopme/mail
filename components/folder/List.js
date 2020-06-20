import { Drawer, DrawerItem, Icon, IndexPath, Text, TopNavigation, useStyleSheet } from "@ui-kitten/components";

import React from "react";
import { SafeAreaView } from "react-native";
import themedStyles from "../../styles";

const InboxIcon = (props) => <Icon {...props} name="inbox-outline" />;
const FolderIcon = (props) => <Icon {...props} name="folder-outline" />;
const TrashIcon = (props) => <Icon {...props} name="trash-2-outline" />;
const ArchiveIcon = (props) => <Icon {...props} name="archive-outline" />;
const DraftsIcon = (props) => <Icon {...props} name="edit-2-outline" />;
const SentIcon = (props) => <Icon {...props} name="paper-plane-outline" />;
const JunkIcon = (props) => <Icon {...props} name="close-square-outline" />;

const iconMap = {
  Inbox: InboxIcon,
  Sent: SentIcon,
  Drafts: DraftsIcon,
  Junk: JunkIcon,
  Trash: TrashIcon,
  Archive: ArchiveIcon,
  Default: FolderIcon
};

function FolderList({ navigation, state, folders }) {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TopNavigation
        title={() => <Text style={styles.logo}>bipbop:mail</Text>}
        style={{ paddingLeft: 16 }}
      />
      <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      >
        {folders.map((folder) => (
          <DrawerItem key={folder.id} title={folder.name} accessoryLeft={iconMap[folder.name] || iconMap.Default} />
        ))}
      </Drawer>
    </SafeAreaView>
  );
}

export default FolderList;
