import { ParamListBase, useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import { Pressable, Text, View } from "react-native"
import tailwind from "tailwind-rn"
import { displayName as appName } from '../../app.json'

function Entry() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    return (
        <View style={tailwind(`h-full bg-white flex justify-around`)}>
            <View style={tailwind(`flex items-center`)}>
                <Text style={tailwind(`text-xl text-purple-600 mb-20 font-bold`)}>{appName}</Text>
                <Text style={tailwind(`text-2xl mb-6`)}>钱包设置</Text>
                <Text style={tailwind(`text-sm text-gray-500`)}>导入现有钱包或创建新钱包</Text>
            </View>
            <View style={tailwind(`flex items-center`)}>
                <Pressable 
                    onPress={() => navigation.push('importWallet', { type: 'mnemonic' })}
                    style={tailwind(`w-56 py-3 border border-purple-600 rounded-full mb-6`)}>
                    <Text style={tailwind(`text-purple-600 text-lg text-center`)}>使用助记词导入</Text>
                </Pressable>
                <Pressable 
                    onPress={() => navigation.push('importWallet', { type: 'privateKey' })}
                    style={tailwind(`w-56 py-3 border border-purple-600 rounded-full mb-6`)}>
                    <Text style={tailwind(`text-purple-600 text-lg text-center`)}>使用私钥导入</Text>
                </Pressable>
                <Pressable 
                    onPress={() => navigation.push('addWallet')}
                    style={tailwind(`w-56 py-3 bg-purple-600 rounded-full mb-16`)}>
                    <Text style={tailwind(`text-white text-lg text-center`)}>创建新钱包</Text>
                </Pressable>
                <Text style={tailwind(`text-gray-500 text-xs text-center`)}>继续表示您同意这些条款和条件</Text>
            </View>
        </View>
    )
}

export default Entry