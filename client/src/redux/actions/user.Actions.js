import { Constants } from "../Constants"

export const userLoggedIn = user => {
    return {
        type : Constants.USER_LOGGED_IN,
        payload : user
    }
}

export const userLoggedInFail = error => {
    return {
        type : Constants.USER_LOGGED_IN_FAIL,
        payload : error
    }
}

export const userLoggedOut = () => {
    return {
        type : Constants.USER_LOGGED_OUT,
    }
}

export const userRegisterSuccess = (user) => {
    return {
        type : Constants.USER_REGISTER_SUCCESS,
        payload : user
    }
}

export const userRegisterFail = (error) => {
    return {
        type : Constants.USER_REGISTER_FAIL,
        payload : error
    }
}

export const changeToUser = user => {
    return {
        type : Constants.CHANGE_TO_USER,
        payload : user
    }
}

export const commonError = (error) => {
    return {
        type : Constants.COMMON_FAIL,
        payload : error
    }
}