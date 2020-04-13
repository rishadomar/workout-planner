<template>
    <div id="step-component">
        <v-list-item>
            <v-avatar color="orange" size="40">
                <span class="white--text headline">{{ step.number }}</span>
            </v-avatar>

            <v-list-item-content @click.stop="showEditStepDialog = true">
                <v-list-item-title v-text="step.name"></v-list-item-title>
                <v-list-item-subtitle
                    >{{ step.intensity }} - {{ step.seconds }} seconds.
                    {{ step.rpm }} RPM
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn icon :disabled="!isEditable" @click.native="deleteSpinningActivityStep()">
                    <v-icon color="grey lighten-1">mdi-delete</v-icon>
                </v-btn>
            </v-list-item-action>

            <EditStepDialog
                :activityId="activityId"
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
        activityId: {
            type: String,
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
        ...mapActions({
            editStep: "spinningActivities/editStep",
            deleteStep: "spinningActivities/deleteStep",
        }),

        saveStep: function() {
            this.editStep({
                activityId: this.activityId,
                step: this.step
            });
		},

        deleteSpinningActivityStep: function() {
			if (!this.isEditable) {
				return
			}
            this.deleteStep({
                activityId: this.activityId,
                step: this.step
            })
        },

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
