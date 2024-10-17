const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/fliphtml5", // Chemin proxy local
    createProxyMiddleware({
      target: "https://online.fliphtml5.com", // URL FlipHTML5
      changeOrigin: true, // Change l'origine pour correspondre au domaine cible
      pathRewrite: {
        "^/fliphtml5": "/", // Enlève '/fliphtml5' du chemin
      },
    })
  );
};
