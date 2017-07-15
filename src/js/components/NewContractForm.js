import React from "react"
import { connect } from "react-redux"

import { specifyName, specifyAddress, specifyABI, emptyForm, throwError } from "../actions/newContractFormActions"
import { addContract } from "../actions/contractActions"
import { verifyAccount, verifyABI } from "../utils/validators"


@connect((store) => {
  return {
    name: store.newContractForm.name,
    address: store.newContractForm.address,
    abi: store.newContractForm.abi,
    error: store.newContractForm.error,
  }
})
export default class NewContractForm extends React.Component {

  verify = () => {
    var name = this.props.name
    var address = verifyAccount(this.props.address)
    var abi = verifyABI(this.props.abi)
    return { name, address, abi }
  }

  specifyName = (event) => {
    this.props.dispatch(specifyName(event.target.value))
  }

  specifyAddress = (event) => {
    this.props.dispatch(specifyAddress(event.target.value))
  }

  specifyABI = (event) => {
    this.props.dispatch(specifyABI(event.target.value))
  }

  newContract = (event) => {
    event.preventDefault()
    try {
      var params = this.verify()
      this.props.dispatch(addContract(
        params.name, params.address,
        params.abi))
      this.props.dispatch(emptyForm())
    } catch (e) {
      console.log(e)
      this.props.dispatch(throwError(e.message))
    }
  }


  render() {
    return (
      <div>
        <h2>New Contract</h2>
        <form>
          <label>
            Name:
            <input value={this.props.name} onChange={this.specifyName} type="text" />
          </label>
          <label>
            Address:
            <input value={this.props.address} onChange={this.specifyAddress} type="text" />
          </label>
          <label>
            ABI:
            <textarea value={this.props.abi} onChange={this.specifyABI}></textarea>
          </label>
          <p>error: {this.props.error}</p>
          <button class="button" onClick={this.newContract}>Import</button>
        </form>
      </div>
    )
  }
}
