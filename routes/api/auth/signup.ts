// routes/api/auth/signup.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const name = form.get("name")?.toString();

    if (!email || !password || !name) {
      return new Response("All fields required", { status: 400 });
    }

    const supabase = ctx.state.supabase;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(null, {
      status: 303,
      headers: {
        Location: "/login",
      },
    });
  },
};
