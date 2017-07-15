import React from "react"
import { connect } from "react-redux"

import NewContractForm from "./NewContractForm"
import Contract from "./Contract"


@connect((store) => {
  return {
    contracts: store.contracts.contracts
  }
})
export default class Contracts extends React.Component {
  render() {
    var contracts = Object.keys(this.props.contracts).map((address) => {
      var contract = this.props.contracts[address]
      return <Contract key={contract.address} address={contract.address} />
    })
    return (
      <div>
        {contracts}
        <NewContractForm />
      </div>
    )
  }
}
