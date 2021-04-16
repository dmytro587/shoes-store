export const getIsAuthed = state => !!state.auth.token
export const getError = state => state.auth.error
export const getIsRegistered = state => state.auth.isRegistered