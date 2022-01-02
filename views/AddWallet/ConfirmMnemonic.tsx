import { ParamListBase, useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { useSelector } from "react-redux"
import tailwind from "tailwind-rn"
import lodash from 'lodash'
import { RootState } from "../../store"

function ConfirmMnemonic() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const selectedWallet: HDWallet = useSelector((state: RootState) => state.wallet.selectedWallet)
    const mnemonic = selectedWallet?.mnemonic?.phrase?.split(' ')
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
                disabled={selected.join(' ') !== selectedWallet?.mnemonic?.phrase}
                onPress={() => {
                    navigation.replace('main')
                }}
                style={tailwind(`py-3 rounded-full ${selected.join(' ') !== selectedWallet?.mnemonic?.phrase ? 'bg-blue-200' : 'bg-blue-600'}`)}>
                <Text style={tailwind(`text-white text-lg text-center`)}>完成</Text>
            </Pressable>
        </View>
    )
}

export default ConfirmMnemonic