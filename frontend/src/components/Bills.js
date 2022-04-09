import React,{useContext,useState} from "react";
import Bill from "./Bill";
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import AuthContext from "../Context/AuthContext";
import { getData } from "./BillFetch";

const Bills = () => {

    let {authTokens} =useContext(AuthContext)
    let mess =  JSON.parse(localStorage.getItem('mess'))
    let total_bill = 0

    const [bills,setBills] = useState(() => localStorage.getItem('bills') ? JSON.parse(localStorage.getItem('bills')) : null)

    const[bill,setBill] = useState(null)

    bills.map((bill,index) => {
        total_bill += parseInt(bill.amount)
    })
    let createBill = async () => {
        fetch(`/api/create/bill/`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(bill)
        })
    }
    let handleSubmit = () => {
        createBill()
        updateData()
    }
    let updateData = () => {
        setTimeout(() => {
            getData({mess,authTokens}).then(r => { setBills(r) })
         }, 500);
    }
    let handleBillChange = (e) =>{
        if(!e.target.value){

        }
        else{
            setBill({...bill, 
                'bill_on':e.target.value,
            })
        }
    }
    let handleAmountChange = (e) =>{
        if(!e.target.value){
            
        }
        else{
            setBill({...bill, 
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
                <h2>Total Bill : <strong>{total_bill}</strong> Tk</h2>
            </div>
            <div className="addbill-content">
                <input type="text" onChange={(e) => {handleBillChange(e)}} placeholder="Bill on..."/>
                <input type="number" onChange={(e) => {handleAmountChange(e)}} placeholder="Amount..."/>
                <p onClick={handleSubmit}  className="submit-btn"> Done <FaIcons.FaCheck/> </p>
            </div>
            <div className="bill">
                <h2>Bill On</h2>
                <h2>Amount</h2>
                <h2>Date Updated</h2>
            </div>
            {bills.map((bill,index) => {
                return(
                        <div className="bill" key={index}><Bill bill = { bill }/></div> 
                )
            })}
        </div>
        </>
    )
}

export default Bills;