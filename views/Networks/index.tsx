import React from "react"
import { Platform, Pressable, StatusBar, Text, useColorScheme, View } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from 'react-native-vector-icons/Ionicons'
import tailwind, { getColor } from "tailwind-rn"
import { Network, NETWORK_MAP } from "../../config"
import { RootState } from "../../store"
import { setNetworkType } from "../../store/actions/walletAction"

function Networks() {
    const isDarkMode = useColorScheme() === 'dark'
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    const networkType = useSelector((state: RootState) => state.wallet.networkType)
    const selectedWallet: HDWallet = useSelector((state: RootState) => state.wallet.selectedWallet)
    const networks = Object.keys(NETWORK_MAP[selectedWallet.chain as string]).map((item: string) => NETWORK_MAP[selectedWallet.chain as string][item])
    
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
                {
                    networks.map((item: Network, i) => (
                        <Pressable 
                            key={item.name} 
                            onPress={() => {
                                dispatch(setNetworkType(item.networkType))
                                navigation.goBack()
                            }}
                            style={tailwind(`flex flex-row bg-white p-4 rounded-md ${i === 0 ? '' : 'mt-3'}`)}>
                            <Text style={tailwind(`flex-1 text-base`)}>
                                {item.name}
                            </Text>
                            <View style={tailwind(`w-8 flex items-center justify-center`)}>
                                {
                                    networkType === item.networkType ?
                                    <Icon name="checkmark" size={20} color={getColor('blue-600')} /> : <></>
                                }
                            </View>
                        </Pressable>
                    ))
                }
            </View>
        </View>
    )
}

export default Networks