import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'


export const GET = (async () => {

    try {
        const raw = await(await fetch(`https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap`)).blob()

        console.log(await raw.text())

        return new Response(raw)
    } catch (e) {
        console.error(e)
        throw error(500, 'Error')
    }
}) satisfies RequestHandler;