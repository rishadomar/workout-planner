import firebase from "firebase";

const state = {
	spinningHistory: {},
}

const mutations = {
	UPDATE_DETAILS(state, payload) {
		state.spinningHistory = payload;
	},

	ADD_STEP(state, payload) {
		state.spinningHistoryEntry.steps.push(payload)
	},
}

const actions = {
	fetchSpinningHistory(context) {
		let db = firebase.firestore();
		db.collection("SpinningHistory")
			.orderBy('createdAt', 'desc')
			.get()
			.then(function (querySnapshot) {
				let spinningHistory = [];
				querySnapshot.forEach(function (doc) {
					// doc.data() is never undefined for query doc snapshots
					let data = doc.data();
					spinningHistory.push({
						id: doc.id,
						spinningActivity: data.spinningActivity,
						icon: data.icon,
						logText: data.logText,
						percentageDone: data.percentageDone,
						createdAt: data.createdAt
					})
					context.commit('UPDATE_DETAILS', spinningHistory);
				});
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	},

	addSpinningHistoryEntry(context, { spinningActivity, percentageDone }) {
		let db = firebase.firestore();
		const values = {
			logText: spinningActivity.name,
			icon: spinningActivity.icon,
			percentageDone: percentageDone,
			spinningActivity: spinningActivity.id,
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		}
		return db.collection("SpinningHistory")
			.add(values);
	},
}

const getters = {
	getSpinningHistory(state) {
		return state.spinningHistory;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
