<template>
	<NuxtLayout>
		<NuxtRouteAnnouncer />
		<BlankethubLoadingIndicator />
		<NotificationPanel />
		<I18nDebugPanel />
		<NuxtPage />
	</NuxtLayout>
</template>
<script setup lang="ts">
import {
    I18nDebugPanel,
    NotificationPanel,
    provideBlankethubClient,
    provideNotificationManager,
    providePageContext,
} from '@modrinth/ui'

import BlankethubLoadingIndicator from '~/components/ui/modrinth-loading-indicator.ts'
import { createBlankethubClient } from '~/helpers/api.ts'
import { FrontendNotificationManager } from '~/providers/frontend-notifications.ts'

const auth = await useAuth()
const config = useRuntimeConfig()

provideNotificationManager(new FrontendNotificationManager())

const client = createBlankethubClient(auth, {
	apiBaseUrl: config.public.apiBaseUrl.replace('/v2/', '/'),
	archonBaseUrl: config.public.pyroBaseUrl.replace('/v2/', '/'),
	rateLimitKey: config.rateLimitKey,
})
provideBlankethubClient(client)
providePageContext({
	hierarchicalSidebarAvailable: ref(false),
	showAds: ref(false),
})
</script>
