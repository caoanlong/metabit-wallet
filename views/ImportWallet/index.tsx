import { ParamListBase, useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { Alert, Platform, Pressable, StatusBar, Text, TextInput, useColorScheme, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import tailwind, { getColor } from "tailwind-rn"
import { useDispatch } from 'react-redux'
import { createWallet } from "../../store/actions/walletAction"

function ImportWallet() {
    const isDarkMode = useColorScheme() === 'dark'
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    const [ text, setText ] = useState<string>('')
    return (
        <View style={tailwind(`h-full bg-white`)}>
            <StatusBar
                barStyle={Platform.select({ ios: 'light-content', default: isDarkMode ? 'light-content' : 'dark-content' })}
            />
            <View style={tailwind(`h-14 flex flex-row`)}>
                <View style={tailwind(`w-14`)}></View>
                <View style={tailwind(`flex-1 flex justify-center items-center`)}>
                    <Text style={tailwind(`text-lg`)}>从助记词导入</Text>
                </View>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    style={tailwind(`w-14 flex justify-center items-center`)}>
                    <Icon name="close" size={26} color={getColor('blue-600')} />
                </Pressable>
            </View>
            <View style={tailwind(`p-4`)}>
                <TextInput
                    style={{
                        ...tailwind(`h-36 p-3 text-base rounded-md bg-gray-100 border-gray-200`),
                        borderWidth: 0.5
                    }}
                    multiline
                    numberOfLines={10}
                    onChangeText={text => setText(text)}
                    value={text}
                />
                <Pressable 
                    disabled={!text.trim()}
                    onPress={() => {
                        try {
                            dispatch(createWallet(text.trim()))
                            navigation.replace('main')
                        } catch (error: any) {
                            Alert.alert(error)
                        }
                    }}
                    style={tailwind(`mt-8 py-3 rounded-full mb-16 ${!text.trim() ? 'bg-blue-200' : 'bg-blue-600'}`)}>
                    <Text style={tailwind(`text-white text-lg text-center`)}>导入</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ImportWallet