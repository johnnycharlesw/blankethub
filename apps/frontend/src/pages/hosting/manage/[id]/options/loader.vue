<template>
	<ServerInstallation
		:server="props.server"
		:backup-in-progress="props.backupInProgress"
		@reinstall="emit('reinstall')"
	/>
</template>

<script setup lang="ts">
import ServerInstallation from '~/components/ui/servers/ServerInstallation.vue';
import type { BlankethubServer } from '~/composables/servers/modrinth-servers.ts';
import type { BackupInProgressReason } from '~/pages/hosting/manage/[id].vue';

const props = defineProps<{
	server: BlankethubServer
	backupInProgress?: BackupInProgressReason
}>()

const emit = defineEmits<{
	reinstall: [any?]
}>()
</script>
