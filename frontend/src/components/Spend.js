import React, { useState,useContext } from "react";
import AuthContext from "../Context/AuthContext";
// import * as FaIcons from 'react-icons/fa';

const Spend = ({ uSpend }) => {

    const [spend,setSpend] = useState(uSpend)
    let {authTokens} =useContext(AuthContext)
    const [clicked,setClicked] = useState(false)
    
    // const [uspend,setUSpend] = useState(spend)


    let isClicked = () => {
        setClicked(true);
    }
    let handleSubmit = () => {
        updateSpend()
        setClicked(false);
    }
    let updateSpend = async () => {
        fetch(`/api/update/spend/${spend.id}`,{
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(spend)
        })
    }
    // let deleteSpend = async () => {
    //     fetch(`/api/delete/spend/${uspend.id}`,{
    //         method: "DELETE",
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'Authorization':'Bearer '+ String(authTokens.access)
    //         }
    //     })
    // }
    
    // let handleSpendChange = (e) =>{
    //     if(!e.target.value){
    //         setUSpend({...uspend, 
    //             'spend_on':uspend.spend_on,
    //         })
    //     }
    //     else{
    //         setUSpend({...uspend, 
    //             'spend_on':e.target.value,
    //         })
    //     }
    // }
    let handleAmountChange = (e) =>{
        if(!e.target.value){
            setSpend({...spend, 
                'amount':spend.amount,
            })
        }
        else{
            setSpend({...spend, 
                'amount':e.target.value,
            })
        }
    }
    // let handleDelete = () => {
    //     deleteSpend()
    // }
    return (
        <>
        <div className="single-spend-details">
            {spend.spend_on ? 
                <p>{spend.spend_on}</p>
                :null
            }
            {spend.amount >= 0 ?
                <>
                    {spend.list_spend ? 
                        <>
                            <p>{spend.amount}</p>
                        </>
                        : 
                        <>
                            {clicked ? 
                                <input onChange={(e) => {handleAmountChange(e)}} defaultValue={spend.amount}/> 
                                : <p onClick={isClicked}>{spend.amount}</p>
                            }
                        </>
                    }
                </>
                :null
            }
            {spend.list_spend ? <p>{spend.list_spend}</p>:null}
            {clicked ? <p onClick={handleSubmit}>Done</p> : <p>Delete</p>}
        </div> 
        </>
    )
}

export default Spend;