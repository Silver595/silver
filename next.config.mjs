/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // @stream-io/node-sdk pulls in jsonwebtoken, which uses Node's crypto module in
  // ways that break when webpack bundles it into the Server Actions ("action-browser")
  // layer — it manifests as `TypeError: Cannot read properties of undefined
  // (reading 'prototype')` at runtime. Marking these external forces Node's own
  // require() at runtime instead of webpack bundling them.
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@stream-io/node-sdk", "jsonwebtoken"],
  },
};

export default nextConfig;
