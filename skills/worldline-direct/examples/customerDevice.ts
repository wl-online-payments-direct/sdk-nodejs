import { Domain } from "onlinepayments-sdk-nodejs";
import { BrowserInfo } from "./types.js";

// [START customer-device]
// 3-D Secure needs details about the customer's browser. Collect the browser values with JavaScript on the checkout
// page and read the rest from the HTTP request (e.g. in Express: req.get("accept"), req.get("user-agent"), req.ip).
export function buildCustomerDevice(acceptHeader: string, userAgent: string, ipAddress: string, browser: BrowserInfo): Domain.CustomerDevice {
  return {
    acceptHeader,
    userAgent,
    ipAddress,
    locale: browser.locale,
    timezoneOffsetUtcMinutes: String(browser.timezoneOffsetUtcMinutes),
    browserData: {
      colorDepth: browser.colorDepth,
      javaEnabled: browser.javaEnabled,
      javaScriptEnabled: true,
      screenHeight: String(browser.screenHeight),
      screenWidth: String(browser.screenWidth)
    }
  };
}
// [END customer-device]
