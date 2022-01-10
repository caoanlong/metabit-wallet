import { combineReducers } from 'redux'
import rateReducer from './rateReducer'
import userReducer from './userReducer'
import walletReducer from './walletReducer'

const reducers = combineReducers({
    user: userReducer,
    rate: rateReducer,
    wallet: walletReducer
})

export default reducers