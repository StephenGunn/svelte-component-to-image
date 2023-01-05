import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

// import my test stuff
import HelloWorld from '$lib/components/HelloWorld.svelte'
import { image_from_component } from '$lib/index.js'
 
export const GET = (async () => {
    try {
        const image = await image_from_component(HelloWorld, {})
        const response = new Response(image)
        response.headers.append('content-type', 'image/png')
        return response
    } catch (e) {
        console.error(e)
        throw error(500, 'Error')
    }
}) satisfies RequestHandler