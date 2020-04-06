<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <v-toolbar-title>Spinning History</v-toolbar-title>
                <v-spacer></v-spacer>
                <Login></Login>
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
                    <v-btn
                        color="blue-grey"
                        class="ma-2 white--text"
                        @click="showActivities()"
                        >Record an Activity
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
    name: "SpinningHistory",

    components: {
        Login,
    },

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
        }),

        showActivities: function() {
            this.$router.push({
                path: '/spinningActivities'
            })
        },
    },

    computed: {
        ...mapGetters({
            spinningHistory: "spinningHistory/getSpinningHistory",
            userEmail: "auth/getEmail"
        }),

    }
};
</script>