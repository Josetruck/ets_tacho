/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/ets2/telemetry',
        destination: 'http://127.0.0.1:25555/api/ets2/telemetry', // Configura la URL de tu API
      },
    ];
  },
};
