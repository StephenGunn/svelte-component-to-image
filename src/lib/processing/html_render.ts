// Take a svelte component, render it down to html, inline the styles
// then return a set of satori ready nodes 
import { juiceResources, type Options as JuiceOptions } from 'juice'
import { html as to_satori_nodes } from 'satori-html'
import type { SvelteComponent }   from 'svelte'

export const html_render = async (
    Component: SvelteComponent,
    { data = {}, ...options }: { data?: {} } & JuiceOptions = {}) => {

    // convert the component into strings
    const { html: rawHtml, css, head } = Component.render(data)
    
    // display an error if <svelte:head> is included in component
    if (head) {
        console.error(`<svelte:head> not supported while rendering image from component`)
    }

    // render our styles as inline styles through Juice
    const inline_html: string = await new Promise((resolve, reject) => {
        juiceResources(
            `${css.code ? `<style>${css.code}</style>` : ''}${rawHtml}`,
            options,
            (err, result) => (err ? reject(err) : resolve(result))
        )
    })

    // render satori friendly HTML and return it
    const satori_nodes = to_satori_nodes(inline_html)

    console.log(typeof(satori_nodes))
    console.log(satori_nodes)
    return satori_nodes
}