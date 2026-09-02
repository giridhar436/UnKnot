const routes = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/dashboard",
  "/documents",
  "/documents/doc-001",
  "/documents/doc-003",
  "/finance",
  "/investments",
  "/ask",
  "/reminders",
  "/categories",
  "/settings",
];

async function verifyAll() {
  console.log("=== Verifying UnKnot Routes ===");
  let failed = 0;

  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`, { redirect: "follow" });
      const html = await res.text();
      const isOk = res.status === 200 || res.status === 307 || res.status === 308;
      console.log(`[${isOk ? "PASS" : "FAIL"}] ${route} -> Status: ${res.status} (Length: ${html.length} bytes)`);
      if (!isOk) failed++;
    } catch (err) {
      console.error(`[FAIL] ${route} -> Exception: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nResult: ${routes.length - failed}/${routes.length} routes passed.`);
  if (failed > 0) process.exit(1);
}

verifyAll();
