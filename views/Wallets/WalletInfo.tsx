import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { HeaderBackButton, Header, Screen } from '@react-navigation/elements'
import React, { useEffect, useState } from "react"
import { Pressable, SafeAreaView, Text, View } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard'
import { BlurView } from "@react-native-community/blur"
import Icon from "react-native-vector-icons/Ionicons"
import Modal from "react-native-modal"
import tailwind from "tailwind-rn"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useDispatch } from "react-redux"
import { delRootWallet } from "../../store/actions/walletAction"

function WalletInfo() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    const route = useRoute()
    const { parent } = route.params as { parent: HDWallet }
    
    const [ name, setName ] = useState<string>(parent.name + ' ' + parent.index)
    const [ showModal, setShowModal ] = useState<boolean>(false)
    const [ showMnemonic, setShowMnemonic ] = useState<boolean>(false)

    useEffect(() => {
        navigation.setOptions({ title: parent.name + ' ' + parent.index })
    }, [])
    return (
        <Screen 
            focused={true}
            navigation={navigation}
            route={route}
            header={(
                <Header 
                    headerLeftContainerStyle={tailwind(`pl-2`)}
                    headerRightContainerStyle={tailwind(`pr-2`)}
                    title={'HD钱包详情'} 
                    headerLeft={() => (
                        <HeaderBackButton 
                            onPress={navigation.goBack} 
                            labelVisible={true} 
                        />
                    )}
                    headerRight={() => (
                        <Pressable 
                            onPress={() => setShowModal(true)}
                            style={tailwind(`w-10 h-10 flex justify-center items-end pl-3`)}>
                            <Icon name="add" size={30} color={Colors.black} />
                        </Pressable>
                        
                    )}
                />
            )}>
            <>
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
                        <Text style={tailwind(`text-base`)}>{parent.mnemonic?.phrase}</Text>
                        <Pressable 
                            onPress={() => Clipboard.setString(parent.mnemonic?.phrase ?? '')}>
                            <Text style={tailwind(`text-yellow-500 text-base text-center`)}>点击复制</Text>
                        </Pressable>
                    </View>
                    <Text style={tailwind(`px-3 py-4 text-sm text-gray-600`)}>币种钱包</Text>
                    <View>
                        {
                            parent.children?.map((wallet: HDWallet) => (
                                <Pressable 
                                    onPress={() => {
                                        
                                    }}
                                    key={wallet.chainCode}>
                                    <View style={tailwind(`flex flex-row items-center p-4 bg-white mb-2`)}>
                                        <View style={tailwind(`w-8 h-8 bg-gray-200 rounded-full`)}></View>
                                        <View style={tailwind(`flex-1 pl-4`)}>
                                            <Text style={tailwind(`text-black text-lg`)}>{wallet.name + ' ' + wallet.index}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            ))
                        }
                    </View>
                </View>
                <Modal 
                    isVisible={showModal}
                    style={tailwind(`m-0 justify-end`)}
                    onBackdropPress={() => setShowModal(false)}
                    onBackButtonPress={() => setShowModal(false)}
                    onSwipeComplete={() => setShowModal(false)}
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
                        <View style={tailwind(`flex items-center mt-8`)}>
                            <Pressable 
                                onPress={() => {
                                    setShowModal(false)
                                    navigation.push('addWallet')
                                }}
                                style={tailwind(`w-56 py-3 bg-blue-600 rounded-full mb-6`)}>
                                <Text style={tailwind(`text-white text-lg text-center`)}>创建币种钱包</Text>
                            </Pressable>
                            <Pressable 
                                onPress={() => {
                                    setShowModal(false)
                                    dispatch(delRootWallet(parent.publicKey))
                                    navigation.goBack()
                                }}
                                style={tailwind(`w-56 py-3 border border-red-600 rounded-full mb-6`)}>
                                <Text style={tailwind(`text-red-600 text-lg text-center`)}>删除钱包</Text>
                            </Pressable>
                        </View>
                    </SafeAreaView>
                </Modal>
            </>
        </Screen>
    )
}

export default WalletInfo