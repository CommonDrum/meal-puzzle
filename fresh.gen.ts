// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $_middleware from "./routes/_middleware.tsx";
import * as $api_auth_google from "./routes/api/auth/google.ts";
import * as $api_auth_signin from "./routes/api/auth/signin.ts";
import * as $api_auth_signup from "./routes/api/auth/signup.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $signin from "./routes/signin.tsx";
import * as $signup from "./routes/signup.tsx";
import * as $CardIsland from "./islands/CardIsland.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/_middleware.tsx": $_middleware,
    "./routes/api/auth/google.ts": $api_auth_google,
    "./routes/api/auth/signin.ts": $api_auth_signin,
    "./routes/api/auth/signup.ts": $api_auth_signup,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/signin.tsx": $signin,
    "./routes/signup.tsx": $signup,
  },
  islands: {
    "./islands/CardIsland.tsx": $CardIsland,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
