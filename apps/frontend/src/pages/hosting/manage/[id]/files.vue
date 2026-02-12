<script setup lang="ts">
import { injectBlankethubServerContext, ServersManageFilesPage } from '@modrinth/ui';

const { server } = injectBlankethubServerContext()
const flags = useFeatureFlags()

useHead({
	title: computed(() => `Files - ${server.value?.name ?? 'Server'} - Blankethub`),
})
</script>

<template>
	<ServersManageFilesPage :show-debug-info="flags.advancedDebugInfo" />
</template>
