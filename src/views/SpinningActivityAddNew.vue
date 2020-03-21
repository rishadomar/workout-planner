<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="cyan" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>{{ spinningActivity.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn dark fab bottom right color="green" @click="addSpinningActivityStep()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list two-line subheader>
                <v-list-item v-for="step in spinningActivity.steps" :key="step.id">
                    <v-list-item-content>
                        <v-list-item-title v-text="step.name"></v-list-item-title>
                        <v-list-item-subtitle>{{step.intensity}} - {{step.seconds}} seconds. {{step.rpm}} RPM </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn icon @click="deleteStep({spinningActivityId: spinningActivity.id, stepId: step.id})">
                            <v-icon color="grey lighten-1">mdi-delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>

            <v-card v-if="busyAddNewStep">
                <v-card-title primary-title>
                    <span class="headline">New Step</span>
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="name*" v-model="newStep.name" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="intensity*" v-model="newStep.intensity" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="seconds*" v-model="newStep.seconds" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="rpm*" v-model="newStep.rpm" required></v-text-field>
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

    props: ['documentId'],

    created() {
        //this.fetchLatestSpinningActivity();
        console.log('fetch doc with reference id: ' + this.$props.documentId)
        this.fetchSpinningActivity({documentId: this.$props.documentId})
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
            fetchSpinningActivityLatest: "spinningActivities/fetchSpinningActivityLatest",
            fetchSpinningActivity: "spinningActivities/fetchSpinningActivity",
            addStep: "spinningActivities/addStep",
            deleteStep: "spinningActivities/deleteStep"
        }),
        addSpinningActivityStep: function() {
            this.busyAddNewStep = true;
            this.newStep = {
                name: '',
                seconds: '',
                intensity: '',
                rpm: ''
            };
        },
        closeSpinningActivityStep: function() {
            this.showSpinningActivityAddStepModal = false;
        },
        saveNewStep: function() {
            this.addStep({documentId: this.$props.documentId, newStep: this.newStep});
            // this.steps.push(this.newStep);
            this.busyAddNewStep = false;
        },
        cancelNewStep: function() {
            this.newStep = null;
            this.busyAddNewStep = false;
        },
    },

    computed: {
        ...mapGetters("spinningActivities", {
            spinningActivities: "getSpinningActivities",
            spinningActivity: "getSpinningActivity",
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