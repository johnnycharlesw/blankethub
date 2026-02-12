<script setup lang="ts">
import { Heading, Text, Link as VLink } from '@vue-email/components';

import StyledEmail from '../shared/StyledEmail.vue';
</script>

<template>
	<StyledEmail
		title="Your email has been changed"
		:manual-links="[{ link: 'https://support.blankethub.localhost', label: 'Support Portal' }]"
	>
		<Heading as="h1" class="mb-2 text-2xl font-bold"> Your email has been changed </Heading>

		<Text class="text-muted text-base">Hi {user.name},</Text>
		<Text class="text-muted text-base">
			At your request, we've successfully updated your Blankethub account's email to
			{emailchanged.new_email}.
		</Text>
		<Text class="text-muted text-base">
			If you did not make this change, please contact us immediately through our
			<VLink href="https://support.blankethub.localhost" class="text-green underline">Support Portal</VLink
			>.
		</Text>
	</StyledEmail>
</template>
