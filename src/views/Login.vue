<template>
    <div id="login-component">
        <div v-if="getLoggedIn == false">
            <v-btn v-if="getLoggedIn == false" icon>
                <v-icon color="orange" @click="login()">mdi-login</v-icon>
            </v-btn>
        </div>
        <div v-else>
            <div v-if="photoURL != null && photoURL.length > 0">
                <v-avatar>
                    <img :src="photoURL" :alt="displayName" />
                </v-avatar>
            </div>
            <div v-else>
                <v-avatar>
                    <span class="white--text headline">{{
                        displayName[0]
                    }}</span>
                </v-avatar>
            </div>
            <v-btn icon>
                <v-icon color="green" @click="logout()">mdi-logout</v-icon>
            </v-btn>
        </div>
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