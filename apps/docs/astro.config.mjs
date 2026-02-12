import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi'

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.blankethub.localhost',
	integrations: [
		starlight({
			title: 'Blankethub Documentation',
			favicon: '/favicon.ico',
			editLink: {
				baseUrl: 'https://github.com/johnnycharlesw/blankethub/edit/main/apps/docs/',
			},
			logo: {
				light: './src/assets/light-logo.svg',
				dark: './src/assets/dark-logo.svg',
				replacesTitle: true,
			},
			customCss: [
				'@blankethub/assets/styles/variables.scss',
				'@blankethub/assets/styles/inter.scss',
				'./src/styles/blankethub.css',
			],
			plugins: [
				// Generate the OpenAPI documentation pages.
				starlightOpenAPI([
					{
						base: 'api',
						label: 'Blankethub API',
						schema: './public/openapi.yaml',
					},
				]),
			],
			sidebar: [
				{
					label: 'Contributing to Blankethub',
					autogenerate: { directory: 'contributing' },
				},
				{
					label: 'Guides',
					autogenerate: { directory: 'guide' },
				},
				// Add the generated sidebar group to the sidebar.
				...openAPISidebarGroups,
			],
		}),
	],
})
