import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import ConfirmMnemonic from "./ConfirmMnemonic"
import GenerateMnemonic from "./GenerateMnemonic"

const Stack = createNativeStackNavigator()

function AddWallet() {
    return (
        <Stack.Navigator initialRouteName="generateMnemonic">
            <Stack.Screen 
                name="generateMnemonic" 
                component={GenerateMnemonic} 
                options={{
                    headerShown: false
                }} 
            />
            <Stack.Screen 
                name="confirmMnemonic" 
                component={ConfirmMnemonic} 
                options={{
                    headerShown: false
                }} 
            />
        </Stack.Navigator>
    )
}

export default AddWallet