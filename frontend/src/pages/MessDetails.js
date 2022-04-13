import React,{useContext, useState} from "react";
import Bills from '../components/Bills';
import Meals from '../components/Meals';
import CashDeposits from '../components/CashDeposits';
import AuthContext from "../Context/AuthContext";
import { getData } from "../components/BillFetch";
import { getSpendData } from "../components/SpendFetch";
import AmountSpend from "../components/AmountSpends";
import { getDepositData } from "../components/DepositFetch";


const MessDetails = () => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    
    let {authTokens} =useContext(AuthContext);

    const [bills,setBills] = useState(() => localStorage.getItem('bills') ? JSON.parse(localStorage.getItem('bills')) : null)
    const [spends,setSpends] = useState(() => localStorage.getItem('spends') ? JSON.parse(localStorage.getItem('spends')) : null)
    const [deposits,setDeposits] = useState(() => localStorage.getItem('deposits') ? JSON.parse(localStorage.getItem('deposits')) : null)

    let mess =  JSON.parse(localStorage.getItem('mess'))

    let handleBillClick = async ({mess,authTokens}) => {
        setTimeout(() => {
            getData({mess,authTokens}).then(r => { setBills(r) })
         }, 500);
    }
    let handleSpendClick = async ({mess,authTokens}) => {
        setTimeout(() => {
            getSpendData({mess,authTokens}).then(r => { setSpends(r) })
         }, 500);
    }
    let handleDepositClick = async ({mess,authTokens}) => {
        setTimeout(() => {
            getDepositData({mess,authTokens}).then(r => { setDeposits(r) })
         }, 500);
    }
    return(
        <>
            <div className='headers'></div>
            <section className='mess_details'>
               <div className="container">
                <div className="bloc-tabs">
                    <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                    >
                    Meals
                    </button>
                    <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"} id="bills"
                    onClick={() => {
                        toggleTab(2);
                        handleBillClick({mess,authTokens});
                    }}
                    >
                    Bills
                    </button>
                    <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => {
                        toggleTab(3);
                        handleSpendClick({mess,authTokens});
                    }}
                    >
                    Amount Spend
                    </button>
                    <button
                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                    onClick={() => {
                        toggleTab(4);
                        handleDepositClick({mess,authTokens});
                    }}
                    >
                    Cash Deposit
                    </button>
                    <button
                    className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(5)}
                    >
                    Balance
                    </button>
                </div>

                <div className="content-tabs">
                    <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                    >
                    <Meals mess={mess}/>
                    </div>

                    <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                    >
                    {bills === null ? null : <Bills/>}
                    </div>

                    <div
                    className={toggleState === 3 ? "content  active-content" : "content"}
                    >
                    {spends === null ? null : <AmountSpend/>}
                    </div>
                    <div
                    className={toggleState === 4 ? "content  active-content" : "content"}
                    >
                    {deposits === null ? null : <CashDeposits/>}
                    </div>
                    <div
                    className={toggleState === 5 ? "content  active-content" : "content"}
                    >
                    </div>
                </div>
                </div> 
            </section>
        </>
    )
}

export default MessDetails;