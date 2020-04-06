<template lang="html">
    <div id="back-component">
		<v-btn icon>
            <v-icon color="white" @click="navigateBack()">mdi-keyboard-backspace</v-icon>
        </v-btn>
	</div>
</template>

<script>

export default {
    name: "back",

    methods: {
        navigateBack: function() {
            this.$router.go(-1);
        }
    }
};
</script>