import React from "react"
import { Image, Pressable, Text, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import tailwind, { getColor } from "tailwind-rn"
import Icon from "react-native-vector-icons/Ionicons"
import { CHAIN_MAP } from "../../config"


interface WalletItemProps {
    wallet: HDWallet
}
function WalletItem({ wallet }: WalletItemProps) {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    return (
        <Pressable 
            onPress={() => {
                const params: { id: string } = { id: wallet.id }
                if (wallet.type === -1) {
                    navigation.push('hdWalletInfo', params)
                } else {
                    navigation.push('walletInfo', params)
                }
            }}
            style={{
                ...tailwind(`flex flex-row items-center py-4 bg-white mb-3 rounded-lg`),
                shadowColor: '#000000',
                shadowRadius: 2,
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowOpacity: 0.03
            }}>
            <View style={tailwind(`w-14 flex items-center`)}>
                {
                    wallet.chain ?
                    <Image 
                        style={tailwind(`w-8 h-8 bg-gray-200 rounded-full`)} 
                        source={CHAIN_MAP[wallet.chain]} 
                    /> : 
                    <View style={tailwind(`w-8 h-8 bg-gray-500 rounded-full flex justify-center items-center`)}>
                        <Text style={tailwind(`text-gray-200 font-bold italic`)}>HD</Text>
                    </View>
                }
            </View>
            <View style={tailwind(`flex-1`)}>
                <Text style={tailwind(`text-black text-lg`)}>
                    {wallet.alias ?? (wallet.name + ' ' + (wallet.index + 1))}
                </Text>
            </View>
            <View style={tailwind(`w-10 h-8 flex justify-center items-center`)}>
                <Icon 
                    name="chevron-forward" 
                    size={20}
                    color={getColor('purple-600')}
                />
            </View>
        </Pressable>
    )
}

export default WalletItem