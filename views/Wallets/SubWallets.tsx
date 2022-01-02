import React from "react"
import { Pressable, Text, View } from "react-native"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import tailwind from "tailwind-rn"

export interface ToSubWalletsParams {
    parent: HDWallet
}

function SubWallets() {
    const route = useRoute()
    const { parent } = route.params as ToSubWalletsParams
    const subWallets = parent.children ?? []
    return (
        <View>
            {
                subWallets.map((wallet: HDWallet) => (
                    <Pressable 
                        onPress={() => {
                            
                        }}
                        key={wallet.chainCode}>
                        <View style={tailwind(`flex flex-row items-center p-4 bg-white mb-2`)}>
                            <View style={tailwind(`w-8 h-8 bg-gray-200 rounded-full`)}></View>
                            <View style={tailwind(`flex-1 pl-4`)}>
                                <Text style={tailwind(`text-black text-lg`)}>{wallet.name + ' ' + wallet.index}</Text>
                            </View>
                        </View>
                    </Pressable>
                ))
            }
        </View>
    )
}

export default SubWallets