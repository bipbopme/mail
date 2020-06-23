import AccountCheck from "./components/account/Check";
import AccountNavigator from "./components/navigators/Account";
import AppProviders from "./components/providers/App";
import FolderNavigator from "./components/navigators/Folder";
import React from "react";

function App() {
  return (
    <AppProviders>
      <AccountCheck
        authenticatedComponent={<FolderNavigator />}
        unauthenticatedComponent={<AccountNavigator />}
      />
    </AppProviders>
  );
}

export default App;
