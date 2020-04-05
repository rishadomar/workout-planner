<template>
    <div id="profile-component">
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <v-toolbar-title>Welcome</v-toolbar-title>
                <v-btn icon>
                    <v-icon color="green" @click="logout()">mdi-logout</v-icon>
                </v-btn>
            </v-toolbar>

            <section v-if="getLoggedIn != null">
                <img :src="photoURL" style="height:120px" /> <br />
                <p>{{ displayName }}</p>
                <p>{{ email }}</p>
            </section>

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
                    </v-flex>
                </v-layout>
            </v-footer>
        </v-card>
    </div>
</template>

<script>
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";
export default {
    mounted() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setUser({user: user})
                this.$router.push('/spinningActivities')
            }
        });
    },

    methods: {
        ...mapActions({
            setUser: "auth/setUser",
            unsetUser: "auth/unsetUser"
        }),
        logout() {
            firebase.auth().signOut();
            this.unsetUser()
            this.$router.push("/auth");
        }
    },

    computed: {
        ...mapGetters({
            getLoggedIn: "auth/getLoggedIn",
            displayName: "auth/getDisplayName",
            email: "auth/getEmail",
            photoURL: "auth/getPhotoURL",
        })
    }
};
</script>