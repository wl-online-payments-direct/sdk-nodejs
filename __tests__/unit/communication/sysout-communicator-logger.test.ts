import { CommunicatorLogger } from "../../../src";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

function capturingLogger(): { logger: CommunicatorLogger; captured: { level: string; message: unknown }[] } {
  const captured: { level: string; message: unknown }[] = [];
  const logger: CommunicatorLogger = {
    info: message => captured.push({ level: "info", message }),
    warn: message => captured.push({ level: "warn", message }),
    error: message => captured.push({ level: "error", message })
  };

  return { logger, captured };
}

/**
 * @group communication
 */
describe("CommunicatorLogger", () => {
  test("shouldCorrectlyLogUnicodeMessage", () => {
    const { logger, captured } = capturingLogger();
    const context = newSdkContext({ ...dummySdkConfig(), logger });
    const unicodeMessage = "Unicode: 日本語 テスト 🎉";

    context.getLogger()("info", unicodeMessage);

    expect(captured).toHaveLength(1);
    expect(captured[0].message).toBe(unicodeMessage);
  });

  test("shouldWriteMessageToSystemOutWhenLoggingMessageOnly", () => {
    const { logger, captured } = capturingLogger();
    const context = newSdkContext({ ...dummySdkConfig(), logger });
    const message = "test log message";

    context.getLogger()("info", message);

    expect(captured).toHaveLength(1);
    expect(captured[0].message).toBe(message);
  });

  test("shouldWriteMessageAndStackTraceToSystemOutWhenLoggingMessageWithException", () => {
    const { logger, captured } = capturingLogger();
    const context = newSdkContext({ ...dummySdkConfig(), logger });
    const error = new Error("something went wrong");

    context.getLogger()("error", error);

    expect(captured).toHaveLength(1);
    expect(captured[0].message).toBe(error);
  });

  test("shouldWriteMessageAndStackTraceIncludingCauseToSystemOutWhenLoggingExceptionWithCause", () => {
    const { logger, captured } = capturingLogger();
    const context = newSdkContext({ ...dummySdkConfig(), logger });
    const cause = new Error("Root cause");
    const error = Object.assign(new Error("Top level"), { cause });

    context.getLogger()("error", error);

    expect(captured).toHaveLength(1);
    const logged = captured[0].message as Error & { cause?: Error };
    expect(logged).toBe(error);
    expect(logged.cause).toBe(cause);
    expect(logged.cause?.message).toBe("Root cause");
  });

  test("shouldWriteEmptyMessageToSystemOutWhenMessageIsEmpty", () => {
    const { logger, captured } = capturingLogger();
    const context = newSdkContext({ ...dummySdkConfig(), logger });

    context.getLogger()("info", "");

    expect(captured).toHaveLength(1);
    expect(captured[0].message).toBe("");
  });
});
