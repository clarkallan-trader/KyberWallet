import React from "react"
import { connect } from "react-redux"

import { specifyName, specifyAddress, specifyABI, emptyForm, throwError } from "../actions/newContractFormActions"
import { addContract } from "../actions/contractActions"
import { verifyAccount, verifyABI, anyErrors } from "../utils/validators"


@connect((store) => {
  return {
    name: store.newContractForm.name,
    address: store.newContractForm.address,
    abi: store.newContractForm.abi,
    addressError: store.newContractForm.errors["addressError"],
    abiError: store.newContractForm.errors["abiError"],
  }
})
export default class NewContractForm extends React.Component {

  verify = () => {
    var errors = {}
    errors["addressError"] = verifyAccount(this.props.address)
    errors["abiError"] = verifyABI(this.props.abi)
    return errors
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
      var errors = this.verify()
      if (anyErrors(errors)) {
        this.props.dispatch(throwError(errors))
      } else {
        this.props.dispatch(addContract(
          this.props.name, this.props.address,
          JSON.parse(this.props.abi)))
        this.props.dispatch(emptyForm())
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
            <p>address error: {this.props.addressError}</p>
          </label>
          <label>
            ABI:
            <textarea value={this.props.abi} onChange={this.specifyABI}></textarea>
            <p>abi error: {this.props.abiError}</p>
          </label>
          <button class="button" onClick={this.newContract}>Import</button>
        </form>
      </div>
    )
  }
}
