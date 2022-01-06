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
    DEL_ROOT_WALLET
} from "../constants"

// const engine = WalletEngine.getInstance()
/**
 * 创建root钱包，默认派生btc和eth钱包地址
 * @param mnemonic 
 * @returns 
 */
// e7282b6964b2792925cb486550a0eec1a28e908d638b3e8e48be0146703cc960
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

export const delRootWallet = (publicKey: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const wallets: HDWallet[] = getState().wallet.wallets
        const list = wallets.filter((item: HDWallet) => item.publicKey !== publicKey)
        dispatch({
            type: DEL_ROOT_WALLET,
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
export const addChildWallet = (wallet: HDWallet, coinType: number) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        // const parent = engine.getWallet(wallet.privateKey)
        // if (!parent) throw new Error("Parent not found")
        // const child = deriveWallet(parent, coinType)
        // engine.addWallet([ child.wallet ])
        // wallet.children?.push(child.walletJson)
        // dispatch({
        //     type: ADD_CHILD_WALLET,
        //     payload: wallet
        // })
    }
}

/**
 * 根据私钥导入特定币种钱包
 * @param privateKey 
 * @param coinType 
 * @returns 
 */
export const importWalletByPrivateKey = (privateKey: string, coinType: number) => {
    return (dispatch: Dispatch<AnyAction>, getState: any) => {
        const wallets: HDWallet[] = getState().wallet.wallets.filter((item: HDWallet) => item.address && item.type === coinType)
        let index = 1
        if (wallets && wallets.length) {
            const maxIndex = Math.max(...wallets.map((item: HDWallet) => item.index))
            index = maxIndex + 1
        }
        const wallet: HDWallet = createWalletByPrivateKey(privateKey, coinType, index)
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