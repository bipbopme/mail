import { Icon, Text, TopNavigation, TopNavigationAction, useStyleSheet } from "@ui-kitten/components";

import React from "react";
import themedStyles from "../../styles";

const StarIcon = (props) => <Icon {...props} fill="#8d9bb5" name="star-outline" />;

function ConversationDetailSubject({ subject }) {
  const styles = useStyleSheet(themedStyles);

  const SubjectHeading = () => (
    <Text style={styles.subjectHeading} category="h6">{subject}</Text>
  );

  const StarAction = () => (
    <TopNavigationAction icon={StarIcon} />
  );

  return (
    <TopNavigation accessoryLeft={SubjectHeading} accessoryRight={StarAction} />
  );
}

export default ConversationDetailSubject;