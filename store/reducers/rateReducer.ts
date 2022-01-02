import { AnyAction } from "redux"
import { SET_RATE } from "../constants"

export interface RateState {
    ETH: number,
    USDT: number,
    USDC: number,
    BUSD: number,
    LINK: number,
    DAI: number,
    WBTC: number,
    YFI: number,
    UNI: number
}

const initState: RateState = {
    ETH: 4500,
    USDT: 1,
    USDC: 1,
    BUSD: 600,
    LINK: 1,
    DAI: 1,
    WBTC: 1,
    YFI: 1,
    UNI: 1
}

const reducer = (state: RateState = initState, action: AnyAction) => {
    switch (action.type) {
        case SET_RATE:
            return { ...state, [action.payload.symbol]: action.payload.rate}
        default:
            return state
    }
}

export default reducer