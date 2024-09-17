import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  external: ['react', 'react-dom'],
  sourcemap: true,
  target: ['esnext'],
  jsx: 'automatic', // Enable JSX for React 17+
  loader: { '.js': 'jsx' }
})