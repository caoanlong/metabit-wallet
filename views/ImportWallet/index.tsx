import { ParamListBase, useNavigation, useRoute } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Clipboard from '@react-native-clipboard/clipboard'
import tailwind, { getColor } from "tailwind-rn"
import { useDispatch, useSelector } from 'react-redux'
import { createWallet, importWalletByPrivateKey } from "../../store/actions/walletAction"
import { CHAINS } from "../../config"
import { RootState } from "../../store"

function ImportWallet() {
    const route = useRoute()
    const type = (route.params as any).type as string
    const action = (route.params as any).action as string
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    const wallets = useSelector((state: RootState) => state.wallet.wallets) as HDWallet[]
    const [ text, setText ] = useState<string>('')
    const [ chain, setChain ] = useState<string>('Ethereum')
    const [ toastVisible, setToastVisible ] = useState<boolean>(false)
    const [ toastText, setToastText ] = useState<string>('')
    return (
        <View style={tailwind(`relative`)}>
            <View style={tailwind(`flex flex-row bg-white h-14`)}>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    style={tailwind(`w-12 flex justify-center items-center`)}>
                    <Icon name="chevron-back" size={24} color={getColor('purple-600')} />
                </Pressable>
                <View style={tailwind(`flex-1 flex justify-center`)}>
                    <Text style={tailwind(`text-base text-center text-black`)}>
                        { type === 'mnemonic' ? '从助记词导入' : '从私钥导入'}
                    </Text>
                </View>
                <Pressable 
                    onPress={async () => {
                        const txt = await Clipboard.getString()
                        setText(txt)
                    }}
                    style={tailwind(`w-12 flex items-center justify-center`)}>
                    <Text style={tailwind(`text-purple-600`)}>粘贴</Text>
                </Pressable>
            </View>
            <View style={tailwind(`h-full bg-white p-4`)}>
                <TextInput
                    style={{
                        ...tailwind(`h-36 p-3 text-base rounded-md bg-gray-100 border-gray-200`),
                        borderWidth: 0.5,
                        lineHeight: 20
                    }}
                    multiline
                    numberOfLines={10}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    autoCompleteType={'off'}
                    onChangeText={t => {
                        console.log(t)
                        setText(t)
                    }}
                    value={text}
                />
                {
                    type !== 'mnemonic' ? 
                    <>
                        <Text style={tailwind(`py-2 text-gray-500`)}>请选择区块链网络</Text>
                        <View style={tailwind(`flex flex-row flex-wrap`)}>
                            {
                                CHAINS.map((item: string, i: number) => (
                                    <Pressable 
                                        key={item}
                                        onPress={() => setChain(item)}
                                        style={{ 
                                            ...tailwind(`${chain === item ? 'bg-green-500' : 'bg-gray-100'} flex items-center py-1 rounded-md`),
                                            width: '30%',
                                            marginLeft: (i-1) % 3 ? 0 : '5%',
                                            marginRight: (i-1) % 3 ? 0 : '5%'
                                        }}>
                                        <Text style={tailwind(`${chain === item ? 'text-white' : 'text-gray-400'} text-base`)}>{item}</Text>
                                    </Pressable>
                                ))
                            }
                        </View>
                    </> : 
                    <Text style={tailwind(`text-gray-500 py-2`)}>
                        使用助记词导入默认创建以太坊和波场钱包，如需添加其他钱包，导入后进入钱包详情进行派生
                    </Text>
                }
                
                <Pressable 
                    disabled={!text.trim()}
                    onPress={() => {
                        try {
                            const isSelect = !(action && action === 'back')
                            if (type === 'mnemonic') {
                                const mnemonic = text.trim()
                                dispatch(createWallet(mnemonic, isSelect))
                            } else if (type === 'privateKey') {
                                const privateKey = text.trim()
                                dispatch(importWalletByPrivateKey(privateKey, chain, isSelect))
                            }
                            if (action && action === 'back') {
                                navigation.goBack()
                            } else {
                                navigation.replace('main')
                            }
                        } catch (error: any) {
                            console.log(error)
                            setToastText(JSON.stringify(error))
                            setToastVisible(true)
                            setTimeout(() => {
                                setToastVisible(false)
                            }, 1500)
                        }
                    }}
                    style={tailwind(`mt-8 py-3 rounded-full mb-16 ${!text.trim() ? 'bg-purple-200' : 'bg-purple-600'}`)}>
                    <Text style={tailwind(`text-white text-lg text-center`)}>导入</Text>
                </Pressable>
            </View>
            {
                toastVisible ? 
                <View style={tailwind(`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center`)}>
                    <View style={tailwind(`p-3 bg-black rounded`)}>
                        <Text style={tailwind(`text-white`)}>{toastText}</Text>
                    </View>
                </View> : <></>
            }
            
        </View>
    )
}

export default ImportWallet