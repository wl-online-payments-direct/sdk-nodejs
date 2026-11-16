# Online Payments Node.js SDK

## Introduction

The Node.js SDK helps you to communicate with the payment platform server API. Its primary features are:

* convenient JavaScript wrapper around the API calls,
* authentication of all calls
* logging support by proxying log calls to a custom user defined logger instance
* validation of input and
* a logfile obfuscater

See the [Online Payments Developer Hub](https://docs.direct.worldline-solutions.com/documentation/sdk/server/nodejs/)
for more information on how to use the API.

## Structure of this repository

This repository consists out of three main components:

1. The source code of the SDK itself: `/src`
2. The JSON schemas used to validate requests: `/schemas`
3. Unit and integration tests: `/__tests__`

## Requirements

Node.js 18 or higher is required.

## Installation

From the folder where your `package.json` is located, run the following command to install the SDK:

    npm i onlinepayments-sdk-nodejs

## Working with AI agents

The SDK comes with an agent skill for AI coding agents such as Claude Code, Codex, GitHub Copilot and Cursor. It tells the agent how to choose an integration method, which steps each flow needs, which rules every integration must follow, and gives code examples that are type-checked against this SDK version.

The skill for this version is available:

* online, as plain Markdown for agents: https://raw.githubusercontent.com/wl-online-payments-direct/sdk-nodejs/11.1.0/skills/worldline-direct/SKILL.md
* online, on GitHub: https://github.com/wl-online-payments-direct/sdk-nodejs/blob/11.1.0/skills/worldline-direct/SKILL.md
* in the npm package: `node_modules/onlinepayments-sdk-nodejs/skills/worldline-direct/`
* in this repository: `skills/worldline-direct/`

To make your agent use it, add this to the `AGENTS.md` or `CLAUDE.md` file of your project:

```
For the Worldline Direct integration (onlinepayments-sdk-nodejs), read and follow the agent skill
node_modules/onlinepayments-sdk-nodejs/skills/worldline-direct/SKILL.md
(online: https://raw.githubusercontent.com/wl-online-payments-direct/sdk-nodejs/11.1.0/skills/worldline-direct/SKILL.md)
Use the code shown in the skill; do not write SDK calls from memory.
```

Agents that support the Agent Skills format can also load the folder directly, for example by copying `node_modules/onlinepayments-sdk-nodejs/skills/worldline-direct/` to `.claude/skills/worldline-direct/` in your project for Claude Code.

## Building the repository

From the root of the project install all dependencies, then compile the code:

    npm install
    npm run build

## Testing

There are two types of tests:

1. Unit tests. These will work out-of-the-box.  
   Run these tests as follows:

    ```
    npm run test:unit
    ```
2. Integration tests. Before you can run these, you first need to copy file `__tests__/config.json.dist` to
   `__tests__/config.json` and replace all values as needed. If needed, a `proxy` property can be added with nested
   properties `host`, `scheme` (defaults to `http`), `port` (defaults to 3128) and `credentials` (optional, in the
   format `<username>:<password>`).  
   Run these tests as follows:

    ```
    npm run test:integration
    ```

You can also run both types of tests together as follows:

    npm run test
