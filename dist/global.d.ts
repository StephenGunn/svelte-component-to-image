// Global type declarations for svelte-component-to-image

declare global {
  // Define the VNode interface globally
  interface VNode {
    type: string;
    props: {
      style?: Record<string, any>;
      children?: string | VNode | VNode[];
      [prop: string]: any;
    };
  }

  interface ResvgOptions {
    width: number;
    height?: number;
  }

  interface FontOptions {
    name: string;
    url?: string;
    weight?: number;
    style?: string;
    data?: Buffer | ArrayBuffer;
  }
}

// Export an empty object to make this a module
export { };
