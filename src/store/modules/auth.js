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
		return state.loggedIn ? state.loggedIn : true
//		return state.loggedIn ... force logged in
	},
	getDisplayName(state) {
		return state.displayName ? state.displayName : 'Test'
		// return state.displayName ... force logged in
	},
	getEmail(state) {
		return state.email ? state.email : 'test@getEmail.com'
		// return state.email ... force logged in
	},
	getPhotoURL(state) {
		return state.photoUrl ? state.photoUrl : null
		//return state.photoURL ... force logged in
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
