import React,{useContext,useState} from "react";
import Bill from "./Bill";
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import AuthContext from "../Context/AuthContext";
import { getDepositData } from "./DepositFetch";

const Deposits = () => {

    let {authTokens} =useContext(AuthContext)
    let mess =  JSON.parse(localStorage.getItem('mess'))
    let total_deposits = 0

    const [deposits,setDeposits] = useState(() => localStorage.getItem('deposits') ? JSON.parse(localStorage.getItem('deposits')) : null)

    const[deposit,setDeposit] = useState(null)

    deposits.map((deposit,index) => {
        total_deposits += parseInt(deposit.amount)
    })
    let createDeposit = async () => {
        fetch(`/api/create/deposit/`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(deposit)
        })
    }
    let handleSubmit = () => {
        createDeposit()
        updateData()
    }
    let updateData = () => {
        setTimeout(() => {
            getDepositData({mess,authTokens}).then(r => { setDeposits(r) })
         }, 500);
    }
    let handleDepositChange = (e) =>{
        if(!e.target.value){

        }
        else{
            setDeposit({...deposit, 
                'deposit_for':e.target.value,
            })
        }
    }
    let handleAmountChange = (e) =>{
        if(!e.target.value){
            
        }
        else{
            setDeposit({...deposit, 
                'amount':e.target.value,
            })
        }
    }

    return (
        <>
        <div id="bills"> 
            <div className="header-content">
                <h2><strong>{mess.name}</strong></h2>
                <h2><p onClick={updateData}  className="submit-btn"> Refresh <BiIcons.BiRefresh/> </p></h2>
                <h2>Total Bill : <strong>{total_deposits}</strong> Tk</h2>
            </div>
            <div className="addbill-content">
                <input type="text" onChange={(e) => {handleDepositChange(e)}} placeholder="Deposit for..."/>
                <input type="number" onChange={(e) => {handleAmountChange(e)}} placeholder="Amount..."/>
                <p onClick={handleSubmit}  className="submit-btn"> Done <FaIcons.FaCheck/> </p>
            </div>
            <div className="bill">
                <h2>Bill On</h2>
                <h2>Amount</h2>
                <h2>Date Updated</h2>
            </div>
            {/* {deposits.map((deposit,index) => {
                return(
                        <div className="bill" key={index}><Bill deposit = { deposit }/></div> 
                )
            })} */}
        </div>
        </>
    )
}

export default Deposits;