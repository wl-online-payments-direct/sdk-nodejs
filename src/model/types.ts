import { Readable } from "stream";
import { Agent } from "http";
import { ShoppingCartExtension } from "./domain";
import { Authenticator } from "./authTypes";

export type CommunicatorLogger = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [level in LogLevel]: (message: any) => void;
};

export interface BaseConfiguration {
  host: string;
  scheme?: "http" | "https";
  port?: number;
  enableLogging?: boolean;
  logger?: CommunicatorLogger;
  integrator: string;
  shoppingCartExtension?: ShoppingCartExtension;
  obfuscationRules?: Record<string, ObfuscationRule>;
  proxy?: ProxyConfiguration;
  connectionOptions?: ConnectionOptions;
}

export interface ConnectionOptions {
  agent?: Agent;
}

export interface FileMetadata {
  contentType: string | null;
  contentLength: string | number | null;
  filename: string | null;
}

export interface Header {
  key: string;
  value: string;
}

export interface HttpEndpoint {
  readonly host: string;
  readonly scheme: "http" | "https";
  readonly port: number;
}

export interface Idempotence {
  key: string;
  requestTimestamp?: string | number;
  responseDateTime?: string;
}

export interface JsonRequest extends SdkRequest {
  body?: object | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Logger = (level: LogLevel, message: any) => void;

export type LogLevel = "info" | "warn" | "error";

export interface MultipartFormDataObject {
  [key: string]: string | UploadableFile | undefined;
}

export interface MultipartFormDataRequest extends SdkRequest {
  body: MultipartFormDataObject;
}

export type ObfuscationRule = (value: string) => string;

export interface ObfuscationRules {
  /**
   * @returns An obfuscation rule that will replace all characters with *.
   */
  all(): ObfuscationRule;
  /**
   * @returns An obfuscation rule that will keep a fixed number of characters at the end, then replaces all other characters with *.
   */
  allButLast(count: number): ObfuscationRule;
  /**
   * @returns An obfuscation rule that will keep a fixed number of characters at the start, then replaces all other characters with *.
   */
  allButFirst(count: number): ObfuscationRule;
  /**
   * @returns An obfuscation rule that will replace values with a fixed length string containing only *.
   */
  withFixedLength(count: number): ObfuscationRule;
}

export interface PaymentContext {
  extraHeaders?: Header[];
  idempotence?: Idempotence;
}

export interface ProxyConfiguration {
  host: string;
  scheme?: "http" | "https";
  port?: number;
  credentials?: string;
}

export interface SdkContext {
  getEndpoint(): HttpEndpoint;
  getProxy(): ProxyConfiguration | undefined;
  getConnectionOptions(): ConnectionOptions | undefined;
  getAuthenticator(): Authenticator;
  getLogger(): Logger;
  setLogger(logger: Logger): void;
  isLoggingEnabled(): boolean;
  setEnableLogging(isLoggingEnabled: boolean): void;
  getIntegrator(): string;
  getShoppingCartExtension(): ShoppingCartExtension | undefined;
  getObfuscationRules(): Record<string, ObfuscationRule>;
}

export interface SdkRequest {
  method: string;
  modulePath: string;
  paymentContext?: PaymentContext | null;
  expectBinaryResponse?: boolean;
}

export interface SdkSuccessResponse<T> {
  status: number;
  body: T;
  isSuccess: true;
}

export interface SdkErrorResponse<E> {
  status: number;
  body: E;
  isSuccess: false;
}

export type SdkResponse<T, E> = SdkSuccessResponse<T> | SdkErrorResponse<E>;

export interface SdkBinarySuccessResponse extends SdkSuccessResponse<Readable> {
  file: FileMetadata;
}

export interface SdkBinaryErrorResponse extends SdkSuccessResponse<Readable> {
  file: FileMetadata;
}

export type SdkBinaryResponse<E> = SdkBinarySuccessResponse | SdkErrorResponse<E>;

export class SdkApiError<E> extends Error {
  public constructor(message: string, public readonly status: number, public readonly body: E) {
    super(message);
    // see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, SdkApiError.prototype);
  }
  name = "SdkApiError";
}

export interface SdkResponseError extends Error {
  status?: number;
  body?: string;
}

export interface UploadableFile {
  fileName: string;
  contentType: string;
  content: Readable | Buffer | string;
  contentLength?: number;
}
