export {};

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

// Custom attributes used by ported Premium pages — read at runtime by
// premium/setup.ts to recreate the design export's hover/focus states.
declare module 'react' {
  interface HTMLAttributes<T> {
    'style-hover'?: string;
    'style-focus'?: string;
  }
}
