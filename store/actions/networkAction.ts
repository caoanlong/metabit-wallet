import { Dispatch, AnyAction } from "redux"
import { SET_NETWORK_TYPE } from "../constants"


export const setNetworkType = (type: string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({
            type: SET_NETWORK_TYPE,
            payload: type
        })
    }
}