import React,{useEffect,useContext, useState} from "react";
import AuthContext from "../Context/AuthContext";
import * as FaIcons from 'react-icons/fa';

const UserDeposits = (props) => {

    let {authTokens} =useContext(AuthContext)
    const [deposit,setDeposit] = useState([])
    const [amount,setAmount] = useState(0)

    useEffect(() => {
        getDeposit()
    },[])

    let getDeposit = async()=>{
        const response = await fetch(`/api/deposit/${props.obj}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
        let data = await response.json()
        setDeposit(data)
    }

    let updateDeposit = async () => {
        fetch(`/api/update/meal/deposit/${deposit.id}`,{
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(amount)
        })
    }

    let handleOnChange = (e) =>{
        setAmount(e.target.value)
    }

    let handleSubmit = () => {
        {amount?
            setDeposit({...deposit,
            'meal_deposit': parseInt(deposit.meal_deposit) + parseInt(amount)
        }):
        setDeposit({...deposit,
            'meal_deposit': parseInt(deposit.meal_deposit)
        })
    }
    setAmount(0)
    updateDeposit()
    props.dataUpdate()
    }
    return(
        <>
        <div className="card">
            <div className="icon">
                <img src={deposit.profile_pic} alt="profile-pic"/>
            </div>
            <div className="con">
                <h2>{deposit.user}</h2>
                <p>Add : </p><input type="number" onChange={(e) => {handleOnChange(e)}} value={amount}/> <br/>
                <p>Meal Deposit : {deposit.meal_deposit}</p><br/>
                <p>Total Deposit : {deposit.total_deposit}</p><br/>
                <p onClick={handleSubmit}>Done <FaIcons.FaCheck/></p>
            </div>
        </div>
        </>
    )
}

export default UserDeposits;