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

                <v-toolbar-title>
                    <SpinningActivityTitle :spinningActivity="spinningActivity" />
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <SpinningActivityEditDialog
                :documentId="documentId"
                :visible="showActivityEditDialog"
                @close="showActivityEditDialog = false"
            ></SpinningActivityEditDialog>

            <EditStepDialog
                :spinningActivity="spinningActivity"
                :visible="isEditable && showAddNewStepDialog"
                :step=newStep
                formToAddNewStep
                @close="newStep={}; showAddNewStepDialog = false"
            ></EditStepDialog>

            <v-list two-line subheader>
                <template v-if="isEditable">
                    <draggable
                        v-bind="dragOptions"
                        v-model="spinningActivity.steps"
                        :animation="200"
                        filter=".action-button"
                        :move="onMoveStep"
                        @start="isDragging = true"
                        @end="isDragging = false"
                    >
                        <Step
                            :spinningActivity="spinningActivity"
                            :step="step"
                            :isEditable="isEditable"
                            v-for="step in spinningActivity.steps"
                            :key="step.id"
                        >
                        </Step>
                    </draggable>
                </template>
                <template v-else>
                    <Step
                        :activityId="spinningActivity.id"
                        :step="step"
                        :isEditable="isEditable"
                        v-for="step in spinningActivity.steps"
                        :key="step.id"
                    >
                    </Step>
                </template>
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
            </v-list>

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
                        @click.stop="showActivityEditDialog = true"
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
import EditStepDialog from "@/views/EditStepDialog.vue";
import SpinningActivityEditDialog from "@/views/SpinningActivityEditDialog.vue";
import Step from "@/views/Step.vue";
import SpinningActivityTitle from "@/views/SpinningActivityTitle.vue";

export default {
    name: "SpinningActivity",

    components: {
        draggable,
        Back,
        Step,
        EditStepDialog,
        SpinningActivityEditDialog,
        SpinningActivityTitle
    },

    props: {
        documentId: {
            type: String,
            required: true
        }
    },

    created() {
        this.fetchSpinningActivity({ documentId: this.$props.documentId });
    },

    data() {
        return {
            showAddNewStepDialog: false,
            showActivityEditDialog: false,
            newStep: {},
            steps: [],
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
            deleteSpinningActivity: "spinningActivities/deleteSpinningActivity",
            updateStepNumbers: "spinningActivities/updateStepNumbers"
        }),

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
                return this.updateStepNumbers({
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
    border: 1px solid #4299e1;
}
</style>
