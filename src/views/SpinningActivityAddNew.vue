<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <Back></Back>
                <v-app-bar-nav-icon color="orange">
                    <span class="white--text headline">{{
                        spinningActivity.icon
                    }}</span>
                </v-app-bar-nav-icon>

                <v-toolbar-title>{{ spinningActivity.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-dialog
                v-model="editSpinningActivityDialog"
                persistent
                max-width="400px"
            >
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
                            @click="editSpinningActivityDialog = false"
                            >Close</v-btn
                        >
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="
                                editSpinningActivityDialog = false;
                                saveSpinningActivity();
                            "
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <template>
                <v-list two-line subheader>
                    <draggable
                        v-bind="dragOptions"
                        v-model="spinningActivity.steps"
                        :move="onMoveStep"
                        @start="isDragging = true"
                        @end="isDragging = false"
                    >
                        <v-list-item
                            v-for="step in spinningActivity.steps"
                            :key="step.id"
                        >
                            <v-avatar color="orange" size="40">
                                <span class="white--text headline">{{
                                    step.number
                                }}</span>
                            </v-avatar>

                            <v-list-item-content>
                                <v-list-item-title
                                    v-text="step.name"
                                ></v-list-item-title>
                                <v-list-item-subtitle
                                    >{{ step.intensity }} -
                                    {{ step.seconds }} seconds.
                                    {{ step.rpm }} RPM
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                    icon
                                    @click="deleteSpinningActivityStep(step)"
                                >
                                    <v-icon color="grey lighten-1"
                                        >mdi-delete</v-icon
                                    >
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </draggable>
                </v-list>
                <v-btn
                    :disabled="
                        !spinningActivity.steps ||
                            spinningActivity.steps.length == 0
                    "
                    dark
                    fab
                    bottom
                    right
                    color="green"
                    @click="play()"
                >
                    <v-icon>mdi-play</v-icon>
                </v-btn>
            </template>

            <SpinningActivityAddNewDialog :documentId="documentId" v-model="showAddNewStepDialog"></SpinningActivityAddNewDialog>

            <v-footer height="auto" color="indigo" dark>
                <v-layout justify-center row wrap>
                    <v-btn
                        :disabled="!isEditable"
                        color="blue-grey"
                        class="ma-2 white--text"
                        @click.stop="showAddNewStepDialog = true"
                        >New Step
                        <v-icon right dark>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                        :disabled="!isEditable"
                        color="blue-grey"
                        class="ma-2 white--text"
                        @click="deleteCurrentSpinningActivity()"
                        >Delete this Activity
                        <v-icon right dark>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                        :disabled="!isEditable"
                        color="blue-grey"
                        class="ma-2 white--text"
                        @click="editSpinningActivity()"
                        >Edit Activity
                        <v-icon right dark>mdi-pencil</v-icon>
                    </v-btn>
                </v-layout>
            </v-footer>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";
import Back from "@/views/Back.vue";
import SpinningActivityAddNewDialog from "@/views/SpinningActivityAddNewDialog.vue";

export default {
    name: "SpinningActivityAddNew",

    components: {
        draggable,
        Back,
        SpinningActivityAddNewDialog
    },

    props: ["documentId"],

    created() {
        this.fetchSpinningActivity({ documentId: this.$props.documentId });
    },

    data() {
        return {
            showAddNewStepDialog: false,
            editSpinningActivityDialog: false,
            name: "New",
            icon: "",
            steps: [],
            newStep: null,
            editable: true,
            isDragging: false
        };
    },

    methods: {
        ...mapActions({
            fetchSpinningActivityLatest:
                "spinningActivities/fetchSpinningActivityLatest",
            fetchSpinningActivity: "spinningActivities/fetchSpinningActivity",
            addStep: "spinningActivities/addStep",
            deleteStep: "spinningActivities/deleteStep",
            updateSpinningActivity: "spinningActivities/updateSpinningActivity",
            deleteSpinningActivity: "spinningActivities/deleteSpinningActivity",
            updateStepNumbers: "spinningActivities/updateStepNumbers"
        }),

        editSpinningActivity: function() {
            this.editSpinningActivityDialog = true;
        },
        saveSpinningActivity: function() {
            this.updateSpinningActivity({
                spinningActivityId: this.$props.documentId,
                name: this.spinningActivity.name,
                icon: this.spinningActivity.name[0],
                public: this.spinningActivity.public
            });
        },
        onMoveStep: function({ relatedContext, draggedContext }) {
            const relatedStepNumber = relatedContext.element.number;
            const draggedStepNumber = draggedContext.element.number;

            this.spinningActivity.steps.forEach(step => {
                if (draggedStepNumber > relatedStepNumber) {
                    if (step.number == draggedStepNumber) {
                        step.number = relatedStepNumber;
                    } else if (
                        step.number >= relatedStepNumber &&
                        step.number < draggedStepNumber
                    ) {
                        step.number += 1;
                    }
                } else {
                    if (step.number == draggedStepNumber) {
                        step.number = relatedStepNumber;
                    } else if (
                        step.number > draggedStepNumber &&
                        step.number <= relatedStepNumber
                    ) {
                        step.number -= 1;
                    }
                }
            });

            return true;
        },

        deleteCurrentSpinningActivity: function() {
            this.deleteSpinningActivity({
                spinningActivityId: this.spinningActivity.id
            }).then(() => {
                this.$router.go(-1);
            });
        },

        deleteSpinningActivityStep: function(step) {
            var deletedStepNumber = step.number;
            this.deleteStep({
                spinningActivityId: this.spinningActivity.id,
                stepId: step.id
            }).then(() => {
                this.spinningActivity.steps.forEach(step => {
                    if (step.number > deletedStepNumber) {
                        step.number -= 1;
                    }
                });
                this.updateStepNumbers({
                    spinningActivityId: this.spinningActivity.id,
                    steps: this.spinningActivity.steps
                });
            });
        },

        play: function() {
            this.$router.push({
                path: "/spinningActivityPlay/" + this.spinningActivity.id
            });
        }
    },

    computed: {
        ...mapGetters({
            spinningActivities: "spinningActivities/getSpinningActivities",
            spinningActivity: "spinningActivities/getSpinningActivity",
            userEmail: "auth/getEmail"
        }),

        dragOptions() {
            return {
                animation: 0,
                disabled: !this.editable,
                ghostClass: "ghost"
            };
        },

        isEditable: function() {
            return this.spinningActivity.userEmail == this.userEmail
                ? true
                : false;
        },

        spinningActivityLatest: function() {
            let spinningActivities = this.getSpinningActivities();
            if (spinningActivities.length > 0) {
                return spinningActivities.last();
            }
            return null;
        }
    },

    watch: {
        isDragging(newValue) {
            if (newValue) {
                return;
            }
            this.$nextTick(() => {
                this.updateStepNumbers({
                    spinningActivityId: this.spinningActivity.id,
                    steps: this.spinningActivity.steps
                });
            });
        }
    }
};
</script>

<style>
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>
