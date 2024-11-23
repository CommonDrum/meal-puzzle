// routes/api/auth/login.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    if (!email || !password) {
      return new Response("Email and password required", { status: 400 });
    }

    const supabase = ctx.state.supabase;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new Response(error.message, { status: 400 });
    }

    // Redirect to dashboard on success
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/dashboard",
      },
    });
  },
};

