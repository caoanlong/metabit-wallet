import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { HeaderBackButton, Header, Screen } from '@react-navigation/elements'
import React, { useState } from "react"
import { Pressable, SafeAreaView, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useSelector } from "react-redux"
import Modal from "react-native-modal"
import tailwind, { getColor } from "tailwind-rn"
import { RootState } from "../../store"

const Stack = createNativeStackNavigator()

function Wallets() {
    const route = useRoute()
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const wallets = useSelector((state: RootState) => state.wallet.wallets)
    const [ showCreateModal, setShowCreateModal ] = useState<boolean>(false)
    const [ showMnemonic, setShowMnemonic ] = useState<boolean>(false)
    const [ isWalletInfoPopver, setIsWalletInfoPopver ] = useState<boolean>(false)
    
    return (
        <Screen 
            focused={true}
            navigation={navigation}
            route={route}
            header={(
                <Header 
                    headerLeftContainerStyle={tailwind(`pl-2`)}
                    headerRightContainerStyle={tailwind(`pr-2`)}
                    title={'钱包'} 
                    headerLeft={() => (
                        <HeaderBackButton 
                            onPress={navigation.goBack} 
                            labelVisible={true} 
                        />
                    )}
                    headerRight={() => (
                        <Pressable 
                            onPress={() => {
                                setShowCreateModal(true)

                            }}
                            style={tailwind(`w-10 h-10 flex justify-center items-end pl-3`)}>
                            <Icon name="add" size={30} color={Colors.black} />
                        </Pressable>
                    )}
                />
            )}>
            <>
                <View>
                    {
                        wallets.map((wallet: HDWallet) => (
                            <Pressable 
                                onPress={() => {
                                    const params: { parent: HDWallet } = { parent: wallet }
                                    navigation.navigate('walletInfo', params)
                                }}
                                key={wallet.chainCode}>
                                <View style={tailwind(`flex flex-row items-center p-4 bg-white mb-2`)}>
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
                                </View>
                            </Pressable>
                        ))
                    }
                </View>
                <Modal 
                    isVisible={showCreateModal}
                    style={tailwind(`m-0 justify-end`)}
                    onBackdropPress={() => setShowCreateModal(false)}
                    onBackButtonPress={() => setShowCreateModal(false)}
                    onSwipeComplete={() => setShowCreateModal(false)}
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
                                    setShowCreateModal(false)
                                    navigation.push('importWallet')
                                }}
                                style={tailwind(`w-56 py-3 border border-blue-600 rounded-full mb-6`)}>
                                <Text style={tailwind(`text-blue-600 text-lg text-center`)}>使用助记词导入</Text>
                            </Pressable>
                            <Pressable 
                                onPress={() => {
                                    setShowCreateModal(false)
                                    navigation.push('addWallet')
                                }}
                                style={tailwind(`w-56 py-3 bg-blue-600 rounded-full mb-16`)}>
                                <Text style={tailwind(`text-white text-lg text-center`)}>创建新钱包</Text>
                            </Pressable>
                        </View>
                    </SafeAreaView>
                </Modal>
            </>
        </Screen>
    )
}

export default Wallets