import { AnyAction } from "redux"
import { SET_PASSWORD, DEL_PASSWORD } from "../constants"

interface UserState {
    password: string
}

const initState: UserState = {
    password: ''
}

const reducer = (state: UserState = initState, action: AnyAction) => {
    switch (action.type) {
        case SET_PASSWORD:
            return { ...state, password: action.payload }
        case DEL_PASSWORD:
            return { ...initState }
        default:
            return state
    }
}

export default reducer