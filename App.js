import AccountCheck from "./components/account/Check";
import AccountNavigator from "./components/navigators/Account";
import AppProviders from "./components/providers/App";
import MainNavigator from "./components/navigators/Main";
import React from "react";

function App() {
  return (
    <AppProviders>
      <AccountCheck
        authenticatedComponent={<MainNavigator />}
        unauthenticatedComponent={<AccountNavigator />}
      />
    </AppProviders>
  );
}

export default App;
