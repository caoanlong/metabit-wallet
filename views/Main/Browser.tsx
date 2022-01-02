import React, { useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"
import { WebView } from 'react-native-webview'
import tailwind from "tailwind-rn"

function Brower() {
    const [ timestamp, setTimestamp ] = useState<number>()
    const [ loading, setLoading ] = useState<boolean>(true)

    useEffect(() => {
        setTimestamp(new Date().getTime())
    }, [])
    return (
        <View style={tailwind(`relative w-full h-full`)}>
            {
                loading ?
                <View style={tailwind(`absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center`)}>
                    <ActivityIndicator />
                </View> : <></>
            }
            <WebView 
                onLoadEnd={() => {
                    setLoading(false)
                }} 
                source={{ uri: `https://jyavs.com/?t=${timestamp}` }} 
            />
        </View>
    )
}

export default Brower