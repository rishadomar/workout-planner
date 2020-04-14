<template functional>
	<div>
		{{ props.spinningActivity.name }}
		<v-icon>{{props.spinningActivity.public ? 'mdi-account-multiple' : 'mdi-account'}}</v-icon>
	</div>
</template>

<script>
export default {
    name: "SpinningActivityTitle",

	props: {
		spinningActivity: {
			type: Object,
			required: true
		}
	},
}

</script>

<style scoped>

</style>