import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { AsyncStorage } from 'react-native'
import { persistReducer, persistStore } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import reducers from './reducers'


const persistConfig = {
	key: 'root',
    version: 0,
	storage: AsyncStorage
}

export const store = createStore(
    persistReducer(persistConfig, reducers),
    applyMiddleware(thunk)
    // middleware: getDefaultMiddleware({
    //     serializableCheck: false
    // })
)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch