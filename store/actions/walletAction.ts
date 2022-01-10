import { ethers, Wallet } from "ethers"
import { Dispatch, AnyAction } from "redux"
import { createWalletByMnemonic } from "../../utils"
import { createWalletByPrivateKey, deriveWallet } from "../../utils/wallet"
import { 
    ADD_TOKEN, 
    ADD_CHILD_WALLET, 
    CHANGE_WALLET, 
    CREATE_WALLET, 
    DEL_TOKEN,
    SET_NETWORK_TYPE
} from "../constants"

// const engine = WalletEngine.getInstance()
/**
 * 创建root钱包，默认派生btc和eth钱包地址
 * @param mnemonic 
 * @returns 
 */
export const createWallet = (mnemonic?: string, selected?: boolean) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const wallets: HDWallet[] = createWalletByMnemonic(mnemonic)
        dispatch({
            type: CREATE_WALLET,
            payload: wallets
        })
        if (selected) {
            dispatch({
                type: CHANGE_WALLET,
                payload: wallets[1]  // 默认选择 Ethereum 钱包
            })
            dispatch({
                type: SET_NETWORK_TYPE,
                payload: 'mainnet'
            })
        }
    }
}

/**
 * 派生子钱包
 * @param wallet 
 * @param coinType 
 * @returns 
 */
export const addChildWallet = (wallet: HDWallet, chain: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const children: HDWallet[] = getState().wallet.wallets.filter((item: HDWallet) => item.parentId === wallet.id)
        let index = 0
        if (children && children.length) {
            const indexes = children.filter((item: HDWallet) => item.chain === chain).map((item: HDWallet) => item.index)
            if (indexes && indexes.length) {
                const maxIndex = Math.max(...indexes)
                index = maxIndex + 1
            }
        }
        const child = deriveWallet(wallet, chain, index)
        dispatch({
            type: ADD_CHILD_WALLET,
            payload: [child]
        })
    }
}

/**
 * 根据私钥导入特定币种钱包
 * @param privateKey 
 * @param chain 
 * @returns 
 */
export const importWalletByPrivateKey = (privateKey: string, chain: string, selected?: boolean) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const wallets: HDWallet[] = getState().wallet.wallets.filter((item: HDWallet) => item.type !== -1 && !item.parentId && item.chain === chain)
        let index = 0
        if (wallets && wallets.length) {
            const maxIndex = Math.max(...wallets.map((item: HDWallet) => item.index))
            index = maxIndex + 1
        }
        const wallet: HDWallet = createWalletByPrivateKey(privateKey, chain, index)
        dispatch({
            type: CREATE_WALLET,
            payload: [wallet]
        })
        if (selected) {
            dispatch({
                type: CHANGE_WALLET,
                payload: wallet
            })
            dispatch({
                type: SET_NETWORK_TYPE,
                payload: 'mainnet'
            })
        }
    }
    
}

export const changeWallet = (wallet: HDWallet) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({
            type: CHANGE_WALLET,
            payload: wallet
        })
        dispatch({
            type: SET_NETWORK_TYPE,
            payload: 'mainnet'
        })
    }
}

export const addToken = (token: Token, address: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const tokenMap: TokenMap = getState().wallet.tokenMap
        tokenMap[address][token.symbol] = token
        dispatch({
            type: ADD_TOKEN,
            payload: tokenMap
        })
    }
}

export const delToken = (address: string, symbol: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const tokenMap: TokenMap = getState().wallet.tokenMap
        delete tokenMap[address][symbol]
        dispatch({
            type: DEL_TOKEN,
            payload: tokenMap
        })
    }
}