import { Divider, Icon, TopNavigation, TopNavigationAction, useStyleSheet } from "@ui-kitten/components";

import LoadingScreen from "../shared/LoadingScreen";
import MessageList from "../message/List";
import React from "react";
import { SafeAreaView } from "react-native";
import Subject from "./DetailSubject";
import { createZimbraClient } from "../../utils";
import themedStyles from "../../styles";
import useSWR from "swr";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const TrashIcon = (props) => <Icon {...props} name="trash-2-outline" />;
const ArchiveIcon = (props) => <Icon {...props} name="archive-outline" />;

const RightActions = () => (
  <>
    <TopNavigationAction icon={ArchiveIcon} />
    <TopNavigationAction icon={TrashIcon} />
  </>
);

function ConversationDetail({ navigation, route }) {
  const styles = useStyleSheet(themedStyles);
  
  async function fetcher(_key, id) {
    return (await createZimbraClient()).getConversation({
      id,
      fetch: "all",
      html: true
    });
  }

  function handleBackActionPress() {
    navigation.goBack();
  }

  const BackButtonWrapper = () => <TopNavigationAction icon={BackIcon} onPress={handleBackActionPress} />;
  const SubjectWrapper = () => (
    <Subject subject={route.params.subject} />
  );

  const { data, error } = useSWR(["getConversation", route.params.id], fetcher);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TopNavigation accessoryLeft={BackButtonWrapper} accessoryRight={RightActions} />
      <Divider />
      {data ? (
        <MessageList messages={data.messages} ListHeaderComponent={SubjectWrapper} />
      ) : (
        <>
          <SubjectWrapper />
          <LoadingScreen error={error} />
        </>
      )}
    </SafeAreaView>
  );
}

export default ConversationDetail;
