/**
 * @format
 */
 import { Buffer } from "buffer"
import React from 'react';
import {AppRegistry} from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import 'react-native-get-random-values'
import '@ethersproject/shims'
import App from './App'
import {name as appName} from './app.json'
import { store, persistor } from './store'

global.Buffer = Buffer

const ProviderContainer = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
)


AppRegistry.registerComponent(appName, () => ProviderContainer);
