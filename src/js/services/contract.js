import * as _ from "underscore"


export default class Contract {
  constructor(name, address, abi) {
    this.name = name
    this.address = address
    this.abi = abi
  }

  shallowClone() {
    return new Contract(
      this.name, this.address, this.abi
    )
  }

  getFunctions() {
    return _.where(this.abi, {type: "function", constant: false})
  }
}
