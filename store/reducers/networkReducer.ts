import { AnyAction } from "redux"
import { NetworkMap, NETWORK_MAP } from "../../config"
import { SET_NETWORK_TYPE, RESET_NETWORK_TYPE } from "../constants"

interface NetworkState {
    networkType: string,
    networkMap: NetworkMap
}

const initState: NetworkState = {
    networkType: 'mainnet',
    networkMap: { ...NETWORK_MAP }
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