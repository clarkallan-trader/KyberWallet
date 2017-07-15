export function specifyName(name) {
  return {
    type: "NEW_CONTRACT_FORM_NAME_SPECIFIED",
    payload: name
  }
}

export function specifyAddress(address) {
  return {
    type: "NEW_CONTRACT_FORM_ADDRESS_SPECIFIED",
    payload: address
  }
}

export function specifyABI(abi) {
  return {
    type: "NEW_CONTRACT_FORM_ABI_SPECIFIED",
    payload: abi
  }
}

export function emptyForm() {
  return {
    type: "NEW_CONTRACT_FORM_EMPTIED"
  }
}

export function throwError(message) {
  return {
    type: "NEW_CONTRACT_FORM_ERROR_THREW",
    payload: message
  }
}
