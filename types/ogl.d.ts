// File: src/types/ogl.d.ts

declare module 'ogl' {
    // Anda bisa membuat deklarasi ini sesederhana atau sekompleks yang dibutuhkan.
    // Untuk saat ini, kita akan mendeklarasikan kelas yang digunakan dengan tipe `any`
    // agar error hilang dan kode bisa berjalan.

    export type GL = WebGLRenderingContext | WebGL2RenderingContext;

    export class Renderer {
        gl: GL;
        constructor(options?: any);
        setSize(width: number, height: number): void;
        render({ scene, camera }: { scene: Mesh; camera?: any }): void;
    }

    export class Program {
        uniforms: { [key: string]: { value: any } };
        constructor(gl: GL, options: {
            vertex: string;
            fragment: string;
            uniforms?: any;
        });
    }

    export class Mesh {
        constructor(gl: GL, { geometry, program }: { geometry: Triangle; program: Program });
    }

    export class Triangle {
        constructor(gl: GL);
    }

    export class Vec2 {
        constructor(x?: number, y?: number);
        set(x: number, y: number): this;
    }
}