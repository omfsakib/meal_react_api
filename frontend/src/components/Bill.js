import React,{useContext,useState} from "react";
import AuthContext from "../Context/AuthContext";
import * as FaIcons from 'react-icons/fa';

const Bill = ({ bill }) => {

    let {authTokens} =useContext(AuthContext)
    const [clicked,setClicked] = useState(false)
    
    const [ubill,setUBill] = useState(bill)
    let isClicked = () => {
        setClicked(true);
    }
    let handleSubmit = () => {
        updateBill()
        setClicked(false);
    }
    let updateBill = async () => {
        fetch(`/api/update/bill/${ubill.id}`,{
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(ubill)
        })
    }
    let deleteNote = async () => {
        fetch(`/api/delete/bill/${ubill.id}`,{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
    }
    
    let handleBillChange = (e) =>{
        if(!e.target.value){
            setUBill({...ubill, 
                'bill_on':ubill.bill_on,
            })
        }
        else{
            setUBill({...ubill, 
                'bill_on':e.target.value,
            })
        }
    }
    let handleAmountChange = (e) =>{
        if(!e.target.value){
            setUBill({...ubill, 
                'amount':ubill.amount,
            })
        }
        else{
            setUBill({...ubill, 
                'amount':e.target.value,
            })
        }
    }
    let handleDelete = () => {
        deleteNote()
    }
    return (
        <>
        <input onClick={isClicked} onChange={(e) => {handleBillChange(e)}} className={clicked ? "input  active-input" : "input"} defaultValue={bill.bill_on}></input>
        <input onClick={isClicked} onChange={(e) => {handleAmountChange(e)}} className={clicked ? "input  active-input" : "input"} defaultValue={bill.amount}></input>
        <input onClick={isClicked} className={clicked ? "input  active-input" : "input"} defaultValue={bill.date_created} disabled></input>
        <p onClick={handleSubmit} className={clicked ? "submit-btn  active-submit-btn " : "submit-btn "}> Done <FaIcons.FaCheck/> </p>
        <p onClick={handleDelete} className="delete-btn"> Delete <FaIcons.FaTrash/> </p>
        </>
    )
}

export default Bill;