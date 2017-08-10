import React from "react";


export default class DataMessage extends React.Component {
  render() {
    var error = ""
    if (this.props.error && this.props.error != "") {
      error = (<div class="error">
        <i class="k-icon k-icon-error"></i>
        {this.props.error}
      </div>)
    }
    return (
      <div>              
        <label for={this.props.messageId}>Message</label>
        <div class="input-space">
          <input onKeyPress={this.props.onKeyPress} name="message" id={this.props.messageId} type="text" value={this.props.message} onChange={this.props.msgHandler.bind(this)}/>
        </div>
        {error}
      </div>
    )
  }
}
