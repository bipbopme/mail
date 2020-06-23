import {
  Divider,
  Icon,
  List,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet
} from "@ui-kitten/components";
import { Platform, SafeAreaView } from "react-native";

import ConversationListItem from "./ListItem";
import LoadingScreen from "../shared/LoadingScreen";
import React from "react";
import themedStyles from "../../styles";
import useSWR from "swr";
import { useZimbra } from "../providers/Auth";

const REFRESH_INTERVAL_SECONDS = 60 * 1000;

const MenuIcon = (props) => <Icon {...props} name="menu" />;

function ConversationList({ navigation, route }) {
  const name = route.params.name;
  const styles = useStyleSheet(themedStyles);
  const zimbra = useZimbra();

  const { data, error } = useSWR(["search", `in:${name}`], (key, query) => zimbra(key, { query }), {
    refreshInterval: REFRESH_INTERVAL_SECONDS
  });

  function renderItem({ item }) {
    return <ConversationListItem {...item} navigation={navigation} />;
  }

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={() => navigation.openDrawer()} />
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TopNavigation
        style={styles.topNavigation}
        title={name}
        alignment={Platform.select({ android: "start", default: "center" })}
        accessoryLeft={MenuAction}
      />
      <Divider />
      {data ? (
        <List style={styles.list} data={data.conversations} renderItem={renderItem} />
      ) : (
        <LoadingScreen error={error} />
      )}
    </SafeAreaView>
  );
}

export default ConversationList;
