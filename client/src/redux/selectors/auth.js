export const getIsAuthed = state => !!state.auth.token
export const getError = state => state.auth.error
export const getAlert = state => state.auth.alert
export const getIsRegistered = state => state.auth.isRegistered