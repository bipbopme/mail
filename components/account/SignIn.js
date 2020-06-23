import { Button, Input, Layout, Text, useStyleSheet } from "@ui-kitten/components";
import React, { useState } from "react";

import themedStyles from "../../styles";
import { useAuth } from "../providers/Auth";

function SignIn({ route }) {
  const styles = useStyleSheet(themedStyles);
  const { login } = useAuth();
  
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleButtonPress() {
    setErrorMessage(null);

    try {
      await login(username, password);
    } catch (error) {
      if (error.message?.match(/authentication failed/)) {
        setErrorMessage("Username and password failed.");
      } else {
        setErrorMessage("Unknown error ocurred.");
        console.error(error);
      }
      
    }
  }

  return (
    <Layout style={[styles.paddedLayout, styles.centeredLayout]}>
      {errorMessage && <Text status="danger">Username and password failed.</Text>}
      <Input placeholder="Username" autoCapitalize="none" onChangeText={setUsername} />
      <Input placeholder="Password" secureTextEntry={true} onChangeText={setPassword} />
      <Button onPress={handleButtonPress}>Sign in</Button>
    </Layout>
  );
}

export default React.memo(SignIn);
