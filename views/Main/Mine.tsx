import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import { Alert, Pressable, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useDispatch } from 'react-redux'
import tailwind, { getColor } from "tailwind-rn"
import { logout } from "../../store/actions/userAction"

function Mine() {
    const dispatch = useDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    return (
        <View style={tailwind(``)}>
            <View style={tailwind(`mb-4`)}>
                <Pressable 
                    onPress={() => navigation.push('wallets')}>
                    <View style={tailwind(`flex flex-row items-center p-4 bg-white mb-2`)}>
                        <View style={tailwind(`w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center`)}>
                            <Icon 
                                name="folder-open" 
                                size={20}
                                color={getColor('gray-600')}
                            />
                        </View>
                        <View style={tailwind(`flex-1 pl-4`)}>
                            <Text style={tailwind(`text-black text-lg`)}>钱包管理</Text>
                        </View>
                        <View style={tailwind(`w-8 h-8 flex justify-center items-center`)}>
                            <Icon 
                                name="chevron-forward" 
                                size={20}
                                color={getColor('purple-600')}
                            />
                        </View>
                    </View>
                </Pressable>
            </View>
            <View style={tailwind(`px-4`)}>
                <Pressable 
                    onPress={() => {
                        Alert.alert('确定退出？', '退出将不保留钱包的任何数据', [
                            {
                                text: "取消",
                            },
                            {
                                text: "确定",
                                onPress: () => {
                                    dispatch(logout())
                                    navigation.navigate('entry')
                                }
                            }
                        ])
                    }}
                    style={tailwind(`py-3 bg-purple-600 rounded-full mb-16`)}>
                    <Text style={tailwind(`text-white text-lg text-center`)}>退出登录</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Mine