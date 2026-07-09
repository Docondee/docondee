// Dagger pipeline for Docondee
export async function build_site(client) {
  const nodeCache = client.cacheVolume("node_modules");
  return client
    .container()
    .from("node:20-alpine")
    .withDirectory("/app", client.host().directory("."))
    .withMountedCache("/app/node_modules", nodeCache)
    .workdir("/app")
    .shell({ command: { exec: ["npm", "install"] } })
    .withExec(["npm", "run", "build"]);
}

export async function check_links(client) {
  const nodeCache = client.cacheVolume("node_modules");
  return client
    .container()
    .from("node:20-alpine")
    .withDirectory("/app", client.host().directory("."))
    .withMountedCache("/app/node_modules", nodeCache)
    .workdir("/app")
    .shell({ command: { exec: ["npm", "install"] } })
    .withExec(["node", "scripts/check-forbidden-links.js"]);
}

export async function test_units(client) {
  const nodeCache = client.cacheVolume("node_modules");
  return client
    .container()
    .from("node:20-alpine")
    .withDirectory("/app", client.host().directory("."))
    .withMountedCache("/app/node_modules", nodeCache)
    .workdir("/app")
    .shell({ command: { exec: ["npm", "install"] } })
    .withExec(["npm", "run", "test:unit"]);
}