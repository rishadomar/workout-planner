import firebase from "firebase";

const state = {
	details: {},
	spinningActivitySteps: [],
	spinningActivity: {}
}

const mutations = {
	UPDATE_DETAILS(state, payload) {
		state.details = payload;
	},

	UPDATE_SPINNING_ACTIVITY_STEPS(state, payload) {
		state.spinningActivitySteps = payload;
	},

	UPDATE_SPINNING_ACTIVITY(state, payload) {
		state.spinningActivity = payload
	},

	ADD_STEP(state, payload) {
		state.spinningActivity.steps.push(payload)
	},

	DELETE_STEP(state, payload) {
		let found = false;
		for (var s = 0; s < state.spinningActivity.steps.length; s++) {
			if (state.spinningActivity.steps[s].id == payload) {
				found = true;
				break;
			}
		}
		if (found) {
			console.log('deleted the step from store')
			state.spinningActivity.steps.splice(s, 1)
		} else {
			console.log('COULD not find the step to delete from store: ', payload)
		}
	}
}

const actions = {
	fetchSpinningActivities(context) {
		let db = firebase.firestore();
		db.collection("SpinningActivities")
			.get()
			.then(function (querySnapshot) {
				let spinningActivities = [];
				querySnapshot.forEach(function (doc) {
					// doc.data() is never undefined for query doc snapshots
					let data = doc.data();
					spinningActivities.push({
						id: doc.id,
						name: data.name,
						icon: data.icon
					})
					console.log('commit', doc.id, doc.data());
					context.commit('UPDATE_DETAILS', spinningActivities);
				});
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	},

	fetchSpinningActivity(context, params) {
		let db = firebase.firestore();
		var documentReference = db.collection("SpinningActivities").doc(params.documentId);
		let spinningActivity = {};
		documentReference.get()
			.then(document => {
				console.log("Successful fetch of document: " + params.documentId)
				spinningActivity = document.data();
				spinningActivity.id = document.id;
			})
			.then(() => {
				db.collection("SpinningActivities").doc(params.documentId).collection("steps")
					.get()
					.then(function (querySnapshot) {
						let steps = []
						querySnapshot.forEach(function (doc) {
							let data = doc.data();
							steps.push({
								id: doc.id,
								name: data.name,
								rpm: data.rpm,
								seconds: data.seconds,
								intensity: data.intensity
							})
						})
						spinningActivity.steps = steps;
						console.log('commit steps', spinningActivity);
						context.commit('UPDATE_SPINNING_ACTIVITY', spinningActivity)
				})
			})
			.catch(function (error) {
				console.log("Error getting spinning activity id:" + params.documentId + " Reason: " , error);
			});
	},

	addSpinningActivity(context, values) {
		let db = firebase.firestore();
		return db.collection("SpinningActivities")
			.add(values);
			// .then(function (documentReference) {
			// 	console.log("New spinning activity saved: " + documentReference.id);
			// })
			// .catch(function (error) {
			// 	console.log("Error writing spinning activity: ", error);
			// });
	},

	addStep(context, params) {
		let db = firebase.firestore();
		db.collection("SpinningActivities").doc(params.documentId).collection('steps')
			.add(params.newStep)
			.then((document) => {
				params.newStep.id = document.id
				context.commit('ADD_STEP', params.newStep)
				console.log("New step saved: " + document.id)
			})
			.catch(function (error) {
				console.log("Error writing new step: ", error);
			});
	},

	deleteStep(context, params) {
		let db = firebase.firestore();
		if (params.spinningActivityId == undefined) {
			console.log('Eeeeek no spinning activity specified')
			return
		}
		if (params.stepId == undefined) {
			console.log('Eeeeek no step id specified')
			return
		}
		db.collection("SpinningActivities")
			.doc(params.spinningActivityId)
			.collection('steps')
			.doc(params.stepId)
			.delete()
			.then(() => {
				context.commit('DELETE_STEP', params.stepId)
				console.log("step deleted")
			})
			.catch(function (error) {
				console.log("Error deleting step: ", error);
			});
	}

}

const getters = {
	getSpinningActivities(state) {
		return state.details;
	},
	getSpinningActivity(state) {
		return state.spinningActivity;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
