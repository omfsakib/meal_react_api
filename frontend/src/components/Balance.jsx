import React,{useState,useEffect} from 'react'

const Balance = () => {
    const [balance] = useState(() => localStorage.getItem('balance') ? JSON.parse(localStorage.getItem('balance')) : null)
    let total_spend = 0
    let total_deposit = 0
    let final_balance = 0
    
    balance.map((item) => {
        total_deposit += parseFloat(item.total_deposit)
        total_spend += parseFloat(item.total_spend)
        final_balance = parseFloat(total_deposit - total_spend)
    })

    return(
        <>
        <div id='balance'>
            <div className='header-balance'>
                <h2>Total Deposit = {total_deposit}</h2>
                <h2>Total Spend = {total_spend}</h2>
                <h2>Main Balance = {final_balance}</h2>
            </div>
            <div className='balance-table'>
                {balance.map((item,index) => {
                    return(
                        <div key={index} className='user-balance'>
                            <p>{item.member}</p>
                            <p>{item.total_spend}</p>
                            <p>{item.total_deposit}</p>
                            <p>{item.balance}</p>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Balance;