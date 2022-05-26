import React, { useEffect, useState } from "react"
import { FlatList, Image, Platform, Pressable, ScrollView, StatusBar, Text, TextInput, useColorScheme, View } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from 'react-native-vector-icons/Ionicons'
import tailwind, { getColor } from "tailwind-rn"
import { addToken, getBalance, setToken } from "../../store/actions/walletAction"
import { RootState } from "../../store"
import { CHAIN_MAP, STATIC_URL } from "../../config"
function AddToken() {
    const isDarkMode = useColorScheme() === 'dark'
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    const selectedNetwork: Network = useSelector((state: RootState) => state.wallet.selectedNetwork)
    const tokens: ContractToken[] = useSelector((state: RootState) => {
        return state.wallet.tokens.filter((item: ContractToken) => item.network === selectedNetwork.shortName)
    })

    return (
        <View style={tailwind(`absolute top-0 left-0 right-0 bottom-0`)}>
            <StatusBar
                barStyle={Platform.select({ ios: 'light-content', default: isDarkMode ? 'light-content' : 'dark-content' })}
            />
            <View style={tailwind(`h-14 flex flex-row bg-white`)}>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    style={tailwind(`w-14 flex justify-center items-center`)}>
                    <Icon name="chevron-back" size={24} color={getColor('purple-600')} />
                </Pressable>
                <View style={tailwind(`flex-1 flex justify-center items-center`)}>
                    <Text style={tailwind(`text-base`)}>代币</Text>
                </View>
                <Pressable 
                    onPress={() => {

                    }}
                    style={tailwind(`w-14 flex justify-center items-center`)}>
                    <Icon name="close" size={26} color={getColor('purple-600')} />
                </Pressable>
            </View>
            <View style={tailwind(`h-16 py-2 px-4 bg-white`)}>
                <TextInput 
                    keyboardType={'web-search'}
                    style={tailwind(`h-10 px-4 rounded-full bg-gray-200`)}
                    onChangeText={(text) => {

                    }}
                />
            </View>
            <View 
                style={{
                    ...tailwind(`absolute left-0 right-0 bottom-0`),
                    top: 120
                }}>
                <ScrollView>
                    {
                        tokens.length ? 
                        <View style={tailwind(`p-3`)}>
                            {
                                tokens.map((item: ContractToken) => (
                                    <View 
                                        key={item.address} 
                                        style={{
                                            ...tailwind(`flex flex-row items-center bg-white rounded-lg mb-3 py-2`),
                                            shadowColor: '#000000',
                                            shadowRadius: 2,
                                            shadowOffset: {
                                                width: 0,
                                                height: 3
                                            },
                                            shadowOpacity: 0.03
                                        }}>
                                        <View style={tailwind(`w-14 flex items-center`)}>
                                            <Image 
                                                style={tailwind(`w-8 h-8 bg-gray-200 rounded-full`)} 
                                                source={{ uri: STATIC_URL + item.icon }} 
                                            />
                                        </View>
                                        <View style={tailwind(`flex-1`)}>
                                            <Text style={tailwind(`text-base`)}>{item.name}</Text>
                                            <Text style={tailwind(`text-gray-400`)}>{item.symbol}</Text>
                                        </View>
                                        <Pressable 
                                            onPress={() => {
                                                if (item.isSelect) return
                                                dispatch(setToken(item))
                                                setTimeout(() => {
                                                    dispatch(getBalance())
                                                }, 50)
                                            }}
                                            style={tailwind(`w-12 h-8 flex justify-center items-center`)}>
                                                {
                                                    item.isSelect ?
                                                    <Icon 
                                                        name="checkmark-circle-outline" 
                                                        size={26} 
                                                        color={getColor('gray-400')} 
                                                    /> :
                                                    <Icon 
                                                        name="add-circle-outline" 
                                                        size={26} 
                                                        color={getColor('purple-600')} 
                                                    />
                                                }
                                        </Pressable>
                                    </View>
                                ))
                            }
                        </View> : <></>
                    }
                </ScrollView>
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
                                    color={getColor('purple-600')} 
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