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
    DEL_WALLET
} from "../constants"

// const engine = WalletEngine.getInstance()
/**
 * 创建root钱包，默认派生btc和eth钱包地址
 * @param mnemonic 
 * @returns 
 */
export const createWallet = (mnemonic?: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const root = createWalletByMnemonic(mnemonic)
        dispatch({
            type: CREATE_WALLET,
            payload: root
        })
        dispatch({
            type: CHANGE_WALLET,
            payload: root
        })
    }
}

export const delWallet = (wallet: HDWallet) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const wallets: HDWallet[] = getState().wallet.wallets
        let list: HDWallet[] = []
        if (wallet.type === -1 || !wallet.parentKey) {
            list = wallets.filter((item: HDWallet) => item.chainCode !== wallet.chainCode)
        } else {
            list = [...wallets]
            for (let i = 0; i < list.length; i++) {
                if (list[i].children && list[i].children?.length) {
                    list[i].children = list[i].children?.filter((item: HDWallet) => !(item.address === wallet.address && item.chain === wallet.chain))
                }
            }
        }
        dispatch({
            type: DEL_WALLET,
            payload: list
        })
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
        const children = wallet.children
        let index = 0
        if (children) {
            if (children.length) {
                const indexes = children.filter((item: HDWallet) => item.chain === chain).map((item: HDWallet) => item.index)
                if (indexes && indexes.length) {
                    const maxIndex = Math.max(...indexes)
                    index = maxIndex + 1
                }
            }
        } else {
            wallet.children = []
        }
        const child = deriveWallet(wallet, chain, index)
        wallet.children?.push(child)
        
        dispatch({
            type: ADD_CHILD_WALLET,
            payload: wallet
        })
    }
}

/**
 * 根据私钥导入特定币种钱包
 * @param privateKey 
 * @param chain 
 * @returns 
 */
export const importWalletByPrivateKey = (privateKey: string, chain: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const wallets: HDWallet[] = getState().wallet.wallets.filter((item: HDWallet) => item.address && item.chain === chain)
        let index = 0
        if (wallets && wallets.length) {
            const maxIndex = Math.max(...wallets.map((item: HDWallet) => item.index))
            index = maxIndex + 1
        }
        const wallet: HDWallet = createWalletByPrivateKey(privateKey, chain, index)
        dispatch({
            type: CREATE_WALLET,
            payload: wallet
        })
        dispatch({
            type: CHANGE_WALLET,
            payload: wallet
        })
    }
    
}

export const changeWallet = (wallet: HDWallet) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({
            type: CHANGE_WALLET,
            payload: wallet
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