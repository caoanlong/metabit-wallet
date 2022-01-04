import { ParamListBase, useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import tailwind from "tailwind-rn"
import { createWalletByMnemonic } from "../../utils"

function GenerateMnemonic() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const [ mnemonic, setMnemonic ] = useState<string[]>([])

    useEffect(() => {
        const root = createWalletByMnemonic()
        if (root && root.mnemonic && root.mnemonic.phrase) {
            setMnemonic(root.mnemonic.phrase.split(' '))
        }
    }, [])

    return (
        <View style={tailwind(`p-4 h-full bg-white`)}>
            <Text style={tailwind(`text-lg text-center mb-3`)}>写下您的助记词</Text>
            <Text style={{ ...tailwind(`text-sm text-center text-gray-600`), lineHeight: 24 }}>
                这是您的助记词。将它写在纸上并存放在安全的地方。您将需要在下一步中重新输入此助记词（按顺序）。
            </Text>
            <View 
                style={{ 
                    ...tailwind(`border-gray-200 rounded-md p-3 my-4 flex flex-row flex-wrap`), 
                    borderWidth: 0.5, 
                }}>
                {
                    mnemonic.map((item: string, i: number) => (
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
            <Pressable 
                onPress={() => {
                    navigation.push('confirmMnemonic', { mnemonic })
                }}
                style={tailwind(`py-3 rounded-full bg-blue-600`)}>
                <Text style={tailwind(`text-white text-lg text-center`)}>下一步</Text>
            </Pressable>
        </View>
    )
}

export default GenerateMnemonic