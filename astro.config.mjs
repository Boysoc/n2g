// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://github.n2g.cn', // 填你的自定义域名
	base: '/', // 根目录部署，保持默认即可
	integrations: [mdx(), sitemap()],
	build: {
		format: 'directory',
	},
});
