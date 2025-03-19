// Type definitions for the package
// Import the global declarations
import './global.d.ts';

// Re-export the RenderOptions interface for convenience
export interface RenderOptions {
  width: number;
  height: number;
  props?: {
    [key: string]: any;
  };
  fonts: FontOptions[];
  debug?: boolean;
}

// Re-export FontOptions for convenience
export interface FontOptions {
  name: string;
  url?: string;
  weight?: number;
  style?: string;
  data?: Buffer | ArrayBuffer;
}
