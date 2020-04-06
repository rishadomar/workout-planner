<template lang="html">
    <div id="auth-component">
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <Back></Back>
                <v-toolbar-title>Spinning</v-toolbar-title>
            </v-toolbar>
            <p>Signing in will allow you to add your own Activities and share them</p>
            <p>It will record History</p>
            <section id="firebaseui-auth-container"></section>
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
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import Back from "@/views/Back.vue";

export default {
    name: "auth",

    components: {
        Back
    },

    mounted() {
        var uiConfig = {
            signInSuccessUrl: "/success",
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ]
        };
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        ui.start("#firebaseui-auth-container", uiConfig);
    },

    methods: {
    }
};
</script>