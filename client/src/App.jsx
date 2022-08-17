import React, { useState } from "react";
import "./App.css";
import mindContractAbi from "./myAbi.json";
import { ethers } from "ethers";

const mindContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const App = () => {
  //CONNECTING
  const [account, setAccount] = useState([]);
  const [balance, setBalance] = useState(0);
  const [depositeAmount, setDepositeAmount] = useState(500);

  const connectWallet = async () => {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
    }
  };

  const getBalance = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mindContractAddress,
        mindContractAbi.abi,
        signer
      );
      try {
        const response = await contract.getMyBalance();
        const strHex = response?._hex;
        const toDeci = +strHex;
        setBalance(toDeci);
        console.log(toDeci);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };

  const Deposite = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mindContractAddress,
        mindContractAbi.abi,
        signer
      );
      try {
        const response = await contract.myDeposite(depositeAmount);
        console.log(response);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };

  const handleAddress = (addr) => {
    let shortAddr = addr.slice(0, 5) + "..." + addr.slice(-4);
    return shortAddr.toUpperCase();
  };

  const handleChange = (e) => {
    const strToNum = +e.target.value;
    if (typeof strToNum === "number") {
      setDepositeAmount(e.target.value);
    } else {
      console.log("please fill number!!!");
    }
  };

  return (
    <div className="App">
      {account.length > 0 ? (
        <div className="container">
          <h4>
            Connected to{" "}
            <span className="address">{handleAddress(account[0])}</span>
          </h4>
          <h2>myOwnBank</h2>
          <div className="mint-btn">
            <h3>Your balance : {balance}</h3>
          </div>
          <button onClick={() => getBalance()}>get balance</button>
          <div>
            <h2>Deposite</h2>
            <input
              name="deposite"
              type="number"
              defaultValue={depositeAmount}
              onChange={(e) => handleChange(e)}
            />
            <button onClick={() => Deposite()}>Deposite</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
};

export default App;
