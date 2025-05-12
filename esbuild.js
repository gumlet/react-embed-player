// esbuild.js
import * as esbuild from 'esbuild'

const sharedConfig = {
  entryPoints: ['src/index.js'],
  external: ['react', 'react-dom'],
  bundle: true,
  sourcemap: true,
  target: ['esnext'],
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
}

await Promise.all([
  // CommonJS build
  esbuild.build({
    ...sharedConfig,
    outfile: 'dist/index.cjs', // CJS build
    format: 'cjs',
  }),

  // ESM build
  esbuild.build({
    ...sharedConfig,
    outfile: 'dist/index.mjs', // ESM build
    format: 'esm',
  }),
])
