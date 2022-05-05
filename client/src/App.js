import React, { Component, Fragment, useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import Purse from "./components/purse";

import "./App.css";

function App() {
  const [web3Api, setweb3Api] = useState({
    provider: null,
    web3: null,
    contractPurseFactory: null
  });
  const [account, setAccount] = useState(null);
  const [formCompleted, setFormCompleted] = useState(false)


  useEffect(()=>{
    
    const loadCompleted = async () => {
        const {contractPurseFactory, web3} = web3Api
        console.log(web3Api.contractPurseFactory)
        //doesnt work why?
        const isCompleted = await web3Api.contractPurseFactory.methods.formCompleted().call()
        setFormCompleted(isCompleted)
        console.log(formCompleted)
    }
    web3Api.contractPurseFactory && loadCompleted()
  }, [web3Api])
  useEffect(() => {
    const loadProvider = async () => {
      

      const provider = await detectEthereumProvider();
      const contractPurseFactory = await loadContract("PurseFactory", provider)
      if (provider) {
        setweb3Api({
          web3: new Web3(provider),
          provider,
          contractPurseFactory
        });
      } else {
        console.error("Please install Metamask"); //when not installed, ask to install
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount(); //will only be initialized when web3 is initialized
  }, [web3Api.web3]);

  console.log(web3Api.web3);
  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
        <div className="is-flex is-align-items-center">
            <span>
            </span>
              { account ?
                <div>{account}
                 <Purse/>
                </div>     
                :
                <button
                  className="button is-small"
                  onClick={() =>
                    web3Api.provider.request({method: "eth_requestAccounts"}
                  )}
                >
                  Connect Wallet
                </button>
              }
          </div>
  
        </div>
      </div>
    </>
  );
}

export default App;
