const state = {
	loggedIn: false,
	displayName: null,
	email: null,
	photoURL: null
}

const mutations = {
	SET_USER(state, payload) {
		if (payload == null) {
			state.displayName = null
			state.email = null
			state.photoURL = null
			state.loggedIn = false
		} else {
			state.displayName = payload.displayName
			state.email = payload.email
			state.photoURL = payload.photoURL
			state.loggedIn = true
		}
	},
}

const actions = {
	setUser(context, params) {
		context.commit('SET_USER', params.user)
		localStorage.setItem('user', JSON.stringify({
			displayName: params.user.displayName,
			email: params.user.email,
			photoURL: params.user.photoURL
		}))
	},
	unsetUser(context) {
		context.commit('SET_USER', null)
		localStorage.removeItem('user')
	},
}

const getters = {
	getLoggedIn(state) {
		return state.loggedIn
	},
	getDisplayName(state) {
		return state.displayName
	},
	getEmail(state) {
		return state.email
	},
	getPhotoURL(state) {
		return state.photoURL
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
