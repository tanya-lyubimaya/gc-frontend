export function updateUserData(state, userData) {
  state.data = userData;
}

export function updateUserDynamicRoles(state, dynamicRoles) {
  state.dynamicRoles = dynamicRoles;
}

export function updateSharedInfoToken(state, sharedInfoToken) {
  state.sharedInfoToken = sharedInfoToken;
}

export function setLoggedIn(state, loggedIn) {
  state.loggedIn = loggedIn;
}

