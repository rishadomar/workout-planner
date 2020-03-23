<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="cyan" dark>
                <v-toolbar-title>{{spinningActivity.name}}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <span v-if="stateStarted">
                <h1>Get Ready!</h1>
            </span>
            <span v-else-if="currentStep !== null">
                <h1>{{spinningActivity.steps[currentStep].name}}</h1>
                <h2>Intensity: {{spinningActivity.steps[currentStep].intensity}}</h2>
                <h2>RPM: {{spinningActivity.steps[currentStep].rpm}}</h2>
                <!-- <audio controls="controls" id="audio_player" autoplay loop>
                    <source src="@/assets/upliftingMusic.mp3" type="audio/mpeg">
                    Your browser does not support the audio element
                </audio> -->
            </span>
            <span v-else>
                <h1>Done</h1>
            </span>


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
                <v-btn dark fab bottom right color="yellow" v-if="!statePaused && (statePlaying || stateStarted)" @click="pause()">
                    <v-icon>mdi-pause</v-icon>
                </v-btn>
                <v-btn dark fab bottom right v-if="statePaused" color="green" @click="play()">
                    <v-icon>mdi-play</v-icon>
                </v-btn>
                <v-btn dark fab bottom right color="red" v-if="statePaused" @click="stop()">
                    <v-icon>mdi-stop</v-icon>
                </v-btn>
          </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {Howl} from 'howler';

export default {
    name: "SpinningActivityPlay",

    props: ['documentId'],

    created() {
	},

	components: {
	},

	mounted() {
        this.fetchSpinningActivity({documentId: this.$props.documentId})
            .then(() => {
                this.currentStep = 0
                this.value = 0
                this.displayCountDown = 5
                this.playSteps()
            })
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
            statePaused: false,
            sound: null
        };
    },

    methods: {
        ...mapActions({
            fetchSpinningActivity: "spinningActivities/fetchSpinningActivity",
        }),

        playSteps: function() {
            let stepCount = this.spinningActivity.steps.length
            let increment = 100 / this.displayCountDown
            this.playMusic();
            this.interval = setInterval(() => {
                if (this.statePaused) {
                    clearInterval(this.interval)
                    this.pauseMusic();
                    return
                }
                if (this.value >= 100) {
                    if (this.stateStarted) {
                        this.stateStarted = false
                        this.statePlaying = true
                    } else {
                        ++this.currentStep
                    }
                    if (this.currentStep === stepCount) {
                        this.currentStep = null
                        this.statePlaying = false
                        this.displayCountDown = 0
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

        },

        playMusic: function() {
            if (this.sound == null) {
                this.sound = new Howl({
                    src: ['@/assets/upliftingMusic.mp3']
                });
            }
            this.sound.play();
        },

        pauseMusic: function() {
            this.sound.pause();
        },

        pause: function() {
            this.statePaused = true

        },

        play: function() {
            this.statePaused = false
            this.playSteps()
        },

        stop: function() {

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