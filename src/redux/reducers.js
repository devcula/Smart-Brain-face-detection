import {combineReducers} from 'redux';
import { CHANGE_INPUT_URL, 
    UPDATE_FACE_BOXES, 
    RESET_APP,
    CHANGE_ROUTE,
    CHANGE_SIGNED_IN_STATUS } 
    from './actionTypeConstants';

const initialInputUrlState = {
    inputUrl: ""
}

export const inputUrlChangeReducer = (state = initialInputUrlState, action = {}) =>{
    switch(action.type){
        case CHANGE_INPUT_URL:
            return Object.assign({}, state, { inputUrl: action.payload });
        default:
            return state;
    }
}

const initialBoxState = {
    boxes: []
}

export const updateBoxReducer = (state = initialBoxState, action={}) =>{
    switch(action.type){
        case UPDATE_FACE_BOXES:
            return Object.assign({}, state, { boxes: action.payload});
        default:
            return state;
    }
}

const initialRoute = {
    route: "signin"
}

export const changeRouteReducer = (state = initialRoute, action = {}) =>{
    switch(action.type){
        case CHANGE_ROUTE:
            return Object.assign({}, state, {route: action.payload});
        default:
            return state;
    }
}

const initialSignedInStatus = {
    isSignedIn: false
};

export const changeSignedInStatusReducer = (state = initialSignedInStatus, action = {}) =>{
    switch(action.type){
        case CHANGE_SIGNED_IN_STATUS:
            return Object.assign({}, state, {isSignedIn: action.payload});
        default:
            return state;
    }
}

export const appReducer = combineReducers({inputUrlChangeReducer, updateBoxReducer, changeRouteReducer, changeSignedInStatusReducer});

export const rootReducer = (state, action) =>{
    switch(action.type){
        case RESET_APP:
            return appReducer(undefined, action);
        default:
            return appReducer(state, action);
    }
}
