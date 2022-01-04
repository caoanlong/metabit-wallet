import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { HeaderBackButton } from '@react-navigation/elements'
import React, { useEffect, useState } from "react"
import { Pressable, SafeAreaView, Text, View } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard'
import Icon from "react-native-vector-icons/Ionicons"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useSelector } from "react-redux"
import Modal from "react-native-modal"
import tailwind, { getColor } from "tailwind-rn"
import { RootState } from "../../store"
import Popover from "react-native-popover-view"

const Stack = createNativeStackNavigator()

function Wallets() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const wallets = useSelector((state: RootState) => state.wallet.wallets)
    const [ showCreateModal, setShowCreateModal ] = useState<boolean>(false)
    const [ showMnemonic, setShowMnemonic ] = useState<boolean>(false)
    const [ isWalletInfoPopver, setIsWalletInfoPopver ] = useState<boolean>(false)

    /**
     * 钱包列表
     * @returns 
     */
    const WalletList = () => {
        return (
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
        )
    }

    /**
     * 钱包详情，包含币种钱包列表
     * @returns 
     */
    const WalletInfo = () => {
        const route = useRoute()
        const { parent } = route.params as { parent: HDWallet }
        
        const [ name, setName ] = useState<string>(parent.name + ' ' + parent.index)
        
        useEffect(() => {
            navigation.setOptions({ title: parent.name + ' ' + parent.index })
        }, [])
        return (
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
                    {
                        showMnemonic ? 
                        <View
                            style={{
                                ...tailwind(`flex flex-row justify-center bg-white py-3`),
                                borderColor: '#ddd',
                                borderBottomWidth: 0.5
                            }}>
                            <Text style={tailwind(`text-base`)}>{parent.mnemonic?.phrase}</Text>
                        </View> : <></>
                    }
                    
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
            </>
        )
    }

    
    return (
        <Stack.Navigator 
            initialRouteName="walletList">
            <Stack.Screen 
                name="walletList" 
                component={WalletList}
                options={{
                    headerLeft: ({ tintColor }) => (
                        <HeaderBackButton 
                            style={tailwind(`relative -left-4`)}
                            labelVisible={true}
                            tintColor={tintColor}
                            onPress={navigation.goBack}
                        />
                    ),
                    headerTitle: '钱包',
                    headerRight: () => (
                        <Pressable 
                            onPress={() => {
                                setShowCreateModal(true)

                            }}
                            style={tailwind(`w-10 h-10 flex justify-center items-end pl-3`)}>
                            <Icon name="add" size={30} color={Colors.black} />
                        </Pressable>
                    )
                }} 
            />
            <Stack.Screen 
                name="walletInfo" 
                component={WalletInfo}
                options={{
                    headerRight: () => (
                        <Popover
                            from={(
                                <Pressable 
                                    style={tailwind(`w-10 h-10 flex justify-center items-end pl-3`)}>
                                    <Icon name="add" size={30} color={Colors.black} />
                                </Pressable>
                            )}>
                            <View style={tailwind(`py-4 px-6`)}>
                                <Pressable>
                                    <Text style={tailwind(`py-2 text-base`)}>修改名称</Text>
                                </Pressable>
                                <Pressable 
                                    onPress={() => setShowMnemonic(true)}>
                                    <Text style={tailwind(`py-2 text-base`)}>查看助记词</Text>
                                </Pressable>
                                <Pressable onPress={() => navigation.push('addWallet')}>
                                    <Text style={tailwind(`py-2 text-base`)}>添加钱包</Text>
                                </Pressable>
                            </View>
                        </Popover>
                    )
                }} 
            />
        </Stack.Navigator>
    )
}

export default Wallets