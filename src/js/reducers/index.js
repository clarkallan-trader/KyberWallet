import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import accounts from './accountsReducer'
import global from './globalReducer'
import exchangeForm from './exchangeFormReducer'
import paymentForm from './paymentFormReducer'
import importKeystore from './importKeystoreReducer'
import joinPaymentForm from './joinPaymentFormReducer'
import connection from './connection'
import wallets from './walletsReducer'
import txs from './txsReducer'
import newContractForm from './newContractFormReducer'
import contracts from './contractsReducer'

export default combineReducers({
  accounts, exchangeForm, global, importKeystore, txs,
  joinPaymentForm, wallets, paymentForm, connection,
  newContractForm, contracts,
  router: routerReducer,
})
