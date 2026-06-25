import { webhooks } from "../../../src";
import { SecretKeyNotAvailableError } from "../../../src/model/webhooks";

/**
 * @group webhooks
 */
describe("inMemorySecretKeyStore", () => {
  beforeEach(() => {
    webhooks.inMemorySecretKeyStore.clear();
  });

  test("shouldReturnSameInstanceAcrossMultipleAccesses", () => {
    const firstStore = webhooks.inMemorySecretKeyStore;
    const secondStore = webhooks.inMemorySecretKeyStore;

    expect(firstStore).toBe(secondStore);
  });

  describe("storeSecretKey", () => {
    test("shouldStoreAndRetrieveSecretKey", async () => {
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-id-1", "secret-value-1");
      const secretKey = await webhooks.inMemorySecretKeyStore.getSecretKey("key-id-1");
      expect(secretKey).toBe("secret-value-1");
    });

    test("shouldThrowErrorWhenStoringSecretKeyWithNullKeyId", () => {
      expect(() => webhooks.inMemorySecretKeyStore.storeSecretKey(null as any, "secret")).toThrow();
    });

    test("shouldThrowErrorWhenStoringSecretKeyWithEmptyKeyId", () => {
      expect(() => webhooks.inMemorySecretKeyStore.storeSecretKey("", "secret")).toThrow();
    });

    test("shouldThrowErrorWhenStoringSecretKeyWithWhitespaceKeyId", () => {
      expect(() => webhooks.inMemorySecretKeyStore.storeSecretKey("   ", "secret")).toThrow();
    });

    test("shouldThrowErrorWhenStoringSecretKeyWithNullSecretKey", () => {
      expect(() => webhooks.inMemorySecretKeyStore.storeSecretKey("key-id", null as any)).toThrow();
    });

    test("shouldThrowErrorWhenStoringSecretKeyWithEmptySecretKey", () => {
      expect(() => webhooks.inMemorySecretKeyStore.storeSecretKey("key-id", "")).toThrow();
    });

    test("shouldThrowErrorWhenStoringSecretKeyWithWhitespaceSecretKey", () => {
      expect(() => webhooks.inMemorySecretKeyStore.storeSecretKey("key-id", "   ")).toThrow();
    });

    test("shouldStoreAndRetrieveMultipleKeys", async () => {
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-id-1", "secret-value-1");
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-id-2", "secret-value-2");
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-id-3", "secret-value-3");

      expect(await webhooks.inMemorySecretKeyStore.getSecretKey("key-id-1")).toBe("secret-value-1");
      expect(await webhooks.inMemorySecretKeyStore.getSecretKey("key-id-2")).toBe("secret-value-2");
      expect(await webhooks.inMemorySecretKeyStore.getSecretKey("key-id-3")).toBe("secret-value-3");
    });

    test("shouldMaintainSeparateKeysIndependently", async () => {
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-a", "secret-a");
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-b", "secret-b");
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-a", "secret-a-updated");

      expect(await webhooks.inMemorySecretKeyStore.getSecretKey("key-a")).toBe("secret-a-updated");
      expect(await webhooks.inMemorySecretKeyStore.getSecretKey("key-b")).toBe("secret-b");
    });

    test("shouldHandleSpecialCharactersInValues", async () => {
      const specialSecret = "hello+world/abc==\nfoo&bar%20baz";
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-special", specialSecret);

      expect(await webhooks.inMemorySecretKeyStore.getSecretKey("key-special")).toBe(specialSecret);
    });

    test("shouldHandleLongSecretValues", async () => {
      const longSecret = "a".repeat(10000);
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-long", longSecret);

      expect(await webhooks.inMemorySecretKeyStore.getSecretKey("key-long")).toBe(longSecret);
    });

    test("shouldUpdateExistingSecretKeyWhenStoringSameKeyId", async () => {
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-id", "secret-1");
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-id", "secret-2");

      const secretKey = await webhooks.inMemorySecretKeyStore.getSecretKey("key-id");
      expect(secretKey).toBe("secret-2");
    });
  });

  describe("getSecretKey", () => {
    test("shouldThrowSecretKeyNotAvailableExceptionWhenGettingNonExistentKey", async () => {
      const error = await webhooks.inMemorySecretKeyStore.getSecretKey("non-existent-key").catch(e => e);

      expect(error).toBeInstanceOf(SecretKeyNotAvailableError);
      expect(error.keyId).toBe("non-existent-key");
    });

    test("shouldThrowExceptionWithCorrectMessage", async () => {
      const error = await webhooks.inMemorySecretKeyStore.getSecretKey("test-key").catch(e => e);

      expect(error).toBeInstanceOf(SecretKeyNotAvailableError);
      expect(error.message).toBe("could not find secret key for key id test-key");
    });
  });

  describe("removeSecretKey", () => {
    test("shouldRemoveExistingSecretKey", async () => {
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-to-remove", "secret");
      webhooks.inMemorySecretKeyStore.removeSecretKey("key-to-remove");

      const error = await webhooks.inMemorySecretKeyStore.getSecretKey("key-to-remove").catch(e => e);
      expect(error).toBeInstanceOf(SecretKeyNotAvailableError);
    });

    test("shouldNotThrowWhenRemovingNonExistentSecretKey", () => {
      expect(() => webhooks.inMemorySecretKeyStore.removeSecretKey("non-existent-key")).not.toThrow();
    });

    test("shouldNotAffectOtherKeysWhenRemovingOneKey", async () => {
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-1", "secret-1");
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-2", "secret-2");
      webhooks.inMemorySecretKeyStore.removeSecretKey("key-1");

      const secretKey = await webhooks.inMemorySecretKeyStore.getSecretKey("key-2");
      expect(secretKey).toBe("secret-2");
    });
  });

  describe("clear", () => {
    test("shouldClearAllSecretKeys", async () => {
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-1", "secret-1");
      webhooks.inMemorySecretKeyStore.storeSecretKey("key-2", "secret-2");
      webhooks.inMemorySecretKeyStore.clear();

      const firstError = await webhooks.inMemorySecretKeyStore.getSecretKey("key-1").catch(e => e);
      const secondError = await webhooks.inMemorySecretKeyStore.getSecretKey("key-2").catch(e => e);

      expect(firstError).toBeInstanceOf(SecretKeyNotAvailableError);
      expect(secondError).toBeInstanceOf(SecretKeyNotAvailableError);
    });

    test("shouldAllowStoringNewKeysAfterClear", async () => {
      webhooks.inMemorySecretKeyStore.storeSecretKey("old-key", "old-secret");
      webhooks.inMemorySecretKeyStore.clear();
      webhooks.inMemorySecretKeyStore.storeSecretKey("new-key", "new-secret");

      const secretKey = await webhooks.inMemorySecretKeyStore.getSecretKey("new-key");
      expect(secretKey).toBe("new-secret");
    });
  });
});
