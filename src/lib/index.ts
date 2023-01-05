// component to image pipeline
import { html_render } from './processing/html_render.js'
import { svg_render } from  './processing/svg_render.js'
import { png_render } from  './processing/png_render.js'

import type { SvelteComponent } from 'svelte'

export const image_from_component = async (
    component: SvelteComponent,
    options: Options
): Promise<Buffer> => {

    // the major steps
    const nodes = await html_render(component)
    const svg   = await svg_render(nodes, options)
    const png   = await png_render(svg, options)

    return png
}