export const setProfileOpened = (bool) => {
    return {
        type: 'SET_PROFILE_OPENED',
        payload: bool
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}