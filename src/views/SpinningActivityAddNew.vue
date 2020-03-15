<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-list three-line>
                <v-btn dark fab bottom right color="green" @click="addSpinningActivityStep()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

                <template v-for="(step, index) in steps">
                    <v-list-item :key="step.id">
                        <v-list-item-content>
                            <v-list-item-title v-html="step.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="index" :inset="false"></v-divider>
                </template>
            </v-list>
            <v-card v-if="busyAddNewStep">
                <v-card-title>
                    <span class="headline">User Profile</span>
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="name*" v-model="newStep.name" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancelNewStep()">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="saveNewStep()">Save</v-btn>
                    </v-card-actions>
                </v-container>
            </v-card>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "SpinningActivityAddNew",

    created() {
        //this.fetchLatestSpinningActivity();
    },

    data() {
        return {
            showSpinningActivityAddStepModal: false,
            name: "New",
            icon: "",
            steps: [],
            newStep: null,
            busyAddNewStep: false
        };
    },

    methods: {
        ...mapActions({
            fetchSpinningActivityLatest:
                "spinningActivities/fetchSpinningActivityLatest"
        }),
        addSpinningActivityStep: function() {
            this.busyAddNewStep = true;
            this.newStep = {
                name: "new step name here pls"
            };
        },
        closeSpinningActivityStep: function() {
            this.showSpinningActivityAddStepModal = false;
        },
        saveNewStep: function() {
            this.steps.push(this.newStep);
            this.busyAddNewStep = false;
        },
        cancelNewStep: function() {
            this.newStep = null;
            this.busyAddNewStep = false;
        }
    },

    computed: {
        ...mapGetters("spinningActivities", {
            spinningActivities: "getSpinningActivities"
        }),
        spinningActivityLatest: function() {
            let spinningActivities = this.getSpinningActivities();
            if (spinningActivities.length > 0) {
                return spinningActivities.last();
            }
            return null;
        }
    }
};
</script>