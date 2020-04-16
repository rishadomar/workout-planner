<template>
    <div id="step-component">
        <v-list-item>
            <v-avatar color="orange" size="40">
                <span class="white--text headline">{{ step.number }}</span>
            </v-avatar>

            <v-list-item-content class="non-draggable">
                <v-list-item-title v-text="step.name"></v-list-item-title>
                <v-list-item-subtitle>
                    Intensity: {{ step.intensity }}. {{ step.seconds }} seconds.
                    {{ step.rpm }} RPM
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="non-draggable">
                <v-btn
                    icon
                    :disabled="!isEditable"
                    @click.stop="showEditStepDialog = true"
                >
                    <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                </v-btn>
            </v-list-item-action>

            <EditStepDialog
                :spinningActivity="spinningActivity"
                :step="step"
                :visible="isEditable && showEditStepDialog"
                @close="showEditStepDialog = false"
            ></EditStepDialog>
        </v-list-item>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditStepDialog from "@/views/EditStepDialog.vue";

export default {
    name: "Step",

    components: {
        EditStepDialog
    },

    props: {
        spinningActivity: {
            type: Object,
            required: true
        },
        step: {
            type: Object,
            required: true
        },
        isEditable: {
            type: Boolean,
            required: true
        }
    },

    created() {},

    data() {
        return {
            showEditStepDialog: false
        };
    },

    methods: {
        ...mapActions({})
    },

    computed: {
        ...mapGetters({}),

        showDialog: {
            get() {
                return this.visible;
            },
            set(value) {
                if (!value) {
                    this.$emit("close");
                }
            }
        }
    }
};
</script>

<style>
</style>
