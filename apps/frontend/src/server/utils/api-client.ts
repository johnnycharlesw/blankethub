import {
    AuthFeature,
    NuxtBlankethubClient,
    type AuthConfig,
    type FeatureConfig,
    type NuxtClientConfig,
} from '@modrinth/api-client'
import type { H3Event } from 'h3'

async function getRateLimitKeyFromSecretsStore(): Promise<string | undefined> {
	try {
		const mod = 'cloudflare:workers'
		const { env } = await import(/* @vite-ignore */ mod)
		return await env.RATE_LIMIT_IGNORE_KEY?.get()
	} catch {
		return undefined
	}
}

export interface ServerBlankethubClientOptions {
	event?: H3Event
	authToken?: string
}

export function useServerBlankethubClient(options?: ServerBlankethubClientOptions): NuxtBlankethubClient {
	const config = useRuntimeConfig(options?.event)
	const apiBaseUrl = (config.apiBaseUrl || config.public.apiBaseUrl).replace('/v2/', '/')

	const features = []

	if (options?.authToken) {
		features.push(
			new AuthFeature({
				token: options.authToken,
				tokenPrefix: '',
			} as AuthConfig as FeatureConfig),
		)
	}

	const clientConfig: NuxtClientConfig = {
		labrinthBaseUrl: apiBaseUrl,
		rateLimitKey: config.rateLimitKey || getRateLimitKeyFromSecretsStore,
		features,
	}

	return new NuxtBlankethubClient(clientConfig)
}
