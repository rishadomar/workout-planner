<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="cyan" dark>
                <v-app-bar-nav-icon color="orange">
                    <span class="white--text headline">{{
                        spinningActivity.icon
                    }}</span>
                </v-app-bar-nav-icon>
                <template v-if="busyUpdatingSpinningActivity">
                    <v-text-field
                        v-model="spinningActivity.name"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn
                        dark
                        fab
                        bottom
                        right
                        color="cyan"
                        @click="saveSpinningActivity()"
                    >
                        <v-icon>mdi-check</v-icon>
                    </v-btn>
                </template>
                <template v-else>
                    <v-toolbar-title>{{
                        spinningActivity.name
                    }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        dark
                        fab
                        bottom
                        right
                        color="cyan"
                        @click="editSpinningActivity()"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
            </v-toolbar>

            <v-list two-line subheader>
                <draggable v-bind="dragOptions" v-model="spinningActivity.steps" :move="onMoveStep">
                    <v-list-item
                        v-for="step in spinningActivity.steps"
                        :key="step.id"
                    >
                        <v-avatar color="orange" size="40">
                            <span class="white--text headline">{{step.number}}</span>
                        </v-avatar>

                        <v-list-item-content>
                            <v-list-item-title
                                v-text="step.name"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                                >{{ step.intensity }} -
                                {{ step.seconds }} seconds. {{ step.rpm }} RPM
                            </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn
                                icon
                                @click="
                                    deleteStep({
                                        spinningActivityId: spinningActivity.id,
                                        stepId: step.id
                                    })
                                "
                            >
                                <v-icon color="grey lighten-1"
                                    >mdi-delete</v-icon
                                >
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </draggable>
            </v-list>

            <v-card v-if="busyAddNewStep">
                <v-card-title primary-title>
                    <span class="headline">New Step</span>
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
                            @click="cancelNewStep()"
                            >Cancel</v-btn
                        >
                        <v-btn color="blue darken-1" text @click="saveNewStep()"
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-container>
            </v-card>

            <v-card-text style="height: 100px; position: relative">
                <v-btn
                    dark
                    fab
                    bottom
                    right
                    color="green"
                    @click="addSpinningActivityStep()"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn
                    dark
                    fab
                    bottom
                    right
                    color="red"
                    @click="deleteCurrentSpinningActivity()"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn dark fab bottom right color="green" @click="play()">
                    <v-icon>mdi-play</v-icon>
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import draggable from 'vuedraggable';

export default {
    name: "SpinningActivityAddNew",

    components: {
        draggable,
    },

    props: ['documentId'],

    created() {
        this.fetchSpinningActivity({documentId: this.$props.documentId})
    },

    data() {
        return {
            showSpinningActivityAddStepModal: false,
            busyUpdatingSpinningActivity: false,
            name: "New",
            icon: "",
            steps: [],
            newStep: null,
            busyAddNewStep: false,
            editable: true
        };
    },

    methods: {
        ...mapActions({
            fetchSpinningActivityLatest: "spinningActivities/fetchSpinningActivityLatest",
            fetchSpinningActivity: "spinningActivities/fetchSpinningActivity",
            addStep: "spinningActivities/addStep",
            deleteStep: "spinningActivities/deleteStep",
            updateSpinningActivity: "spinningActivities/updateSpinningActivity",
            deleteSpinningActivity: "spinningActivities/deleteSpinningActivity",
            updateStepNumbers: "spinningActivities/updateStepNumbers",
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

        editSpinningActivity: function() {
            this.busyUpdatingSpinningActivity = true;
        },
        saveSpinningActivity: function() {
            this.updateSpinningActivity({spinningActivityId: this.$props.documentId, name: this.spinningActivity.name, icon: this.spinningActivity.name[0]})
            this.busyUpdatingSpinningActivity = false;
        },
        closeSpinningActivityStep: function() {
            this.showSpinningActivityAddStepModal = false;
        },
        onMoveStep: function({ relatedContext, draggedContext }) {
        //onMoveStep: function() {
            const relatedStepNumber = relatedContext.element.number;
            const draggedStepNumber = draggedContext.element.number;

            console.log('---------Move complete----------- related=' + relatedStepNumber + ' dragged=' + draggedStepNumber)
            this.spinningActivity.steps.forEach(step => {
                console.log('curr step: ' + step.name + ' (' + step.number + ')')
                if (draggedStepNumber > relatedStepNumber) {
                    if (step.number == draggedStepNumber) {
                        console.log('m setting to ' + relatedStepNumber)
                        step.number = relatedStepNumber
                    } else if (step.number >= relatedStepNumber && step.number < draggedStepNumber) {
                        console.log('i')
                        step.number += 1
                    } else {
                        console.log('< or >')
                    }
                } else {
                    if (step.number == draggedStepNumber) {
                        console.log('m setting to ' + relatedStepNumber)
                        step.number = relatedStepNumber
                    } else if (step.number > draggedStepNumber && step.number <= relatedStepNumber) {
                        console.log('d')
                        step.number -= 1
                    } else {
                        console.log('< or >')
                    }

                }
            });

            // var newSteps = this.spinningActivity.steps
            // var s = 0;
            // this.spinningActivity.steps.forEach(step => {
            //     step.number = ++s
            // });

            //this.updateStepNumbers({spinningActivityId: this.spinningActivity.id, steps: this.spinningActivity.steps})
            console.log('---final')
            this.spinningActivity.steps.forEach(step => {
                console.log(step.name + ' = ' + step.number)
            });

            return true;
        },
        saveNewStep: function() {
            this.newStep.number = this.spinningActivity.steps.length + 1
            this.addStep({documentId: this.$props.documentId, newStep: this.newStep});
            // this.steps.push(this.newStep);
            this.busyAddNewStep = false;
        },
        cancelNewStep: function() {
            this.newStep = null;
            this.busyAddNewStep = false;
        },
        deleteCurrentSpinningActivity: function() {
            this.deleteSpinningActivity({spinningActivityId: this.spinningActivity.id})
                .then(() => {
                    this.$router.go(-1)
                })
        },
        play: function() {
            this.$router.push({
                path: '/spinningActivityPlay/' + this.spinningActivity.id
            })
        }
    },

    computed: {
        ...mapGetters("spinningActivities", {
            spinningActivities: "getSpinningActivities",
            spinningActivity: "getSpinningActivity",
        }),

        // mySteps: {
        //     get() {
        //         debugger
        //         if (this.$store.spinningActivity) {
        //             return this.$store.spinningActivity.steps
        //         } else {
        //             return []
        //         }
        //     },

        //     set(value) {
        //         if (value == undefined || value[0] == undefined) {
        //             return
        //         }
        //         debugger
        //         this.$store.updateStepNumbers(value)
        //     }
        // },

        dragOptions() {
          return {
              animation: 0,
              disabled: !this.editable,
              ghostClass: "ghost"
            };
        },

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

<style>
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>
