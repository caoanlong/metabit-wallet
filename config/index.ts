import { chain } from "lodash"
import { ImageSourcePropType } from "react-native"

export const MAINNET = 'mainnet'
export const ROPSTEN = 'ropsten'
export const KOVAN = 'kovan'
export const RINKEBY = 'rinkeby'
export const GOERLI = 'goerli'
export const RPC = 'rpc'
export const NO_RPC_BLOCK_EXPLORER = 'NO_BLOCK_EXPLORER'

// export interface Token {

// }
export type Network = {
	name: string,
	shortName: string,
	networkId?: number,
	chainId?: number,
	hexChainId?: string,
	color: string,
	networkType: string,
	hdIndex: number,
	api: string,
	scan: string,
	tokens: Token[]
}
export interface NetworkMap {
	[chain: string]: { [networkType: string]: Network }
}
export const NETWORK_MAP: NetworkMap = {
	'Ethereum': {
		'mainnet': {
			name: 'Ethereum Main Network',
			shortName: 'Ethereum',
			networkId: 1,
			chainId: 1,
			hexChainId: '0x1',
			color: '#3cc29e',
			networkType: 'mainnet',
			hdIndex: 60,
			api: 'https://mainnet.infura.io/v3/2f72de9c1fff4600ac7f64b8c47d8099',
			scan: 'https://etherscan.io/',
			tokens: [
				{
					name: 'ETH',
					logo: '',
					symbol: 'ETH',
					decimals: 1,
					address: '',
					balance: '0'
				},{
					name: 'Tether USDT',
					logo: '',
					symbol: 'USDT',
					decimals: 6,
					address: '',
					balance: '0'
				}
			]
		},
		'ropsten': {
			name: 'Ropsten Test Network',
			shortName: 'Ropsten',
			networkId: 3,
			chainId: 3,
			hexChainId: '0x3',
			color: '#ff4a8d',
			networkType: 'ropsten',
			hdIndex: 60,
			api: 'https://ropsten.infura.io/v3/2f72de9c1fff4600ac7f64b8c47d8099',
			scan: 'https://ropsten.etherscan.io/',
			tokens: [
				{
					name: 'ETH',
					logo: '',
					symbol: 'ETH',
					decimals: 1,
					address: '',
					balance: '0'
				}
			]
		},
		'kovan': {
			name: 'Kovan Test Network',
			shortName: 'Kovan',
			networkId: 42,
			chainId: 42,
			hexChainId: '0x2a',
			color: '#7057ff',
			networkType: 'kovan',
			hdIndex: 60,
			api: 'https://kovan.infura.io/v3/2f72de9c1fff4600ac7f64b8c47d8099',
			scan: 'https://kovan.etherscan.io/',
			tokens: [
				{
					name: 'ETH',
					logo: '',
					symbol: 'ETH',
					decimals: 1,
					address: '',
					balance: '0'
				}
			]
		},
		'rinkeby': {
			name: 'Rinkeby Test Network',
			shortName: 'Rinkeby',
			networkId: 4,
			chainId: 4,
			hexChainId: '0x4',
			color: '#f6c343',
			networkType: 'rinkeby',
			hdIndex: 60,
			api: 'https://rinkeby.infura.io/v3/2f72de9c1fff4600ac7f64b8c47d8099',
			scan: 'https://rinkeby.etherscan.io/',
			tokens: [
				{
					name: 'ETH',
					logo: '',
					symbol: 'ETH',
					decimals: 1,
					address: '',
					balance: '0'
				}
			]
		},
		'goerly': {
			name: 'Goerli Test Network',
			shortName: 'Goerli',
			networkId: 5,
			chainId: 5,
			hexChainId: '0x5',
			color: '#3099f2',
			networkType: 'goerly',
			hdIndex: 60,
			api: 'https://goerly.infura.io/v3/2f72de9c1fff4600ac7f64b8c47d8099',
			scan: 'https://goerli.etherscan.io/',
			tokens: [
				{
					name: 'ETH',
					logo: '',
					symbol: 'ETH',
					decimals: 1,
					address: '',
					balance: '0'
				}
			]
		},
	},
	'Tron': {
		'mainnet': {
			name: 'Tron Main Network',
			shortName: 'Tron',
			networkId: 1,
			chainId: 1,
			hexChainId: '0x1',
			color: '#3cc29e',
			networkType: 'mainnet',
			hdIndex: 195,
			api: '',
			scan: 'https://tronscan.org/#/',
			tokens: [
				{
					name: 'TRON(TRX)',
					logo: '',
					symbol: 'TRX',
					decimals: 1,
					address: '',
					balance: '0'
				},{
					name: 'Tether USDT',
					logo: '',
					symbol: 'USDT',
					decimals: 6,
					address: '',
					balance: '0'
				}
			]
		},
		'shasta': {
			name: 'Shasta test Network',
			shortName: 'Shasta',
			networkId: 1,
			chainId: 1,
			hexChainId: '0x1',
			color: '#3cc29e',
			networkType: 'shasta',
			hdIndex: 195,
			api: 'https://api.shasta.trongrid.io',
			scan: 'https://shasta.tronscan.org/#/',
			tokens: [
				{
					name: 'TRON(TRX)',
					logo: '',
					symbol: 'TRX',
					decimals: 1,
					address: '',
					balance: '0'
				}
			]
		},
		'nile': {
			name: 'Nile test Network',
			shortName: 'Nile',
			networkId: 1,
			chainId: 1,
			hexChainId: '0x1',
			color: '#3cc29e',
			networkType: 'nile',
			hdIndex: 195,
			api: 'https://api.nileex.io',
			scan: 'https://nile.tronscan.org/#/',
			tokens: [
				{
					name: 'TRON(TRX)',
					logo: '',
					symbol: 'TRX',
					decimals: 1,
					address: '',
					balance: '0'
				}
			]
		}
	}
}

export const CHAINS = [
	'Ethereum',
	'Tron',
]

export const CHAIN_COINTYPE: {[key: string]: number} = {
	'Ethereum': 60,
	'Polygon': 60,
	'BSC': 60,
	'Tron': 195
}

export const CHAIN_MAP: {[key: string]: ImageSourcePropType} = {
	'Tron': require('../assets/icons/trx.png'),
	'Bitcoin': require('../assets/icons/btc.png'),
	'Ethereum': require('../assets/icons/eth.png'),
	'ETH': require('../assets/icons/eth.png'),
	'TRX': require('../assets/icons/trx.png'),
	'USDT': require('../assets/icons/usdt.png'),
}