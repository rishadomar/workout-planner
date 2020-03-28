<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="cyan" dark>
                <v-toolbar-title>Spinning History</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn dark fab bottom right color="green" @click="showActivities()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
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
                        <v-list-item-subtitle>{{ spinningHistoryEntry.createdAt | formatDateTime }}</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import moment from "moment";

export default {
    name: "SpinningHistory",

    created() {
        this.fetchSpinningHistory();
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
        }
    },

    computed: {
        ...mapGetters("spinningHistory", {
            spinningHistory: "getSpinningHistory"
        }),

    }
};
</script>