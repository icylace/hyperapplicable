// https://rollupjs.org/guide/en/#configuration-files

export default (_ctx) => ({
  external: ["hyperapp"],
  input: "./output/typescript/index.js",
  output: [
    {
      file: "./dist/index.esm.js",
      format: "esm",
    },
  ],
})
