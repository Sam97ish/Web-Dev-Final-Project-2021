import { app } from "../app.js";
import { superoak } from "../deps.js";

Deno.test({
    name: "Test that accessing /quiz is restricted and redirects to login.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/questions").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

Deno.test({
    name: "Test that accessing /quiz/0/incorrect is restricted and redirects to login.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/quiz/0/incorrect").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Test that accessing /statistics is restricted and redirects to login.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/statistics").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Test that posting to /quiz/0/options/1 is restricted and redirects to login.",
    async fn() {
      const testClient = await superoak(app);
      await testClient.post("/quiz/1/options/1").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});