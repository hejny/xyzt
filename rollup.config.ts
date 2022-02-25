import typescript from '@rollup/plugin-typescript';

export default {
    input: './src/spaceTrim.ts',
    output: [
        {
            file: './dist/umd/xyzt.js',
            name: 'spaceTrim',
            format: 'umd',
            sourcemap: true,
        },
        {
            file: './dist/esm/xyzt.js',
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
};
