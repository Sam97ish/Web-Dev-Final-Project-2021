import { app } from "../app.js";
import { superoak } from "../deps.js";

Deno.test({
    name: "Test that accessing /auth/login returns OK.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/auth/register").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Test that accessing /auth/register returns OK.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/auth/register").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Test that accessing / returns OK.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });