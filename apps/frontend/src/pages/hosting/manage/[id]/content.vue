<template>
	<div class="flex h-full w-full flex-col">
		<NuxtPage :route="route" :server="props.server" />
	</div>
</template>

<script setup lang="ts">
import type { BlankethubServer } from '~/composables/servers/modrinth-servers.ts';

const route = useNativeRoute()

const props = defineProps<{
	server: BlankethubServer
}>()

const data = computed(() => props.server.general)

useHead({
	title: `Content - ${data.value?.name ?? 'Server'} - Blankethub`,
})
</script>
