import React,{useState} from "react";

const DepositSheet = () => {
    const [monthView,setMonthView] = useState(() => localStorage.getItem('monthview') ? JSON.parse(localStorage.getItem('monthview')) : null)
    const [depositSheet,setSpendSheet] = useState(monthView.cashdeposit)
    return(
        <>
        {depositSheet ? 
        <div className="depositsheet">
            {depositSheet.map((deposit,index) => {
                return(
                    <div key={index} className="singledeposit">
                        <p>{deposit.user}</p>
                        <p>{deposit.deposit_for}</p>
                        <p>{deposit.amount}</p>
                        <p>{deposit.date_created}</p>
                    </div>
                )
            })}
        </div> :null}
        </>
    )
}

export default DepositSheet;