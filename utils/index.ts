import Decimal from 'decimal.js-light'
import { Buffer } from 'buffer'
import { createHDWallet, deriveWallet } from './wallet'
import { store } from '../store'

export const hideAddress = (address: string) => {
    const first = address.substr(0, 10)
    const last = address.substr(address.length - 8)
    return first + '...' + last
}

export const fixBalance = (balance: string | number) => {
    const str = new Decimal(balance).toFixed(6)
}

/**
 * 16进制转Buffer
 * @param str 
 * @returns 
 */
export const hexStrToBuf = (str: string): Buffer => {
    str = str.replace(/^0x/, '')
    const buf = Buffer.alloc(Math.ceil(str.length / 2), str, 'hex')
    return buf
}

export function createWalletByMnemonic(mnemonic?: string): HDWallet {
    let index = 1
    const wallets: HDWallet[] = store.getState().wallet.wallets
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
    return root
}