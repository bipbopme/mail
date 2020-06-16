import ZimbraService from "./zimbraService";

export default class ZimbraAccount extends ZimbraService {
  constructor(host: string, authToken?: string) {
    super(`https://proxy.bipbop.me/service/soap/`, authToken);
  }

  async auth(username: string, password: string): Promise<AuthResponse> {
    const response = await this.post({
      AuthRequest: {
        _jsns: "urn:zimbraAccount",
        account: {
          by: "name",
          _content: username
        },
        password: password
      }
    });

    this.authToken = response?.Body?.AuthResponse?.authToken[0]?._content;

    return { authToken: this.authToken };
  }
}

interface AuthResponse {
  authToken?: string;
}