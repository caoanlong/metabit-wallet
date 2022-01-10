import { ParamListBase, useNavigation, useRoute } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useContext, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { useDispatch } from "react-redux"
import tailwind, { getColor } from "tailwind-rn"
import Icon from "react-native-vector-icons/Ionicons"
import lodash from 'lodash'
import { createWallet } from "../../store/actions/walletAction"
import { ActionContext } from "."

export interface FromGenerateMnemobicParams {
    mnemonic: string[]
}

function ConfirmMnemonic() {
    const context = useContext(ActionContext)
    const route = useRoute()
    const { mnemonic } = route.params as FromGenerateMnemobicParams
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    // 数组打乱
    const [ randomMnemonics, setRandomMnemonics ] = useState<string[]>(lodash.shuffle(mnemonic ? [...mnemonic] : []))
    const [ selected, setSelected ] = useState<string[]>(Array.apply(null, Array(12)).map(() => ''))
    const [ index, setIndex ] = useState<number>(0)
    const handleSelect = (item: string) => {
        selected[index] = item
        const rdms = randomMnemonics.filter((it: string) => it !== item)
        setSelected([...selected])
        setRandomMnemonics([...rdms])
        setIndex(index+1)
    }
    return (
        <>
            <View style={tailwind(`flex flex-row bg-white h-14`)}>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    style={tailwind(`w-12 flex justify-center items-center`)}>
                    <Icon name="chevron-back" size={24} color={getColor('blue-600')} />
                </Pressable>
                <View style={tailwind(`flex-1 flex justify-center`)}>
                    <Text style={tailwind(`text-base text-center text-white`)}>钱包</Text>
                </View>
                <View style={tailwind(`w-12`)} />
            </View>
            <View style={tailwind(`p-4 h-full bg-white`)}>
                <Text style={tailwind(`text-lg text-center mb-3`)}>确认助记词</Text>
                <Text style={{ ...tailwind(`text-sm text-center text-gray-600`), lineHeight: 24 }}>
                    按照之前呈现的顺序选择每个单词
                </Text>
                <View 
                    style={{ 
                        ...tailwind(`border-gray-200 rounded-md p-3 my-4 flex flex-row flex-wrap`), 
                        borderWidth: 0.5, 
                    }}>
                    {
                        selected.map((item: string, i: number) => (
                            <View 
                                key={i}
                                style={{ 
                                    ...tailwind(`flex flex-row px-3 py-2 rounded-full border-blue-500 border-dashed mr-3 ${i < 2 ? '' : 'mt-3'}`), 
                                    borderWidth: 0.5,
                                    width: '45%',
                                    marginRight: (i+1) % 2 ? '10%' : 0
                                }}>
                                <Text 
                                    style={tailwind(`w-12 text-center text-black`)}>
                                    {i + 1}.
                                </Text>
                                <Text 
                                    style={tailwind(`flex-1 text-black`)}>
                                    {item}
                                </Text>
                            </View>
                        ))
                    }
                </View>
                <View 
                    style={{ 
                        ...tailwind(`my-4 flex flex-row flex-wrap`), 
                    }}>
                    {
                        randomMnemonics.map((item: string, i: number) => (
                            <Pressable 
                                key={item}
                                onPress={() => handleSelect(item)}
                                style={{ 
                                    ...tailwind(`rounded-full border-blue-500 ${i < 3 ? '' : 'mt-3'}`), 
                                    borderWidth: 0.5,
                                    width: '30%',
                                    marginLeft: (i-1) % 3 ? 0 : '5%',
                                    marginRight: (i-1) % 3 ? 0 : '5%'
                                }}>
                                <Text 
                                    style={tailwind(`text-center py-2 text-black`)}>
                                    {item}
                                </Text>
                            </Pressable>
                        ))
                    }
                </View>
                <Pressable 
                    disabled={selected.join('') !== mnemonic.join('')}
                    onPress={() => {
                        try {
                            const isSelect = !(context && context.action === 'back')
                            dispatch(createWallet(mnemonic.join(' '), isSelect))
                            if (context && context.action === 'back') {
                                navigation.getParent()?.goBack()
                            } else {
                                navigation.replace('main')
                            }
                        } catch (error: any) {
                            console.log(error)
                        }
                    }}
                    style={tailwind(`py-3 rounded-full ${selected.join('') !== mnemonic.join('') ? 'bg-blue-200' : 'bg-blue-600'}`)}>
                    <Text style={tailwind(`text-white text-lg text-center`)}>完成</Text>
                </Pressable>
            </View>
        </>
    )
}

export default ConfirmMnemonic