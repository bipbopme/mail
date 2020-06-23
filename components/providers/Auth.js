import React, { useEffect, useState } from "react";

import { AppLoading } from "expo";
import { AsyncStorage } from "react-native";
import { ZimbraBatchClient } from "@zimbra/api-client";

const ZIMBRA_ORIGIN = "https://proxy.bipbop.me";
const AuthContext = React.createContext();
const encode = (obj) => Buffer.from(obj).toString("base64");
const decode = (str) => Buffer.from(str, "base64").toString("utf8");

function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const loadCredentials = async () => {
    const [[, username], [, password], [, authToken]] = await AsyncStorage.multiGet([
      "username",
      "password",
      "authToken"
    ]);

    setUsername(username);
    setPassword(password);
    setAuthToken(authToken);
  };

  // TODO: this might be too fancy
  const saveCredentials = async (credentials) => {
    credentials.password = encode(credentials.password);

    const pairs = Object.keys(credentials).map((key) => [key, credentials[key]]);
    await AsyncStorage.multiSet(pairs);

    setUsername(credentials.username);
    setPassword(credentials.password);
    setAuthToken(credentials.authToken);
  };

  const clearCredentials = async () => {
    // Keep the username for now to help the user log back in
    return AsyncStorage.multiRemove(["password", "authToken"]);
  };

  const decodePassword = () => decode(password);

  const login = async (username, password) => {
    const zimbra = new ZimbraBatchClient({ zimbraOrigin: ZIMBRA_ORIGIN });

    try {
      const response = await zimbra.login({ username: username, password: password });
      const authToken = response.authToken[0]._content;
      await saveCredentials({ username, password, authToken });

      return authToken;
    } catch (error) {
      clearCredentials();

      throw error;
    }
  };

  const [isReady, setIsReady] = useState(false);

  useEffect(async () => {
    await loadCredentials();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider value={{ username, decodePassword, authToken, login }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

const useZimbra = () => {
  const { username, decodePassword, authToken, login } = useAuth();

  const zimbra = new ZimbraBatchClient({
    jwtToken: authToken,
    zimbraOrigin: ZIMBRA_ORIGIN
  });

  const zimbraWrapper = async (fun, options) => {
    try {
      return await zimbra[fun](options);
    } catch (error) {
      if (error.message.indexOf("no valid authtoken present") >= 0) {
        // Let exceptions bubble up
        const newAuthToken = await login(username, decodePassword());
        zimbra.jwtToken = newAuthToken;

        // Retry once with new credentials
        // Let exceptions bubble up
        return await zimbra[fun](options);
      } else {
        throw error;
      }
    }
  };

  return zimbraWrapper;
};

export { AuthProvider, useAuth, useZimbra };
