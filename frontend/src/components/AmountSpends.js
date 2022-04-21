import React,{useState,useContext} from "react";
// import * as FaIcons from 'react-icons/fa';
// import * as BiIcons from 'react-icons/bi';
import AuthContext from "../Context/AuthContext";
import Spend from "./Spend";
import { getSpendData } from "./SpendFetch";

const AmountSpend = () => {
    let {authTokens} =useContext(AuthContext)
    let mess =  JSON.parse(localStorage.getItem('mess'))
    const [listObj,setListObj] = useState([])
    const [spends, setSpends] = useState(() => localStorage.getItem('spends') ? JSON.parse(localStorage.getItem('spends')) : null)
    const [listAmount,setListAmount] = useState([])
    const [obj,setObj] = useState("")
    const [objAmount,setObjAmount] = useState(0)
    const [clicked,setClicked] = useState(false)
    let total_spends = 0
    let getObj = (e) => {
        setObj(String(e.target.value))
    }
    let getObjAmount = (e) => {
        setObjAmount(e.target.value)
    }
    let createList = () => {
        listObj.push(String(obj))
        listAmount.push(objAmount)
        setObj("")
        setObjAmount(0)
        console.log(listObj)
        console.log(listAmount)
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
        setClicked(false)
    }
    spends.map((spend,index) => {
        return(
            total_spends += parseInt(spend.amount)
        )
    })
    let createSpend = async () => {
        fetch(`/api/create/meal/spend/`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify({'amount-list':listAmount,'obj-list':listObj})
        })
        setListAmount([])
        setListObj([])
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
    return(
        <>
        <div id = "amount-spends">
            <div className="header-content">
                <h2><strong>{mess.name}</strong></h2>
                <h2>Spends on Meal Shopping</h2>
                <h2>Total Spends : <strong>{total_spends}</strong> Tk</h2>
            </div>
            <div className="add-spends">
                <input type="text" onChange={(e) => {getObj(e)}} className="spends-on-input" placeholder="Add list..." value={obj}/>
                <input type="number" onChange={(e) => {getObjAmount(e)}} className="amount-spend-input" placeholder="Add amount.." value={objAmount}/>
                <p onClick={createList} className="add-more-btn">Add More</p>
            </div>
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
                                
                                <p className="delete-list-item" onClick={(e) => {removeItem(index)}}> Remove </p>
                            </div>
                        )
                    })}
                </div>
            </div>
            {listAmount.length === 0 ? null : 
            <div className="done-create-list">
                {clicked ? <p onClick={falseClicked}>Update List</p> : <p onClick={handleSubmit}>Done</p>}
            </div>}
            <div className="spends-list">
                {spends.map((spend,index) => {
                    return(
                        <div className="single-spend" key={index}>
                            <Spend uSpend={spend}/>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default AmountSpend;