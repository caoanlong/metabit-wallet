import { combineReducers } from 'redux'
import networkReducer from './networkReducer'
import rateReducer from './rateReducer'
import userReducer from './userReducer'
import walletReducer from './walletReducer'

const reducers = combineReducers({
    user: userReducer,
    network: networkReducer,
    rate: rateReducer,
    wallet: walletReducer
})

export default reducers