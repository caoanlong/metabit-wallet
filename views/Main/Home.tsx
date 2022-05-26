import React, { useEffect, useState } from "react"
import { 
    Alert,
    Image,
    Pressable,
    RefreshControl,
    ScrollView,
    Text, 
    View 
} from "react-native"
import tailwind, { getColor } from "tailwind-rn"
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"
import Decimal from 'decimal.js-light'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Clipboard from '@react-native-clipboard/clipboard'
import Toast from 'react-native-root-toast'
import { ParamListBase, useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootState } from "../../store"
import { hideAddress } from "../../utils"
import { STATIC_URL } from "../../config"
import { getBalance } from "../../store/actions/walletAction"
import HeaderBar from "../../components/HeaderBar"

function Home() {
    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets()
    const defaultHeight = getDefaultHeaderHeight(frame, false, insets.top)
    const dispatch = useDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const rate: any = useSelector((state: RootState) => state.rate)
    const selectedWallet: HDWallet = useSelector((state: RootState) => state.wallet.selectedWallet)
    const selectedNetwork: Network = useSelector((state: RootState) => state.wallet.selectedNetwork)
    const tokens: ContractToken[] = useSelector((state: RootState) => {
        return state.wallet.tokens.filter((item: ContractToken) => {
            return item.isSelect && item.network === selectedNetwork.shortName
        })
    })
    const totalBalance: number = useSelector((state: RootState) => {
        const tokenList = state.wallet.tokens.filter((item: ContractToken) => {
            return item.isSelect && item.network === selectedNetwork.shortName
        })
        let sum = 0
        for (let i = 0; i < tokenList.length; i++) {
            const item = tokenList[i]
            sum = new Decimal(item.balance ?? '0').times(rate[item.symbol] ?? 1).plus(sum).toNumber()
        }
        return sum
    })
    const [ refreshing, setRefreshing ] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getBalance())
    }, [selectedNetwork, selectedWallet])
    
    return (
        <>
            <View style={tailwind(`absolute top-0 left-0 right-0 bottom-0`)}>
                <HeaderBar 
                    backgroundColor={getColor('purple-600')} 
                    color={'#ffffff'}
                    left={
                        <Pressable 
                            onPress={() => {
                                navigation.push('addToken')
                            }}
                            style={tailwind(`w-full h-full flex items-center justify-center`)}>
                            <Icon name="add" size={30} color={'#ffffff'} />
                        </Pressable>
                    }
                    title={
                        <Pressable 
                            onPress={() => {
                                navigation.push('selectWallet')
                            }}
                            style={tailwind(`flex flex-row justify-center`)}>
                            <View 
                                style={{
                                    ...tailwind(`py-1 px-4 rounded-full flex flex-row`),
                                    backgroundColor: 'rgba(0,0,0,0.1)'
                                }}>
                                <Text style={tailwind(`text-white text-center`)}>
                                    {selectedWallet.alias ?? (selectedWallet.name + ' ' + (selectedWallet.index + 1))}
                                </Text>
                                <Icon 
                                    style={tailwind('ml-1')}
                                    name="caret-down-outline" 
                                    size={16} 
                                    color={'#ffffff'} 
                                />
                            </View>
                        </Pressable>
                    }
                    right={
                        <Pressable 
                            onPress={() => {
                                navigation.push('scan')
                            }}
                            style={tailwind(`w-full h-full flex items-center justify-center`)}>
                            <Icon name="scan" size={20} color={'#ffffff'} />
                        </Pressable>
                    }
                />
                <Pressable 
                    onPress={() => {
                        navigation.push('networks')
                    }}
                    style={{
                        ...tailwind(`absolute left-0 right-0 z-10 h-8 flex flex-row justify-center items-center bg-purple-600`),
                        top: defaultHeight
                    }}>
                    <Text 
                        style={tailwind(`text-white text-xs`)}>
                        {selectedNetwork.name}
                    </Text>
                    <Icon 
                        name="chevron-down" 
                        size={16} 
                        color={'#ffffff'} 
                    />
                </Pressable>
                <View style={tailwind(`bg-purple-600 absolute z-0 top-0 left-0 right-0 h-1/2`)}></View>
                <View 
                    style={{
                        ...tailwind(`absolute left-0 right-0 bottom-0`),
                        top: defaultHeight + 32
                    }}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl 
                                tintColor={'#ffffff'}
                                progressBackgroundColor={'#ffffff'}
                                refreshing={refreshing} 
                                onRefresh={() => {
                                    setRefreshing(true)
                                    dispatch(getBalance(() => {
                                        setRefreshing(false)
                                    }))
                                }} 
                            />
                        }>
                        <View style={tailwind(`bg-purple-600 p-3`)}>
                            <View 
                                style={tailwind(`flex justify-center items-center py-4`)}>
                                {
                                    selectedWallet && selectedWallet.address ?
                                    <Pressable 
                                        onPress={() => {
                                            Clipboard.setString(selectedWallet.address)
                                            Toast.show('复制成功', {
                                                position: Toast.positions.CENTER,
                                                shadow: false
                                            })
                                        }}>
                                        <Text style={tailwind(`text-purple-300 text-base`)}>
                                            {hideAddress(selectedWallet.address)}
                                        </Text>
                                    </Pressable> : <></>
                                }
                                <Text style={tailwind(`text-white text-3xl font-bold`)}>
                                    ${totalBalance ? new Decimal(totalBalance).toFixed(8).toString() : '0.00'}
                                </Text>
                            </View>
                            <View 
                                style={{
                                    ...tailwind(`w-4/5 flex flex-row justify-center items-center mb-2 rounded-full`),
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    backgroundColor: 'rgba(0,0,0,0.1)'
                                }}>
                                <Pressable 
                                    onPress={() => {
                                        Alert.alert('转账')
                                    }}
                                    style={tailwind(`flex-1 py-2`)}>
                                    <Text style={tailwind(`text-center text-white text-base`)}>转账</Text>
                                </Pressable>
                                <View style={{ width: 0.5, height: '60%', backgroundColor: 'rgba(255,255,255,0.5)'}}></View>
                                <Pressable 
                                    onPress={() => {
                                        Alert.alert('收款')
                                    }}
                                    style={tailwind(`flex-1 py-2`)}>
                                    <Text style={tailwind(`text-center text-white text-base`)}>收款</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View 
                            style={{
                                ...tailwind(`p-3 bg-gray-100`),
                                minHeight: 300
                            }}>
                            {
                                tokens.map((item: ContractToken) => (
                                    <View 
                                        key={item.symbol} 
                                        style={{
                                            ...tailwind(`flex flex-row items-center p-4 bg-white rounded-lg mb-3`),
                                            shadowColor: '#000000',
                                            shadowRadius: 2,
                                            shadowOffset: {
                                                width: 0,
                                                height: 3
                                            },
                                            shadowOpacity: 0.03
                                        }}>
                                        <Image
                                            style={tailwind(`w-10 h-10 mr-4 rounded-full bg-gray-200`)}
                                            source={{ uri: STATIC_URL + item.icon }}
                                        />
                                        <Text style={tailwind(`text-black text-xl`)}>{item.symbol}</Text>
                                        <View style={tailwind(`flex-1`)}>
                                            <Text style={tailwind(`text-right text-black text-xl`)}>
                                                {parseFloat(new Decimal(item.balance ?? '0').toFixed(8))}
                                            </Text>
                                            <Text style={tailwind(`text-right text-gray-400`)}>
                                                ${parseFloat(new Decimal(item.balance ?? '0').times(rate[item.symbol] ?? 1).toFixed(8))}
                                            </Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

export default Home