import { AnyAction } from "redux"
import { 
    ADD_CHILD_WALLET, 
    CREATE_WALLET, 
    DEL_WALLET,
    CLEAR_WALLET,  
    CHANGE_WALLET,
    ADD_TOKEN,
    DEL_TOKEN
} from "../constants"

export interface WalletState {
    wallets: HDWallet[],
    selectedWallet: HDWallet | undefined,
    tokenMap: TokenMap
}

const initState: WalletState = {
    wallets: [],
    selectedWallet: undefined,
    tokenMap: {}
}

const reducer = (state: WalletState = initState, action: AnyAction) => {
    switch (action.type) {
        case CREATE_WALLET:
            return { 
                ...state, 
                wallets: [ ...state.wallets, action.payload ]
            }
        case ADD_CHILD_WALLET:
            return { ...state }
        case CHANGE_WALLET:
            /**
             * 每次切换只能展示一种币种的钱包，因为需要切换主网与各种测试网络
             */
            return { ...state, selectedWallet: action.payload }
        case DEL_WALLET:
            return { ...state, wallets: action.payload }
        case CLEAR_WALLET:
            return { ...initState }
        case ADD_TOKEN:
            return { ...state, tokenMap: action.payload }
        case DEL_TOKEN:
            return { ...state, tokenMap: action.payload }
        default:
            return state
    }
}

export default reducer