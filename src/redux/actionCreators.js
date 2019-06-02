import { CHANGE_INPUT_URL, 
    UPDATE_FACE_BOXES,
    RESET_APP,
    CHANGE_ROUTE,
    CHANGE_SIGNED_IN_STATUS,
    UPDATE_USER } 
    from './actionTypeConstants';

export const onInputChange = (url) => {
    return {
        type: CHANGE_INPUT_URL,
        payload: url
    }
}

export const onBoxUpdate = (boxList) =>{
    return {
        type: UPDATE_FACE_BOXES,
        payload: boxList
    }
}

export const onAppReset = () => {
    return{
        type: RESET_APP
    }
}

export const changeRoute = (route) =>{
    return {
        type: CHANGE_ROUTE,
        payload: route
    }
}

export const changeSignedInStatus = (isSignedIn) =>{
    return {
        type: CHANGE_SIGNED_IN_STATUS,
        payload: isSignedIn
    }
}

export const updateUser = (user) =>{
    return {
        type: UPDATE_USER,
        payload: user
    }
}