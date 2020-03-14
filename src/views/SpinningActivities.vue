<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-list three-line>
                <v-btn dark fab bottom right color="green" @click="addCyclingActivity()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

                <template v-for="(spinningActivity, index) in spinningActivities">
                    <v-list-item :key="spinningActivity.id">
                        <v-avatar color="orange" size="40">
                            <span class="white--text headline">{{spinningActivity.icon}}</span>
                        </v-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-html="spinningActivity.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="index" :inset="false"></v-divider>
                </template>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "HelloWorld",

    created() {
        this.fetchSpinningActivities();
    },

    methods: {
        ...mapActions({
            fetchSpinningActivities:
                "spinningActivities/fetchSpinningActivities"
        })
    },

    computed: {
        ...mapGetters("spinningActivities", {
            spinningActivities: "getSpinningActivities"
        })
    }
    // methods: {
    //   say: function(message) {
    //     alert(message);
    //   },
    //   addCyclingActivity: function() {
    //     alert("Hello");
    //   }
    // },

    // data: () => ({
    //   items: [
    //     { header: "History" },
    //     {
    //       avatar: "/assets/mountain-road.jpg",
    //       title: "Uphill slog",
    //       subtitle:
    //         "<span class='text--primary'>45 mins</span> &mdash; 3 days ago"
    //     },
    //     { divider: true, inset: true },
    //     {
    //       avatar: "/assets/mountain-calm.jpg",
    //       title: "Mountain undulating",
    //       subtitle:
    //         "<span class='text--primary'>30 mins</span> &mdash; 6 days ago"
    //     },
    //     { divider: true, inset: true },
    //     {
    //       avatar: "/assets/mountain-road.jpg",
    //       title: "Uphill slog",
    //       subtitle:
    //         "<span class='text--primary'>43 mins</span> &mdash; 8 days ago"
    //     },
    //     {
    //       avatar: "/assets/mountain-road.jpg",
    //       title: "Uphill slog",
    //       subtitle:
    //         "<span class='text--primary'>45 mins</span> &mdash; 3 days ago"
    //     },
    //     { divider: true, inset: true },
    //     {
    //       avatar: "/assets/mountain-calm.jpg",
    //       title: "Mountain undulating",
    //       subtitle:
    //         "<span class='text--primary'>30 mins</span> &mdash; 6 days ago"
    //     },
    //     { divider: true, inset: true },
    //     {
    //       avatar: "/assets/mountain-road.jpg",
    //       title: "Uphill slog",
    //       subtitle:
    //         "<span class='text--primary'>43 mins</span> &mdash; 8 days ago"
    //     }
    //   ]
    // })
};
</script>