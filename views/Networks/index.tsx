import React from "react"
import { Platform, Pressable, StatusBar, Text, useColorScheme, View } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from 'react-native-vector-icons/Ionicons'
import tailwind, { getColor } from "tailwind-rn"
import { MAINNET, networkList } from "../../config"
import { RootState } from "../../store"
import { setNetworkType } from "../../store/actions/networkAction"

function Networks() {
    const isDarkMode = useColorScheme() === 'dark'
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    const { networkType } = useSelector((state: RootState) => state.network)
    const otherNetworkKeys = Object.keys(networkList).filter((item) => item !== MAINNET)

    return (
        <View>
            <StatusBar
                barStyle={Platform.select({ ios: 'light-content', default: isDarkMode ? 'light-content' : 'dark-content' })}
            />
            <View style={tailwind(`h-14 flex flex-row bg-white`)}>
                <View style={tailwind(`w-14`)}></View>
                <View style={tailwind(`flex-1 flex justify-center items-center`)}>
                    <Text style={tailwind(`text-lg`)}>网络切换</Text>
                </View>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    style={tailwind(`w-14 flex justify-center items-center`)}>
                    <Icon name="close" size={26} color={getColor('blue-600')} />
                </Pressable>
            </View>
            <View style={tailwind(`p-4`)}>
                <Text style={tailwind(`text-gray-400 py-2`)}>主网络</Text>
                <View style={tailwind(`mb-4`)}>
                    <Pressable 
                        onPress={() => {
                            dispatch(setNetworkType(MAINNET))
                            navigation.goBack()
                        }}
                        style={tailwind(`flex flex-row bg-white p-4 rounded-md`)}>
                        <Text style={tailwind(`flex-1 text-base`)}>
                            {networkList[MAINNET].name}
                        </Text>
                        <View style={tailwind(`w-8 flex items-center justify-center`)}>
                            {
                                networkType === MAINNET ?
                                <Icon name="checkmark" size={20} color={getColor('blue-600')} /> : <></>
                            }
                        </View>
                    </Pressable>
                </View>
                <Text style={tailwind(`text-gray-400 py-2`)}>其他网络</Text>
                <View>
                    {
                        otherNetworkKeys.map((item, i) => (
                            <Pressable 
                                key={item} 
                                onPress={() => {
                                    dispatch(setNetworkType(item))
                                    navigation.goBack()
                                }}
                                style={tailwind(`flex flex-row bg-white p-4 rounded-md ${i === 0 ? '' : 'mt-3'}`)}>
                                <Text style={tailwind(`flex-1 text-base`)}>
                                    {networkList[item].name}
                                </Text>
                                <View style={tailwind(`w-8 flex items-center justify-center`)}>
                                    {
                                        networkType === item ?
                                        <Icon name="checkmark" size={20} color={getColor('blue-600')} /> : <></>
                                    }
                                </View>
                            </Pressable>
                        ))
                    }
                </View>
            </View>
        </View>
    )
}

export default Networks