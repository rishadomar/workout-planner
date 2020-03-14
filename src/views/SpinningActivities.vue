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

        <v-dialog v-model="showAddSpinningActivityModal" persistent max-width="600px">
            <!-- <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template>-->
            <v-card>
                <v-card-title>
                    <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Legal first name*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="Legal middle name"
                                    hint="example of helper text only on focus"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="Legal last name*"
                                    hint="example of persistent helper text"
                                    persistent-hint
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Email*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Password*" type="password" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select
                                    :items="['0-17', '18-29', '30-54', '54+']"
                                    label="Age*"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete
                                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                    label="Interests"
                                    multiple
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="showAddSpinningActivityModal = false"
                    >Close</v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="showAddSpinningActivityModal = false"
                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "HelloWorld",

    created() {
        this.fetchSpinningActivities();
    },

    data() {
        return {
            showAddSpinningActivityModal: false,
            comment: {
                content: ""
            }
        };
    },

    methods: {
        ...mapActions({
            fetchSpinningActivities:
                "spinningActivities/fetchSpinningActivities"
        }),
        addCyclingActivity: function() {
            this.showAddSpinningActivityModal = true;
        },
        closeAddSpinningActivityModal: function() {
            this.showAddSpinningActivityModal = false;
        }
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