export const addGroup = (group) => ({ type: 'ADD_GROUP', payload: group });
export const updateGroup = (group) => ({ type: 'UPDATE_GROUP', payload: group });
export const deleteGroup = (id) => ({ type: 'DELETE_GROUP', payload: id });
export const updateNavigation = (navigation) => ({ type: 'UPDATE_NAVIGATION', payload: navigation });
export const setAuthenticated = (authenticated) => ({ type: 'SET_AUTHENTICATED', payload: authenticated });
export const setGroups = (groups) => ({ type: 'SET_GROUPS', payload: groups });
export const setNews = (news) => ({ type: 'SET_NEWS', payload: news});
export const deleteNews = (id) => ({ type: 'DELETE_NEWS', payload: id });