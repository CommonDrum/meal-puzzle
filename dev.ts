#!/usr/bin/env -S deno run -A --watch=static/,routes/

import config from "./fresh.config.ts";
import { load } from "$std/dotenv/mod.ts";
import dev from "$fresh/dev.ts";

await dev(import.meta.url, "./main.ts", config);
await load({ export: true }); // Load .env file
import "$std/dotenv/load.ts";