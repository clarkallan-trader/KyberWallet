import React from "react"
import { connect } from "react-redux"


@connect((store, props) => {
  var contract = store.contracts.contracts[props.address]
  return {
    contract: contract
  }
})
export default class Contract extends React.Component {
  render() {
    var functions = this.props.contract.getFunctions().map((f, index) => {
      var params = ""
      f.inputs.forEach((param) => {
        params = params + param.name + " " + param.type + ", "
      })
      return (
        <p key={index}>{f.name}({params.substring(0, params.length - 2)})</p>
      )
    })
    return (
      <div>
        <p>Name: {this.props.name}</p>
        <p>Address: {this.props.address}</p>
        <p>Functions</p>
        {functions}
      </div>
    )
  }
}
