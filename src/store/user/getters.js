export function userHSEEmail(state) {
  return state.data?.['hse_email'];
}

export function userGoogleEmail(state) {
  return state.data?.['google_email'];
}

export function userFullName(state) {
  return state.data?.['name']?.['full_name'];
}

export function userNameAbbr(state) {
  return (state.data?.['name']?.['first_name']?.[0] + state.data?.['name']?.['last_name']?.[0]);
}

export function thumbnailPhotoUrl(state) {
  return state.data?.['google_data']?.['thumbnailPhotoUrl'];
}

export function isStudent(state) {
  return state.dynamicRoles?.includes("STUDENT");
}


export function isLecturer(state) {
  return state.dynamicRoles?.includes("LECTURER");
}


export function isSuperAdmin(state) {
  return state.data?.['roles'].includes("SUPER_ADMIN");
}


export function isDeveloper(state) {
  return state.data?.['roles'].includes("DEVELOPER");
}


export function ruzGroup(state) {
  return state.data?.['ruz_data']?.['group'];
}


export function ruzDepartment(state) {
  return state.data?.['ruz_data']?.['department'];
}


export function roles(state) {
  return state.data?.['roles'] ?? [];
}

export function dynamicRoles(state) {
  return state.dynamicRoles ?? [];
}

export function authToken(state) {
  return state.data?.['auth_token'];
}
