import ZimbraService from "./zimbraService";

export default class ZimbraMail extends ZimbraService {
  constructor(host: string, authToken?: string) {
    super(`https://proxy.bipbop.me/zimbra/service/soap/`, authToken);
  }
}