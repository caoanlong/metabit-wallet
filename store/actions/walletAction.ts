import { Contract, ethers, Wallet } from "ethers"
import TronWeb from 'tronweb'
import { Dispatch, AnyAction } from "redux"
import axios from 'axios'
import { Network, NetworkMap } from "../../config"
import ABI from "../../config/ABI"
import { createWalletByMnemonic } from "../../utils"
import { createWalletByPrivateKey, deriveWallet } from "../../utils/wallet"
import { 
    ADD_TOKEN, 
    ADD_CHILD_WALLET, 
    CHANGE_WALLET, 
    CREATE_WALLET, 
    DEL_TOKEN,
    SET_NETWORK_TYPE,
    SET_TOKEN
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

export const setNetworkType = (type: string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({
            type: SET_NETWORK_TYPE,
            payload: type
        })
    }
}

export const getBalance = (cb?: () => void) => {
    return async (dispatch: Dispatch<AnyAction>, getState: any) => {
        const networkMap: NetworkMap = getState().wallet.networkMap
        const networkType: string = getState().wallet.networkType
        const selectedWallet: HDWallet = getState().wallet.selectedWallet
        const network: Network = networkMap[selectedWallet.chain + '_' + networkType]
        if (selectedWallet.chain === 'Ethereum') {
            const provider = new ethers.providers.JsonRpcProvider(network.api)
            const wallet = new Wallet(selectedWallet.privateKey, provider)
            const res = await wallet.getBalance()
            const balance = ethers.utils.formatEther(res)
            console.log(balance)
            network.tokens[0].balance = balance
            const tokens = network.tokens.filter((item: Token) => item.address)
            if (tokens.length > 0) {
                const contracts: Contract[] = tokens.map((item: Token) => new Contract(item.address as string, ABI[item.type as string], provider))
                const handlers = contracts.map((contract: Contract) => contract.balanceOf(selectedWallet.address))
                const result = await Promise.all([...handlers])
                for (let i = 1; i < network.tokens.length; i++) {
                    network.tokens[i].balance = String(+ethers.utils.formatUnits(result[i-1], 'wei') / Math.pow(10, network.tokens[i].decimals ?? 6))
                    console.log(network.tokens[i].balance)
                }
            }
        } else if (selectedWallet.chain === 'Tron') {
            const privateKey = selectedWallet.privateKey.replace(/^(0x)/, '')
            const headers = { "TRON-PRO-API-KEY": 'dd9ff6b3-e5d3-4ea8-a6a2-780513e1ad48' }
            const tronWeb = new TronWeb({ fullHost: network.api, privateKey, headers })
            const res = await tronWeb.trx.getBalance(selectedWallet.address)
            const balance = tronWeb.fromSun(res)
            console.log(balance)
            network.tokens[0].balance = balance
            const tokens = network.tokens.filter((item: Token) => item.address)
            if (tokens.length > 0) {
                const results: string[] = []
                for (let i = 0; i < tokens.length; i++) {
                    const contract = await tronWeb.contract(ABI[tokens[i].type as string], tokens[i].address)
                    const result = await contract.balanceOf(selectedWallet.address).call()
                    results.push(tronWeb.fromSun(result.toString()))
                }
                for (let i = 1; i < network.tokens.length; i++) {
                    network.tokens[i].balance = results[i-1]
                    console.log(network.tokens[i].balance)
                }
            }
            
        }
        networkMap[selectedWallet.chain + '_' + networkType] = network
        dispatch({ type: SET_TOKEN, payload: networkMap })
        cb && cb()
    }
}