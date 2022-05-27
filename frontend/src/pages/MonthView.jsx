import React, { useState } from "react";
import MealSheet from "../components/MealSheet";
import SpendSheet from "../components/SpendSheet";
import CashDeposit from "../components/CashDeposit";
import MonthBill from "../components/MonthBill";

const MonthView = () => {
    let [monthview,setMonthView] = useState(() => localStorage.getItem('monthview') ? JSON.parse(localStorage.getItem('monthview')) : null)
    let [totalMeal,setTotalMeal] = useState(0)
    let [usertotalmeal,setUserTotalMeal] = useState(() => monthview.usertotalmeal ? monthview.usertotalmeal : [])
    let [usertotaldeposit,setUserTotalDeposit] = useState(() => monthview.usertotaldeposit ? monthview.usertotaldeposit : [])
    let date_from = useState()
    let date_to = useState()
    let mess =  JSON.parse(localStorage.getItem('mess'))

    let getDateFrom = (e) => {
        date_from = e.target.value
    }
    let getDateTo = (e) => {
        date_to = e.target.value
    }
    {usertotalmeal.map((item) => {
        return totalMeal += parseInt(item)
    })}
    console.log(usertotalmeal) 
    let getMonth = async () =>{
        let response = await fetch(`api/monthview/${mess.id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({'date_from':date_from,'date_to':date_to}) 
        })
        let data = await response.json();
        if(response.status === 200) {
            setMonthView(data)
            localStorage.setItem('monthview',JSON.stringify(data))
        }else{
            alert('Something went wrong')
        }
    }
    return(
        <>
        <div className="headers"></div>
        <section id = "monthview">
            <div className="monthform">
                    <p>Select date range :</p>
                    <input type="date" name = "date_from" onChange={(e) => {getDateFrom(e)}}/>
                    <input type="date" name = "date_to" onChange={(e) => {getDateTo(e)}}/>
                    <button type="submit" onClick={getMonth}>Submit</button>
            </div>
            <div className="mealsheet">
                {monthview ? <MealSheet/> :  null }
            </div>
            <div className="amountspend">
                {monthview ? <SpendSheet/> : null}
            </div>
            <div className="bills">
                {monthview ? <MonthBill/> : null}
            </div>
            <div className="cashdeposit">
                {monthview ? <CashDeposit/> : null}
            </div>

        </section>
        </>
    )
}

export default MonthView;