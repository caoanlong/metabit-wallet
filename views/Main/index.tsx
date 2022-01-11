import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { ParamListBase, useNavigation } from "@react-navigation/core"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Home from "./Home"
import Browser from "./Browser"
import Mine from "./Mine"
import { getColor } from "tailwind-rn"

const BottomTab = createBottomTabNavigator()

function Main() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    return (
        <BottomTab.Navigator initialRouteName="home">
            <BottomTab.Screen 
                name="home" 
                component={Home} 
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: getColor('purple-600'),
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
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: getColor('purple-600'),
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
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: getColor('purple-600'),
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" size={20} color={color} />
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}



export default Main