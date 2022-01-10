declare module "react-native-bip39" {
    export const generateMnemonic: (num?: number) => Promise<string[]>
}

declare module "react-native-randombytes" {
    export const randomBytes: (n: number) => Buffer
}


interface Mnemonic {
    locale: string,
    phrase: string
}

interface HDWallet {
    id: string,
    name: string,
    alias?: string,
    privateKey: string, 
    publicKey: string,
    compressPublicKey: string,
    address: string, 
    chainCode: string, 
    mnemonic?: Mnemonic, 
    path?: string,
    type: number,
    index: number,
    chain?: string,
    children?: HDWallet[],
    parentId?: string
}

type Token = {
    name: string,
    logo: any,
    symbol: string,
    decimals?: number,
    address?: string,
    balance: string
}
type AddressTokens = {
    [symbol: string]: Token
}
type TokenMap = {
    [address: string]: AddressTokens
}
declare module "@metamask/contract-metadata" {
    interface contractMap {
        [address: string]: Token
    }
}