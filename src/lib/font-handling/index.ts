export const test_font = async () => {
    const font = await(await fetch(`https://fonts.gstatic.com/s/montserrat/v25/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq0N6aX8.ttf`)).blob()
    const buf  = await font.arrayBuffer()

    return buf
}