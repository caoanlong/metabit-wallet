import Decimal from 'decimal.js-light'
import { Buffer } from 'buffer'

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