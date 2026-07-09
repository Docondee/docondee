// Dagger pipeline for Docondee
export async function install_deps(client) {
  const nodeCache = client.cacheVolume("node_modules");
  return client
    .container()
    .from("node:20-alpine")
    .withDirectory("/app", client.host().directory("."))
    .withMountedCache("/app/node_modules", nodeCache)
    .workdir("/app")
    .shell({ command: { exec: ["npm", "install"] } });
}

export async function build_site(client) {
  const c = await install_deps(client);
  return c
    .shell({ command: { exec: ["npm", "run", "build"] } });
}

export async function verify_build(client, container) {
  const check = container.withExec(["test", "-d", "dist"]);
  return { success: check.exitCode() === 0 };
}

export async function test_units(client, container) {
  const result = container.withExec(["npm", "run", "test:unit"]);
  return { passed: result.exitCode() === 0 };
}
