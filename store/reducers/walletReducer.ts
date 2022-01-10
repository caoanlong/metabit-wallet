import { AnyAction } from "redux"
import { NetworkMap, NETWORK_MAP } from "../../config"
import { 
    ADD_CHILD_WALLET, 
    CREATE_WALLET, 
    DEL_WALLET,
    CLEAR_WALLET,  
    CHANGE_WALLET,
    SET_WALLET,
    ADD_TOKEN,
    DEL_TOKEN,
    SET_NETWORK_TYPE,
    RESET_NETWORK_TYPE,
    SET_TOKEN
} from "../constants"

export interface WalletState {
    wallets: HDWallet[],
    selectedWallet: HDWallet | undefined,
    networkType: string,
    networkMap: NetworkMap,
    tokenMap: TokenMap
}

const initState: WalletState = {
    wallets: [],
    selectedWallet: undefined,
    networkType: 'mainnet',
    networkMap: { ...NETWORK_MAP },
    tokenMap: {}
}

const reducer = (state: WalletState = initState, action: AnyAction) => {
    switch (action.type) {
        case CREATE_WALLET:
            return { 
                ...state, 
                wallets: [ ...state.wallets, ...action.payload ]
            }
        case ADD_CHILD_WALLET:
            return { ...state, wallets: [ ...state.wallets, ...action.payload ] }
        case CHANGE_WALLET:
            /**
             * 每次切换只能展示一种币种的钱包，因为需要切换主网与各种测试网络
             */
            return { ...state, selectedWallet: action.payload }
        case SET_WALLET:
            const wallet: HDWallet = action.payload
            for (let i = 0; i < state.wallets.length; i++) {
                if (wallet.publicKey === state.wallets[i].publicKey) {
                    state.wallets[i].alias = wallet.alias
                }
            }
            return { ...state, wallets: [...state.wallets] }
        case DEL_WALLET:
            return { ...state, wallets: action.payload }
        case CLEAR_WALLET:
            return { ...initState }
        case ADD_TOKEN:
            return { ...state, tokenMap: action.payload }
        case DEL_TOKEN:
            return { ...state, tokenMap: action.payload }
        case SET_NETWORK_TYPE:
            return { ...state, networkType: action.payload }
        case RESET_NETWORK_TYPE:
            return { ...initState }
        case SET_TOKEN:
            state.networkMap[state.selectedWallet?.chain as string][state.networkType].tokens = action.payload
            return { ...state, networkMap: { ...state.networkMap } }
        default:
            return state
    }
}

export default reducer