<script setup lang="ts">
import { injectBlankethubServerContext, ServersManageBackupsPage } from '@modrinth/ui';

const { server, isServerRunning } = injectBlankethubServerContext()
const flags = useFeatureFlags()

useHead({
	title: `Backups - ${server.value?.name ?? 'Server'} - Blankethub`,
})
</script>

<template>
	<ServersManageBackupsPage
		:is-server-running="isServerRunning"
		:show-debug-info="flags.advancedDebugInfo"
	/>
</template>
