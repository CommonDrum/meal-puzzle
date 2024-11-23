// routes/dashboard.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    // Check if user exists in state (set by middleware)
    if (!ctx.state.user) {
      return new Response("", {
        status: 302,
        headers: { Location: "/login" },
      });
    }

    return ctx.render(ctx.state.user);
  },
};