# svelte-component-to-image

A package for easily rendering .png images from svelte components. Inspired by Vercel's
[`OG Image Generation`](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) tool.

Good for rendering dynamic Open Graph images quickly and effeciently without having to use canvas.

[Demo](https://svelte-component-to-image.vercel.app/)

## Features

- Renders a normal svelte component as a png
- Component props are supported for dynamic image generation
- Use basic CSS like flexbox and absolute positioning ([See valid CSS](https://github.com/vercel/satori#css))
- Lightweight and fast (doesn't use canvas or puppeteer)
- Load custom fonts: tff, otf, woff accepted (woff2 not accepted currently)

## Alpha

This package is very much in it's alpha stages. While it works, use in production at your own risk.

## Installation

```
npm install svelte-component-to-image
```

### Tested On

- Vercel (working)
- Netlify (working)
- Cloudflare Pages (not working)

## Usage

### Create A Component

Create a `.svelte` component with JS/HTML/CSS. You can pass props or use additional technologies
that require preproccesors like TypeScript or SASS.

#### HelloWorld.svelte
```svelte
<script lang="ts">
    export let text: string = "hello"
</script>

<div id="container">
    <h1>
        {text} world!
    </h1>
</div>


<style>
    #container {
        width: 1200px;
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background: rgb(63,94,251);
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
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
            ]
        }

        // pass the component and options to the package
        const image    = await image_from_component(HelloWorld, options)
        const response = new Response(image)
        response.headers.append('content-type', 'image/png')
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

