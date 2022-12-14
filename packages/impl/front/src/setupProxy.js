const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/model-server", {
      target: process.env.MODEL_URL || "http://localhost:1111",
      pathRewrite: {
        "^/model-server": "/",
      },
    })
  );

  app.use(
    createProxyMiddleware("/app-server", {
      target: process.env.APP_SERVER_URL || "http://localhost:4000",
      pathRewrite: {
        "^/app-server": "/",
      },
      ws:true
    })
  );

  app.get("/runtimeEnv", (req, res) => {
    res.status(200).json(process.env);
  });
};
