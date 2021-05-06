#!/usr/bin/env node

import { createCli } from "./cli";

createCli()(process.argv).catch((error) => {
  throw error;
});
