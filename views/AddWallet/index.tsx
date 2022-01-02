import { ParamListBase, useNavigation } from "@react-navigation/core"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { HeaderBackButton } from '@react-navigation/elements'
import React from "react"
import { useDispatch } from "react-redux"
import tailwind from "tailwind-rn"
import ConfirmMnemonic from "./ConfirmMnemonic"
import GenerateMnemonic from "./GenerateMnemonic"
import { CLEAR_WALLET } from "../../store/constants"

const Stack = createNativeStackNavigator()


function AddWallet() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const dispatch = useDispatch()
    return (
        <Stack.Navigator initialRouteName="generateMnemonic">
            <Stack.Screen 
                name="generateMnemonic" 
                component={GenerateMnemonic} 
                options={{
                    title: '',
                    headerLeft: ({ tintColor }) => (
                        <HeaderBackButton 
                            style={tailwind(`relative -left-4`)}
                            labelVisible={false}
                            tintColor={tintColor}
                            onPress={() => {
                                dispatch({ type: CLEAR_WALLET })
                                navigation.goBack()
                            }}
                        />
                    ),
                }} 
            />
            <Stack.Screen 
                name="confirmMnemonic" 
                component={ConfirmMnemonic} 
                options={{
                    title: '',
                }} 
            />
        </Stack.Navigator>
    )
}

export default AddWallet