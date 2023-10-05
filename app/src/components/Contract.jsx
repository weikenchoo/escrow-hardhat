import React, {useState} from 'react'
// import Escrow from '../Escrow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaExchangeAlt } from "react-icons/fa";
import Escrow from './Escrow';
import { ethers } from 'ethers';
import { useEthersSigner } from '../ethers'
const { abi } = require('../artifacts/contracts/EscrowGenerator.sol/EscrowsGenerator.json');



function Contract() {

  const signer = useEthersSigner();
  const contractAddress = "0x06679fe554D0DCc9c83eC7318b39a7A504f55076";
  const contract = new ethers.Contract(contractAddress, abi);

  const convertEthToWei = () => {
    const value = document.getElementById('wei').value;
    document.getElementById('wei').value = value*1000000000000000000;
  };

  

  async function newContract() {
    try {
      const beneficiary = document.getElementById('beneficiary').value;
      const arbiter = document.getElementById('arbiter').value;
      const value = ethers.BigNumber.from(document.getElementById('wei').value);
      const createEscrow = await contract.connect(signer).createEscrow(arbiter, beneficiary,{value: value});
      await createEscrow.wait();
      toast.success('Escrow created successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true
      });
      document.getElementById('beneficiary').value = "";
      document.getElementById('arbiter').value = "";
      document.getElementById('wei').value = "";
      
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong with the transaction.", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true
      });
    }
    
  }


  return (
    <>
    {
      signer ? (
        <div>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
          <div className="card w-50 mx-auto my-4">
            <div className="card-body">
              <h3 className='card-title mb-3'> New Contract </h3>
                <div className='form-group'>
                  <label className='form-label'>
                    Arbiter Address
                  </label>
                  <input type="text" id="arbiter" className='form-control'/>
                </div>
                <div className='form-group'>
                  <label className='form-label'>
                    Beneficiary Address              
                  </label>
                  <input type="text" id="beneficiary" className='form-control' />
                </div>
                <div className="form-group ">
                    <label className='form-label'>
                      Deposit Amount (in wei)
                    </label>
                  <div className="row">
                    <div className='col-9'>
                      <input type="text" id="wei" className='form-control' />
                    </div>
                    <div className='col'>
                      <button className='btn btn-secondary' onClick={convertEthToWei}><FaExchangeAlt/> to Wei</button>
                    </div>
                    
                  </div>
                </div>
                
                <button
                  className="btn btn-primary mt-3"
                  id="deploy"
                  onClick={(e) => {
                    e.preventDefault();
                    newContract();
                  }}
                >
                  Deploy
                </button>
                
                
                
              </div>
              
            </div>      
        </div>
      ) : (
        <div className='m-4 text-center'>
          <h1>Please connect your wallet</h1>
        </div>
      )
    }
    
    </>
    
  )
}

export default Contract