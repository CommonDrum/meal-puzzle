// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import CardIsland from "../islands/CardIsland.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh Card System</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <CardIsland />
      </div>
    </>
  );
}