export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { ensureSchema } = await import("@/lib/db/ensure-schema");
  await ensureSchema().catch((error) => {
    console.error("Schema ensure failed on startup:", error);
  });
}
