import React, { useEffect } from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Pressable, StatusBar, Text, useColorScheme, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useDispatch, useSelector } from 'react-redux'
import Main from './views/Main'
import Scan from './views/Scan'
import Entry from './views/Entry'
import AddWallet from './views/AddWallet'
import ImportWallet from './views/ImportWallet'
import { RootState } from './store'
import Networks from './views/Networks'
import AddToken from './views/AddToken'
import Wallets from './views/Wallets'
import tailwind from 'tailwind-rn'
import { ScreenStackHeaderConfig } from 'react-native-screens'
import WalletInfo from './views/Wallets/WalletInfo'
import DeriveWallet from './views/DeriveWallet'


const Stack = createNativeStackNavigator()

const HardenedBit = 0x80000000

const App = () => {
	const isDarkMode = useColorScheme() === 'dark'
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
	const dispatch = useDispatch()
	const wallets = useSelector((state: RootState) => state.wallet.wallets)
	/**
	 * tennis diagram coyote place depth kind pill end inmate flight gasp nothing
	 * fly perfect repeat demise basket fame pipe define toast witness swear mandate
	 */

	useEffect(() => {
		// const provider = new ethers.providers.JsonRpcProvider("http:/\/172.27.12.98:8545")
		// const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/2f72de9c1fff4600ac7f64b8c47d8099')
		// const provider = ethers.getDefaultProvider('ropsten')
		// console.log(provider)
		// provider.getBlockNumber().then(res => {
		// 	console.log(res)
		// })
		// provider.listAccounts().then(result => {
		// 	console.log(result)
		// }).catch(err => {
		// 	console.log(err)
		// })

		// provider.getBalance('0x13a12035C48CDD254B5a96BAF18e41035131eD87').then(balance => {
		// 	console.log(ethers.utils.formatEther(balance))
		// })
		// const privateKsy = '0xd20535e77398f0466ba00fc1686f963c31527369bcf684d61fb012858f35a4e9'
		// const activeWalletOld = new ethers.Wallet(privateKsy, provider)
		// console.log(activeWalletOld)
		// activeWalletOld.getBalance().then(balance => {
		// 	console.log(ethers.utils.formatEther(balance))
		// })
		
		
		// provider.getGasPrice().then(gasPrice => {
		// 	console.log('gasPrice', ethers.utils.formatEther(gasPrice))
			
		// 	activeWalletOld.getTransactionCount().then(nonce => {
		// 		const tx: TransactionRequest = {
		// 			nonce,
		// 			gasLimit: 21000,
		// 			gasPrice,
		// 			to: '0x53E1B3708DFabA65e11000456cD4Df3c8F04De24',
		// 			value: ethers.utils.parseEther('8')
		// 		}
		// 		console.log(tx)
		// 		/**
		// 		 * 如果直接发送，就用wallet；如果签名，则用provider
		// 		 */
		// 		activeWalletOld.signTransaction(tx).then(signTx => {
		// 			// console.log(signTx)
		// 			provider.sendTransaction(signTx).then(res => {
		// 				console.log('success', res)
		// 			}).catch(err => {
		// 				console.log('failed', err)
		// 			})
		// 			// activeWalletOld.sendTransaction(signTx).then(res => {
		// 			// 	console.log('success', res)
		// 			// }).catch(err => {
		// 			// 	console.log('failed', err)
		// 			// })
		// 		})
		// 	})
		// })
		
		// provider.listAccounts().then(list => {
		// 	for (let i = 0; i < list.length; i++) {
		// 		const item = list[i]
		// 		provider.getBalance(item).then(res => {
		// 			const balance = ethers.utils.formatEther(res)
		// 			console.log(balance)
		// 		})
		// 	}
		// })

		// const seed = ethers.utils.randomBytes(16)
		// const seed = [127, 134, 45, 61, 196, 39, 87, 90, 228, 86, 199, 218, 128, 190, 131, 191]
		// console.log(seed)
		// ethers.utils.HDNode.fromMnemonic()
		// const hdnode = ethers.utils.HDNode.fromSeed(seed)

		// console.log(hdnode)
			
		// const wallet = new ethers.Wallet(hdnode.privateKey, provider)
		// const mnemonic = ethers.Wallet.createRandom().mnemonic
		// ethers.wordlists.cn
		// const mnemonic = entropyToMnemonic(seed, ethers.wordlists.zh)
		// const mnemonic = 'brisk reopen success satisfy thing resource innocent illness worth hamster green tackle'
		// // const mnemonic = '呢 造 关 医 刑 浪 信 长 烯 徒 津 而'
		// // // const mnemonic = {"locale": "en", "path": "m/44'/60'/0'/0/0", "phrase": "thought spot fresh labor fork clog coil badge capable possible crawl jealous"}
		// // console.log('助记词', mnemonic)
		// // const wallet = ethers.Wallet.fromMnemonic(mnemonic, defaultPath, ethers.wordlists.en)
		// // console.log('wallet:', wallet)
		// const root = ethers.utils.HDNode.fromMnemonic(mnemonic)
		// console.log('root:', root)
		// const account0 = root.derivePath(defaultPath)
		// console.log('account0:', account0)
		// const account1 = root.derivePath(`m/44'/60'/0'/0/1`)
		// console.log('account1:', account1)
		// // const account2 = root.derivePath(`m/44'/60'/0'/0/2`)
		// // console.log('account2:', account2)
		// const wallet = new ethers.Wallet(account0)
		// console.log('wallet:', wallet)
		// const activeWallet = wallet.connect(provider)
		// console.log('activeWallet:', activeWallet)
		// activeWallet.getBalance().then(balance => {
		// 	console.log(ethers.utils.formatEther(balance))
		// })

	}, [])
	return (
		<SafeAreaProvider style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
				<Stack.Navigator initialRouteName={wallets && wallets.length ? 'main' : 'entry'}>
					<Stack.Screen name="entry" component={Entry} options={{ headerShown: false }} />
					<Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
					<Stack.Screen name="scan" component={Scan} />
					<Stack.Screen 
						name="wallets" 
						component={Wallets}
						options={{ 
							headerShown: false
						}}
					/>
					<Stack.Screen 
						name="walletInfo" 
						component={WalletInfo}
						options={{ 
							headerShown: false
						}}
					/>
					<Stack.Screen 
						name="addWallet" 
						component={AddWallet} 
						options={{ 
							presentation: 'modal',
							headerShown: false
						}} 
					/>
					<Stack.Screen 
						name="importWallet" 
						component={ImportWallet} 
						options={{ 
							presentation: 'modal',
							headerShown: false
						}} 
					/>
					<Stack.Screen 
						name="deriveWallet" 
						component={DeriveWallet} 
						options={{ 
							presentation: 'modal',
							headerShown: false
						}} 
					/>
					<Stack.Screen 
						name="networks" 
						component={Networks} 
						options={{ 
							presentation: 'modal',
							headerShown: false
						}} 
					/>
					<Stack.Screen 
						name="addToken" 
						component={AddToken} 
						options={{ 
							presentation: 'modal',
							headerShown: false
						}} 
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	)
}

export default App
