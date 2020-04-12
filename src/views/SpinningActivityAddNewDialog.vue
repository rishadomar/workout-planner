<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-dialog
                v-model="showDialog"
                persistent
                max-width="400px"
            >
                <v-card>
                    <v-card-title primary-title>
                        <span class="headline">Add Step</span>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="name*"
                                    v-model="newStep.name"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="intensity*"
                                    v-model="newStep.intensity"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="seconds*"
                                    v-model="newStep.seconds"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="rpm*"
                                    v-model="newStep.rpm"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click.stop="showDialog = false"
                                >Cancel</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click.stop="saveNewStep(); showDialog = false"
                                >Save</v-btn
                            >
                        </v-card-actions>
                    </v-container>
                </v-card>
            </v-dialog>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "SpinningActivityAddNewDialog",

    components: {},

    props: ["documentId", "showAddNewStepDialog"],

    created() {},

    data() {
        return {
            newStep: {},
        };
    },

    methods: {
        ...mapActions({
            addStep: "spinningActivities/addStep",
        }),

        initNewStep: function() {
            this.newStep = {
                name: "",
                seconds: "",
                intensity: "",
                rpm: ""
            };
        },

        saveNewStep: function() {
            this.newStep.number = this.spinningActivity.steps.length + 1;
            this.addStep({
                documentId: this.$props.documentId,
                newStep: this.newStep
            });
            this.initNewStep();
        },
    },

    computed: {
        ...mapGetters({
            spinningActivity: "spinningActivities/getSpinningActivity"
        }),
        showDialog: {
            get() {
                return this.showAddNewStepDialog
            },
            set(showAddNewStepDialog) {
                this.$emit("input", showAddNewStepDialog)
            }
        }
    }
};
</script>

<style>
</style>
