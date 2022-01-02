import { ParamListBase, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { HeaderBackButton } from '@react-navigation/elements'
import React, { useEffect, useState } from "react"
import { Pressable, SafeAreaView, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useSelector } from "react-redux"
import Modal from "react-native-modal"
import tailwind, { getColor } from "tailwind-rn"
import { RootState } from "../../store"
import { ToSubWalletsParams } from "./SubWallets"
import AddWallet from "../AddWallet"
import ImportWallet from "../ImportWallet"

const Stack = createNativeStackNavigator()

const WalletList = () => {
    const wallets = useSelector((state: RootState) => state.wallet.wallets)
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    return (
        <View>
            {
                wallets.map((wallet: HDWallet) => (
                    <Pressable 
                        onPress={() => {
                            const params: ToSubWalletsParams = { parent: wallet }
                            navigation.navigate('subWallets', params)
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
    )
}

const WalletsAdd = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    return (
        <View style={tailwind(`h-full bg-white flex justify-center items-center`)}>
            <Pressable 
                onPress={() => navigation.push('importWallet')}
                style={tailwind(`w-56 py-3 border border-blue-600 rounded-full mb-6`)}>
                <Text style={tailwind(`text-blue-600 text-lg text-center`)}>使用助记词导入</Text>
            </Pressable>
            <Pressable 
                onPress={() => navigation.push('addWallet')}
                style={tailwind(`w-56 py-3 bg-blue-600 rounded-full mb-16`)}>
                <Text style={tailwind(`text-white text-lg text-center`)}>创建新钱包</Text>
            </Pressable>
        </View>
    )
}

function Wallets() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const [ showModal, setShowModal ] = useState<boolean>(false)

    return (
        <>
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
                                setShowModal(true)

                            }}
                            style={tailwind(`w-10 h-10 flex justify-center items-end pl-3`)}>
                            <Icon name="add" size={30} color={Colors.black} />
                        </Pressable>
                    )
                }} 
            />
            <Stack.Screen 
                name="walletListAdd"
                component={WalletsAdd}
                options={{
                    headerTitle: '添加钱包',
                    presentation: 'modal',
				    headerShown: false
                }}
            />
            <Stack.Screen 
                name="addWallet2" 
                component={AddWallet} 
                options={{ 
                    headerTitle: '添加钱包',
                    headerShown: false
                }} 
            />
            <Stack.Screen 
                name="importWallet2" 
                component={ImportWallet} 
                options={{ 
                    headerTitle: '导入钱包',
                    presentation: 'modal',
				    headerShown: false
                }} 
            />
        </Stack.Navigator>
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
                            navigation.push('importWallet2')
                        }}
                        style={tailwind(`w-56 py-3 border border-blue-600 rounded-full mb-6`)}>
                        <Text style={tailwind(`text-blue-600 text-lg text-center`)}>使用助记词导入</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() => {
                            setShowModal(false)
                            navigation.push('addWallet2')
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

export default Wallets