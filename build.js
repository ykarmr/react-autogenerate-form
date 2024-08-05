// build.js
const { build } = require("esbuild");
const { dependencies } = require("./package.json");

const shared = {
  bundle: true,
  entryPoints: ["./src/index.ts"],
  external: Object.keys(dependencies),
  logLevel: "info",
  minify: true,
  sourcemap: false,
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
};

(() => {
  try {
    build({
      ...shared,
      format: "esm",
      outfile: "./dist/index.esm.js",
      target: ["ES2020"],
    });

    build({
      ...shared,
      format: "cjs",
      outfile: "./dist/index.cjs.js",
      target: ["ES2020"],
    });
  } catch (e) {
    console.error("ビルドに失敗しました");
  }
})();
