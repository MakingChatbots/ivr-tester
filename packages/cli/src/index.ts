#!/usr/bin/env node

import { createCli } from "./cli";

createCli()(process.argv)
  .then(() => process.exit(0))
  .catch((error) => {
    if (error) {
      console.error(error);
    }
    process.exit(1);
  });
