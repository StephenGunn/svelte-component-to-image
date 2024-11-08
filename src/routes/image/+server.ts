import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// import my test stuff
import { image_from_component, type RenderOptions } from "$lib/index.js";

import HelloWorld from "./HelloWorld.svelte";

export const GET: RequestHandler = (async ({ url }) => {
  try {
    const options: RenderOptions = {
      width: 1200,
      height: 600,
      props: {
        text: url.searchParams.get("text") ?? "text not found",
        second: url.searchParams.get("second") ?? "text not found",
      },
      fonts: [
        {
          name: "Typewriter",
          url: `${url.origin}/TYPEWR__.TTF`,
          weight: 400,
          style: "normal",
        },
      ],
    };
    const image = await image_from_component(HelloWorld, options);
    const response = new Response(image);
    response.headers.append("content-type", "image/png");
    return response;
  } catch (e) {
    console.error(e);
    error(500, "Error");
  }
}) satisfies RequestHandler;
