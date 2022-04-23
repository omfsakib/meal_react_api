import React, { useState,useContext } from "react";
import AuthContext from "../Context/AuthContext";
// import * as FaIcons from 'react-icons/fa';
import SpendView from "./SpendView";
import GetUsername from './GetUsername';

const Spend = (props) => {

    const [spend,setSpend] = useState(props.uSpend)
    let {authTokens} =useContext(AuthContext)
    const [clicked,setClicked] = useState(false)
    const [popUp,setPopUp] = useState(false)
    

    let spendsUpdate = (r) => {
        props.updateSpends(r)
    }

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
    let viewPopUp = () => {
        setPopUp(true)
    }
    
    return (
        <>
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
            {spend.user ? <p><GetUsername member={spend.user}/></p> :null}
            {clicked ? <p onClick={handleSubmit}>Done</p> : <p onClick={viewPopUp}>View</p>}
            {popUp ? <SpendView trigger={popUp} setTrigger={setPopUp} spend={spend} updateSpend={setSpend} updateSpends = {spendsUpdate}/> : null}
        </>
    )
}

export default Spend;