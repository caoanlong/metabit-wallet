import { AnyAction } from "redux"
import { MAINNET } from "../../config"
import { SET_NETWORK_TYPE, RESET_NETWORK_TYPE } from "../constants"

interface NetworkState {
    networkType: string
}

const initState: NetworkState = {
    networkType: MAINNET,
}

const reducer = (state: NetworkState = initState, action: AnyAction) => {
    switch (action.type) {
        case SET_NETWORK_TYPE:
            return { ...state, networkType: action.payload }
        case RESET_NETWORK_TYPE:
            return { ...initState }
        default:
            return state
    }
}

export default reducer