// Import rollup plugins
import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.html',
  plugins: [
    html(),
    resolve({mainFields: [ "module", "main" ]}),
    commonjs({transformMixedEsModules: true}),
    minifyHTML(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    summary(),
    copy({
      patterns: ['assets/**/*'],
    })
  ],

  output: {
    dir: 'dist',
  },

  preserveEntrySignatures: 'strict',
};
