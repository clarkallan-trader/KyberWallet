
import Web3 from "web3"

//import DappBrowser from "DappBrowser.js"
import * as common from "../../../utils/common"
import { verifyAccount } from "../../../utils/validators"
import * as converters from "../../../utils/converter"
import * as constants from "../../constants"

export default class DappBrowser {
  constructor() {
    this.web3 = new Web3(Web3.givenProvider || window.web3.currentProvider || window.web3.givenProvider)
    //for older verions of web3
    console.log("web3_v5")
    if (this.web3 && this.web3.net && !this.web3.eth.net) {
      this.web3.eth.net = this.web3.net
    }
    //console.log(this.web3)
  }

  getWalletType = () => {
    return "dapp"
  }

  getNetworkId = () => {
    return new Promise((resolve, reject) => {
      this.web3.eth.net.getId((error, result) => {
        if (error || !result) {
          console.log(error)
          var error = new Error("Cannot get network id")
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  getCoinbase(isManual = false) {
    if (window.ethereum && isManual) {
      return new Promise((resolve, reject) => {
        window.ethereum.enable().then(() => {

          this.web3.eth.getAccounts((error, result) => {
            // console.log(result)
            if (error || result.length === 0) {
              var error = new Error("Cannot get coinbase")
              reject(error)
            } else {
              resolve(result[0])
            }
          })

        }).catch(err => {
          var error = new Error("Cannot get coinbase")
          reject(error)
        })

      })
    } else {
      return new Promise((resolve, reject) => {

        this.web3.eth.getAccounts((error, result) => {
          // console.log(result)
          if (error || result.length === 0) {
            var error = new Error("Cannot get coinbase")
            reject(error)
          } else {
            resolve(result[0])
          }
        })


      })
    }
  }


  setDefaultAddress(address) {
    this.web3.eth.defaultAccount = address
  }


  getWalletId(blockNo) {
    if (web3.kyberID && !verifyAccount(web3.kyberID)) {
      return web3.kyberID
    }
    var refAddr = common.getParameterByName("ref")
    if (!verifyAccount(refAddr)) {
      return refAddr
    }
    return constants.COMMISSION_ADDR
  }

  sign(data) {
    return new Promise((resolve, reject) => {
      this.web3.eth.sign(data, (error, result) => {
        resolve(result)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }

}