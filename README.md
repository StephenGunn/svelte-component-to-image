# svelte-component-to-image

A package for easily rendering .png images from svelte components in SvelteKit. Inspired by Vercel's
[`OG Image Generation`](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) tool.

Good for rendering dynamic Open Graph images quickly and effeciently without having to use canvas.

- [Demo + Blog post about how to generate OG images](https://jovianmoon.io/posts/generating-open-graph-images-with-sveltekit-components)
- [Minimal Deployment Demo on Vercel](https://github.com/StephenGunn/skcti) - A quick reference if you need it.

## Features

- Renders a normal svelte component as a png
- Component props are supported for dynamic image generation
- Use basic CSS like flexbox and absolute positioning ([See valid CSS](https://github.com/vercel/satori#css))
- Lightweight and fast (doesn't use canvas or puppeteer)
- Load custom fonts: tff, otf, woff accepted (woff2 not accepted currently)

## Svelte 5 Usage

You will need to add `<svelte:options css="injected" />` to every component you want to render as an image. You will see an error if you don't and the component will not render.

## Svelte 4 Usage

The Svelte 4 version is available as the 0.1.0 release.

## Installation

```bash
pnpm add -D svelte-component-to-image
```

### Vite Plugin

Every package that uses `svelte` as a peer dependency is automatically added to the `noExternal` of `vite` but since vite can't handle the native bindings of `@resvg/resvg-js` you need to add this library to `ssr.external`...to provide you with a better DX this library ships with a vite plugin so you only need to do this

```diff
import { sveltekit } from '@sveltejs/kit/vite';
+import { svelte_component_to_image } from 'svelte-component-to-image/vite';
import { defineConfig } from 'vite';

export default defineConfig({
-	plugins: [sveltekit()]
+	plugins: [sveltekit(), svelte_component_to_image()]
});
```

### Tested On

- Vercel (working - requires serverless configuration)
- Netlify (working - requires serverless configuration)
- Node.js servers (working - no additional configuration needed)
- Cloudflare Pages (not working - does not support native modules)

## Usage

This package is NOT for rendering normal svelte components as images, you will need to write your components with image rendering in mind. The guidelines are set by ([Satori's CSS Guidelines](https://github.com/vercel/satori#css)) - you will need to write your markup and css with these factors in mind.

### Create A Component

Create a `.svelte` component with JS/HTML/CSS. You can pass props or use additional technologies
that require preproccesors like TypeScript or SASS.

#### HelloWorld.svelte

```svelte
<svelte:options css="injected" />

<script lang="ts">
	let { text = 'hello' }: { text: string } = $props();
</script>

<div id="container">
	<h1>
		{text} world!
	</h1>
</div>

<style>
	* {
		display: flex; /* if you're having problems with satori errors, this line can really help */
	}
	#container {
		width: 1200px;
		height: 600px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		background: rgb(63, 94, 251);
		background: radial-gradient(circle, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);
	}
	h1 {
		color: red;
		font-size: 75px;
	}
</style>
```

### +server.ts Endpoint

Create a +server.ts endpoint to render and serve the image. Import the package and options type.

More on how the font importing works below.

#### image/+server.ts

```TS
import { error } from '@sveltejs/kit'
import { dev } from '$app/environment';
import type { RequestHandler } from './$types'

// Svelte Component To Image
import { image_from_component, type RenderOptions } from 'svelte-component-to-image'

// Normal .svelte component
import HelloWorld from './HelloWorld.svelte'

export const GET: RequestHandler = (async ({url}) => {
    try {
        const options: RenderOptions = {
            width: 1200,
            height: 600,
            props: {
                text: url.searchParams.get('text') ?? 'text not found'
            },
            fonts: [
                {
                    name: 'Typewriter',
                    url: `${url.origin}/TYPEWR__.TTF`,
                    weight: 400,
                    style: 'normal'
                }
            ],
            debug: false // you can omit this or set it to true to see logs of data, it can help for debug edge cases
        }

        // pass the component and options to the package
        const image    = await image_from_component(HelloWorld, options)
        const response = new Response(image)
        if(!dev){
            // caching on dev will make it hard to see iterations
            response.headers.append('Content-Type', 'image/png')
            response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800')
        }
        return response
    } catch (e) {
        console.error(e)
        throw error(500, 'Error trying to generate image from component.')
    }
}) satisfies RequestHandler
```

### Font Importing

You can import as many ttf, otf, and woff fonts as you want to use inside of your component.
Although, importing 100 fonts is going to affect server load and speed.

**woff2 files are not currently supported.**

Fonts files can be local or remote. They need a full URL to be properly loaded. Local fonts
stored in `/static` can be loaded using `${url.origin}/` as long as `{url}` is made available
in the endpoint.

Once the font is loaded, you can reference them in the CSS using `font-family`. If only one font is loaded,
it will be the default.

### Not All Fonts Work!

Not all fonts work! If a font fails to load it will break the image rendering. I am not sure what causes this or which fonts are "approved" - but I have had luck using [Font Squirrel's Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator) to convert fonts to web-safe formats and using those.

### 1 font file per style / weight

If you're trying to use a variable weight font like Jost, you will need to use Font Squirrel to generate a separate file per weight and style. It's a pain, I know.

### Images

Images can be used and rendered like normal. You will want to set the height and width.

```HTML
<img src="https://picsum.photos/200/300" width="200" height="300" />
```

### More info

This uses Vercel's Satori. You can find out more about what is and isn't supported by reading it's docs:
[Vercel's Satori](https://github.com/vercel/satori)

## License

MIT
