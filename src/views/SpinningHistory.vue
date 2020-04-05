<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <v-toolbar-title>Spinning History</v-toolbar-title>
                <v-spacer></v-spacer>
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
                    v-for="spinningHistoryEntry in spinningHistory"
                        :key="spinningHistoryEntry.id"
                >
                    <v-avatar color="orange" size="40">
                        <span class="white--text headline">{{spinningHistoryEntry.icon}}</span>
                    </v-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{spinningHistoryEntry.logText}} {{spinningHistoryEntry.percentageDone}}%</v-list-item-title>
                        <v-list-item-subtitle>{{ spinningHistoryEntry.createdAt | formatDateTime }} {{spinningHistoryEntry.userEmail}}</v-list-item-subtitle>
                    </v-list-item-content>

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
                            color="green"
                            @click="showActivities()"
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
    name: "SpinningHistory",

    created() {
        this.fetchSpinningHistory({userEmail: this.userEmail});
    },

    data() {
        return {
        };
    },

    methods: {
        ...mapActions({
            fetchSpinningHistory: "spinningHistory/fetchSpinningHistory",
            unsetUser: "auth/unsetUser"
        }),

        showActivities: function() {
            this.$router.push({
                path: '/spinningActivities'
            })
        },

        logout: function() {
            firebase.auth().signOut();
            this.unsetUser();
            this.$router.push("/auth");
        },
    },

    computed: {
        ...mapGetters({
            spinningHistory: "spinningHistory/getSpinningHistory",
            getLoggedIn: "auth/getLoggedIn",
            displayName: "auth/getDisplayName",
            photoURL: "auth/getPhotoURL",
            userEmail: "auth/getEmail"
        }),

    }
};
</script>