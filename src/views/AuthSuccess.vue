<template>
    <div>
        <h1>Signup succeeded</h1>
        <button @click="logOut">Log out</button>
        <hr />
        <div v-if="user != null">
            <img :src="user.photoURL" style="height:120px" /> <br />
            <p>{{ user.displayName }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.uid }}</p>
            <hr />
            <pre>{{ user }}</pre>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            user: null
        };
    },

    mounted() {
        this.user = firebase.auth().currentUser;
        console.log("in created: success " + JSON.stringify(this.user));
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            }
        });
    },

    methods: {
        logOut(e) {
            e.stopPropagation();
            firebase.auth().signOut();
        }
    }
};
</script>