import React ,{ useState, useEffect } from 'react'
import { BigNumber, ethers } from 'ethers';
import { useEthersSigner } from '../ethers';
import { ToastContainer, toast } from 'react-toastify';


function Escrow() {

  const signer = useEthersSigner();
  const address = "0x06679fe554D0DCc9c83eC7318b39a7A504f55076" ;
  const { abi } = require('../artifacts/contracts/EscrowGenerator.sol/EscrowsGenerator.json');
  const contract = signer ? new ethers.Contract(address, abi, signer) : null;

  const [pendingEscrows, setPendingEscrows] = useState([]);
  const [completedEscrows, setCompletedEscrows] = useState([]);
  const [selectedOption, setSelectedOption] = useState('active');

  const updateEscrows = async () => {
    
    let completed =[];
    let pending =[];
    const escrows = await contract.getEscrows();
    for (let i = 0; i < escrows.length; i++) {
      if (escrows[i].isApproved){
        completed.push(escrows[i])
      } else{
        pending.push(escrows[i])
      }
      
    }
    setCompletedEscrows(completed);
    setPendingEscrows(pending);
  };


  useEffect(() => {
    
    if (contract) {
      
      contract.on('Created', updateEscrows);
      contract.on('Approved',updateEscrows);
      
      updateEscrows();

      return () => {
        contract.off('Created', updateEscrows);
        contract.off('Approved',updateEscrows);
      };

      
    } 
  }, [signer]);
  
  
  

  async function approve(escrowId) {
    // get contract instance from address and interact with it using the signer provided
    if (contract) {
      try {
        const approveTxn = await contract.approve(escrowId);
        await approveTxn.wait();
        toast.success('Escrow has been approved.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true
        });
        
        
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong with the transaction.", {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true
        });
      }
      
    } 
  }

  function renderEscrows(escrows) {

    if (escrows.length === 0) {
      return (
        <div className='card w-50 mx-auto mt-3'>
          <div className='card-body'>
            <p className='card-text text-center'>No escrows found.</p>
          </div>
        </div>
      )
    }

    return escrows.map((escrow) => {
      const escrowId = BigNumber.from(escrow.id).toNumber();
      return (
        <div key={escrowId} className='card w-50 mx-auto mt-3'>
          <div className='card-header'>Escrow #{escrowId}</div>
            <div className='card-body'>
              <ul className=" list-group">
                <li className="list-group-item">Arbiter : {escrow.arbiter}</li>
                <li className="list-group-item">Beneficiary : {escrow.beneficiary}</li>
                <li className="list-group-item">Value : {ethers.utils.formatEther(escrow.balance)} ETH </li>
                <li className="list-group-item">Status : {escrow.isApproved ? "Approved" : "Pending"}</li>
              </ul>
              
              
            </div>
            
          <div className="card-body">

            {escrow.isApproved ? null : (
              (signer && escrow.arbiter === signer._address) ? (
                <div className='btn btn-primary' id={escrowId} onClick={() => { approve(escrowId) }}>
                  Approve
                </div>
              ) : 
              <div className='card-text'>
                Pending Arbiter's approval
              </div>
            )}
            
          </div>
        </div>
      );
    });
  }

    
  return (
    <div>
      {
        signer ? (
          <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
            <h1 className='m-4 text-center'>All Escrows</h1>
            <div className="row mx-auto container w-50 text-center">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-secondary active">
                <input
                  type="radio"
                  name="options"
                  id="active"
                  autoComplete="off"
                  checked={selectedOption === 'active'}
                  onChange={() => setSelectedOption('active')}
                /> Active
                </label>
                <label className="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="completed"
                    autoComplete="off"
                    checked={selectedOption === 'completed'}
                    onChange={() => setSelectedOption('completed')}
                  /> Completed
                </label>
              </div>
            </div>

            {
              selectedOption === 'active' ? (
                renderEscrows(pendingEscrows)
              ) : (
                renderEscrows(completedEscrows)
              )
            }
          </div>
        ) : (
          <div className='m-4 text-center'>
              
            <h1>Please connect your wallet</h1>
        
          </div>
        )
      }
      
      
      
    </div>
  )
}

export default Escrow