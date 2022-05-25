import { AnyAction } from "redux"
import { 
    ADD_CHILD_WALLET, 
    CREATE_WALLET, 
    DEL_WALLET,
    CLEAR_WALLET,  
    CHANGE_WALLET,
    SET_WALLET,
    SET_NETWORK,
    SET_SELECTED_NETWORK,
    RESET_NETWORK_TYPE,
    SET_TOKEN
} from "../constants"

export interface WalletState {
    wallets: HDWallet[],
    selectedWallet: HDWallet,
    selectedNetwork: Network,
    networks: Network[],
    tokens: ContractToken[]
}

const initState: WalletState = {
    wallets: [],
    selectedWallet: {} as HDWallet,
    selectedNetwork: {} as Network,
    networks: [],
    tokens: []
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
            return { ...state, wallets: { ...action.payload } }
        case CLEAR_WALLET:
            return { ...initState }
        case SET_TOKEN:
            return { ...state, tokens: [...action.payload] }
        case SET_NETWORK:
            return { ...state, networks: [...action.payload] }
        case SET_SELECTED_NETWORK:
            return { ...state, selectedNetwork: action.payload }
        case RESET_NETWORK_TYPE:
            return { ...initState }
        default:
            return state
    }
}

export default reducer