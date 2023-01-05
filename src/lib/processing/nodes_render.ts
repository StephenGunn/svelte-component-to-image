// Take a svelte component, render it down to html, inline the styles
// then return a set of satori ready nodes 
import { juiceResources, type Options as JuiceOptions } from 'juice'
import { html as to_satori_nodes } from 'satori-html'

export const nodes_render = async (
    Component: any,
    props?: {
        [key: string]: any
    },
) => {

    // convert the component into strings
    const { html: rawHtml, css, head } = Component.render(props)
    
    // display an error if <svelte:head> is included in component
    if (head) {
        console.error(`<svelte:head> not supported while rendering image from component`)
    }

    // render our styles as inline styles through Juice
    // thank you svelte mailer for this piece of code
    const inline_html: string = await new Promise((resolve, reject) => {
        juiceResources(
            `${css.code ? `<style>${css.code}</style>` : ''}${rawHtml}`, {},
            (err, result) => (err ? reject(err) : resolve(result))
        )
    })

    // render satori friendly HTML and return it
    const satori_nodes = to_satori_nodes(inline_html)

    return satori_nodes
}