import React,{useEffect, useState, useContext} from "react";
import GetUsername from './GetUsername';
import { getSpendData } from "./SpendFetch";
import AuthContext from "../Context/AuthContext";

const SpendView = (props) => {

    let {authTokens} =useContext(AuthContext)
    let mess =  JSON.parse(localStorage.getItem('mess'))
    const [spend,setSpend] = useState(props.spend)
    const [listObj,setListObj] = useState([])
    const [listAmount,setListAmount] = useState([])
    const [clicked,setClicked] = useState(false)

    useEffect(() => {
        getList()
    },[])

    let getList = () => {
        if(spend.list_spend){
            return(
                setListObj(spend.list_spend.split(";").filter(Boolean)),
                setListAmount(spend.amounts.split(";").filter(Boolean))
            )
        }
        
    }
    let updateListObj = (e,index) => {
        const arr = [...listObj]
        arr[index] = e.target.value
        setListObj(arr)
    }
    let updateListAmount = (e,index) => {
        const arr = [...listAmount]
        arr[index] = e.target.value
        setListAmount(arr)
    }
    let removeItem = (index) => {
        const arr = [...listObj]
        arr.splice(index,1)
        setListObj(arr)

        const arr2 = [...listAmount]
        arr2.splice(index,1) 
        setListAmount(arr2)
    }
    let trueClicked = () => {
        setClicked(true)
    }
    let falseClicked = () => {
        let list_spend = ""
        let amounts = ""
        let total_amount = 0
        {listObj.map((obj) => {
            return list_spend += (String(obj) + ";");
        });}
        {listAmount.map((obj) => {
           return(
            total_amount += parseInt(obj),
            amounts += (String(obj) + ";")
           );
        });}
        setSpend({...spend,
            'list_spend' : list_spend,
            'amounts' : amounts,
            'amount':total_amount,
        })
        setClicked(false)
    }
    let handleSubmit = () => {
        props.updateSpend(spend)
        updateSpend()
        updateData()
        props.setTrigger(false)
    }
    let handleDelete = () => {
        deleteSpend()
        updateData()
        props.setTrigger(false)
    }
    let updateData = () => {
        setTimeout(() => {
            getSpendData({mess,authTokens}).then(r => { props.updateSpends(r) })
         }, 500);
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
    let deleteSpend = async () => {
        fetch(`/api/delete/spend/${spend.id}`,{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
    }
    
    return (props.trigger) ? ( 
        <>
        <div className="list-spend-popup">
            <div className="popup-list-header">
                <p>Spend on - {spend.spend_on}</p>
                <p className="popup-close-btn" onClick={() => props.setTrigger(false)}>Close</p>
            </div>
            <div className="popup-list-content">
                {spend.list_spend ? 
                <>
                {listObj && listAmount ?
                <>
                    <div className="market-list">
                        <div className="spends-obj">
                            {listObj.map((item,index) => {
                                return(
                                    <div className="spend-item" key={index}>
                                    { clicked ? <input onChange={(e) => {updateListObj(e,index)}} defaultValue= {item}/> : <p onClick={trueClicked}>{index+1}. {item} </p>}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="spends-obj-amount">
                        {listAmount.map((amount,index) => {
                                return(
                                    <div  key={index} className="amount-with-dlt-btn">
                                        { clicked ? <input onChange={(e) => {updateListAmount(e,index)}} defaultValue= {amount}/> : <p onClick={trueClicked}> - {amount}</p>}
                                        
                                        <p className="delete-list-item" onClick={() => {removeItem(index)}}> Remove </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {listAmount.length === 0 ? null : 
                    <div className="done-create-list">
                        {clicked ? <p onClick={falseClicked}>Update List</p> : <p onClick={handleSubmit}>Done</p>}
                    </div>}
                </>
                 :null}
                </> : 
                <p>
                    Meal Manager has declared that <strong><GetUsername member={spend.user}/></strong> have to pay <strong>{spend.amount}</strong> tk for the <strong>{spend.spend_on}</strong> bill.
                </p>}
                <p onClick={handleDelete}>Delete</p>
            </div>
        </div>
        </>
    ) :"";
}
export default SpendView;