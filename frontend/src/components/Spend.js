import React,{useContext,useState} from "react";
import AuthContext from "../Context/AuthContext";
import * as FaIcons from 'react-icons/fa';

const Spend = ({ spend }) => {

    let {authTokens} =useContext(AuthContext)
    const [clicked,setClicked] = useState(false)
    
    const [uspend,setUSpend] = useState(spend)


    let isClicked = () => {
        setClicked(true);
    }
    let handleSubmit = () => {
        updateSpend()
        setClicked(false);
    }
    let updateSpend = async () => {
        fetch(`/api/update/spend/${uspend.id}`,{
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(uspend)
        })
    }
    let deleteSpend = async () => {
        fetch(`/api/delete/spend/${uspend.id}`,{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
    }
    
    let handleSpendChange = (e) =>{
        if(!e.target.value){
            setUSpend({...uspend, 
                'spend_on':uspend.spend_on,
            })
        }
        else{
            setUSpend({...uspend, 
                'spend_on':e.target.value,
            })
        }
    }
    let handleAmountChange = (e) =>{
        if(!e.target.value){
            setUSpend({...uspend, 
                'amount':uspend.amount,
            })
        }
        else{
            setUSpend({...uspend, 
                'amount':e.target.value,
            })
        }
    }
    let handleDelete = () => {
        deleteSpend()
    }
    return (
        <>
        <input onClick={isClicked} onChange={(e) => {handleSpendChange(e)}} className={clicked ? "input  active-input" : "input"} defaultValue={spend.spend_on}></input>
        <input onClick={isClicked} onChange={(e) => {handleAmountChange(e)}} className={clicked ? "input  active-input" : "input"} defaultValue={spend.amount}></input>
        <input onClick={isClicked} className={clicked ? "input  active-input" : "input"} defaultValue={spend.date_created} disabled></input>
        <p onClick={handleSubmit} className={clicked ? "submit-btn  active-submit-btn " : "submit-btn "}> Done <FaIcons.FaCheck/> </p>
        <p onClick={handleDelete} className="delete-btn"> Delete <FaIcons.FaTrash/> </p>
        </>
    )
}

export default Spend;