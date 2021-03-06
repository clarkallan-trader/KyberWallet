import * as service from "../services/accounts"
import store from "../store"

export function loadAccounts(node) {
    return {
        type: "LOAD_ACCOUNTS",
        payload: service.loadAccounts(node)
    }
}

export function createAccount(address, keystring, name, desc) {
    return {
        type: "NEW_ACCOUNT_CREATED",
        payload: new Promise((resolve, reject) => {
            service.newAccountInstance(
                address, keystring, name, desc, resolve)
        })
    }
}

export function addAccount(address, keystring, name, desc) {
    return {
        type: "NEW_ACCOUNT_ADDED",
        payload: new Promise((resolve, reject) => {
            service.newAccountInstance(
                address, keystring, name, desc, resolve)
        })
    }
}


export function updateAccount(ethereum, account) {
    return {
        type: "UPDATE_ACCOUNT",
        payload: new Promise((resolve, reject) => {
            account.sync(ethereum, resolve)
        })
    }
}
export function modifyAccount(address, name){
    return {
        type: "MODIFY_ACCOUNT",
        payload: {address:address, name:name}
    }
}

export function addDeleteAccount(address) {
    return {
        type: "ADD_DELETE_ACCOUNT",
        payload: address
    }
}


export function deleteAccount(address) {
    return {
        type: "DELETE_ACCOUNT",
        payload: address
    }
}


export function incManualNonceAccount(address) {
    return {
        type: "INC_MANUAL_NONCE_ACCOUNT",
        payload: address
    }
}

export function joiningKyberWallet(account, hash) {
    return {
        type: "JOINING_KYBER_WALLET",
        payload: { account, hash }
    }
}

export function joinedKyberWallet(address, contractAddress) {
    return {
        type: "JOINED_KYBER_WALLET",
        payload: { address, contractAddress }
    }
}


export function sortAccount(order, field) {
    return {
        type: "SORT_ACCOUNT_BY_FIELD",
        payload: { order, field }
    }   
}