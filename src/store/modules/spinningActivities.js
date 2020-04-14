import firebase from "firebase";

const state = {
	spinningActivities: {},
	spinningActivitySteps: [],
	spinningActivity: {}
}

const mutations = {
	UPDATE_DETAILS(state, payload) {
		state.spinningActivities = payload;
	},

	UPDATE_SPINNING_ACTIVITY_STEPS(state, payload) {
		state.spinningActivitySteps = payload;
	},

	UPDATE_SPINNING_ACTIVITY(state, payload) {
		state.spinningActivity = payload
	},

	DELETE_SPINNING_ACTIVITY(state) {
		state.spinningActivity = {}
	},

	UPDATE_SPINNING_ACTIVITY_NAME(state, payload) {
		state.spinningActivity.name = payload.name
		state.spinningActivity.icon = payload.icon
		state.spinningActivity.public = payload.public
	},

	ADD_STEP(state, payload) {
		state.spinningActivity.steps.push(payload)
	},

	UPDATE_STEP(state, payload) {
		var foundStep = state.spinningActivity.steps.find(step => step.id === payload.step.id)
		foundStep.name = payload.step.name
		foundStep.intensity = payload.step.intensity
		foundStep.seconds = payload.step.seconds
		foundStep.rpm = payload.step.rpm
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
			state.spinningActivity.steps.splice(s, 1)
		} else {
			alert("Deleting spinning activity from state failed.")
		}
	}
}

const actions = {
	fetchSpinningActivities(context, params) {
		let db = firebase.firestore();
		var dbCollection = db.collection("SpinningActivities")
		var query = null
		if (params.userEmail != null) {
			query = dbCollection.where('userEmail', '==', params.userEmail)
		} else {
			query = dbCollection.where('public', '==', true)
		}
			//.orderBy('createdAt', 'desc')
		query
			.get()
			.then(function (querySnapshot) {
				let spinningActivities = [];
				querySnapshot.forEach(function (doc) {
					let data = doc.data();
					spinningActivities.push({
						id: doc.id,
						name: data.name,
						icon: data.icon,
						public: data.public,
						createdAt: data.createdAt,
					})
					context.commit('UPDATE_DETAILS', spinningActivities);
				});
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	},

	fetchSpinningActivity(context, params) {
		let db = firebase.firestore();
		var documentReference = db.collection("SpinningActivities").doc(params.documentId);
		// var currentSpiningActivity = context.getters.getSpinningActivity(context.state);
		// if (currentSpiningActivity != null && currentSpiningActivity.id == params.documentId) {
		// 	return;
		// }
		let spinningActivity = {};
		return documentReference.get()
			.then(document => {
				spinningActivity = document.data();
				spinningActivity.id = document.id;
			})
			.then(async () => {
				const querySnapshot = await db.collection("SpinningActivities").doc(params.documentId).collection("steps")
					.orderBy('number', 'asc')
					.get();
				let steps = [];
				querySnapshot.forEach(function (doc) {
					let data = doc.data();
					steps.push({
						id: doc.id,
						name: data.name,
						number: parseInt(data.number),
						rpm: parseInt(data.rpm),
						seconds: parseInt(data.seconds),
						intensity: data.intensity
					});
				});
				spinningActivity.steps = steps;
				context.commit('UPDATE_SPINNING_ACTIVITY', spinningActivity);
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	},

	addSpinningActivity(context, values) {
		let db = firebase.firestore();
		values['createdAt'] = firebase.firestore.FieldValue.serverTimestamp();
		return db.collection("SpinningActivities")
			.add(values);
	},

	updateStepNumbers(context, params) {
		let db = firebase.firestore();
		var spinningActivityId = params.spinningActivityId
		var steps = params.steps
		steps.forEach(step => {
			db.collection("SpinningActivities").doc(spinningActivityId).collection('steps').doc(step.id)
				.update({number: step.number})
		})
		return new Promise((success) => { success([]) })
	},

	addStep(context, params) {
		let db = firebase.firestore();
		params.newStep['createdAt'] = firebase.firestore.FieldValue.serverTimestamp();
		db.collection("SpinningActivities").doc(params.documentId).collection('steps')
			.add(params.newStep)
			.then((document) => {
				params.newStep.id = document.id
				context.commit('ADD_STEP', params.newStep)
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	},

	editStep(context, params) {
		let db = firebase.firestore();
		db.collection("SpinningActivities").doc(params.activityId).collection('steps')
			.doc(params.step.id)
			.update({
				name: params.step.name,
				intensity: params.step.intensity,
				seconds: params.step.seconds,
				rpm: params.step.rpm
			})
			.then((document) => {
				params.newStep.id = document.id
				context.commit('UPDATE_STEP', params.newStep)
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	},

	deleteStep(context, params) {
		let db = firebase.firestore();
		if (params.activityId == undefined) {
			return
		}
		if (params.step == undefined) {
			return
		}

		db.collection("SpinningActivities")
			.doc(params.activityId)
			.collection('steps')
			.doc(params.step.id)
			.delete()
			.then(() => {
				context.commit('DELETE_STEP', params.step.id)
				var steps = context.state.spinningActivity.steps
                steps.forEach(step => {
                    if (step.number > params.step.number) {
                        step.number -= 1;
                    }
                });
                return this.updateStepNumbers({
                    spinningActivityId: params.activityId,
                    steps: steps
                });
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	},

	updateSpinningActivity(context, params) {
		let db = firebase.firestore();
		if (params.spinningActivityId == undefined) {
			return
		}
		db.collection("SpinningActivities")
			.doc(params.spinningActivityId)
			.update({name: params.name, icon: params.icon, public: params.public})
			.then(() => {
				context.commit('UPDATE_SPINNING_ACTIVITY_NAME', { name: params.name, icon: params.icon, public: params.public })
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});

	},

	deleteSpinningActivity(context, params) {
		let db = firebase.firestore();
		if (params.spinningActivityId == undefined) {
			return
		}
		return db.collection("SpinningActivities")
			.doc(params.spinningActivityId)
			.delete()
			.then(() => {
				context.commit('DELETE_SPINNING_ACTIVITY')
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	}

}

const getters = {
	getSpinningActivities(state) {
		return state.spinningActivities;
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
