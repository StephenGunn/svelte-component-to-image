// Take satori friendly HTML and render it to an SVG
import satori from 'satori'

import { test_font, get_local_font } from '../font-handling/index.js'

type SatoriOptions = {
    width:  number
    height: number
    fonts:  string[]
}

export const svg_render = async (
    nodes: VNode,
    options: SatoriOptions
) => {

    const font = await get_local_font(`http://127.0.0.1:5173/TYPEWR__.TTF`)

    console.log(font)

    // NEED TO FIGURE OUT FONTS
    const svg = await satori(nodes, {
        width:  options.width,
        height: options.height,
        fonts: [
            {
                name: 'Open Sans',
                data: font,
                weight: 400,
                style: 'normal',
            }
        ]
    })

    return svg
}