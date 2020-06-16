export default class ZimbraService {
  url: string;
  authToken: string | undefined;

  constructor(url: string, authToken?: string) {
    this.url = url;
    this.authToken = authToken;
  }

  protected async post(body: {}, authenticated = true) {
    const header = this.getHeader(authenticated);
    const requestBody = { ...header, Body: body };

    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(requestBody)
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      const fault = json?.Body?.Fault;

      if (fault) {
        throw new Error(fault.Detail?.Error?.Code);
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    }
  }

  protected getHeader(authenticated = true) {
    return {
      Header: {
        context: {
          _jsns: "urn:zimbra",
          authToken: authenticated ? this.authToken : undefined
        }
      }
    };
  }
}
