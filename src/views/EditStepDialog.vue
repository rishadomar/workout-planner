<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-dialog v-model="showDialog" persistent max-width="400px">
                <v-card>
                    <v-card-title primary-title>
                        <span class="headline">Add Step</span>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="name*"
                                    v-model="step.name"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="intensity*"
                                    v-model="step.intensity"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="seconds*"
                                    v-model="step.seconds"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="rpm*"
                                    v-model="step.rpm"
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
		activityId: {
			type: String,
			required: true
		},
        step: {
            type: Object,
            required: true
        },
        visible: {
            type: Boolean
        }
    },

    created() {},

    data() {
        return {
        };
    },

    methods: {
        ...mapActions({
            editStep: "spinningActivities/editStep"
        }),

        saveStep: function() {
            this.editStep({
				activityId: this.activityId,
                step: this.step
            });
        }
    },

    computed: {
        ...mapGetters({
        }),
        showDialog: {
            get() {
                return this.visible;
            },
            set(value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    }
};
</script>

<style>
</style>
