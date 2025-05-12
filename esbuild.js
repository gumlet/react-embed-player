// esbuild.js
import * as esbuild from 'esbuild'

const sharedConfig = {
  entryPoints: ['src/index.js'],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  bundle: true,
  sourcemap: true,
  target: ['esnext'],
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
}

await Promise.all([
  esbuild.build({
    ...sharedConfig,
    outfile: 'dist/index.cjs',
    format: 'cjs',
  }),
  esbuild.build({
    ...sharedConfig,
    outfile: 'dist/index.mjs',
    format: 'esm',
  }),
])
