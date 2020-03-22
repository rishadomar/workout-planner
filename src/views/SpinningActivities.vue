<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="cyan" dark>
                <v-toolbar-title>Spinning Activities</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn dark fab bottom right color="green" @click="addCyclingActivity()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list two-line subheader>
                <v-list-item
                    v-for="spinningActivity in spinningActivities"
                        :key="spinningActivity.id"
                        @click="selectSpinningActivity(spinningActivity.id)"
                >
                    <v-avatar color="orange" size="40">
                        <span class="white--text headline">{{spinningActivity.icon}}</span>
                    </v-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="spinningActivity.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="countSteps(spinningActivity)"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn icon>
                            <v-icon color="grey lighten-1">mdi-information</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "SpinningActivities",

    created() {
        this.fetchSpinningActivities();
    },

    data() {
        return {
            busyAddNewSpinningActivity: false,
            newSpinningActivity: {
                name: "",
                icon: ""
            }
        };
    },

    methods: {
        ...mapActions({
            fetchSpinningActivities: "spinningActivities/fetchSpinningActivities",
            addSpinningActivity: "spinningActivities/addSpinningActivity"
        }),
        addCyclingActivity: function() {
            this.busyAddNewSpinningActivity = true;
            var moment = require('moment');
            var name = moment().format('dddd - MMM Do YYYY');
            this.addSpinningActivity({icon: name[0], name: name})
                .then((documentReference) => {
                    console.log("Back from adding spinning activity ");
                    this.$router.push({
                        path: 'spinningActivityAddNew/' + documentReference.id
                    })
                })

        },
        closeAddSpinningActivityModal: function() {
            this.busyAddNewSpinningActivity = false;
        },
        selectSpinningActivity: function(id) {
            this.$router.push({
                path: 'spinningActivityAddNew/' + id
            })
        },

        countSteps: function(spinningActivity) {
            return spinningActivity.steps != undefined ? spinningActivity.steps.length : 0
        }
    },

    computed: {
        ...mapGetters("spinningActivities", {
            spinningActivities: "getSpinningActivities",
            spinningActivity: "getSpinningActivity"
        }),

    }
};
</script>