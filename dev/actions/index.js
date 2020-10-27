export const addGroup = (group) => ({ type: 'ADD_GROUP', payload: group });
export const updateGroup = (group) => ({ type: 'UPDATE_GROUP', payload: group });
export const deleteGroup = (id) => ({ type: 'DELETE_GROUP', payload: id });
export const updateNavigation = (navigation) => ({ type: 'UPDATE_NAVIGATION', payload: navigation });
export const updateUsers = (users) => ({ type: 'UPDATE_USERS', payload: users});
export const setAuthenticated = (authenticated) => ({ type: 'SET_AUTHENTICATED', payload: authenticated });