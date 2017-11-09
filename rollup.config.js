import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';


export default {
	entry: 'src/index.bs.js',
  dest: 'build/bundle.js',
  moduleName: 'gameOfLife',
	format: 'iife', // immediately-invoked function expression — suitable for <script> tags
	plugins: [
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs() // converts date-fns to ES modules
	]
};