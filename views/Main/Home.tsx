import React, { useEffect, useState } from "react"
import { 
    Alert,
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text, 
    useColorScheme, 
    View 
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import tailwind, { getColor } from "tailwind-rn"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import Decimal from 'decimal.js-light'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Clipboard from '@react-native-clipboard/clipboard'
import Toast from 'react-native-root-toast'
// import Modal from "react-native-modal"
import { ParamListBase, useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootState } from "../../store"
import { hideAddress } from "../../utils"
import { CHAIN_MAP, NetworkMap } from "../../config"
import { getBalance } from "../../store/actions/walletAction"
// import { getRate } from "../../store/actions/rateAction"

function Home() {
    const isDarkMode = useColorScheme() === 'dark'
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const dispatch = useDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const networkType: string = useSelector((state: RootState) => state.wallet.networkType)
    const networkMap: NetworkMap = useSelector((state: RootState) => state.wallet.networkMap)
    const rate: any = useSelector((state: RootState) => state.rate)
    const selectedWallet: HDWallet = useSelector((state: RootState) => state.wallet.selectedWallet)
    const [ balance, setBalance ] = useState<string>('0.0')
    
    const [ index, setIndex ] = useState<number>(0)
    const [ routes ] = useState<{ key: string, title: string }[]>([
        { key: 'tokens', title: '代币' },
        { key: 'nfts', title: 'NFT' }
    ])
    const [ refreshing, setRefreshing ] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getBalance(selectedWallet))
    }, [selectedWallet, networkType])

    useEffect(() => {
        const tokens = networkMap[selectedWallet.chain as string][networkType].tokens
        let sum = '0'
        for (let i = 0; i < tokens.length; i++) {
            sum = new Decimal(tokens[i].balance).times(rate[tokens[i].symbol]).plus(sum).toString()
        }
        setBalance(new Decimal(sum).toFixed(6))
    }, [networkMap, selectedWallet, networkType])

    const Tokens = () => (
        <>
            {
                networkMap[selectedWallet.chain as string][networkType].tokens.map((item: Token) => (
                    <View 
                        key={item.symbol} 
                        style={tailwind(`flex flex-row items-center p-4 bg-white mb-2`)}>
                        <Image
                            style={tailwind(`w-10 h-10 mr-4 rounded-full bg-gray-200`)}
                            source={CHAIN_MAP[item.symbol]}
                        />
                        <Text style={tailwind(`text-black text-xl`)}>{item.symbol}</Text>
                        <View style={tailwind(`flex-1`)}>
                            <Text style={tailwind(`text-right text-black text-xl`)}>
                                {item.balance ? parseFloat(new Decimal(item.balance).toFixed(6)) : ''}
                            </Text>
                            <Text style={tailwind(`text-right text-gray-400`)}>
                                ${item.balance ? parseFloat(new Decimal(item.balance).times(rate[item.symbol]).toFixed(6)) : ''}
                            </Text>
                        </View>
                    </View>
                ))
            }
        </>
    )
    const NFTs = () => (
        <View 
            style={tailwind(`h-full flex justify-center items-center`)}>
            <Text style={tailwind(`text-gray-400`)}>暂无数据</Text>
        </View>
    )
    
    return (
        <>
            <View style={tailwind(`h-full`)}>
                <Pressable 
                    onPress={() => {
                        navigation.push('networks')
                    }}
                    style={tailwind(`h-8 flex flex-row justify-center items-center bg-white`)}>
                    <Text 
                        style={{
                            ...tailwind(`text-blue-600 text-xs`),
                            color: networkMap[selectedWallet?.chain as string][networkType].color
                        }}>
                        {networkMap[selectedWallet?.chain as string][networkType].name}
                    </Text>
                    <Icon 
                        name="chevron-down" 
                        size={16} 
                        color={networkMap[selectedWallet?.chain as string][networkType].color} 
                    />
                </Pressable>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={() => {}} 
                        />
                    }
                    style={backgroundStyle}>
                    <View style={tailwind(`bg-blue-600 p-3`)}>
                        <View 
                            style={tailwind(`flex justify-center items-center bg-white py-6 rounded-lg`)}>
                            <Pressable 
                                onPress={() => {
                                    Clipboard.setString(selectedWallet?.address)
                                    Toast.show('复制成功', {
                                        position: Toast.positions.CENTER,
                                        shadow: false
                                    })
                                }}>
                                <Text style={tailwind(`text-blue-300`)}>
                                    {hideAddress(selectedWallet?.address)}
                                </Text>
                            </Pressable>
                            <Text style={tailwind(`text-blue-600 text-2xl font-bold`)}>
                                ${parseFloat(balance)}
                            </Text>
                        </View>
                        <View style={tailwind(`flex flex-row justify-center mt-3`)}>
                            <Pressable 
                                onPress={() => {
                                    Alert.alert('转账')
                                }}
                                style={tailwind(`flex-1 py-4 bg-white rounded-lg`)}>
                                <Text style={tailwind(`text-center text-blue-600 text-lg`)}>转账</Text>
                            </Pressable>
                            <Pressable 
                                onPress={() => {
                                    Alert.alert('收款')
                                }}
                                style={tailwind(`ml-3 flex-1 py-4 bg-white rounded-lg`)}>
                                <Text style={tailwind(`text-center text-blue-600 text-lg`)}>收款</Text>
                            </Pressable>
                        </View>
                    </View>
                    <TabView
                        style={{ minHeight: 300 }}
                        navigationState={{ index, routes }}
                        onIndexChange={setIndex}
                        renderScene={SceneMap({
                            tokens: Tokens,
                            nfts: NFTs
                        })}
                        renderTabBar={(props) => (
                            <TabBar 
                                style={{
                                    backgroundColor: 'white'
                                }}
                                inactiveColor={getColor('gray-400')}
                                activeColor={getColor('blue-600')}
                                indicatorStyle={{
                                    backgroundColor: getColor('blue-600')
                                }}
                                {...props} 
                            />
                        )}
                    />
                </ScrollView>
            </View>
            {/* <Modal 
                isVisible={showAccountsModal}
                style={tailwind(`m-0 justify-end`)}
                onBackdropPress={() => setShowAccountsModal(false)}
                onBackButtonPress={() => setShowAccountsModal(false)}
                onSwipeComplete={() => setShowAccountsModal(false)}
                swipeDirection={'down'}
				propagateSwipe>
                <SafeAreaView 
                    style={{
                        ...tailwind(`bg-white flex`),
                        minHeight: 450
                    }}>
                    <View style={tailwind(`h-8 flex justify-center items-center`)}>
                        <View 
                            style={{
                                ...tailwind(`w-10 bg-gray-400 opacity-50`),
                                height: 5,
                                borderRadius: 4
                            }} 
                        />
                    </View>
                    <FlatList 
                        style={tailwind(`flex-1 p-4`)}
                        data={wallets} 
                        keyExtractor={(item) => item.address} 
                        renderItem={({item}) => (
                            <Pressable 
                                onPress={() => {
                                    dispatch(changeWallet(item.address))
                                    setShowAccountsModal(false)
                                }}
                                style={{
                                    ...tailwind(`flex flex-row items-center py-4`),
                                    borderTopWidth: 0.5,
                                    borderTopColor: getColor('gray-200')
                                }}>
                                <View style={tailwind(`w-10 h-10 mr-4 bg-gray-200 rounded-full`)}></View>
                                <View style={tailwind(`flex-1 flex`)}>
                                    <Text style={tailwind(`text-lg`)}>{item.name}</Text>
                                    <Text style={tailwind(`text-xs text-gray-400`)}>
                                        {hideAddress(item.address)}
                                    </Text>
                                </View>
                                <View style={tailwind(`w-10 h-5 flex justify-center items-center`)}>
                                    {
                                        selectedWallet.address === item.address ?
                                        <Icon name="checkmark" size={20} color={getColor('blue-600')} /> : <></>
                                    }
                                </View>
                            </Pressable>
                        )}
                    />
                    <View style={tailwind(`flex items-center py-4`)}>
                        <Pressable 
                            onPress={() => dispatch(addWallet())}
                            style={tailwind(`w-56 py-3 bg-blue-600 rounded-full mb-3`)}>
                            <Text style={tailwind(`text-white text-lg text-center`)}>创建新账号</Text>
                        </Pressable>
                        <Pressable 
                            onPress={() => {
                                Alert.alert('导入账号')
                            }}
                            style={tailwind(`w-56 py-3 border border-blue-600 rounded-full`)}>
                            <Text style={tailwind(`text-blue-600 text-lg text-center`)}>导入账号</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </Modal> */}
        </>
    )
}

export default Home