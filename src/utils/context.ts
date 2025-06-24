import { Authenticator, CommunicatorLogger, Configuration, ConnectionOptions, HttpEndpoint, Logger, ObfuscationRule, ProxyConfiguration, SdkContext } from "../model/index.js";
import { ShoppingCartExtension } from "../model/domain/index.js";
import { V1HmacAuthenticator } from "./authentication.js";

const consoleLogger: Logger = (level, message) => console[level](message);

function toLogger(logger: CommunicatorLogger): Logger {
  return (level, message): void => logger[level](message);
}

function defaultPort(scheme: "http" | "https"): number {
  return scheme === "https" ? 443 : 80;
}

class SdkContextImpl implements SdkContext {
  private readonly endpoint: HttpEndpoint;
  private readonly proxy?: ProxyConfiguration;
  private readonly connectionOptions?: ConnectionOptions;
  private readonly authenticator: Authenticator;
  private readonly integrator: string;
  private readonly shoppingCartExtension?: ShoppingCartExtension;
  private readonly obfuscationRules: Record<string, ObfuscationRule>;
  private logger: Logger;
  private enableLogging: boolean;

  constructor(configuration: Configuration) {
    this.endpoint = {
      host: configuration.host,
      scheme: configuration.scheme ?? "https",
      port: configuration.port ?? defaultPort(configuration.scheme ?? "https")
    };
    this.proxy = configuration.proxy;
    this.connectionOptions = configuration.connectionOptions;
    this.authenticator = new V1HmacAuthenticator(configuration);

    this.logger = configuration.logger ? toLogger(configuration.logger) : consoleLogger;
    this.enableLogging = configuration.enableLogging ?? false;

    if (configuration.integrator) {
      this.integrator = configuration.integrator;
    } else {
      throw new Error("integrator is required");
    }
    if (configuration.shoppingCartExtension) {
      if (configuration.shoppingCartExtension.creator && configuration.shoppingCartExtension.name && configuration.shoppingCartExtension.version) {
        this.shoppingCartExtension = configuration.shoppingCartExtension;
      } else {
        throw new Error(
          "shoppingCartExtension is missing a required property (creator / name / version). Your shoppingCartExtension: " + JSON.stringify(configuration.shoppingCartExtension)
        );
      }
    }
    this.obfuscationRules = configuration.obfuscationRules ?? {};
  }

  getEndpoint(): HttpEndpoint {
    return this.endpoint;
  }

  getProxy(): ProxyConfiguration | undefined {
    return this.proxy;
  }

  getConnectionOptions(): ConnectionOptions | undefined {
    return this.connectionOptions;
  }

  getAuthenticator(): Authenticator {
    return this.authenticator;
  }

  getLogger(): Logger {
    return this.logger;
  }

  setLogger(logger: Logger): void {
    this.logger = logger;
  }

  isLoggingEnabled(): boolean {
    return this.enableLogging || false;
  }

  setEnableLogging(isLoggingEnabled: boolean): void {
    this.enableLogging = isLoggingEnabled;
  }

  getIntegrator(): string {
    return this.integrator;
  }

  getShoppingCartExtension(): ShoppingCartExtension | undefined {
    return this.shoppingCartExtension;
  }

  getObfuscationRules(): Record<string, ObfuscationRule> {
    return this.obfuscationRules;
  }
}

export function newSdkContext(configuration: Configuration): SdkContext {
  return new SdkContextImpl(configuration);
}
