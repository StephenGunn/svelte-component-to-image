// Take a svelte component, render it down to html, inline the styles
// then return a set of satori ready nodes
import pkg from 'juice';
const { juiceResources } = pkg;
import { html as to_satori_nodes } from 'satori-html';
import { render } from 'svelte/server';

export const nodes_render = async (
  Component: any,
  props?: {
    [key: string]: any;
  }
) => {
  // render the body and the head
  const { head, body } = render(Component, { props });

  console.log('TESTING');
  console.log('head', head);
  console.log('body', body);
  console.log('props', props);

  const inline_html: string = await new Promise((resolve, reject) => {
    juiceResources(head ? head + body : body, {}, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });

  // render satori friendly HTML and return it
  const satori_nodes = to_satori_nodes(inline_html);

  return satori_nodes;
};
