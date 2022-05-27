import React,{useState} from "react";

const MonthBill = () => {
    const [monthView,setMonthView] = useState(() => localStorage.getItem('monthview') ? JSON.parse(localStorage.getItem('monthview')) : null)
    const [billSheet,setSpendSheet] = useState(monthView.bill)
    return(
        <>
        {billSheet ? 
        <div className="billsheet">
            {billSheet.map((bill,index) => {
                return(
                    <div key={index} className="singlebill">
                        <p>{bill.bill_on}</p>
                        <p>{bill.amount}</p>
                        <p>{bill.date_created}</p>
                    </div>
                )
            })}
        </div> :null}
        </>
    )
}

export default MonthBill