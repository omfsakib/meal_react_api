import React,{useContext, useState} from "react";
import Bills from '../components/Bills';
import Meals from '../components/Meals';
import AuthContext from "../Context/AuthContext";
import { getData } from "../components/BillFetch";


const MessDetails = () => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    
    let {authTokens} =useContext(AuthContext)

    let mess =  JSON.parse(localStorage.getItem('mess'))

    let handleClick = async ({mess,authTokens}) => {
        setTimeout(() => {
            getData({mess,authTokens})
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
                        handleClick({mess,authTokens});
                    }}
                    >
                    Bills
                    </button>
                    <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                    >
                    Amount Spend
                    </button>
                    <button
                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(4)}
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
                    <Bills/>
                    </div>

                    <div
                    className={toggleState === 3 ? "content  active-content" : "content"}
                    >
                    </div>
                    <div
                    className={toggleState === 4 ? "content  active-content" : "content"}
                    >
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