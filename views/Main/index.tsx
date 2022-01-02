import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from "react-native/Libraries/NewAppScreen"
import { Pressable } from "react-native"
import tailwind from "tailwind-rn"
import { ParamListBase, useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Home from "./Home"
import Browser from "./Browser"
import Mine from "./Mine"

const BottomTab = createBottomTabNavigator()

function Main() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    return (
        <BottomTab.Navigator initialRouteName="home">
            <BottomTab.Screen 
                name="home" 
                component={Home} 
                options={{
                    headerTitle: '首页',
                    headerLeft: () => (
                        <Pressable 
                            onPress={() => {
                                navigation.push('addToken')
                            }}
                            style={tailwind(`w-10 h-10 flex justify-center items-start pl-3`)}>
                            <Icon name="add" size={30} color={Colors.black} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable 
                            onPress={() => {
                                navigation.push('scan')
                            }}
                            style={tailwind(`w-10 h-10 flex justify-center items-end pr-3`)}>
                            <Icon name="scan" size={20} color={Colors.black} />
                        </Pressable>
                    ),
                    tabBarLabel: '首页',
                    tabBarIcon: ({ color }) => (
                        <Icon name="wallet" size={20} color={color} />
                    )
                }}
            />
            <BottomTab.Screen 
                name="browser" 
                component={Browser} 
                options={{
                    headerTitle: '浏览器',
                    tabBarLabel: '浏览器',
                    tabBarIcon: ({ color }) => (
                        <Icon name="logo-chrome" size={20} color={color} />
                    )
                }}
            />
            <BottomTab.Screen 
                name="mine" 
                component={Mine} 
                options={{
                    headerTitle: '我的',
                    tabBarLabel: '我的',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" size={20} color={color} />
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}



export default Main