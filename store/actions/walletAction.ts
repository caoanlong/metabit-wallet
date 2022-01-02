import { ethers, Wallet } from "ethers"
import { Dispatch, AnyAction } from "redux"
import WalletEngine from "../../engine/WalletEngine"
import { createHDWallet, createWalletByPrivateKey, deriveWallet } from "../../utils/wallet"
import { 
    ADD_TOKEN, 
    ADD_CHILD_WALLET, 
    CHANGE_WALLET, 
    CREATE_WALLET, 
    DEL_TOKEN
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
        let index = 1
        const wallets: HDWallet[] = getState().wallet.wallets
        const roots = wallets.filter((item: HDWallet) => item.type === -1)
        if (roots.length) {
            const maxIndex = Math.max(...roots.map((item: HDWallet) => item.index))
            index = maxIndex + 1
        }
        const root: HDWallet = createHDWallet({ mnemonic, index })
        // 默认创建比特币和以太坊钱包
        const btc = deriveWallet(root, 0)
        const eth = deriveWallet(root, 60)
        const trx = deriveWallet(root, 195)
        // engine.addWallet([ root.wallet, btc.wallet, eth.wallet, trx.wallet ])
        if (!root.children) root.children = []
        root.children.push(btc, eth, trx)
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
        // const wallets: HDWallet[] = getState().wallet.wallets
        // // 树结构，广度优先遍历是否已经存在
        // const list = [ ...wallets ]
        // while (list && list.length) {
        //     const cur = list.shift()
        //     if (!cur) return
        //     if (cur.privateKey === privateKey) {
        //         throw new Error("Wallet is exist")
        //     }
        //     if (cur.children && cur.children.length) {
        //         for (let i = 0; i < cur.children.length; i++) {
        //             const child = cur.children[i]
        //             list.push(child)
        //         }
        //     }
        // }
        // const wallet = createWalletByPrivateKey(privateKey, coinType)
        // // 直接用私钥导入的钱包，因为没有chaincode，无法派生子钱包，故不放入engine
        // dispatch({
        //     type: CREATE_WALLET,
        //     payload: wallet
        // })
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