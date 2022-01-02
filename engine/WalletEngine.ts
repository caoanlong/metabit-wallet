import { BIP32Interface } from 'bip32'

type CoinWallet = {
    [coinName: string]: any
}


class WalletEngine {
    private static engine: WalletEngine

    private bip32Wallets: BIP32Interface[] = []

    private coinWalletMap: CoinWallet = {}
    
    private constructor() {}

    public static getInstance() {
        if (!this.engine) {
            this.engine = new WalletEngine()
        }
        return this.engine
    }

    public getWallet(privateKey: string)  {
        return this.bip32Wallets.find(item => {
            const privKey = item.privateKey?.toString('hex')
            return privKey === privateKey
        })
    }
    public addWallet(wallets: BIP32Interface[]) {
        this.bip32Wallets.push(...wallets)
    }
    public delWallet(privateKey: string) {
        const wallets = this.bip32Wallets.filter(item => {
            const privKey = item.privateKey?.toString('hex')
            return privKey !== privateKey
        })
        this.bip32Wallets = wallets
    }

    public setTokenWallet(coinName: string, wallet: any) {
        this.coinWalletMap[coinName] = wallet
    }
    public getTokenWallet(coinName: string) {
        return this.coinWalletMap[coinName]
    }
}

export default WalletEngine