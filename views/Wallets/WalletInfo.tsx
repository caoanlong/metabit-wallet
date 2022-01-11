import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import React, { useState } from "react"
import { Pressable, ScrollView, Text, View, SafeAreaView, TextInput, Alert } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard'
import Toast from 'react-native-root-toast'
import tailwind, { getColor } from "tailwind-rn"
import { useDispatch, useSelector } from "react-redux"
import QRCode from 'react-native-qrcode-svg'
import Icon from "react-native-vector-icons/Ionicons"
import Modal from "react-native-modal"
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderBar from "../../components/HeaderBar"
import { RootState } from "../../store"
import { DEL_WALLET, SET_WALLET } from "../../store/constants"

function WalletInfo() {
    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets()
    const defaultHeight = getDefaultHeaderHeight(frame, false, insets.top)
    const dispatch = useDispatch()
    const route = useRoute()
    const { id } = route.params as { id: string }
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const wallets: HDWallet[] = useSelector((state: RootState) => state.wallet.wallets)
    const selectedWallet: HDWallet = useSelector((state: RootState) => state.wallet.selectedWallet)
    const wallet = wallets.find((item: HDWallet) => item.id === id) as HDWallet
    const [ showPrivateKey, setShowPrivateKey ] = useState<boolean>(false)
    const [ showEditAliasModal, setShowEditAliasModal ] = useState<boolean>(false)
    const [ alias, setAlias ] = useState<string>(wallet.alias ?? (wallet.name + ' ' + (wallet.index + 1)))

    return (
        <>
            <View style={tailwind(`absolute top-0 left-0 right-0 bottom-0`)}>
                <HeaderBar 
                    title={'币种钱包详情'} 
                    backgroundColor={getColor('purple-600')} 
                    color={'#ffffff'}
                    right={
                        selectedWallet.id === wallet.id ? <></> : 
                        <Pressable 
                            onPress={() => {
                                Alert.alert('提示', '确定删除钱包？', [
                                    {
                                        text: "取消",
                                    },
                                    {
                                        text: "确定",
                                        onPress: () => {
                                            const list = wallets.filter((item: HDWallet) => item.id !== wallet.id)
                                            setTimeout(() => {
                                                dispatch({ type: DEL_WALLET, payload: list })
                                            }, 50)
                                            if (list.length === 0) {
                                                navigation.replace('entry')
                                            } else {
                                                navigation.goBack()
                                            }
                                        }
                                    }
                                ])
                            }}
                            style={tailwind(`w-full h-full flex items-center justify-center`)}>
                            <Icon name="trash-outline" size={20} color={'#ffffff'} />
                        </Pressable>
                    }
                />
                <View style={tailwind(`bg-purple-600 absolute z-0 top-0 left-0 right-0 h-1/3`)}></View>
                <View 
                    style={{
                        ...tailwind(`relative h-full z-10`), 
                        paddingTop: defaultHeight
                    }}>
                    <ScrollView>
                        <View style={tailwind(`flex items-center py-6 bg-purple-600`)}>
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
                                <Pressable 
                                    onPress={() => {
                                        setShowEditAliasModal(true)
                                    }}
                                    style={tailwind(`w-10 flex justify-center items-center`)}>
                                    <Icon 
                                        name="create-outline" 
                                        size={20}
                                        color={getColor('purple-600')}
                                    />
                                </Pressable>
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
                                                style={tailwind(`w-32 h-10 bg-purple-600 rounded-full flex items-center justify-center`)}>
                                                <Text style={tailwind(`text-white text-sm text-center`)}>查看私钥</Text>
                                            </Pressable>
                                        </View>
                                        <View style={tailwind(`absolute z-10 top-0 left-0 right-0 bottom-0 bg-white`)}></View>
                                    </>
                                }
                                <Pressable 
                                    onPress={() => {
                                        Clipboard.setString(wallet.privateKey)
                                        Toast.show('复制成功', {
                                            position: Toast.positions.CENTER,
                                            shadow: false
                                        })
                                    }}>
                                    <Text style={tailwind(`text-base`)}>
                                        {wallet.privateKey}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <Modal 
                isVisible={showEditAliasModal}
                style={tailwind(`m-0 justify-end`)}
                onBackdropPress={() => setShowEditAliasModal(false)}
                onBackButtonPress={() => setShowEditAliasModal(false)}
                onSwipeComplete={() => setShowEditAliasModal(false)}
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
                    <Text style={tailwind(`text-base text-center text-gray-600`)}>修改名称</Text>
                    <View style={tailwind(`p-3`)}>
                        <TextInput
                            style={{
                                ...tailwind(`h-14 p-3 text-base rounded-md bg-gray-100 border-gray-200`),
                                borderWidth: 0.5
                            }}
                            onChangeText={t => {
                                setAlias(t)
                            }}
                            value={alias}
                        />
                    </View>
                    <View style={tailwind(`flex flex-row items-center p-4`)}>
                        <Pressable 
                            onPress={() => {
                                setShowEditAliasModal(false)
                            }}
                            style={tailwind(`flex-1 py-2 border border-purple-600 rounded-full mr-4`)}>
                            <Text style={tailwind(`text-purple-600 text-lg text-center`)}>取消</Text>
                        </Pressable>
                        <Pressable 
                            onPress={() => {
                                wallet.alias = alias
                                dispatch({
                                    type: SET_WALLET,
                                    payload: wallet
                                })
                                setShowEditAliasModal(false)
                            }}
                            style={tailwind(`flex-1 py-2 border border-purple-600 bg-purple-600 rounded-full`)}>
                            <Text style={tailwind(`text-white text-lg text-center`)}>确定</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    )
}

export default WalletInfo