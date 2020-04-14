<template>
	<div>
		{{ spinningActivity.name }}
		<template v-if="spinningActivity.steps" >({{totalTime() | formatActivityTime}})</template>
		<v-icon>{{spinningActivity.public ? 'mdi-account-multiple' : 'mdi-account'}}</v-icon>
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

	methods: {
		totalTime: function() {
			var totalTime = 0
			this.$props.spinningActivity.steps.forEach(step => {
				totalTime += step.seconds
			});
			return totalTime
		}
	}
}

</script>

<style scoped>

</style>