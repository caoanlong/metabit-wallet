import React, { useEffect, useState } from "react"
import { FlatList, Image, Platform, Pressable, StatusBar, Text, TextInput, useColorScheme, View } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from 'react-native-vector-icons/Ionicons'
import contractMap from '../../config/contractMap'
import tailwind, { getColor } from "tailwind-rn"
import { addToken } from "../../store/actions/walletAction"
import { RootState } from "../../store"
function AddToken() {
    const isDarkMode = useColorScheme() === 'dark'
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    // const tokenAll: ContractToken[] = Object.keys(contractMap).map((item: string) => {
    //     return {
    //         ...(contractMap as any)[item],
    //         address: item
    //     }
    // })
    // const { tokens } = useSelector((state: RootState) => state.wallet)
    // const tokenSymbols = tokens.map(item => item.symbol)
    // const [ tokenList, setTokenList ] = useState<ContractToken[]>(tokenAll)

    return (
        <View>
            <StatusBar
                barStyle={Platform.select({ ios: 'light-content', default: isDarkMode ? 'light-content' : 'dark-content' })}
            />
            <View style={tailwind(`h-14 flex flex-row bg-white`)}>
                <View style={tailwind(`w-14`)}></View>
                <View style={tailwind(`flex-1 flex justify-center items-center`)}>
                    <Text style={tailwind(`text-lg`)}>代币</Text>
                </View>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    style={tailwind(`w-14 flex justify-center items-center`)}>
                    <Icon name="close" size={26} color={getColor('blue-600')} />
                </Pressable>
            </View>
            <View style={tailwind(`h-14 py-2 px-4 bg-white`)}>
                <TextInput 
                    style={tailwind(`h-10 px-4 rounded-full bg-gray-200`)}
                    onChangeText={(text) => {
                        // const list = tokens.filter(item => {
                        //     if (item.symbol) {
                        //         return item.symbol.toLocaleUpperCase().includes(text.toLocaleUpperCase())
                        //     } else return false
                        // })
                        // setTokenList(list)
                    }}
                />
            </View>
            {/* <FlatList 
                style={tailwind(`p-4`)}
                data={tokenList} 
                keyExtractor={(item) => item.symbol} 
                renderItem={({item, index}) => (
                    <Pressable 
                        key={item.address} 
                        onPress={() => {
                            if (tokenSymbols.includes(item.symbol)) return
                            // dispatch(addToken(item))
                            navigation.goBack()
                        }}
                        style={tailwind(`flex flex-row items-center bg-white p-4 rounded-md ${index === 0 ? '' : 'mt-3'}`)}>
                        <Image
                            style={tailwind(`w-8 h-8 rounded-full bg-gray-200`)}
                            source={item.logo}
                        />
                        <Text style={tailwind(`flex-1 text-base pl-3`)}>
                            {item.symbol}
                        </Text>
                        <View style={tailwind(`w-8 flex items-center justify-center`)}>
                            {
                                tokenSymbols.includes(item.symbol) ?
                                <Icon 
                                    name="checkmark-circle-outline" 
                                    size={26} 
                                    color={getColor('gray-400')} 
                                /> :
                                <Icon 
                                    name="add-circle-outline" 
                                    size={26} 
                                    color={getColor('blue-600')} 
                                />
                            }
                        </View>
                    </Pressable>
                )}
            /> */}
        </View>
    )
}

export default AddToken