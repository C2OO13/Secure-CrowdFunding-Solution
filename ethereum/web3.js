import Web3 from "web3";

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    window.ethereum.request({method: 'eth_requestAccounts'});
}else{
    const provider = new Web3.providers.HttpProvider("https://kovan.infura.io/v3/41fb43be2a1e40d5ac7fb04b54e5e7c9");
    web3 = new Web3(provider);
}

export default web3;