import React from "react";
import { SafeAreaView } from "react-native";
import { Divider, Layout, List, Input, TopNavigation } from "@ui-kitten/components";
import styles from "../styles";
import { ZimbraBatchClient, types } from "@zimbra/api-client";
import MailboxItem from "./mailboxItem";

interface IMailboxProps {
  route: {
    params: {
      authToken: string;
    }
  }
}

interface IMailboxState {
  converations: [];
}

export default class Mailbox extends React.Component<IMailboxProps, IMailboxState> {
  zimbra: ZimbraBatchClient;

  constructor(props: IMailboxProps) {
    super(props);

    this.zimbra = new ZimbraBatchClient({ jwtToken: this.props.route.params.authToken, zimbraOrigin: "https://proxy.bipbop.me" });

    this.state = {
      converations: []
    }

    this.update();
  }

  async update() {
    const response = await this.zimbra.search({ query: "in:inbox" });

    this.setState({ conversations: response.conversations });
  }

  renderHeader() {
    return (
      <Layout style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8 }} level="1">
        <Input placeholder="Search" />
      </Layout>
    );
  }

  renderItem({ item }) {
    return <MailboxItem {...item} />
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {/* <TopNavigation title="Mail" alignment="center" />
        <Divider /> */}
        <List
          style={{ flex: 1 }}
          data={this.state.conversations}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    );
  }
}
