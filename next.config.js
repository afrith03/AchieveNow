/** @type {import('next').NextConfig} */
// require("dotenv").config

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // env: {
  //   RR: process.env.RR,
  // },
};

module.exports = nextConfig;
