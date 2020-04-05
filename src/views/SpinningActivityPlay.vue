<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="cyan" dark>
                <v-toolbar-title>{{ spinningActivity.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <span v-if="stateStarted">
                <h1>Get Ready!</h1>
            </span>
            <span v-else-if="currentStep !== null">
                <h1>{{ spinningActivity.steps[currentStep].name }}</h1>
                <h2>
                    Intensity:
                    {{ spinningActivity.steps[currentStep].intensity }}
                </h2>
                <h2>RPM: {{ spinningActivity.steps[currentStep].rpm }}</h2>
                <!-- <audio controls="controls" id="audio_player" autoplay loop>
                    <source src="@/assets/upliftingMusic.mp3" type="audio/mpeg">
                    Your browser does not support the audio element
                </audio> -->
            </span>
            <span v-else>
                <h1>Done</h1>
                <router-link to="/spinningHistory">Go to History</router-link>
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

            <v-progress-linear
                color="green"
                v-model="totalPercentageDone"
                height="25"
                rounded
            >
                <strong>{{ totalPercentageDone }}%</strong>
            </v-progress-linear>

            <v-card-text style="height: 100px; position: relative">
                <v-btn
                    dark
                    fab
                    bottom
                    right
                    color="yellow"
                    v-if="!statePaused && (statePlaying || stateStarted)"
                    @click="pause()"
                >
                    <v-icon>mdi-pause</v-icon>
                </v-btn>
                <v-btn
                    dark
                    fab
                    bottom
                    right
                    v-if="statePaused"
                    color="green"
                    @click="play()"
                >
                    <v-icon>mdi-play</v-icon>
                </v-btn>
                <v-btn
                    dark
                    fab
                    bottom
                    right
                    color="red"
                    v-if="statePaused"
                    @click="stop()"
                >
                    <v-icon>mdi-stop</v-icon>
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Howl } from "howler";

export default {
    name: "SpinningActivityPlay",

    props: ["documentId"],

    created() {},

    components: {},

    mounted() {
        this.fetchSpinningActivity({ documentId: this.$props.documentId }).then(
            () => {
                this.currentStep = 0;
                this.value = 0;
                this.displayCountDown = 5;
                this.setupProgress(this.currentStep, 0);
                this.playSteps();
            }
        );
    },

    beforeDestroy() {
        clearInterval(this.interval);
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
            sound: null,
            totalPercentageDone: 0
        };
    },

    methods: {
        ...mapActions({
            fetchSpinningActivity: "spinningActivities/fetchSpinningActivity",
            addSpinningHistoryEntry: "spinningHistory/addSpinningHistoryEntry"
        }),

        addToHistory: function(percentageDone) {
            this.spinningActivity.userEmail = this.userEmail
            return this.addSpinningHistoryEntry({
                spinningActivity: this.spinningActivity,
                percentageDone: percentageDone
            });
        },

        playSteps: function() {
            let stepCount = this.spinningActivity.steps.length;
            let increment = 100 / this.displayCountDown;
            //this.playMusic();
            this.interval = setInterval(() => {
                if (this.statePaused) {
                    clearInterval(this.interval);
                    // this.pauseMusic();
                    return;
                }
                if (this.value >= 100) {
                    if (this.stateStarted) {
                        this.stateStarted = false;
                        this.statePlaying = true;
                    } else {
                        ++this.currentStep;
                    }
                    if (this.currentStep === stepCount) {
                        this.currentStep = null;
                        this.statePlaying = false;
                        this.displayCountDown = 0;
                        this.addToHistory(100)
                        clearInterval(this.interval);
                        return;
                    } else {
                        this.value = 0;
                        increment =
                            100 /
                            this.spinningActivity.steps[this.currentStep]
                                .seconds;
                        this.displayCountDown = this.spinningActivity.steps[
                            this.currentStep
                        ].seconds;
                    }
                } else {
                    this.value += increment;
                    this.displayCountDown -= 1;
                    if (this.statePlaying) {
                        this.setupProgress(
                            this.currentStep,
                            this.spinningActivity.steps[this.currentStep]
                                .seconds - this.displayCountDown
                        );
                    }
                }
            }, 1000);
        },

        playMusic: function() {
            if (this.sound == null) {
                this.sound = new Howl({
                    src: ["upliftingMusic.mp3"]
                });
            }
            this.sound.play();
            // this.sound.mute(false);
        },

        pauseMusic: function() {
            this.sound.pause();
        },

        pause: function() {
            this.statePaused = true;
        },

        play: function() {
            this.playMusic();
            this.statePaused = false;
            this.playSteps();
        },

        stop: function() {
            if (this.value < 20) {
                this.$router.push({
                    path: "/spinningActivities"
                });
            } else {
                this.addToHistory(this.totalPercentageDone)
                .then(() => {
                    this.$router.push({ path: "/spinningHistory" });
                });
            }
        },

        setupProgress: function(currentStep, timeDoneInCurrentStep) {
            var totalTime = 0;
            var totalDone = 0;
            var s = 0;
            this.spinningActivity.steps.forEach(step => {
                s++;
                if (currentStep >= s) {
                    totalDone += step.seconds;
                }
                totalTime += step.seconds;
            });
            totalDone += timeDoneInCurrentStep;
            this.totalPercentageDone = Math.ceil((totalDone / totalTime) * 100);
        }
    },

    computed: {
        ...mapGetters({
            spinningActivity: "spinningActivities/getSpinningActivity",
            userEmail: "auth/getEmail"
        })
    }
};
</script>

<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>