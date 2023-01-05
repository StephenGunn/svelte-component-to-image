import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

// import my test stuff
import { image_from_component, type RenderOptions } from '$lib/index.js'
import HelloWorld from '$lib/components/HelloWorld.svelte'
 
export const GET: RequestHandler = (async ({url}) => {
    console.log(url)
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
        const image    = await image_from_component(HelloWorld, options)
        const response = new Response(image)
        response.headers.append('content-type', 'image/png')
        return response
    } catch (e) {
        console.error(e)
        throw error(500, 'Error')
    }
}) satisfies RequestHandler