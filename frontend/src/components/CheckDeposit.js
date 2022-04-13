import React,{useEffect,useContext,useState} from "react";
import AuthContext from "../Context/AuthContext";

const CheckDeposit = ({member,deposit_for}) => {
    let {authTokens} =useContext(AuthContext)
    const [deposit,setDeposit] = useState([])
    const [tDeposit,setTDeposit] = useState({deposit_for: null, amount: null, mess: null, user: null})
    const [spend,setSpend] = useState([])
    useEffect(() => {
        getDeposit()
        getSpend()
    },[])
    
    tDeposit.user === null ? tDeposit.deposit_for = deposit_for : tDeposit.deposit_for = null
    tDeposit.user === spend.user ? tDeposit.amount = null : tDeposit.amount = spend.amount
    
    let getDeposit = async()=>{
        let response = await fetch(`/api/check/deposit/${member}/${deposit_for}`,{
            method:'GET',
            headers:{
               'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
        let data = await response.json()
        setDeposit(data)
    }
    let getSpend = async()=>{
        let response = await fetch(`/api/check/spend/${member}/${deposit_for}`,{
            method:'GET',
            headers:{
               'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
        let data = await response.json()
        setSpend(data)
    }

    let createSpend = async () => {
        fetch(`/api/create/spend/${member}`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(spend)
        })
    }
    let spendUpdate = async () => {
        fetch(`/api/update/spend/${spend.id}`,{
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(spend)
        })
    }
    let updateDeposit = async () => {
        fetch(`/api/update/deposit/${deposit.id}`,{
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(tDeposit)
        })
    }
    let handleSpendSubmit = () => {
        createSpend()
        setSpend({...spend, 
            'user': member,
        })
    }
    let handleSpendAmount = (e) => {
        if(!e.target.value){

        }
        else{
            setSpend({...spend, 
                'spend_on': deposit_for,
                'amount':e.target.value
            })
        }
    }
    let updateSpend = () => {
        setSpend({...spend, 
            'user': null,
        })
    }
    let updateSpendData = () => {
        setSpend({...spend, 
            'user': member,
        })
        spendUpdate()
    }
    let handleDeposit = () => {
        setDeposit({...deposit, 
            'user': member,
            'amount':spend.amount
        })
        createDeposit()
    }
    let handleUpdateDeposit = () => {
        setDeposit({...deposit, 
            'amount':spend.amount
        })
        updateDeposit()
    }
    
    let createDeposit = async () => {
        fetch(`/api/create/deposit/${member}`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(tDeposit)
        })
    }
    let deleteDeposit = async () => {
        fetch(`/api/delete/deposit/${deposit.id}`,{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
    }
    let handleDeleteDeposit = () => {
        setDeposit({...deposit, 
            'user': null,
        })
        deleteDeposit()
    }
    return(
        <>
        <p>
            <span className="create-bill-user" >
                {spend.user === null ? <span><input onChange={(e) => {handleSpendAmount(e)}} type="number" defaultValue={spend.amount === null ? 0 : spend.amount}/>
                {spend.user === null && spend.mess === null ? <span className="submit-spend-btn" onClick={handleSpendSubmit}>Done</span> : <span className="submit-spend-btn"  onClick={updateSpendData}>Update</span> }</span>  : <span onClick={updateSpend}>&#2547; {spend.amount}</span>}
                {spend.user === null ? null : <span className="create-deposit-user">{
            deposit.user === null ? 
            <span><span onClick={handleDeposit} style={{backgroundColor:"red"}}>Unpaid</span></span> : <span>
                {deposit.amount < spend.amount ? <span onClick={handleUpdateDeposit} className="update-deposit" style={{backgroundColor:"yellow"}}>Update</span> :<span onClick={handleDeleteDeposit} style={{backgroundColor:"green"}}>Paid</span>}
            </span>
            }
            </span>
            }
            </span>
            
        </p>
         
        </>
    )
}

export default CheckDeposit;