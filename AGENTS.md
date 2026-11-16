# AGENTS.md

## Using this SDK in your project

If you are writing code that integrates Worldline Direct with this SDK, read the agent skill
for this SDK version first and use the code it shows. Do not write SDK calls from memory.

- In this package: `skills/worldline-direct/SKILL.md`
  (package folder: `node_modules/onlinepayments-sdk-nodejs/`)
- Online: https://raw.githubusercontent.com/wl-online-payments-direct/sdk-nodejs/11.1.0/skills/worldline-direct/SKILL.md

The skill matches SDK version 11.1.0. If your installed version is different, use the skill
from your installed package.

## Working on this SDK

- SDK source: `src/`; JSON schemas used to validate requests: `schemas/`; unit and integration tests: `__tests__/`.
- Install the dependencies and compile with `npm install` and `npm run build`.
- Run the unit tests with `npm run test:unit`, the integration tests with `npm run test:integration`,
  and both with `npm run test`.
- The integration tests need `__tests__/config.json`: copy `__tests__/config.json.dist` and replace the values.
- See `README.md` for details.
