// get local font and render as an array buffer
export const get_font_as_buffer = async (location: string) => {
    // check to make sure that we have a full URL
    const is_url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    if(!is_url.test(location)) console.error(`Font locations need to be specified with a full URL to work`)

    // the renderer
    const  font = await(await fetch(location)).blob()
    const  buf  = await font.arrayBuffer()
    return buf
}