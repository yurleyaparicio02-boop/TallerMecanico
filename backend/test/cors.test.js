const test = require("node:test");
const assert = require("node:assert/strict");

const frontendOrigin = "https://taller-mecanico-blue.vercel.app";
process.env.FRONTEND_URL = frontendOrigin + "/";

const app = require("../src/app");

test("CORS accepts the Vercel origin when FRONTEND_URL has a trailing slash", async (t) => {
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const response = await fetch("http://127.0.0.1:" + server.address().port + "/api/auth/login", {
    method: "OPTIONS",
    headers: {
      Origin: frontendOrigin,
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "content-type",
    },
  });

  assert.equal(response.status, 204);
  assert.equal(response.headers.get("access-control-allow-origin"), frontendOrigin);
});
