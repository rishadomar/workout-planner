<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-dialog v-model="showDialog" persistent max-width="400px">
                <v-card>
                    <v-card-title primary-title>
                        <span v-if="formToAddNewStep" class="headline">New Step</span>
                        <span v-else class="headline">Edit Step {{ step.number }}</span>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="name"
                                    v-model="step.name"
                                    autofocus
                                    filled
                                    rounded
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="intensity"
                                    type="number"
                                    v-model.number="step.intensity"
                                    filled
                                    rounded
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="time"
                                    v-model="step.seconds"
                                    hint="Example add 3 min & 20 sec: 3m 20s"
                                    persistent-hint
                                    filled
                                    rounded
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="rpm"
                                    type="number"
                                    v-model.number="step.rpm"
                                    filled
                                    rounded
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                v-if="!formToAddNewStep"
                                color="blue darken-1"
                                text
                                @click.stop="
                                    deleteSpinningActivityStep();
                                    showDialog = false;
                                "
                                >Delete</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click.stop="showDialog = false"
                                >Cancel</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click.stop="
                                    saveStep();
                                    showDialog = false;
                                "
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
    name: "EditStepDialog",

    components: {},

    props: {
        spinningActivity: {
            type: Object,
            required: true
        },
        step: {
            type: Object,
            required: false,
            default: () => {
                return {
                    name: "",
                    intensity: "",
                    time: "",
                    rpm: ""
                }
            }
        },
        visible: {
            type: Boolean,
            required: true
        },
        formToAddNewStep: {
            type: Boolean
        }
    },

    created() {},

    data() {
        return {};
    },

    methods: {
        ...mapActions({
            addStep: "spinningActivities/addStep",
            editStep: "spinningActivities/editStep",
            deleteStep: "spinningActivities/deleteStep"
        }),

        saveStep: function() {
            if (this.formToAddNewStep) {
                this.step.number = this.spinningActivity.steps.length + 1;
                this.addStep({
                    documentId: this.spinningActivity.id,
                    newStep: this.step
                });
            } else {
                this.editStep({
                    activityId: this.spinningActivity.id,
                    step: this.step
                });
            }
        },

        deleteSpinningActivityStep: function() {
            this.deleteStep({
                activityId: this.spinningActivity.id,
                step: this.step
            });
        }
    },

    computed: {
        ...mapGetters({}),

        showDialog: {
            get() {
                return this.visible;
            },
            set(value) {
                if (!value) {
                    this.$emit("close");
                }
            }
        }
    }
};
</script>

<style>
</style>
