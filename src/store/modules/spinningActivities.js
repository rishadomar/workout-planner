import firebase from "firebase";

const state = {
	details: {},
	spinningActivitySteps: [],
}

const mutations = {
	UPDATE_DETAILS(state, payload) {
		state.details = payload;
	},

	UPDATE_SPINNING_ACTIVITY_STEPS(state, payload) {
		state.spinningActivitySteps = payload;
	},
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
	}
}

const getters = {
	getSpinningActivities(state) {
		return state.details;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
