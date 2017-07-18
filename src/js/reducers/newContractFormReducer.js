const initState = {
  name: "",
  address: "",
  abi: "",
  errors: {
    "addressError": "",
    "abiError":"",
  },
}

const newContractForm = (state=initState, action) => {
  switch (action.type) {
    case "NEW_CONTRACT_FORM_NAME_SPECIFIED": {
      return {...state, name: action.payload }
    }
    case "NEW_CONTRACT_FORM_ADDRESS_SPECIFIED": {
      return {...state, address: action.payload }
    }
    case "NEW_CONTRACT_FORM_ABI_SPECIFIED": {
      return {...state, abi: action.payload }
    }
    case "NEW_CONTRACT_FORM_EMPTIED": {
      return {...initState}
    }
    case "NEW_CONTRACT_FORM_ERROR_THREW": {
      return {...state, errors: action.payload }
    }
  }
  return state
}

export default newContractForm
