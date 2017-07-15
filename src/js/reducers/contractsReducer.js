import Contract from '../services/Contract'
import {REHYDRATE} from 'redux-persist/constants'


const initState = {
  contracts: {},
}

const contracts = (state=initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      if (action.payload.contracts) {
        var loadedContracts = action.payload.contracts.contracts
        var contracts = {}
        Object.keys(loadedContracts).forEach((address) => {
          var contractMap = loadedContracts[address]
          var contract = new Contract(
            contractMap.name,
            contractMap.address,
            contractMap.abi
          )
          contracts[address] = contract
        })
        var newState = {...state, contracts: contracts}
        return newState
      }
      return state
    }
    case "NEW_CONTRACT_ADDED": {
      var newContracts = {...state.contracts}
      newContracts[action.payload.address] = action.payload
      return {...state, contracts: newContracts}
    }
  }
  return state
}

export default contracts
