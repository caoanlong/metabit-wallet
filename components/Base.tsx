import React from "react"
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"


type BaseProps = {
    children: JSX.Element
}
function Base({ children }: BaseProps) {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    
    return (
        <SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                { children }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Base