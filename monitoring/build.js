const { GasPlugin } = require("esbuild-gas-plugin");

require("esbuild")
  .build({
    entryPoints: ["src/main.ts"],
    bundle: true,
    outfile: "dist/main.js",
    plugins: [GasPlugin],
  })
  .catch(() => process.exit(1));
