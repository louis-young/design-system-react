import commonJs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import postCss from "rollup-plugin-postcss";
import { visualizer } from "rollup-plugin-visualizer";

import packageJson from "./package.json" assert { type: "json" };

/**
 * The `external` option doesn't appear to work as advertised with a list of module names.
 * This function returns a predicate function that can be used instead.
 */

const excludePeerDependencies = () => {
  const peerDependencies = Object.keys(packageJson.peerDependencies);

  const peerDependencyRegularExpressions = peerDependencies.map(
    (peerDependency) => new RegExp(`^${peerDependency}(\\/.+)*$`),
  );

  return (module: string) => {
    return peerDependencyRegularExpressions.some(
      (peerDependencyRegularExpression) =>
        peerDependencyRegularExpression.test(module),
    );
  };
};

export default defineConfig([
  {
    external: excludePeerDependencies(),
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
    },
    plugins: [
      postCss({ extract: "index.css", minimize: true }), // Process, minify and bundle CSS.
      nodeResolve(), // Resolve and bundle external dependencies.
      commonJs(), // Convert CommonJS modules to ECMAScript modules.
      typescript(), // Compile TypeScript into JavaScript.
      terser(), // Minify the bundle.
      visualizer({
        filename: "analysis/bundle.html",
        gzipSize: true,
        template: "treemap",
      }),
    ],
  },
  {
    external: [/\.css$/], // Exclude CSS type declarations.
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()], // Bundle TypeScript declarations into a single declaration file.
  },
]);
