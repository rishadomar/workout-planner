<template lang="html">
    <div id="auth-component">
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <v-btn icon>
                    <v-icon color="white" @click="navigateBack()">mdi-keyboard-backspace</v-icon>
                </v-btn>
                <v-toolbar-title>Spinning</v-toolbar-title>
            </v-toolbar>
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

export default {
    name: "auth",
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
        navigateBack: function() {
            this.$router.go(-1)
        }

    }
};
</script>