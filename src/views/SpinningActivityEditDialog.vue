<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-dialog v-model="showDialog" persistent max-width="400px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Edit Activity</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        label="Activity Name"
                                        v-model="spinningActivity.name"
                                        required
                                        autofocus
                                    ></v-text-field>
                                    <v-checkbox
                                        v-model="spinningActivity.public"
                                        label="Public"
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click.stop="showDialog = false"
                            >Close</v-btn
                        >
                        <v-btn
                            color="blue darken-1"
                            text
                            @click.stop="
                                saveSpinningActivity();
                                showDialog = false;
                            "
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "SpinningActivityEditDialog",

    components: {},

    props: {
        documentId: {
            type: String,
            required: true
        },
        visible: {
            type: Boolean
        }
    },

    created() {},

    mounted() {},

    data() {
        return {
            newStep: {}
        };
    },

    methods: {
        ...mapActions({
            addStep: "spinningActivities/addStep",
            updateSpinningActivity: "spinningActivities/updateSpinningActivity"
        }),

        saveSpinningActivity: function() {
            this.updateSpinningActivity({
                spinningActivityId: this.$props.documentId,
                name: this.spinningActivity.name,
                icon: this.spinningActivity.name[0],
                public: this.spinningActivity.public
            });
        }
    },

    computed: {
        ...mapGetters({
            spinningActivity: "spinningActivities/getSpinningActivity"
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
