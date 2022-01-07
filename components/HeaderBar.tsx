import React from "react"
import { Platform, Pressable, StatusBar, Text, useColorScheme, View } from "react-native"
import tailwind from "tailwind-rn"
import Icon from "react-native-vector-icons/Ionicons"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context"
import { getDefaultHeaderHeight } from '@react-navigation/elements'

interface HeaderBarProps {
    title?: string,
    backgroundColor?: string
    color?: string,
    right?: string | JSX.Element
}

function HeaderBar({ title, backgroundColor = '#ffffff', color = '#000000', right }: HeaderBarProps) {
    const isDarkMode = useColorScheme() === 'dark'
    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets()
    const defaultHeight = getDefaultHeaderHeight(frame, false, insets.top)
    
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    
    return (
        <>
            <StatusBar 
                barStyle={
                    Platform.select({ ios: 'light-content', default: isDarkMode ? 'light-content' : 'dark-content' })
                } 
            />
            <View 
                style={{
                    ...tailwind(`absolute z-20 left-0 right-0 top-0 flex flex-row bg-blue-600`),
                    backgroundColor,
                    height: defaultHeight,
                    paddingTop: insets.top
                }}>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    style={tailwind(`w-12 flex justify-center items-center`)}>
                    <Icon name="chevron-back" size={24} color={color} />
                </Pressable>
                <View style={tailwind(`flex-1 flex justify-center`)}>
                    <Text 
                        style={{
                            ...tailwind(`text-base text-center`),
                            color
                        }}>
                        {title}
                    </Text>
                </View>
                <View style={tailwind(`w-12`)}>
                    {
                        right 
                            ? (
                                typeof right === 'string' 
                                    ? <Text 
                                        style={{
                                            ...tailwind(`text-base`),
                                            color
                                        }}>
                                        {right}
                                        </Text> 
                                    : right
                            ) 
                        : <></>
                    }
                </View>
            </View>
        </>
    )
}

export default HeaderBar