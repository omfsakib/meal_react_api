import React,{useState} from "react";

const SpendSheet = () => {
    const [monthView,setMonthView] = useState(() => localStorage.getItem('monthview') ? JSON.parse(localStorage.getItem('monthview')) : null)
    const [spendSheet,setSpendSheet] = useState(monthView.amountspend)
    return(
        <>
        {spendSheet ? 
        <div className="spendsheet">
            {spendSheet.map((spend,index) => {
                return(
                    <div key={index} className="singlespend">
                        <p>{spend.user}</p>
                        <p>{spend.spend_on}</p>
                        <p>{spend.amount}</p>
                        <p>{spend.date_created}</p>
                    </div>
                )
            })}
        </div> :null}
        </>
    )
}

export default SpendSheet;