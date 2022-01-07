import React from "react"
import { Pressable, Text, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import tailwind, { getColor } from "tailwind-rn"
import Icon from "react-native-vector-icons/Ionicons"


interface WalletItemProps {
    wallet: HDWallet
}
function WalletItem({ wallet }: WalletItemProps) {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    return (
        <Pressable 
            style={{
                ...tailwind(`flex flex-row items-center p-4 bg-white mb-3 rounded-lg`),
                shadowColor: '#000000',
                shadowRadius: 2,
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowOpacity: 0.03
            }}
            onPress={() => {
                const params: { wallet: HDWallet } = { wallet }
                if (wallet.type === -1) {
                    navigation.push('hdWalletInfo', params)
                } else {
                    navigation.push('walletInfo', params)
                }
            }}>
            <View style={tailwind(`w-8 h-8 bg-gray-200 rounded-full`)}></View>
            <View style={tailwind(`flex-1 pl-4`)}>
                <Text style={tailwind(`text-black text-lg`)}>
                    {wallet.alias ?? (wallet.name + ' ' + (wallet.index + 1))}
                </Text>
            </View>
            <View style={tailwind(`w-8 h-8 flex justify-center items-center`)}>
                <Icon 
                    name="chevron-forward" 
                    size={20}
                    color={getColor('blue-600')}
                />
            </View>
        </Pressable>
    )
}

export default WalletItem