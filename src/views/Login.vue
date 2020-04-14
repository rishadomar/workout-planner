<template>
    <div id="login-component">
        <template v-if="getLoggedIn == false">
            <v-tooltip left>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" v-if="getLoggedIn == false" icon>
                        <v-icon color="orange" @click="login()"
                            >mdi-login</v-icon
                        >
                    </v-btn>
                </template>
                <span>Login</span>
            </v-tooltip>
        </template>
        <template v-else>
            <template v-if="photoURL != null && photoURL.length > 0">
                <v-avatar>
                    <img :src="photoURL" :alt="displayName" />
                </v-avatar>
            </template>
            <template v-else>
                <v-avatar>
                    <span class="white--text headline">{{
                        displayName[0]
                    }}</span>
                </v-avatar>
            </template>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" icon>
                        <v-icon color="green" @click="logout()">mdi-logout</v-icon>
                    </v-btn>
                </template>
                <span>Logout</span>
            </v-tooltip>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";

export default {
    name: "Login",

    data() {
        return {};
    },

    methods: {
        ...mapActions({
            unsetUser: "auth/unsetUser"
        }),

        login: function() {
            this.$router.push("/auth");
        },

        logout: function() {
            firebase.auth().signOut();
            this.unsetUser();
            this.$router.push("/auth");
        }
    },

    computed: {
        ...mapGetters({
            getLoggedIn: "auth/getLoggedIn",
            displayName: "auth/getDisplayName",
            photoURL: "auth/getPhotoURL",
            userEmail: "auth/getEmail"
        })
    }
};
</script>