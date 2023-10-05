import React from 'react'
import { Web3Button } from '@web3modal/react'
import { NavLink } from 'react-router-dom';




function Navbar() {
    



    return (
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Escrow dApp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink 
                    end 
                    to="/" 
                    className={({ isActive, isPending }) =>
                        isPending ? "nav-link pending" : isActive ? "nav-link active" : "nav-link"
                    }
                    >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                <NavLink 
                end 
                to="/escrows" 
                className={({ isActive, isPending }) =>
                    isPending ? "nav-link pending" : isActive ? "nav-link active" : "nav-link"
                }
                >
                    Escrows
                </NavLink>
                </li>
                
            </ul>
            <Web3Button  label="Connect Wallet" balance='show'/>
            </div>
        </div>
        </nav>
    
  )
}

export default Navbar