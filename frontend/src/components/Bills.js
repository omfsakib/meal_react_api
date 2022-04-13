import React,{useContext,useState} from "react";
import Bill from "./Bill";
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import AuthContext from "../Context/AuthContext";
import { getData } from "./BillFetch";
import UserBill from "./UserBill";
import GetUsername from './GetUsername';

const Bills = () => {

    let {authTokens} =useContext(AuthContext)
    let mess =  JSON.parse(localStorage.getItem('mess'))
    const [clicked,setClicked] = useState(false)
    let total_bill = 0

    let members = mess.members

    const [bills,setBills] = useState(() => localStorage.getItem('bills') ? JSON.parse(localStorage.getItem('bills')) : null)

    const[bill,setBill] = useState(null)
    
    bills.map((bill,index) => {
        total_bill += parseInt(bill.amount)
    })
    let toogleUse = () => {
        clicked ? setClicked(false) : setClicked(true);
    }
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
            <div className="user-bills">
                <h2>User Bills {clicked? <AiIcons.AiFillCaretUp onClick={toogleUse}/>: <AiIcons.AiFillCaretDown onClick={toogleUse}/> }</h2>
                {clicked ? <p>This section is to define the bill split to members. <br/> After defining, the red <strong>Unpaid</strong> button will show up. If you click unpaid button 
                the green <strong>Paid</strong> button will render. That's mean member has deposited the bill. You can check it on cah deposit section. Now if you update the bill for the member,
                you will have a <strong>Update</strong> button. That's mean member deposited less than demand. By clicking Update button you can modify it. <br/> 
                <br/> <strong>Unpaid</strong> - means member didn't pay the bill.<br/> <strong>Paid</strong> - means member paid the bill.<br/> <strong>Update</strong> -
                means member paid less than demands.</p> : null}
                <div className="user-bill-table">
                    <p><strong>Bills</strong></p>
                    {members.map((member,i) => {
                        return(
                            <p key={i}><strong><GetUsername member={member}/></strong></p>
                        )
                    })}
                </div>
                {bills.map((bill,index) => {
                    return(
                        <div className="update-bill-paid" key={index}>
                            <UserBill bill = { bill }/>
                        </div> 
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Bills;