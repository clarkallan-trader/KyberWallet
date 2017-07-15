import Contract from "../services/Contract"


export function addContract(name, address, abi) {
  return {
    type: "NEW_CONTRACT_ADDED",
    payload: new Contract(name, address, abi)
  }
}
