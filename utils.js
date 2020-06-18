import { AsyncStorage } from "react-native";
import { ZimbraBatchClient } from "@zimbra/api-client";

export async function createZimbraClient() {
  const authToken = await AsyncStorage.getItem("authToken");

  return new ZimbraBatchClient({
    jwtToken: authToken,
    zimbraOrigin: "https://proxy.bipbop.me"
  });
}
