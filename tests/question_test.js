import { app } from "../app.js";
import { superoak } from "../deps.js";

Deno.test({
    name: "Test that accessing /questions is restricted and redirects to login.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/questions").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Test that accessing /questions/5/options is restricted and redirects to login.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/questions/5/options").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Test that accessing /questions/-1 results redirection.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/questions/-1").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });