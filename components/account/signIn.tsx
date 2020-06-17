import React from "react";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import styles from "../../styles";
import ZimbraAccount from "../../lib/zimbraAccount";

interface SignInProps {
  route: {
    params: {
      onAuthTokenUpdate(authToken: string): void;
    }
  }
}

interface SignInState {
  username: string;
  password: string;
  errorMessage?: string;
}

export default class SignIn extends React.Component<SignInProps, SignInState> {
  zimbraAccount: ZimbraAccount;

  constructor(props: SignInProps) {
    super(props);

    this.zimbraAccount = new ZimbraAccount("zimbra.bipbop.me");

    this.state = {
      username: "",
      password: "",
      errorMessage: undefined
    };
  }

  handleUsernnameChange(username: string) {
    this.setState({ username });
  }

  handlePasswordChange(password: string) {
    this.setState({ password });
  }

  async handlePress() {
    this.setState({ errorMessage: undefined });

    try {
      const response = await this.zimbraAccount.auth(this.state.username, this.state.password);

      if (response.authToken) {
        this.props.route.params.onAuthTokenUpdate(response.authToken);
      }
    } catch (error) {
      this.setState({ errorMessage: "Username and password failed." });
    }
  }

  render() {
    return (
      <Layout style={[styles.paddedLayout, styles.centeredLayout]}>
        {this.state.errorMessage && <Text status="danger">Username and password failed.</Text>}
        <Input
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={this.handleUsernnameChange.bind(this)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={this.handlePasswordChange.bind(this)}
        />
        <Button onPress={this.handlePress.bind(this)}>Sign in</Button>
      </Layout>
    );
  }
}
