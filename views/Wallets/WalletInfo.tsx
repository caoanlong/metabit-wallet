import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import React, { useState } from "react"
import { Alert, Pressable, ScrollView, Text, View } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard'
import { BlurView } from "@react-native-community/blur"
import Icon from "react-native-vector-icons/Ionicons"
import tailwind, { getColor } from "tailwind-rn"
import { useDispatch, useSelector } from "react-redux"
import QRCode from 'react-native-qrcode-svg'
import { delWallet } from "../../store/actions/walletAction"
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderBar from "../../components/HeaderBar"
import { RootState } from "../../store"

function WalletInfo() {
    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets()
    const defaultHeight = getDefaultHeaderHeight(frame, false, insets.top)
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    const route = useRoute()
    const { wallet } = route.params as { wallet: HDWallet }
    const wallets: HDWallet[] = useSelector((state: RootState) => state.wallet.wallets)
    
    const [ showPrivateKey, setShowPrivateKey ] = useState<boolean>(false)

    return (
        <View style={tailwind(`absolute top-0 left-0 right-0 bottom-0`)}>
            <HeaderBar 
                title={'币种钱包详情'} 
                backgroundColor={getColor('blue-600')} 
                color={'#ffffff'} 
                right={
                    !wallet.parentKey && wallets.length === 1 ? <></> :
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
                        <Icon name="trash-outline" size={20} color={'#ffffff'} />
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
                <View style={tailwind(`flex items-center py-6 bg-blue-600`)}>
                    <View style={tailwind(`p-3 bg-white`)}>
                        <QRCode size={160} value={wallet.address} />
                    </View>
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
                            { wallet.alias ?? (wallet.name + ' ' + (wallet.index + 1)) }
                        </Text>
                    </View>
                    <View 
                        style={{
                            ...tailwind(`flex flex-row bg-white px-3 py-5`),
                            borderColor: '#ddd',
                            borderBottomWidth: 0.5
                        }}>
                        <Text style={tailwind(`text-base mr-3`)}>区块链网络</Text>
                        <Text style={tailwind(`flex-1 text-base text-right`)}>
                            { wallet.chain }
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
                            { wallet.address }
                        </Text>
                    </View>
                    <View
                        style={{
                            ...tailwind(`relative bg-white py-3 px-3`),
                            borderColor: '#ddd',
                            borderBottomWidth: 0.5
                        }}>
                        {
                            showPrivateKey ? <></> :
                            <>
                                <View style={tailwind(`absolute z-20 top-0 left-0 right-0 bottom-0 flex flex-row justify-center items-center`)}>
                                    <Pressable 
                                        onPress={() => {
                                            setShowPrivateKey(true)
                                        }}
                                        style={tailwind(`w-32 h-10 bg-blue-600 rounded-full flex items-center justify-center`)}>
                                        <Text style={tailwind(`text-white text-sm text-center`)}>查看私钥</Text>
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
                                Clipboard.setString(wallet.privateKey)
                            }}>
                            <Text style={tailwind(`text-base`)}>
                                {wallet.privateKey}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default WalletInfo