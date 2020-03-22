<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="cyan" dark>
                <v-toolbar-title>{{spinningActivity.name}}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <span v-if="stateStarted">Get Ready!</span>
            <span v-else-if="currentStep !== null">
                {{spinningActivity.steps[currentStep].name}}
                {{spinningActivity.steps[currentStep].intensity}}
                {{spinningActivity.steps[currentStep].rpm}}
            </span>
            <span v-else>Done</span>

            <v-divider></v-divider>

            <v-progress-circular
                :rotate="-90"
                :size="100"
                :width="15"
                :value="value"
                color="primary"
            >
                {{ displayCountDown }}
            </v-progress-circular>

            <v-card-text style="height: 100px; position: relative">
                <v-btn dark fab bottom right color="yellow" v-if="statePlaying || stateStarted" @click="pause()">
                    <v-icon>mdi-pause</v-icon>
                </v-btn>
                <v-btn dark fab bottom right v-if="statePaused" color="green" @click="play()">
                    <v-icon>mdi-play</v-icon>
                </v-btn>
                <v-btn dark fab bottom right color="red" v-if="statePaused || statePlaying" @click="stop()">
                    <v-icon>mdi-stop</v-icon>
                </v-btn>
          </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "SpinningActivityPlay",

    props: ['documentId'],

    created() {
	},

	components: {
	},

	mounted() {
        console.log('fetch doc with reference id: ' + this.$props.documentId)
        this.fetchSpinningActivity({documentId: this.$props.documentId})
            .then(() => {this.playSteps()})
		// this.interval = setInterval(() => {
        //     if (this.value === 100) {
        //         if (this.stateStarted) {

        //         }
        //         return (this.value = 0)
        //     }
        //     this.value += 10
        //     this.displayCountDown = this.value / 10
        // }, 1000)
	},

	beforeDestroy () {
      clearInterval(this.interval)
    },

    data() {
        return {
            interval: {},
            value: 0,
            displayCountDown: 0,
			currentStep: null,
			stateStarted: true,
			statePlaying: false,
			statePaused: false
        };
    },

    methods: {
        ...mapActions({
            fetchSpinningActivity: "spinningActivities/fetchSpinningActivity",
        }),

        playSteps: function() {
            let stepCount = this.spinningActivity.steps.length
            let increment = 1

            this.currentStep = 0
            this.value = 0
            increment = 100 / 5
            this.displayCountDown = 5
            this.interval = setInterval(() => {
                if (this.value >= 100) {
                    if (this.stateStarted) {
                        this.stateStarted = false
                        this.statePlaying = true
                    }
                    ++this.currentStep
                    if (this.currentStep === stepCount) {
                        this.currentStep = null
                        this.statePlaying = false
                        clearInterval(this.interval)
                        return
                    } else {
                        this.value = 0
                        increment = 100 / this.spinningActivity.steps[this.currentStep].seconds
                        this.displayCountDown = this.spinningActivity.steps[this.currentStep].seconds
                    }
                } else {
                    this.value += increment
                    this.displayCountDown -= 1
                }
            }, 1000)

        }
    },

    computed: {
        ...mapGetters("spinningActivities", {
            spinningActivity: "getSpinningActivity"
        }),

    }
};
</script>

<style scoped>
    .v-progress-circular {
        margin: 1rem;
    }
</style>