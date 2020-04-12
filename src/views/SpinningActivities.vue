<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <v-toolbar-title>Spinning Activities</v-toolbar-title>
                <v-spacer />
                <Login />
            </v-toolbar>

            <v-list two-line subheader>
                <v-list-item
                    v-for="spinningActivity in spinningActivities"
                    :key="spinningActivity.id"
                    @click="selectSpinningActivity(spinningActivity.id)"
                >
                    <v-avatar color="orange" size="40">
                        <span class="white--text headline">{{
                            spinningActivity.icon
                        }}</span>
                    </v-avatar>

                    <v-list-item-content>
                        <v-list-item-title
                            v-text="spinningActivity.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle>
                            {{ spinningActivity.createdAt | formatDateTime }}
                            <v-icon>{{ownershipIcon(spinningActivity)}}</v-icon>
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn icon>
                            <v-icon color="grey lighten-1"
                                >mdi-information</v-icon
                            >
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>

            <v-footer height="auto" color="indigo" dark>
                <v-layout justify-center row wrap>
                    <v-btn
                        :disabled="getLoggedIn == false"
                        color="blue-grey"
                        class="ma-2 white--text"
                        @click="addCyclingActivity()"
                        >Make a new Activity
                        <v-icon right dark>mdi-plus</v-icon>
                    </v-btn>
                </v-layout>
            </v-footer>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Login from "@/views/Login.vue";

export default {
    name: "SpinningActivities",

    components: {
        Login,
    },

    created() {
        this.fetchSpinningActivities({userEmail: this.userEmail});
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
            fetchSpinningActivities:
                "spinningActivities/fetchSpinningActivities",
            addSpinningActivity: "spinningActivities/addSpinningActivity",
        }),

        addCyclingActivity: function() {
            this.busyAddNewSpinningActivity = true;
            var moment = require("moment");
            var name = moment().format("dddd - MMM Do YYYY");
            this.addSpinningActivity({
                icon: name[0],
                name: name,
                public: false,
                userEmail: this.userEmail
            }).then(
                documentReference => {
                    this.$router.push({
                        path: "/spinningActivityAddNew/" + documentReference.id
                    });
                }
            );
        },

        closeAddSpinningActivityModal: function() {
            this.busyAddNewSpinningActivity = false;
        },

        selectSpinningActivity: function(id) {
            this.$router.push({
                path: "spinningActivityAddNew/" + id
            });
        },

        countSteps: function(spinningActivity) {
            return spinningActivity.steps != undefined
                ? spinningActivity.steps.length
                : 0;
        },

        ownershipIcon: function(spinningActivity) {
            return spinningActivity.public ? 'mdi-account-multiple' : 'mdi-account'
        }
    },

    computed: {
        ...mapGetters({
            spinningActivities: "spinningActivities/getSpinningActivities",
            spinningActivity: "spinningActivities/getSpinningActivity",
            userEmail: "auth/getEmail",
            getLoggedIn: "auth/getLoggedIn",
        })
    }
};
</script>