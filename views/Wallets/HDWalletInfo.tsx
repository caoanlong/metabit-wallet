import { ParamListBase, useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import React, { useEffect, useState } from "react"
import { Alert, Pressable, ScrollView, Text, View } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard'
import { BlurView } from "@react-native-community/blur"
import Icon from "react-native-vector-icons/Ionicons"
import tailwind, { getColor } from "tailwind-rn"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useDispatch, useSelector } from "react-redux"
import { delWallet } from "../../store/actions/walletAction"
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"
import { RootState } from "../../store"
import HeaderBar from "../../components/HeaderBar"
import WalletItem from "./WalletItem"

function HDWalletInfo() {
    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets()
    const defaultHeight = getDefaultHeaderHeight(frame, false, insets.top)
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const route = useRoute()
    const { wallet } = route.params as { wallet: HDWallet }
    const wallets: HDWallet[] = useSelector((state: RootState) => state.wallet.wallets)
    const [ hdWallet, setHdWallet ] = useState(wallet)
    const [ showMnemonic, setShowMnemonic ] = useState<boolean>(false)

    useEffect(() => {
        if (!isFocused) return
        const w = wallets.find((item: HDWallet) => item.chainCode === wallet.chainCode) as HDWallet
        setHdWallet(w)
    }, [isFocused])
    
    return (
        <View style={tailwind(`absolute top-0 left-0 right-0 bottom-0`)}>
            <HeaderBar 
                title={wallet.address ? '币种钱包详情' : 'HD钱包详情'} 
                backgroundColor={getColor('blue-600')} 
                color={'#ffffff'} 
                right={
                    wallets.length === 1 ? <></> : 
                    <Pressable 
                        onPress={() => {
                            Alert.alert('提示', '确定删除钱包？', [
                                {
                                    text: "取消",
                                },
                                {
                                    text: "确定",
                                    onPress: () => {
                                        dispatch(delWallet(wallet))
                                        navigation.goBack()
                                    },
                                }
                            ])
                        }}
                        style={tailwind(`w-full h-full flex items-center justify-center`)}>
                        <Icon name="trash-outline" size={20} color={Colors.white} />
                    </Pressable>
                }
            />
            <View style={tailwind(`bg-blue-600 absolute z-0 top-0 left-0 right-0 h-1/3`)}></View>
            <ScrollView 
                contentInset={{ top: 0, left: 0, right: 0, bottom: 100 }}
                style={{
                    ...tailwind(`relative h-full z-10`), 
                    paddingTop: defaultHeight
                }}>
                <View style={tailwind(`flex items-center py-10 bg-blue-600`)}>
                    {
                        hdWallet.address ? <></> : 
                        <Pressable 
                            onPress={() => {
                                const params: { parent: HDWallet } = { parent: hdWallet }
                                navigation.push('deriveWallet', params)
                            }}
                            style={tailwind(`w-56 py-2 bg-white rounded-full`)}>
                            <Text style={tailwind(`text-blue-600 text-sm text-center`)}>派生币种钱包</Text>
                        </Pressable>
                    }
                </View>
                <View style={tailwind(`bg-gray-100`)}>
                    <View 
                        style={{
                            ...tailwind(`flex flex-row bg-white px-3 py-5`),
                            borderColor: '#ddd',
                            borderBottomWidth: 0.5
                        }}>
                        <Text style={tailwind(`text-base mr-3`)}>名称</Text>
                        <Text style={tailwind(`flex-1 text-base text-right`)}>
                            { hdWallet.alias ?? (hdWallet.name + ' ' + (hdWallet.index + 1)) }
                        </Text>
                    </View>
                    <View
                        style={{
                            ...tailwind(`relative bg-white py-3 px-3`),
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
                                        <Text style={tailwind(`text-white text-sm text-center`)}>查看助记词</Text>
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
                        <Pressable 
                            onPress={() => {
                                Clipboard.setString(wallet.mnemonic?.phrase ?? '')
                            }}>
                            <Text style={tailwind(`text-base`)}>
                                {hdWallet.mnemonic?.phrase}
                            </Text>
                        </Pressable>
                    </View>
                    {
                        wallet.children && wallet.children.length ?
                        <View style={tailwind(`px-3 py-2`)}>
                            <Text style={tailwind(`py-4 text-sm text-gray-600`)}>币种钱包</Text>
                            {
                                wallet.children.map((item: HDWallet) => (
                                    <WalletItem 
                                        key={item.address + item.chain + item.index} 
                                        wallet={item} 
                                    />
                                ))
                            }
                        </View> : <></>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default HDWalletInfo