<script lang="ts" setup>
import BlankethubLogo from '../../assets/logo.svg?component';
</script>
<template>
	<div>
		<BlankethubLogo />
		Blankethub
	</div>
</template>

<style lang="scss" scoped>
div {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 5rem;
	margin-top: 1rem;

	svg {
		width: 5rem;
		height: 5rem;
		position: absolute;
		&.rotate {
			animation: rotate 4s infinite linear;
			&.inner {
				animation: rotate 6s infinite linear reverse;
			}
		}
		@keyframes rotate {
			0% {
				transform: rotate(0);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
}
</style>
