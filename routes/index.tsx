// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import CardIsland from "../islands/CardIsland.tsx";
import NavbarIsland from "../islands/NavbarIsland.tsx";

export default function Home(props: PageProps) {
  const user = props.state?.user;

  return (
    <>
      <NavbarIsland user={user} />
      <main class="p-4 mx-auto max-w-screen-md">
        <Head>
          <title>Fresh Card System</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-md">
          <CardIsland />
        </div>
      </main>
    </>
  );
}