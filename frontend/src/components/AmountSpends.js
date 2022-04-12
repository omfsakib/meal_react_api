import React,{useContext,useState} from "react";
import Spend from "./Spend";
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import AuthContext from "../Context/AuthContext";
import { getSpendData } from "./SpendFetch";

const AmountSpend = () => {
    let {authTokens} =useContext(AuthContext)
    let mess =  JSON.parse(localStorage.getItem('mess'))
    let total_spends = 0

    const [spends,setSpends] = useState(() => localStorage.getItem('spends') ? JSON.parse(localStorage.getItem('spends')) : null)

    const[spend,setSpend] = useState(null)

    spends.map((spend,index) => {
        total_spends += parseInt(spend.amount)
    })
    let createSpend = async () => {
        fetch(`/api/create/spend/`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(spend)
        })
    }
    let handleSubmit = () => {
        createSpend()
        updateData()
    }
    let updateData = () => {
        setTimeout(() => {
            getSpendData({mess,authTokens}).then(r => { setSpends(r) })
         }, 500);
    }
    let handleSpendChange = (e) =>{
        if(!e.target.value){

        }
        else{
            setSpend({...spend, 
                'spend_on':e.target.value,
            })
        }
    }
    let handleAmountChange = (e) =>{
        if(!e.target.value){
            
        }
        else{
            setSpend({...spend, 
                'amount':e.target.value,
            })
        }
    }
    return(
        <>
        <div id="bills"> 
            <div className="header-content">
                <h2><strong>{mess.name}</strong></h2>
                <h2><p onClick={updateData}  className="submit-btn"> Refresh <BiIcons.BiRefresh/> </p></h2>
                <h2>Total Spends : <strong>{total_spends}</strong> Tk</h2>
            </div>
            <div className="addbill-content">
                <input type="text" onChange={(e) => {handleSpendChange(e)}} placeholder="Spend on..."/>
                <input type="number" onChange={(e) => {handleAmountChange(e)}} placeholder="Amount..."/>
                <p onClick={handleSubmit}  className="submit-btn"> Done <FaIcons.FaCheck/> </p>
            </div>
            <div className="bill">
                <h2>Spends On</h2>
                <h2>Amount</h2>
                <h2>Date Updated</h2>
            </div>
            {spends.map((spend,index) => {
                return(
                        <div className="bill" key={index}><Spend spend = { spend }/></div> 
                )
            })}
        </div>
        </>
    )
}

export default AmountSpend;