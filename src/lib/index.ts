// component to image pipeline
import { nodes_render } from './processing/nodes_render.js'
import { svg_render }   from './processing/svg_render.js'
import { png_render }   from './processing/png_render.js'

export const image_from_component = async (
    component: any,
    options: RenderOptions
): Promise<Buffer> => {

    // the major steps
    const nodes = await nodes_render(component, options.props)
    const svg   = await svg_render(nodes, options)
    const png   = await png_render(svg,   options)

    return png
}

export type RenderOptions = {
    width: number
    height: number
    props?: {
        [key:string]: any
    }
    fonts: FontOptions[]
}
