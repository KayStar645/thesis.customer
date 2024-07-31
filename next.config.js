/** @type {import('next').NextConfig} */

const nextConfig = {
	async redirects() {
		return [];
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	images: {
		remotePatterns: [],
	},
};

module.exports = {
	...nextConfig,
	output: 'standalone',
};
