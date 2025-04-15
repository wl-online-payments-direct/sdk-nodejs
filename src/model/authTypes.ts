import { BaseConfiguration, Header } from "./types";

export interface Authenticator {
  getAuthorization(method: string, contentType: string, date: string, headers: Header[], path: string): Promise<string>;
}

export interface V1HmacConfiguration extends BaseConfiguration {
  apiKeyId: string;
  secretApiKey: string;
}

export type Configuration = V1HmacConfiguration;
