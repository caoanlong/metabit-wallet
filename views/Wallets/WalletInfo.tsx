import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard'
import Modal from "react-native-modal"
import tailwind from "tailwind-rn"

function WalletInfo() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const route = useRoute()
    const { parent } = route.params as { parent: HDWallet }
    
    const [ name, setName ] = useState<string>(parent.name + ' ' + parent.index)
    const [ showModal, setShowModal ] = useState<boolean>(false)

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
                <View
                    style={{
                        ...tailwind(`flex flex-row justify-center bg-white py-3`),
                        borderColor: '#ddd',
                        borderBottomWidth: 0.5
                    }}>
                    <Pressable 
                        onPress={() => {
                            setShowModal(true)
                        }}
                        style={tailwind(`w-40 py-2 bg-blue-600 rounded-full mr-3`)}>
                        <Text style={tailwind(`text-white text-sm text-center`)}>查看助记词</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() => {
                            
                        }}
                        style={tailwind(`w-40 py-2 border border-blue-600 rounded-full`)}>
                        <Text style={tailwind(`text-blue-600 text-sm text-center`)}>添加钱包</Text>
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
                onBackdropPress={() => setShowModal(false)}
                onBackButtonPress={() => setShowModal(false)}
                onSwipeComplete={() => setShowModal(false)}
                propagateSwipe>
                <View style={tailwind(`bg-white rounded-lg px-4 py-8`)}>
                    <Text style={tailwind(`text-base`)}>{parent.mnemonic?.phrase}</Text>
                    <View
                        style={tailwind(`flex flex-row justify-center mt-4`)}>
                        <Pressable 
                            onPress={() => {
                                Clipboard.setString(parent.mnemonic?.phrase ?? '')
                                setShowModal(false)
                            }}
                            style={tailwind(`w-40 py-2 bg-blue-600 rounded-full`)}>
                            <Text style={tailwind(`text-white text-sm text-center`)}>复制</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default WalletInfo