import { ParamListBase, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import React, { useState } from "react"
import { Platform, Pressable, StatusBar, Text, useColorScheme, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useSelector } from "react-redux"
import tailwind, { getColor } from "tailwind-rn"
import { RootState } from "../../store"
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"

const Stack = createNativeStackNavigator()

function Wallets() {
    const isDarkMode = useColorScheme() === 'dark'
    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets()
    const defaultHeight = getDefaultHeaderHeight(frame, false, insets.top)
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const hdWallets = useSelector((state: RootState) => state.wallet.wallets.filter((item: HDWallet) => !item.address))
    const wallets = useSelector((state: RootState) => state.wallet.wallets.filter((item: HDWallet) => item.address))
    
    return (
        <>
            <StatusBar 
                barStyle={
                    Platform.select({ ios: 'light-content', default: isDarkMode ? 'light-content' : 'dark-content' })
                } 
            />
            <View style={tailwind(`bg-blue-600`)}>
                <View 
                    style={{
                        ...tailwind(`flex flex-row`),
                        height: defaultHeight,
                        paddingTop: insets.top
                    }}>
                    <Pressable 
                        onPress={() => navigation.goBack()}
                        style={tailwind(`w-12 flex justify-center items-center`)}>
                        <Icon name="chevron-back" size={24} color={Colors.white} />
                    </Pressable>
                    <View style={tailwind(`flex-1 flex justify-center`)}>
                        <Text style={tailwind(`text-base text-center text-white`)}>钱包管理</Text>
                    </View>
                    <View style={tailwind(`w-12`)} />
                </View>
                <View style={tailwind(`flex items-center py-6`)}>
                    <Pressable 
                        onPress={() => {
                            navigation.push('importWallet', {
                                type: 'mnemonic'
                            })
                        }}
                        style={tailwind(`w-56 py-2 bg-white rounded-full mb-3`)}>
                        <Text style={tailwind(`text-blue-600 text-sm text-center`)}>使用助记词导入HD钱包</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() => {
                            navigation.push('importWallet', {
                                type: 'privateKey'
                            })
                        }}
                        style={tailwind(`w-56 py-2 bg-white rounded-full mb-3`)}>
                        <Text style={tailwind(`text-blue-600 text-sm text-center`)}>使用私钥导入币种钱包</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() => {
                            navigation.push('addWallet')
                        }}
                        style={tailwind(`w-56 py-2 bg-white rounded-full`)}>
                        <Text style={tailwind(`text-blue-600 text-sm text-center`)}>创建新钱包</Text>
                    </Pressable>
                </View>
            </View>
            {
                hdWallets && hdWallets.length ? 
                <View style={tailwind(`px-3 py-2`)}>
                    <Text style={tailwind(`py-2 text-gray-500`)}>HD钱包列表</Text>
                    {
                        hdWallets.map((wallet: HDWallet) => (
                            <Pressable 
                                style={{
                                    ...tailwind(`flex flex-row items-center p-4 bg-white mb-3 rounded-lg`),
                                    shadowColor: '#000000',
                                    shadowRadius: 2,
                                    shadowOffset: {
                                        width: 0,
                                        height: 3
                                    },
                                    shadowOpacity: 0.03
                                }}
                                onPress={() => {
                                    const params: { parent: HDWallet } = { parent: wallet }
                                    navigation.navigate('walletInfo', params)
                                }}
                                key={wallet.chainCode}>
                                <View style={tailwind(`w-8 h-8 bg-gray-200 rounded-full`)}></View>
                                <View style={tailwind(`flex-1 pl-4`)}>
                                    <Text style={tailwind(`text-black text-lg`)}>{wallet.name + ' ' + wallet.index}</Text>
                                </View>
                                <View style={tailwind(`w-8 h-8 flex justify-center items-center`)}>
                                    <Icon 
                                        name="chevron-forward" 
                                        size={20}
                                        color={getColor('blue-600')}
                                    />
                                </View>
                            </Pressable>
                        ))
                    }
                </View> : <></>
            }
            {
                wallets && wallets.length ? 
                <View style={tailwind(`px-3 py-2`)}>
                    <Text style={tailwind(`py-2 text-gray-500`)}>币种钱包列表</Text>
                    {
                        wallets.map((wallet: HDWallet) => (
                            <Pressable 
                                style={{
                                    ...tailwind(`flex flex-row items-center p-4 bg-white mb-3 rounded-lg`),
                                    shadowColor: '#000000',
                                    shadowRadius: 2,
                                    shadowOffset: {
                                        width: 0,
                                        height: 3
                                    },
                                    shadowOpacity: 0.03
                                }}
                                onPress={() => {
                                    const params: { parent: HDWallet } = { parent: wallet }
                                    navigation.navigate('walletInfo', params)
                                }}
                                key={wallet.address}>
                                <View style={tailwind(`w-8 h-8 bg-gray-200 rounded-full`)}></View>
                                <View style={tailwind(`flex-1 pl-4`)}>
                                    <Text style={tailwind(`text-black text-lg`)}>
                                        {wallet.name + ' ' + (wallet.index + 1)}
                                    </Text>
                                </View>
                                <View style={tailwind(`w-8 h-8 flex justify-center items-center`)}>
                                    <Icon 
                                        name="chevron-forward" 
                                        size={20}
                                        color={getColor('blue-600')}
                                    />
                                </View>
                            </Pressable>
                        ))
                    }
                </View> : <></>
            }
        </>
    )
}

export default Wallets