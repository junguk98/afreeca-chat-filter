module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: [env === "development" && require.resolve("react-dev-utils/webpackHotDevClient"), paths.appIndexJs].filter(Boolean),
          // 파일이름: 현재 path
          content: "./src/pages/content.ts",
          popupback: "./src/pages/popupback.ts",
        },
        output: {
          ...webpackConfig.output,
          // build 폴더 안에 생성될 path
          filename: "dist/js/[name].js",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
      };
    },
  },
};
