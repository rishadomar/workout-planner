<template>
    <v-app>
        <v-content>
            <SpinningActivities />
        </v-content>
    </v-app>
</template>

<script>
import SpinningActivities from "@/views/SpinningActivities.vue";
export default {
    name: "App",

    components: {
        SpinningActivities
    },

    data: () => ({
        //
    })
};
</script>
