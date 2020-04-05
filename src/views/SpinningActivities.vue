<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <v-toolbar-title>Spinning Activities</v-toolbar-title>
                <v-spacer />
                <div v-if="getLoggedIn == false">
                    <v-btn v-if="getLoggedIn == false" icon>
                        <v-icon color="orange" @click="login()"
                            >mdi-login</v-icon
                        >
                    </v-btn>
                </div>
                <div v-else>
                    <v-avatar>
                        <img :src="photoURL" :alt="displayName" />
                    </v-avatar>
                    <v-btn icon>
                        <v-icon color="green" @click="logout()"
                            >mdi-logout</v-icon
                        >
                    </v-btn>
                </div>
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
                        <v-list-item-subtitle
                            v-text="countSteps(spinningActivity)"
                        ></v-list-item-subtitle>
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
                    <v-flex
                        color="indigo"
                        dark
                        py-3
                        text-xs-center
                        white--text
                        xs12
                    >
                        <v-icon
                            v-if="getLoggedIn == true"
                            color="green"
                            @click="addCyclingActivity()"
                            >mdi-plus</v-icon
                        >
                    </v-flex>
                </v-layout>
            </v-footer>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";

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
            fetchSpinningActivities:
                "spinningActivities/fetchSpinningActivities",
            addSpinningActivity: "spinningActivities/addSpinningActivity",
            unsetUser: "auth/unsetUser"
        }),
        login: function() {
            this.$router.push("/auth");
        },
        logout: function() {
            firebase.auth().signOut();
            this.unsetUser();
            this.$router.push("/auth");
        },
        addCyclingActivity: function() {
            this.busyAddNewSpinningActivity = true;
            var moment = require("moment");
            var name = moment().format("dddd - MMM Do YYYY");
            this.addSpinningActivity({ icon: name[0], name: name }).then(
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
        }
    },

    computed: {
        ...mapGetters({
            spinningActivities: "spinningActivities/getSpinningActivities",
            spinningActivity: "spinningActivities/getSpinningActivity",
            getLoggedIn: "auth/getLoggedIn",
            displayName: "auth/getDisplayName",
            photoURL: "auth/getPhotoURL"
        })
    }
};
</script>