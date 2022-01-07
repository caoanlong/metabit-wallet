import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import React, { useEffect, useState } from "react"
import { Alert, Platform, Pressable, SafeAreaView, StatusBar, Text, useColorScheme, View } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard'
import { BlurView } from "@react-native-community/blur"
import Icon from "react-native-vector-icons/Ionicons"
import tailwind from "tailwind-rn"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useDispatch } from "react-redux"
import { delRootWallet } from "../../store/actions/walletAction"
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"

function WalletInfo() {
    const isDarkMode = useColorScheme() === 'dark'
    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets()
    const defaultHeight = getDefaultHeaderHeight(frame, false, insets.top)
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    const route = useRoute()
    const { parent } = route.params as { parent: HDWallet }
    
    const [ name, setName ] = useState<string>(parent.name + ' ' + parent.index)
    const [ showMnemonic, setShowMnemonic ] = useState<boolean>(false)

    useEffect(() => {
        navigation.setOptions({ title: parent.name + ' ' + parent.index })
    }, [])

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
                        <Text style={tailwind(`text-base text-center text-white`)}>
                            {parent.address ? '币种钱包详情' : 'HD钱包详情'}
                        </Text>
                    </View>
                    <Pressable 
                        onPress={() => {
                            Alert.alert('提示', '确定删除钱包？', [
                                {
                                    text: "取消",
                                },
                                {
                                    text: "确定",
                                    onPress: () => {
                                        dispatch(delRootWallet(parent.publicKey))
                                        navigation.goBack()
                                    },
                                }
                            ])
                        }}
                        style={tailwind(`w-12 flex items-center justify-center`)}>
                        <Icon name="trash-outline" size={20} color={Colors.white} />
                    </Pressable>
                </View>
                <View style={tailwind(`flex items-center py-6`)}>
                    {
                        parent.address ? <></> : 
                        <Pressable 
                            onPress={() => {
                                const params: { parent: HDWallet } = { parent }
                                navigation.push('deriveWallet', params)
                            }}
                            style={tailwind(`w-56 py-2 bg-white rounded-full mb-3`)}>
                            <Text style={tailwind(`text-blue-600 text-sm text-center`)}>派生币种钱包</Text>
                        </Pressable>
                    }
                </View>
            </View>
            <View>
                <View 
                    style={{
                        ...tailwind(`flex flex-row bg-white px-3 py-5`),
                        borderColor: '#ddd',
                        borderBottomWidth: 0.5
                    }}>
                    <Text style={tailwind(`text-base mr-3`)}>名称</Text>
                    <Text style={tailwind(`flex-1 text-base text-right`)}>
                        { name }
                    </Text>
                </View>
                {
                    parent.address ?
                    <>
                        <View 
                            style={{
                                ...tailwind(`flex flex-row bg-white px-3 py-5`),
                                borderColor: '#ddd',
                                borderBottomWidth: 0.5
                            }}>
                            <Text style={tailwind(`text-base mr-3`)}>区块链网络</Text>
                            <Text style={tailwind(`flex-1 text-base text-right`)}>
                                { parent.chain }
                            </Text>
                        </View>
                        <View 
                            style={{
                                ...tailwind(`flex flex-row bg-white px-3 py-5`),
                                borderColor: '#ddd',
                                borderBottomWidth: 0.5
                            }}>
                            <Text style={tailwind(`text-base mr-3`)}>地址</Text>
                            <Text style={tailwind(`flex-1 text-base text-right`)}>
                                { parent.address }
                            </Text>
                        </View>
                    </> : <></>
                }
                <View
                    style={{
                        ...tailwind(`relative bg-white py-3 px-2`),
                        borderColor: '#ddd',
                        borderBottomWidth: 0.5
                    }}>
                    {
                        showMnemonic ? <></> :
                        <>
                            <View style={tailwind(`absolute z-20 top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center`)}>
                                <Pressable 
                                    onPress={() => {
                                        setShowMnemonic(true)
                                    }}
                                    style={tailwind(`w-32 h-10 bg-blue-600 rounded-full flex items-center justify-center`)}>
                                    <Text style={tailwind(`text-white text-sm text-center`)}>
                                        {
                                            parent.address ? '查看私钥' : '查看助记词'
                                        }
                                    </Text>
                                </Pressable>
                            </View>
                            <BlurView
                                style={tailwind(`absolute z-10 top-0 left-0 right-0 bottom-0`)}
                                blurType="light"
                                blurAmount={3}
                                reducedTransparencyFallbackColor="white"
                            />
                        </>
                    }
                    <Text style={tailwind(`text-base`)}>
                        {parent.address ? parent.privateKey : parent.mnemonic?.phrase}
                    </Text>
                    <Pressable 
                        onPress={() => Clipboard.setString(parent.address ? parent.privateKey : (parent.mnemonic?.phrase ?? ''))}>
                        <Text style={tailwind(`text-yellow-500 text-base text-center`)}>点击复制</Text>
                    </Pressable>
                </View>
                {
                    parent.address ? <></> : 
                    <>
                        <Text style={tailwind(`px-3 py-4 text-sm text-gray-600`)}>币种钱包</Text>
                        <View>
                            {
                                parent.children?.map((wallet: HDWallet) => (
                                    <Pressable 
                                        onPress={() => {
                                            
                                        }}
                                        key={wallet.address + wallet.chain + wallet.index}>
                                        <View style={tailwind(`flex flex-row items-center p-4 bg-white mb-2`)}>
                                            <View style={tailwind(`w-8 h-8 bg-gray-200 rounded-full`)}></View>
                                            <View style={tailwind(`flex-1 pl-4`)}>
                                                <Text style={tailwind(`text-black text-lg`)}>
                                                    {wallet.name + ' ' + (wallet.index + 1)}
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                ))
                            }
                        </View>
                    </>
                }
            </View>
        </>
    )
}

export default WalletInfo